'use client';

import * as React from 'react';
import {
	Package,
	ChevronDown,
	ChevronUp,
	CircleDot,
	Clock,
	ShoppingCart,
	Star,
	Percent,
	MoreHorizontal,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

interface ProductVariant {
	id: string;
	name: string;
	sku: string;
	price: number;
	stock: number;
	image: string;
	attributes: { name: string; value: string }[];
}

interface Product {
	id: string;
	name: string;
	sku: string;
	image: string;
	basePrice: number;
	priceRange: { min: number; max: number };
	totalStock: number;
	variants: ProductVariant[];
	rating: number;
	sales: number;
}

interface ProductImageProps {
	src: string;
	alt: string;
}

const ProductImage = ({ src, alt }: ProductImageProps) => (
	<div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
		{src ? (
			<img src={src} alt={alt} className="size-full object-cover" />
		) : (
			<div className="flex size-full items-center justify-center">
				<Package className="size-12 text-muted-foreground" />
			</div>
		)}
	</div>
);

interface PriceRangeProps {
	min: number;
	max: number;
}

const PriceRange = ({ min, max }: PriceRangeProps) => (
	<div className="text-xl font-bold">
		{min === max ? (
			<span>${min.toFixed(2)}</span>
		) : (
			<span>${min.toFixed(2)} - ${max.toFixed(2)}</span>
		)}
	</div>
);

interface StatsRowProps {
	items: { icon: React.ElementType; value: string | number; label: string }[];
}

const StatsRow = ({ items }: StatsRowProps) => (
	<div className="flex items-center gap-4">
		{items.map((item) => (
			<div key={item.label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
				<item.icon className="size-4" />
				<span>{item.value}</span>
			</div>
		))}
	</div>
);

interface VariantRowProps {
	variant: ProductVariant;
}

const VariantRow = ({ variant }: VariantRowProps) => (
	<div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-2">
		<div className="size-12 shrink-0 overflow-hidden rounded-md bg-muted">
			{variant.image ? (
				<img src={variant.image} alt={variant.name} className="size-full object-cover" />
			) : (
				<div className="flex size-full items-center justify-center">
					<Package className="size-6 text-muted-foreground" />
				</div>
			)}
		</div>
		<div className="min-w-0 flex-1">
			<p className="truncate text-sm font-medium">{variant.name}</p>
			<div className="flex flex-wrap gap-1">
				{variant.attributes.map((attr) => (
					<Badge key={attr.name} variant="secondary" className="text-xs">
						{attr.value}
					</Badge>
				))}
			</div>
		</div>
		<div className="text-right">
			<p className="font-semibold">${variant.price.toFixed(2)}</p>
			<p className={`text-xs ${variant.stock > 0 ? 'text-muted-foreground' : 'text-red-500'}`}>
				{variant.stock > 0 ? `${variant.stock} in stock` : 'Out of stock'}
			</p>
		</div>
	</div>
);

interface VariantsListProps {
	variants: ProductVariant[];
	expanded: boolean;
	onToggle: () => void;
	labels: { showVariants: string; hideVariants: string };
}

const VariantsList = ({ variants, expanded, onToggle, labels }: VariantsListProps) => (
	<Collapsible open={expanded} onOpenChange={onToggle}>
		<CollapsibleTrigger asChild>
			<Button variant="ghost" className="w-full justify-between" size="sm">
				<span className="flex items-center gap-2">
					<CircleDot className="size-4" />
					{variants.length} variants
				</span>
				{expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
			</Button>
		</CollapsibleTrigger>
		<CollapsibleContent className="space-y-2 pt-2">
			{variants.map((variant) => (
				<VariantRow key={variant.id} variant={variant} />
			))}
		</CollapsibleContent>
	</Collapsible>
);

interface ProductCardProps {
	product: Product;
	actions: { label: string; onClick: (id: string) => void }[];
	labels: { showVariants: string; hideVariants: string };
}

const ProductCard = ({ product, actions, labels }: ProductCardProps) => {
	const [expanded, setExpanded] = React.useState(false);

	return (
		<Card className="overflow-hidden">
			<CardContent className="p-4">
				<div className="mb-4 flex gap-4">
					<div className="w-24 shrink-0">
						<ProductImage src={product.image} alt={product.name} />
					</div>
					<div className="min-w-0 flex-1">
						<div className="mb-2 flex items-start justify-between">
							<div>
								<h3 className="font-semibold leading-tight">{product.name}</h3>
								<p className="text-xs text-muted-foreground">{product.sku}</p>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon-sm">
										<MoreHorizontal className="size-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									{actions.map((action) => (
										<DropdownMenuItem
											key={action.label}
											onClick={() => action.onClick(product.id)}
										>
											{action.label}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<PriceRange min={product.priceRange.min} max={product.priceRange.max} />
						<StatsRow
							items={[
								{ icon: Star, value: product.rating.toFixed(1), label: 'Rating' },
								{ icon: ShoppingCart, value: product.sales, label: 'Sales' },
								{ icon: Package, value: product.totalStock, label: 'Stock' },
							]}
						/>
					</div>
				</div>
				<Separator className="mb-4" />
				<VariantsList
					variants={product.variants}
					expanded={expanded}
					onToggle={() => setExpanded(!expanded)}
					labels={labels}
				/>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Premium Cotton Polo Shirt',
			sku: 'POL-CTN-001',
			image: 'https://images.unsplash.com/photo-1625910513413-5fc45d50a219?w=200&h=200&fit=crop',
			basePrice: 59.99,
			priceRange: { min: 59.99, max: 69.99 },
			totalStock: 245,
			rating: 4.7,
			sales: 1234,
			variants: [
				{
					id: 'v1',
					name: 'Navy / Small',
					sku: 'POL-CTN-001-NVY-S',
					price: 59.99,
					stock: 45,
					image: 'https://images.unsplash.com/photo-1625910513413-5fc45d50a219?w=100&h=100&fit=crop',
					attributes: [
						{ name: 'Color', value: 'Navy' },
						{ name: 'Size', value: 'S' },
					],
				},
				{
					id: 'v2',
					name: 'Navy / Medium',
					sku: 'POL-CTN-001-NVY-M',
					price: 59.99,
					stock: 67,
					image: 'https://images.unsplash.com/photo-1625910513413-5fc45d50a219?w=100&h=100&fit=crop',
					attributes: [
						{ name: 'Color', value: 'Navy' },
						{ name: 'Size', value: 'M' },
					],
				},
				{
					id: 'v3',
					name: 'White / Large',
					sku: 'POL-CTN-001-WHT-L',
					price: 59.99,
					stock: 0,
					image: 'https://images.unsplash.com/photo-1625910513413-5fc45d50a219?w=100&h=100&fit=crop',
					attributes: [
						{ name: 'Color', value: 'White' },
						{ name: 'Size', value: 'L' },
					],
				},
				{
					id: 'v4',
					name: 'Premium / XL',
					sku: 'POL-CTN-001-PRM-XL',
					price: 69.99,
					stock: 23,
					image: 'https://images.unsplash.com/photo-1625910513413-5fc45d50a219?w=100&h=100&fit=crop',
					attributes: [
						{ name: 'Color', value: 'Premium' },
						{ name: 'Size', value: 'XL' },
					],
				},
			],
		},
		{
			id: '2',
			name: 'Classic Running Sneakers',
			sku: 'SNK-RUN-002',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			basePrice: 129.99,
			priceRange: { min: 129.99, max: 149.99 },
			totalStock: 178,
			rating: 4.9,
			sales: 2456,
			variants: [
				{
					id: 'v1',
					name: 'Red / Size 8',
					sku: 'SNK-RUN-002-RED-8',
					price: 129.99,
					stock: 34,
					image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
					attributes: [
						{ name: 'Color', value: 'Red' },
						{ name: 'Size', value: '8' },
					],
				},
				{
					id: 'v2',
					name: 'Red / Size 9',
					sku: 'SNK-RUN-002-RED-9',
					price: 129.99,
					stock: 45,
					image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
					attributes: [
						{ name: 'Color', value: 'Red' },
						{ name: 'Size', value: '9' },
					],
				},
				{
					id: 'v3',
					name: 'Limited / Size 10',
					sku: 'SNK-RUN-002-LTD-10',
					price: 149.99,
					stock: 12,
					image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
					attributes: [
						{ name: 'Color', value: 'Limited' },
						{ name: 'Size', value: '10' },
					],
				},
			],
		},
		{
			id: '3',
			name: 'Wireless Earbuds Pro',
			sku: 'AUD-EAR-003',
			image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop',
			basePrice: 199.99,
			priceRange: { min: 199.99, max: 199.99 },
			totalStock: 89,
			rating: 4.6,
			sales: 892,
			variants: [
				{
					id: 'v1',
					name: 'Black',
					sku: 'AUD-EAR-003-BLK',
					price: 199.99,
					stock: 45,
					image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop',
					attributes: [{ name: 'Color', value: 'Black' }],
				},
				{
					id: 'v2',
					name: 'White',
					sku: 'AUD-EAR-003-WHT',
					price: 199.99,
					stock: 44,
					image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop',
					attributes: [{ name: 'Color', value: 'White' }],
				},
			],
		},
	];

	const actions = [
		{ label: 'Edit Product', onClick: (id: string) => console.log('Edit', id) },
		{ label: 'Manage Variants', onClick: (id: string) => console.log('Variants', id) },
		{ label: 'View Analytics', onClick: (id: string) => console.log('Analytics', id) },
		{ label: 'Delete', onClick: (id: string) => console.log('Delete', id) },
	];

	const labels = {
		showVariants: 'Show variants',
		hideVariants: 'Hide variants',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-4 @lg:grid-cols-2 @2xl:grid-cols-3">
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
