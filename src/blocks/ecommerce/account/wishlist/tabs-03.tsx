import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	Gift,
	Users,
	Lock,
	Globe,
	Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	href: string;
}

interface SharedWith {
	id: string;
	name: string;
	avatar: string;
}

interface Wishlist {
	id: string;
	type: 'private' | 'shared' | 'public';
	name: string;
	items: WishlistItem[];
	sharedWith?: SharedWith[];
}

const ItemCard = ({ item }: { item: WishlistItem }) => (
	<div className="flex items-center gap-3 p-3 rounded-lg bg-card border hover:border-primary transition-colors">
		<div className="size-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium text-sm truncate">{item.name}</p>
			<p className="text-sm font-bold mt-0.5">${item.price.toFixed(2)}</p>
		</div>
		<Button size="sm" variant="ghost">
			<ShoppingCart className="size-4" />
		</Button>
	</div>
);

const PrivacyBadge = ({ type }: { type: 'private' | 'shared' | 'public' }) => {
	const config = {
		private: {
			icon: Lock,
			text: 'Private',
			className: 'bg-slate-100 text-slate-700',
		},
		shared: {
			icon: Users,
			text: 'Shared',
			className: 'bg-blue-100 text-blue-700',
		},
		public: {
			icon: Globe,
			text: 'Public',
			className: 'bg-green-100 text-green-700',
		},
	};
	const Icon = config[type].icon;
	return (
		<Badge variant="outline" className={config[type].className}>
			<Icon className="size-3 mr-1" />
			{config[type].text}
		</Badge>
	);
};

const SharedWithSection = ({ people }: { people: SharedWith[] }) => (
	<div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-muted">
		<span className="text-sm text-muted-foreground">Shared with:</span>
		<div className="flex -space-x-2">
			{people.map((person) => (
				<Avatar key={person.id} className="size-7 border-2 border-background">
					<AvatarImage src={person.avatar} />
					<AvatarFallback>{person.name[0]}</AvatarFallback>
				</Avatar>
			))}
		</div>
		<Button variant="outline" size="sm" className="ml-auto gap-1">
			<Share2 className="size-3" />
			Invite
		</Button>
	</div>
);

const WishlistContent = ({ wishlist }: { wishlist: Wishlist }) => (
	<div>
		<div className="flex items-center justify-between mb-4">
			<div className="flex items-center gap-3">
				<h2 className="text-lg font-bold">{wishlist.name}</h2>
				<PrivacyBadge type={wishlist.type} />
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">Make public</span>
				<Switch checked={wishlist.type === 'public'} />
			</div>
		</div>
		<div className="space-y-2">
			{wishlist.items.map((item) => (
				<ItemCard key={item.id} item={item} />
			))}
		</div>
		{wishlist.sharedWith && wishlist.sharedWith.length > 0 && (
			<SharedWithSection people={wishlist.sharedWith} />
		)}
	</div>
);

export default function Main() {
	const wishlists: Wishlist[] = [
		{
			id: 'private',
			type: 'private',
			name: 'My Private List',
			items: [
				{
					id: '1',
					name: 'Premium Headphones',
					price: 299,
					image:
						'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
					href: '/product/1',
				},
				{
					id: '2',
					name: 'Fitness Tracker',
					price: 199,
					image:
						'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
					href: '/product/2',
				},
			],
		},
		{
			id: 'shared',
			type: 'shared',
			name: 'Family Gift Ideas',
			items: [
				{
					id: '3',
					name: 'Coffee Machine',
					price: 449,
					image:
						'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop',
					href: '/product/3',
				},
				{
					id: '4',
					name: 'Smart Speaker',
					price: 99,
					image:
						'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&h=400&fit=crop',
					href: '/product/4',
				},
				{
					id: '5',
					name: 'Board Game Set',
					price: 59,
					image:
						'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=400&fit=crop',
					href: '/product/5',
				},
			],
			sharedWith: [
				{ id: '1', name: 'Mom', avatar: 'https://i.pravatar.cc/100?img=1' },
				{ id: '2', name: 'Dad', avatar: 'https://i.pravatar.cc/100?img=2' },
				{ id: '3', name: 'Sister', avatar: 'https://i.pravatar.cc/100?img=3' },
			],
		},
		{
			id: 'public',
			type: 'public',
			name: 'Wedding Registry',
			items: [
				{
					id: '6',
					name: 'Kitchen Aid Mixer',
					price: 399,
					image:
						'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=400&h=400&fit=crop',
					href: '/product/6',
				},
				{
					id: '7',
					name: 'Dinnerware Set',
					price: 189,
					image:
						'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=400&h=400&fit=crop',
					href: '/product/7',
				},
			],
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-6 @md:py-8">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold">Wishlists</h1>
					<Button className="gap-2">
						<Gift className="size-4" />
						Create List
					</Button>
				</div>
				<Tabs defaultValue="private" className="w-full">
					<TabsList className="w-full mb-6">
						<TabsTrigger value="private" className="flex-1 gap-2">
							<Lock className="size-4" />
							Private
						</TabsTrigger>
						<TabsTrigger value="shared" className="flex-1 gap-2">
							<Users className="size-4" />
							Shared
						</TabsTrigger>
						<TabsTrigger value="public" className="flex-1 gap-2">
							<Globe className="size-4" />
							Public
						</TabsTrigger>
					</TabsList>
					{wishlists.map((wishlist) => (
						<TabsContent key={wishlist.id} value={wishlist.id}>
							<WishlistContent wishlist={wishlist} />
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
