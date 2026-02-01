import {
	ArrowUpRight,
	Bell,
	Calendar,
	ChevronDown,
	Clock,
	CreditCard,
	Download,
	ExternalLink,
	Mail,
	MoreHorizontal,
	Package,
	Pause,
	Play,
	RefreshCw,
	Search,
	Settings,
	XCircle,
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
import { Card, CardContent } from '@/components/ui/card';

interface CustomerSubscription {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	plan: {
		name: string;
		price: string;
		interval: 'monthly' | 'yearly';
	};
	status: 'active' | 'paused' | 'cancelled' | 'past_due' | 'trial';
	startDate: string;
	nextBilling: string;
	usage: number;
	mrr: string;
	paymentMethod: string;
}

const MetricCards = ({
	metrics,
}: {
	metrics: {
		label: string;
		value: string;
		subtext: string;
		icon: React.ElementType;
	}[];
}) => (
	<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
		{metrics.map((metric, i) => (
			<Card key={i} className="py-4">
				<CardContent className="flex items-center gap-4 px-4">
					<div className="bg-primary/10 text-primary rounded-lg p-2.5">
						<metric.icon className="size-5" />
					</div>
					<div>
						<p className="text-2xl font-bold">{metric.value}</p>
						<p className="text-muted-foreground text-sm">{metric.label}</p>
						<p className="text-emerald-500 flex items-center gap-1 text-xs">
							<ArrowUpRight className="size-3" />
							{metric.subtext}
						</p>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const TableActions = ({ searchPlaceholder }: { searchPlaceholder: string }) => (
	<div className="flex flex-col gap-3 border-b px-6 py-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="w-full pl-9 @lg:w-72" />
		</div>
		<div className="flex gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						Status
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All Status</DropdownMenuItem>
					<DropdownMenuItem>Active</DropdownMenuItem>
					<DropdownMenuItem>Paused</DropdownMenuItem>
					<DropdownMenuItem>Past Due</DropdownMenuItem>
					<DropdownMenuItem>Cancelled</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						Plan
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All Plans</DropdownMenuItem>
					<DropdownMenuItem>Basic</DropdownMenuItem>
					<DropdownMenuItem>Pro</DropdownMenuItem>
					<DropdownMenuItem>Enterprise</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Button variant="outline" size="sm" className="gap-2">
				<Download className="size-4" />
				Export
			</Button>
		</div>
	</div>
);

const StatusBadge = ({
	status,
}: {
	status: CustomerSubscription['status'];
}) => {
	const config = {
		active: {
			label: 'Active',
			icon: Play,
			className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
		},
		paused: {
			label: 'Paused',
			icon: Pause,
			className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
		},
		cancelled: {
			label: 'Cancelled',
			icon: XCircle,
			className: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
		},
		past_due: {
			label: 'Past Due',
			icon: Clock,
			className: 'bg-red-500/10 text-red-500 border-red-500/20',
		},
		trial: {
			label: 'Trial',
			icon: Clock,
			className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
		},
	};
	const Icon = config[status].icon;
	return (
		<Badge variant="outline" className={`${config[status].className} gap-1`}>
			<Icon className="size-3" />
			{config[status].label}
		</Badge>
	);
};

const UsageBar = ({ usage }: { usage: number }) => (
	<div className="space-y-1 min-w-[80px]">
		<Progress
			value={usage}
			className={`h-1.5 ${usage > 90 ? '[&>div]:bg-red-500' : usage > 70 ? '[&>div]:bg-amber-500' : ''}`}
		/>
		<p className="text-muted-foreground text-xs">{usage}% used</p>
	</div>
);

const SubscriptionRow = ({
	subscription,
}: {
	subscription: CustomerSubscription;
}) => (
	<TableRow className="group">
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarImage
						src={subscription.customer.avatar}
						alt={subscription.customer.name}
					/>
					<AvatarFallback className="bg-primary/10 text-primary text-xs">
						{subscription.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{subscription.customer.name}</p>
					<p className="text-muted-foreground text-xs">
						{subscription.customer.email}
					</p>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<div>
				<p className="font-medium">{subscription.plan.name}</p>
				<p className="text-muted-foreground text-xs">
					{subscription.plan.price}/
					{subscription.plan.interval === 'monthly' ? 'mo' : 'yr'}
				</p>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell">
			<StatusBadge status={subscription.status} />
		</TableCell>
		<TableCell className="hidden @lg:table-cell font-semibold">
			{subscription.mrr}
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<UsageBar usage={subscription.usage} />
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-muted-foreground text-sm">
			<div className="flex items-center gap-1">
				<Calendar className="size-3.5" />
				{subscription.nextBilling}
			</div>
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-muted-foreground text-sm">
			<div className="flex items-center gap-1">
				<CreditCard className="size-3.5" />
				{subscription.paymentMethod}
			</div>
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
						<ExternalLink className="mr-2 size-4" />
						View details
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className="mr-2 size-4" />
						Manage subscription
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Mail className="mr-2 size-4" />
						Send invoice
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					{subscription.status === 'active' && (
						<DropdownMenuItem className="text-amber-500">
							<Pause className="mr-2 size-4" />
							Pause subscription
						</DropdownMenuItem>
					)}
					{subscription.status === 'paused' && (
						<DropdownMenuItem className="text-emerald-500">
							<Play className="mr-2 size-4" />
							Resume subscription
						</DropdownMenuItem>
					)}
					<DropdownMenuItem className="text-destructive">
						<XCircle className="mr-2 size-4" />
						Cancel subscription
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const metrics = [
		{
			label: 'Active Subscriptions',
			value: '1,234',
			subtext: '+12% this month',
			icon: RefreshCw,
		},
		{
			label: 'Monthly Revenue',
			value: '$45.6K',
			subtext: '+8% this month',
			icon: CreditCard,
		},
		{
			label: 'Avg. Revenue/User',
			value: '$36.97',
			subtext: '+5% this month',
			icon: Package,
		},
		{
			label: 'Churn Rate',
			value: '2.4%',
			subtext: '-0.5% this month',
			icon: Bell,
		},
	];

	const subscriptions: CustomerSubscription[] = [
		{
			id: '1',
			customer: {
				name: 'Laura Miller',
				email: 'laura.m@email.com',
				initials: 'LM',
			},
			plan: { name: 'Enterprise', price: '$299', interval: 'monthly' },
			status: 'active',
			startDate: 'Jan 1, 2023',
			nextBilling: 'Feb 1, 2024',
			usage: 78,
			mrr: '$299',
			paymentMethod: 'Visa •••• 4242',
		},
		{
			id: '2',
			customer: {
				name: 'Martin Davis',
				email: 'martin.d@email.com',
				initials: 'MD',
			},
			plan: { name: 'Pro', price: '$99', interval: 'monthly' },
			status: 'active',
			startDate: 'Mar 15, 2023',
			nextBilling: 'Feb 15, 2024',
			usage: 45,
			mrr: '$99',
			paymentMethod: 'MC •••• 5555',
		},
		{
			id: '3',
			customer: {
				name: 'Nina Patel',
				email: 'nina.p@email.com',
				initials: 'NP',
			},
			plan: { name: 'Pro', price: '$99', interval: 'monthly' },
			status: 'past_due',
			startDate: 'Jun 1, 2023',
			nextBilling: 'Overdue',
			usage: 92,
			mrr: '$99',
			paymentMethod: 'Visa •••• 1234',
		},
		{
			id: '4',
			customer: {
				name: 'Oscar Wong',
				email: 'oscar.w@email.com',
				initials: 'OW',
			},
			plan: { name: 'Basic', price: '$29', interval: 'monthly' },
			status: 'paused',
			startDate: 'Sep 10, 2023',
			nextBilling: 'Paused',
			usage: 30,
			mrr: '$0',
			paymentMethod: 'PayPal',
		},
		{
			id: '5',
			customer: {
				name: 'Paula Jones',
				email: 'paula.j@email.com',
				initials: 'PJ',
			},
			plan: { name: 'Pro', price: '$99', interval: 'monthly' },
			status: 'trial',
			startDate: 'Jan 20, 2024',
			nextBilling: 'Feb 20, 2024',
			usage: 15,
			mrr: '$0',
			paymentMethod: 'Not set',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Subscriptions</h1>
					<p className="text-muted-foreground text-sm">
						Manage customer subscriptions and recurring billing
					</p>
				</div>

				<MetricCards metrics={metrics} />

				<div className="overflow-hidden rounded-xl border bg-card">
					<TableActions searchPlaceholder="Search subscribers..." />
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead>Customer</TableHead>
								<TableHead>Plan</TableHead>
								<TableHead className="hidden @md:table-cell">Status</TableHead>
								<TableHead className="hidden @lg:table-cell">MRR</TableHead>
								<TableHead className="hidden @lg:table-cell">Usage</TableHead>
								<TableHead className="hidden @xl:table-cell">
									Next Billing
								</TableHead>
								<TableHead className="hidden @xl:table-cell">Payment</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{subscriptions.map((subscription) => (
								<SubscriptionRow
									key={subscription.id}
									subscription={subscription}
								/>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
