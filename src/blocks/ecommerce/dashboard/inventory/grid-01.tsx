'use client';

import * as React from 'react';
import { Package, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	image: string;
	quantity: number;
	maxStock: number;
	price: number;
	category: string;
	status: 'in-stock' | 'low-stock' | 'out-of-stock';
};

type ProductCardProps = {
	item: InventoryItem;
	actions: {
		label: string;
		icon: React.ElementType;
		onClick: (id: string) => void;
		destructive?: boolean;
	}[];
	statusLabels: Record<'in-stock' | 'low-stock' | 'out-of-stock', string>;
};

const ProductCard = ({ item, actions, statusLabels }: ProductCardProps) => {
	const stockPercentage = Math.min((item.quantity / item.maxStock) * 100, 100);
	const variants: Record<
		'in-stock' | 'low-stock' | 'out-of-stock',
		'default' | 'secondary' | 'destructive'
	> = {
		'in-stock': 'default',
		'low-stock': 'secondary',
		'out-of-stock': 'destructive',
	};

	return (
		<Card className="group relative overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
			<div className="absolute right-2 top-2 z-10">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="secondary"
							size="icon-sm"
							className="opacity-0 transition-opacity group-hover:opacity-100"
						>
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{actions.map((action, idx) => (
							<React.Fragment key={action.label}>
								{action.destructive && idx > 0 && <DropdownMenuSeparator />}
								<DropdownMenuItem
									onClick={() => action.onClick(item.id)}
									className={action.destructive ? 'text-destructive' : ''}
								>
									<action.icon className="size-4" />
									{action.label}
								</DropdownMenuItem>
							</React.Fragment>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="aspect-square overflow-hidden bg-muted">
				{item.image ? (
					<img
						src={item.image}
						alt={item.name}
						className="size-full object-cover transition-transform group-hover:scale-105"
					/>
				) : (
					<div className="flex size-full items-center justify-center">
						<Package className="size-12 text-muted-foreground" />
					</div>
				)}
			</div>
			<CardContent className="p-4">
				<div className="mb-2 flex items-start justify-between">
					<div>
						<h3 className="font-medium leading-tight">{item.name}</h3>
						<p className="text-xs text-muted-foreground">{item.sku}</p>
					</div>
					<Badge variant={variants[item.status]} className="shrink-0">
						{statusLabels[item.status]}
					</Badge>
				</div>
				<Badge variant="outline" className="mb-3">
					{item.category}
				</Badge>
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Stock Level</span>
						<span className="font-medium tabular-nums">
							{item.quantity} / {item.maxStock}
						</span>
					</div>
					<Progress value={stockPercentage} className="h-2" />
				</div>
			</CardContent>
			<CardFooter className="border-t p-4">
				<div className="flex w-full items-center justify-between">
					<span className="text-lg font-semibold">
						${item.price.toFixed(2)}
					</span>
					<span className="text-sm text-muted-foreground">per unit</span>
				</div>
			</CardFooter>
		</Card>
	);
};

export default function Main() {
	const inventory: InventoryItem[] = [
		{
			id: '1',
			name: 'Wireless Headphones',
			sku: 'WH-001',
			image: '',
			quantity: 85,
			maxStock: 100,
			price: 79.99,
			category: 'Electronics',
			status: 'in-stock',
		},
		{
			id: '2',
			name: 'Bluetooth Speaker',
			sku: 'BS-002',
			image: '',
			quantity: 12,
			maxStock: 50,
			price: 49.99,
			category: 'Electronics',
			status: 'low-stock',
		},
		{
			id: '3',
			name: 'USB-C Hub',
			sku: 'UCH-003',
			image: '',
			quantity: 0,
			maxStock: 75,
			price: 34.99,
			category: 'Accessories',
			status: 'out-of-stock',
		},
		{
			id: '4',
			name: 'Mechanical Keyboard',
			sku: 'MK-004',
			image: '',
			quantity: 45,
			maxStock: 60,
			price: 129.99,
			category: 'Peripherals',
			status: 'in-stock',
		},
		{
			id: '5',
			name: 'Gaming Mouse',
			sku: 'GM-005',
			image: '',
			quantity: 8,
			maxStock: 40,
			price: 59.99,
			category: 'Peripherals',
			status: 'low-stock',
		},
		{
			id: '6',
			name: 'Monitor Stand',
			sku: 'MS-006',
			image: '',
			quantity: 92,
			maxStock: 100,
			price: 44.99,
			category: 'Accessories',
			status: 'in-stock',
		},
		{
			id: '7',
			name: 'Webcam HD',
			sku: 'WC-007',
			image: '',
			quantity: 0,
			maxStock: 30,
			price: 89.99,
			category: 'Electronics',
			status: 'out-of-stock',
		},
		{
			id: '8',
			name: 'Desk Lamp LED',
			sku: 'DL-008',
			image: '',
			quantity: 67,
			maxStock: 80,
			price: 29.99,
			category: 'Accessories',
			status: 'in-stock',
		},
	];

	const actions = [
		{
			label: 'View Details',
			icon: Eye,
			onClick: (id: string) => console.log('View', id),
		},
		{
			label: 'Edit Product',
			icon: Edit,
			onClick: (id: string) => console.log('Edit', id),
		},
		{
			label: 'Delete',
			icon: Trash2,
			onClick: (id: string) => console.log('Delete', id),
			destructive: true,
		},
	];

	const statusLabels = {
		'in-stock': 'In Stock',
		'low-stock': 'Low Stock',
		'out-of-stock': 'Out of Stock',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
					{inventory.map((item) => (
						<ProductCard
							key={item.id}
							item={item}
							actions={actions}
							statusLabels={statusLabels}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
