'use client';

import * as React from 'react';
import {
	MoreHorizontal,
	Search,
	Package,
	Edit,
	Trash2,
	Eye,
	Plus,
	Filter,
	Star,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface Product {
	id: string;
	name: string;
	sku: string;
	image: string;
	price: number;
	comparePrice?: number;
	stock: number;
	status: 'active' | 'draft' | 'archived';
	rating: number;
	category: string;
}

interface HeaderProps {
	title: string;
	description: string;
	searchPlaceholder: string;
	filterLabel: string;
	addLabel: string;
	onAdd?: () => void;
}

const Header = ({
	title,
	description,
	searchPlaceholder,
	filterLabel,
	addLabel,
	onAdd,
}: HeaderProps) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground">{description}</p>
		</div>
		<div className="flex flex-col gap-2 @sm:flex-row">
			<div className="relative">
				<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder={searchPlaceholder} className="w-full pl-10 @sm:w-64" />
			</div>
			<Button variant="outline">
				<Filter className="size-4" />
				{filterLabel}
			</Button>
			<Button onClick={onAdd}>
				<Plus className="size-4" />
				{addLabel}
			</Button>
		</div>
	</div>
);

interface StatusBadgeProps {
	status: 'active' | 'draft' | 'archived';
	labels: Record<'active' | 'draft' | 'archived', string>;
}

const StatusBadge = ({ status, labels }: StatusBadgeProps) => {
	const variants: Record<'active' | 'draft' | 'archived', 'default' | 'secondary' | 'outline'> = {
		active: 'default',
		draft: 'secondary',
		archived: 'outline',
	};
	return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};

interface ProductImageProps {
	src: string;
	alt: string;
	discount?: number;
}

const ProductImage = ({ src, alt, discount }: ProductImageProps) => (
	<div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
		{src ? (
			<img src={src} alt={alt} className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
		) : (
			<div className="flex size-full items-center justify-center">
				<Package className="size-12 text-muted-foreground" />
			</div>
		)}
		{discount && (
			<Badge className="absolute left-2 top-2" variant="destructive">
				-{discount}%
			</Badge>
		)}
	</div>
);

interface RatingDisplayProps {
	rating: number;
}

const RatingDisplay = ({ rating }: RatingDisplayProps) => (
	<div className="flex items-center gap-1">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-3.5 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
			/>
		))}
		<span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>
	</div>
);

interface PriceDisplayProps {
	price: number;
	comparePrice?: number;
}

const PriceDisplay = ({ price, comparePrice }: PriceDisplayProps) => (
	<div className="flex items-baseline gap-2">
		<span className="text-lg font-bold">${price.toFixed(2)}</span>
		{comparePrice && (
			<span className="text-sm text-muted-foreground line-through">
				${comparePrice.toFixed(2)}
			</span>
		)}
	</div>
);

interface StockIndicatorProps {
	stock: number;
	labels: { inStock: string; lowStock: string; outOfStock: string };
}

const StockIndicator = ({ stock, labels }: StockIndicatorProps) => {
	if (stock === 0) {
		return <span className="text-sm text-destructive">{labels.outOfStock}</span>;
	}
	if (stock < 10) {
		return <span className="text-sm text-amber-500">{labels.lowStock}: {stock}</span>;
	}
	return <span className="text-sm text-muted-foreground">{labels.inStock}: {stock}</span>;
};

interface ProductCardProps {
	product: Product;
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
	actions: { label: string; icon?: React.ElementType; onClick: (id: string) => void; variant?: 'destructive' }[];
}

