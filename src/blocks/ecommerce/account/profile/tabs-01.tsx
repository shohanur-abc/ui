import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Bell,
	CreditCard,
	Edit,
	Heart,
	MapPin,
	Package,
	Settings,
	Shield,
	Star,
	User,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';

const ProfileHeader = ({
	src,
	fallback,
	name,
	email,
	memberSince,
	points,
}: {
	src: string;
	fallback: string;
	name: string;
	email: string;
	memberSince: string;
	points: number;
}) => (
	<div className="flex flex-col @sm:flex-row items-center gap-6 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
		<Avatar className="size-24 ring-4 ring-background shadow-lg">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground text-2xl">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 text-center @sm:text-left">
			<h1 className="text-2xl font-bold">{name}</h1>
			<p className="text-muted-foreground">{email}</p>
			<p className="text-sm text-muted-foreground mt-1">Member since {memberSince}</p>
			<div className="flex items-center gap-2 mt-3 justify-center @sm:justify-start">
				<Badge className="bg-amber-500/20 text-amber-600">
					<Wallet className="size-3 mr-1" />
					{points.toLocaleString()} points
				</Badge>
			</div>
		</div>
		<Button variant="outline" size="sm" className="gap-2">
			<Edit className="size-4" />
			Edit Profile
		</Button>
	</div>
);

