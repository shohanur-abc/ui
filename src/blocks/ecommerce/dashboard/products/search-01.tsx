'use client';

import * as React from 'react';
import {
	Search,
	X,
	Clock,
	TrendingUp,
	Star,
	Sparkles,
	ArrowRight,
	Package,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchResult {
	id: string;
	name: string;
	sku: string;
	category: string;
	price: number;
	matchType: 'name' | 'sku' | 'description';
}

interface SearchResultItemProps {
	result: SearchResult;
	query: string;
	onClick: () => void;
}

const SearchResultItem = ({
	result,
	query,
	onClick,
}: SearchResultItemProps) => {
	const highlightMatch = (text: string) => {
		const index = text.toLowerCase().indexOf(query.toLowerCase());
		if (index === -1) return text;
		return (
			<>
				{text.slice(0, index)}
				<span className="bg-primary/20 font-medium text-primary">
					{text.slice(index, index + query.length)}
				</span>
				{text.slice(index + query.length)}
			</>
		);
	};

	return (
		<button
			onClick={onClick}
			className="flex w-full items-center gap-4 rounded-lg p-3 text-left transition-colors hover:bg-accent"
		>
			<div className="flex size-12 items-center justify-center rounded-lg bg-muted text-2xl">
				📦
			</div>
			<div className="flex-1 overflow-hidden">
				<p className="truncate font-medium">
					{highlightMatch(result.name)}
				</p>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<span>{result.sku}</span>
					<span>•</span>
					<span>{result.category}</span>
				</div>
			</div>
			<div className="text-right">
				<p className="font-medium">${result.price.toFixed(2)}</p>
				<Badge variant="outline" className="text-xs">
					{result.matchType}
				</Badge>
			</div>
		</button>
	);
};

interface SearchBoxProps {
	query: string;
	onQueryChange: (query: string) => void;
	onClear: () => void;
	results: SearchResult[];
	isSearching: boolean;
}

const SearchBox = ({
	query,
	onQueryChange,
	onClear,
	results,
	isSearching,
}: SearchBoxProps) => {
	const [isFocused, setIsFocused] = React.useState(false);
	const showResults = isFocused && (query.length > 0 || results.length > 0);

	return (
		<div className="relative">
			<div className="relative">
				<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					value={query}
					onChange={(e) => onQueryChange(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setTimeout(() => setIsFocused(false), 200)}
					placeholder="Search products by name, SKU, or description..."
					className="pl-10 pr-10"
				/>
				{query && (
					<button
						onClick={onClear}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					>
						<X className="size-4" />
					</button>
				)}
			</div>

			{showResults && (
				<div className="absolute top-full z-50 mt-2 w-full rounded-lg border bg-popover shadow-lg">
					{isSearching ? (
						<div className="flex items-center justify-center py-8">
							<div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
						</div>
					) : query && results.length === 0 ? (
						<div className="py-8 text-center text-muted-foreground">
							<Package className="mx-auto mb-2 size-8 opacity-50" />
							<p>No products found for "{query}"</p>
						</div>
					) : (
						<div className="max-h-96 overflow-y-auto p-2">
							{results.map((result) => (
								<SearchResultItem
									key={result.id}
									result={result}
									query={query}
									onClick={() => console.log('Selected:', result.id)}
								/>
							))}
							{results.length > 0 && (
								<Button
									variant="ghost"
									className="mt-2 w-full gap-2"
									onClick={() => console.log('View all')}
								>
									View all results
									<ArrowRight className="size-4" />
								</Button>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

interface QuickFiltersProps {
	filters: { label: string; icon: React.ElementType; count: number }[];
	onSelect: (label: string) => void;
}

const QuickFilters = ({ filters, onSelect }: QuickFiltersProps) => (
	<div className="flex flex-wrap gap-2">
		{filters.map((filter) => {
			const Icon = filter.icon;
			return (
				<Button
					key={filter.label}
					variant="outline"
					size="sm"
					onClick={() => onSelect(filter.label)}
					className="gap-2"
				>
					<Icon className="size-4" />
					{filter.label}
					<Badge variant="secondary">{filter.count}</Badge>
				</Button>
			);
		})}
	</div>
);

interface RecentSearchesProps {
	searches: string[];
	onSelect: (query: string) => void;
	onClear: () => void;
}

const RecentSearches = ({
	searches,
	onSelect,
	onClear,
}: RecentSearchesProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-3 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Clock className="size-4 text-muted-foreground" />
				<span className="font-medium">Recent Searches</span>
			</div>
			<Button variant="ghost" size="sm" onClick={onClear}>
				Clear
			</Button>
		</div>
		<div className="flex flex-wrap gap-2">
			{searches.map((search) => (
				<Button
					key={search}
					variant="secondary"
					size="sm"
					onClick={() => onSelect(search)}
				>
					{search}
				</Button>
			))}
		</div>
	</div>
);

export default function Main() {
	const [query, setQuery] = React.useState('');
	const [isSearching, setIsSearching] = React.useState(false);

	const results: SearchResult[] = query
		? [
				{ id: '1', name: 'Wireless Mouse Pro', sku: 'WM-001', category: 'Electronics', price: 29.99, matchType: 'name' },
				{ id: '2', name: 'Wireless Keyboard', sku: 'WK-001', category: 'Electronics', price: 49.99, matchType: 'name' },
				{ id: '3', name: 'Wireless Headphones', sku: 'WH-001', category: 'Audio', price: 99.99, matchType: 'name' },
			]
		: [];

	const quickFilters = [
		{ label: 'Low Stock', icon: TrendingUp, count: 12 },
		{ label: 'Bestsellers', icon: Star, count: 8 },
		{ label: 'New Arrivals', icon: Sparkles, count: 24 },
	];

	const recentSearches = ['wireless mouse', 'keyboard', 'monitor', 'usb hub', 'webcam'];

	React.useEffect(() => {
		if (query) {
			setIsSearching(true);
			const timer = setTimeout(() => setIsSearching(false), 500);
			return () => clearTimeout(timer);
		}
	}, [query]);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Search className="size-5" />
					<h2 className="text-xl font-semibold">Product Search</h2>
				</div>

				<SearchBox
					query={query}
					onQueryChange={setQuery}
					onClear={() => setQuery('')}
					results={results}
					isSearching={isSearching}
				/>

				<QuickFilters
					filters={quickFilters}
					onSelect={(label) => console.log('Filter:', label)}
				/>

				<RecentSearches
					searches={recentSearches}
					onSelect={(q) => setQuery(q)}
					onClear={() => console.log('Clear recent')}
				/>
			</div>
		</section>
	);
}
