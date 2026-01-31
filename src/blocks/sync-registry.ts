import { glob, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { IBlock, IMetadataFlat, IMetadata } from './type';

class registry {
	static async build() {
		const metaPaths = await registry.metadataPaths();
		const results = (await Promise.all(metaPaths.map(registry.buildBlock)))
			.flat()
			.sort((a, b) => {
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			});
		await writeFile(
			'src/blocks/registry.json',
			JSON.stringify(results, null, 2),
		);
	}

	static store: IMetadataFlat[] = [];

	static metadataPaths = (loc = 'src/blocks') =>
		Array.fromAsync(glob(`${loc}/**/metadata.json`));
	static tsxPaths = (loc = 'src/blocks') =>
		Array.fromAsync(glob(`${loc}/**/*.tsx`));

	static async buildBlock(metaPath: string) {
		const meta = JSON.parse(await readFile(metaPath, 'utf-8')) as IMetadata;
		const tsxPaths = await registry.tsxPaths(dirname(metaPath));
		const variants = await Promise.all(
			tsxPaths.map(async (tsx) => {
				const stats = await stat(tsx);
				const version = meta.data.find((d: IBlock) => d.inode === stats.ino);
				console.log(version?.name.split('-').slice(0, -1).join('-'));
				return {
					...meta,
					variant: version?.name.split('-').slice(0, -1).join('-') || 'default',
					...version,
					data: undefined,
					createdAt: stats.birthtime.toISOString(),
					updatedAt: stats.mtime.toISOString(),
					href: tsx.replace(/^src\/|\.tsx$/g, ''),
				};
			}),
		);
		return variants;
	}
}

await registry.build();
