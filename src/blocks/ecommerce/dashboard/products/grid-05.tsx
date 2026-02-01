'use client';

import * as React from 'react';
import {
	Package,
	Star,
	Clock,
	Zap,
	ArrowUpRight,
	MoreHorizontal,
	Eye,
	Pencil,
	Trash2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Product {
	id: string;
	name: string;
	sku: string;
	image: string;
	price: number;
	rating: number;
	reviewCount: number;
	category: string;
	addedAt: string;
	isQuickSeller: boolean;
}

interface RatingStarsProps {
	rating: number;
	reviewCount: number;
}

const RatingStars = ({ rating, reviewCount }: RatingStarsProps) => (
	<div className="flex items-center gap-1.5">
		<div className="flex items-center gap-0.5">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-3.5 ${
						i < Math.floor(rating)
							? 'fill-amber-400 text-amber-400'
							: i < rating
								? 'fill-amber-400/50 text-amber-400'
								: 'text-muted-foreground/30'
					}`}
				/>
			))}
		</div>
		<span className="text-sm font-medium">{rating.toFixed(1)}</span>
		<span className="text-xs text-muted-foreground">({reviewCount})</span>
	</div>
);

interface TimeAgoProps {
	date: string;
	label: string;
}

const TimeAgo = ({ date, label }: TimeAgoProps) => {
	const getTimeAgo = (dateStr: string) => {
		const date = new Date(dateStr);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return 'Today';
		if (diffDays === 1) return 'Yesterday';
		if (diffDays < 7) return `${diffDays} days ago`;
		if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
		return `${Math.floor(diffDays / 30)} months ago`;
	};

	return (
		<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
			<Clock className="size-3.5" />
			<span>
				{label} {getTimeAgo(date)}
			</span>
		</div>
	);
};

interface QuickSellerBadgeProps {
	show: boolean;
	label: string;
}

const QuickSellerBadge = ({ show, label }: QuickSellerBadgeProps) => {
	if (!show) return null;
	return (
		<Badge className="absolute left-2 top-2 gap-1 bg-amber-500 hover:bg-amber-600">
			<Zap className="size-3" />
			{label}
		</Badge>
	);
};

interface ProductCardProps {
	product: Product;
	actions: {
		label: string;
		icon: React.ElementType;
		onClick: (id: string) => void;
		variant?: 'destructive';
	}[];
	labels: { quickSeller: string; addedPrefix: string };
}

const ProductCard = ({ product, actions, labels }: ProductCardProps) => (
	<Card className="group overflow-hidden transition-all hover:shadow-lg hover:ring-1 hover:ring-primary/20">
		<div className="relative aspect-square overflow-hidden bg-muted">
			{product.image ? (
				<img
					src={product.image}
					alt={product.name}
					className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
				/>
			) : (
				<div className="flex size-full items-center justify-center">
					<Package className="size-16 text-muted-foreground" />
				</div>
			)}
			<QuickSellerBadge
				show={product.isQuickSeller}
				label={labels.quickSeller}
			/>
			<div className="absolute right-2 top-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="secondary"
							size="icon-sm"
							className="opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
						>
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{actions.map((action) => (
							<React.Fragment key={action.label}>
								{action.variant === 'destructive' && <DropdownMenuSeparator />}
								<DropdownMenuItem
									onClick={() => action.onClick(product.id)}
									className={
										action.variant === 'destructive' ? 'text-destructive' : ''
									}
								>
									<action.icon className="mr-2 size-4" />
									{action.label}
								</DropdownMenuItem>
							</React.Fragment>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-background to-transparent p-4 transition-transform group-hover:translate-y-0">
				<Button className="w-full gap-2" size="sm">
					<ArrowUpRight className="size-4" />
					Quick View
				</Button>
			</div>
		</div>
		<CardContent className="space-y-3 p-4">
			<div>
				<Badge variant="outline" className="mb-2 text-xs">
					{product.category}
				</Badge>
				<h3 className="line-clamp-2 font-semibold leading-tight">
					{product.name}
				</h3>
				<p className="text-xs text-muted-foreground">{product.sku}</p>
			</div>
			<RatingStars rating={product.rating} reviewCount={product.reviewCount} />
			<div className="flex items-center justify-between">
				<span className="text-xl font-bold">${product.price.toFixed(2)}</span>
				<TimeAgo date={product.addedAt} label={labels.addedPrefix} />
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Premium Noise-Canceling Headphones',
			sku: 'AUD-NC-001',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
			price: 349.99,
			rating: 4.8,
			reviewCount: 1234,
			category: 'Audio',
			addedAt: '2024-01-15',
			isQuickSeller: true,
		},
		{
			id: '2',
			name: 'Smart Home Speaker',
			sku: 'SMH-SPK-002',
			image:
				'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop',
			price: 129.99,
			rating: 4.5,
			reviewCount: 567,
			category: 'Smart Home',
			addedAt: '2024-02-20',
			isQuickSeller: false,
		},
		{
			id: '3',
			name: 'Portable Laptop Stand',
			sku: 'ACC-STD-003',
			image:
				'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
			price: 59.99,
			rating: 4.6,
			reviewCount: 289,
			category: 'Accessories',
			addedAt: '2024-03-01',
			isQuickSeller: true,
		},
		{
			id: '4',
			name: 'Ergonomic Wireless Mouse',
			sku: 'PER-MOU-004',
			image:
				'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
			price: 79.99,
			rating: 4.3,
			reviewCount: 456,
			category: 'Peripherals',
			addedAt: '2024-02-10',
			isQuickSeller: false,
		},
		{
			id: '5',
			name: 'USB-C Docking Station',
			sku: 'ACC-DCK-005',
			image:
				'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&h=400&fit=crop',
			price: 189.99,
			rating: 4.7,
			reviewCount: 178,
			category: 'Accessories',
			addedAt: '2024-01-28',
			isQuickSeller: false,
		},
		{
			id: '6',
			name: 'Mechanical Gaming Keyboard',
			sku: 'GAM-KEY-006',
			image:
				'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop',
			price: 149.99,
			rating: 4.9,
			reviewCount: 892,
			category: 'Gaming',
			addedAt: '2024-03-05',
			isQuickSeller: true,
		},
	];

	const actions = [
		{
			label: 'View',
			icon: Eye,
			onClick: (id: string) => console.log('View', id),
		},
		{
			label: 'Edit',
			icon: Pencil,
			onClick: (id: string) => console.log('Edit', id),
		},
		{
			label: 'Delete',
			icon: Trash2,
			onClick: (id: string) => console.log('Delete', id),
			variant: 'destructive' as const,
		},
	];

	const labels = {
		quickSeller: 'Quick Seller',
		addedPrefix: 'Added',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-6 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							actions={actions}
							labels={labels}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
