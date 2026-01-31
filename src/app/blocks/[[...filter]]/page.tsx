import { ClientFilters } from './client-filters';
import { getFilteredBlocks } from './data';
import BlockSinglePage from './preview';
import { Playground } from '@/components/Playground';

export default async function AllBlocksPage({
	params,
	searchParams,
}: {
	params: Promise<{ filter?: string[] }>;
	searchParams: Promise<{
		dateFrom?: string;
		dateTo?: string;
		sort?: 'asc' | 'desc';
	}>;
}) {
	const { filter } = await params;
	const { dateFrom, dateTo, sort = 'desc' } = await searchParams;
	const [website, block, variant] = filter || [];

	// Check if this is a preview request
	if (filter?.at(-1) === 'preview') {
		return <BlockSinglePage href={'blocks/' + filter.slice(0, -1).join('/')} />;
	} else if (filter?.at(-1) === 'iframe-preview') {
		// return <Preview href={"blocks/" + filter.slice(0, -1).join("/")} />
		return (
			<Playground
				href={'blocks/' + filter.slice(0, -1).join('/')}
				website={website || 'websites'}
			/>
		);
	}

	// Get filtered blocks from server
	const {
		filteredBlocks,
		websitesKeys: websites,
		blocks: blockTypes,
		variants,
	} = await getFilteredBlocks(website, block, variant, dateFrom, dateTo, sort);
	// Return client component with server-computed data
	return (
		<ClientFilters
			website={website || ''}
			block={block || ''}
			variant={variant || ''}
			dateFrom={dateFrom || ''}
			dateTo={dateTo || ''}
			sortOrder={sort}
			websites={websites}
			blockTypes={blockTypes}
			variants={variants}
			filteredBlocks={filteredBlocks}
		/>
	);
}
