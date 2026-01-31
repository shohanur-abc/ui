import Link from 'next/link';
import { Heart, ShoppingCart, X, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Friend {
	name: string;
	avatar: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	friendsWhoWant: Friend[];
	totalWants: number;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const FriendsWanting = ({ friends, totalWants }: { friends: Friend[]; totalWants: number }) => (
	<div className="mt-3 p-2.5 rounded-lg bg-muted/50">
		<div className="flex items-center gap-2">
			<div className="flex -space-x-2">
				{friends.slice(0, 3).map((friend, i) => (
					<Avatar key={i} className="size-6 border-2 border-background">
						<AvatarImage src={friend.avatar} alt={friend.name} />
						<AvatarFallback className="text-[10px]">{friend.name[0]}</AvatarFallback>
					</Avatar>
				))}
				{totalWants > 3 && (
					<div className="size-6 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center border-2 border-background">
						+{totalWants - 3}
					</div>
				)}
			</div>
			<span className="text-xs text-muted-foreground">
				{friends[0]?.name}{totalWants > 1 ? ` and ${totalWants - 1} others` : ''} also want this
			</span>
		</div>
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
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-2 right-2 rounded-full"
			>
				<X className="size-4" />
			</Button>
			<Heart className="absolute top-2 left-2 size-5 fill-primary text-primary" />
			{item.totalWants > 0 && (
				<Badge className="absolute bottom-2 left-2 gap-1" variant="secondary">
					<Users className="size-3" />
					{item.totalWants} friends
				</Badge>
			)}
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<p className="text-xl font-bold mt-2">${item.price.toFixed(2)}</p>
			{item.friendsWhoWant.length > 0 && (
				<FriendsWanting friends={item.friendsWhoWant} totalWants={item.totalWants} />
			)}
			<div className="flex gap-2 mt-4">
				<Button className="flex-1 gap-2">
					<ShoppingCart className="size-4" />
					Add
				</Button>
				<Button variant="outline" size="icon">
					<MessageSquare className="size-4" />
				</Button>
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

const SocialHeader = () => (
	<div className="flex flex-wrap items-center justify-between gap-4 mb-6 @md:mb-8">
		<div>
			<h1 className="text-2xl @md:text-3xl font-bold">Social Wishlist</h1>
			<p className="text-muted-foreground mt-1">See what your friends are saving too</p>
		</div>
		<Button variant="outline" className="gap-2">
			<Users className="size-4" />
			Find Friends
		</Button>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Instant Film Camera', price: 99.00, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop', friendsWhoWant: [{ name: 'Alex', avatar: 'https://i.pravatar.cc/100?img=1' }, { name: 'Jordan', avatar: 'https://i.pravatar.cc/100?img=2' }, { name: 'Sam', avatar: 'https://i.pravatar.cc/100?img=3' }], totalWants: 5, href: '/product/1' },
		{ id: '2', name: 'Portable Projector', price: 299.00, image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=400&fit=crop', friendsWhoWant: [{ name: 'Taylor', avatar: 'https://i.pravatar.cc/100?img=4' }], totalWants: 1, href: '/product/2' },
		{ id: '3', name: 'Bluetooth Turntable', price: 179.00, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop', friendsWhoWant: [{ name: 'Morgan', avatar: 'https://i.pravatar.cc/100?img=5' }, { name: 'Casey', avatar: 'https://i.pravatar.cc/100?img=6' }], totalWants: 8, href: '/product/3' },
		{ id: '4', name: 'LED Strip Lights', price: 29.00, image: 'https://images.unsplash.com/photo-1563991655280-cb95c90ca2fb?w=400&h=400&fit=crop', friendsWhoWant: [], totalWants: 0, href: '/product/4' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<SocialHeader />
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
