import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
	ArrowDown,
	ArrowUp,
	BarChart3,
	Box,
	DollarSign,
	Eye,
	MessageSquare,
	MoreHorizontal,
	Package,
	Plus,
	Settings,
	ShoppingCart,
	Star,
	TrendingUp,
	Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const SellerHeader = ({
	src,
	fallback,
	storeName,
	rating,
	reviews,
	badge,
}: {
	src: string;
	fallback: string;
	storeName: string;
	rating: number;
	reviews: number;
	badge: string;
}) => (
	<div className="flex flex-col @md:flex-row items-center justify-between gap-6 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl">
		<div className="flex items-center gap-4">
			<Avatar className="size-16 ring-2 ring-border">
				<AvatarImage src={src} alt={storeName} />
				<AvatarFallback className="text-xl">{fallback}</AvatarFallback>
			</Avatar>
			<div>
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold">{storeName}</h1>
					<Badge className="bg-amber-500/20 text-amber-600">{badge}</Badge>
				</div>
				<div className="flex items-center gap-2 mt-1">
					<Star className="size-4 text-amber-500 fill-amber-500" />
					<span className="font-medium">{rating}</span>
					<span className="text-muted-foreground">({reviews.toLocaleString()} reviews)</span>
				</div>
			</div>
		</div>
		<div className="flex gap-2">
			<Button variant="outline">View Store</Button>
			<Button className="gap-2">
				<Plus className="size-4" />
				Add Product
			</Button>
		</div>
	</div>
);

