import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ArrowDown,
	ArrowUp,
	BarChart3,
	Box,
	Calendar,
	ChevronRight,
	DollarSign,
	Eye,
	MessageSquare,
	Package,
	ShoppingCart,
	Star,
	Store,
	TrendingUp,
	Users,
} from 'lucide-react';
import Link from 'next/link';

const SellerProfileCard = ({
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
	<Card className="col-span-full @lg:col-span-2 bg-gradient-to-br from-primary/10 via-background to-accent/10">
		<CardContent className="p-6">
			<div className="flex flex-col @sm:flex-row @sm:items-center gap-4">
				<div className="relative">
					<Avatar className="size-20 ring-4 ring-border">
						<AvatarImage src={src} alt={storeName} />
						<AvatarFallback className="bg-primary text-primary-foreground text-2xl">
							{fallback}
						</AvatarFallback>
					</Avatar>
					<div className="absolute -bottom-1 -right-1 p-1 bg-background rounded-full">
						<Store className="size-4 text-primary" />
					</div>
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-2 flex-wrap">
						<h2 className="text-xl font-bold">{storeName}</h2>
						<Badge className={badgeColor}>{badge}</Badge>
					</div>
					<div className="flex items-center gap-2 mt-1">
						<Star className="size-4 text-amber-500 fill-amber-500" />
						<span className="font-medium">{rating}</span>
						<span className="text-sm text-muted-foreground">({reviews.toLocaleString()} reviews)</span>
					</div>
				</div>
				<Button asChild>
					<Link href="/seller/dashboard">Dashboard</Link>
				</Button>
			</div>
		</CardContent>
	</Card>
);

const RevenueCard = ({
	amount,
	change,
	positive,
	period,
}: {
	amount: string;
	change: string;
	positive: boolean;
	period: string;
}) => (
	<Card className="row-span-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
		<CardContent className="p-4 h-full flex flex-col">
			<div className="flex items-center gap-2 mb-4">
				<DollarSign className="size-5 text-green-500" />
				<h3 className="font-medium">Revenue</h3>
			</div>
			<div className="flex-1 flex flex-col justify-center">
				<p className="text-3xl font-bold">{amount}</p>
				<div className={`flex items-center gap-1 mt-2 ${positive ? 'text-green-500' : 'text-red-500'}`}>
					{positive ? <ArrowUp className="size-4" /> : <ArrowDown className="size-4" />}
					<span className="text-sm font-medium">{change}</span>
				</div>
				<p className="text-xs text-muted-foreground mt-1">{period}</p>
			</div>
			<Button variant="ghost" size="sm" className="w-full mt-4" asChild>
				<Link href="/seller/analytics">View Analytics</Link>
			</Button>
		</CardContent>
	</Card>
);

const OrdersCard = ({
	pending,
	processing,
	shipped,
}: {
	pending: number;
	processing: number;
	shipped: number;
}) => (
	<Card>
		<CardContent className="p-4 space-y-3">
			<div className="flex items-center gap-2">
				<Package className="size-5 text-blue-500" />
				<h3 className="font-medium">Orders</h3>
			</div>
			<div className="grid grid-cols-3 gap-2 text-center">
				<div className="p-2 rounded-lg bg-amber-500/10">
					<p className="text-lg font-bold text-amber-500">{pending}</p>
					<p className="text-xs text-muted-foreground">Pending</p>
				</div>
				<div className="p-2 rounded-lg bg-blue-500/10">
					<p className="text-lg font-bold text-blue-500">{processing}</p>
					<p className="text-xs text-muted-foreground">Processing</p>
				</div>
				<div className="p-2 rounded-lg bg-green-500/10">
					<p className="text-lg font-bold text-green-500">{shipped}</p>
					<p className="text-xs text-muted-foreground">Shipped</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ProductsCard = ({
	active,
	lowStock,
	outOfStock,
}: {
	active: number;
	lowStock: number;
	outOfStock: number;
}) => (
	<Card>
		<CardContent className="p-4 space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Box className="size-5 text-purple-500" />
					<h3 className="font-medium">Products</h3>
				</div>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/seller/products">Manage</Link>
				</Button>
			</div>
			<div className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span>Active Listings</span>
					<Badge variant="secondary">{active}</Badge>
				</div>
				{lowStock > 0 && (
					<div className="flex items-center justify-between text-sm text-amber-500">
						<span>Low Stock</span>
						<Badge className="bg-amber-500/20 text-amber-600">{lowStock}</Badge>
					</div>
				)}
				{outOfStock > 0 && (
					<div className="flex items-center justify-between text-sm text-red-500">
						<span>Out of Stock</span>
						<Badge className="bg-red-500/20 text-red-600">{outOfStock}</Badge>
					</div>
				)}
			</div>
		</CardContent>
	</Card>
);

const MetricsCard = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; value: string; change: string; positive: boolean }[];
}) => (
	<Card className="col-span-full @lg:col-span-2">
		<CardContent className="p-4">
			<div className="flex items-center gap-2 mb-4">
				<BarChart3 className="size-5 text-muted-foreground" />
				<h3 className="font-medium">Performance</h3>
				<Badge variant="outline" className="ml-auto">This Month</Badge>
			</div>
			<div className="grid grid-cols-2 @sm:grid-cols-4 gap-4">
				{items.map((metric, i) => (
					<div key={i} className="text-center p-3 rounded-lg bg-muted/30">
						<metric.icon className="size-5 mx-auto mb-2 text-muted-foreground" />
						<p className="text-xl font-bold">{metric.value}</p>
						<p className="text-xs text-muted-foreground">{metric.label}</p>
						<div className={`flex items-center justify-center gap-1 text-xs mt-1 ${metric.positive ? 'text-green-500' : 'text-red-500'}`}>
							{metric.positive ? <TrendingUp className="size-3" /> : <TrendingUp className="size-3 rotate-180" />}
							{metric.change}
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const MessagesCard = ({
	unread,
	total,
}: {
	unread: number;
	total: number;
}) => (
	<Link href="/seller/messages">
		<Card className="h-full hover:bg-muted/50 transition-colors">
			<CardContent className="p-4 h-full flex items-center gap-4">
				<div className="relative p-3 rounded-xl bg-primary/10">
					<MessageSquare className="size-6 text-primary" />
					{unread > 0 && (
						<span className="absolute -top-1 -right-1 size-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
							{unread}
						</span>
					)}
				</div>
				<div className="flex-1">
					<p className="font-medium">Messages</p>
					<p className="text-xs text-muted-foreground">{unread} new from customers</p>
				</div>
				<ChevronRight className="size-5 text-muted-foreground" />
			</CardContent>
		</Card>
	</Link>
);

export default function Main() {
	const profileData = {
		seller: {
			src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
			fallback: 'TG',
			storeName: 'TechGadgets Pro',
			rating: 4.9,
			reviews: 2847,
			badge: 'Top Seller',
			badgeColor: 'bg-amber-500/20 text-amber-600',
		},
		revenue: {
			amount: '$48,295',
			change: '+12.5%',
			positive: true,
			period: 'This month',
		},
		orders: {
			pending: 8,
			processing: 15,
			shipped: 42,
		},
		products: {
			active: 156,
			lowStock: 12,
			outOfStock: 3,
		},
		metrics: [
			{ icon: Eye, label: 'Views', value: '24.5K', change: '+18%', positive: true },
			{ icon: ShoppingCart, label: 'Conversion', value: '3.8%', change: '+0.5%', positive: true },
			{ icon: Users, label: 'Customers', value: '892', change: '+24', positive: true },
			{ icon: Star, label: 'Avg Rating', value: '4.9', change: '+0.1', positive: true },
		],
		messages: {
			unread: 7,
			total: 156,
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
					<SellerProfileCard {...profileData.seller} />
					<RevenueCard {...profileData.revenue} />
					<OrdersCard {...profileData.orders} />
					<ProductsCard {...profileData.products} />
					<MetricsCard items={profileData.metrics} />
					<MessagesCard {...profileData.messages} />
				</div>
			</div>
		</section>
	);
}
