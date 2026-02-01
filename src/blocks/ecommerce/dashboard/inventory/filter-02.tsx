'use client';

import * as React from 'react';
import { Search, X, Calendar, DollarSign, Package, Filter } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetFooter,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

type FilterState = {
	priceRange: [number, number];
	stockRange: [number, number];
	categories: string[];
	statuses: string[];
};

type FilterSectionProps = {
	title: string;
	children: React.ReactNode;
};

const FilterSection = ({ title, children }: FilterSectionProps) => (
	<div className="space-y-3">
		<h4 className="font-medium">{title}</h4>
		{children}
	</div>
);

type CheckboxGroupProps = {
	options: { value: string; label: string }[];
	selected: string[];
	onChange: (values: string[]) => void;
};

const CheckboxGroup = ({ options, selected, onChange }: CheckboxGroupProps) => (
	<div className="space-y-2">
		{options.map((option) => (
			<div key={option.value} className="flex items-center gap-2">
				<Checkbox
					id={option.value}
					checked={selected.includes(option.value)}
					onCheckedChange={(checked) => {
						if (checked) {
							onChange([...selected, option.value]);
						} else {
							onChange(selected.filter((v) => v !== option.value));
						}
					}}
				/>
				<Label htmlFor={option.value} className="text-sm font-normal">
					{option.label}
				</Label>
			</div>
		))}
	</div>
);

type RangeSliderProps = {
	label: string;
	value: [number, number];
	onChange: (value: [number, number]) => void;
	min: number;
	max: number;
	step: number;
	formatValue: (value: number) => string;
};

const RangeSlider = ({
	label,
	value,
	onChange,
	min,
	max,
	step,
	formatValue,
}: RangeSliderProps) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<Label className="text-sm font-normal">{label}</Label>
			<span className="text-sm text-muted-foreground">
				{formatValue(value[0])} - {formatValue(value[1])}
			</span>
		</div>
		<Slider
			value={value}
			onValueChange={(v) => onChange(v as [number, number])}
			min={min}
			max={max}
			step={step}
			className="w-full"
		/>
	</div>
);

type AdvancedFiltersProps = {
	filters: FilterState;
	onFiltersChange: (filters: FilterState) => void;
	applyLabel: string;
	resetLabel: string;
	title: string;
};

const AdvancedFilters = ({
	filters,
	onFiltersChange,
	applyLabel,
	resetLabel,
	title,
}: AdvancedFiltersProps) => {
	const [localFilters, setLocalFilters] = React.useState(filters);

	const categoryOptions = [
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'accessories', label: 'Accessories' },
		{ value: 'peripherals', label: 'Peripherals' },
		{ value: 'audio', label: 'Audio' },
		{ value: 'wearables', label: 'Wearables' },
	];

	const statusOptions = [
		{ value: 'in-stock', label: 'In Stock' },
		{ value: 'low-stock', label: 'Low Stock' },
		{ value: 'out-of-stock', label: 'Out of Stock' },
		{ value: 'discontinued', label: 'Discontinued' },
	];

	const handleReset = () => {
		setLocalFilters({
			priceRange: [0, 1000],
			stockRange: [0, 500],
			categories: [],
			statuses: [],
		});
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" className="gap-2">
					<Filter className="size-4" />
					Advanced Filters
				</Button>
			</SheetTrigger>
			<SheetContent className="w-full overflow-y-auto @sm:max-w-md">
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
				</SheetHeader>
				<div className="mt-6 space-y-6">
					<FilterSection title="Price Range">
						<RangeSlider
							label="Price"
							value={localFilters.priceRange}
							onChange={(value) =>
								setLocalFilters({ ...localFilters, priceRange: value })
							}
							min={0}
							max={1000}
							step={10}
							formatValue={(v) => `$${v}`}
						/>
					</FilterSection>
					<Separator />
					<FilterSection title="Stock Level">
						<RangeSlider
							label="Units"
							value={localFilters.stockRange}
							onChange={(value) =>
								setLocalFilters({ ...localFilters, stockRange: value })
							}
							min={0}
							max={500}
							step={5}
							formatValue={(v) => `${v}`}
						/>
					</FilterSection>
					<Separator />
					<FilterSection title="Categories">
						<CheckboxGroup
							options={categoryOptions}
							selected={localFilters.categories}
							onChange={(values) =>
								setLocalFilters({ ...localFilters, categories: values })
							}
						/>
					</FilterSection>
					<Separator />
					<FilterSection title="Stock Status">
						<CheckboxGroup
							options={statusOptions}
							selected={localFilters.statuses}
							onChange={(values) =>
								setLocalFilters({ ...localFilters, statuses: values })
							}
						/>
					</FilterSection>
				</div>
				<SheetFooter className="mt-6 flex-row gap-2">
					<Button variant="outline" onClick={handleReset} className="flex-1">
						{resetLabel}
					</Button>
					<Button
						onClick={() => onFiltersChange(localFilters)}
						className="flex-1"
					>
						{applyLabel}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default function Main() {
	const [search, setSearch] = React.useState('');
	const [filters, setFilters] = React.useState<FilterState>({
		priceRange: [0, 1000],
		stockRange: [0, 500],
		categories: [],
		statuses: [],
	});

	const hasActiveFilters =
		filters.categories.length > 0 ||
		filters.statuses.length > 0 ||
		filters.priceRange[0] > 0 ||
		filters.priceRange[1] < 1000 ||
		filters.stockRange[0] > 0 ||
		filters.stockRange[1] < 500;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Advanced Search
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex flex-col gap-3 @lg:flex-row">
							<div className="relative flex-1">
								<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder="Search inventory..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className="pl-10"
								/>
							</div>
							<AdvancedFilters
								filters={filters}
								onFiltersChange={setFilters}
								applyLabel="Apply Filters"
								resetLabel="Reset"
								title="Advanced Filters"
							/>
						</div>
						{hasActiveFilters && (
							<div className="flex flex-wrap items-center gap-2">
								<span className="text-sm text-muted-foreground">
									Active filters:
								</span>
								{filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? (
									<Badge variant="secondary">
										<DollarSign className="mr-1 size-3" />$
										{filters.priceRange[0]} - ${filters.priceRange[1]}
									</Badge>
								) : null}
								{filters.stockRange[0] > 0 || filters.stockRange[1] < 500 ? (
									<Badge variant="secondary">
										<Package className="mr-1 size-3" />
										{filters.stockRange[0]} - {filters.stockRange[1]} units
									</Badge>
								) : null}
								{filters.categories.map((cat) => (
									<Badge key={cat} variant="secondary">
										{cat}
									</Badge>
								))}
								{filters.statuses.map((status) => (
									<Badge key={status} variant="secondary">
										{status}
									</Badge>
								))}
							</div>
						)}
						<div className="rounded-lg border border-dashed p-12 text-center">
							<p className="text-muted-foreground">
								{hasActiveFilters || search
									? 'Filtered results will appear here'
									: 'Use the search bar or advanced filters to find products'}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
