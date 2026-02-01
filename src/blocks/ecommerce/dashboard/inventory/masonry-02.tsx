'use client';

import * as React from 'react';
import {
	Package,
	Star,
	TrendingUp,
	Heart,
	ShoppingCart,
	Eye,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type FeaturedProduct = {
	id: string;
	name: string;
	sku: string;
	price: number;
	stock: number;
	sold: number;
	rating: number;
	featured?: boolean;
	trending?: boolean;
	image?: string;
};

type ProductCardProps = {
	product: FeaturedProduct;
	size: 'small' | 'medium' | 'large';
};

const ProductCard = ({ product, size }: ProductCardProps) => {
	const sizeClasses = {
		small: 'row-span-1',
		medium: 'row-span-2',
		large: 'row-span-3',
	};

	return (
		<Card className={`${sizeClasses[size]} overflow-hidden group`}>
			<div
				className={`relative ${size === 'large' ? 'aspect-square' : size === 'medium' ? 'aspect-video' : 'aspect-[2/1]'} bg-muted`}
			>
				<div className="absolute inset-0 flex items-center justify-center">
					<Package className="size-12 text-muted-foreground opacity-50" />
				</div>
				<div className="absolute top-3 left-3 flex flex-wrap gap-2">
					{product.featured && <Badge variant="default">Featured</Badge>}
					{product.trending && <Badge className="bg-amber-500">Trending</Badge>}
				</div>
				<div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
					<Button size="icon-sm" variant="secondary">
						<Heart className="size-4" />
					</Button>
					<Button size="icon-sm" variant="secondary">
						<Eye className="size-4" />
					</Button>
				</div>
			</div>
			<CardContent className={`${size === 'small' ? 'p-3' : 'p-4'}`}>
				<div className="flex items-start justify-between gap-2">
					<div className="min-w-0 flex-1">
						<p
							className={`font-medium truncate ${size === 'large' ? 'text-lg' : ''}`}
						>
							{product.name}
						</p>
						<p className="text-sm text-muted-foreground">{product.sku}</p>
					</div>
					<div className="text-right">
						<p className={`font-bold ${size === 'large' ? 'text-xl' : ''}`}>
							${product.price}
						</p>
					</div>
				</div>
				<div
					className={`flex items-center justify-between ${size === 'small' ? 'mt-2' : 'mt-4'}`}
				>
					<div className="flex items-center gap-1">
						<Star className="size-4 fill-amber-500 text-amber-500" />
						<span className="text-sm font-medium">{product.rating}</span>
					</div>
					<div className="flex items-center gap-3 text-sm text-muted-foreground">
						<span>{product.stock} in stock</span>
						<span>{product.sold} sold</span>
					</div>
				</div>
				{size !== 'small' && (
					<div className="mt-4 flex gap-2">
						<Button size="sm" className="flex-1">
							<ShoppingCart className="mr-2 size-4" />
							Add to Cart
						</Button>
						{size === 'large' && (
							<Button size="sm" variant="outline">
								View Details
							</Button>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const products: FeaturedProduct[] = [
		{
			id: '1',
			name: 'Wireless Earbuds Pro Max',
			sku: 'WEP-001',
			price: 199.99,
			stock: 245,
			sold: 1234,
			rating: 4.8,
			featured: true,
			trending: true,
		},
		{
			id: '2',
			name: 'USB-C Fast Charger',
			sku: 'UFC-001',
			price: 49.99,
			stock: 567,
			sold: 892,
			rating: 4.5,
			trending: true,
		},
		{
			id: '3',
			name: 'Phone Case Premium',
			sku: 'PCP-001',
			price: 29.99,
			stock: 890,
			sold: 2341,
			rating: 4.6,
		},
		{
			id: '4',
			name: 'Laptop Stand Pro',
			sku: 'LSP-001',
			price: 89.99,
			stock: 123,
			sold: 456,
			rating: 4.7,
			featured: true,
		},
		{
			id: '5',
			name: 'Wireless Mouse',
			sku: 'WM-001',
			price: 59.99,
			stock: 345,
			sold: 678,
			rating: 4.4,
		},
		{
			id: '6',
			name: 'Keyboard Mechanical',
			sku: 'KM-001',
			price: 149.99,
			stock: 234,
			sold: 345,
			rating: 4.9,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="mb-6 flex items-center justify-between">
					<div>
						<h2 className="text-xl font-semibold @lg:text-2xl">
							Featured Products
						</h2>
						<p className="text-sm text-muted-foreground">
							Spotlight items with dynamic masonry layout
						</p>
					</div>
					<Button variant="outline">
						<TrendingUp className="mr-2 size-4" />
						View All Trending
					</Button>
				</div>
				<div className="grid gap-4 auto-rows-fr @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4">
					<div className="@lg:col-span-2 @xl:col-span-2 @lg:row-span-2">
						<ProductCard product={products[0]} size="large" />
					</div>
					<ProductCard product={products[1]} size="medium" />
					<ProductCard product={products[2]} size="small" />
					<ProductCard product={products[3]} size="medium" />
					<ProductCard product={products[4]} size="small" />
					<ProductCard product={products[5]} size="small" />
				</div>
			</div>
		</section>
	);
}