const ProductCard = ({ product, selected, onSelect, actions }: ProductCardProps) => {
	const discount = product.comparePrice
		? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
		: undefined;

	return (
		<Card className="group relative overflow-hidden transition-shadow hover:shadow-lg">
			<div className="absolute left-3 top-3 z-10">
				<Checkbox
					checked={selected}
					onCheckedChange={(checked) => onSelect(product.id, !!checked)}
					className="bg-background/80 backdrop-blur-sm"
				/>
			</div>
			<div className="absolute right-3 top-3 z-10">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon-sm" className="opacity-0 transition-opacity group-hover:opacity-100">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{actions.map((action, idx) => (
							<React.Fragment key={action.label}>
								{action.variant === 'destructive' && <DropdownMenuSeparator />}
								<DropdownMenuItem
									onClick={() => action.onClick(product.id)}
									className={action.variant === 'destructive' ? 'text-destructive' : ''}
								>
									{action.icon && <action.icon className="mr-2 size-4" />}
									{action.label}
								</DropdownMenuItem>
							</React.Fragment>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<CardContent className="p-3">
				<ProductImage src={product.image} alt={product.name} discount={discount} />
			</CardContent>
			<CardFooter className="flex flex-col items-start gap-2 p-4 pt-0">
				<div className="flex w-full items-start justify-between gap-2">
					<div className="min-w-0 flex-1">
						<h3 className="truncate font-medium">{product.name}</h3>
						<p className="text-xs text-muted-foreground">{product.sku}</p>
					</div>
					<StatusBadge
						status={product.status}
						labels={{ active: 'Active', draft: 'Draft', archived: 'Archived' }}
					/>
				</div>
				<RatingDisplay rating={product.rating} />
				<div className="flex w-full items-center justify-between">
					<PriceDisplay price={product.price} comparePrice={product.comparePrice} />
					<StockIndicator
						stock={product.stock}
						labels={{ inStock: 'In stock', lowStock: 'Low stock', outOfStock: 'Out of stock' }}
					/>
				</div>
			</CardFooter>
		</Card>
	);
};

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

	const products: Product[] = [
		{
			id: '1',
			name: 'Premium Wireless Headphones',
			sku: 'WH-PRO-001',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
			price: 199.99,
			comparePrice: 249.99,
			stock: 45,
			status: 'active',
			rating: 4.8,
			category: 'Electronics',
		},
		{
			id: '2',
			name: 'Leather Crossbody Bag',
			sku: 'BAG-LTH-002',
			image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
			price: 89.99,
			stock: 8,
			status: 'active',
			rating: 4.5,
			category: 'Accessories',
		},
		{
			id: '3',
			name: 'Smart Fitness Watch',
			sku: 'WCH-FIT-003',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
			price: 299.99,
			comparePrice: 349.99,
			stock: 23,
			status: 'active',
			rating: 4.6,
			category: 'Electronics',
		},
		{
			id: '4',
			name: 'Minimalist Desk Lamp',
			sku: 'LMP-DSK-004',
			image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
			price: 79.99,
			stock: 0,
			status: 'archived',
			rating: 4.2,
			category: 'Home',
		},
		{
			id: '5',
			name: 'Organic Cotton T-Shirt',
			sku: 'TSH-ORG-005',
			image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
			price: 34.99,
			stock: 156,
			status: 'active',
			rating: 4.4,
			category: 'Apparel',
		},
		{
			id: '6',
			name: 'Ceramic Coffee Mug Set',
			sku: 'MUG-CER-006',
			image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
			price: 49.99,
			comparePrice: 59.99,
			stock: 89,
			status: 'draft',
			rating: 4.7,
			category: 'Home',
		},
	];

	const actions = [
		{ label: 'View', icon: Eye, onClick: (id: string) => console.log('View', id) },
		{ label: 'Edit', icon: Edit, onClick: (id: string) => console.log('Edit', id) },
		{ label: 'Delete', icon: Trash2, onClick: (id: string) => console.log('Delete', id), variant: 'destructive' as const },
	];

	const handleSelect = (id: string, checked: boolean) => {
		const newSet = new Set(selectedIds);
		if (checked) newSet.add(id);
		else newSet.delete(id);
		setSelectedIds(newSet);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<Header
					title="Products"
					description="Manage your product catalog"
					searchPlaceholder="Search products..."
					filterLabel="Filter"
					addLabel="Add Product"
				/>
				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
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
