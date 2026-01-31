'use client';

import {
	ArrowDownRight,
	ArrowUpRight,
	CreditCard,
	type LucideIcon,
	Receipt,
	Repeat,
	Users,
	Wallet,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type CustomerMetricProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: number;
	trend: 'up' | 'down';
};

const CustomerMetric = ({ icon: Icon, label, value, change, trend }: CustomerMetricProps) => (
	<Card className="group border-border/50 bg-card/80 transition-all duration-300 hover:border-primary/30">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-3">
				<div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-colors">
					<Icon className="size-4 text-primary" />
				</div>
				<span className={`flex items-center gap-0.5 text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
					{trend === 'up' ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
					{Math.abs(change)}%
				</span>
			</div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-2xl font-bold mt-1">{value}</p>
		</CardContent>
	</Card>
);

type SegmentProps = {
	name: string;
	count: number;
	revenue: string;
	percentage: number;
	color: string;
};

const SegmentsCard = ({ segments }: { segments: SegmentProps[] }) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Customer Segments</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{segments.map((segment, i) => (
				<div key={i} className="space-y-2">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className={`size-3 rounded-full ${segment.color}`} />
							<span className="text-sm font-medium">{segment.name}</span>
						</div>
						<div className="flex items-center gap-4 text-sm">
							<span className="text-muted-foreground">{segment.count.toLocaleString()} users</span>
							<span className="font-semibold">{segment.revenue}</span>
						</div>
					</div>
					<Progress value={segment.percentage} className={`h-1.5 [&>div]:${segment.color}`} />
				</div>
			))}
		</CardContent>
	</Card>
);

type TopCustomerProps = {
	avatar: string;
	initials: string;
	name: string;
	email: string;
	orders: number;
	totalSpent: string;
	lastOrder: string;
};

const TopCustomersCard = ({ customers }: { customers: TopCustomerProps[] }) => (
	<Card className="border-border/50 bg-card/80 col-span-2 row-span-2">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<CardTitle className="text-sm font-medium">Top Customers</CardTitle>
			<Badge variant="secondary">Lifetime Value</Badge>
		</CardHeader>
		<CardContent className="space-y-4">
			{customers.map((customer, i) => (
				<div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
					<Avatar className="size-10 ring-2 ring-primary/20">
						<AvatarImage src={customer.avatar} />
						<AvatarFallback className="bg-primary/10 text-primary text-sm">{customer.initials}</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0">
						<p className="font-medium truncate">{customer.name}</p>
						<p className="text-xs text-muted-foreground truncate">{customer.email}</p>
					</div>
					<div className="text-right">
						<p className="font-semibold">{customer.totalSpent}</p>
						<p className="text-xs text-muted-foreground">{customer.orders} orders</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

type CohortRowProps = {
	month: string;
	m0: number;
	m1: number;
	m2: number;
	m3: number;
	m4: number;
	m5: number;
};

const CohortCard = ({ cohorts }: { cohorts: CohortRowProps[] }) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Customer Retention Cohort</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground pb-2">
				<span>Cohort</span>
				<span className="text-center">M0</span>
				<span className="text-center">M1</span>
				<span className="text-center">M2</span>
				<span className="text-center">M3</span>
				<span className="text-center">M4</span>
				<span className="text-center">M5</span>
			</div>
			<div className="space-y-1">
				{cohorts.map((row, i) => (
					<div key={i} className="grid grid-cols-7 gap-1 text-xs">
						<span className="font-medium">{row.month}</span>
						{[row.m0, row.m1, row.m2, row.m3, row.m4, row.m5].map((val, j) => (
							<div
								key={j}
								className="text-center py-1.5 rounded"
								style={{
									backgroundColor: `rgba(var(--primary-rgb, 59, 130, 246), ${val / 100})`,
									color: val > 50 ? 'white' : 'inherit',
								}}
							>
								{val}%
							</div>
						))}
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const customerMetrics: CustomerMetricProps[] = [
	{ icon: Users, label: 'Total Customers', value: '12,456', change: 8.2, trend: 'up' },
	{ icon: Repeat, label: 'Repeat Rate', value: '34.2%', change: 2.5, trend: 'up' },
	{ icon: Wallet, label: 'Avg. LTV', value: '$245', change: 12.3, trend: 'up' },
	{ icon: CreditCard, label: 'Avg. Order', value: '$87', change: 1.2, trend: 'down' },
];

const segments: SegmentProps[] = [
	{ name: 'VIP Customers', count: 1234, revenue: '$456K', percentage: 45, color: 'bg-violet-500' },
	{ name: 'Regular Buyers', count: 5678, revenue: '$234K', percentage: 35, color: 'bg-blue-500' },
	{ name: 'Occasional', count: 3456, revenue: '$89K', percentage: 15, color: 'bg-emerald-500' },
	{ name: 'One-time', count: 2088, revenue: '$23K', percentage: 5, color: 'bg-amber-500' },
];

const topCustomers: TopCustomerProps[] = [
	{ avatar: 'https://i.pravatar.cc/100?img=1', initials: 'JD', name: 'John Doe', email: 'john@example.com', orders: 45, totalSpent: '$12,450', lastOrder: '2 days ago' },
	{ avatar: 'https://i.pravatar.cc/100?img=2', initials: 'SM', name: 'Sarah Miller', email: 'sarah@example.com', orders: 38, totalSpent: '$9,870', lastOrder: '1 week ago' },
	{ avatar: 'https://i.pravatar.cc/100?img=3', initials: 'MW', name: 'Mike Wilson', email: 'mike@example.com', orders: 32, totalSpent: '$8,234', lastOrder: '3 days ago' },
	{ avatar: 'https://i.pravatar.cc/100?img=4', initials: 'EJ', name: 'Emily Johnson', email: 'emily@example.com', orders: 28, totalSpent: '$7,120', lastOrder: '5 days ago' },
];

const cohorts: CohortRowProps[] = [
	{ month: 'Jan', m0: 100, m1: 65, m2: 48, m3: 38, m4: 32, m5: 28 },
	{ month: 'Feb', m0: 100, m1: 68, m2: 52, m3: 42, m4: 35, m5: 0 },
	{ month: 'Mar', m0: 100, m1: 72, m2: 55, m3: 45, m4: 0, m5: 0 },
	{ month: 'Apr', m0: 100, m1: 70, m2: 52, m3: 0, m4: 0, m5: 0 },
	{ month: 'May', m0: 100, m1: 74, m2: 0, m3: 0, m4: 0, m5: 0 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @lg:gap-6">
					{customerMetrics.map((metric, i) => (
						<CustomerMetric key={i} {...metric} />
					))}
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-4 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<TopCustomersCard customers={topCustomers} />
					<SegmentsCard segments={segments} />
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<CohortCard cohorts={cohorts} />
				</div>
			</div>
		</section>
	);
}
