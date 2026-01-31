import Link from 'next/link';
import { Heart, ShoppingCart, X, Users, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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
	height: 'short' | 'medium' | 'tall';
	savedByFriends: Friend[];
	commentCount: number;
	href: string;
}

interface MasonryProps {
	items: WishlistItem[];
}

const heightClasses = {
	short: 'h-44',
	medium: 'h-60',
	tall: 'h-80',
};

const FriendAvatars = ({ friends }: { friends: Friend[] }) => (
	<div className="flex items-center">
		<div className="flex -space-x-2">
			{friends.slice(0, 3).map((friend, i) => (
				<Avatar key={i} className="size-6 border-2 border-background">
					<AvatarImage src={friend.avatar} alt={friend.name} />
					<AvatarFallback className="text-[10px]">{friend.name[0]}</AvatarFallback>
				</Avatar>
			))}
		</div>
		{friends.length > 3 && (
			<span className="text-xs text-muted-foreground ml-1">+{friends.length - 3}</span>
		)}
	</div>
);

const SocialStats = ({ friends, comments }: { friends: Friend[]; comments: number }) => (
	<div className="flex items-center gap-3 mt-2">
		{friends.length > 0 && (
			<div className="flex items-center gap-1">
				<FriendAvatars friends={friends} />
				<span className="text-xs text-muted-foreground">also saved</span>
			</div>
		)}
		{comments > 0 && (
			<div className="flex items-center gap-1 text-xs text-muted-foreground">
				<MessageCircle className="size-3" />
				<span>{comments}</span>
			</div>
		)}
	</div>
);

const MasonryItem = ({ item }: { item: WishlistItem }) => (
	<div className="break-inside-avoid mb-4">
		<Card className="overflow-hidden group">
			<div className={`relative ${heightClasses[item.height]} bg-muted`}>
				<img src={item.image} alt={item.name} className="size-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
				<Button variant="ghost" size="icon-sm" className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">
					<Heart className="size-4 fill-primary text-primary" />
				</Button>
				{item.savedByFriends.length > 0 && (
					<Badge className="absolute top-2 left-2 gap-1 bg-background/80 backdrop-blur-sm text-foreground">
						<Users className="size-3" />
						{item.savedByFriends.length}
					</Badge>
				)}
				<div className="absolute bottom-3 inset-x-3">
					<Link href={item.href}>
						<h3 className="font-semibold text-white line-clamp-2 hover:underline">{item.name}</h3>
					</Link>
					<span className="font-bold text-white">${item.price.toFixed(2)}</span>
				</div>
			</div>
			<div className="p-3">
				<SocialStats friends={item.savedByFriends} comments={item.commentCount} />
				<div className="flex items-center gap-2 mt-3">
					<Button size="sm" className="flex-1 gap-1">
						<ShoppingCart className="size-4" />
						Add
					</Button>
					<Button variant="outline" size="icon-sm">
						<Share2 className="size-4" />
					</Button>
					<Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
						<X className="size-4" />
					</Button>
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
		{ id: '1', name: 'Vintage Camera', price: 450.00, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=500&fit=crop', height: 'tall', savedByFriends: [{ name: 'Alex', avatar: 'https://i.pravatar.cc/100?img=1' }, { name: 'Sam', avatar: 'https://i.pravatar.cc/100?img=2' }, { name: 'Jordan', avatar: 'https://i.pravatar.cc/100?img=3' }, { name: 'Casey', avatar: 'https://i.pravatar.cc/100?img=4' }], commentCount: 12, href: '/product/1' },
		{ id: '2', name: 'Record Player', price: 279.00, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=350&fit=crop', height: 'medium', savedByFriends: [{ name: 'Morgan', avatar: 'https://i.pravatar.cc/100?img=5' }], commentCount: 3, href: '/product/2' },
		{ id: '3', name: 'Instant Camera', price: 99.00, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=280&fit=crop', height: 'short', savedByFriends: [], commentCount: 0, href: '/product/3' },
		{ id: '4', name: 'Desk Lamp', price: 145.00, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', height: 'medium', savedByFriends: [{ name: 'Riley', avatar: 'https://i.pravatar.cc/100?img=6' }, { name: 'Taylor', avatar: 'https://i.pravatar.cc/100?img=7' }], commentCount: 5, href: '/product/4' },
		{ id: '5', name: 'Plant Pot Set', price: 65.00, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=500&fit=crop', height: 'tall', savedByFriends: [{ name: 'Jamie', avatar: 'https://i.pravatar.cc/100?img=8' }], commentCount: 2, href: '/product/5' },
		{ id: '6', name: 'Throw Blanket', price: 89.00, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop', height: 'short', savedByFriends: [], commentCount: 0, href: '/product/6' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center gap-3 mb-6">
					<Users className="size-7 text-primary" />
					<h1 className="text-2xl @md:text-3xl font-bold">Social Wishlist</h1>
				</div>
				<MasonryGrid items={wishlistItems} />
			</div>
		</section>
	);
}
