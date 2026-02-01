import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Clock,
	Eye,
	Heart,
	Package,
	ShoppingBag,
	Star,
	TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ProfileBanner = ({
	coverUrl,
	avatarSrc,
	avatarFallback,
	name,
	tagline,
	stats,
}: {
	coverUrl: string;
	avatarSrc: string;
	avatarFallback: string;
	name: string;
	tagline: string;
	stats: { label: string; value: string }[];
}) => (
	<div className="relative">
		<div
			className="h-32 @md:h-40 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-t-xl"
			style={{
				backgroundImage: coverUrl ? `url(${coverUrl})` : undefined,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		/>
		<div className="px-6">
			<div className="flex flex-col @md:flex-row @md:items-end gap-4 -mt-12 @md:-mt-8">
				<Avatar className="size-24 ring-4 ring-background shadow-lg">
					<AvatarImage src={avatarSrc} alt={name} />
					<AvatarFallback className="bg-primary text-primary-foreground text-2xl">
						{avatarFallback}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1 @md:pb-2">
					<h2 className="text-xl font-bold">{name}</h2>
					<p className="text-sm text-muted-foreground">{tagline}</p>
				</div>
				<div className="flex gap-6 @md:pb-2">
					{stats.map((stat, i) => (
						<div key={i} className="text-center">
							<p className="text-lg font-bold">{stat.value}</p>
							<p className="text-xs text-muted-foreground">{stat.label}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	</div>
);

const RecentlyViewed = ({
	items,
}: {
	items: { image: string; name: string; price: string }[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Eye className="size-4 text-muted-foreground" />
				<h3 className="font-medium">Recently Viewed</h3>
			</div>
			<Button variant="ghost" size="sm" className="text-xs" asChild>
				<Link href="/history">View All</Link>
			</Button>
		</div>
		<div className="grid grid-cols-4 gap-2">
			{items.map((item, i) => (
				<Link key={i} href="#" className="group">
					<div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
						<Image
							src={item.image}
							alt={item.name}
							fill
							className="object-cover group-hover:scale-105 transition-transform"
						/>
					</div>
				</Link>
			))}
		</div>
	</div>
);

const WishlistPreview = ({
	items,
	total,
}: {
	items: {
		image: string;
		name: string;
		price: string;
		originalPrice?: string;
	}[];
	total: number;
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Heart className="size-4 text-pink-500" />
				<h3 className="font-medium">Wishlist</h3>
				<Badge variant="secondary">{total}</Badge>
			</div>
			<Button variant="ghost" size="sm" className="text-xs" asChild>
				<Link href="/wishlist">View All</Link>
			</Button>
		</div>
		<div className="space-y-2">
			{items.map((item, i) => (
				<div
					key={i}
					className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
				>
					<div className="size-12 relative rounded-md overflow-hidden bg-muted shrink-0">
						<Image
							src={item.image}
							alt={item.name}
							fill
							className="object-cover"
						/>
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium truncate">{item.name}</p>
						<div className="flex items-center gap-2">
							<span className="text-sm font-bold">{item.price}</span>
							{item.originalPrice && (
								<span className="text-xs text-muted-foreground line-through">
									{item.originalPrice}
								</span>
							)}
						</div>
					</div>
					<Button variant="outline" size="sm">
						<ShoppingBag className="size-4" />
					</Button>
				</div>
			))}
		</div>
	</div>
);

const RecentOrders = ({
	items,
}: {
	items: {
		id: string;
		date: string;
		status: string;
		statusColor: string;
		total: string;
	}[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Package className="size-4 text-muted-foreground" />
				<h3 className="font-medium">Recent Orders</h3>
			</div>
			<Button variant="ghost" size="sm" className="text-xs" asChild>
				<Link href="/orders">View All</Link>
			</Button>
		</div>
		<div className="space-y-2">
			{items.map((order, i) => (
				<Link
					key={i}
					href={`/orders/${order.id}`}
					className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
				>
					<div>
						<p className="text-sm font-medium">Order #{order.id}</p>
						<p className="text-xs text-muted-foreground">{order.date}</p>
					</div>
					<div className="text-right">
						<Badge variant="outline" className={order.statusColor}>
							{order.status}
						</Badge>
						<p className="text-sm font-medium mt-1">{order.total}</p>
					</div>
				</Link>
			))}
		</div>
	</div>
);

export default function Main() {
	const profileData = {
		banner: {
			coverUrl: '',
			avatarSrc:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			avatarFallback: 'TM',
			name: 'Thomas Miller',
			tagline: 'Fashion Enthusiast | VIP Member',
			stats: [
				{ label: 'Orders', value: '89' },
				{ label: 'Reviews', value: '34' },
				{ label: 'Points', value: '15.2k' },
			],
		},
		recentlyViewed: [
			{
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
				name: 'Sneakers',
				price: '$129',
			},
			{
				image:
					'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
				name: 'Watch',
				price: '$299',
			},
			{
				image:
					'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200',
				name: 'Perfume',
				price: '$85',
			},
			{
				image: 'https://images.unsplash.com/photo-1491553895911-0055uj?w=200',
				name: 'Headphones',
				price: '$199',
			},
		],
		wishlist: {
			items: [
				{
					image:
						'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200',
					name: 'Running Shoes',
					price: '$145',
					originalPrice: '$180',
				},
				{
					image:
						'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200',
					name: 'Polaroid Camera',
					price: '$99',
				},
			],
			total: 12,
		},
		recentOrders: [
			{
				id: '48291',
				date: 'Jan 28, 2026',
				status: 'Delivered',
				statusColor: 'bg-green-500/20 text-green-600 border-green-500/30',
				total: '$247.00',
			},
			{
				id: '47832',
				date: 'Jan 15, 2026',
				status: 'Shipped',
				statusColor: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
				total: '$89.99',
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card className="overflow-hidden">
					<CardContent className="p-0">
						<ProfileBanner {...profileData.banner} />
						<div className="p-6 grid @lg:grid-cols-2 gap-6">
							<div className="space-y-6">
								<RecentlyViewed items={profileData.recentlyViewed} />
								<Separator />
								<WishlistPreview {...profileData.wishlist} />
							</div>
							<div>
								<RecentOrders items={profileData.recentOrders} />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
