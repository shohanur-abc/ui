import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	Palette,
	Check,
	ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Variant {
	id: string;
	name: string;
	color?: string;
	image: string;
	price: number;
	inStock: boolean;
}

interface WishlistItem {
	id: string;
	name: string;
	description: string;
	image: string;
	variants: Variant[];
	sizes: { name: string; inStock: boolean }[];
	href: string;
}

const VariantGallery = ({
	variants,
	selectedId,
}: {
	variants: Variant[];
	selectedId: string;
}) => {
	const selected = variants.find((v) => v.id === selectedId) || variants[0];
	return (
		<div className="sticky top-4">
			<div className="aspect-square rounded-xl overflow-hidden bg-muted relative">
				<img
					src={selected.image}
					alt={selected.name}
					className="size-full object-cover"
				/>
				<Badge className="absolute top-4 right-4">{selected.name}</Badge>
			</div>
			<div className="flex gap-2 mt-3 overflow-x-auto pb-1">
				{variants.map((variant) => (
					<div
						key={variant.id}
						className={`relative size-16 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all ${variant.id === selectedId ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
					>
						<img
							src={variant.image}
							alt={variant.name}
							className="size-full object-cover"
						/>
						{!variant.inStock && (
							<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
								<span className="text-[10px] text-white">Sold Out</span>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

const VariantSelector = ({
	item,
	selectedVariant,
}: {
	item: WishlistItem;
	selectedVariant: Variant;
}) => (
	<div className="space-y-6">
		<div>
			<h2 className="text-2xl font-bold">{item.name}</h2>
			<p className="text-muted-foreground mt-2">{item.description}</p>
		</div>

		<div className="space-y-4">
			<div>
				<h3 className="font-medium mb-3 flex items-center gap-2">
					<Palette className="size-4" />
					Color: <span className="text-primary">{selectedVariant.name}</span>
				</h3>
				<div className="flex flex-wrap gap-2">
					{item.variants.map((variant) => (
						<button
							key={variant.id}
							className={`size-10 rounded-full border-2 transition-all ${variant.id === selectedVariant.id ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-muted-foreground/30'}`}
							style={{ backgroundColor: variant.color }}
							disabled={!variant.inStock}
						>
							{variant.id === selectedVariant.id && (
								<Check className="size-4 mx-auto text-white drop-shadow" />
							)}
						</button>
					))}
				</div>
			</div>

			<div>
				<h3 className="font-medium mb-3">Size</h3>
				<div className="flex flex-wrap gap-2">
					{item.sizes.map((size) => (
						<button
							key={size.name}
							className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${size.inStock ? 'hover:border-primary hover:text-primary' : 'opacity-40 cursor-not-allowed line-through'}`}
							disabled={!size.inStock}
						>
							{size.name}
						</button>
					))}
				</div>
			</div>
		</div>

		<div className="pt-4 border-t">
			<div className="flex items-baseline gap-2">
				<span className="text-3xl font-bold">
					${selectedVariant.price.toFixed(2)}
				</span>
				<Badge variant={selectedVariant.inStock ? 'default' : 'secondary'}>
					{selectedVariant.inStock ? 'In Stock' : 'Out of Stock'}
				</Badge>
			</div>
		</div>

		<div className="flex gap-3">
			<Button
				className="flex-1 gap-2"
				size="lg"
				disabled={!selectedVariant.inStock}
			>
				<ShoppingCart className="size-5" />
				Add to Cart
			</Button>
			<Button variant="outline" size="lg">
				<Heart className="size-5" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const wishlistItem: WishlistItem = {
		id: '1',
		name: 'Premium Leather Jacket',
		description:
			'Handcrafted genuine leather jacket with premium stitching. Classic design meets modern comfort.',
		image:
			'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
		variants: [
			{
				id: '1',
				name: 'Black',
				color: '#1a1a1a',
				image:
					'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
				price: 449.0,
				inStock: true,
			},
			{
				id: '2',
				name: 'Brown',
				color: '#8B4513',
				image:
					'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
				price: 449.0,
				inStock: true,
			},
			{
				id: '3',
				name: 'Tan',
				color: '#D2B48C',
				image:
					'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=400&fit=crop',
				price: 469.0,
				inStock: false,
			},
			{
				id: '4',
				name: 'Navy',
				color: '#000080',
				image:
					'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop',
				price: 459.0,
				inStock: true,
			},
		],
		sizes: [
			{ name: 'XS', inStock: true },
			{ name: 'S', inStock: true },
			{ name: 'M', inStock: true },
			{ name: 'L', inStock: false },
			{ name: 'XL', inStock: true },
			{ name: 'XXL', inStock: true },
		],
		href: '/product/1',
	};

	const selectedVariant = wishlistItem.variants[0];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 py-6 @md:py-8">
				<div className="grid @md:grid-cols-2 gap-8 @lg:gap-12">
					<VariantGallery
						variants={wishlistItem.variants}
						selectedId={selectedVariant.id}
					/>
					<VariantSelector
						item={wishlistItem}
						selectedVariant={selectedVariant}
					/>
				</div>
			</div>
		</section>
	);
}
