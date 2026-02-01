'use client';

import * as React from 'react';
import { Search, SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

type FilterOption = {
	value: string;
	label: string;
	count?: number;
};

type ActiveFilter = {
	type: string;
	value: string;
	label: string;
};

type FilterDropdownProps = {
	label: string;
	options: FilterOption[];
	selected: string[];
	onChange: (values: string[]) => void;
};

const FilterDropdown = ({
	label,
	options,
	selected,
	onChange,
}: FilterDropdownProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="outline" className="gap-2">
				{label}
				{selected.length > 0 && (
					<Badge variant="secondary" className="ml-1 px-1.5">
						{selected.length}
					</Badge>
				)}
				<ChevronDown className="size-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="start" className="w-56">
			<DropdownMenuLabel>{label}</DropdownMenuLabel>
			<DropdownMenuSeparator />
			{options.map((option) => (
				<DropdownMenuCheckboxItem
					key={option.value}
					checked={selected.includes(option.value)}
					onCheckedChange={(checked) => {
						if (checked) {
							onChange([...selected, option.value]);
						} else {
							onChange(selected.filter((v) => v !== option.value));
						}
					}}
				>
					<span className="flex-1">{option.label}</span>
					{option.count !== undefined && (
						<span className="text-xs text-muted-foreground">
							{option.count}
						</span>
					)}
				</DropdownMenuCheckboxItem>
			))}
		</DropdownMenuContent>
	</DropdownMenu>
);

type ActiveFiltersProps = {
	filters: ActiveFilter[];
	onRemove: (filter: ActiveFilter) => void;
	onClearAll: () => void;
	clearAllLabel: string;
};

const ActiveFilters = ({
	filters,
	onRemove,
	onClearAll,
	clearAllLabel,
}: ActiveFiltersProps) => (
	<div className="flex flex-wrap items-center gap-2">
		{filters.map((filter) => (
			<Badge
				key={`${filter.type}-${filter.value}`}
				variant="secondary"
				className="gap-1 pr-1"
			>
				<span className="text-xs text-muted-foreground">{filter.type}:</span>
				{filter.label}
				<Button
					variant="ghost"
					size="icon-sm"
					className="ml-1 size-4 hover:bg-destructive/20"
					onClick={() => onRemove(filter)}
				>
					<X className="size-3" />
				</Button>
			</Badge>
		))}
		{filters.length > 1 && (
			<Button
				variant="ghost"
				size="sm"
				onClick={onClearAll}
				className="text-xs"
			>
				{clearAllLabel}
			</Button>
		)}
	</div>
);

type SearchBarProps = {
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
};

const SearchBar = ({ placeholder, value, onChange }: SearchBarProps) => (
	<div className="relative flex-1">
		<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
		<Input
			placeholder={placeholder}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="pl-10"
		/>
		{value && (
			<Button
				variant="ghost"
				size="icon-sm"
				className="absolute right-2 top-1/2 size-6 -translate-y-1/2"
				onClick={() => onChange('')}
			>
				<X className="size-4" />
			</Button>
		)}
	</div>
);

export default function Main() {
	const [search, setSearch] = React.useState('');
	const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
		[],
	);
	const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);
	const [selectedLocations, setSelectedLocations] = React.useState<string[]>(
		[],
	);

	const categoryOptions: FilterOption[] = [
		{ value: 'electronics', label: 'Electronics', count: 245 },
		{ value: 'accessories', label: 'Accessories', count: 189 },
		{ value: 'peripherals', label: 'Peripherals', count: 78 },
		{ value: 'audio', label: 'Audio', count: 56 },
	];

	const statusOptions: FilterOption[] = [
		{ value: 'in-stock', label: 'In Stock', count: 412 },
		{ value: 'low-stock', label: 'Low Stock', count: 45 },
		{ value: 'out-of-stock', label: 'Out of Stock', count: 23 },
		{ value: 'incoming', label: 'Incoming', count: 88 },
	];

	const locationOptions: FilterOption[] = [
		{ value: 'warehouse-a', label: 'Warehouse A', count: 280 },
		{ value: 'warehouse-b', label: 'Warehouse B', count: 156 },
		{ value: 'store-nyc', label: 'Store NYC', count: 89 },
		{ value: 'store-la', label: 'Store LA', count: 43 },
	];

	const activeFilters: ActiveFilter[] = [
		...selectedCategories.map((v) => ({
			type: 'Category',
			value: v,
			label: categoryOptions.find((o) => o.value === v)?.label || v,
		})),
		...selectedStatus.map((v) => ({
			type: 'Status',
			value: v,
			label: statusOptions.find((o) => o.value === v)?.label || v,
		})),
		...selectedLocations.map((v) => ({
			type: 'Location',
			value: v,
			label: locationOptions.find((o) => o.value === v)?.label || v,
		})),
	];

	const handleRemoveFilter = (filter: ActiveFilter) => {
		if (filter.type === 'Category') {
			setSelectedCategories((prev) => prev.filter((v) => v !== filter.value));
		} else if (filter.type === 'Status') {
			setSelectedStatus((prev) => prev.filter((v) => v !== filter.value));
		} else if (filter.type === 'Location') {
			setSelectedLocations((prev) => prev.filter((v) => v !== filter.value));
		}
	};

	const handleClearAll = () => {
		setSelectedCategories([]);
		setSelectedStatus([]);
		setSelectedLocations([]);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Filter Inventory
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex flex-col gap-3 @lg:flex-row">
							<SearchBar
								placeholder="Search by name, SKU, or barcode..."
								value={search}
								onChange={setSearch}
							/>
							<div className="flex flex-wrap gap-2">
								<FilterDropdown
									label="Category"
									options={categoryOptions}
									selected={selectedCategories}
									onChange={setSelectedCategories}
								/>
								<FilterDropdown
									label="Status"
									options={statusOptions}
									selected={selectedStatus}
									onChange={setSelectedStatus}
								/>
								<FilterDropdown
									label="Location"
									options={locationOptions}
									selected={selectedLocations}
									onChange={setSelectedLocations}
								/>
								<Button variant="outline">
									<SlidersHorizontal className="size-4" />
									More Filters
								</Button>
							</div>
						</div>
						{activeFilters.length > 0 && (
							<ActiveFilters
								filters={activeFilters}
								onRemove={handleRemoveFilter}
								onClearAll={handleClearAll}
								clearAllLabel="Clear all"
							/>
						)}
						<div className="rounded-lg border border-dashed p-12 text-center">
							<p className="text-muted-foreground">
								{activeFilters.length > 0 || search
									? `Showing results for ${activeFilters.length} filters${search ? ` and "${search}"` : ''}`
									: 'Apply filters to refine your inventory search'}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