const DashboardTab = ({
	stats,
	recentOrders,
}: {
	stats: { icon: React.ElementType; label: string; value: string; change: string; positive: boolean }[];
	recentOrders: { id: string; customer: string; items: number; total: string; status: string }[];
}) => (
	<div className="space-y-6">
		<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
			{stats.map((stat, i) => (
				<Card key={i}>
					<CardContent className="p-4">
						<div className="flex items-center justify-between mb-2">
							<stat.icon className="size-5 text-muted-foreground" />
							<Badge variant={stat.positive ? 'default' : 'destructive'} className="text-xs">
								{stat.positive ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
								{stat.change}
							</Badge>
						</div>
						<p className="text-2xl font-bold">{stat.value}</p>
						<p className="text-sm text-muted-foreground">{stat.label}</p>
					</CardContent>
				</Card>
			))}
		</div>
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
				{recentOrders.map((order, i) => (
					<div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
						<div>
							<p className="font-medium">Order #{order.id}</p>
							<p className="text-sm text-muted-foreground">{order.customer} • {order.items} items</p>
						</div>
						<div className="text-right">
							<p className="font-medium">{order.total}</p>
							<Badge variant="secondary">{order.status}</Badge>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	</div>
);

const ProductsTab = ({
	products,
}: {
	products: { image: string; name: string; price: string; stock: number; sales: number; status: 'active' | 'draft' | 'low' }[];
}) => (
	<div className="space-y-4">
		<div className="flex justify-end">
			<Button className="gap-2">
				<Plus className="size-4" />
				Add Product
			</Button>
		</div>
		<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
			{products.map((product, i) => (
				<Card key={i}>
					<CardContent className="p-4">
						<div className="relative aspect-square rounded-lg bg-muted overflow-hidden mb-3">
							<Image src={product.image} alt={product.name} fill className="object-cover" />
							<Badge
								className={`absolute top-2 right-2 ${
									product.status === 'active' ? 'bg-green-500/90' :
									product.status === 'low' ? 'bg-amber-500/90' : 'bg-gray-500/90'
								}`}
							>
								{product.status === 'active' ? 'Active' : product.status === 'low' ? 'Low Stock' : 'Draft'}
							</Badge>
						</div>
						<h4 className="font-medium truncate">{product.name}</h4>
						<p className="text-lg font-bold mt-1">{product.price}</p>
						<div className="flex justify-between mt-2 text-sm text-muted-foreground">
							<span>{product.stock} in stock</span>
							<span>{product.sales} sold</span>
						</div>
						<div className="flex gap-2 mt-3">
							<Button variant="outline" size="sm" className="flex-1">Edit</Button>
							<Button variant="ghost" size="icon" className="shrink-0">
								<MoreHorizontal className="size-4" />
							</Button>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	</div>
);

const OrdersTab = ({
	orders,
}: {
	orders: { id: string; date: string; customer: string; items: number; total: string; status: string; statusColor: string }[];
}) => (
	<Card>
		<CardContent className="p-6 space-y-3">
			{orders.map((order, i) => (
				<div key={i} className="flex items-center justify-between p-4 rounded-lg border">
					<div className="flex items-center gap-4">
						<div className="p-3 rounded-lg bg-muted">
							<Package className="size-5" />
						</div>
						<div>
							<p className="font-medium">#{order.id}</p>
							<p className="text-sm text-muted-foreground">{order.customer} • {order.date}</p>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div className="text-right">
							<p className="font-medium">{order.total}</p>
							<p className="text-sm text-muted-foreground">{order.items} items</p>
						</div>
						<Badge className={order.statusColor}>{order.status}</Badge>
						<Button variant="outline" size="sm">View</Button>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const ReviewsTab = ({
	reviews,
}: {
	reviews: { customer: string; avatar: string; rating: number; comment: string; date: string; product: string }[];
}) => (
	<div className="space-y-4">
		{reviews.map((review, i) => (
			<Card key={i}>
				<CardContent className="p-4">
					<div className="flex items-start gap-4">
						<Avatar>
							<AvatarImage src={review.avatar} alt={review.customer} />
							<AvatarFallback>{review.customer[0]}</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium">{review.customer}</p>
									<p className="text-sm text-muted-foreground">{review.product}</p>
								</div>
								<p className="text-sm text-muted-foreground">{review.date}</p>
							</div>
							<div className="flex items-center gap-1 mt-1">
								{Array.from({ length: 5 }).map((_, j) => (
									<Star
										key={j}
										className={`size-4 ${j < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
									/>
								))}
							</div>
							<p className="text-sm mt-2">{review.comment}</p>
							<Button variant="ghost" size="sm" className="mt-2">Reply</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
			fallback: 'TG',
			storeName: 'TechGadgets Pro',
			rating: 4.9,
			reviews: 2847,
			badge: 'Top Seller',
		},
		stats: [
			{ icon: DollarSign, label: 'Revenue', value: '$48,295', change: '12.5%', positive: true },
			{ icon: ShoppingCart, label: 'Orders', value: '156', change: '8.2%', positive: true },
			{ icon: Eye, label: 'Views', value: '24.5K', change: '18.4%', positive: true },
			{ icon: Star, label: 'Rating', value: '4.9', change: '0.1', positive: true },
		],
		recentOrders: [
			{ id: '48291', customer: 'John D.', items: 3, total: '$156.00', status: 'Processing' },
			{ id: '48290', customer: 'Sarah M.', items: 1, total: '$89.50', status: 'Shipped' },
			{ id: '48289', customer: 'Mike R.', items: 2, total: '$234.00', status: 'Pending' },
		],
		products: [
			{ image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', name: 'Wireless Headphones', price: '$149.99', stock: 45, sales: 234, status: 'active' as const },
			{ image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300', name: 'Smart Watch Pro', price: '$299.99', stock: 5, sales: 156, status: 'low' as const },
			{ image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300', name: 'Portable Speaker', price: '$79.99', stock: 0, sales: 89, status: 'draft' as const },
		],
		orders: [
			{ id: '48291', date: 'Jan 28, 2024', customer: 'John Doe', items: 3, total: '$156.00', status: 'Processing', statusColor: 'bg-blue-500/20 text-blue-600' },
			{ id: '48290', date: 'Jan 27, 2024', customer: 'Sarah Miller', items: 1, total: '$89.50', status: 'Shipped', statusColor: 'bg-green-500/20 text-green-600' },
			{ id: '48289', date: 'Jan 26, 2024', customer: 'Mike Ross', items: 2, total: '$234.00', status: 'Pending', statusColor: 'bg-amber-500/20 text-amber-600' },
		],
		reviews: [
			{ customer: 'Emily W.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', rating: 5, comment: 'Amazing quality! The headphones are exactly as described.', date: '2 days ago', product: 'Wireless Headphones' },
			{ customer: 'David K.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', rating: 4, comment: 'Great product, fast shipping. Would recommend!', date: '5 days ago', product: 'Smart Watch Pro' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<SellerHeader {...profileData.header} />
				<Tabs defaultValue="dashboard" className="mt-8">
					<TabsList className="w-full justify-start overflow-x-auto">
						<TabsTrigger value="dashboard" className="gap-2">
							<BarChart3 className="size-4" />
							Dashboard
						</TabsTrigger>
						<TabsTrigger value="products" className="gap-2">
							<Box className="size-4" />
							Products
						</TabsTrigger>
						<TabsTrigger value="orders" className="gap-2">
							<Package className="size-4" />
							Orders
						</TabsTrigger>
						<TabsTrigger value="reviews" className="gap-2">
							<Star className="size-4" />
							Reviews
						</TabsTrigger>
					</TabsList>
					<TabsContent value="dashboard" className="mt-6">
						<DashboardTab stats={profileData.stats} recentOrders={profileData.recentOrders} />
					</TabsContent>
					<TabsContent value="products" className="mt-6">
						<ProductsTab products={profileData.products} />
					</TabsContent>
					<TabsContent value="orders" className="mt-6">
						<OrdersTab orders={profileData.orders} />
					</TabsContent>
					<TabsContent value="reviews" className="mt-6">
						<ReviewsTab reviews={profileData.reviews} />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
