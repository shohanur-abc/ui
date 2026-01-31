'use client';

import * as React from 'react';
import {
	Package,
	ArrowUp,
	ArrowDown,
	Minus,
	MoreHorizontal,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	image: string;
	quantity: number;
	change: number;
	category: string;
};

type HeaderProps = {
	title: string;
	description: string;
};

const Header = ({ title, description }: HeaderProps) => (
	<CardHeader>
		<CardTitle className="text-xl @lg:text-2xl">{title}</CardTitle>
		<p className="text-sm text-muted-foreground">{description}</p>
	</CardHeader>
);

type InventoryItemRowProps = {
	item: InventoryItem;
	rank: number;
};

const InventoryItemRow = ({ item, rank }: InventoryItemRowProps) => {
	const changeColor = item.change > 0 ? 'text-emerald-500' : item.change < 0 ? 'text-red-500' : 'text-muted-foreground';
	const ChangeIcon = item.change > 0 ? ArrowUp : item.change < 0 ? ArrowDown : Minus;

	return (
		<div className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50">
			<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted font-bold text-muted-foreground">
				{rank}
			</div>
			<div className="relative size-10 shrink-0 overflow-hidden rounded-lg border bg-muted">
				{item.image ? (
					<img src={item.image} alt={item.name} className="size-full object-cover" />
				) : (
					<div className="flex size-full items-center justify-center">
						<Package className="size-5 text-muted-foreground" />
					</div>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					<span className="truncate font-medium">{item.name}</span>
					<Badge variant="outline" className="shrink-0 text-xs">
						{item.category}
					</Badge>
				</div>
				<p className="text-xs text-muted-foreground">{item.sku}</p>
			</div>
			<div className="text-right">
				<div className="font-semibold tabular-nums">{item.quantity.toLocaleString()}</div>
				<div className={`flex items-center justify-end gap-0.5 text-xs ${changeColor}`}>
					<ChangeIcon className="size-3" />
					<span>{Math.abs(item.change)}%</span>
				</div>
			</div>
			<Button variant="ghost" size="icon-sm">
				<MoreHorizontal className="size-4" />
			</Button>
		</div>
	);
};

export default function Main() {
	const topItems: InventoryItem[] = [
		{ id: '1', name: 'Wireless Earbuds Pro Max', sku: 'WEP-001', image: '', quantity: 2450, change: 15, category: 'Audio' },
		{ id: '2', name: 'Smart Watch Ultra', sku: 'SWU-002', image: '', quantity: 1890, change: 8, category: 'Wearables' },
		{ id: '3', name: 'USB-C Fast Charger', sku: 'UFC-003', image: '', quantity: 1654, change: -3, category: 'Accessories' },
		{ id: '4', name: 'Mechanical Keyboard RGB', sku: 'MKR-004', image: '', quantity: 1420, change: 22, category: 'Peripherals' },
		{ id: '5', name: 'Noise Canceling Headphones', sku: 'NCH-005', image: '', quantity: 1205, change: 0, category: 'Audio' },
	];

	const lowItems: InventoryItem[] = [
		{ id: '6', name: 'Vintage Camera Strap', sku: 'VCS-006', image: '', quantity: 12, change: -45, category: 'Accessories' },
		{ id: '7', name: 'Mini Projector', sku: 'MP-007', image: '', quantity: 18, change: -28, category: 'Electronics' },
		{ id: '8', name: 'Portable Scanner', sku: 'PS-008', image: '', quantity: 25, change: -15, category: 'Electronics' },
		{ id: '9', name: 'Desk Phone Stand', sku: 'DPS-009', image: '', quantity: 32, change: -8, category: 'Accessories' },
		{ id: '10', name: 'USB Hub 4-Port', sku: 'UH4-010', image: '', quantity: 45, change: 5, category: 'Accessories' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="grid gap-6 @xl:grid-cols-2">
					<Card>
						<Header title="Top Stock Items" description="Products with highest inventory levels" />
						<CardContent className="space-y-2">
							{topItems.map((item, index) => (
								<InventoryItemRow key={item.id} item={item} rank={index + 1} />
							))}
						</CardContent>
					</Card>
					<Card>
						<Header title="Low Stock Items" description="Products requiring attention" />
						<CardContent className="space-y-2">
							{lowItems.map((item, index) => (
								<InventoryItemRow key={item.id} item={item} rank={index + 1} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
