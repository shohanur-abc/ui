import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	X,
	Users,
	Gift,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Friend {
	name: string;
	avatar: string;
	wantsThis: boolean;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	friends: Friend[];
	giftIdea: boolean;
	href: string;
}

interface CarouselProps {
	items: WishlistItem[];
}

const FriendStack = ({ friends }: { friends: Friend[] }) => {
	const wantingFriends = friends.filter((f) => f.wantsThis);
	if (wantingFriends.length === 0) return null;

	return (
		<div className="flex items-center gap-2 mt-2">
			<div className="flex -space-x-2">
				{wantingFriends.slice(0, 4).map((friend, i) => (
					<Avatar key={i} className="size-6 border-2 border-background">
						<AvatarImage src={friend.avatar} alt={friend.name} />
						<AvatarFallback className="text-[8px]">
							{friend.name[0]}
						</AvatarFallback>
					</Avatar>
				))}
			</div>
			<span className="text-xs text-muted-foreground">
				{wantingFriends.length === 1
					? `${wantingFriends[0].name} also wants this`
					: `${wantingFriends.length} friends want this`}
			</span>
		</div>
	);
};

const CarouselItem = ({ item }: { item: WishlistItem }) => (
	<div className="flex-shrink-0 w-64 @sm:w-72 @md:w-80">
		<Card className="overflow-hidden group h-full">
			<div className="relative aspect-square bg-muted">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover"
				/>
				<Button
					variant="ghost"
					size="icon-sm"
					className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
				>
					<Heart className="size-4 fill-primary text-primary" />
				</Button>
				{item.friends.filter((f) => f.wantsThis).length > 0 && (
					<Badge className="absolute top-3 left-3 gap-1 bg-background/90 text-foreground">
						<Users className="size-3" />
						{item.friends.filter((f) => f.wantsThis).length}
					</Badge>
				)}
				{item.giftIdea && (
					<Badge className="absolute bottom-3 left-3 gap-1 bg-pink-500 text-white">
						<Gift className="size-3" />
						Gift Idea
					</Badge>
				)}
			</div>
			<div className="p-4">
				<Link href={item.href}>
					<h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">
						{item.name}
					</h3>
				</Link>
				<span className="text-lg font-bold mt-1 block">
					${item.price.toFixed(2)}
				</span>
				<FriendStack friends={item.friends} />
				<div className="flex items-center gap-2 mt-4">
					<Button size="sm" className="flex-1 gap-1">
						<ShoppingCart className="size-4" />
						Add
					</Button>
					{item.giftIdea && (
						<Button variant="secondary" size="icon-sm">
							<Gift className="size-4" />
						</Button>
					)}
					<Button
						variant="ghost"
						size="icon-sm"
						className="text-destructive hover:text-destructive"
					>
						<X className="size-4" />
					</Button>
				</div>
			</div>
		</Card>
	</div>
);

const CarouselSlider = ({ items }: CarouselProps) => (
	<div className="relative">
		<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
			{items.map((item) => (
				<div key={item.id} className="snap-start">
					<CarouselItem item={item} />
				</div>
			))}
		</div>
		<Button
			variant="outline"
			size="icon"
			className="absolute left-0 top-1/3 -translate-x-1/2 hidden @md:flex bg-background shadow-lg"
		>
			<ChevronLeft className="size-5" />
		</Button>
		<Button
			variant="outline"
			size="icon"
			className="absolute right-0 top-1/3 translate-x-1/2 hidden @md:flex bg-background shadow-lg"
		>
			<ChevronRight className="size-5" />
		</Button>
	</div>
);

const FriendsHeader = ({ friends }: { friends: Friend[] }) => (
	<div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-muted">
		<div className="flex items-center gap-3">
			<Users className="size-6 text-primary" />
			<div>
				<h1 className="text-xl @md:text-2xl font-bold">Social Wishlist</h1>
				<p className="text-sm text-muted-foreground">
					See what your friends are saving too
				</p>
			</div>
		</div>
		<div className="flex -space-x-2">
			{friends.slice(0, 5).map((friend, i) => (
				<Avatar key={i} className="size-8 border-2 border-background">
					<AvatarImage src={friend.avatar} alt={friend.name} />
					<AvatarFallback className="text-xs">{friend.name[0]}</AvatarFallback>
				</Avatar>
			))}
			{friends.length > 5 && (
				<div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium border-2 border-background">
					+{friends.length - 5}
				</div>
			)}
		</div>
	</div>
);

export default function Main() {
	const allFriends: Friend[] = [
		{
			name: 'Alex',
			avatar: 'https://i.pravatar.cc/100?img=1',
			wantsThis: true,
		},
		{ name: 'Sam', avatar: 'https://i.pravatar.cc/100?img=2', wantsThis: true },
		{
			name: 'Jordan',
			avatar: 'https://i.pravatar.cc/100?img=3',
			wantsThis: false,
		},
		{
			name: 'Casey',
			avatar: 'https://i.pravatar.cc/100?img=4',
			wantsThis: true,
		},
		{
			name: 'Morgan',
			avatar: 'https://i.pravatar.cc/100?img=5',
			wantsThis: false,
		},
		{
			name: 'Riley',
			avatar: 'https://i.pravatar.cc/100?img=6',
			wantsThis: true,
		},
	];

	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Vintage Polaroid Camera',
			price: 129.0,
			image:
				'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
			friends: [allFriends[0], allFriends[1], allFriends[3]],
			giftIdea: true,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Vinyl Record Player',
			price: 249.0,
			image:
				'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop',
			friends: [allFriends[1]],
			giftIdea: false,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Portable Projector',
			price: 399.0,
			image:
				'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
			friends: [allFriends[0], allFriends[3], allFriends[5]],
			giftIdea: true,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Board Game Collection',
			price: 89.0,
			image:
				'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=400&fit=crop',
			friends: [],
			giftIdea: true,
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Smart Speaker',
			price: 199.0,
			image:
				'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop',
			friends: [allFriends[5]],
			giftIdea: false,
			href: '/product/5',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<FriendsHeader friends={allFriends} />
				<CarouselSlider items={wishlistItems} />
			</div>
		</section>
	);
}
