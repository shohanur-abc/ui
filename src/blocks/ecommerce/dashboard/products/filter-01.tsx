'use client';

import * as React from 'react';
import {
	Search,
	Filter,
	X,
	ChevronDown,
	ChevronUp,
	Check,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

interface FilterOption {
	id: string;
	label: string;
	count: number;
}

interface PriceRange {
	min: number;
	max: number;
}

interface ActiveFilter {
	type: string;
	value: string;
	label: string;
}

interface FilterSectionProps {
	title: string;
	options: FilterOption[];
	selected: string[];
	onToggle: (id: string) => void;
	defaultOpen?: boolean;
}

const FilterSection = ({ title, options, selected, onToggle, defaultOpen = true }: FilterSectionProps) => {
	const [isOpen, setIsOpen] = React.useState(defaultOpen);

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<CollapsibleTrigger className="flex w-full items-center justify-between py-2">
				<span className="text-sm font-medium">{title}</span>
				{isOpen ? (
					<ChevronUp className="size-4 text-muted-foreground" />
				) : (
					<ChevronDown className="size-4 text-muted-foreground" />
				)}
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="space-y-2 pb-4">
					{options.map((option) => (
						<label
							key={option.id}
							className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted"
						>
							<Checkbox
								checked={selected.includes(option.id)}
								onCheckedChange={() => onToggle(option.id)}
							/>
							<span className="flex-1 text-sm">{option.label}</span>
							<span className="text-xs text-muted-foreground">({option.count})</span>
						</label>
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

interface PriceFilterProps {
	title: string;
	range: PriceRange;
	value: [number, number];
	onChange: (value: [number, number]) => void;
}

const PriceFilter = ({ title, range, value, onChange }: PriceFilterProps) => {
	const [isOpen, setIsOpen] = React.useState(true);

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<CollapsibleTrigger className="flex w-full items-center justify-between py-2">
				<span className="text-sm font-medium">{title}</span>
				{isOpen ? (
					<ChevronUp className="size-4 text-muted-foreground" />
				) : (
					<ChevronDown className="size-4 text-muted-foreground" />
				)}
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="space-y-4 pb-4">
					<Slider
						value={value}
						min={range.min}
						max={range.max}
						step={1}
						onValueChange={(v) => onChange(v as [number, number])}
					/>
					<div className="flex items-center gap-2">
						<div className="flex-1">
							<Label className="text-xs text-muted-foreground">Min</Label>
							<Input
								type="number"
								value={value[0]}
								onChange={(e) => onChange([Number(e.target.value), value[1]])}
								className="h-8"
							/>
						</div>
						<span className="mt-5 text-muted-foreground">—</span>
						<div className="flex-1">
							<Label className="text-xs text-muted-foreground">Max</Label>
							<Input
								type="number"
								value={value[1]}
								onChange={(e) => onChange([value[0], Number(e.target.value)])}
								className="h-8"
							/>
						</div>
					</div>
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

interface ActiveFiltersProps {
	filters: ActiveFilter[];
	onRemove: (filter: ActiveFilter) => void;
	onClearAll: () => void;
	labels: { clearAll: string };
}

const ActiveFilters = ({ filters, onRemove, onClearAll, labels }: ActiveFiltersProps) => {
	if (filters.length === 0) return null;

	return (
		<div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/30 p-3">
			{filters.map((filter, idx) => (
				<Badge key={idx} variant="secondary" className="gap-1 pr-1">
					<span className="text-xs text-muted-foreground">{filter.type}:</span>
					{filter.label}
					<button
						onClick={() => onRemove(filter)}
						className="ml-1 rounded-full p-0.5 hover:bg-muted"
					>
						<X className="size-3" />
					</button>
				</Badge>
			))}
			<Button variant="ghost" size="sm" onClick={onClearAll} className="text-xs">
				{labels.clearAll}
			</Button>
		</div>
	);
};

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
}

const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => (
	<div className="relative">
		<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
		<Input
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className="pl-9"
		/>
		{value && (
			<button
				onClick={() => onChange('')}
				className="absolute right-3 top-1/2 -translate-y-1/2"
			>
				<X className="size-4 text-muted-foreground hover:text-foreground" />
			</button>
		)}
	</div>
);

export default function Main() {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 500]);
	const [selectedCategories, setSelectedCategories] = React.useState<string[]>(['electronics']);
	const [selectedStatus, setSelectedStatus] = React.useState<string[]>(['active']);
	const [selectedStock, setSelectedStock] = React.useState<string[]>([]);

	const categories: FilterOption[] = [
		{ id: 'electronics', label: 'Electronics', count: 234 },
		{ id: 'clothing', label: 'Clothing', count: 567 },
		{ id: 'home', label: 'Home & Garden', count: 189 },
		{ id: 'sports', label: 'Sports', count: 145 },
		{ id: 'toys', label: 'Toys & Games', count: 89 },
	];

	const statuses: FilterOption[] = [
		{ id: 'active', label: 'Active', count: 1089 },
		{ id: 'draft', label: 'Draft', count: 45 },
		{ id: 'archived', label: 'Archived', count: 23 },
	];

	const stockOptions: FilterOption[] = [
		{ id: 'in-stock', label: 'In Stock', count: 890 },
		{ id: 'low-stock', label: 'Low Stock', count: 123 },
		{ id: 'out-of-stock', label: 'Out of Stock', count: 45 },
	];

	const activeFilters: ActiveFilter[] = [
		...selectedCategories.map((id) => ({
			type: 'Category',
			value: id,
			label: categories.find((c) => c.id === id)?.label || id,
		})),
		...selectedStatus.map((id) => ({
			type: 'Status',
			value: id,
			label: statuses.find((s) => s.id === id)?.label || id,
		})),
		...selectedStock.map((id) => ({
			type: 'Stock',
			value: id,
			label: stockOptions.find((s) => s.id === id)?.label || id,
		})),
	];

	const handleToggleCategory = (id: string) => {
		setSelectedCategories((prev) =>
			prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
		);
	};

	const handleToggleStatus = (id: string) => {
		setSelectedStatus((prev) =>
			prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
		);
	};

	const handleToggleStock = (id: string) => {
		setSelectedStock((prev) =>
			prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
		);
	};

	const handleRemoveFilter = (filter: ActiveFilter) => {
		if (filter.type === 'Category') {
			setSelectedCategories((prev) => prev.filter((c) => c !== filter.value));
		} else if (filter.type === 'Status') {
			setSelectedStatus((prev) => prev.filter((s) => s !== filter.value));
		} else if (filter.type === 'Stock') {
			setSelectedStock((prev) => prev.filter((s) => s !== filter.value));
		}
	};

	const handleClearAll = () => {
		setSelectedCategories([]);
		setSelectedStatus([]);
		setSelectedStock([]);
		setPriceRange([0, 500]);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-sm space-y-4 px-4 py-8 @sm:px-6">
				<div className="flex items-center justify-between">
					<h2 className="font-semibold">Filters</h2>
					<Button variant="ghost" size="sm" onClick={handleClearAll}>
						Reset All
					</Button>
				</div>

				<SearchBar
					value={searchQuery}
					onChange={setSearchQuery}
					placeholder="Search products..."
				/>

				<ActiveFilters
					filters={activeFilters}
					onRemove={handleRemoveFilter}
					onClearAll={handleClearAll}
					labels={{ clearAll: 'Clear all' }}
				/>

				<Separator />

				<FilterSection
					title="Category"
					options={categories}
					selected={selectedCategories}
					onToggle={handleToggleCategory}
				/>

				<Separator />

				<FilterSection
					title="Status"
					options={statuses}
					selected={selectedStatus}
					onToggle={handleToggleStatus}
				/>

				<Separator />

				<PriceFilter
					title="Price Range"
					range={{ min: 0, max: 500 }}
					value={priceRange}
					onChange={setPriceRange}
				/>

				<Separator />

				<FilterSection
					title="Stock Level"
					options={stockOptions}
					selected={selectedStock}
					onToggle={handleToggleStock}
					defaultOpen={false}
				/>

				<Button className="w-full gap-2">
					<Filter className="size-4" />
					Apply Filters ({activeFilters.length})
				</Button>
			</div>
		</section>
	);
}
