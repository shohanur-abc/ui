import {
	Heart,
	MoreHorizontal,
	Package,
	ShoppingBag,
	ShoppingCart,
	Star,
	Tag,
	TrendingUp,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WishlistCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	wishlist: {
		totalItems: number;
		totalValue: string;
		oldestItem: string;
		newestItem: string;
	};
	topCategories: string[];
	conversionRate: number;
	itemsInCart: number;
	priceDropAlerts: number;
	lastViewed: string;
}

const ConversionBadge = ({ rate }: { rate: number }) => {
	const getColor = (r: number) => {
		if (r >= 50) return 'bg-emerald-500/10 text-emerald-500';
		if (r >= 25) return 'bg-amber-500/10 text-amber-500';
		return 'bg-slate-500/10 text-slate-400';
	};
	return (
		<Badge variant="outline" className={getColor(rate)}>
			{rate}% converted
		</Badge>
	);
};

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="bg-red-500/10 text-red-500 rounded-lg p-2.5">
			<Heart className="size-5" />
		</div>
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
	</div>
);

const WishlistListItem = ({ customer }: { customer: WishlistCustomer }) => (
	<div className="group flex flex-col @lg:flex-row @lg:items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
		<div className="flex items-center gap-3 min-w-0">
			<Avatar className="size-11">
				<AvatarImage src={customer.avatar} alt={customer.name} />
				<AvatarFallback className="bg-primary/10 text-primary">
					{customer.initials}
				</AvatarFallback>
			</Avatar>
			<div className="min-w-0">
				<p className="font-semibold truncate">{customer.name}</p>
				<p className="text-muted-foreground text-sm truncate">{customer.email}</p>
			</div>
		</div>
		<div className="flex-1 grid grid-cols-2 @md:grid-cols-4 gap-4">
			<div>
				<p className="text-muted-foreground text-xs flex items-center gap-1">
					<Heart className="size-3" /> Wishlist
				</p>
				<p className="font-semibold">{customer.wishlist.totalItems} items</p>
				<p className="text-muted-foreground text-xs">{customer.wishlist.totalValue} value</p>
			</div>
			<div>
				<p className="text-muted-foreground text-xs flex items-center gap-1">
					<ShoppingCart className="size-3" /> In Cart
				</p>
				<p className="font-semibold">{customer.itemsInCart} items</p>
			</div>
			<div>
				<p className="text-muted-foreground text-xs flex items-center gap-1">
					<Tag className="size-3" /> Price Alerts
				</p>
				<p className="font-semibold">{customer.priceDropAlerts} active</p>
			</div>
			<div className="hidden @md:block">
				<p className="text-muted-foreground text-xs">Last Viewed</p>
				<p className="text-sm">{customer.lastViewed}</p>
			</div>
		</div>
		<div className="flex flex-wrap gap-1 max-w-[180px]">
			{customer.topCategories.slice(0, 3).map((category) => (
				<Badge key={category} variant="secondary" className="text-xs">
					{category}
				</Badge>
			))}
		</div>
		<div className="flex items-center gap-4">
			<ConversionBadge rate={customer.conversionRate} />
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" className="hidden @md:flex gap-1.5">
					<Package className="size-3.5" />
					View Items
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>View wishlist</DropdownMenuItem>
						<DropdownMenuItem>Send reminder</DropdownMenuItem>
						<DropdownMenuItem>Offer discount</DropdownMenuItem>
						<DropdownMenuItem>View purchase history</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	</div>
);

export default function Main() {
	const customers: WishlistCustomer[] = [
		{
			id: '1',
			name: 'Hannah Moore',
			email: 'hannah.m@email.com',
			initials: 'HM',
			wishlist: { totalItems: 24, totalValue: '$1,890', oldestItem: '3 months ago', newestItem: '1 day ago' },
			topCategories: ['Fashion', 'Accessories', 'Beauty'],
			conversionRate: 58,
			itemsInCart: 3,
			priceDropAlerts: 8,
			lastViewed: '2h ago',
		},
		{
			id: '2',
			name: 'Ian Foster',
			email: 'ian.f@email.com',
			initials: 'IF',
			wishlist: { totalItems: 12, totalValue: '$2,450', oldestItem: '6 months ago', newestItem: '1 week ago' },
			topCategories: ['Electronics', 'Gaming'],
			conversionRate: 33,
			itemsInCart: 1,
			priceDropAlerts: 4,
			lastViewed: '1d ago',
		},
		{
			id: '3',
			name: 'Julia Bennett',
			email: 'julia.b@email.com',
			initials: 'JB',
			wishlist: { totalItems: 45, totalValue: '$3,200', oldestItem: '1 year ago', newestItem: 'Today' },
			topCategories: ['Home', 'Kitchen', 'Decor'],
			conversionRate: 72,
			itemsInCart: 8,
			priceDropAlerts: 15,
			lastViewed: '30m ago',
		},
		{
			id: '4',
			name: 'Kevin Nguyen',
			email: 'kevin.n@email.com',
			initials: 'KN',
			wishlist: { totalItems: 8, totalValue: '$560', oldestItem: '2 weeks ago', newestItem: '3 days ago' },
			topCategories: ['Sports', 'Fitness'],
			conversionRate: 12,
			itemsInCart: 0,
			priceDropAlerts: 2,
			lastViewed: '5d ago',
		},
		{
			id: '5',
			name: 'Laura Mitchell',
			email: 'laura.m@email.com',
			initials: 'LM',
			wishlist: { totalItems: 32, totalValue: '$4,100', oldestItem: '8 months ago', newestItem: 'Today' },
			topCategories: ['Jewelry', 'Luxury', 'Fashion'],
			conversionRate: 45,
			itemsInCart: 5,
			priceDropAlerts: 12,
			lastViewed: '1h ago',
		},
		{
			id: '6',
			name: 'Marcus Reed',
			email: 'marcus.r@email.com',
			initials: 'MR',
			wishlist: { totalItems: 18, totalValue: '$1,200', oldestItem: '4 months ago', newestItem: '2 days ago' },
			topCategories: ['Tech', 'Gadgets', 'Audio'],
			conversionRate: 28,
			itemsInCart: 2,
			priceDropAlerts: 6,
			lastViewed: '3h ago',
		},
		{
			id: '7',
			name: 'Natalie Brooks',
			email: 'natalie.b@email.com',
			initials: 'NB',
			wishlist: { totalItems: 56, totalValue: '$5,800', oldestItem: '1 year ago', newestItem: 'Today' },
			topCategories: ['Fashion', 'Shoes', 'Bags'],
			conversionRate: 65,
			itemsInCart: 7,
			priceDropAlerts: 20,
			lastViewed: '15m ago',
		},
		{
			id: '8',
			name: 'Oscar Grant',
			email: 'oscar.g@email.com',
			initials: 'OG',
			wishlist: { totalItems: 5, totalValue: '$890', oldestItem: '1 month ago', newestItem: '1 week ago' },
			topCategories: ['Outdoor', 'Camping'],
			conversionRate: 80,
			itemsInCart: 4,
			priceDropAlerts: 1,
			lastViewed: '6h ago',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Wishlist Analytics"
					subtitle="Customer wishlist engagement and conversion"
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<WishlistListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
