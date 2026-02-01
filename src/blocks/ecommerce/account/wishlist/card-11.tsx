import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, Gift, Share2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	isGiftable: boolean;
	addedBy?: { name: string; avatar: string };
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const ShareDialog = ({ itemName }: { itemName: string }) => (
	<Dialog>
		<DialogTrigger asChild>
			<Button variant="ghost" size="icon-sm" className="rounded-full">
				<Share2 className="size-4" />
			</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Share Wishlist Item</DialogTitle>
				<DialogDescription>
					Share &ldquo;{itemName}&rdquo; with friends and family
				</DialogDescription>
			</DialogHeader>
			<div className="flex gap-2 mt-4">
				<div className="flex-1 p-3 rounded-lg bg-muted text-sm truncate">
					https://shop.com/wishlist/share/item123
				</div>
				<Button variant="outline" size="icon">
					<Copy className="size-4" />
				</Button>
			</div>
		</DialogContent>
	</Dialog>
);

const AddedByIndicator = ({
	user,
}: {
	user: { name: string; avatar: string };
}) => (
	<div className="flex items-center gap-2 mt-2">
		<Avatar className="size-5">
			<AvatarImage src={user.avatar} alt={user.name} />
			<AvatarFallback className="text-[10px]">{user.name[0]}</AvatarFallback>
		</Avatar>
		<span className="text-xs text-muted-foreground">Added by {user.name}</span>
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
		<div className="relative aspect-square overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<div className="absolute top-2 right-2 flex gap-1">
				<ShareDialog itemName={item.name} />
				<Button
					size="icon-sm"
					variant="secondary"
					className="rounded-full bg-background/80 backdrop-blur-sm text-destructive"
				>
					<Trash2 className="size-4" />
				</Button>
			</div>
			<Heart className="absolute top-2 left-2 size-5 fill-primary text-primary" />
			{item.isGiftable && (
				<Badge className="absolute bottom-2 left-2 gap-1" variant="secondary">
					<Gift className="size-3" />
					Gift Wrap Available
				</Badge>
			)}
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			{item.addedBy && <AddedByIndicator user={item.addedBy} />}
			<p className="text-xl font-bold mt-2">${item.price.toFixed(2)}</p>
			<div className="flex gap-2 mt-4">
				<Button className="flex-1 gap-2">
					<ShoppingCart className="size-4" />
					Add to Cart
				</Button>
				{item.isGiftable && (
					<Button variant="outline" size="icon">
						<Gift className="size-4" />
					</Button>
				)}
			</div>
		</CardContent>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

const ShareBanner = () => (
	<div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20 mb-6 @md:mb-8">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
				<Share2 className="size-5 text-primary" />
			</div>
			<div>
				<p className="font-medium">Share Your Wishlist</p>
				<p className="text-sm text-muted-foreground">
					Let friends and family know what you want
				</p>
			</div>
		</div>
		<Button className="gap-2">
			<Copy className="size-4" />
			Copy Link
		</Button>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Cashmere Throw Blanket',
			price: 189.0,
			image:
				'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=400&h=400&fit=crop',
			isGiftable: true,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Artisan Coffee Set',
			price: 79.0,
			image:
				'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
			isGiftable: true,
			addedBy: { name: 'Emma', avatar: 'https://i.pravatar.cc/100?img=5' },
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Scented Candle Collection',
			price: 65.0,
			image:
				'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=400&fit=crop',
			isGiftable: true,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Leather Watch Strap',
			price: 45.0,
			image:
				'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop',
			isGiftable: false,
			addedBy: { name: 'Jake', avatar: 'https://i.pravatar.cc/100?img=8' },
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">
					Shared Wishlist
				</h1>
				<ShareBanner />
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
