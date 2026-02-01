'use client';

import * as React from 'react';
import {
	Search,
	X,
	Filter,
	RefreshCw,
	ArrowLeft,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SearchEmptyStateProps {
	query: string;
	filters: string[];
	onClearQuery: () => void;
	onClearFilters: () => void;
	onClearAll: () => void;
}

const SearchEmptyState = ({
	query,
	filters,
	onClearQuery,
	onClearFilters,
	onClearAll,
}: SearchEmptyStateProps) => (
	<div className="flex flex-col items-center justify-center rounded-lg border bg-muted/30 px-6 py-12 text-center">
		<div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
			<Search className="size-8 text-muted-foreground" />
		</div>
		<h3 className="mb-2 text-lg font-semibold">No Results Found</h3>
		<p className="mb-4 max-w-sm text-muted-foreground">
			We couldn't find any products matching{' '}
			<span className="font-medium">"{query}"</span>
			{filters.length > 0 && ' with the selected filters'}
		</p>

		{filters.length > 0 && (
			<div className="mb-4 flex flex-wrap justify-center gap-2">
				{filters.map((filter) => (
					<Badge key={filter} variant="secondary" className="gap-1">
						{filter}
						<button onClick={() => console.log('Remove filter:', filter)}>
							<X className="size-3" />
						</button>
					</Badge>
				))}
			</div>
		)}

		<div className="flex flex-wrap justify-center gap-2">
			{query && (
				<Button variant="outline" onClick={onClearQuery} className="gap-2">
					<X className="size-4" />
					Clear Search
				</Button>
			)}
			{filters.length > 0 && (
				<Button variant="outline" onClick={onClearFilters} className="gap-2">
					<Filter className="size-4" />
					Clear Filters
				</Button>
			)}
			<Button onClick={onClearAll} className="gap-2">
				<RefreshCw className="size-4" />
				Reset All
			</Button>
		</div>
	</div>
);

interface SuggestionItemProps {
	query: string;
	onClick: () => void;
}

const SuggestionItem = ({ query, onClick }: SuggestionItemProps) => (
	<button
		onClick={onClick}
		className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
	>
		<Search className="size-4 text-muted-foreground" />
		{query}
	</button>
);

interface SuggestionsProps {
	suggestions: string[];
	onSelect: (query: string) => void;
}

const Suggestions = ({ suggestions, onSelect }: SuggestionsProps) => (
	<div className="rounded-lg border bg-card p-4">
		<h4 className="mb-3 text-sm font-medium">Try searching for:</h4>
		<div className="flex flex-wrap gap-2">
			{suggestions.map((suggestion) => (
				<SuggestionItem
					key={suggestion}
					query={suggestion}
					onClick={() => onSelect(suggestion)}
				/>
			))}
		</div>
	</div>
);

export default function Main() {
	const [query, setQuery] = React.useState('wireless headphones xyz123');
	const [filters] = React.useState(['Category: Electronics', 'In Stock', 'Price: $50-$100']);
	const suggestions = [
		'Wireless Mouse',
		'USB Keyboard',
		'Bluetooth Headphones',
		'Monitor Stand',
		'Webcam',
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<Button variant="ghost" className="gap-2">
					<ArrowLeft className="size-4" />
					Back to Products
				</Button>

				<SearchEmptyState
					query={query}
					filters={filters}
					onClearQuery={() => setQuery('')}
					onClearFilters={() => console.log('Clear filters')}
					onClearAll={() => {
						setQuery('');
						console.log('Clear all');
					}}
				/>

				<Suggestions
					suggestions={suggestions}
					onSelect={(q) => setQuery(q)}
				/>
			</div>
		</section>
	);
}
