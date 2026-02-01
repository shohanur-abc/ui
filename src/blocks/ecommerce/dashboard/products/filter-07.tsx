'use client';

import * as React from 'react';
import {
	Search,
	Tag,
	X,
	Clock,
	TrendingUp,
	Sparkles,
	Hash,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface SearchSuggestion {
	type: 'product' | 'category' | 'tag';
	value: string;
	highlight?: string;
}

interface SearchWithSuggestionsProps {
	query: string;
	onQueryChange: (query: string) => void;
	suggestions: SearchSuggestion[];
	onSelect: (suggestion: SearchSuggestion) => void;
	placeholder: string;
}

const SearchWithSuggestions = ({
	query,
	onQueryChange,
	suggestions,
	onSelect,
	placeholder,
}: SearchWithSuggestionsProps) => {
	const [isFocused, setIsFocused] = React.useState(false);
	const showSuggestions = isFocused && suggestions.length > 0;

	const icons = {
		product: Hash,
		category: Tag,
		tag: Tag,
	};

	return (
		<div className="relative">
			<div className="relative">
				<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					value={query}
					onChange={(e) => onQueryChange(e.target.value)}
					placeholder={placeholder}
					className="pl-9 pr-9"
					onFocus={() => setIsFocused(true)}
					onBlur={() => setTimeout(() => setIsFocused(false), 200)}
				/>
				{query && (
					<button
						onClick={() => onQueryChange('')}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					>
						<X className="size-4" />
					</button>
				)}
			</div>

			{showSuggestions && (
				<div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border bg-popover p-1 shadow-lg">
					{suggestions.map((suggestion, idx) => {
						const Icon = icons[suggestion.type];
						return (
							<button
								key={idx}
								onClick={() => onSelect(suggestion)}
								className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-accent"
							>
								<Icon className="size-4 text-muted-foreground" />
								<span>{suggestion.value}</span>
								<Badge variant="outline" className="ml-auto text-xs">
									{suggestion.type}
								</Badge>
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
};

interface RecentSearchesProps {
	searches: string[];
	onSelect: (search: string) => void;
	onRemove: (search: string) => void;
	onClear: () => void;
}

const RecentSearches = ({
	searches,
	onSelect,
	onRemove,
	onClear,
}: RecentSearchesProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-3 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Clock className="size-4 text-muted-foreground" />
				<span className="font-medium">Recent Searches</span>
			</div>
			{searches.length > 0 && (
				<Button variant="ghost" size="sm" onClick={onClear}>
					Clear
				</Button>
			)}
		</div>
		{searches.length === 0 ? (
			<p className="text-sm text-muted-foreground">No recent searches</p>
		) : (
			<div className="flex flex-wrap gap-2">
				{searches.map((search) => (
					<Badge
						key={search}
						variant="secondary"
						className="cursor-pointer gap-1 hover:bg-secondary/80"
						onClick={() => onSelect(search)}
					>
						{search}
						<button
							onClick={(e) => {
								e.stopPropagation();
								onRemove(search);
							}}
						>
							<X className="size-3" />
						</button>
					</Badge>
				))}
			</div>
		)}
	</div>
);

interface TrendingSearchesProps {
	searches: { term: string; count: number }[];
	onSelect: (term: string) => void;
}

const TrendingSearches = ({ searches, onSelect }: TrendingSearchesProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-3 flex items-center gap-2">
			<TrendingUp className="size-4 text-primary" />
			<span className="font-medium">Trending Searches</span>
		</div>
		<div className="space-y-2">
			{searches.map((search, idx) => (
				<button
					key={search.term}
					onClick={() => onSelect(search.term)}
					className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-accent"
				>
					<span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
						{idx + 1}
					</span>
					<span className="flex-1 text-sm">{search.term}</span>
					<span className="text-xs text-muted-foreground">
						{search.count.toLocaleString()} searches
					</span>
				</button>
			))}
		</div>
	</div>
);

interface PopularTagsProps {
	tags: { name: string; count: number }[];
	selected: string[];
	onToggle: (tag: string) => void;
}

const PopularTags = ({ tags, selected, onToggle }: PopularTagsProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-3 flex items-center gap-2">
			<Tag className="size-4 text-muted-foreground" />
			<span className="font-medium">Popular Tags</span>
		</div>
		<div className="flex flex-wrap gap-2">
			{tags.map((tag) => (
				<Badge
					key={tag.name}
					variant={selected.includes(tag.name) ? 'default' : 'outline'}
					className="cursor-pointer"
					onClick={() => onToggle(tag.name)}
				>
					{tag.name}
					<span className="ml-1 text-xs opacity-70">({tag.count})</span>
				</Badge>
			))}
		</div>
	</div>
);

interface AiSearchSuggestionProps {
	onSelect: (query: string) => void;
	queries: string[];
}

const AiSearchSuggestion = ({ onSelect, queries }: AiSearchSuggestionProps) => (
	<div className="rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10 p-4">
		<div className="mb-3 flex items-center gap-2">
			<Sparkles className="size-4 text-primary" />
			<span className="font-medium">AI Suggestions</span>
		</div>
		<div className="space-y-2">
			{queries.map((query) => (
				<button
					key={query}
					onClick={() => onSelect(query)}
					className="w-full rounded-md border bg-card p-2 text-left text-sm hover:bg-accent"
				>
					{query}
				</button>
			))}
		</div>
	</div>
);

export default function Main() {
	const [query, setQuery] = React.useState('');
	const [recentSearches, setRecentSearches] = React.useState([
		'wireless headphones',
		'gaming mouse',
		'usb cable',
	]);
	const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

	const suggestions: SearchSuggestion[] = query
		? [
				{ type: 'product', value: `${query} Pro Model` },
				{ type: 'category', value: `${query} Category` },
				{ type: 'tag', value: query },
			]
		: [];

	const trendingSearches = [
		{ term: 'bluetooth speakers', count: 12450 },
		{ term: 'mechanical keyboard', count: 8920 },
		{ term: 'usb-c hub', count: 7654 },
		{ term: 'webcam 1080p', count: 5432 },
	];

	const popularTags = [
		{ name: 'Electronics', count: 1234 },
		{ name: 'Audio', count: 856 },
		{ name: 'Gaming', count: 654 },
		{ name: 'Office', count: 432 },
		{ name: 'Accessories', count: 321 },
		{ name: 'Portable', count: 234 },
	];

	const aiQueries = [
		'Products with high ratings and low stock',
		'Best sellers in the last 30 days',
		'Products needing description updates',
	];

	const handleSearch = (value: string) => {
		setQuery(value);
		if (value && !recentSearches.includes(value)) {
			setRecentSearches((prev) => [value, ...prev.slice(0, 4)]);
		}
	};

	const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
		handleSearch(suggestion.value);
	};

	const removeRecentSearch = (search: string) => {
		setRecentSearches((prev) => prev.filter((s) => s !== search));
	};

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Search className="size-5" />
					<h2 className="text-xl font-semibold">Smart Search</h2>
				</div>

				<SearchWithSuggestions
					query={query}
					onQueryChange={setQuery}
					suggestions={suggestions}
					onSelect={handleSuggestionSelect}
					placeholder="Search products, categories, tags..."
				/>

				{selectedTags.length > 0 && (
					<div className="flex flex-wrap items-center gap-2">
						<span className="text-sm text-muted-foreground">Filtering by:</span>
						{selectedTags.map((tag) => (
							<Badge key={tag} variant="secondary" className="gap-1">
								{tag}
								<button onClick={() => toggleTag(tag)}>
									<X className="size-3" />
								</button>
							</Badge>
						))}
					</div>
				)}

				<div className="grid gap-6 @md:grid-cols-2">
					<RecentSearches
						searches={recentSearches}
						onSelect={handleSearch}
						onRemove={removeRecentSearch}
						onClear={() => setRecentSearches([])}
					/>
					<TrendingSearches
						searches={trendingSearches}
						onSelect={handleSearch}
					/>
				</div>

				<PopularTags
					tags={popularTags}
					selected={selectedTags}
					onToggle={toggleTag}
				/>

				<AiSearchSuggestion onSelect={handleSearch} queries={aiQueries} />
			</div>
		</section>
	);
}
