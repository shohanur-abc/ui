import Link from 'next/link';
import { Heart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	color: string;
	size: string;
	image: string;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const SectionHeader = ({
	title,
	actionLabel,
	actionHref,
}: {
	title: string;
	actionLabel: string;
	actionHref: string;
}) => (
	<div className="flex items-center justify-between mb-6">
		<h2 className="text-xl @md:text-2xl font-bold">{title}</h2>
		<Button variant="ghost" size="sm" className="gap-1 text-primary" asChild>
			<Link href={actionHref}>
				{actionLabel}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group flex flex-col overflow-hidden">
		<div className="relative aspect-[4/3] overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<Button
				size="icon-sm"
				variant="ghost"
				className="absolute top-2 right-2 rounded-full bg-background/90 text-destructive hover:bg-destructive hover:text-white transition-colors"
			>
				<Trash2 className="size-4" />
			</Button>
		</div>
		<div className="flex flex-1 flex-col p-4">
			<Link href={item.href}>
				<h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-2 flex flex-wrap gap-2">
				<Badge variant="outline" className="text-xs">
					{item.color}
				</Badge>
				<Badge variant="outline" className="text-xs">
					Size: {item.size}
				</Badge>
			</div>
			<div className="mt-auto pt-4">
				<div className="flex items-center justify-between">
					<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
					<div className="flex items-center gap-1 rounded-full border bg-muted/50">
						<Button
							size="icon-sm"
							variant="ghost"
							className="rounded-full size-7"
						>
							<Minus className="size-3" />
						</Button>
						<span className="w-6 text-center text-sm font-medium">
							{item.quantity}
						</span>
						<Button
							size="icon-sm"
							variant="ghost"
							className="rounded-full size-7"
						>
							<Plus className="size-3" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	</Card>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-4 @md:gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

const Summary = ({ items }: { items: WishlistItem[] }) => {
	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	return (
		<Card className="mt-8 p-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<Heart className="size-6 text-primary fill-primary" />
					<div>
						<p className="text-sm text-muted-foreground">Wishlist Subtotal</p>
						<p className="text-2xl font-bold">${subtotal.toFixed(2)}</p>
					</div>
				</div>
				<Button size="lg" className="gap-2">
					Move All to Cart
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</Card>
	);
};

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Premium Cotton T-Shirt',
			price: 45.0,
			quantity: 2,
			color: 'Navy Blue',
			size: 'M',
			image:
				'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Slim Fit Chinos',
			price: 79.0,
			quantity: 1,
			color: 'Khaki',
			size: '32',
			image:
				'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=300&fit=crop',
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Leather Belt',
			price: 55.0,
			quantity: 1,
			color: 'Brown',
			size: 'L',
			image:
				'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=300&fit=crop',
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Canvas Sneakers',
			price: 95.0,
			quantity: 1,
			color: 'White',
			size: '10',
			image:
				'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop',
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<SectionHeader
					title="My Wishlist"
					actionLabel="Continue Shopping"
					actionHref="/shop"
				/>
				<WishlistGrid items={wishlistItems} />
				<Summary items={wishlistItems} />
			</div>
		</section>
	);
}
