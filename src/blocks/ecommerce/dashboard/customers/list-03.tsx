import {
	Activity,
	ArrowDownRight,
	ArrowUpRight,
	DollarSign,
	MoreHorizontal,
	Percent,
	ShoppingBag,
	TrendingUp,
	Users,
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

interface CustomerAnalytics {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	segment: string;
	metrics: {
		ltv: string;
		ltvChange: number;
		aov: string;
		aovChange: number;
		purchaseFrequency: number;
		frequencyChange: number;
		lastPurchase: string;
	};
	trend: 'up' | 'down' | 'stable';
	riskScore: number;
}

const TrendIndicator = ({
	value,
	suffix = '%',
}: {
	value: number;
	suffix?: string;
}) => {
	if (value === 0)
		return <span className="text-muted-foreground text-xs">0{suffix}</span>;
	const isPositive = value > 0;
	return (
		<span
			className={`flex items-center text-xs ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}
		>
			{isPositive ? (
				<ArrowUpRight className="size-3" />
			) : (
				<ArrowDownRight className="size-3" />
			)}
			{Math.abs(value)}
			{suffix}
		</span>
	);
};

const RiskIndicator = ({ score }: { score: number }) => {
	const getRiskLevel = (s: number) => {
		if (s <= 30) return { label: 'Low', className: 'bg-emerald-500' };
		if (s <= 60) return { label: 'Medium', className: 'bg-amber-500' };
		return { label: 'High', className: 'bg-red-500' };
	};
	const risk = getRiskLevel(score);
	return (
		<div className="flex items-center gap-2">
			<div className="flex h-1.5 w-16 overflow-hidden rounded-full bg-muted">
				<div className={`${risk.className}`} style={{ width: `${score}%` }} />
			</div>
			<span className="text-muted-foreground text-xs">{risk.label}</span>
		</div>
	);
};

const MetricCell = ({
	value,
	change,
	label,
}: {
	value: string | number;
	change: number;
	label: string;
}) => (
	<div className="text-center min-w-[80px]">
		<div className="flex items-center justify-center gap-1">
			<span className="font-semibold">{value}</span>
			<TrendIndicator value={change} />
		</div>
		<p className="text-muted-foreground text-xs">{label}</p>
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
			<TrendingUp className="size-5" />
		</div>
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
	</div>
);

const AnalyticsListItem = ({ customer }: { customer: CustomerAnalytics }) => (
	<div className="group flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
		<Avatar className="size-11">
			<AvatarImage src={customer.avatar} alt={customer.name} />
			<AvatarFallback className="bg-primary/10 text-primary">
				{customer.initials}
			</AvatarFallback>
		</Avatar>
		<div className="min-w-0 flex-1">
			<div className="flex items-center gap-2">
				<p className="font-semibold truncate">{customer.name}</p>
				<Badge variant="secondary" className="text-xs">
					{customer.segment}
				</Badge>
			</div>
			<p className="text-muted-foreground mt-0.5 text-sm truncate">
				{customer.email}
			</p>
		</div>
		<div className="hidden items-center gap-6 @lg:flex">
			<MetricCell
				value={customer.metrics.ltv}
				change={customer.metrics.ltvChange}
				label="LTV"
			/>
			<MetricCell
				value={customer.metrics.aov}
				change={customer.metrics.aovChange}
				label="AOV"
			/>
			<MetricCell
				value={`${customer.metrics.purchaseFrequency}x`}
				change={customer.metrics.frequencyChange}
				label="Frequency"
			/>
		</div>
		<div className="hidden @xl:block">
			<p className="text-muted-foreground text-xs mb-1">Churn Risk</p>
			<RiskIndicator score={customer.riskScore} />
		</div>
		<div className="hidden @md:block text-center min-w-[90px]">
			<p className="text-sm font-medium">{customer.metrics.lastPurchase}</p>
			<p className="text-muted-foreground text-xs">Last Order</p>
		</div>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon-sm">
					<MoreHorizontal className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>View full analytics</DropdownMenuItem>
				<DropdownMenuItem>Export data</DropdownMenuItem>
				<DropdownMenuItem>Send retention offer</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);

export default function Main() {
	const customers: CustomerAnalytics[] = [
		{
			id: '1',
			name: 'Emma Richardson',
			email: 'emma.r@email.com',
			initials: 'ER',
			segment: 'VIP',
			metrics: {
				ltv: '$8,450',
				ltvChange: 12,
				aov: '$245',
				aovChange: 8,
				purchaseFrequency: 4.2,
				frequencyChange: 5,
				lastPurchase: '2 days ago',
			},
			trend: 'up',
			riskScore: 15,
		},
		{
			id: '2',
			name: 'Lucas Thompson',
			email: 'lucas.t@email.com',
			initials: 'LT',
			segment: 'Regular',
			metrics: {
				ltv: '$3,200',
				ltvChange: -5,
				aov: '$180',
				aovChange: 2,
				purchaseFrequency: 2.1,
				frequencyChange: -8,
				lastPurchase: '3 weeks ago',
			},
			trend: 'down',
			riskScore: 55,
		},
		{
			id: '3',
			name: 'Sophia Martinez',
			email: 'sophia.m@email.com',
			initials: 'SM',
			segment: 'VIP',
			metrics: {
				ltv: '$12,800',
				ltvChange: 18,
				aov: '$320',
				aovChange: 15,
				purchaseFrequency: 5.8,
				frequencyChange: 10,
				lastPurchase: 'Today',
			},
			trend: 'up',
			riskScore: 8,
		},
		{
			id: '4',
			name: 'Oliver Wang',
			email: 'oliver.w@email.com',
			initials: 'OW',
			segment: 'At Risk',
			metrics: {
				ltv: '$1,450',
				ltvChange: -15,
				aov: '$120',
				aovChange: -5,
				purchaseFrequency: 1.2,
				frequencyChange: -20,
				lastPurchase: '2 months ago',
			},
			trend: 'down',
			riskScore: 78,
		},
		{
			id: '5',
			name: 'Ava Johnson',
			email: 'ava.j@email.com',
			initials: 'AJ',
			segment: 'New',
			metrics: {
				ltv: '$520',
				ltvChange: 0,
				aov: '$260',
				aovChange: 0,
				purchaseFrequency: 2.0,
				frequencyChange: 0,
				lastPurchase: '1 week ago',
			},
			trend: 'stable',
			riskScore: 35,
		},
		{
			id: '6',
			name: 'Noah Davis',
			email: 'noah.d@email.com',
			initials: 'ND',
			segment: 'Regular',
			metrics: {
				ltv: '$4,890',
				ltvChange: 8,
				aov: '$195',
				aovChange: 12,
				purchaseFrequency: 3.5,
				frequencyChange: 3,
				lastPurchase: '5 days ago',
			},
			trend: 'up',
			riskScore: 22,
		},
		{
			id: '7',
			name: 'Mia Wilson',
			email: 'mia.w@email.com',
			initials: 'MW',
			segment: 'Dormant',
			metrics: {
				ltv: '$890',
				ltvChange: -25,
				aov: '$145',
				aovChange: -10,
				purchaseFrequency: 0.5,
				frequencyChange: -40,
				lastPurchase: '4 months ago',
			},
			trend: 'down',
			riskScore: 92,
		},
		{
			id: '8',
			name: 'Ethan Brown',
			email: 'ethan.b@email.com',
			initials: 'EB',
			segment: 'VIP',
			metrics: {
				ltv: '$15,200',
				ltvChange: 22,
				aov: '$380',
				aovChange: 18,
				purchaseFrequency: 6.2,
				frequencyChange: 12,
				lastPurchase: 'Yesterday',
			},
			trend: 'up',
			riskScore: 5,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Customer Analytics"
					subtitle="Key metrics and trends for each customer"
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<AnalyticsListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
