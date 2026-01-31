import {
	ArrowDown,
	ArrowUp,
	Calendar,
	ChevronDown,
	Clock,
	DollarSign,
	Download,
	ExternalLink,
	Eye,
	Mail,
	MoreHorizontal,
	MousePointer,
	Package,
	Percent,
	Search,
	ShoppingCart,
	Target,
	Timer,
	Trash2,
	TrendingUp,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Card, CardContent } from '@/components/ui/card';

interface AbandonedCart {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
		isGuest: boolean;
	};
	cartValue: string;
	itemsCount: number;
	topItem: string;
	abandonedAt: string;
	timeSinceAbandonment: string;
	recoveryStatus: 'not_sent' | 'email_sent' | 'recovered' | 'expired';
	recoveryEmailsSent: number;
	source: string;
	exitPage: string;
}

const AbandonmentStats = ({
	stats,
}: {
	stats: { title: string; value: string; change: string; changeType: 'up' | 'down'; icon: React.ElementType }[];
}) => (
	<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
		{stats.map((stat, i) => (
			<Card key={i} className="py-4">
				<CardContent className="flex items-center justify-between px-4">
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
				</CardContent>
			</Card>
		))}
	</div>
);

const FilterSection = ({
	searchPlaceholder,
}: {
	searchPlaceholder: string;
}) => (
	<div className="flex flex-col gap-3 border-b px-6 py-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="w-full pl-9 @lg:w-80" />
		</div>
		<div className="flex gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						<Calendar className="size-4" />
						Time Period
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Last 24 hours</DropdownMenuItem>
					<DropdownMenuItem>Last 7 days</DropdownMenuItem>
					<DropdownMenuItem>Last 30 days</DropdownMenuItem>
					<DropdownMenuItem>Last 90 days</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						Status
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All Status</DropdownMenuItem>
					<DropdownMenuItem>Not Contacted</DropdownMenuItem>
					<DropdownMenuItem>Email Sent</DropdownMenuItem>
					<DropdownMenuItem>Recovered</DropdownMenuItem>
					<DropdownMenuItem>Expired</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Button variant="outline" size="sm" className="gap-2">
				<Download className="size-4" />
				Export
			</Button>
		</div>
	</div>
);

