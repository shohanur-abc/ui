import {
	ArrowDown,
	ArrowUp,
	Calendar,
	ChevronDown,
	Clock,
	Download,
	FileText,
	Heart,
	MoreHorizontal,
	Package,
	Search,
	ShoppingCart,
	Star,
	Trash2,
	TrendingUp,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WishlistItem {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	product: {
		name: string;
		price: string;
		image?: string;
		sku: string;
	};
	addedDate: string;
	priceDropAlert: boolean;
	inStock: boolean;
	viewCount: number;
	daysInWishlist: number;
	priority: 'high' | 'medium' | 'low';
}

const SummaryCards = ({
	stats,
}: {
	stats: { title: string; value: string; change: string; changeType: 'up' | 'down'; icon: React.ElementType }[];
}) => (
	<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
		{stats.map((stat, i) => (
			<Card key={i} className="py-4">
				<CardContent className="px-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-muted-foreground text-sm">{stat.title}</p>
							<p className="text-2xl font-bold">{stat.value}</p>
							<div
								className={`flex items-center gap-1 text-xs ${
									stat.changeType === 'up' ? 'text-emerald-500' : 'text-red-500'
								}`}
							>
								{stat.changeType === 'up' ? (
									<ArrowUp className="size-3" />
								) : (
									<ArrowDown className="size-3" />
								)}
								{stat.change}
							</div>
						</div>
						<div className="bg-primary/10 text-primary rounded-lg p-2.5">
							<stat.icon className="size-5" />
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const SearchAndActions = ({
	searchPlaceholder,
}: {
	searchPlaceholder: string;
}) => (
	<div className="flex flex-col gap-3 border-b px-6 py-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="w-full pl-9 @lg:w-72" />
		</div>
		<div className="flex gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						<Calendar className="size-4" />
						Date Added
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Any time</DropdownMenuItem>
					<DropdownMenuItem>Last 7 days</DropdownMenuItem>
					<DropdownMenuItem>Last 30 days</DropdownMenuItem>
					<DropdownMenuItem>Last 90 days</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Button variant="outline" size="sm" className="gap-2">
				<Download className="size-4" />
				Export
			</Button>
		</div>
	</div>
);

const PriorityBadge = ({ priority }: { priority: WishlistItem['priority'] }) => {
	const config = {
		high: { label: 'High', className: 'bg-red-500/10 text-red-500 border-red-500/20' },
		medium: { label: 'Medium', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
		low: { label: 'Low', className: 'bg-slate-500/10 text-slate-500 border-slate-500/20' },
	};
	return (
		<Badge variant="outline" className={config[priority].className}>
			{config[priority].label}
		</Badge>
	);
};

const StockBadge = ({ inStock }: { inStock: boolean }) => (
	<Badge
		variant="outline"
		className={
			inStock
				? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
				: 'bg-red-500/10 text-red-500 border-red-500/20'
		}
	>
		{inStock ? 'In Stock' : 'Out of Stock'}
	</Badge>
);

const WishlistRow = ({ item }: { item: WishlistItem }) => (
	<TableRow className="group">
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarImage src={item.customer.avatar} alt={item.customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary text-xs">
						{item.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{item.customer.name}</p>
					<p className="text-muted-foreground text-xs">{item.customer.email}</p>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="bg-muted flex size-10 items-center justify-center rounded-lg">
					<Package className="text-muted-foreground size-5" />
				</div>
				<div>
					<p className="max-w-[150px] truncate font-medium">{item.product.name}</p>
					<p className="text-muted-foreground text-xs">{item.product.sku}</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="font-semibold">{item.product.price}</TableCell>
		<TableCell className="hidden @md:table-cell">
			<StockBadge inStock={item.inStock} />
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<PriorityBadge priority={item.priority} />
		</TableCell>
		<TableCell className="hidden @lg:table-cell text-muted-foreground text-sm">
			<div className="flex items-center gap-1">
				<Clock className="size-3.5" />
				{item.daysInWishlist} days
			</div>
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-center">
			{item.priceDropAlert ? (
				<Badge variant="secondary" className="gap-1">
					<Star className="size-3" />
					Alert On
				</Badge>
			) : (
				<span className="text-muted-foreground text-sm">Off</span>
			)}
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-muted-foreground text-sm">
			{item.addedDate}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<ShoppingCart className="mr-2 size-4" />
						Add to cart for customer
					</DropdownMenuItem>
					<DropdownMenuItem>Send price drop alert</DropdownMenuItem>
					<DropdownMenuItem>Send back in stock alert</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>View product</DropdownMenuItem>
					<DropdownMenuItem>View customer</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-destructive">
						<Trash2 className="mr-2 size-4" />
						Remove from wishlist
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const stats = [
		{ title: 'Total Wishlist Items', value: '8,456', change: '+12% this month', changeType: 'up' as const, icon: Heart },
		{ title: 'Unique Products', value: '2,134', change: '+8% this month', changeType: 'up' as const, icon: Package },
		{ title: 'Conversion Rate', value: '24%', change: '+3% this month', changeType: 'up' as const, icon: TrendingUp },
		{ title: 'Avg. Days in List', value: '18', change: '-2 days', changeType: 'down' as const, icon: Clock },
	];

	const items: WishlistItem[] = [
		{
			id: '1',
			customer: { name: 'Grace Kim', email: 'grace.k@email.com', initials: 'GK' },
			product: { name: 'Premium Wireless Earbuds', price: '$199.99', sku: 'SKU-001234' },
			addedDate: 'Jan 15, 2024',
			priceDropAlert: true,
			inStock: true,
			viewCount: 12,
			daysInWishlist: 15,
			priority: 'high',
		},
		{
			id: '2',
			customer: { name: 'Henry Park', email: 'henry.p@email.com', initials: 'HP' },
			product: { name: 'Smart Home Hub Pro', price: '$349.99', sku: 'SKU-002345' },
			addedDate: 'Jan 10, 2024',
			priceDropAlert: false,
			inStock: true,
			viewCount: 8,
			daysInWishlist: 20,
			priority: 'medium',
		},
		{
			id: '3',
			customer: { name: 'Iris Zhang', email: 'iris.z@email.com', initials: 'IZ' },
			product: { name: 'Running Shoes Elite', price: '$159.99', sku: 'SKU-003456' },
			addedDate: 'Jan 5, 2024',
			priceDropAlert: true,
			inStock: false,
			viewCount: 24,
			daysInWishlist: 25,
			priority: 'high',
		},
		{
			id: '4',
			customer: { name: 'Jack Thompson', email: 'jack.t@email.com', initials: 'JT' },
			product: { name: 'Mechanical Keyboard RGB', price: '$129.99', sku: 'SKU-004567' },
			addedDate: 'Dec 28, 2023',
			priceDropAlert: false,
			inStock: true,
			viewCount: 5,
			daysInWishlist: 33,
			priority: 'low',
		},
		{
			id: '5',
			customer: { name: 'Kelly Chen', email: 'kelly.c@email.com', initials: 'KC' },
			product: { name: 'Yoga Mat Premium', price: '$79.99', sku: 'SKU-005678' },
			addedDate: 'Jan 12, 2024',
			priceDropAlert: true,
			inStock: true,
			viewCount: 16,
			daysInWishlist: 18,
			priority: 'medium',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Wishlist Analytics</h1>
					<p className="text-muted-foreground text-sm">
						Track customer wishlists and conversion opportunities
					</p>
				</div>

				<SummaryCards stats={stats} />

				<div className="overflow-hidden rounded-xl border bg-card">
					<SearchAndActions searchPlaceholder="Search customers or products..." />
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead>Customer</TableHead>
								<TableHead>Product</TableHead>
								<TableHead>Price</TableHead>
								<TableHead className="hidden @md:table-cell">Stock</TableHead>
								<TableHead className="hidden @lg:table-cell">Priority</TableHead>
								<TableHead className="hidden @lg:table-cell">Duration</TableHead>
								<TableHead className="hidden @xl:table-cell text-center">Price Alert</TableHead>
								<TableHead className="hidden @xl:table-cell">Added</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{items.map((item) => (
								<WishlistRow key={item.id} item={item} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
