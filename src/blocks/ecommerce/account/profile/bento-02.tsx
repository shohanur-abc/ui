import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Bell,
	ChevronRight,
	Clock,
	Crown,
	Gift,
	Heart,
	Package,
	Sparkles,
	Star,
	Truck,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const WelcomeCard = ({
	src,
	fallback,
	name,
	tier,
	tierColor,
	notifications,
}: {
	src: string;
	fallback: string;
	name: string;
	tier: string;
	tierColor: string;
	notifications: number;
}) => (
	<Card className="col-span-full @lg:col-span-2 bg-gradient-to-br from-primary/10 via-background to-accent/10">
		<CardContent className="p-6 flex items-center justify-between">
			<div className="flex items-center gap-4">
				<Avatar className="size-16 ring-2 ring-border">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="bg-primary text-primary-foreground text-xl">
						{fallback}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="text-sm text-muted-foreground">Welcome back,</p>
					<h2 className="text-xl font-bold">{name}</h2>
					<Badge className={`mt-1 gap-1 ${tierColor}`}>
						<Crown className="size-3" />
						{tier}
					</Badge>
				</div>
			</div>
			<Button variant="outline" size="icon" className="relative">
				<Bell className="size-5" />
				{notifications > 0 && (
					<span className="absolute -top-1 -right-1 size-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
						{notifications}
					</span>
				)}
			</Button>
		</CardContent>
	</Card>
);

const OrdersCard = ({
	active,
	delivered,
	returns,
}: {
	active: number;
	delivered: number;
	returns: number;
}) => (
	<Card className="row-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Package className="size-5 text-primary" />
				<h3 className="font-medium">Orders</h3>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<Link
				href="/orders?status=active"
				className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
			>
				<div className="flex items-center gap-2">
					<Truck className="size-4 text-blue-500" />
					<span className="text-sm">Active</span>
				</div>
				<Badge variant="secondary">{active}</Badge>
			</Link>
			<Link
				href="/orders?status=delivered"
				className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors"
			>
				<div className="flex items-center gap-2">
					<Package className="size-4 text-green-500" />
					<span className="text-sm">Delivered</span>
				</div>
				<Badge variant="secondary">{delivered}</Badge>
			</Link>
			<Link
				href="/returns"
				className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
			>
				<div className="flex items-center gap-2">
					<Clock className="size-4 text-amber-500" />
					<span className="text-sm">Returns</span>
				</div>
				<Badge variant="secondary">{returns}</Badge>
			</Link>
		</CardContent>
	</Card>
);

const PointsCard = ({
	points,
	value,
	expiring,
}: {
	points: number;
	value: string;
	expiring: number;
}) => (
	<Card className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
		<CardContent className="p-6 space-y-3">
			<div className="flex items-center gap-2">
				<Wallet className="size-5" />
				<span className="font-medium">Points Balance</span>
			</div>
			<div>
				<p className="text-3xl font-bold">{points.toLocaleString()}</p>
				<p className="text-sm opacity-80">Worth {value}</p>
			</div>
			{expiring > 0 && (
				<p className="text-xs opacity-70">{expiring} pts expiring soon</p>
			)}
		</CardContent>
	</Card>
);

const WishlistCard = ({
	items,
	onSale,
}: {
	items: { image: string; name: string; price: string }[];
	onSale: number;
}) => (
	<Card>
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Heart className="size-5 text-pink-500" />
					<h3 className="font-medium">Wishlist</h3>
				</div>
				{onSale > 0 && (
					<Badge className="bg-pink-500/20 text-pink-600 border-pink-500/30">
						{onSale} on sale!
					</Badge>
				)}
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex -space-x-2">
				{items.slice(0, 4).map((item, i) => (
					<div
						key={i}
						className="size-12 rounded-lg overflow-hidden ring-2 ring-background relative"
					>
						<Image
							src={item.image}
							alt={item.name}
							fill
							className="object-cover"
						/>
					</div>
				))}
				{items.length > 4 && (
					<div className="size-12 rounded-lg bg-muted flex items-center justify-center ring-2 ring-background text-sm font-medium">
						+{items.length - 4}
					</div>
				)}
			</div>
			<Button variant="ghost" size="sm" className="mt-3 w-full gap-1" asChild>
				<Link href="/wishlist">
					View All <ChevronRight className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

const RewardsCard = ({
	available,
	items,
}: {
	available: number;
	items: { icon: React.ElementType; label: string; value: string }[];
}) => (
	<Card className="col-span-full @lg:col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Gift className="size-5 text-purple-500" />
					<h3 className="font-medium">Rewards</h3>
				</div>
				<Badge>{available} Available</Badge>
			</div>
		</CardHeader>
		<CardContent>
			<div className="grid @sm:grid-cols-3 gap-3">
				{items.map((reward, i) => (
					<div
						key={i}
						className="p-3 rounded-lg bg-muted/30 text-center hover:bg-muted/50 transition-colors"
					>
						<reward.icon className="size-6 mx-auto mb-2 text-purple-500" />
						<p className="text-sm font-medium">{reward.value}</p>
						<p className="text-xs text-muted-foreground">{reward.label}</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		welcome: {
			src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
			fallback: 'JM',
			name: 'Jessica Martinez',
			tier: 'Gold Member',
			tierColor: 'bg-amber-500/20 text-amber-600',
			notifications: 3,
		},
		orders: {
			active: 2,
			delivered: 45,
			returns: 1,
		},
		points: {
			points: 8750,
			value: '$87.50',
			expiring: 500,
		},
		wishlist: {
			items: [
				{
					image:
						'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100',
					name: 'Sneakers',
					price: '$129',
				},
				{
					image:
						'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100',
					name: 'Watch',
					price: '$299',
				},
				{
					image:
						'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100',
					name: 'Perfume',
					price: '$85',
				},
				{
					image: 'https://images.unsplash.com/photo-1491553895911-0055uj?w=100',
					name: 'Headphones',
					price: '$199',
				},
				{
					image:
						'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=100',
					name: 'Shoes',
					price: '$145',
				},
			],
			onSale: 2,
		},
		rewards: {
			available: 3,
			items: [
				{ icon: Sparkles, label: 'Free Shipping', value: '$0' },
				{ icon: Gift, label: 'Birthday Gift', value: '$25' },
				{ icon: Star, label: 'Member Discount', value: '15%' },
			],
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @lg:grid-cols-3 gap-4">
					<WelcomeCard {...profileData.welcome} />
					<OrdersCard {...profileData.orders} />
					<PointsCard {...profileData.points} />
					<WishlistCard {...profileData.wishlist} />
					<RewardsCard {...profileData.rewards} />
				</div>
			</div>
		</section>
	);
}