const OverviewTab = ({
	stats,
	recentOrders,
}: {
	stats: { label: string; value: string }[];
	recentOrders: { id: string; date: string; status: string; total: string }[];
}) => (
	<div className="space-y-6">
		<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
			{stats.map((stat, i) => (
				<Card key={i}>
					<CardContent className="p-4 text-center">
						<p className="text-2xl font-bold">{stat.value}</p>
						<p className="text-sm text-muted-foreground">{stat.label}</p>
					</CardContent>
				</Card>
			))}
		</div>
		<Card>
			<CardHeader className="pb-3">
				<h3 className="font-semibold">Recent Orders</h3>
			</CardHeader>
			<CardContent className="space-y-3">
				{recentOrders.map((order, i) => (
					<Link key={i} href={`/orders/${order.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
						<div>
							<p className="font-medium">Order #{order.id}</p>
							<p className="text-sm text-muted-foreground">{order.date}</p>
						</div>
						<div className="text-right">
							<p className="font-medium">{order.total}</p>
							<Badge variant="secondary">{order.status}</Badge>
						</div>
					</Link>
				))}
			</CardContent>
		</Card>
	</div>
);

const OrdersTab = ({
	orders,
}: {
	orders: { id: string; date: string; items: number; status: string; statusColor: string; total: string }[];
}) => (
	<Card>
		<CardContent className="p-6 space-y-4">
			{orders.map((order, i) => (
				<div key={i} className="flex items-center justify-between p-4 rounded-lg border">
					<div className="flex items-center gap-4">
						<div className="p-3 rounded-lg bg-muted">
							<Package className="size-5" />
						</div>
						<div>
							<p className="font-medium">Order #{order.id}</p>
							<p className="text-sm text-muted-foreground">{order.date} • {order.items} items</p>
						</div>
					</div>
					<div className="text-right">
						<p className="font-medium">{order.total}</p>
						<Badge className={order.statusColor}>{order.status}</Badge>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const WishlistTab = ({
	items,
}: {
	items: { name: string; price: string; image: string; inStock: boolean }[];
}) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
		{items.map((item, i) => (
			<Card key={i}>
				<CardContent className="p-4">
					<div className="aspect-square rounded-lg bg-muted mb-3 relative overflow-hidden">
						<img src={item.image} alt={item.name} className="object-cover w-full h-full" />
						<Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/80">
							<Heart className="size-4 fill-red-500 text-red-500" />
						</Button>
					</div>
					<h4 className="font-medium truncate">{item.name}</h4>
					<p className="text-lg font-bold mt-1">{item.price}</p>
					<Button className="w-full mt-3" disabled={!item.inStock}>
						{item.inStock ? 'Add to Cart' : 'Out of Stock'}
					</Button>
				</CardContent>
			</Card>
		))}
	</div>
);

const SettingsTab = ({
	sections,
}: {
	sections: { icon: React.ElementType; title: string; description: string }[];
}) => (
	<div className="grid @md:grid-cols-2 gap-4">
		{sections.map((section, i) => (
			<Card key={i} className="cursor-pointer hover:border-primary transition-colors">
				<CardContent className="p-6 flex items-center gap-4">
					<div className="p-3 rounded-lg bg-primary/10">
						<section.icon className="size-6 text-primary" />
					</div>
					<div>
						<h4 className="font-semibold">{section.title}</h4>
						<p className="text-sm text-muted-foreground">{section.description}</p>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
			fallback: 'JD',
			name: 'John Doe',
			email: 'john.doe@example.com',
			memberSince: 'January 2022',
			points: 12500,
		},
		stats: [
			{ label: 'Orders', value: '47' },
			{ label: 'Wishlist', value: '12' },
			{ label: 'Reviews', value: '23' },
			{ label: 'Points', value: '12.5K' },
		],
		recentOrders: [
			{ id: '48291', date: 'Jan 28, 2024', status: 'Delivered', total: '$156.00' },
			{ id: '48287', date: 'Jan 25, 2024', status: 'In Transit', total: '$89.50' },
		],
		allOrders: [
			{ id: '48291', date: 'Jan 28, 2024', items: 3, status: 'Delivered', statusColor: 'bg-green-500/20 text-green-600', total: '$156.00' },
			{ id: '48287', date: 'Jan 25, 2024', items: 2, status: 'In Transit', statusColor: 'bg-blue-500/20 text-blue-600', total: '$89.50' },
			{ id: '48280', date: 'Jan 20, 2024', items: 1, status: 'Delivered', statusColor: 'bg-green-500/20 text-green-600', total: '$234.00' },
		],
		wishlist: [
			{ name: 'Wireless Earbuds Pro', price: '$149.99', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300', inStock: true },
			{ name: 'Smart Watch Series 8', price: '$399.99', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300', inStock: true },
			{ name: 'Leather Backpack', price: '$89.99', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', inStock: false },
		],
		settings: [
			{ icon: User, title: 'Personal Information', description: 'Update your profile details' },
			{ icon: MapPin, title: 'Addresses', description: 'Manage delivery addresses' },
			{ icon: CreditCard, title: 'Payment Methods', description: 'Add or remove cards' },
			{ icon: Bell, title: 'Notifications', description: 'Control your alerts' },
			{ icon: Shield, title: 'Security', description: 'Password and 2FA settings' },
			{ icon: Settings, title: 'Preferences', description: 'Language and theme' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<ProfileHeader {...profileData.header} />
				<Tabs defaultValue="overview" className="mt-8">
					<TabsList className="w-full justify-start overflow-x-auto">
						<TabsTrigger value="overview" className="gap-2">
							<User className="size-4" />
							Overview
						</TabsTrigger>
						<TabsTrigger value="orders" className="gap-2">
							<Package className="size-4" />
							Orders
						</TabsTrigger>
						<TabsTrigger value="wishlist" className="gap-2">
							<Heart className="size-4" />
							Wishlist
						</TabsTrigger>
						<TabsTrigger value="settings" className="gap-2">
							<Settings className="size-4" />
							Settings
						</TabsTrigger>
					</TabsList>
					<TabsContent value="overview" className="mt-6">
						<OverviewTab stats={profileData.stats} recentOrders={profileData.recentOrders} />
					</TabsContent>
					<TabsContent value="orders" className="mt-6">
						<OrdersTab orders={profileData.allOrders} />
					</TabsContent>
					<TabsContent value="wishlist" className="mt-6">
						<WishlistTab items={profileData.wishlist} />
					</TabsContent>
					<TabsContent value="settings" className="mt-6">
						<SettingsTab sections={profileData.settings} />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
