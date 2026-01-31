import {
	ArrowDownRight,
	ArrowUpRight,
	Calendar,
	CreditCard,
	DollarSign,
	MoreHorizontal,
	Receipt,
	TrendingUp,
	Wallet,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SpendingCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	spending: {
		thisMonth: string;
		lastMonth: string;
		change: number;
		avgMonthly: string;
	};
	budget?: {
		limit: string;
		used: number;
	};
	paymentMethods: string[];
	lastPurchase: string;
	category: string;
	trend: 'up' | 'down' | 'stable';
}

const TrendIndicator = ({ value, trend }: { value: number; trend: 'up' | 'down' | 'stable' }) => {
	if (trend === 'stable') {
		return <span className="text-muted-foreground text-xs">0%</span>;
	}
	const isPositive = trend === 'up';
	return (
		<span className={`flex items-center text-xs font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
			{isPositive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
			{Math.abs(value)}%
		</span>
	);
};

const BudgetBar = ({
	used,
	limit,
}: {
	used: number;
	limit: string;
}) => (
	<div className="min-w-[120px]">
		<div className="flex items-center justify-between text-xs mb-1">
			<span className="text-muted-foreground">Budget</span>
			<span className="font-medium">{used}%</span>
		</div>
		<Progress
			value={used}
			className={`h-1.5 ${used > 90 ? '[&>div]:bg-red-500' : used > 75 ? '[&>div]:bg-amber-500' : ''}`}
		/>
	</div>
);

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="bg-primary/10 text-primary rounded-lg p-2.5">
			<Wallet className="size-5" />
		</div>
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
	</div>
);

const SpendingListItem = ({ customer }: { customer: SpendingCustomer }) => (
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
				<div className="flex items-center gap-2">
					<Badge variant="secondary" className="text-xs">
						{customer.category}
					</Badge>
				</div>
			</div>
		</div>
		<div className="flex-1 grid grid-cols-2 @md:grid-cols-4 gap-4">
			<div>
				<p className="text-muted-foreground text-xs">This Month</p>
				<div className="flex items-center gap-1.5">
					<p className="font-semibold">{customer.spending.thisMonth}</p>
					<TrendIndicator value={customer.spending.change} trend={customer.trend} />
				</div>
			</div>
			<div>
				<p className="text-muted-foreground text-xs">Last Month</p>
				<p className="font-medium">{customer.spending.lastMonth}</p>
			</div>
			<div>
				<p className="text-muted-foreground text-xs">Monthly Avg</p>
				<p className="font-medium">{customer.spending.avgMonthly}</p>
			</div>
			<div className="hidden @md:block">
				<p className="text-muted-foreground text-xs">Last Purchase</p>
				<p className="text-sm">{customer.lastPurchase}</p>
			</div>
		</div>
		{customer.budget && (
			<div className="hidden @xl:block">
				<BudgetBar used={customer.budget.used} limit={customer.budget.limit} />
			</div>
		)}
		<div className="hidden @lg:flex items-center gap-1.5">
			{customer.paymentMethods.slice(0, 2).map((method, index) => (
				<Badge key={index} variant="outline" className="text-xs gap-1">
					<CreditCard className="size-3" />
					{method}
				</Badge>
			))}
		</div>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon-sm">
					<MoreHorizontal className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>View spending history</DropdownMenuItem>
				<DropdownMenuItem>View transactions</DropdownMenuItem>
				<DropdownMenuItem>Set budget alert</DropdownMenuItem>
				<DropdownMenuItem>Export report</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);

export default function Main() {
	const customers: SpendingCustomer[] = [
		{
			id: '1',
			name: 'Zachary Turner',
			email: 'zachary.t@email.com',
			initials: 'ZT',
			spending: { thisMonth: '$2,450', lastMonth: '$1,890', change: 29, avgMonthly: '$2,100' },
			budget: { limit: '$3,000', used: 82 },
			paymentMethods: ['Visa', 'PayPal'],
			lastPurchase: 'Today',
			category: 'VIP',
			trend: 'up',
		},
		{
			id: '2',
			name: 'Amanda Foster',
			email: 'amanda.f@email.com',
			initials: 'AF',
			spending: { thisMonth: '$890', lastMonth: '$1,120', change: -21, avgMonthly: '$950' },
			paymentMethods: ['Mastercard'],
			lastPurchase: '3 days ago',
			category: 'Regular',
			trend: 'down',
		},
		{
			id: '3',
			name: 'Brian Cooper',
			email: 'brian.c@email.com',
			initials: 'BC',
			spending: { thisMonth: '$3,200', lastMonth: '$2,800', change: 14, avgMonthly: '$2,900' },
			budget: { limit: '$5,000', used: 64 },
			paymentMethods: ['Amex', 'Apple Pay'],
			lastPurchase: 'Yesterday',
			category: 'VIP',
			trend: 'up',
		},
		{
			id: '4',
			name: 'Christina Lee',
			email: 'christina.l@email.com',
			initials: 'CL',
			spending: { thisMonth: '$450', lastMonth: '$450', change: 0, avgMonthly: '$480' },
			paymentMethods: ['Visa'],
			lastPurchase: '1 week ago',
			category: 'Standard',
			trend: 'stable',
		},
		{
			id: '5',
			name: 'Derek Morgan',
			email: 'derek.m@email.com',
			initials: 'DM',
			spending: { thisMonth: '$5,600', lastMonth: '$4,200', change: 33, avgMonthly: '$4,800' },
			budget: { limit: '$6,000', used: 93 },
			paymentMethods: ['Amex', 'Bank Transfer'],
			lastPurchase: 'Today',
			category: 'Enterprise',
			trend: 'up',
		},
		{
			id: '6',
			name: 'Elena Rodriguez',
			email: 'elena.r@email.com',
			initials: 'ER',
			spending: { thisMonth: '$1,200', lastMonth: '$1,800', change: -33, avgMonthly: '$1,500' },
			paymentMethods: ['PayPal'],
			lastPurchase: '5 days ago',
			category: 'Regular',
			trend: 'down',
		},
		{
			id: '7',
			name: 'Franklin Hayes',
			email: 'franklin.h@email.com',
			initials: 'FH',
			spending: { thisMonth: '$780', lastMonth: '$720', change: 8, avgMonthly: '$750' },
			paymentMethods: ['Visa', 'Google Pay'],
			lastPurchase: '2 days ago',
			category: 'Standard',
			trend: 'up',
		},
		{
			id: '8',
			name: 'Gloria Chen',
			email: 'gloria.c@email.com',
			initials: 'GC',
			spending: { thisMonth: '$4,100', lastMonth: '$3,900', change: 5, avgMonthly: '$4,000' },
			budget: { limit: '$4,500', used: 91 },
			paymentMethods: ['Mastercard', 'Wire'],
			lastPurchase: 'Today',
			category: 'VIP',
			trend: 'up',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Spending Patterns"
					subtitle="Customer spending trends and payment methods"
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<SpendingListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
