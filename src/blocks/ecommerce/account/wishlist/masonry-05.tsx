import Link from 'next/link';
import { Heart, ShoppingCart, X, Palette, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ColorVariant {
	name: string;
	hex: string;
	available: boolean;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	height: 'short' | 'medium' | 'tall';
	colors: ColorVariant[];
	selectedColor: string;
	href: string;
}

interface MasonryProps {
	items: WishlistItem[];
}

const heightClasses = {
	short: 'h-48',
	medium: 'h-64',
	tall: 'h-80',
};

const ColorSwatches = ({ colors, selectedColor }: { colors: ColorVariant[]; selectedColor: string }) => (
	<div className="flex flex-wrap gap-1 mt-2">
		{colors.map((color) => (
			<button
				key={color.name}
				className={`size-5 rounded-full border-2 relative ${color.name === selectedColor ? 'border-primary' : 'border-transparent'} ${!color.available ? 'opacity-50' : ''}`}
				style={{ backgroundColor: color.hex }}
				title={color.name}
				disabled={!color.available}
			>
				{color.name === selectedColor && (
					<Check className="size-3 absolute inset-0 m-auto text-white drop-shadow-md" />
				)}
				{!color.available && (
					<span className="absolute inset-0 flex items-center justify-center">
						<X className="size-3 text-white drop-shadow-md" />
					</span>
				)}
			</button>
		))}
	</div>
);

const AvailabilityBadge = ({ colors }: { colors: ColorVariant[] }) => {
	const availableCount = colors.filter((c) => c.available).length;
	return (
		<Badge variant="outline" className="text-xs gap-1">
			<Palette className="size-3" />
			{availableCount}/{colors.length} colors
		</Badge>
	);
};

const MasonryItem = ({ item }: { item: WishlistItem }) => (
	<div className="break-inside-avoid mb-4">
		<Card className="overflow-hidden group">
			<div className={`relative ${heightClasses[item.height]} bg-muted`}>
				<img src={item.image} alt={item.name} className="size-full object-cover" />
				<Button variant="ghost" size="icon-sm" className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">
					<Heart className="size-4 fill-primary text-primary" />
				</Button>
				<div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
					<Button size="sm" className="w-full gap-1">
						<ShoppingCart className="size-4" />
						Add to Cart
					</Button>
				</div>
			</div>
			<div className="p-3">
				<div className="flex items-start justify-between gap-2">
					<Link href={item.href} className="flex-1">
						<h3 className="font-medium line-clamp-1 hover:text-primary transition-colors">{item.name}</h3>
					</Link>
					<Button variant="ghost" size="icon-sm" className="flex-shrink-0 text-destructive hover:text-destructive">
						<X className="size-3" />
					</Button>
				</div>
				<ColorSwatches colors={item.colors} selectedColor={item.selectedColor} />
				<div className="flex items-center justify-between mt-3">
					<span className="font-bold">${item.price.toFixed(2)}</span>
					<AvailabilityBadge colors={item.colors} />
				</div>
			</div>
		</Card>
	</div>
);

const MasonryGrid = ({ items }: MasonryProps) => (
	<div className="columns-2 @md:columns-3 @xl:columns-4 gap-4">
		{items.map((item) => (
			<MasonryItem key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Cashmere Sweater', price: 245.00, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop', height: 'tall', colors: [{ name: 'Navy', hex: '#1e3a5f', available: true }, { name: 'Burgundy', hex: '#722f37', available: true }, { name: 'Camel', hex: '#c19a6b', available: false }, { name: 'Black', hex: '#1a1a1a', available: true }], selectedColor: 'Navy', href: '/product/1' },
		{ id: '2', name: 'Leather Tote', price: 189.00, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=350&fit=crop', height: 'medium', colors: [{ name: 'Brown', hex: '#8b4513', available: true }, { name: 'Black', hex: '#1a1a1a', available: true }, { name: 'Tan', hex: '#d2b48c', available: true }], selectedColor: 'Brown', href: '/product/2' },
		{ id: '3', name: 'Running Shoes', price: 145.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', height: 'short', colors: [{ name: 'Red', hex: '#dc2626', available: true }, { name: 'Blue', hex: '#2563eb', available: false }, { name: 'White', hex: '#ffffff', available: true }, { name: 'Black', hex: '#1a1a1a', available: true }], selectedColor: 'Red', href: '/product/3' },
		{ id: '4', name: 'Canvas Backpack', price: 89.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=450&fit=crop', height: 'tall', colors: [{ name: 'Olive', hex: '#6b8e23', available: true }, { name: 'Navy', hex: '#1e3a5f', available: true }, { name: 'Gray', hex: '#6b7280', available: true }], selectedColor: 'Olive', href: '/product/4' },
		{ id: '5', name: 'Silk Blouse', price: 175.00, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop', height: 'medium', colors: [{ name: 'White', hex: '#ffffff', available: true }, { name: 'Blush', hex: '#ffc0cb', available: false }, { name: 'Ivory', hex: '#fffff0', available: true }], selectedColor: 'White', href: '/product/5' },
		{ id: '6', name: 'Wool Hat', price: 45.00, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=280&fit=crop', height: 'short', colors: [{ name: 'Charcoal', hex: '#36454f', available: true }, { name: 'Cream', hex: '#fffdd0', available: true }], selectedColor: 'Charcoal', href: '/product/6' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center gap-3 mb-6">
					<Palette className="size-7 text-primary" />
					<h1 className="text-2xl @md:text-3xl font-bold">Color Collection</h1>
				</div>
				<MasonryGrid items={wishlistItems} />
			</div>
		</section>
	);
}
