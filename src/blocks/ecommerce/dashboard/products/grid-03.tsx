'use client';

import * as React from 'react';
import {
	MoreHorizontal,
	Package,
	Layers,
	Tag,
	Eye,
	Pencil,
	Archive,
	Trash2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface ProductVariant {
	id: string;
	name: string;
	image: string;
	price: number;
	stock: number;
}

interface Product {
	id: string;
	name: string;
	sku: string;
	image: string;
	price: number;
	priceRange?: { min: number; max: number };
	variants: ProductVariant[];
	collections: string[];
	tags: string[];
	status: 'active' | 'draft' | 'archived';
}

interface VariantPreviewProps {
	variants: ProductVariant[];
	maxVisible?: number;
}

const VariantPreview = ({ variants, maxVisible = 4 }: VariantPreviewProps) => {
	if (variants.length === 0) return null;

	return (
		<div className="flex items-center gap-1">
			{variants.slice(0, maxVisible).map((variant, idx) => (
				<Tooltip key={variant.id}>
					<TooltipTrigger asChild>
						<div
							className="relative size-8 overflow-hidden rounded border bg-muted transition-transform hover:scale-110 hover:z-10"
							style={{ marginLeft: idx > 0 ? '-4px' : 0 }}
						>
							<img
								src={variant.image}
								alt={variant.name}
								className="size-full object-cover"
							/>
						</div>
					</TooltipTrigger>
					<TooltipContent>
						<div className="text-xs">
							<div className="font-medium">{variant.name}</div>
							<div className="text-muted-foreground">
								${variant.price.toFixed(2)}
							</div>
						</div>
					</TooltipContent>
				</Tooltip>
			))}
			{variants.length > maxVisible && (
				<div className="flex size-8 items-center justify-center rounded border bg-muted text-xs font-medium">
					+{variants.length - maxVisible}
				</div>
			)}
		</div>
	);
};

interface CollectionTagsProps {
	collections: string[];
	maxVisible?: number;
}

const CollectionTags = ({
	collections,
	maxVisible = 2,
}: CollectionTagsProps) => (
	<div className="flex flex-wrap items-center gap-1">
		<Layers className="size-3.5 text-muted-foreground" />
		{collections.slice(0, maxVisible).map((collection) => (
			<Badge key={collection} variant="secondary" className="text-xs">
				{collection}
			</Badge>
		))}
		{collections.length > maxVisible && (
			<Badge variant="outline" className="text-xs">
				+{collections.length - maxVisible}
			</Badge>
		)}
	</div>
);

interface ProductTagsProps {
	tags: string[];
	maxVisible?: number;
}

const ProductTags = ({ tags, maxVisible = 3 }: ProductTagsProps) => (
	<div className="flex flex-wrap items-center gap-1">
		{tags.slice(0, maxVisible).map((tag) => (
			<Badge key={tag} variant="outline" className="gap-1 text-xs">
				<Tag className="size-3" />
				{tag}
			</Badge>
		))}
		{tags.length > maxVisible && (
			<span className="text-xs text-muted-foreground">
				+{tags.length - maxVisible}
			</span>
		)}
	</div>
);

interface PriceRangeProps {
	price: number;
	priceRange?: { min: number; max: number };
}

const PriceRange = ({ price, priceRange }: PriceRangeProps) => {
	if (priceRange) {
		return (
			<div className="text-lg font-bold">
				${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)}
			</div>
		);
	}
	return <div className="text-lg font-bold">${price.toFixed(2)}</div>;
};

interface StatusIndicatorProps {
	status: 'active' | 'draft' | 'archived';
}

const StatusIndicator = ({ status }: StatusIndicatorProps) => {
	const colors = {
		active: 'bg-emerald-500',
		draft: 'bg-amber-500',
		archived: 'bg-muted-foreground',
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div className={`size-2.5 rounded-full ${colors[status]}`} />
			</TooltipTrigger>
			<TooltipContent className="capitalize">{status}</TooltipContent>
		</Tooltip>
	);
};

interface ProductCardProps {
	product: Product;
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
	actions: {
		label: string;
		icon: React.ElementType;
		onClick: (id: string) => void;
		variant?: 'destructive';
	}[];
}

