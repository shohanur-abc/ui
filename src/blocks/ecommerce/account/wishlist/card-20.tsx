import Link from 'next/link';
import { Heart, ShoppingCart, X, Layers, ChevronDown, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface RelatedItem {
	name: string;
	price: number;
	image: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	description: string;
	relatedItems: RelatedItem[];
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const RelatedProducts = ({ items }: { items: RelatedItem[] }) => (
	<Collapsible>
		<CollapsibleTrigger asChild>
			<Button
				variant="ghost"
				size="sm"
				className="w-full justify-between text-xs"
			>
				<span className="flex items-center gap-1">
					<Layers className="size-3" />
					{items.length} Related Items
				</span>
				<ChevronDown className="size-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
			</Button>
		</CollapsibleTrigger>
		<CollapsibleContent className="mt-2 space-y-2">
			{items.map((item, i) => (
				<div
					key={i}
					className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
				>
					<img
						src={item.image}
						alt={item.name}
						className="size-10 rounded object-cover"
					/>
					<div className="flex-1 min-w-0">
						<p className="text-xs font-medium truncate">{item.name}</p>
						<p className="text-xs text-muted-foreground">
							${item.price.toFixed(2)}
						</p>
					</div>
					<Button size="sm" variant="ghost" className="size-7 p-0">
						<Heart className="size-3" />
					</Button>
				</div>
			))}
		</CollapsibleContent>
	</Collapsible>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
		<div className="relative aspect-[4/3] overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<div className="absolute top-2 right-2 flex gap-1">
				<Button
					size="icon-sm"
					variant="secondary"
					className="rounded-full bg-background/80 backdrop-blur-sm"
				>
					<Eye className="size-4" />
				</Button>
				<Button
					size="icon-sm"
					variant="secondary"
					className="rounded-full bg-background/80 backdrop-blur-sm"
				>
					<X className="size-4" />
				</Button>
			</div>
			<Heart className="absolute top-2 left-2 size-5 fill-primary text-primary" />
			{item.relatedItems.length > 0 && (
				<Badge className="absolute bottom-2 left-2 gap-1" variant="secondary">
					<Layers className="size-3" />
					Bundle
				</Badge>
			)}
		</div>
		<CardContent className="flex-1 p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<p className="text-sm text-muted-foreground line-clamp-2 mt-1">
				{item.description}
			</p>
			<p className="text-xl font-bold mt-3">${item.price.toFixed(2)}</p>
		</CardContent>
		{item.relatedItems.length > 0 && (
			<>
				<Separator />
				<div className="p-4 pt-2">
					<RelatedProducts items={item.relatedItems} />
				</div>
			</>
		)}
		<CardFooter className="p-4 pt-0">
			<Button className="w-full gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
		</CardFooter>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Professional Drawing Tablet',
			price: 399.0,
			image:
				'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
			description:
				'15.6-inch display with pressure-sensitive stylus for digital art and design',
			relatedItems: [
				{
					name: 'Drawing Glove',
					price: 12.99,
					image:
						'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=100&h=100&fit=crop',
				},
				{
					name: 'Pen Nibs Set',
					price: 24.99,
					image:
						'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=100&h=100&fit=crop',
				},
			],
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Wireless Art Pen Display',
			price: 599.0,
			image:
				'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400&h=300&fit=crop',
			description:
				'Bluetooth-enabled pen display with 4K resolution and tilt recognition',
			relatedItems: [
				{
					name: 'Tablet Stand',
					price: 49.99,
					image:
						'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=100&h=100&fit=crop',
				},
			],
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Digital Stylus Pro',
			price: 129.0,
			image:
				'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=300&fit=crop',
			description:
				'Universal stylus compatible with most tablets and touchscreens',
			relatedItems: [],
			href: '/product/3',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="mb-6 @md:mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold">Wishlist</h1>
					<p className="text-muted-foreground mt-1">
						Products with related accessories
					</p>
				</div>
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
