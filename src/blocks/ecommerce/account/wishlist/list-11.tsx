import Link from 'next/link';
import { Heart, ShoppingCart, X, Share2, Lock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SharedWith {
	name: string;
	avatar: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	isPublic: boolean;
	sharedWith: SharedWith[];
	href: string;
}

interface ListProps {
	items: WishlistItem[];
}

const ShareStatus = ({ isPublic, sharedWith }: { isPublic: boolean; sharedWith: SharedWith[] }) => (
	<div className="flex items-center gap-3 mt-2">
		<div className={`flex items-center gap-1 text-xs ${isPublic ? 'text-green-600' : 'text-muted-foreground'}`}>
			{isPublic ? <Globe className="size-3" /> : <Lock className="size-3" />}
			<span>{isPublic ? 'Public' : 'Private'}</span>
		</div>
		{sharedWith.length > 0 && (
			<div className="flex items-center gap-1">
				<div className="flex -space-x-1.5">
					{sharedWith.slice(0, 3).map((person, i) => (
						<Avatar key={i} className="size-5 border border-background">
							<AvatarImage src={person.avatar} alt={person.name} />
							<AvatarFallback className="text-[8px]">{person.name[0]}</AvatarFallback>
						</Avatar>
					))}
				</div>
				<span className="text-xs text-muted-foreground">+{sharedWith.length}</span>
			</div>
		)}
	</div>
);

const VisibilityToggle = ({ isPublic, itemId }: { isPublic: boolean; itemId: string }) => (
	<div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
		<Lock className="size-3 text-muted-foreground" />
		<span className="text-xs">Private</span>
		<Switch checked={isPublic} className="scale-75" />
		<Globe className="size-3 text-muted-foreground" />
		<span className="text-xs">Public</span>
	</div>
);

const ListItem = ({ item }: { item: WishlistItem }) => (
	<Card className="p-4">
		<div className="flex gap-4">
			<div className="relative size-20 @sm:size-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
				<img src={item.image} alt={item.name} className="size-full object-cover" />
				<Heart className="absolute top-2 left-2 size-4 fill-primary text-primary" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<div>
						<Link href={item.href}>
							<h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">{item.name}</h3>
						</Link>
						<ShareStatus isPublic={item.isPublic} sharedWith={item.sharedWith} />
					</div>
					<div className="flex gap-1">
						<Button variant="ghost" size="icon-sm">
							<Share2 className="size-4" />
						</Button>
						<Button variant="ghost" size="icon-sm" className="text-destructive">
							<X className="size-4" />
						</Button>
					</div>
				</div>
				<div className="flex flex-wrap items-center gap-3 mt-3">
					<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
					<VisibilityToggle isPublic={item.isPublic} itemId={item.id} />
				</div>
				<Button size="sm" className="gap-1.5 mt-3">
					<ShoppingCart className="size-4" />
					Add to Cart
				</Button>
			</div>
		</div>
	</Card>
);

const WishlistList = ({ items }: ListProps) => (
	<div className="space-y-3">
		{items.map((item) => (
			<ListItem key={item.id} item={item} />
		))}
	</div>
);

const SharingHeader = () => (
	<div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-muted mb-6">
		<div className="flex items-center gap-3">
			<Share2 className="size-5 text-primary" />
			<div>
				<p className="font-medium">Share Your Wishlist</p>
				<p className="text-sm text-muted-foreground">Control visibility for each item</p>
			</div>
		</div>
		<Button variant="outline" className="gap-2">
			<Globe className="size-4" />
			Make All Public
		</Button>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Minimalist Watch', price: 249.00, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=200&h=200&fit=crop', isPublic: true, sharedWith: [{ name: 'Alex', avatar: 'https://i.pravatar.cc/100?img=1' }, { name: 'Sam', avatar: 'https://i.pravatar.cc/100?img=2' }], href: '/product/1' },
		{ id: '2', name: 'Leather Wallet', price: 89.00, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop', isPublic: false, sharedWith: [], href: '/product/2' },
		{ id: '3', name: 'Sunglasses', price: 175.00, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop', isPublic: true, sharedWith: [{ name: 'Jordan', avatar: 'https://i.pravatar.cc/100?img=3' }], href: '/product/3' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">Shareable Wishlist</h1>
				<SharingHeader />
				<WishlistList items={wishlistItems} />
			</div>
		</section>
	);
}