const ProductCard = ({
	product,
	selected,
	onSelect,
	actions,
}: ProductCardProps) => (
	<Card
		className={`group overflow-hidden transition-all ${selected ? 'ring-2 ring-primary' : 'hover:shadow-lg'}`}
	>
		<div className="relative aspect-[4/3] overflow-hidden bg-muted">
			{product.image ? (
				<img
					src={product.image}
					alt={product.name}
					className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			) : (
				<div className="flex size-full items-center justify-center">
					<Package className="size-16 text-muted-foreground" />
				</div>
			)}
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
			<div className="absolute left-3 top-3">
				<Checkbox
					checked={selected}
					onCheckedChange={(checked) => onSelect(product.id, !!checked)}
					className="bg-background/80 backdrop-blur-sm"
				/>
			</div>
			<div className="absolute right-3 top-3 flex items-center gap-2">
				<StatusIndicator status={product.status} />
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
			{product.variants.length > 0 && (
				<div className="absolute bottom-3 left-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
					<VariantPreview variants={product.variants} />
				</div>
			)}
		</div>
		<CardContent className="space-y-3 p-4">
			<div>
				<h3 className="font-semibold leading-tight">{product.name}</h3>
				<p className="text-xs text-muted-foreground">{product.sku}</p>
			</div>
			<div className="flex items-center justify-between">
				<PriceRange price={product.price} priceRange={product.priceRange} />
				{product.variants.length > 0 && (
					<Badge variant="secondary" className="text-xs">
						{product.variants.length} variants
					</Badge>
				)}
			</div>
			{product.collections.length > 0 && (
				<CollectionTags collections={product.collections} />
			)}
			{product.tags.length > 0 && <ProductTags tags={product.tags} />}
		</CardContent>
	</Card>
);

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

	const products: Product[] = [
		{
			id: '1',
			name: 'Classic White Sneakers',
			sku: 'SNK-WHT-001',
			image:
				'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
			price: 129.99,
			priceRange: { min: 129.99, max: 149.99 },
			variants: [
				{
					id: 'v1',
					name: 'Size 8',
					image:
						'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop',
					price: 129.99,
					stock: 12,
				},
				{
					id: 'v2',
					name: 'Size 9',
					image:
						'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
					price: 129.99,
					stock: 18,
				},
				{
					id: 'v3',
					name: 'Size 10',
					image:
						'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=100&h=100&fit=crop',
					price: 149.99,
					stock: 8,
				},
				{
					id: 'v4',
					name: 'Size 11',
					image:
						'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=100&h=100&fit=crop',
					price: 149.99,
					stock: 5,
				},
				{
					id: 'v5',
					name: 'Size 12',
					image:
						'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=100&h=100&fit=crop',
					price: 149.99,
					stock: 3,
				},
			],
			collections: ['Summer 2024', 'Bestsellers', 'Essentials'],
			tags: ['casual', 'unisex', 'leather'],
			status: 'active',
		},
		{
			id: '2',
			name: 'Premium Denim Jacket',
			sku: 'JKT-DNM-002',
			image:
				'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=300&fit=crop',
			price: 189.99,
			variants: [
				{
					id: 'v1',
					name: 'S',
					image:
						'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=100&h=100&fit=crop',
					price: 189.99,
					stock: 15,
				},
				{
					id: 'v2',
					name: 'M',
					image:
						'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=100&h=100&fit=crop',
					price: 189.99,
					stock: 22,
				},
				{
					id: 'v3',
					name: 'L',
					image:
						'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=100&h=100&fit=crop',
					price: 189.99,
					stock: 18,
				},
			],
			collections: ['Fall Collection'],
			tags: ['outerwear', 'denim'],
			status: 'active',
		},
		{
			id: '3',
			name: 'Minimalist Watch',
			sku: 'WCH-MIN-003',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
			price: 249.99,
			variants: [],
			collections: ['Premium', 'Gift Guide'],
			tags: ['accessories', 'luxury'],
			status: 'draft',
		},
		{
			id: '4',
			name: 'Organic Cotton Hoodie',
			sku: 'HDY-ORG-004',
			image:
				'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop',
			price: 79.99,
			priceRange: { min: 79.99, max: 89.99 },
			variants: [
				{
					id: 'v1',
					name: 'S / Black',
					image:
						'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop',
					price: 79.99,
					stock: 34,
				},
				{
					id: 'v2',
					name: 'M / Black',
					image:
						'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop',
					price: 79.99,
					stock: 45,
				},
			],
			collections: ['Essentials', 'Sustainable'],
			tags: ['organic', 'casual', 'sustainable'],
			status: 'active',
		},
		{
			id: '5',
			name: 'Leather Messenger Bag',
			sku: 'BAG-MSG-005',
			image:
				'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
			price: 199.99,
			variants: [],
			collections: ['Premium'],
			tags: ['leather', 'professional'],
			status: 'archived',
		},
		{
			id: '6',
			name: 'Wool Blend Scarf',
			sku: 'SCF-WOL-006',
			image:
				'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=300&fit=crop',
			price: 59.99,
			variants: [
				{
					id: 'v1',
					name: 'Navy',
					image:
						'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=100&h=100&fit=crop',
					price: 59.99,
					stock: 28,
				},
				{
					id: 'v2',
					name: 'Grey',
					image:
						'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=100&h=100&fit=crop',
					price: 59.99,
					stock: 35,
				},
			],
			collections: ['Fall Collection', 'Gift Guide'],
			tags: ['accessories', 'winter'],
			status: 'active',
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
			label: 'Archive',
			icon: Archive,
			onClick: (id: string) => console.log('Archive', id),
		},
		{
			label: 'Delete',
			icon: Trash2,
			onClick: (id: string) => console.log('Delete', id),
			variant: 'destructive' as const,
		},
	];

	const handleSelect = (id: string, checked: boolean) => {
		const newSet = new Set(selectedIds);
		if (checked) newSet.add(id);
		else newSet.delete(id);
		setSelectedIds(newSet);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-6 @sm:grid-cols-2 @xl:grid-cols-3">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							selected={selectedIds.has(product.id)}
							onSelect={handleSelect}
							actions={actions}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
