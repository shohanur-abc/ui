import {
	Bell,
	BellOff,
	Calendar,
	ChevronRight,
	CreditCard,
	DollarSign,
	ExternalLink,
	MoreHorizontal,
	Package,
	Pause,
	Play,
	RefreshCw,
	Settings,
	TrendingUp,
	XCircle,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SubscriptionCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	plan: {
		name: string;
		price: string;
		interval: 'monthly' | 'yearly';
	};
	status: 'active' | 'paused' | 'cancelled' | 'past_due' | 'trial';
	startDate: string;
	nextBilling: string;
	billingCycle: number;
	usage: {
		current: number;
		limit: number;
		percentage: number;
	};
	mrr: string;
	paymentMethod: string;
	autoRenew: boolean;
}

const StatusConfig = {
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
		className: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
	},
	past_due: {
		label: 'Past Due',
		icon: Bell,
		className: 'bg-red-500/10 text-red-500 border-red-500/20',
	},
	trial: {
		label: 'Trial',
		icon: TrendingUp,
		className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
	},
};

const StatusBadge = ({
	status,
}: {
	status: SubscriptionCustomer['status'];
}) => {
	const config = StatusConfig[status];
	const Icon = config.icon;
	return (
		<Badge variant="outline" className={`${config.className} gap-1`}>
			<Icon className="size-3" />
			{config.label}
		</Badge>
	);
};

const UsageBar = ({
	current,
	limit,
	percentage,
}: {
	current: number;
	limit: number;
	percentage: number;
}) => (
	<div className="space-y-1.5">
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">Usage</span>
			<span className="font-medium">
				{current.toLocaleString()} / {limit.toLocaleString()}
			</span>
		</div>
		<Progress
			value={percentage}
			className={`h-2 ${percentage > 90 ? '[&>div]:bg-red-500' : percentage > 75 ? '[&>div]:bg-amber-500' : ''}`}
		/>
	</div>
);

const PlanBadge = ({
	name,
	price,
	interval,
}: {
	name: string;
	price: string;
	interval: 'monthly' | 'yearly';
}) => (
	<div className="flex items-center gap-2">
		<Badge variant="secondary" className="font-medium">
			{name}
		</Badge>
		<span className="text-sm font-semibold">
			{price}/{interval === 'monthly' ? 'mo' : 'yr'}
		</span>
	</div>
);

const InfoItem = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ElementType;
	label: string;
	value: string | number;
}) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground flex items-center gap-1.5">
			<Icon className="size-3.5" />
			{label}
		</span>
		<span className="font-medium">{value}</span>
	</div>
);