const RecoveryBadge = ({ status }: { status: AbandonedCart['recoveryStatus'] }) => {
	const config = {
		not_sent: { label: 'Not Sent', className: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
		email_sent: { label: 'Email Sent', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
		recovered: { label: 'Recovered', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
		expired: { label: 'Expired', className: 'bg-red-500/10 text-red-500 border-red-500/20' },
	};
	return (
		<Badge variant="outline" className={config[status].className}>
			{config[status].label}
		</Badge>
	);
};

const TimeDisplay = ({ time }: { time: string }) => (
	<div className="flex items-center gap-1.5 text-sm">
		<Timer className="text-muted-foreground size-3.5" />
		<span>{time}</span>
	</div>
);

const CartRow = ({ cart }: { cart: AbandonedCart }) => (
	<TableRow className="group">
		<TableCell>
			<Checkbox />
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarImage src={cart.customer.avatar} alt={cart.customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary text-xs">
						{cart.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="flex items-center gap-2">
						<p className="font-medium">{cart.customer.name}</p>
						{cart.customer.isGuest && (
							<Badge variant="secondary" className="text-xs">Guest</Badge>
						)}
					</div>
					<p className="text-muted-foreground text-xs">{cart.customer.email}</p>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<div>
				<p className="text-lg font-bold">{cart.cartValue}</p>
				<p className="text-muted-foreground text-xs">{cart.itemsCount} items</p>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell">
			<p className="max-w-[150px] truncate text-sm">{cart.topItem}</p>
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<RecoveryBadge status={cart.recoveryStatus} />
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<TimeDisplay time={cart.timeSinceAbandonment} />
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-center">
			{cart.recoveryEmailsSent > 0 ? (
				<Badge variant="secondary" className="text-xs">
					{cart.recoveryEmailsSent} sent
				</Badge>
			) : (
				<span className="text-muted-foreground">-</span>
			)}
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-muted-foreground text-sm">
			{cart.source}
		</TableCell>
		<TableCell className="hidden @2xl:table-cell text-muted-foreground text-sm">
			{cart.exitPage}
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
						<Eye className="mr-2 size-4" />
						View cart details
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ExternalLink className="mr-2 size-4" />
						View customer
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					{cart.recoveryStatus !== 'recovered' && (
						<>
							<DropdownMenuItem>
								<Mail className="mr-2 size-4" />
								Send recovery email
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Target className="mr-2 size-4" />
								Add to remarketing
							</DropdownMenuItem>
						</>
					)}
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-destructive">
						<Trash2 className="mr-2 size-4" />
						Delete cart
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const stats = [
		{ title: 'Abandoned Carts', value: '456', change: '-12% this week', changeType: 'down' as const, icon: ShoppingCart },
		{ title: 'Total Value', value: '$87.4K', change: '+8% this week', changeType: 'up' as const, icon: DollarSign },
		{ title: 'Recovery Rate', value: '18%', change: '+3% this month', changeType: 'up' as const, icon: TrendingUp },
		{ title: 'Avg. Cart Value', value: '$191', change: '+15% this month', changeType: 'up' as const, icon: Package },
	];

	const carts: AbandonedCart[] = [
		{
			id: '1',
			customer: { name: 'Katie Brown', email: 'katie.b@email.com', initials: 'KB', isGuest: false },
			cartValue: '$459.99',
			itemsCount: 5,
			topItem: 'Premium Wireless Headphones',
			abandonedAt: 'Jan 21, 2024',
			timeSinceAbandonment: '2 hours ago',
			recoveryStatus: 'not_sent',
			recoveryEmailsSent: 0,
			source: 'Google Ads',
			exitPage: 'Checkout - Payment',
		},
		{
			id: '2',
			customer: { name: 'Leo Martinez', email: 'leo.m@email.com', initials: 'LM', isGuest: true },
			cartValue: '$234.50',
			itemsCount: 3,
			topItem: 'Smart Watch Series 5',
			abandonedAt: 'Jan 21, 2024',
			timeSinceAbandonment: '5 hours ago',
			recoveryStatus: 'email_sent',
			recoveryEmailsSent: 1,
			source: 'Direct',
			exitPage: 'Cart Page',
		},
		{
			id: '3',
			customer: { name: 'Maya Johnson', email: 'maya.j@email.com', initials: 'MJ', isGuest: false },
			cartValue: '$789.00',
			itemsCount: 8,
			topItem: 'Gaming Laptop Pro',
			abandonedAt: 'Jan 20, 2024',
			timeSinceAbandonment: '1 day ago',
			recoveryStatus: 'email_sent',
			recoveryEmailsSent: 2,
			source: 'Email Campaign',
			exitPage: 'Checkout - Shipping',
		},
		{
			id: '4',
			customer: { name: 'Noah Williams', email: 'noah.w@email.com', initials: 'NW', isGuest: false },
			cartValue: '$156.75',
			itemsCount: 2,
			topItem: 'Running Shoes Elite',
			abandonedAt: 'Jan 18, 2024',
			timeSinceAbandonment: '3 days ago',
			recoveryStatus: 'recovered',
			recoveryEmailsSent: 1,
			source: 'Instagram',
			exitPage: 'Cart Page',
		},
		{
			id: '5',
			customer: { name: 'Olivia Davis', email: 'olivia.d@email.com', initials: 'OD', isGuest: true },
			cartValue: '$89.99',
			itemsCount: 1,
			topItem: 'Bluetooth Speaker Mini',
			abandonedAt: 'Jan 14, 2024',
			timeSinceAbandonment: '7 days ago',
			recoveryStatus: 'expired',
			recoveryEmailsSent: 3,
			source: 'Facebook Ads',
			exitPage: 'Checkout - Payment',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Abandoned Carts</h1>
					<p className="text-muted-foreground text-sm">
						Track and recover abandoned shopping carts
					</p>
				</div>

				<AbandonmentStats stats={stats} />

				<div className="overflow-hidden rounded-xl border bg-card">
					<FilterSection searchPlaceholder="Search by customer or product..." />
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="w-12">
									<Checkbox />
								</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Cart Value</TableHead>
								<TableHead className="hidden @md:table-cell">Top Item</TableHead>
								<TableHead className="hidden @lg:table-cell">Status</TableHead>
								<TableHead className="hidden @lg:table-cell">Time</TableHead>
								<TableHead className="hidden @xl:table-cell text-center">Emails</TableHead>
								<TableHead className="hidden @xl:table-cell">Source</TableHead>
								<TableHead className="hidden @2xl:table-cell">Exit Page</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{carts.map((cart) => (
								<CartRow key={cart.id} cart={cart} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
