'use client';

import * as React from 'react';
import {
	MoreVertical,
	Heart,
	ShoppingCart,
	Package,
	Eye,
	Pencil,
	Copy,
	Trash2,
	TrendingUp,
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
import {
	Card,
	CardContent,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Product {
	id: string;
	name: string;
	sku: string;
	images: string[];
	price: number;
	stock: number;
	maxStock: number;
	sold: number;
	category: string;
	isNew: boolean;
	isFeatured: boolean;
}

interface ImageCarouselProps {
	images: string[];
	productName: string;
}

const ImageCarousel = ({ images, productName }: ImageCarouselProps) => {
	const [currentIndex, setCurrentIndex] = React.useState(0);

	return (
		<div className="relative aspect-square w-full overflow-hidden rounded-t-lg bg-muted">
			{images.length > 0 ? (
				<>
					<img
						src={images[currentIndex]}
						alt={`${productName} ${currentIndex + 1}`}
						className="size-full object-cover"
					/>
					{images.length > 1 && (
						<div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
							{images.map((_, idx) => (
								<button
									key={idx}
									className={`size-2 rounded-full transition-colors ${
										idx === currentIndex ? 'bg-primary' : 'bg-white/50'
									}`}
									onClick={() => setCurrentIndex(idx)}
								/>
							))}
						</div>
					)}
				</>
			) : (
				<div className="flex size-full items-center justify-center">
					<Package className="size-12 text-muted-foreground" />
				</div>
			)}
		</div>
	);
};

interface BadgesProps {
	isNew: boolean;
	isFeatured: boolean;
	labels: { new: string; featured: string };
}

const ProductBadges = ({ isNew, isFeatured, labels }: BadgesProps) => (
	<div className="absolute left-2 top-2 flex flex-col gap-1">
		{isNew && <Badge className="bg-emerald-500 hover:bg-emerald-600">{labels.new}</Badge>}
		{isFeatured && <Badge variant="secondary">{labels.featured}</Badge>}
	</div>
);

interface QuickActionsProps {
	onFavorite: () => void;
	onAddToCart: () => void;
}

const QuickActions = ({ onFavorite, onAddToCart }: QuickActionsProps) => (
	<div className="absolute right-2 top-2 flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
		<Button
			variant="secondary"
			size="icon-sm"
			onClick={onFavorite}
			className="bg-background/80 backdrop-blur-sm"
		>
			<Heart className="size-4" />
		</Button>
		<Button
			variant="secondary"
			size="icon-sm"
			onClick={onAddToCart}
			className="bg-background/80 backdrop-blur-sm"
		>
			<ShoppingCart className="size-4" />
		</Button>
	</div>
);

interface StockProgressProps {
	current: number;
	max: number;
	label: string;
}

const StockProgress = ({ current, max, label }: StockProgressProps) => {
	const percentage = (current / max) * 100;
	const isLow = current < max * 0.2;

	return (
		<div className="space-y-1">
			<div className="flex items-center justify-between text-xs">
				<span className="text-muted-foreground">{label}</span>
				<span className={isLow ? 'text-amber-500 font-medium' : ''}>
					{current}/{max}
				</span>
			</div>
			<Progress value={percentage} className={`h-1.5 ${isLow ? '[&>div]:bg-amber-500' : ''}`} />
		</div>
	);
};

interface SalesIndicatorProps {
	sold: number;
	label: string;
}

const SalesIndicator = ({ sold, label }: SalesIndicatorProps) => (
	<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
		<TrendingUp className="size-3.5 text-emerald-500" />
		<span>{sold} {label}</span>
	</div>
);

interface ProductCardProps {
	product: Product;
	actions: { label: string; icon: React.ElementType; onClick: (id: string) => void; variant?: 'destructive' }[];
}

const ProductCard = ({ product, actions }: ProductCardProps) => (
	<Card className="group relative overflow-hidden transition-all hover:shadow-lg">
		<div className="relative">
			<ImageCarousel images={product.images} productName={product.name} />
			<ProductBadges
				isNew={product.isNew}
				isFeatured={product.isFeatured}
				labels={{ new: 'New', featured: 'Featured' }}
			/>
			<QuickActions
				onFavorite={() => console.log('Favorite', product.id)}
				onAddToCart={() => console.log('Add to cart', product.id)}
			/>
		</div>
		<CardContent className="space-y-3 p-4">
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0 flex-1">
					<Badge variant="outline" className="mb-2 text-xs">
						{product.category}
					</Badge>
					<h3 className="truncate font-semibold">{product.name}</h3>
					<p className="text-xs text-muted-foreground">{product.sku}</p>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreVertical className="size-4" />
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
			</div>
			<div className="flex items-center justify-between">
				<span className="text-xl font-bold">${product.price.toFixed(2)}</span>
				<SalesIndicator sold={product.sold} label="sold" />
			</div>
			<StockProgress current={product.stock} max={product.maxStock} label="Stock" />
		</CardContent>
	</Card>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Ultra HD Smart TV 55"',
			sku: 'TV-UHD-55',
			images: [
				'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
				'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&h=400&fit=crop',
			],
			price: 799.99,
			stock: 12,
			maxStock: 50,
			sold: 234,
			category: 'Electronics',
			isNew: true,
			isFeatured: true,
		},
		{
			id: '2',
			name: 'Portable Bluetooth Speaker',
			sku: 'SPK-BT-001',
			images: [
				'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
			],
			price: 79.99,
			stock: 89,
			maxStock: 200,
			sold: 567,
			category: 'Audio',
			isNew: false,
			isFeatured: false,
		},
		{
			id: '3',
			name: 'Ergonomic Gaming Chair',
			sku: 'CHR-GAM-002',
			images: [
				'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop',
				'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop',
				'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop',
			],
			price: 349.99,
			stock: 5,
			maxStock: 30,
			sold: 89,
			category: 'Furniture',
			isNew: false,
			isFeatured: true,
		},
		{
			id: '4',
			name: 'Mechanical Keyboard RGB',
			sku: 'KEY-MEC-RGB',
			images: [
				'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop',
			],
			price: 159.99,
			stock: 45,
			maxStock: 100,
			sold: 312,
			category: 'Peripherals',
			isNew: true,
			isFeatured: false,
		},
		{
			id: '5',
			name: 'Wireless Gaming Mouse',
			sku: 'MOU-WIR-GAM',
			images: [
				'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
			],
			price: 99.99,
			stock: 78,
			maxStock: 150,
			sold: 445,
			category: 'Peripherals',
			isNew: false,
			isFeatured: false,
		},
		{
			id: '6',
			name: '4K Webcam Pro',
			sku: 'CAM-4K-PRO',
			images: [
				'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop',
			],
			price: 149.99,
			stock: 23,
			maxStock: 60,
			sold: 178,
			category: 'Accessories',
			isNew: true,
			isFeatured: true,
		},
	];

	const actions = [
		{ label: 'View Details', icon: Eye, onClick: (id: string) => console.log('View', id) },
		{ label: 'Edit Product', icon: Pencil, onClick: (id: string) => console.log('Edit', id) },
		{ label: 'Duplicate', icon: Copy, onClick: (id: string) => console.log('Duplicate', id) },
		{ label: 'Delete', icon: Trash2, onClick: (id: string) => console.log('Delete', id), variant: 'destructive' as const },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-6 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} actions={actions} />
					))}
				</div>
			</div>
		</section>
	);
}
