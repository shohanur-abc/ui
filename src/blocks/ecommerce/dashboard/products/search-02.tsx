'use client';

import * as React from 'react';
import {
	Search,
	SlidersHorizontal,
	X,
	Tag,
	DollarSign,
	Package,
	Calendar,
	ChevronDown,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ActiveFilter {
	type: string;
	value: string;
}

interface FilterChipProps {
	label: string;
	onRemove: () => void;
}

const FilterChip = ({ label, onRemove }: FilterChipProps) => (
	<Badge variant="secondary" className="gap-1 pr-1">
		{label}
		<button
			onClick={onRemove}
			className="ml-1 rounded-full p-0.5 hover:bg-muted"
		>
			<X className="size-3" />
		</button>
	</Badge>
);

interface AdvancedSearchFormProps {
	onSearch: (filters: Record<string, string>) => void;
}

const AdvancedSearchForm = ({ onSearch }: AdvancedSearchFormProps) => {
	const [priceRange, setPriceRange] = React.useState([0, 500]);
	const [categories, setCategories] = React.useState<string[]>([]);
	const [stockStatus, setStockStatus] = React.useState<string>('');
	const [dateRange, setDateRange] = React.useState<string>('');

	const categoryOptions = [
		'Electronics',
		'Clothing',
		'Home & Garden',
		'Sports',
		'Toys',
	];

	const toggleCategory = (cat: string) => {
		setCategories((prev) =>
			prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
		);
	};

	return (
		<div className="space-y-4 rounded-lg border bg-card p-4">
			<h3 className="font-semibold">Advanced Search</h3>

			<div className="grid gap-4 @sm:grid-cols-2">
				<div className="space-y-2">
					<Label className="flex items-center gap-2">
						<Tag className="size-4" />
						Categories
					</Label>
					<div className="max-h-32 space-y-2 overflow-y-auto rounded-lg border p-2">
						{categoryOptions.map((cat) => (
							<label
								key={cat}
								className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-accent"
							>
								<Checkbox
									checked={categories.includes(cat)}
									onCheckedChange={() => toggleCategory(cat)}
								/>
								<span className="text-sm">{cat}</span>
							</label>
						))}
					</div>
				</div>

				<div className="space-y-2">
					<Label className="flex items-center gap-2">
						<DollarSign className="size-4" />
						Price Range
					</Label>
					<div className="space-y-4 rounded-lg border p-3">
						<Slider
							value={priceRange}
							onValueChange={setPriceRange}
							min={0}
							max={500}
							step={10}
						/>
						<div className="flex items-center justify-between text-sm">
							<span>${priceRange[0]}</span>
							<span>${priceRange[1]}</span>
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<Label className="flex items-center gap-2">
						<Package className="size-4" />
						Stock Status
					</Label>
					<Select value={stockStatus} onValueChange={setStockStatus}>
						<SelectTrigger>
							<SelectValue placeholder="Any status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="in-stock">In Stock</SelectItem>
							<SelectItem value="low-stock">Low Stock</SelectItem>
							<SelectItem value="out-of-stock">Out of Stock</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label className="flex items-center gap-2">
						<Calendar className="size-4" />
						Date Added
					</Label>
					<Select value={dateRange} onValueChange={setDateRange}>
						<SelectTrigger>
							<SelectValue placeholder="Any time" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="today">Today</SelectItem>
							<SelectItem value="week">This Week</SelectItem>
							<SelectItem value="month">This Month</SelectItem>
							<SelectItem value="year">This Year</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="flex justify-end gap-2">
				<Button
					variant="outline"
					onClick={() => {
						setCategories([]);
						setPriceRange([0, 500]);
						setStockStatus('');
						setDateRange('');
					}}
				>
					Reset
				</Button>
				<Button
					onClick={() =>
						onSearch({
							categories: categories.join(','),
							priceMin: String(priceRange[0]),
							priceMax: String(priceRange[1]),
							stockStatus,
							dateRange,
						})
					}
				>
					Apply Filters
				</Button>
			</div>
		</div>
	);
};

interface SearchHeaderProps {
	query: string;
	onQueryChange: (query: string) => void;
	resultCount: number;
	activeFilters: ActiveFilter[];
	onRemoveFilter: (type: string, value: string) => void;
	onClearAll: () => void;
}

const SearchHeader = ({
	query,
	onQueryChange,
	resultCount,
	activeFilters,
	onRemoveFilter,
	onClearAll,
}: SearchHeaderProps) => {
	const [showAdvanced, setShowAdvanced] = React.useState(false);

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						value={query}
						onChange={(e) => onQueryChange(e.target.value)}
						placeholder="Search products..."
						className="pl-10"
					/>
				</div>
				<Button
					variant={showAdvanced ? 'default' : 'outline'}
					onClick={() => setShowAdvanced(!showAdvanced)}
					className="gap-2"
				>
					<SlidersHorizontal className="size-4" />
					Advanced
				</Button>
			</div>

			{showAdvanced && (
				<AdvancedSearchForm
					onSearch={(filters) => console.log('Search:', filters)}
				/>
			)}

			{activeFilters.length > 0 && (
				<div className="flex flex-wrap items-center gap-2">
					<span className="text-sm text-muted-foreground">Active filters:</span>
					{activeFilters.map((filter) => (
						<FilterChip
							key={`${filter.type}-${filter.value}`}
							label={`${filter.type}: ${filter.value}`}
							onRemove={() => onRemoveFilter(filter.type, filter.value)}
						/>
					))}
					<Button variant="ghost" size="sm" onClick={onClearAll}>
						Clear all
					</Button>
				</div>
			)}

			<p className="text-sm text-muted-foreground">
				Found <span className="font-medium">{resultCount}</span> products
			</p>
		</div>
	);
};

export default function Main() {
	const [query, setQuery] = React.useState('');
	const [activeFilters, setActiveFilters] = React.useState<ActiveFilter[]>([
		{ type: 'Category', value: 'Electronics' },
		{ type: 'Price', value: '$0 - $100' },
		{ type: 'Stock', value: 'In Stock' },
	]);

	const removeFilter = (type: string, value: string) => {
		setActiveFilters((prev) =>
			prev.filter((f) => !(f.type === type && f.value === value))
		);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Search className="size-5" />
					<h2 className="text-xl font-semibold">Advanced Product Search</h2>
				</div>

				<SearchHeader
					query={query}
					onQueryChange={setQuery}
					resultCount={156}
					activeFilters={activeFilters}
					onRemoveFilter={removeFilter}
					onClearAll={() => setActiveFilters([])}
				/>

				<div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
					<Package className="mx-auto mb-2 size-12 opacity-30" />
					<p>Search results would appear here</p>
				</div>
			</div>
		</section>
	);
}
