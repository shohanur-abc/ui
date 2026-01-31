import {
	Calendar,
	CreditCard,
	Download,
	ExternalLink,
	Filter,
	MoreHorizontal,
	Receipt,
	RefreshCw,
	Search,
	ShoppingBag,
	User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CustomerOrder {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	orderId: string;
	date: string;
	items: number;
	total: string;
	paymentMethod: string;
	status: 'completed' | 'processing' | 'refunded' | 'pending';
}

interface StatCard {
	title: string;
	value: string;
	change: string;
	changeType: 'positive' | 'negative';
	icon: React.ElementType;
}

const StatsGrid = ({ stats }: { stats: StatCard[] }) => (
	<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
		{stats.map((stat, i) => (
			<Card key={i} className="py-4">
				<CardContent className="px-4">
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<p className="text-muted-foreground text-sm">{stat.title}</p>
							<p className="text-2xl font-bold">{stat.value}</p>
							<p
								className={`text-xs ${stat.changeType === 'positive' ? 'text-emerald-500' : 'text-red-500'}`}
							>
								{stat.change} from last month
							</p>
						</div>
						<div className="bg-primary/10 text-primary rounded-lg p-3">
							<stat.icon className="size-5" />
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const TableFilters = ({
	searchPlaceholder,
	filters,
}: {
	searchPlaceholder: string;
	filters: { placeholder: string; options: string[] }[];
}) => (
	<div className="flex flex-col gap-3 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="w-full pl-9 @lg:w-72" />
		</div>
		<div className="flex flex-wrap gap-2">
			{filters.map((filter, i) => (
				<Select key={i}>
					<SelectTrigger className="w-[140px]">
						<SelectValue placeholder={filter.placeholder} />
					</SelectTrigger>
					<SelectContent>
						{filter.options.map((option) => (
							<SelectItem key={option} value={option.toLowerCase()}>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			))}
			<Button variant="outline" size="sm" className="gap-2">
				<Download className="size-4" />
				Export
			</Button>
		</div>
	</div>
);

const OrderStatusBadge = ({ status }: { status: CustomerOrder['status'] }) => {
	const config = {
		completed: { label: 'Completed', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
		processing: { label: 'Processing', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
		refunded: { label: 'Refunded', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
		pending: { label: 'Pending', className: 'bg-slate-500/10 text-slate-500 border-slate-500/20' },
	};
	return (
		<Badge variant="outline" className={config[status].className}>
			{config[status].label}
		</Badge>
	);
};

const OrderRow = ({ order }: { order: CustomerOrder }) => (
	<TableRow className="group">
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-8">
					<AvatarImage src={order.customer.avatar} alt={order.customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary text-xs">
						{order.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{order.customer.name}</p>
					<p className="text-muted-foreground hidden text-xs @md:block">
						{order.customer.email}
					</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="font-mono text-sm">{order.orderId}</TableCell>
		<TableCell className="hidden @lg:table-cell text-muted-foreground text-sm">
			<div className="flex items-center gap-1.5">
				<Calendar className="size-3.5" />
				{order.date}
			</div>
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<div className="flex items-center gap-1.5 text-sm">
				<ShoppingBag className="text-muted-foreground size-3.5" />
				{order.items} items
			</div>
		</TableCell>
		<TableCell className="font-semibold">{order.total}</TableCell>
		<TableCell className="hidden @md:table-cell">
			<div className="flex items-center gap-1.5 text-sm">
				<CreditCard className="text-muted-foreground size-3.5" />
				{order.paymentMethod}
			</div>
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<OrderStatusBadge status={order.status} />
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<ExternalLink className="mr-2 size-4" />
						View order
					</DropdownMenuItem>
					<DropdownMenuItem>
						<User className="mr-2 size-4" />
						View customer
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Receipt className="mr-2 size-4" />
						Download invoice
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<RefreshCw className="mr-2 size-4" />
						Process refund
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const stats: StatCard[] = [
		{
			title: 'Total Customers',
			value: '2,456',
			change: '+12.5%',
			changeType: 'positive',
			icon: User,
		},
		{
			title: 'Total Orders',
			value: '8,942',
			change: '+8.2%',
			changeType: 'positive',
			icon: ShoppingBag,
		},
		{
			title: 'Total Revenue',
			value: '$234,567',
			change: '+15.3%',
			changeType: 'positive',
			icon: CreditCard,
		},
		{
			title: 'Refunds',
			value: '$1,234',
			change: '-2.4%',
			changeType: 'negative',
			icon: RefreshCw,
		},
	];

	const orders: CustomerOrder[] = [
		{
			id: '1',
			customer: { name: 'Sarah Wilson', email: 'sarah.w@email.com', initials: 'SW' },
			orderId: '#ORD-2024-001',
			date: 'Jan 15, 2024',
			items: 3,
			total: '$234.50',
			paymentMethod: 'Visa •••• 4242',
			status: 'completed',
		},
		{
			id: '2',
			customer: { name: 'Mike Johnson', email: 'mike.j@email.com', initials: 'MJ' },
			orderId: '#ORD-2024-002',
			date: 'Jan 14, 2024',
			items: 1,
			total: '$89.00',
			paymentMethod: 'PayPal',
			status: 'processing',
		},
		{
			id: '3',
			customer: { name: 'Emily Brown', email: 'emily.b@email.com', initials: 'EB' },
			orderId: '#ORD-2024-003',
			date: 'Jan 13, 2024',
			items: 5,
			total: '$456.00',
			paymentMethod: 'Mastercard •••• 5555',
			status: 'completed',
		},
		{
			id: '4',
			customer: { name: 'David Lee', email: 'david.l@email.com', initials: 'DL' },
			orderId: '#ORD-2024-004',
			date: 'Jan 12, 2024',
			items: 2,
			total: '$156.00',
			paymentMethod: 'Visa •••• 1234',
			status: 'refunded',
		},
		{
			id: '5',
			customer: { name: 'Anna Smith', email: 'anna.s@email.com', initials: 'AS' },
			orderId: '#ORD-2024-005',
			date: 'Jan 11, 2024',
			items: 4,
			total: '$312.00',
			paymentMethod: 'Apple Pay',
			status: 'pending',
		},
	];

	const filters = [
		{ placeholder: 'Status', options: ['All', 'Completed', 'Processing', 'Refunded', 'Pending'] },
		{ placeholder: 'Date Range', options: ['Today', 'Last 7 days', 'Last 30 days', 'Custom'] },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Customer Orders</h1>
					<p className="text-muted-foreground text-sm">
						View and manage all customer purchase history
					</p>
				</div>

				<StatsGrid stats={stats} />

				<div className="space-y-4">
					<TableFilters searchPlaceholder="Search orders..." filters={filters} />
					<div className="overflow-hidden rounded-xl border bg-card">
						<Table>
							<TableHeader>
								<TableRow className="hover:bg-transparent">
									<TableHead>Customer</TableHead>
									<TableHead>Order ID</TableHead>
									<TableHead className="hidden @lg:table-cell">Date</TableHead>
									<TableHead className="hidden @xl:table-cell">Items</TableHead>
									<TableHead>Total</TableHead>
									<TableHead className="hidden @md:table-cell">Payment</TableHead>
									<TableHead className="hidden @lg:table-cell">Status</TableHead>
									<TableHead className="w-12" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{orders.map((order) => (
									<OrderRow key={order.id} order={order} />
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</section>
	);
}
