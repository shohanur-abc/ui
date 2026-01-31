import { glob, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { IBlock, IMetadata } from "./type";


class metadata {
    static async build() {
        await Promise.all(
            (await this.tsxFolderPaths()).map(async folder => {
                await writeFile(`${folder}/metadata.json`, JSON.stringify(await this.buildMetadata(folder), null, 2));
            })
        ).catch((err) => { console.error(err); });
    }
    
    // Collect all unique TSX folder paths
    static tsxPaths = (loc = "src/blocks") => Array.fromAsync(glob(`${loc}/**/*.tsx`))
    static tsxFolderPaths = (loc = "src/blocks") => this.tsxPaths(loc).then(paths => [...new Set(paths.map(path.dirname))])

    // single metadata builder
    static async buildMetadata(folder: string): Promise<IMetadata> {
        const meta = await readFile(`${folder}/metadata.json`, 'utf-8')
            .then(JSON.parse)
            .catch(() => ({}));

        const [, , website, block, category] = folder.toLowerCase().split('/');
        return {
            website: meta?.website || website || "",
            category: meta?.category || category || "",
            block: meta?.block || block || "",
            tags: meta?.tags || [],
            colSpan: meta?.colSpan || 3,
            data: await Promise.all(
                (await this.tsxPaths(folder)).map(async tsx => {
                    try {
                        const stats = await stat(tsx);
                        const variant = meta?.data?.find((d: IBlock) => d.inode === stats.ino);
                        return {
                            name: path.basename(tsx, '.tsx'),
                            description: variant?.description || "",
                            elements: variant?.elements || [],
                            bookmark: variant?.bookmark || false,
                            inode: stats.ino,
                        };
                    } catch (e) { console.error("Error processing at meta.data:", e); }
                })
            ),
        } as IMetadata;
    };
}
metadata.build();



