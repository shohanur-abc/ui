'use client';

import * as React from 'react';
import {
	Search,
	X,
	SlidersHorizontal,
	Calendar,
	Warehouse,
	Tag,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

type ActiveFilter = {
	id: string;
	label: string;
	value: string;
};

type FilterChipProps = {
	filter: ActiveFilter;
	onRemove: (id: string) => void;
};

const FilterChip = ({ filter, onRemove }: FilterChipProps) => (
	<Badge variant="secondary" className="gap-2 py-1.5 px-3">
		<span className="text-muted-foreground">{filter.label}:</span>
		{filter.value}
		<button
			onClick={() => onRemove(filter.id)}
			className="ml-1 hover:text-destructive"
		>
			<X className="size-3" />
		</button>
	</Badge>
);

type StockRangeProps = {
	min: number;
	max: number;
	value: [number, number];
	onChange: (value: [number, number]) => void;
};

const StockRange = ({ min, max, value, onChange }: StockRangeProps) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<Label>Stock Level Range</Label>
			<span className="text-sm text-muted-foreground">
				{value[0]} - {value[1]}
			</span>
		</div>
		<Slider
			value={value}
			onValueChange={(v) => onChange(v as [number, number])}
			min={min}
			max={max}
			step={1}
		/>
	</div>
);

export default function Main() {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [category, setCategory] = React.useState('');
	const [location, setLocation] = React.useState('');
	const [stockRange, setStockRange] = React.useState<[number, number]>([
		0, 1000,
	]);
	const [activeFilters, setActiveFilters] = React.useState<ActiveFilter[]>([
		{ id: '1', label: 'Category', value: 'Electronics' },
		{ id: '2', label: 'Status', value: 'Low Stock' },
	]);

	const categories = [
		'Electronics',
		'Accessories',
		'Apparel',
		'Home & Garden',
		'Sports',
	];
	const locations = [
		'Main Warehouse',
		'East Distribution',
		'West Fulfillment',
		'NYC Store',
	];
	const statuses = ['In Stock', 'Low Stock', 'Out of Stock', 'On Order'];

	const handleRemoveFilter = (id: string) => {
		setActiveFilters((prev) => prev.filter((f) => f.id !== id));
	};

	const handleClearAll = () => {
		setActiveFilters([]);
		setSearchQuery('');
		setCategory('');
		setLocation('');
		setStockRange([0, 1000]);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader className="pb-4">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">
									Advanced Filters
								</CardTitle>
								<CardDescription>Refine your inventory search</CardDescription>
							</div>
							<Button variant="ghost" size="sm" onClick={handleClearAll}>
								Clear All
							</Button>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search by name, SKU, or barcode..."
								className="pl-9"
							/>
						</div>

						<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
							<div className="space-y-2">
								<Label>Category</Label>
								<Select value={category} onValueChange={setCategory}>
									<SelectTrigger>
										<Tag className="mr-2 size-4" />
										<SelectValue placeholder="All categories" />
									</SelectTrigger>
									<SelectContent>
										{categories.map((cat) => (
											<SelectItem key={cat} value={cat}>
												{cat}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label>Location</Label>
								<Select value={location} onValueChange={setLocation}>
									<SelectTrigger>
										<Warehouse className="mr-2 size-4" />
										<SelectValue placeholder="All locations" />
									</SelectTrigger>
									<SelectContent>
										{locations.map((loc) => (
											<SelectItem key={loc} value={loc}>
												{loc}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label>Date Added</Label>
								<Select>
									<SelectTrigger>
										<Calendar className="mr-2 size-4" />
										<SelectValue placeholder="Any time" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="today">Today</SelectItem>
										<SelectItem value="week">Last 7 days</SelectItem>
										<SelectItem value="month">Last 30 days</SelectItem>
										<SelectItem value="quarter">Last quarter</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label>Status</Label>
								<div className="flex flex-wrap gap-2">
									{statuses.map((status) => (
										<div key={status} className="flex items-center space-x-2">
											<Checkbox id={status} />
											<Label htmlFor={status} className="text-xs font-normal">
												{status}
											</Label>
										</div>
									))}
								</div>
							</div>
						</div>

						<StockRange
							min={0}
							max={1000}
							value={stockRange}
							onChange={setStockRange}
						/>

						{activeFilters.length > 0 && (
							<div className="flex flex-wrap items-center gap-2">
								<span className="text-sm text-muted-foreground">
									Active filters:
								</span>
								{activeFilters.map((filter) => (
									<FilterChip
										key={filter.id}
										filter={filter}
										onRemove={handleRemoveFilter}
									/>
								))}
							</div>
						)}

						<div className="flex justify-end gap-3 border-t pt-4">
							<Button variant="outline">
								<SlidersHorizontal className="mr-2 size-4" />
								Save Filter Preset
							</Button>
							<Button>Apply Filters</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
