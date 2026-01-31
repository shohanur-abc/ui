'use client';

import {
	ArrowDownRight,
	ArrowUpRight,
	Banknote,
	type LucideIcon,
	Receipt,
	ShoppingBag,
	Wallet,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type LargeMetricCardProps = {
	icon: LucideIcon;
	title: string;
	value: string;
	change: number;
	trend: 'up' | 'down';
	details: { label: string; value: string }[];
};

const LargeMetricCard = ({ icon: Icon, title, value, change, trend, details }: LargeMetricCardProps) => (
	<Card className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
		<div className="absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-2xl transition-all duration-500 group-hover:from-primary/20" />
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
			<div className="rounded-full bg-primary/10 p-2 ring-1 ring-primary/20">
				<Icon className="size-4 text-primary" />
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div>
				<p className="text-3xl @sm:text-4xl font-bold tracking-tight">{value}</p>
				<div className={`mt-1 inline-flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
					{trend === 'up' ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
					<span>{Math.abs(change)}% from last period</span>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/50">
				{details.map((detail, i) => (
					<div key={i} className="space-y-0.5">
						<p className="text-xs text-muted-foreground">{detail.label}</p>
						<p className="text-sm font-semibold">{detail.value}</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const largeCards: LargeMetricCardProps[] = [
	{
		icon: Banknote,
		title: 'Gross Revenue',
		value: '$284,532',
		change: 18.3,
		trend: 'up',
		details: [
			{ label: 'This Month', value: '$84,532' },
			{ label: 'Last Month', value: '$71,450' },
			{ label: 'Avg Daily', value: '$2,818' },
			{ label: 'Projected', value: '$312,000' },
		],
	},
	{
		icon: Receipt,
		title: 'Net Profit',
		value: '$68,245',
		change: 12.7,
		trend: 'up',
		details: [
			{ label: 'Margin', value: '24.0%' },
			{ label: 'COGS', value: '$156,287' },
			{ label: 'Expenses', value: '$60,000' },
			{ label: 'Target', value: '$75,000' },
		],
	},
	{
		icon: ShoppingBag,
		title: 'Total Sales',
		value: '8,234',
		change: 5.2,
		trend: 'down',
		details: [
			{ label: 'Completed', value: '7,891' },
			{ label: 'Pending', value: '243' },
			{ label: 'Refunded', value: '100' },
			{ label: 'Avg/Day', value: '274' },
		],
	},
	{
		icon: Wallet,
		title: 'Cash Flow',
		value: '$42,150',
		change: 8.9,
		trend: 'up',
		details: [
			{ label: 'Inflow', value: '$125,400' },
			{ label: 'Outflow', value: '$83,250' },
			{ label: 'Pending', value: '$12,300' },
			{ label: 'Reserved', value: '$25,000' },
		],
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-4 @lg:gap-6">
					{largeCards.map((card, i) => (
						<LargeMetricCard key={i} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
