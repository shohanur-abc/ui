import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ArrowRight,
	Calendar,
	ChevronRight,
	Clock,
	DollarSign,
	Gift,
	Heart,
	Package,
	Receipt,
	RefreshCcw,
	ShoppingBag,
	Star,
	Tag,
	Truck,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const MemberBanner = ({
	src,
	fallback,
	name,
	tier,
	tierBg,
	points,
	nextTier,
	toNextTier,
}: {
	src: string;
	fallback: string;
	name: string;
	tier: string;
	tierBg: string;
	points: number;
	nextTier: string;
	toNextTier: number;
}) => (
	<Card className={`col-span-full ${tierBg} border-0`}>
		<CardContent className="p-6">
			<div className="flex flex-col @sm:flex-row @sm:items-center gap-4">
				<Avatar className="size-16 ring-4 ring-white/20">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="bg-white/20 text-white">{fallback}</AvatarFallback>
				</Avatar>
				<div className="flex-1 text-white">
					<p className="opacity-80 text-sm">Welcome back,</p>
					<h2 className="text-xl font-bold">{name}</h2>
					<div className="flex items-center gap-2 mt-1">
						<Badge className="bg-white/20 text-white border-white/30">{tier}</Badge>
						<span className="text-sm opacity-80">{points.toLocaleString()} pts</span>
					</div>
				</div>
				<div className="text-white/80 text-sm">
					<p>{toNextTier.toLocaleString()} pts to {nextTier}</p>
					<Progress value={75} className="h-2 mt-1 bg-white/20 [&>div]:bg-white" />
				</div>
			</div>
		</CardContent>
	</Card>
);

const ActiveOrdersCard = ({
	orders,
}: {
	orders: { id: string; status: string; statusIcon: React.ElementType; statusColor: string }[];
}) => (
	<Card className="row-span-2">
		<CardContent className="p-4 space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Truck className="size-5 text-primary" />
					<h3 className="font-medium">Active Orders</h3>
				</div>
				<Badge>{orders.length}</Badge>
			</div>
			<div className="space-y-3">
				{orders.map((order, i) => (
					<Link
						key={i}
						href={`/orders/${order.id}`}
						className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
					>
						<order.statusIcon className={`size-5 ${order.statusColor}`} />
						<div className="flex-1">
							<p className="text-sm font-medium">#{order.id}</p>
							<p className="text-xs text-muted-foreground">{order.status}</p>
						</div>
						<ChevronRight className="size-4 text-muted-foreground" />
					</Link>
				))}
			</div>
			<Button variant="ghost" size="sm" className="w-full" asChild>
				<Link href="/orders">View All Orders</Link>
			</Button>
		</CardContent>
	</Card>
);

const WalletCard = ({
	balance,
	credit,
}: {
	balance: string;
	credit: string;
}) => (
	<Card className="bg-gradient-to-br from-primary/10 to-accent/10">
		<CardContent className="p-4 space-y-4">
			<div className="flex items-center gap-2">
				<Wallet className="size-5 text-primary" />
				<h3 className="font-medium">Wallet</h3>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<p className="text-xs text-muted-foreground">Balance</p>
					<p className="text-xl font-bold">{balance}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Store Credit</p>
					<p className="text-xl font-bold text-green-500">{credit}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const CouponsCard = ({
	count,
	expiringSoon,
}: {
	count: number;
	expiringSoon: number;
}) => (
	<Card className="hover:bg-muted/50 transition-colors cursor-pointer">
		<CardContent className="p-4 flex items-center gap-4">
			<div className="p-3 rounded-xl bg-orange-500/20">
				<Tag className="size-6 text-orange-500" />
			</div>
			<div className="flex-1">
				<p className="font-medium">{count} Coupons</p>
				<p className="text-xs text-muted-foreground">{expiringSoon} expiring soon</p>
			</div>
			<ChevronRight className="size-5 text-muted-foreground" />
		</CardContent>
	</Card>
);

const QuickActions = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; href: string; color: string }[];
}) => (
	<Card className="col-span-full">
		<CardContent className="p-4">
			<div className="grid grid-cols-4 @sm:grid-cols-8 gap-2">
				{items.map((action, i) => (
					<Link
						key={i}
						href={action.href}
						className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
					>
						<div className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
							<action.icon className="size-5" />
						</div>
						<span className="text-xs text-center">{action.label}</span>
					</Link>
				))}
			</div>
		</CardContent>
	</Card>
);

const RecentPurchases = ({
	items,
}: {
	items: { image: string; name: string; date: string }[];
}) => (
	<Card className="col-span-full @lg:col-span-2">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<ShoppingBag className="size-5 text-muted-foreground" />
					<h3 className="font-medium">Recent Purchases</h3>
				</div>
				<Button variant="ghost" size="sm" className="text-xs" asChild>
					<Link href="/orders">View All</Link>
				</Button>
			</div>
			<div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
				{items.map((item, i) => (
					<div key={i} className="shrink-0 w-24">
						<div className="aspect-square relative rounded-lg overflow-hidden bg-muted mb-2">
							<Image src={item.image} alt={item.name} fill className="object-cover" />
						</div>
						<p className="text-xs font-medium truncate">{item.name}</p>
						<p className="text-xs text-muted-foreground">{item.date}</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		member: {
			src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
			fallback: 'BT',
			name: 'Brandon Taylor',
			tier: 'Platinum',
			tierBg: 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700',
			points: 24500,
			nextTier: 'Diamond',
			toNextTier: 5500,
		},
		activeOrders: [
			{ id: '48291', status: 'In Transit', statusIcon: Truck, statusColor: 'text-blue-500' },
			{ id: '48287', status: 'Processing', statusIcon: Clock, statusColor: 'text-amber-500' },
		],
		wallet: {
			balance: '$156.50',
			credit: '$25.00',
		},
		coupons: {
			count: 8,
			expiringSoon: 2,
		},
		quickActions: [
			{ icon: Package, label: 'Orders', href: '/orders', color: 'bg-blue-500/20 text-blue-500' },
			{ icon: Heart, label: 'Wishlist', href: '/wishlist', color: 'bg-pink-500/20 text-pink-500' },
			{ icon: Star, label: 'Reviews', href: '/reviews', color: 'bg-amber-500/20 text-amber-500' },
			{ icon: Gift, label: 'Rewards', href: '/rewards', color: 'bg-purple-500/20 text-purple-500' },
			{ icon: Receipt, label: 'Invoices', href: '/invoices', color: 'bg-green-500/20 text-green-500' },
			{ icon: RefreshCcw, label: 'Returns', href: '/returns', color: 'bg-red-500/20 text-red-500' },
			{ icon: Calendar, label: 'Subscriptions', href: '/subscriptions', color: 'bg-cyan-500/20 text-cyan-500' },
			{ icon: DollarSign, label: 'Referrals', href: '/referrals', color: 'bg-emerald-500/20 text-emerald-500' },
		],
		recentPurchases: [
			{ image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200', name: 'Running Shoes', date: 'Jan 28' },
			{ image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200', name: 'Smart Watch', date: 'Jan 25' },
			{ image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200', name: 'Fragrance', date: 'Jan 20' },
			{ image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200', name: 'Sneakers', date: 'Jan 15' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-2 @lg:grid-cols-3 gap-4">
					<MemberBanner {...profileData.member} />
					<ActiveOrdersCard orders={profileData.activeOrders} />
					<WalletCard {...profileData.wallet} />
					<CouponsCard {...profileData.coupons} />
					<QuickActions items={profileData.quickActions} />
					<RecentPurchases items={profileData.recentPurchases} />
				</div>
			</div>
		</section>
	);
}
