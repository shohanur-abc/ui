import Link from 'next/link';
import { Heart, ShoppingCart, X, Gift, Users, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';

interface SharedUser {
	name: string;
	avatar: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	isGift: boolean;
	href: string;
}

interface WishlistCollection {
	id: string;
	name: string;
	isPublic: boolean;
	sharedWith: SharedUser[];
	items: WishlistItem[];
}

interface CollectionGridProps {
	collections: WishlistCollection[];
}

const CollectionHeader = ({
	name,
	isPublic,
	sharedWith,
}: {
	name: string;
	isPublic: boolean;
	sharedWith: SharedUser[];
}) => (
	<CardHeader className="pb-4">
		<div className="flex items-center justify-between">
			<CardTitle className="text-lg">{name}</CardTitle>
			<div className="flex items-center gap-2">
				{isPublic ? (
					<Badge variant="secondary" className="gap-1">
						<Users className="size-3" />
						Public
					</Badge>
				) : (
					<Badge variant="outline" className="gap-1">
						<Lock className="size-3" />
						Private
					</Badge>
				)}
			</div>
		</div>
		{sharedWith.length > 0 && (
			<div className="flex items-center gap-2 mt-2">
				<span className="text-xs text-muted-foreground">Shared with:</span>
				<div className="flex -space-x-2">
					{sharedWith.slice(0, 3).map((user, i) => (
						<Avatar key={i} className="size-6 border-2 border-background">
							<AvatarImage src={user.avatar} alt={user.name} />
							<AvatarFallback className="text-[10px]">{user.name[0]}</AvatarFallback>
						</Avatar>
					))}
					{sharedWith.length > 3 && (
						<div className="flex size-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px]">
							+{sharedWith.length - 3}
						</div>
					)}
				</div>
			</div>
		)}
	</CardHeader>
);

const ProductMiniCard = ({ item }: { item: WishlistItem }) => (
	<div className="group relative aspect-square overflow-hidden rounded-lg bg-muted">
		<img
			src={item.image}
			alt={item.name}
			className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
		/>
		{item.isGift && (
			<div className="absolute top-1 left-1">
				<Badge className="size-5 p-0 flex items-center justify-center bg-amber-500">
					<Gift className="size-3" />
				</Badge>
			</div>
		)}
		<div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
			<Button size="icon-sm" variant="secondary" className="rounded-full size-7">
				<ShoppingCart className="size-3" />
			</Button>
			<Button size="icon-sm" variant="secondary" className="rounded-full size-7 text-destructive">
				<X className="size-3" />
			</Button>
		</div>
	</div>
);

const CollectionCard = ({ collection }: { collection: WishlistCollection }) => (
	<Card className="overflow-hidden">
		<CollectionHeader
			name={collection.name}
			isPublic={collection.isPublic}
			sharedWith={collection.sharedWith}
		/>
		<CardContent className="pt-0">
			<div className="grid grid-cols-3 gap-2">
				{collection.items.slice(0, 6).map((item) => (
					<ProductMiniCard key={item.id} item={item} />
				))}
			</div>
			{collection.items.length > 6 && (
				<Button variant="ghost" size="sm" className="w-full mt-3">
					View all {collection.items.length} items
				</Button>
			)}
		</CardContent>
	</Card>
);

const CollectionGrid = ({ collections }: CollectionGridProps) => (
	<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
		{collections.map((collection) => (
			<CollectionCard key={collection.id} collection={collection} />
		))}
	</div>
);

const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="flex flex-wrap items-center justify-between gap-4 mb-6 @md:mb-8">
		<div>
			<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
			<p className="text-muted-foreground mt-1">{subtitle}</p>
		</div>
		<Button className="gap-2">
			<Heart className="size-4" />
			Create Collection
		</Button>
	</div>
);

export default function Main() {
	const collections: WishlistCollection[] = [
		{
			id: '1',
			name: 'Birthday Wishlist',
			isPublic: true,
			sharedWith: [
				{ name: 'Alice', avatar: 'https://i.pravatar.cc/100?img=1' },
				{ name: 'Bob', avatar: 'https://i.pravatar.cc/100?img=2' },
				{ name: 'Carol', avatar: 'https://i.pravatar.cc/100?img=3' },
				{ name: 'Dan', avatar: 'https://i.pravatar.cc/100?img=4' },
			],
			items: [
				{ id: '1', name: 'Headphones', price: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', isGift: true, href: '/product/1' },
				{ id: '2', name: 'Watch', price: 399, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', isGift: false, href: '/product/2' },
				{ id: '3', name: 'Sunglasses', price: 199, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop', isGift: true, href: '/product/3' },
				{ id: '4', name: 'Sneakers', price: 179, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop', isGift: false, href: '/product/4' },
				{ id: '5', name: 'Backpack', price: 89, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop', isGift: false, href: '/product/5' },
				{ id: '6', name: 'Camera', price: 599, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop', isGift: false, href: '/product/6' },
			],
		},
		{
			id: '2',
			name: 'Home Office',
			isPublic: false,
			sharedWith: [],
			items: [
				{ id: '7', name: 'Desk', price: 599, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200&h=200&fit=crop', isGift: false, href: '/product/7' },
				{ id: '8', name: 'Chair', price: 349, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200&h=200&fit=crop', isGift: false, href: '/product/8' },
				{ id: '9', name: 'Lamp', price: 89, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop', isGift: false, href: '/product/9' },
			],
		},
		{
			id: '3',
			name: 'Fashion Picks',
			isPublic: true,
			sharedWith: [
				{ name: 'Emma', avatar: 'https://i.pravatar.cc/100?img=5' },
			],
			items: [
				{ id: '10', name: 'Jacket', price: 249, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop', isGift: false, href: '/product/10' },
				{ id: '11', name: 'Jeans', price: 129, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop', isGift: false, href: '/product/11' },
				{ id: '12', name: 'Boots', price: 199, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop', isGift: false, href: '/product/12' },
				{ id: '13', name: 'Scarf', price: 79, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=200&h=200&fit=crop', isGift: false, href: '/product/13' },
				{ id: '14', name: 'Hat', price: 49, image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop', isGift: false, href: '/product/14' },
			],
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<PageHeader title="My Collections" subtitle="Organize your wishlist into themed collections" />
				<CollectionGrid collections={collections} />
			</div>
		</section>
	);
}
