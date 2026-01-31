'use server';

import { blocks } from '@/blocks/registry';

export const getFilteredBlocks = async (
	website = 'websites',
	block = 'blocks',
	variant = 'variants',
	dateFrom?: string,
	dateTo?: string,
	sortOrder: 'asc' | 'desc' = 'desc',
) => {
	// const websites = (await cache(website || "websites"))();
	const websites = await cache(
		website,
		async () => (website !== 'websites' && blocks.website(website)) || blocks,
	);

	const blks = await cache(
		`${website}-${block}`,
		async () => (block !== 'blocks' && websites.block(block)) || websites,
	);

	let variants = await cache(
		`${website}-${block}-${variant}`,
		async () => (variant !== 'variants' && blks.variant(variant)) || blks,
	);

	// Apply date range filter if provided
	if (dateFrom || dateTo) {
		const from = dateFrom || '2000-01-01';
		const to = dateTo || new Date().toISOString().slice(0, 10);
		variants = variants.dateRange(from, to) as typeof variants;
	}

	// Apply sorting
	variants = variants.sortByDate(sortOrder) as typeof variants;

	return {
		filteredBlocks: variants,
		websitesKeys: await cache('websitesKeys', async () => [
			...new Set(blocks.map((b) => b.website)),
		]),
		blocks: await cache(`${website}-blocksKeys`, async () => [
			...new Set(websites.map((b) => b.block)),
		]),
		variants: await cache(`${website}-${block}-variantsKeys`, async () => [
			...new Set(blks.map((b) => b.variant)),
		]),
	};
};

const storage = new Map<string, unknown>();

export async function cache<T>(key: string, fn: () => Promise<T>): Promise<T> {
	// if (storage.has(key)) {
	//     console.log(`Cache hit for key: ${key}`);
	//     return storage.get(key) as T;
	// }

	const value = await fn();
	storage.set(key, value);
	return value;
}
