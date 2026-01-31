'use client';

import * as React from 'react';
import {
	Package,
	Star,
	Eye,
	ShoppingCart,
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
	rating: number;
	reviews: number;
	featured: boolean;
	category: string;
};

type FeaturedCardProps = {
	item: InventoryItem;
	viewLabel: string;
	quickAddLabel: string;
	onView: (id: string) => void;
	onQuickAdd: (id: string) => void;
};

const FeaturedCard = ({
	item,
	viewLabel,
	quickAddLabel,
	onView,
	onQuickAdd,
}: FeaturedCardProps) => (
	<Card className="group relative overflow-hidden transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
		{item.featured && (
			<div className="absolute left-3 top-3 z-10">
				<Badge className="gap-1 bg-yellow-500 text-yellow-950 hover:bg-yellow-500">
					<Star className="size-3 fill-current" />
					Featured
				</Badge>
			</div>
		)}
		<div className="aspect-[4/3] overflow-hidden bg-muted">
			{item.image ? (
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
				/>
			) : (
				<div className="flex size-full items-center justify-center">
					<Package className="size-16 text-muted-foreground" />
				</div>
			)}
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
			<div className="absolute inset-x-0 bottom-0 flex gap-2 p-4 opacity-0 transition-all group-hover:opacity-100">
				<Button size="sm" className="flex-1" onClick={() => onQuickAdd(item.id)}>
					<ShoppingCart className="size-4" />
					{quickAddLabel}
				</Button>
				<Button size="sm" variant="secondary" onClick={() => onView(item.id)}>
					<Eye className="size-4" />
					{viewLabel}
				</Button>
			</div>
		</div>
		<CardContent className="p-4">
			<Badge variant="outline" className="mb-2">
				{item.category}
			</Badge>
			<h3 className="mb-1 font-semibold leading-tight">{item.name}</h3>
			<p className="mb-2 text-xs text-muted-foreground">{item.sku}</p>
			<div className="mb-3 flex items-center gap-2">
				<div className="flex items-center gap-1">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star
							key={i}
							className={`size-3.5 ${i < item.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
						/>
					))}
				</div>
				<span className="text-xs text-muted-foreground">({item.reviews})</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
				<span className="text-sm text-muted-foreground">{item.quantity} in stock</span>
			</div>
		</CardContent>
	</Card>
);

type SmallCardProps = {
	item: InventoryItem;
	onView: (id: string) => void;
};

const SmallCard = ({ item, onView }: SmallCardProps) => (
	<Card
		className="group cursor-pointer overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
		onClick={() => onView(item.id)}
	>
		<div className="aspect-square overflow-hidden bg-muted">
			{item.image ? (
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover transition-transform group-hover:scale-105"
				/>
			) : (
				<div className="flex size-full items-center justify-center">
					<Package className="size-8 text-muted-foreground" />
				</div>
			)}
		</div>
		<CardContent className="p-3">
			<h3 className="truncate text-sm font-medium">{item.name}</h3>
			<div className="mt-1 flex items-center justify-between">
				<span className="font-semibold">${item.price.toFixed(2)}</span>
				<span className="text-xs text-muted-foreground">{item.quantity}</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const inventory: InventoryItem[] = [
		{ id: '1', name: 'Premium Noise Canceling Headphones', sku: 'PNCH-001', image: '', quantity: 45, price: 299.99, rating: 5, reviews: 128, featured: true, category: 'Audio' },
		{ id: '2', name: 'Ultra-Wide Gaming Monitor 34"', sku: 'UGM-002', image: '', quantity: 12, price: 599.99, rating: 4, reviews: 89, featured: true, category: 'Displays' },
		{ id: '3', name: 'Wireless Mechanical Keyboard', sku: 'WMK-003', image: '', quantity: 78, price: 149.99, rating: 4, reviews: 256, featured: false, category: 'Peripherals' },
		{ id: '4', name: 'RGB Gaming Mouse', sku: 'RGM-004', image: '', quantity: 156, price: 79.99, rating: 5, reviews: 342, featured: false, category: 'Peripherals' },
		{ id: '5', name: 'USB-C Docking Station', sku: 'UDS-005', image: '', quantity: 34, price: 199.99, rating: 4, reviews: 67, featured: false, category: 'Accessories' },
		{ id: '6', name: 'Portable SSD 2TB', sku: 'PSSD-006', image: '', quantity: 89, price: 179.99, rating: 5, reviews: 189, featured: false, category: 'Storage' },
		{ id: '7', name: 'Webcam 4K HDR', sku: 'W4H-007', image: '', quantity: 23, price: 199.99, rating: 4, reviews: 45, featured: false, category: 'Video' },
		{ id: '8', name: 'Studio Microphone USB', sku: 'SMU-008', image: '', quantity: 56, price: 129.99, rating: 4, reviews: 112, featured: false, category: 'Audio' },
	];

	const featuredItems = inventory.filter((item) => item.featured);
	const regularItems = inventory.filter((item) => !item.featured);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-8">
					<div className="grid gap-4 @lg:grid-cols-2">
						{featuredItems.map((item) => (
							<FeaturedCard
								key={item.id}
								item={item}
								viewLabel="View"
								quickAddLabel="Quick Add"
								onView={(id) => console.log('View', id)}
								onQuickAdd={(id) => console.log('Quick Add', id)}
							/>
						))}
					</div>
					<div className="grid gap-4 grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-6">
						{regularItems.map((item) => (
							<SmallCard
								key={item.id}
								item={item}
								onView={(id) => console.log('View', id)}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
