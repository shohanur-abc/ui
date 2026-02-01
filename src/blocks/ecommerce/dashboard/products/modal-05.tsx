'use client';

import * as React from 'react';
import {
	Eye,
	X,
	ChevronLeft,
	ChevronRight,
	ShoppingCart,
	Heart,
	Share2,
	Star,
	Package,
	Truck,
	Check,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface Product {
	id: string;
	name: string;
	sku: string;
	price: number;
	salePrice: number | null;
	description: string;
	features: string[];
	rating: number;
	reviewCount: number;
	stock: number;
	category: string;
	variants: { type: string; options: string[] }[];
	images: string[];
}

interface ProductImageGalleryProps {
	images: string[];
	activeIndex: number;
	onSelect: (index: number) => void;
}

const ProductImageGallery = ({
	images,
	activeIndex,
	onSelect,
}: ProductImageGalleryProps) => (
	<div className="space-y-2">
		<div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
			<div className="flex size-full items-center justify-center text-6xl">
				📦
			</div>
			<div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 p-2">
				{images.map((_, idx) => (
					<button
						key={idx}
						onClick={() => onSelect(idx)}
						className={`size-2 rounded-full transition-colors ${idx === activeIndex ? 'bg-primary' : 'bg-white/50'}`}
					/>
				))}
			</div>
			<Button
				variant="secondary"
				size="icon"
				className="absolute left-2 top-1/2 -translate-y-1/2"
				onClick={() =>
					onSelect(activeIndex > 0 ? activeIndex - 1 : images.length - 1)
				}
			>
				<ChevronLeft className="size-4" />
			</Button>
			<Button
				variant="secondary"
				size="icon"
				className="absolute right-2 top-1/2 -translate-y-1/2"
				onClick={() =>
					onSelect(activeIndex < images.length - 1 ? activeIndex + 1 : 0)
				}
			>
				<ChevronRight className="size-4" />
			</Button>
		</div>
		<div className="flex gap-2 overflow-x-auto">
			{images.map((_, idx) => (
				<button
					key={idx}
					onClick={() => onSelect(idx)}
					className={`flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted text-2xl transition-all ${idx === activeIndex ? 'ring-2 ring-primary' : ''}`}
				>
					📦
				</button>
			))}
		</div>
	</div>
);

interface ProductInfoProps {
	product: Product;
	selectedVariants: Record<string, string>;
	onVariantSelect: (type: string, value: string) => void;
}

const ProductInfo = ({
	product,
	selectedVariants,
	onVariantSelect,
}: ProductInfoProps) => (
	<div className="space-y-4">
		<div>
			<Badge variant="secondary">{product.category}</Badge>
			<h3 className="mt-2 text-xl font-semibold">{product.name}</h3>
			<p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
		</div>

		<div className="flex items-center gap-2">
			<div className="flex items-center">
				{[1, 2, 3, 4, 5].map((star) => (
					<Star
						key={star}
						className={`size-4 ${star <= product.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
					/>
				))}
			</div>
			<span className="text-sm text-muted-foreground">
				({product.reviewCount} reviews)
			</span>
		</div>

		<div className="flex items-baseline gap-2">
			{product.salePrice ? (
				<>
					<span className="text-2xl font-bold">${product.salePrice}</span>
					<span className="text-lg text-muted-foreground line-through">
						${product.price}
					</span>
					<Badge variant="destructive">
						{Math.round(
							((product.price - product.salePrice) / product.price) * 100,
						)}
						% OFF
					</Badge>
				</>
			) : (
				<span className="text-2xl font-bold">${product.price}</span>
			)}
		</div>

		<Separator />

		<p className="text-sm text-muted-foreground">{product.description}</p>

		<div className="space-y-3">
			{product.variants.map((variant) => (
				<div key={variant.type}>
					<p className="mb-2 text-sm font-medium">{variant.type}:</p>
					<div className="flex flex-wrap gap-2">
						{variant.options.map((option) => (
							<Button
								key={option}
								variant={
									selectedVariants[variant.type] === option
										? 'default'
										: 'outline'
								}
								size="sm"
								onClick={() => onVariantSelect(variant.type, option)}
							>
								{option}
							</Button>
						))}
					</div>
				</div>
			))}
		</div>

		<Separator />

		<ul className="space-y-2">
			{product.features.map((feature, idx) => (
				<li key={idx} className="flex items-center gap-2 text-sm">
					<Check className="size-4 text-green-500" />
					{feature}
				</li>
			))}
		</ul>

		<div className="flex items-center gap-4 text-sm text-muted-foreground">
			<div className="flex items-center gap-1">
				<Package className="size-4" />
				{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
			</div>
			<div className="flex items-center gap-1">
				<Truck className="size-4" />
				Free shipping
			</div>
		</div>
	</div>
);

interface QuickViewModalProps {
	product: Product;
	trigger: React.ReactNode;
}

const QuickViewModal = ({ product, trigger }: QuickViewModalProps) => {
	const [activeImage, setActiveImage] = React.useState(0);
	const [selectedVariants, setSelectedVariants] = React.useState<
		Record<string, string>
	>({});

	const handleVariantSelect = (type: string, value: string) => {
		setSelectedVariants((prev) => ({ ...prev, [type]: value }));
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Eye className="size-5" />
						Quick View
					</DialogTitle>
				</DialogHeader>

				<div className="grid gap-6 @sm:grid-cols-2">
					<ProductImageGallery
						images={product.images}
						activeIndex={activeImage}
						onSelect={setActiveImage}
					/>
					<ProductInfo
						product={product}
						selectedVariants={selectedVariants}
						onVariantSelect={handleVariantSelect}
					/>
				</div>

				<div className="flex gap-2">
					<Button className="flex-1 gap-2">
						<ShoppingCart className="size-4" />
						Add to Cart
					</Button>
					<Button variant="outline" size="icon">
						<Heart className="size-4" />
					</Button>
					<Button variant="outline" size="icon">
						<Share2 className="size-4" />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Wireless Bluetooth Headphones',
			sku: 'WBH-001',
			price: 129.99,
			salePrice: 99.99,
			description:
				'Premium wireless headphones with active noise cancellation and up to 30 hours of battery life.',
			features: [
				'Active Noise Cancellation',
				'30-hour battery life',
				'Bluetooth 5.0',
				'Foldable design',
			],
			rating: 4.5,
			reviewCount: 256,
			stock: 45,
			category: 'Audio',
			variants: [{ type: 'Color', options: ['Black', 'White', 'Blue'] }],
			images: ['1', '2', '3', '4'],
		},
		{
			id: '2',
			name: 'Mechanical Gaming Keyboard',
			sku: 'MGK-001',
			price: 149.99,
			salePrice: null,
			description:
				'RGB mechanical keyboard with hot-swappable switches and premium build quality.',
			features: [
				'Hot-swappable switches',
				'Full RGB lighting',
				'N-key rollover',
				'Aluminum frame',
			],
			rating: 4.8,
			reviewCount: 128,
			stock: 12,
			category: 'Gaming',
			variants: [
				{ type: 'Switch', options: ['Red', 'Blue', 'Brown'] },
				{ type: 'Layout', options: ['US', 'UK', 'DE'] },
			],
			images: ['1', '2', '3'],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Eye className="size-5" />
					<h2 className="text-xl font-semibold">Product Quick View</h2>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2">
					{products.map((product) => (
						<div key={product.id} className="rounded-lg border bg-card p-4">
							<div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-muted text-4xl">
								📦
							</div>
							<div className="mb-2 flex items-center justify-between">
								<Badge variant="secondary">{product.category}</Badge>
								<div className="flex items-center gap-1">
									<Star className="size-4 fill-amber-400 text-amber-400" />
									<span className="text-sm">{product.rating}</span>
								</div>
							</div>
							<h3 className="font-medium">{product.name}</h3>
							<div className="mt-1 flex items-baseline gap-2">
								{product.salePrice ? (
									<>
										<span className="font-bold">${product.salePrice}</span>
										<span className="text-sm text-muted-foreground line-through">
											${product.price}
										</span>
									</>
								) : (
									<span className="font-bold">${product.price}</span>
								)}
							</div>
							<div className="mt-4 flex gap-2">
								<QuickViewModal
									product={product}
									trigger={
										<Button variant="outline" className="flex-1 gap-2">
											<Eye className="size-4" />
											Quick View
										</Button>
									}
								/>
								<Button size="icon">
									<ShoppingCart className="size-4" />
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
