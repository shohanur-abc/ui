'use client';

import * as React from 'react';
import {
	Filter,
	X,
	Save,
	ChevronDown,
	SlidersHorizontal,
	Package,
	DollarSign,
	Tag,
	Calendar,
	Star,
	Check,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

interface FilterSection {
	id: string;
	label: string;
	icon: React.ElementType;
	type: 'checkbox' | 'range' | 'select' | 'rating';
	options?: { value: string; label: string; count?: number }[];
}

interface ActiveFilter {
	sectionId: string;
	value: string | number | [number, number];
	label: string;
}

interface FilterCheckboxGroupProps {
	section: FilterSection;
	selected: string[];
	onToggle: (value: string) => void;
}

const FilterCheckboxGroup = ({
	section,
	selected,
	onToggle,
}: FilterCheckboxGroupProps) => (
	<div className="space-y-2">
		{section.options?.map((option) => (
			<label
				key={option.value}
				className="flex cursor-pointer items-center gap-2 rounded-md p-1 hover:bg-accent"
			>
				<Checkbox
					checked={selected.includes(option.value)}
					onCheckedChange={() => onToggle(option.value)}
				/>
				<span className="flex-1">{option.label}</span>
				{option.count !== undefined && (
					<Badge variant="outline" className="text-xs">
						{option.count}
					</Badge>
				)}
			</label>
		))}
	</div>
);

interface FilterRatingProps {
	value: number;
	onChange: (value: number) => void;
}

const FilterRating = ({ value, onChange }: FilterRatingProps) => (
	<div className="space-y-3">
		{[4, 3, 2, 1].map((rating) => (
			<button
				key={rating}
				onClick={() => onChange(rating)}
				className={`flex w-full items-center gap-2 rounded-md p-2 transition-colors ${value === rating ? 'bg-primary/10' : 'hover:bg-accent'}`}
			>
				<div className="flex items-center">
					{[1, 2, 3, 4, 5].map((star) => (
						<Star
							key={star}
							className={`size-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
						/>
					))}
				</div>
				<span className="text-sm">& Up</span>
				{value === rating && <Check className="ml-auto size-4 text-primary" />}
			</button>
		))}
	</div>
);

interface CombinedFiltersProps {
	sections: FilterSection[];
	activeFilters: ActiveFilter[];
	onAddFilter: (filter: ActiveFilter) => void;
	onRemoveFilter: (sectionId: string, value: string | number) => void;
	onClearAll: () => void;
}

const CombinedFilters = ({
	sections,
	activeFilters,
	onAddFilter,
	onRemoveFilter,
	onClearAll,
}: CombinedFiltersProps) => {
	const [priceRange, setPriceRange] = React.useState([0, 500]);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" className="gap-2">
					<Filter className="size-4" />
					All Filters
					{activeFilters.length > 0 && (
						<Badge variant="secondary">{activeFilters.length}</Badge>
					)}
				</Button>
			</SheetTrigger>
			<SheetContent className="w-[400px] sm:max-w-[400px]">
				<SheetHeader>
					<SheetTitle className="flex items-center gap-2">
						<SlidersHorizontal className="size-5" />
						Filters
					</SheetTitle>
					<SheetDescription>
						Apply filters to narrow down products
					</SheetDescription>
				</SheetHeader>

				<div className="mt-6 space-y-6 overflow-y-auto pr-2">
					{sections.map((section) => {
						const Icon = section.icon;
						const sectionFilters = activeFilters.filter(
							(f) => f.sectionId === section.id
						);

						return (
							<div key={section.id}>
								<div className="mb-3 flex items-center gap-2">
									<Icon className="size-4" />
									<Label>{section.label}</Label>
									{sectionFilters.length > 0 && (
										<Badge variant="secondary" className="ml-auto text-xs">
											{sectionFilters.length}
										</Badge>
									)}
								</div>

								{section.type === 'checkbox' && (
									<FilterCheckboxGroup
										section={section}
										selected={sectionFilters.map((f) => f.value as string)}
										onToggle={(value) => {
											const exists = sectionFilters.find(
												(f) => f.value === value
											);
											if (exists) {
												onRemoveFilter(section.id, value);
											} else {
												onAddFilter({
													sectionId: section.id,
													value,
													label: section.options?.find((o) => o.value === value)
														?.label || value,
												});
											}
										}}
									/>
								)}

								{section.type === 'range' && (
									<div className="space-y-4">
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
								)}

								{section.type === 'select' && (
									<Select
										onValueChange={(value) => {
											onAddFilter({
												sectionId: section.id,
												value,
												label:
													section.options?.find((o) => o.value === value)
														?.label || value,
											});
										}}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select..." />
										</SelectTrigger>
										<SelectContent>
											{section.options?.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}

								{section.type === 'rating' && (
									<FilterRating
										value={
											sectionFilters.length > 0
												? (sectionFilters[0].value as number)
												: 0
										}
										onChange={(value) => {
											onAddFilter({
												sectionId: section.id,
												value,
												label: `${value}+ stars`,
											});
										}}
									/>
								)}

								<Separator className="mt-4" />
							</div>
						);
					})}
				</div>

				<SheetFooter className="mt-6">
					<Button
						variant="outline"
						onClick={onClearAll}
						disabled={activeFilters.length === 0}
					>
						Clear All
					</Button>
					<Button className="gap-2">
						<Check className="size-4" />
						Apply Filters
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

interface ActiveFilterBarProps {
	filters: ActiveFilter[];
	sections: FilterSection[];
	onRemove: (sectionId: string, value: string | number) => void;
	onClearAll: () => void;
}

const ActiveFilterBar = ({
	filters,
	sections,
	onRemove,
	onClearAll,
}: ActiveFilterBarProps) => {
	if (filters.length === 0) return null;

	return (
		<div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/30 p-3">
			<span className="text-sm font-medium">Active:</span>
			{filters.map((filter, idx) => {
				const section = sections.find((s) => s.id === filter.sectionId);
				return (
					<Badge key={`${filter.sectionId}-${idx}`} variant="secondary" className="gap-1">
						{section?.label}: {filter.label}
						<button
							onClick={() =>
								onRemove(filter.sectionId, filter.value as string | number)
							}
						>
							<X className="size-3" />
						</button>
					</Badge>
				);
			})}
			<Button variant="ghost" size="sm" onClick={onClearAll}>
				Clear All
			</Button>
		</div>
	);
};

export default function Main() {
	const [activeFilters, setActiveFilters] = React.useState<ActiveFilter[]>([]);

	const sections: FilterSection[] = [
		{
			id: 'category',
			label: 'Category',
			icon: Tag,
			type: 'checkbox',
			options: [
				{ value: 'electronics', label: 'Electronics', count: 124 },
				{ value: 'clothing', label: 'Clothing', count: 89 },
				{ value: 'home', label: 'Home & Garden', count: 67 },
				{ value: 'sports', label: 'Sports', count: 45 },
			],
		},
		{
			id: 'stock',
			label: 'Stock Status',
			icon: Package,
			type: 'checkbox',
			options: [
				{ value: 'in-stock', label: 'In Stock', count: 189 },
				{ value: 'low-stock', label: 'Low Stock', count: 42 },
				{ value: 'out-of-stock', label: 'Out of Stock', count: 18 },
			],
		},
		{
			id: 'price',
			label: 'Price Range',
			icon: DollarSign,
			type: 'range',
		},
		{
			id: 'date',
			label: 'Date Added',
			icon: Calendar,
			type: 'select',
			options: [
				{ value: 'today', label: 'Today' },
				{ value: 'week', label: 'This Week' },
				{ value: 'month', label: 'This Month' },
				{ value: 'year', label: 'This Year' },
			],
		},
		{
			id: 'rating',
			label: 'Rating',
			icon: Star,
			type: 'rating',
		},
	];

	const addFilter = (filter: ActiveFilter) => {
		setActiveFilters((prev) => {
			const existing = prev.findIndex(
				(f) => f.sectionId === filter.sectionId && f.value === filter.value
			);
			if (existing >= 0) return prev;

			// For single-select types, replace existing
			const section = sections.find((s) => s.id === filter.sectionId);
			if (section?.type === 'select' || section?.type === 'rating') {
				return [
					...prev.filter((f) => f.sectionId !== filter.sectionId),
					filter,
				];
			}

			return [...prev, filter];
		});
	};

	const removeFilter = (sectionId: string, value: string | number) => {
		setActiveFilters((prev) =>
			prev.filter((f) => !(f.sectionId === sectionId && f.value === value))
		);
	};

	const clearAll = () => setActiveFilters([]);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Filter className="size-5" />
					<h2 className="text-xl font-semibold">Combined Filter View</h2>
				</div>

				<div className="flex items-center gap-4">
					<CombinedFilters
						sections={sections}
						activeFilters={activeFilters}
						onAddFilter={addFilter}
						onRemoveFilter={removeFilter}
						onClearAll={clearAll}
					/>
					<Input placeholder="Search products..." className="max-w-xs" />
				</div>

				<ActiveFilterBar
					filters={activeFilters}
					sections={sections}
					onRemove={removeFilter}
					onClearAll={clearAll}
				/>

				<div className="rounded-lg border bg-card p-6">
					<p className="text-center text-muted-foreground">
						{activeFilters.length > 0
							? `Showing products matching ${activeFilters.length} filter(s)`
							: 'Showing all products'}
					</p>
				</div>
			</div>
		</section>
	);
}
