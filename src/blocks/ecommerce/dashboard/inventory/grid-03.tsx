'use client';

import * as React from 'react';
import {
	Package,
	TrendingUp,
	TrendingDown,
	Minus,
	ArrowRight,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	image: string;
	quantity: number;
	price: number;
	trend: 'up' | 'down' | 'stable';
	trendValue: string;
	category: string;
};

type CompactCardProps = {
	item: InventoryItem;
	viewLabel: string;
	onView: (id: string) => void;
};

const CompactCard = ({ item, viewLabel, onView }: CompactCardProps) => {
	const TrendIcon =
		item.trend === 'up'
			? TrendingUp
			: item.trend === 'down'
				? TrendingDown
				: Minus;
	const trendColor =
		item.trend === 'up'
			? 'text-emerald-500'
			: item.trend === 'down'
				? 'text-red-500'
				: 'text-muted-foreground';

	return (
		<Card className="group transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
			<CardContent className="flex items-center gap-3 p-3">
				<div className="relative size-12 shrink-0 overflow-hidden rounded-lg border bg-muted">
					{item.image ? (
						<img
							src={item.image}
							alt={item.name}
							className="size-full object-cover"
						/>
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-5 text-muted-foreground" />
						</div>
					)}
				</div>
				<div className="min-w-0 flex-1">
					<div className="flex items-center justify-between gap-2">
						<h3 className="truncate text-sm font-medium">{item.name}</h3>
						<Badge variant="outline" className="shrink-0 text-xs">
							{item.category}
						</Badge>
					</div>
					<div className="mt-1 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<span className="text-xs text-muted-foreground">{item.sku}</span>
							<span className="font-semibold tabular-nums">
								{item.quantity} units
							</span>
						</div>
						<div className={`flex items-center gap-1 text-xs ${trendColor}`}>
							<TrendIcon className="size-3" />
							<span>{item.trendValue}</span>
						</div>
					</div>
				</div>
				<Button
					variant="ghost"
					size="icon-sm"
					onClick={() => onView(item.id)}
					className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
				>
					<ArrowRight className="size-4" />
				</Button>
			</CardContent>
		</Card>
	);
};

type CategorySectionProps = {
	category: string;
	items: InventoryItem[];
	viewLabel: string;
	onView: (id: string) => void;
};

const CategorySection = ({
	category,
	items,
	viewLabel,
	onView,
}: CategorySectionProps) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h2 className="text-lg font-semibold">{category}</h2>
			<Badge variant="secondary">{items.length} items</Badge>
		</div>
		<div className="grid gap-2">
			{items.map((item) => (
				<CompactCard
					key={item.id}
					item={item}
					viewLabel={viewLabel}
					onView={onView}
				/>
			))}
		</div>
	</div>
);

export default function Main() {
	const inventory: InventoryItem[] = [
		{
			id: '1',
			name: 'Wireless Earbuds Pro',
			sku: 'WEP-001',
			image: '',
			quantity: 245,
			price: 129.99,
			trend: 'up',
			trendValue: '+12%',
			category: 'Electronics',
		},
		{
			id: '2',
			name: 'Smart Watch Series 5',
			sku: 'SWS-002',
			image: '',
			quantity: 89,
			price: 299.99,
			trend: 'up',
			trendValue: '+8%',
			category: 'Electronics',
		},
		{
			id: '3',
			name: 'Noise Canceling Headphones',
			sku: 'NCH-003',
			image: '',
			quantity: 156,
			price: 249.99,
			trend: 'stable',
			trendValue: '0%',
			category: 'Electronics',
		},
		{
			id: '4',
			name: 'Phone Case Premium',
			sku: 'PCP-004',
			image: '',
			quantity: 512,
			price: 29.99,
			trend: 'down',
			trendValue: '-5%',
			category: 'Accessories',
		},
		{
			id: '5',
			name: 'Screen Protector HD',
			sku: 'SPH-005',
			image: '',
			quantity: 823,
			price: 14.99,
			trend: 'up',
			trendValue: '+15%',
			category: 'Accessories',
		},
		{
			id: '6',
			name: 'Charging Cable 2m',
			sku: 'CC2-006',
			image: '',
			quantity: 1205,
			price: 9.99,
			trend: 'stable',
			trendValue: '0%',
			category: 'Accessories',
		},
		{
			id: '7',
			name: 'Gaming Mouse RGB',
			sku: 'GMR-007',
			image: '',
			quantity: 178,
			price: 59.99,
			trend: 'up',
			trendValue: '+22%',
			category: 'Peripherals',
		},
		{
			id: '8',
			name: 'Mechanical Keyboard',
			sku: 'MKB-008',
			image: '',
			quantity: 92,
			price: 149.99,
			trend: 'down',
			trendValue: '-3%',
			category: 'Peripherals',
		},
	];

	const groupedInventory = inventory.reduce(
		(acc, item) => {
			if (!acc[item.category]) {
				acc[item.category] = [];
			}
			acc[item.category].push(item);
			return acc;
		},
		{} as Record<string, InventoryItem[]>,
	);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="grid gap-8 @xl:grid-cols-2 @3xl:grid-cols-3">
					{Object.entries(groupedInventory).map(([category, items]) => (
						<CategorySection
							key={category}
							category={category}
							items={items}
							viewLabel="View"
							onView={(id) => console.log('View', id)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
