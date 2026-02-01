'use client';

import * as React from 'react';
import { Package, ChevronDown, Box } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	quantity: number;
	price: number;
};

type CategoryGroup = {
	category: string;
	items: InventoryItem[];
	totalValue: number;
	totalItems: number;
};

type CategoryRowProps = {
	group: CategoryGroup;
	itemsLabel: string;
	valueLabel: string;
};

const CategoryRow = ({ group, itemsLabel, valueLabel }: CategoryRowProps) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<div className="rounded-lg border">
				<CollapsibleTrigger asChild>
					<Button
						variant="ghost"
						className="flex h-auto w-full items-center justify-between p-4 hover:bg-muted/50"
					>
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Box className="size-5 text-primary" />
							</div>
							<div className="text-left">
								<h3 className="font-semibold">{group.category}</h3>
								<p className="text-sm text-muted-foreground">
									{group.totalItems} {itemsLabel}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="text-right">
								<p className="font-semibold">
									${group.totalValue.toLocaleString()}
								</p>
								<p className="text-xs text-muted-foreground">{valueLabel}</p>
							</div>
							<ChevronDown
								className={`size-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
							/>
						</div>
					</Button>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="border-t bg-muted/30 p-2">
						<div className="space-y-1">
							{group.items.map((item) => (
								<div
									key={item.id}
									className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-background"
								>
									<div className="flex items-center gap-3">
										<div className="flex size-8 items-center justify-center rounded border bg-background">
											<Package className="size-4 text-muted-foreground" />
										</div>
										<div>
											<p className="font-medium">{item.name}</p>
											<p className="text-xs text-muted-foreground">
												{item.sku}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-6">
										<div className="text-right">
											<p className="font-medium tabular-nums">
												{item.quantity}
											</p>
											<p className="text-xs text-muted-foreground">units</p>
										</div>
										<div className="text-right">
											<p className="font-medium tabular-nums">
												${item.price.toFixed(2)}
											</p>
											<p className="text-xs text-muted-foreground">each</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</CollapsibleContent>
			</div>
		</Collapsible>
	);
};

export default function Main() {
	const categoryGroups: CategoryGroup[] = [
		{
			category: 'Electronics',
			totalItems: 1250,
			totalValue: 156000,
			items: [
				{
					id: '1',
					name: 'Wireless Headphones',
					sku: 'WH-001',
					quantity: 450,
					price: 79.99,
				},
				{
					id: '2',
					name: 'Bluetooth Speaker',
					sku: 'BS-002',
					quantity: 320,
					price: 49.99,
				},
				{
					id: '3',
					name: 'Smart Watch',
					sku: 'SW-003',
					quantity: 280,
					price: 199.99,
				},
				{
					id: '4',
					name: 'Portable Charger',
					sku: 'PC-004',
					quantity: 200,
					price: 29.99,
				},
			],
		},
		{
			category: 'Accessories',
			totalItems: 2800,
			totalValue: 42000,
			items: [
				{
					id: '5',
					name: 'Phone Case',
					sku: 'PHC-001',
					quantity: 1200,
					price: 14.99,
				},
				{
					id: '6',
					name: 'Screen Protector',
					sku: 'SP-002',
					quantity: 800,
					price: 9.99,
				},
				{
					id: '7',
					name: 'USB Cable',
					sku: 'USB-003',
					quantity: 600,
					price: 12.99,
				},
				{
					id: '8',
					name: 'Car Mount',
					sku: 'CM-004',
					quantity: 200,
					price: 19.99,
				},
			],
		},
		{
			category: 'Peripherals',
			totalItems: 680,
			totalValue: 89000,
			items: [
				{
					id: '9',
					name: 'Mechanical Keyboard',
					sku: 'MK-001',
					quantity: 180,
					price: 149.99,
				},
				{
					id: '10',
					name: 'Gaming Mouse',
					sku: 'GM-002',
					quantity: 250,
					price: 59.99,
				},
				{
					id: '11',
					name: 'Webcam HD',
					sku: 'WC-003',
					quantity: 150,
					price: 89.99,
				},
				{
					id: '12',
					name: 'USB Hub',
					sku: 'UH-004',
					quantity: 100,
					price: 34.99,
				},
			],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Inventory by Category
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{categoryGroups.map((group) => (
							<CategoryRow
								key={group.category}
								group={group}
								itemsLabel="items"
								valueLabel="total value"
							/>
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
