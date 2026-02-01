'use client';

import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type CategoryItem = {
	id: number;
	category: string;
	products: number;
	revenue: number;
	growth: number;
	avgPrice: number;
	conversionRate: number;
};

type SortConfig = {
	key: keyof CategoryItem | null;
	direction: 'asc' | 'desc';
};

type SortableHeaderProps = {
	label: string;
	sortKey: keyof CategoryItem;
	currentSort: SortConfig;
	onSort: (key: keyof CategoryItem) => void;
	align?: 'left' | 'right';
};

const SortableHeader = ({
	label,
	sortKey,
	currentSort,
	onSort,
	align = 'left',
}: SortableHeaderProps) => {
	const isActive = currentSort.key === sortKey;

	return (
		<TableHead
			className={`cursor-pointer select-none transition-colors hover:text-foreground ${align === 'right' ? 'text-right' : ''}`}
			onClick={() => onSort(sortKey)}
		>
			<div
				className={`flex items-center gap-1.5 ${align === 'right' ? 'justify-end' : ''}`}
			>
				{label}
				{isActive ? (
					currentSort.direction === 'asc' ? (
						<ArrowUp className="size-3.5 text-primary" />
					) : (
						<ArrowDown className="size-3.5 text-primary" />
					)
				) : (
					<ArrowUpDown className="size-3.5 text-muted-foreground/40" />
				)}
			</div>
		</TableHead>
	);
};

type CategoryRowProps = CategoryItem;

const CategoryRow = ({
	category,
	products,
	revenue,
	growth,
	avgPrice,
	conversionRate,
}: CategoryRowProps) => (
	<TableRow className="group transition-colors hover:bg-muted/50">
		<TableCell className="font-medium">{category}</TableCell>
		<TableCell className="text-right">{products}</TableCell>
		<TableCell className="text-right font-medium">
			${revenue.toLocaleString()}
		</TableCell>
		<TableCell className="text-right">
			<span className={growth >= 0 ? 'text-emerald-500' : 'text-rose-500'}>
				{growth >= 0 ? '+' : ''}
				{growth}%
			</span>
		</TableCell>
		<TableCell className="text-right">${avgPrice.toFixed(2)}</TableCell>
		<TableCell className="text-right">{conversionRate}%</TableCell>
	</TableRow>
);

export default function Main() {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: 'revenue',
		direction: 'desc',
	});

	const categories: CategoryItem[] = [
		{
			id: 1,
			category: 'Electronics',
			products: 245,
			revenue: 128500,
			growth: 24.5,
			avgPrice: 524.49,
			conversionRate: 4.2,
		},
		{
			id: 2,
			category: 'Fashion',
			products: 512,
			revenue: 89200,
			growth: 12.3,
			avgPrice: 174.22,
			conversionRate: 3.8,
		},
		{
			id: 3,
			category: 'Home & Living',
			products: 189,
			revenue: 67800,
			growth: 8.7,
			avgPrice: 358.73,
			conversionRate: 5.1,
		},
		{
			id: 4,
			category: 'Sports',
			products: 156,
			revenue: 45600,
			growth: -2.4,
			avgPrice: 292.31,
			conversionRate: 3.2,
		},
		{
			id: 5,
			category: 'Beauty',
			products: 324,
			revenue: 52300,
			growth: 18.9,
			avgPrice: 161.42,
			conversionRate: 6.4,
		},
		{
			id: 6,
			category: 'Books',
			products: 892,
			revenue: 34100,
			growth: 5.2,
			avgPrice: 38.23,
			conversionRate: 2.8,
		},
	];

	const handleSort = (key: keyof CategoryItem) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
		}));
	};

	const sortedCategories = [...categories].sort((a, b) => {
		if (!sortConfig.key) return 0;
		const aVal = a[sortConfig.key];
		const bVal = b[sortConfig.key];
		const modifier = sortConfig.direction === 'asc' ? 1 : -1;
		if (typeof aVal === 'string' && typeof bVal === 'string') {
			return aVal.localeCompare(bVal) * modifier;
		}
		return ((aVal as number) - (bVal as number)) * modifier;
	});

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-center justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Category Performance
							</CardTitle>
							<CardDescription>
								Click column headers to sort data
							</CardDescription>
						</div>
						<Button variant="ghost" size="icon">
							<MoreHorizontal className="size-4" />
						</Button>
					</CardHeader>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="border-border/50 hover:bg-transparent">
									<SortableHeader
										label="Category"
										sortKey="category"
										currentSort={sortConfig}
										onSort={handleSort}
									/>
									<SortableHeader
										label="Products"
										sortKey="products"
										currentSort={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<SortableHeader
										label="Revenue"
										sortKey="revenue"
										currentSort={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<SortableHeader
										label="Growth"
										sortKey="growth"
										currentSort={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<SortableHeader
										label="Avg Price"
										sortKey="avgPrice"
										currentSort={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<SortableHeader
										label="Conv. Rate"
										sortKey="conversionRate"
										currentSort={sortConfig}
										onSort={handleSort}
										align="right"
									/>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sortedCategories.map((category) => (
									<CategoryRow key={category.id} {...category} />
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
