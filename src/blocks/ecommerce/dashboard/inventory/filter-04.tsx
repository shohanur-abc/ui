'use client';

import * as React from 'react';
import {
	Search,
	Filter,
	RotateCcw,
	ChevronDown,
	ChevronUp,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

type FilterGroupProps = {
	title: string;
	options: { id: string; label: string; count: number }[];
	selected: string[];
	onToggle: (id: string) => void;
	defaultOpen?: boolean;
};

const FilterGroup = ({
	title,
	options,
	selected,
	onToggle,
	defaultOpen = true,
}: FilterGroupProps) => {
	const [isOpen, setIsOpen] = React.useState(defaultOpen);

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<CollapsibleTrigger asChild>
				<button className="flex w-full items-center justify-between py-2">
					<span className="font-medium">{title}</span>
					<div className="flex items-center gap-2">
						{selected.length > 0 && (
							<Badge variant="secondary" className="text-xs">
								{selected.length}
							</Badge>
						)}
						{isOpen ? (
							<ChevronUp className="size-4" />
						) : (
							<ChevronDown className="size-4" />
						)}
					</div>
				</button>
			</CollapsibleTrigger>
			<CollapsibleContent className="space-y-2 pb-4">
				{options.map((option) => (
					<div key={option.id} className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<Checkbox
								id={option.id}
								checked={selected.includes(option.id)}
								onCheckedChange={() => onToggle(option.id)}
							/>
							<Label htmlFor={option.id} className="font-normal">
								{option.label}
							</Label>
						</div>
						<span className="text-sm text-muted-foreground">
							{option.count}
						</span>
					</div>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
};

export default function Main() {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [selectedCategories, setSelectedCategories] = React.useState<string[]>([
		'electronics',
	]);
	const [selectedStatus, setSelectedStatus] = React.useState<string[]>([
		'in-stock',
		'low-stock',
	]);
	const [selectedLocations, setSelectedLocations] = React.useState<string[]>(
		[],
	);
	const [selectedSuppliers, setSelectedSuppliers] = React.useState<string[]>(
		[],
	);

	const categories = [
		{ id: 'electronics', label: 'Electronics', count: 1234 },
		{ id: 'accessories', label: 'Accessories', count: 856 },
		{ id: 'apparel', label: 'Apparel', count: 543 },
		{ id: 'home', label: 'Home & Garden', count: 321 },
		{ id: 'sports', label: 'Sports', count: 198 },
	];

	const statuses = [
		{ id: 'in-stock', label: 'In Stock', count: 2456 },
		{ id: 'low-stock', label: 'Low Stock', count: 234 },
		{ id: 'out-of-stock', label: 'Out of Stock', count: 89 },
		{ id: 'on-order', label: 'On Order', count: 156 },
	];

	const locations = [
		{ id: 'wh-main', label: 'Main Warehouse', count: 1890 },
		{ id: 'wh-east', label: 'East Distribution', count: 765 },
		{ id: 'wh-west', label: 'West Fulfillment', count: 432 },
		{ id: 'store-nyc', label: 'NYC Store', count: 123 },
	];

	const suppliers = [
		{ id: 'sup-1', label: 'TechPro Electronics', count: 456 },
		{ id: 'sup-2', label: 'Global Accessories', count: 321 },
		{ id: 'sup-3', label: 'Premium Parts Ltd', count: 234 },
		{ id: 'sup-4', label: 'Quality Goods Inc', count: 187 },
	];

	const toggleFilter = (
		id: string,
		selected: string[],
		setSelected: React.Dispatch<React.SetStateAction<string[]>>,
	) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
		);
	};

	const totalFilters =
		selectedCategories.length +
		selectedStatus.length +
		selectedLocations.length +
		selectedSuppliers.length;

	const handleReset = () => {
		setSearchQuery('');
		setSelectedCategories([]);
		setSelectedStatus([]);
		setSelectedLocations([]);
		setSelectedSuppliers([]);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card className="max-w-sm">
					<CardHeader className="pb-4">
						<div className="flex items-center justify-between">
							<CardTitle className="text-lg">Filters</CardTitle>
							{totalFilters > 0 && (
								<Button variant="ghost" size="sm" onClick={handleReset}>
									<RotateCcw className="mr-1 size-3" />
									Reset
								</Button>
							)}
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search..."
								className="pl-9"
							/>
						</div>

						<div className="divide-y">
							<FilterGroup
								title="Category"
								options={categories}
								selected={selectedCategories}
								onToggle={(id) =>
									toggleFilter(id, selectedCategories, setSelectedCategories)
								}
							/>
							<FilterGroup
								title="Status"
								options={statuses}
								selected={selectedStatus}
								onToggle={(id) =>
									toggleFilter(id, selectedStatus, setSelectedStatus)
								}
							/>
							<FilterGroup
								title="Location"
								options={locations}
								selected={selectedLocations}
								onToggle={(id) =>
									toggleFilter(id, selectedLocations, setSelectedLocations)
								}
								defaultOpen={false}
							/>
							<FilterGroup
								title="Supplier"
								options={suppliers}
								selected={selectedSuppliers}
								onToggle={(id) =>
									toggleFilter(id, selectedSuppliers, setSelectedSuppliers)
								}
								defaultOpen={false}
							/>
						</div>

						<Button className="w-full">
							<Filter className="mr-2 size-4" />
							Apply Filters
							{totalFilters > 0 && (
								<Badge variant="secondary" className="ml-2">
									{totalFilters}
								</Badge>
							)}
						</Button>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
