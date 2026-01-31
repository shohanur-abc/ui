import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, Palette, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ColorOption {
	name: string;
	hex: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	colors: ColorOption[];
	sizes: string[];
	selectedColor: string;
	selectedSize: string;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const ColorSelector = ({ colors, selected }: { colors: ColorOption[]; selected: string }) => (
	<div className="flex items-center gap-2 mt-3">
		<Palette className="size-4 text-muted-foreground" />
		<div className="flex gap-1.5">
			{colors.map((color) => (
				<button
					key={color.name}
					className={`size-5 rounded-full border-2 transition-all ${
						selected === color.name ? 'border-primary ring-2 ring-primary/20' : 'border-border'
					}`}
					style={{ backgroundColor: color.hex }}
					title={color.name}
				/>
			))}
		</div>
	</div>
);

const SizeSelector = ({ sizes, selected }: { sizes: string[]; selected: string }) => (
	<div className="flex items-center gap-2 mt-2">
		<Ruler className="size-4 text-muted-foreground" />
		<Select defaultValue={selected}>
			<SelectTrigger className="h-8 w-auto min-w-[80px]">
				<SelectValue placeholder="Size" />
			</SelectTrigger>
			<SelectContent>
				{sizes.map((size) => (
					<SelectItem key={size} value={size}>
						{size}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden">
		<div className="relative aspect-[3/4] overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<div className="absolute top-2 right-2 flex flex-col gap-1.5">
				<Button
					size="icon-sm"
					variant="secondary"
					className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
				>
					<Trash2 className="size-4 text-destructive" />
				</Button>
			</div>
			<div className="absolute top-2 left-2">
				<Heart className="size-5 fill-primary text-primary" />
			</div>
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<p className="text-lg font-bold mt-1">${item.price.toFixed(2)}</p>
			<ColorSelector colors={item.colors} selected={item.selectedColor} />
			<SizeSelector sizes={item.sizes} selected={item.selectedSize} />
			<Button className="w-full mt-4 gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
		</CardContent>
	</Card>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 gap-4 @md:gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Classic Polo Shirt',
			price: 65.00,
			image: 'https://images.unsplash.com/photo-1625910513413-5fc69d8a0b88?w=400&h=533&fit=crop',
			colors: [
				{ name: 'White', hex: '#FFFFFF' },
				{ name: 'Navy', hex: '#000080' },
				{ name: 'Red', hex: '#DC2626' },
				{ name: 'Green', hex: '#059669' },
			],
			sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
			selectedColor: 'Navy',
			selectedSize: 'M',
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Slim Fit Dress Shirt',
			price: 89.00,
			image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=533&fit=crop',
			colors: [
				{ name: 'White', hex: '#FFFFFF' },
				{ name: 'Light Blue', hex: '#93C5FD' },
				{ name: 'Pink', hex: '#F9A8D4' },
			],
			sizes: ['14', '14.5', '15', '15.5', '16', '16.5', '17'],
			selectedColor: 'Light Blue',
			selectedSize: '15',
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Relaxed Fit Jeans',
			price: 79.00,
			image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=533&fit=crop',
			colors: [
				{ name: 'Light Wash', hex: '#93C5FD' },
				{ name: 'Medium Wash', hex: '#3B82F6' },
				{ name: 'Dark Wash', hex: '#1E3A8A' },
				{ name: 'Black', hex: '#171717' },
			],
			sizes: ['28', '30', '32', '34', '36', '38'],
			selectedColor: 'Medium Wash',
			selectedSize: '32',
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Leather Oxford Shoes',
			price: 189.00,
			image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=533&fit=crop',
			colors: [
				{ name: 'Tan', hex: '#D2691E' },
				{ name: 'Brown', hex: '#8B4513' },
				{ name: 'Black', hex: '#171717' },
			],
			sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
			selectedColor: 'Brown',
			selectedSize: '9',
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center justify-between mb-6 @md:mb-8">
					<div>
						<h1 className="text-2xl @md:text-3xl font-bold">My Wishlist</h1>
						<p className="text-muted-foreground mt-1">{wishlistItems.length} items saved</p>
					</div>
					<Button variant="outline" className="gap-2">
						<ShoppingCart className="size-4" />
						Add All to Cart
					</Button>
				</div>
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
