import {
	AlertTriangle,
	ArrowUpRight,
	Calendar,
	ChevronDown,
	CreditCard,
	DollarSign,
	ExternalLink,
	FileText,
	History,
	MoreHorizontal,
	Receipt,
	RefreshCw,
	Search,
	TrendingUp,
	Wallet,
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CustomerPayment {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	paymentMethod: {
		type: 'visa' | 'mastercard' | 'paypal' | 'applepay' | 'wallet';
		last4?: string;
	};
	totalSpent: string;
	lastPayment: string;
	paymentStatus: 'completed' | 'pending' | 'failed' | 'refunded';
	subscription?: {
		plan: string;
		status: 'active' | 'cancelled' | 'expired';
		nextBilling: string;
	};
	creditBalance: string;
}

const MetricCards = ({
	metrics,
}: {
	metrics: {
		title: string;
		value: string;
		change: string;
		icon: React.ElementType;
	}[];
}) => (
	<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
		{metrics.map((metric, i) => (
			<Card key={i} className="py-4">
				<CardContent className="px-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-muted-foreground text-sm">{metric.title}</p>
							<p className="text-2xl font-bold">{metric.value}</p>
							<p className="text-emerald-500 flex items-center gap-1 text-xs">
								<ArrowUpRight className="size-3" />
								{metric.change}
							</p>
						</div>
						<div className="bg-primary/10 text-primary rounded-lg p-3">
							<metric.icon className="size-5" />
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const PaymentMethodIcon = ({
	type,
}: {
	type: CustomerPayment['paymentMethod']['type'];
}) => {
	const icons = {
		visa: 'Visa',
		mastercard: 'MC',
		paypal: 'PP',
		applepay: 'AP',
		wallet: '💳',
	};
	return (
		<div className="bg-muted flex size-8 items-center justify-center rounded text-xs font-bold">
			{icons[type]}
		</div>
	);
};

const PaymentStatusBadge = ({
	status,
}: {
	status: CustomerPayment['paymentStatus'];
}) => {
	const config = {
		completed: {
			label: 'Completed',
			className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
		},
		pending: {
			label: 'Pending',
			className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
		},
		failed: {
			label: 'Failed',
			className: 'bg-red-500/10 text-red-500 border-red-500/20',
		},
		refunded: {
			label: 'Refunded',
			className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
		},
	};
	return (
		<Badge variant="outline" className={config[status].className}>
			{config[status].label}
		</Badge>
	);
};

const SubscriptionBadge = ({
	subscription,
}: {
	subscription: CustomerPayment['subscription'];
}) => {
	if (!subscription) {
		return (
			<span className="text-muted-foreground text-sm">No subscription</span>
		);
	}
	const statusColors = {
		active: 'text-emerald-500',
		cancelled: 'text-red-500',
		expired: 'text-muted-foreground',
	};
	return (
		<div className="space-y-0.5">
			<p className="text-sm font-medium">{subscription.plan}</p>
			<p className={`text-xs ${statusColors[subscription.status]}`}>
				{subscription.status === 'active'
					? `Next: ${subscription.nextBilling}`
					: subscription.status.charAt(0).toUpperCase() +
						subscription.status.slice(1)}
			</p>
		</div>
	);
};

const CustomerRow = ({ customer }: { customer: CustomerPayment }) => (
	<TableRow className="group">
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarImage
						src={customer.customer.avatar}
						alt={customer.customer.name}
					/>
					<AvatarFallback className="bg-primary/10 text-primary text-xs">
						{customer.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{customer.customer.name}</p>
					<p className="text-muted-foreground text-xs">
						{customer.customer.email}
					</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell">
			<div className="flex items-center gap-2">
				<PaymentMethodIcon type={customer.paymentMethod.type} />
				{customer.paymentMethod.last4 && (
					<span className="text-muted-foreground text-sm">
						•••• {customer.paymentMethod.last4}
					</span>
				)}
			</div>
		</TableCell>
		<TableCell className="font-semibold">{customer.totalSpent}</TableCell>
		<TableCell className="hidden @lg:table-cell text-muted-foreground text-sm">
			{customer.lastPayment}
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<PaymentStatusBadge status={customer.paymentStatus} />
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<SubscriptionBadge subscription={customer.subscription} />
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<span
				className={`text-sm font-medium ${
					customer.creditBalance.startsWith('-')
						? 'text-red-500'
						: customer.creditBalance === '$0.00'
							? 'text-muted-foreground'
							: 'text-emerald-500'
				}`}
			>
				{customer.creditBalance}
			</span>
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
						<History className="mr-2 size-4" />
						Payment history
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Receipt className="mr-2 size-4" />
						View invoices
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard className="mr-2 size-4" />
						Update payment
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Wallet className="mr-2 size-4" />
						Add credit
					</DropdownMenuItem>
					<DropdownMenuItem className="text-destructive">
						<AlertTriangle className="mr-2 size-4" />
						Issue refund
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const metrics = [
		{
			title: 'Total Revenue',
			value: '$156.8K',
			change: '+12.5%',
			icon: DollarSign,
		},
		{
			title: 'Active Subscriptions',
			value: '1,234',
			change: '+8.2%',
			icon: RefreshCw,
		},
		{
			title: 'Avg. Transaction',
			value: '$89.50',
			change: '+5.3%',
			icon: CreditCard,
		},
		{ title: 'Credit Balance', value: '$12.4K', change: '+3.1%', icon: Wallet },
	];

	const customers: CustomerPayment[] = [
		{
			id: '1',
			customer: {
				name: 'Victoria Adams',
				email: 'victoria.a@email.com',
				initials: 'VA',
			},
			paymentMethod: { type: 'visa', last4: '4242' },
			totalSpent: '$4,567.00',
			lastPayment: 'Jan 15, 2024',
			paymentStatus: 'completed',
			subscription: {
				plan: 'Premium',
				status: 'active',
				nextBilling: 'Feb 15',
			},
			creditBalance: '$125.00',
		},
		{
			id: '2',
			customer: {
				name: 'Michael Scott',
				email: 'michael.s@email.com',
				initials: 'MS',
			},
			paymentMethod: { type: 'mastercard', last4: '5555' },
			totalSpent: '$2,340.00',
			lastPayment: 'Jan 12, 2024',
			paymentStatus: 'completed',
			subscription: { plan: 'Basic', status: 'active', nextBilling: 'Feb 12' },
			creditBalance: '$0.00',
		},
		{
			id: '3',
			customer: {
				name: 'Rachel Green',
				email: 'rachel.g@email.com',
				initials: 'RG',
			},
			paymentMethod: { type: 'paypal' },
			totalSpent: '$890.00',
			lastPayment: 'Jan 10, 2024',
			paymentStatus: 'pending',
			creditBalance: '$50.00',
		},
		{
			id: '4',
			customer: {
				name: 'David Palmer',
				email: 'david.p@email.com',
				initials: 'DP',
			},
			paymentMethod: { type: 'visa', last4: '1234' },
			totalSpent: '$1,234.00',
			lastPayment: 'Jan 8, 2024',
			paymentStatus: 'failed',
			subscription: { plan: 'Premium', status: 'cancelled', nextBilling: '' },
			creditBalance: '-$45.00',
		},
		{
			id: '5',
			customer: {
				name: 'Emily Chen',
				email: 'emily.c@email.com',
				initials: 'EC',
			},
			paymentMethod: { type: 'applepay' },
			totalSpent: '$567.00',
			lastPayment: 'Jan 5, 2024',
			paymentStatus: 'refunded',
			creditBalance: '$234.00',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
					<div>
						<h1 className="text-2xl font-bold tracking-tight">
							Payment Overview
						</h1>
						<p className="text-muted-foreground text-sm">
							Manage customer payment methods and transactions
						</p>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" size="sm" className="gap-2">
							<FileText className="size-4" />
							Export
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="gap-2">
									<Calendar className="size-4" />
									This Month
									<ChevronDown className="size-3.5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>Today</DropdownMenuItem>
								<DropdownMenuItem>Last 7 days</DropdownMenuItem>
								<DropdownMenuItem>This Month</DropdownMenuItem>
								<DropdownMenuItem>Last 3 months</DropdownMenuItem>
								<DropdownMenuItem>This Year</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				<MetricCards metrics={metrics} />

				<div className="overflow-hidden rounded-xl border bg-card">
					<div className="flex items-center gap-3 border-b px-6 py-4">
						<div className="relative flex-1">
							<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
							<Input
								placeholder="Search by name or email..."
								className="max-w-sm pl-9"
							/>
						</div>
					</div>
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead>Customer</TableHead>
								<TableHead className="hidden @md:table-cell">
									Payment Method
								</TableHead>
								<TableHead>Total Spent</TableHead>
								<TableHead className="hidden @lg:table-cell">
									Last Payment
								</TableHead>
								<TableHead className="hidden @lg:table-cell">Status</TableHead>
								<TableHead className="hidden @xl:table-cell">
									Subscription
								</TableHead>
								<TableHead className="hidden @xl:table-cell">Credit</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{customers.map((customer) => (
								<CustomerRow key={customer.id} customer={customer} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
