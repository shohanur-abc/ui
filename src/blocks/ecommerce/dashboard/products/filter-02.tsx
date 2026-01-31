'use client';

import * as React from 'react';
import {
	Search,
	Filter,
	X,
	Calendar,
	Tag,
	Package,
	DollarSign,
	Star,
	Truck,
	RotateCcw,
	ChevronDown,
	SlidersHorizontal,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuCheckboxItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

interface FilterState {
	search: string;
	categories: string[];
	priceRange: [number, number];
	status: string[];
	rating: number | null;
	dateRange: { from: string | null; to: string | null };
	hasVariants: boolean | null;
	freeShipping: boolean | null;
}

interface FilterChipProps {
	label: string;
	value: string;
	onRemove: () => void;
}

const FilterChip = ({ label, value, onRemove }: FilterChipProps) => (
	<Badge variant="secondary" className="gap-1 pr-1">
		<span className="text-xs font-normal text-muted-foreground">{label}:</span>
		{value}
		<button onClick={onRemove} className="ml-1 rounded-full p-0.5 hover:bg-muted">
			<X className="size-3" />
		</button>
	</Badge>
);

interface QuickFilterButtonProps {
	label: string;
	icon: React.ElementType;
	isActive: boolean;
	onClick: () => void;
}

const QuickFilterButton = ({ label, icon: Icon, isActive, onClick }: QuickFilterButtonProps) => (
	<Button
		variant={isActive ? 'default' : 'outline'}
		size="sm"
		className="gap-1.5"
		onClick={onClick}
	>
		<Icon className="size-3.5" />
		{label}
	</Button>
);

interface CategoryDropdownProps {
	categories: { id: string; label: string }[];
	selected: string[];
	onChange: (categories: string[]) => void;
	label: string;
}

const CategoryDropdown = ({ categories, selected, onChange, label }: CategoryDropdownProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="outline" size="sm" className="gap-1.5">
				<Tag className="size-3.5" />
				{label}
				{selected.length > 0 && (
					<Badge variant="secondary" className="ml-1 size-5 justify-center p-0 text-xs">
						{selected.length}
					</Badge>
				)}
				<ChevronDown className="size-3.5" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="start" className="w-48">
			<DropdownMenuLabel>Categories</DropdownMenuLabel>
			<DropdownMenuSeparator />
			{categories.map((cat) => (
				<DropdownMenuCheckboxItem
					key={cat.id}
					checked={selected.includes(cat.id)}
					onCheckedChange={(checked) => {
						if (checked) {
							onChange([...selected, cat.id]);
						} else {
							onChange(selected.filter((id) => id !== cat.id));
						}
					}}
				>
					{cat.label}
				</DropdownMenuCheckboxItem>
			))}
		</DropdownMenuContent>
	</DropdownMenu>
);

interface PriceRangePopoverProps {
	range: [number, number];
	onChange: (range: [number, number]) => void;
	max: number;
	label: string;
}

const PriceRangePopover = ({ range, onChange, max, label }: PriceRangePopoverProps) => (
	<Popover>
		<PopoverTrigger asChild>
			<Button variant="outline" size="sm" className="gap-1.5">
				<DollarSign className="size-3.5" />
				{label}
				{(range[0] > 0 || range[1] < max) && (
					<span className="text-xs text-muted-foreground">
						${range[0]}-${range[1]}
					</span>
				)}
			</Button>
		</PopoverTrigger>
		<PopoverContent className="w-72">
			<div className="space-y-4">
				<h4 className="font-medium">Price Range</h4>
				<Slider
					value={range}
					min={0}
					max={max}
					step={10}
					onValueChange={(v) => onChange(v as [number, number])}
				/>
				<div className="flex items-center justify-between text-sm">
					<span>${range[0]}</span>
					<span>${range[1]}</span>
				</div>
			</div>
		</PopoverContent>
	</Popover>
);

interface RatingDropdownProps {
	rating: number | null;
	onChange: (rating: number | null) => void;
	label: string;
}

const RatingDropdown = ({ rating, onChange, label }: RatingDropdownProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="outline" size="sm" className="gap-1.5">
				<Star className="size-3.5" />
				{label}
				{rating && <span className="text-xs">{rating}+</span>}
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="start">
			<DropdownMenuLabel>Minimum Rating</DropdownMenuLabel>
			<DropdownMenuSeparator />
			{[4, 3, 2, 1].map((r) => (
				<DropdownMenuItem key={r} onClick={() => onChange(r)}>
					<div className="flex items-center gap-1">
						{Array.from({ length: 5 }).map((_, i) => (
							<Star
								key={i}
								className={`size-4 ${i < r ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
							/>
						))}
						<span className="ml-2 text-sm">& up</span>
					</div>
				</DropdownMenuItem>
			))}
			<DropdownMenuSeparator />
			<DropdownMenuItem onClick={() => onChange(null)}>
				Any rating
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);

interface StatusDropdownProps {
	statuses: { id: string; label: string }[];
	selected: string[];
	onChange: (statuses: string[]) => void;
	label: string;
}

const StatusDropdown = ({ statuses, selected, onChange, label }: StatusDropdownProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="outline" size="sm" className="gap-1.5">
				<Package className="size-3.5" />
				{label}
				{selected.length > 0 && (
					<Badge variant="secondary" className="ml-1 size-5 justify-center p-0 text-xs">
						{selected.length}
					</Badge>
				)}
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="start">
			<DropdownMenuLabel>Status</DropdownMenuLabel>
			<DropdownMenuSeparator />
			{statuses.map((status) => (
				<DropdownMenuCheckboxItem
					key={status.id}
					checked={selected.includes(status.id)}
					onCheckedChange={(checked) => {
						if (checked) {
							onChange([...selected, status.id]);
						} else {
							onChange(selected.filter((id) => id !== status.id));
						}
					}}
				>
					{status.label}
				</DropdownMenuCheckboxItem>
			))}
		</DropdownMenuContent>
	</DropdownMenu>
);

export default function Main() {
	const [filters, setFilters] = React.useState<FilterState>({
		search: '',
		categories: [],
		priceRange: [0, 500],
		status: [],
		rating: null,
		dateRange: { from: null, to: null },
		hasVariants: null,
		freeShipping: null,
	});

	const categories = [
		{ id: 'electronics', label: 'Electronics' },
		{ id: 'clothing', label: 'Clothing' },
		{ id: 'home', label: 'Home & Garden' },
		{ id: 'sports', label: 'Sports' },
		{ id: 'toys', label: 'Toys & Games' },
	];

	const statuses = [
		{ id: 'active', label: 'Active' },
		{ id: 'draft', label: 'Draft' },
		{ id: 'archived', label: 'Archived' },
		{ id: 'out-of-stock', label: 'Out of Stock' },
	];

	const activeFilterCount =
		filters.categories.length +
		filters.status.length +
		(filters.rating ? 1 : 0) +
		(filters.priceRange[0] > 0 || filters.priceRange[1] < 500 ? 1 : 0) +
		(filters.freeShipping ? 1 : 0) +
		(filters.hasVariants ? 1 : 0);

	const clearAllFilters = () => {
		setFilters({
			search: '',
			categories: [],
			priceRange: [0, 500],
			status: [],
			rating: null,
			dateRange: { from: null, to: null },
			hasVariants: null,
			freeShipping: null,
		});
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl space-y-4 px-4 py-6 @sm:px-6 @2xl:px-8">
				<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							value={filters.search}
							onChange={(e) => setFilters({ ...filters, search: e.target.value })}
							placeholder="Search products by name, SKU, or description..."
							className="pl-9"
						/>
					</div>

					<div className="flex flex-wrap items-center gap-2">
						<CategoryDropdown
							categories={categories}
							selected={filters.categories}
							onChange={(categories) => setFilters({ ...filters, categories })}
							label="Category"
						/>
						<StatusDropdown
							statuses={statuses}
							selected={filters.status}
							onChange={(status) => setFilters({ ...filters, status })}
							label="Status"
						/>
						<PriceRangePopover
							range={filters.priceRange}
							onChange={(priceRange) => setFilters({ ...filters, priceRange })}
							max={500}
							label="Price"
						/>
						<RatingDropdown
							rating={filters.rating}
							onChange={(rating) => setFilters({ ...filters, rating })}
							label="Rating"
						/>
						<Button variant="outline" size="sm" className="gap-1.5">
							<SlidersHorizontal className="size-3.5" />
							More Filters
						</Button>
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-2">
					<span className="text-sm text-muted-foreground">Quick filters:</span>
					<QuickFilterButton
						label="Free Shipping"
						icon={Truck}
						isActive={filters.freeShipping === true}
						onClick={() => setFilters({ ...filters, freeShipping: !filters.freeShipping })}
					/>
					<QuickFilterButton
						label="Has Variants"
						icon={Package}
						isActive={filters.hasVariants === true}
						onClick={() => setFilters({ ...filters, hasVariants: !filters.hasVariants })}
					/>
					<QuickFilterButton
						label="Top Rated"
						icon={Star}
						isActive={filters.rating === 4}
						onClick={() => setFilters({ ...filters, rating: filters.rating === 4 ? null : 4 })}
					/>
				</div>

				{activeFilterCount > 0 && (
					<>
						<Separator />
						<div className="flex flex-wrap items-center gap-2">
							<span className="text-sm font-medium">{activeFilterCount} active filters:</span>
							{filters.categories.map((cat) => (
								<FilterChip
									key={cat}
									label="Category"
									value={categories.find((c) => c.id === cat)?.label || cat}
									onRemove={() =>
										setFilters({
											...filters,
											categories: filters.categories.filter((c) => c !== cat),
										})
									}
								/>
							))}
							{filters.status.map((s) => (
								<FilterChip
									key={s}
									label="Status"
									value={statuses.find((st) => st.id === s)?.label || s}
									onRemove={() =>
										setFilters({
											...filters,
											status: filters.status.filter((st) => st !== s),
										})
									}
								/>
							))}
							{filters.rating && (
								<FilterChip
									label="Rating"
									value={`${filters.rating}+ stars`}
									onRemove={() => setFilters({ ...filters, rating: null })}
								/>
							)}
							{(filters.priceRange[0] > 0 || filters.priceRange[1] < 500) && (
								<FilterChip
									label="Price"
									value={`$${filters.priceRange[0]}-$${filters.priceRange[1]}`}
									onRemove={() => setFilters({ ...filters, priceRange: [0, 500] })}
								/>
							)}
							{filters.freeShipping && (
								<FilterChip
									label="Shipping"
									value="Free"
									onRemove={() => setFilters({ ...filters, freeShipping: null })}
								/>
							)}
							{filters.hasVariants && (
								<FilterChip
									label="Variants"
									value="Yes"
									onRemove={() => setFilters({ ...filters, hasVariants: null })}
								/>
							)}
							<Button
								variant="ghost"
								size="sm"
								onClick={clearAllFilters}
								className="gap-1 text-muted-foreground"
							>
								<RotateCcw className="size-3.5" />
								Clear all
							</Button>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
