import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Bell,
	Calendar,
	CreditCard,
	Gift,
	Heart,
	HelpCircle,
	Key,
	LogOut,
	MapPin,
	Package,
	Settings,
	Shield,
	Star,
	User,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';

const SidebarProfile = ({
	src,
	fallback,
	name,
	email,
	tier,
	tierColor,
	points,
}: {
	src: string;
	fallback: string;
	name: string;
	email: string;
	tier: string;
	tierColor: string;
	points: number;
}) => (
	<div className="text-center space-y-4">
		<Avatar className="size-20 mx-auto ring-4 ring-border shadow-lg">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground text-xl">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div>
			<h2 className="font-bold">{name}</h2>
			<p className="text-sm text-muted-foreground">{email}</p>
			<Badge className={`mt-2 ${tierColor}`}>{tier}</Badge>
		</div>
		<div className="p-3 rounded-lg bg-muted/30">
			<div className="flex items-center justify-center gap-2">
				<Wallet className="size-4 text-amber-500" />
				<span className="font-semibold">{points.toLocaleString()} pts</span>
			</div>
		</div>
	</div>
);

const SidebarNav = ({
	items,
	activeHref,
}: {
	items: { icon: React.ElementType; label: string; href: string; badge?: string }[];
	activeHref: string;
}) => (
	<nav className="space-y-1">
		{items.map((item, i) => (
			<Link
				key={i}
				href={item.href}
				className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
					item.href === activeHref
						? 'bg-primary text-primary-foreground'
						: 'hover:bg-muted'
				}`}
			>
				<item.icon className="size-5" />
				<span className="flex-1 text-sm font-medium">{item.label}</span>
				{item.badge && (
					<Badge variant={item.href === activeHref ? 'secondary' : 'outline'} className="text-xs">
						{item.badge}
					</Badge>
				)}
			</Link>
		))}
	</nav>
);

const MainContent = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<div className="flex-1 space-y-6">
		{children}
	</div>
);

const StatsGrid = ({
	items,
}: {
	items: { icon: React.ElementType; value: string; label: string; color: string }[];
}) => (
	<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
		{items.map((stat, i) => (
			<Card key={i}>
				<CardContent className="p-4 text-center">
					<stat.icon className={`size-6 mx-auto mb-2 ${stat.color}`} />
					<p className="text-2xl font-bold">{stat.value}</p>
					<p className="text-xs text-muted-foreground">{stat.label}</p>
				</CardContent>
			</Card>
		))}
	</div>
);

const RecentOrders = ({
	orders,
}: {
	orders: { id: string; date: string; total: string; status: string; statusColor: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Recent Orders</h3>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/orders">View All</Link>
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{orders.map((order, i) => (
				<Link
					key={i}
					href={`/orders/${order.id}`}
					className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
				>
					<div>
						<p className="font-medium">#{order.id}</p>
						<p className="text-sm text-muted-foreground">{order.date}</p>
					</div>
					<div className="text-right">
						<p className="font-medium">{order.total}</p>
						<Badge className={order.statusColor}>{order.status}</Badge>
					</div>
				</Link>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		sidebar: {
			src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			fallback: 'JW',
			name: 'James Wilson',
			email: 'james.w@example.com',
			tier: 'Gold Member',
			tierColor: 'bg-amber-500/20 text-amber-600',
			points: 8500,
		},
		nav: [
			{ icon: User, label: 'Overview', href: '/account' },
			{ icon: Package, label: 'Orders', href: '/orders', badge: '3' },
			{ icon: Heart, label: 'Wishlist', href: '/wishlist', badge: '12' },
			{ icon: MapPin, label: 'Addresses', href: '/addresses' },
			{ icon: CreditCard, label: 'Payment', href: '/payment' },
			{ icon: Bell, label: 'Notifications', href: '/notifications', badge: '5' },
			{ icon: Settings, label: 'Settings', href: '/settings' },
		],
		stats: [
			{ icon: Package, value: '47', label: 'Orders', color: 'text-blue-500' },
			{ icon: Heart, value: '12', label: 'Wishlist', color: 'text-pink-500' },
			{ icon: Star, value: '23', label: 'Reviews', color: 'text-amber-500' },
			{ icon: Gift, value: '5', label: 'Rewards', color: 'text-purple-500' },
		],
		orders: [
			{ id: '48291', date: 'Jan 28, 2024', total: '$156.00', status: 'Delivered', statusColor: 'bg-green-500/20 text-green-600' },
			{ id: '48287', date: 'Jan 25, 2024', total: '$89.50', status: 'In Transit', statusColor: 'bg-blue-500/20 text-blue-600' },
			{ id: '48280', date: 'Jan 20, 2024', total: '$234.00', status: 'Processing', statusColor: 'bg-amber-500/20 text-amber-600' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="flex flex-col @lg:flex-row gap-8">
					<aside className="w-full @lg:w-64 shrink-0">
						<Card className="sticky top-4">
							<CardContent className="p-6 space-y-6">
								<SidebarProfile {...profileData.sidebar} />
								<Separator />
								<SidebarNav items={profileData.nav} activeHref="/account" />
								<Separator />
								<Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
									<LogOut className="size-5" />
									Sign Out
								</Button>
							</CardContent>
						</Card>
					</aside>
					<MainContent>
						<div className="space-y-2">
							<h1 className="text-2xl font-bold">Account Overview</h1>
							<p className="text-muted-foreground">Welcome back, {profileData.sidebar.name.split(' ')[0]}!</p>
						</div>
						<StatsGrid items={profileData.stats} />
						<RecentOrders orders={profileData.orders} />
					</MainContent>
				</div>
			</div>
		</section>
	);
}
