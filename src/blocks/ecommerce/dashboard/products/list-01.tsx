'use client';

import * as React from 'react';
import {
	Package,
	MoreHorizontal,
	Eye,
	Pencil,
	Trash2,
	ChevronRight,
	TrendingUp,
	TrendingDown,
	Star,
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

interface Product {
	id: string;
	name: string;
	sku: string;
	image: string;
	price: number;
	comparePrice?: number;
	stock: number;
	status: 'active' | 'draft' | 'archived';
	category: string;
	rating: number;
	trend: number;
}

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
	return <Badge variant={variants[status]} className="text-xs">{labels[status]}</Badge>;
};

interface TrendIndicatorProps {
	value: number;
}

const TrendIndicator = ({ value }: TrendIndicatorProps) => {
	const isPositive = value >= 0;
	return (
		<div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
			{isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
			<span>{Math.abs(value)}%</span>
		</div>
	);
};

interface ProductRowProps {
	product: Product;
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
	actions: { label: string; icon: React.ElementType; onClick: (id: string) => void; variant?: 'destructive' }[];
	labels: { status: Record<'active' | 'draft' | 'archived', string> };
}

const ProductRow = ({ product, selected, onSelect, actions, labels }: ProductRowProps) => (
	<div
		className={`group flex items-center gap-4 rounded-lg border p-3 transition-all hover:bg-muted/50 ${
			selected ? 'border-primary bg-primary/5' : 'border-transparent bg-card'
		}`}
	>
		<Checkbox
			checked={selected}
			onCheckedChange={(checked) => onSelect(product.id, !!checked)}
		/>
		<div className="size-12 shrink-0 overflow-hidden rounded-md bg-muted">
			{product.image ? (
				<img src={product.image} alt={product.name} className="size-full object-cover" />
			) : (
				<div className="flex size-full items-center justify-center">
					<Package className="size-6 text-muted-foreground" />
				</div>
			)}
		</div>
		<div className="min-w-0 flex-1">
			<h3 className="truncate font-medium">{product.name}</h3>
			<div className="flex items-center gap-2 text-xs text-muted-foreground">
				<span>{product.sku}</span>
				<span>•</span>
				<span>{product.category}</span>
			</div>
		</div>
		<div className="hidden items-center gap-1 @md:flex">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-3 ${
						i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'
					}`}
				/>
			))}
		</div>
		<div className="hidden @lg:block">
			<TrendIndicator value={product.trend} />
		</div>
		<div className="text-right">
			<div className="font-semibold">${product.price.toFixed(2)}</div>
			{product.comparePrice && (
				<div className="text-xs text-muted-foreground line-through">
					${product.comparePrice.toFixed(2)}
				</div>
			)}
		</div>
		<div className="hidden @sm:block">
			<span className={`text-sm ${product.stock === 0 ? 'text-red-500' : product.stock < 10 ? 'text-amber-500' : ''}`}>
				{product.stock}
			</span>
		</div>
		<StatusBadge status={product.status} labels={labels.status} />
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100">
					<MoreHorizontal className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{actions.map((action) => (
					<React.Fragment key={action.label}>
						{action.variant === 'destructive' && <DropdownMenuSeparator />}
						<DropdownMenuItem
							onClick={() => action.onClick(product.id)}
							className={action.variant === 'destructive' ? 'text-destructive' : ''}
						>
							<action.icon className="mr-2 size-4" />
							{action.label}
						</DropdownMenuItem>
					</React.Fragment>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
		<ChevronRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
	</div>
);

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

	const products: Product[] = [
		{
			id: '1',
			name: 'Wireless Noise-Canceling Headphones',
			sku: 'WNC-HP-001',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
			price: 299.99,
			comparePrice: 349.99,
			stock: 45,
			status: 'active',
			category: 'Audio',
			rating: 4.8,
			trend: 12,
		},
		{
			id: '2',
			name: 'Premium Leather Wallet',
			sku: 'PLW-001',
			image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop',
			price: 89.99,
			stock: 128,
			status: 'active',
			category: 'Accessories',
			rating: 4.5,
			trend: 5,
		},
		{
			id: '3',
			name: 'Smart Fitness Tracker',
			sku: 'SFT-002',
			image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&h=100&fit=crop',
			price: 149.99,
			comparePrice: 179.99,
			stock: 8,
			status: 'active',
			category: 'Electronics',
			rating: 4.6,
			trend: -3,
		},
		{
			id: '4',
			name: 'Organic Cotton T-Shirt',
			sku: 'OCT-003',
			image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
			price: 34.99,
			stock: 234,
			status: 'draft',
			category: 'Apparel',
			rating: 4.3,
			trend: 8,
		},
		{
			id: '5',
			name: 'Stainless Steel Water Bottle',
			sku: 'SSW-004',
			image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop',
			price: 29.99,
			stock: 0,
			status: 'archived',
			category: 'Home',
			rating: 4.7,
			trend: -12,
		},
		{
			id: '6',
			name: 'Minimalist Desk Lamp',
			sku: 'MDL-005',
			image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop',
			price: 79.99,
			comparePrice: 99.99,
			stock: 56,
			status: 'active',
			category: 'Home',
			rating: 4.4,
			trend: 15,
		},
	];

	const actions = [
		{ label: 'View', icon: Eye, onClick: (id: string) => console.log('View', id) },
		{ label: 'Edit', icon: Pencil, onClick: (id: string) => console.log('Edit', id) },
		{ label: 'Delete', icon: Trash2, onClick: (id: string) => console.log('Delete', id), variant: 'destructive' as const },
	];

	const labels = {
		status: { active: 'Active', draft: 'Draft', archived: 'Archived' },
	};

	const handleSelect = (id: string, checked: boolean) => {
		const newSet = new Set(selectedIds);
		if (checked) newSet.add(id);
		else newSet.delete(id);
		setSelectedIds(newSet);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-2 px-4 py-8 @sm:px-6 @2xl:px-8">
				{products.map((product) => (
					<ProductRow
						key={product.id}
						product={product}
						selected={selectedIds.has(product.id)}
						onSelect={handleSelect}
						actions={actions}
						labels={labels}
					/>
				))}
			</div>
		</section>
	);
}
