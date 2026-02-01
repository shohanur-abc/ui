import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	ArrowDown,
	ArrowUp,
	BarChart3,
	Box,
	ChevronRight,
	DollarSign,
	Eye,
	LogOut,
	MessageSquare,
	Package,
	Settings,
	ShoppingCart,
	Star,
	Store,
	TrendingUp,
	Users,
} from 'lucide-react';
import Link from 'next/link';

const SellerSidebar = ({
	src,
	fallback,
	storeName,
	rating,
	reviews,
	badge,
	badgeColor,
}: {
	src: string;
	fallback: string;
	storeName: string;
	rating: number;
	reviews: number;
	badge: string;
	badgeColor: string;
}) => (
	<div className="space-y-4">
		<div className="text-center">
			<Avatar className="size-16 mx-auto ring-2 ring-border">
				<AvatarImage src={src} alt={storeName} />
				<AvatarFallback className="bg-primary text-primary-foreground text-xl">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<h2 className="font-bold mt-3">{storeName}</h2>
			<Badge className={`mt-1 ${badgeColor}`}>{badge}</Badge>
			<div className="flex items-center justify-center gap-1 mt-2">
				<Star className="size-4 text-amber-500 fill-amber-500" />
				<span className="font-medium">{rating}</span>
				<span className="text-sm text-muted-foreground">({reviews})</span>
			</div>
		</div>
	</div>
);

const SellerNav = ({
	items,
	activeHref,
}: {
	items: {
		icon: React.ElementType;
		label: string;
		href: string;
		badge?: string;
	}[];
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
					<Badge variant={item.href === activeHref ? 'secondary' : 'outline'}>
						{item.badge}
					</Badge>
				)}
			</Link>
		))}
	</nav>
);

const RevenueCard = ({
	amount,
	change,
	positive,
}: {
	amount: string;
	change: string;
	positive: boolean;
}) => (
	<Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10">
		<CardContent className="p-6">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">Total Revenue</p>
					<p className="text-3xl font-bold mt-1">{amount}</p>
					<div
						className={`flex items-center gap-1 mt-2 ${positive ? 'text-green-500' : 'text-red-500'}`}
					>
						{positive ? (
							<ArrowUp className="size-4" />
						) : (
							<ArrowDown className="size-4" />
						)}
						<span className="text-sm font-medium">{change} this month</span>
					</div>
				</div>
				<div className="p-4 rounded-full bg-green-500/20">
					<DollarSign className="size-8 text-green-500" />
				</div>
			</div>
		</CardContent>
	</Card>
);

const StatsRow = ({
	items,
}: {
	items: {
		icon: React.ElementType;
		value: string;
		label: string;
		change: string;
		positive: boolean;
	}[];
}) => (
	<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
		{items.map((stat, i) => (
			<Card key={i}>
				<CardContent className="p-4">
					<div className="flex items-center gap-2 mb-2">
						<stat.icon className="size-5 text-muted-foreground" />
						<span className="text-sm text-muted-foreground">{stat.label}</span>
					</div>
					<p className="text-2xl font-bold">{stat.value}</p>
					<div
						className={`flex items-center gap-1 mt-1 text-xs ${stat.positive ? 'text-green-500' : 'text-red-500'}`}
					>
						{stat.positive ? (
							<TrendingUp className="size-3" />
						) : (
							<TrendingUp className="size-3 rotate-180" />
						)}
						{stat.change}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const RecentOrdersTable = ({
	orders,
}: {
	orders: {
		id: string;
		customer: string;
		items: number;
		total: string;
		status: string;
		statusColor: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Recent Orders</h3>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/seller/orders">View All</Link>
				</Button>
			</div>
		</CardHeader>
		<CardContent>
			<div className="space-y-3">
				{orders.map((order, i) => (
					<div
						key={i}
						className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
					>
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-muted">
								<Package className="size-4" />
							</div>
							<div>
								<p className="font-medium">#{order.id}</p>
								<p className="text-sm text-muted-foreground">
									{order.customer} • {order.items} items
								</p>
							</div>
						</div>
						<div className="text-right">
							<p className="font-medium">{order.total}</p>
							<Badge className={order.statusColor}>{order.status}</Badge>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		sidebar: {
			src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
			fallback: 'TG',
			storeName: 'TechGadgets Pro',
			rating: 4.9,
			reviews: 2847,
			badge: 'Top Seller',
			badgeColor: 'bg-amber-500/20 text-amber-600',
		},
		nav: [
			{ icon: BarChart3, label: 'Dashboard', href: '/seller/dashboard' },
			{ icon: Package, label: 'Orders', href: '/seller/orders', badge: '12' },
			{ icon: Box, label: 'Products', href: '/seller/products', badge: '156' },
			{
				icon: MessageSquare,
				label: 'Messages',
				href: '/seller/messages',
				badge: '5',
			},
			{ icon: Users, label: 'Customers', href: '/seller/customers' },
			{ icon: Settings, label: 'Settings', href: '/seller/settings' },
		],
		revenue: {
			amount: '$48,295',
			change: '+12.5%',
			positive: true,
		},
		stats: [
			{
				icon: ShoppingCart,
				value: '156',
				label: 'Orders',
				change: '+8%',
				positive: true,
			},
			{
				icon: Eye,
				value: '24.5K',
				label: 'Views',
				change: '+18%',
				positive: true,
			},
			{
				icon: Users,
				value: '892',
				label: 'Customers',
				change: '+12%',
				positive: true,
			},
			{
				icon: Star,
				value: '4.9',
				label: 'Rating',
				change: '+0.1',
				positive: true,
			},
		],
		orders: [
			{
				id: '48291',
				customer: 'John D.',
				items: 3,
				total: '$156.00',
				status: 'Processing',
				statusColor: 'bg-blue-500/20 text-blue-600',
			},
			{
				id: '48290',
				customer: 'Sarah M.',
				items: 1,
				total: '$89.50',
				status: 'Shipped',
				statusColor: 'bg-green-500/20 text-green-600',
			},
			{
				id: '48289',
				customer: 'Mike R.',
				items: 2,
				total: '$234.00',
				status: 'Pending',
				statusColor: 'bg-amber-500/20 text-amber-600',
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="flex flex-col @lg:flex-row gap-8">
					<aside className="w-full @lg:w-64 shrink-0">
						<Card className="sticky top-4">
							<CardContent className="p-6 space-y-6">
								<SellerSidebar {...profileData.sidebar} />
								<Separator />
								<SellerNav
									items={profileData.nav}
									activeHref="/seller/dashboard"
								/>
								<Separator />
								<Button
									variant="ghost"
									className="w-full justify-start gap-3 text-destructive"
								>
									<LogOut className="size-5" />
									Sign Out
								</Button>
							</CardContent>
						</Card>
					</aside>
					<div className="flex-1 space-y-6">
						<h1 className="text-2xl font-bold">Seller Dashboard</h1>
						<RevenueCard {...profileData.revenue} />
						<StatsRow items={profileData.stats} />
						<RecentOrdersTable orders={profileData.orders} />
					</div>
				</div>
			</div>
		</section>
	);
}