const SubscriptionCard = ({ customer }: { customer: SubscriptionCustomer }) => (
	<Card className="group transition-shadow hover:shadow-lg">
		<CardHeader className="pb-3">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<Avatar className="size-11">
						<AvatarImage src={customer.avatar} alt={customer.name} />
						<AvatarFallback className="bg-primary/10 text-primary">
							{customer.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold">{customer.name}</p>
						<p className="text-muted-foreground text-xs">{customer.email}</p>
					</div>
				</div>
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
						<DropdownMenuSeparator />
						{customer.status === 'active' && (
							<DropdownMenuItem className="text-amber-500">
								<Pause className="mr-2 size-4" />
								Pause subscription
							</DropdownMenuItem>
						)}
						{customer.status === 'paused' && (
							<DropdownMenuItem className="text-emerald-500">
								<Play className="mr-2 size-4" />
								Resume subscription
							</DropdownMenuItem>
						)}
						<DropdownMenuItem className="text-destructive">
							<XCircle className="mr-2 size-4" />
							Cancel
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-between">
				<StatusBadge status={customer.status} />
				<div className="flex items-center gap-1">
					{customer.autoRenew ? (
						<Bell className="text-emerald-500 size-4" />
					) : (
						<BellOff className="text-muted-foreground size-4" />
					)}
					<span className="text-muted-foreground text-xs">
						{customer.autoRenew ? 'Auto-renew' : 'Manual'}
					</span>
				</div>
			</div>
			<div className="rounded-lg border bg-muted/30 p-3">
				<div className="flex items-center justify-between">
					<PlanBadge
						name={customer.plan.name}
						price={customer.plan.price}
						interval={customer.plan.interval}
					/>
					<span className="text-muted-foreground text-xs">
						Cycle #{customer.billingCycle}
					</span>
				</div>
			</div>
			<UsageBar
				current={customer.usage.current}
				limit={customer.usage.limit}
				percentage={customer.usage.percentage}
			/>
			<div className="space-y-2 border-t pt-3">
				<InfoItem icon={Calendar} label="Started" value={customer.startDate} />
				<InfoItem
					icon={RefreshCw}
					label="Next billing"
					value={customer.nextBilling}
				/>
				<InfoItem icon={DollarSign} label="MRR" value={customer.mrr} />
				<InfoItem
					icon={CreditCard}
					label="Payment"
					value={customer.paymentMethod}
				/>
			</div>
		</CardContent>
		<CardFooter className="border-t bg-muted/20 px-4 py-3">
			<Button variant="outline" size="sm" className="w-full gap-1.5">
				<Package className="size-4" />
				View Billing History
				<ChevronRight className="ml-auto size-4" />
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const customers: SubscriptionCustomer[] = [
		{
			id: '1',
			name: 'Emma Richardson',
			email: 'emma.r@email.com',
			initials: 'ER',
			plan: { name: 'Enterprise', price: '$299', interval: 'monthly' },
			status: 'active',
			startDate: 'Jan 1, 2023',
			nextBilling: 'Feb 1, 2024',
			billingCycle: 13,
			usage: { current: 8500, limit: 10000, percentage: 85 },
			mrr: '$299',
			paymentMethod: 'Visa •••• 4242',
			autoRenew: true,
		},
		{
			id: '2',
			name: 'Lucas Thompson',
			email: 'lucas.t@email.com',
			initials: 'LT',
			plan: { name: 'Pro', price: '$99', interval: 'monthly' },
			status: 'active',
			startDate: 'Mar 15, 2023',
			nextBilling: 'Feb 15, 2024',
			billingCycle: 11,
			usage: { current: 3200, limit: 5000, percentage: 64 },
			mrr: '$99',
			paymentMethod: 'MC •••• 5555',
			autoRenew: true,
		},
		{
			id: '3',
			name: 'Sophia Martinez',
			email: 'sophia.m@email.com',
			initials: 'SM',
			plan: { name: 'Pro', price: '$99', interval: 'monthly' },
			status: 'past_due',
			startDate: 'Jun 1, 2023',
			nextBilling: 'Overdue',
			billingCycle: 8,
			usage: { current: 4800, limit: 5000, percentage: 96 },
			mrr: '$99',
			paymentMethod: 'Visa •••• 1234',
			autoRenew: true,
		},
		{
			id: '4',
			name: 'Oliver Wang',
			email: 'oliver.w@email.com',
			initials: 'OW',
			plan: { name: 'Basic', price: '$29', interval: 'monthly' },
			status: 'paused',
			startDate: 'Sep 10, 2023',
			nextBilling: 'Paused',
			billingCycle: 5,
			usage: { current: 450, limit: 1000, percentage: 45 },
			mrr: '$0',
			paymentMethod: 'PayPal',
			autoRenew: false,
		},
		{
			id: '5',
			name: 'Ava Johnson',
			email: 'ava.j@email.com',
			initials: 'AJ',
			plan: { name: 'Pro', price: '$990', interval: 'yearly' },
			status: 'trial',
			startDate: 'Jan 20, 2024',
			nextBilling: 'Feb 20, 2024',
			billingCycle: 1,
			usage: { current: 250, limit: 5000, percentage: 5 },
			mrr: '$82.50',
			paymentMethod: 'Not set',
			autoRenew: false,
		},
		{
			id: '6',
			name: 'Noah Davis',
			email: 'noah.d@email.com',
			initials: 'ND',
			plan: { name: 'Enterprise', price: '$2,990', interval: 'yearly' },
			status: 'active',
			startDate: 'Nov 1, 2023',
			nextBilling: 'Nov 1, 2024',
			billingCycle: 1,
			usage: { current: 7200, limit: 10000, percentage: 72 },
			mrr: '$249.17',
			paymentMethod: 'Bank Transfer',
			autoRenew: true,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<div className="bg-primary/10 text-primary rounded-lg p-2.5">
						<RefreshCw className="size-5" />
					</div>
					<div>
						<h1 className="text-2xl font-bold tracking-tight">Subscriptions</h1>
						<p className="text-muted-foreground text-sm">
							Manage customer subscriptions and billing
						</p>
					</div>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<SubscriptionCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
