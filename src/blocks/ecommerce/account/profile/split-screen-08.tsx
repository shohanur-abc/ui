import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Building,
	Calendar,
	Download,
	FileText,
	Mail,
	MapPin,
	Phone,
	Plus,
	Receipt,
	Star,
	TrendingUp,
	Users,
} from 'lucide-react';
import Link from 'next/link';

const SellerHeader = ({
	logo,
	storeName,
	rating,
	reviews,
	since,
	verified,
}: {
	logo: string;
	storeName: string;
	rating: number;
	reviews: number;
	since: string;
	verified: boolean;
}) => (
	<div className="flex items-start gap-4">
		<Avatar className="size-20 rounded-xl ring-2 ring-border">
			<AvatarImage src={logo} alt={storeName} />
			<AvatarFallback className="rounded-xl bg-primary text-primary-foreground text-2xl">
				{storeName[0]}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<div className="flex items-center gap-2 mb-1">
				<h2 className="text-xl font-bold">{storeName}</h2>
				{verified && (
					<Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">
						Verified Seller
					</Badge>
				)}
			</div>
			<div className="flex items-center gap-3 text-sm text-muted-foreground">
				<div className="flex items-center gap-1">
					<Star className="size-4 fill-amber-500 text-amber-500" />
					<span className="font-medium text-foreground">{rating}</span>
					<span>({reviews} reviews)</span>
				</div>
				<span>•</span>
				<div className="flex items-center gap-1">
					<Calendar className="size-4" />
					<span>Since {since}</span>
				</div>
			</div>
		</div>
	</div>
);

const PerformanceStats = ({
	items,
}: {
	items: { label: string; value: string; change: string; positive: boolean }[];
}) => (
	<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
		{items.map((stat, i) => (
			<div key={i} className="p-4 rounded-xl bg-muted/30 text-center">
				<p className="text-2xl font-bold">{stat.value}</p>
				<p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
				<div
					className={`text-xs flex items-center justify-center gap-1 ${stat.positive ? 'text-green-500' : 'text-red-500'}`}
				>
					<TrendingUp className={`size-3 ${!stat.positive && 'rotate-180'}`} />
					{stat.change}
				</div>
			</div>
		))}
	</div>
);

const StoreInfo = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; value: string }[];
}) => (
	<div className="space-y-3">
		{items.map((item, i) => (
			<div key={i} className="flex items-center gap-3 text-sm">
				<div className="p-2 rounded-md bg-muted">
					<item.icon className="size-4 text-muted-foreground" />
				</div>
				<span className="text-muted-foreground w-24">{item.label}</span>
				<span className="font-medium flex-1">{item.value}</span>
			</div>
		))}
	</div>
);

const QuickActions = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; href: string }[];
}) => (
	<div className="grid grid-cols-2 gap-2">
		{items.map((action, i) => (
			<Button
				key={i}
				variant="outline"
				className="justify-start gap-2 h-11"
				asChild
			>
				<Link href={action.href}>
					<action.icon className="size-4" />
					{action.label}
				</Link>
			</Button>
		))}
	</div>
);

const RecentOrders = ({
	orders,
}: {
	orders: {
		id: string;
		customer: string;
		total: string;
		status: string;
		statusColor: string;
	}[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h3 className="font-medium">Recent Orders</h3>
			<Button variant="ghost" size="sm" className="text-xs" asChild>
				<Link href="/seller/orders">View All</Link>
			</Button>
		</div>
		<div className="space-y-2">
			{orders.map((order, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
				>
					<div>
						<p className="text-sm font-medium">#{order.id}</p>
						<p className="text-xs text-muted-foreground">{order.customer}</p>
					</div>
					<div className="text-right">
						<p className="text-sm font-medium">{order.total}</p>
						<Badge variant="outline" className={`text-xs ${order.statusColor}`}>
							{order.status}
						</Badge>
					</div>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const profileData = {
		seller: {
			logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
			storeName: 'TechHub Store',
			rating: 4.9,
			reviews: 1247,
			since: '2022',
			verified: true,
		},
		performance: [
			{
				label: 'Total Sales',
				value: '$124.5K',
				change: '+12.5%',
				positive: true,
			},
			{ label: 'Orders', value: '2,847', change: '+8.3%', positive: true },
			{ label: 'Products', value: '156', change: '+5', positive: true },
			{ label: 'Return Rate', value: '1.2%', change: '-0.3%', positive: true },
		],
		storeInfo: [
			{ icon: Building, label: 'Business', value: 'TechHub Inc.' },
			{ icon: MapPin, label: 'Location', value: 'Austin, TX' },
			{ icon: Mail, label: 'Email', value: 'contact@techhub.com' },
			{ icon: Phone, label: 'Phone', value: '+1 (555) 789-0123' },
		],
		actions: [
			{ icon: Plus, label: 'Add Product', href: '/seller/products/new' },
			{ icon: Receipt, label: 'View Orders', href: '/seller/orders' },
			{ icon: FileText, label: 'Invoices', href: '/seller/invoices' },
			{ icon: Download, label: 'Reports', href: '/seller/reports' },
		],
		recentOrders: [
			{
				id: '89421',
				customer: 'John Smith',
				total: '$459.00',
				status: 'Processing',
				statusColor: 'bg-amber-500/20 text-amber-600',
			},
			{
				id: '89420',
				customer: 'Sarah Lee',
				total: '$129.99',
				status: 'Shipped',
				statusColor: 'bg-blue-500/20 text-blue-600',
			},
			{
				id: '89419',
				customer: 'Mike Davis',
				total: '$89.00',
				status: 'Delivered',
				statusColor: 'bg-green-500/20 text-green-600',
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader>
						<SellerHeader {...profileData.seller} />
					</CardHeader>
					<CardContent className="space-y-6">
						<PerformanceStats items={profileData.performance} />
						<Separator />
						<div className="grid @lg:grid-cols-2 gap-6">
							<div className="space-y-6">
								<div>
									<h3 className="font-medium mb-4">Store Information</h3>
									<StoreInfo items={profileData.storeInfo} />
								</div>
								<div>
									<h3 className="font-medium mb-4">Quick Actions</h3>
									<QuickActions items={profileData.actions} />
								</div>
							</div>
							<div>
								<RecentOrders orders={profileData.recentOrders} />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
