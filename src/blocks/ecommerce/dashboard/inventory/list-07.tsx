'use client';

import * as React from 'react';
import {
	Package,
	AlertTriangle,
	Clock,
	Trash2,
	TrendingDown,
	DollarSign,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

type DeadStockItem = {
	id: string;
	name: string;
	sku: string;
	stock: number;
	lastSold: string;
	daysSinceLastSale: number;
	value: number;
	category: string;
};

type ItemRowProps = {
	item: DeadStockItem;
	isSelected: boolean;
	onSelect: (id: string) => void;
};

const ItemRow = ({ item, isSelected, onSelect }: ItemRowProps) => {
	const getAgeColor = (days: number) => {
		if (days > 180) return 'text-destructive';
		if (days > 90) return 'text-amber-500';
		return 'text-muted-foreground';
	};

	return (
		<div className="flex items-center gap-4 border-b py-4 last:border-0">
			<Checkbox checked={isSelected} onCheckedChange={() => onSelect(item.id)} />
			<div className="flex size-10 items-center justify-center rounded-lg bg-destructive/10">
				<TrendingDown className="size-5 text-destructive" />
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate font-medium">{item.name}</p>
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<span>{item.sku}</span>
					<span>•</span>
					<span>{item.category}</span>
				</div>
			</div>
			<div className="hidden text-center @sm:block">
				<p className="text-xs text-muted-foreground">Stock</p>
				<p className="font-semibold">{item.stock}</p>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Last Sold</p>
				<p className={`font-medium ${getAgeColor(item.daysSinceLastSale)}`}>
					{item.daysSinceLastSale}d ago
				</p>
			</div>
			<div className="text-right">
				<p className="text-xs text-muted-foreground">Tied Capital</p>
				<p className="font-semibold text-destructive">${item.value.toLocaleString()}</p>
			</div>
		</div>
	);
};

type SummaryProps = {
	totalItems: number;
	totalValue: number;
	avgDays: number;
};

const Summary = ({ totalItems, totalValue, avgDays }: SummaryProps) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		<div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
			<Package className="size-6 text-destructive" />
			<div>
				<p className="text-2xl font-bold text-destructive">{totalItems}</p>
				<p className="text-sm text-muted-foreground">Dead stock items</p>
			</div>
		</div>
		<div className="flex items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
			<DollarSign className="size-6 text-amber-500" />
			<div>
				<p className="text-2xl font-bold text-amber-500">${totalValue.toLocaleString()}</p>
				<p className="text-sm text-muted-foreground">Capital tied up</p>
			</div>
		</div>
		<div className="flex items-center gap-3 rounded-lg border p-4">
			<Clock className="size-6 text-muted-foreground" />
			<div>
				<p className="text-2xl font-bold">{avgDays}</p>
				<p className="text-sm text-muted-foreground">Avg days without sale</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

	const items: DeadStockItem[] = [
		{ id: '1', name: 'Legacy Bluetooth Adapter v1', sku: 'LBA-001', stock: 234, lastSold: '2023-06-15', daysSinceLastSale: 217, value: 4680, category: 'Electronics' },
		{ id: '2', name: 'Phone Case - Discontinued Model', sku: 'PC-OLD-001', stock: 567, lastSold: '2023-08-22', daysSinceLastSale: 149, value: 5670, category: 'Accessories' },
		{ id: '3', name: 'USB-A Hub (Old Standard)', sku: 'UAH-001', stock: 123, lastSold: '2023-05-10', daysSinceLastSale: 253, value: 2460, category: 'Electronics' },
		{ id: '4', name: 'Wired Earphones Basic', sku: 'WEB-001', stock: 890, lastSold: '2023-09-30', daysSinceLastSale: 110, value: 4450, category: 'Audio' },
		{ id: '5', name: 'Plastic Screen Protector', sku: 'PSP-001', stock: 1500, lastSold: '2023-07-18', daysSinceLastSale: 184, value: 3000, category: 'Accessories' },
	];

	const handleSelect = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
		);
	};

	const totalValue = items.reduce((sum, i) => sum + i.value, 0);
	const avgDays = Math.round(items.reduce((sum, i) => sum + i.daysSinceLastSale, 0) / items.length);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">Dead Stock</CardTitle>
								<CardDescription>Items with no sales in 90+ days</CardDescription>
							</div>
							<div className="flex gap-2">
								{selectedIds.length > 0 && (
									<>
										<Button variant="outline">Create Discount</Button>
										<Button variant="destructive">
											<Trash2 className="mr-2 size-4" />
											Write Off
										</Button>
									</>
								)}
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<Summary totalItems={items.length} totalValue={totalValue} avgDays={avgDays} />
						<div>
							{items.map((item) => (
								<ItemRow
									key={item.id}
									item={item}
									isSelected={selectedIds.includes(item.id)}
									onSelect={handleSelect}
								/>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
