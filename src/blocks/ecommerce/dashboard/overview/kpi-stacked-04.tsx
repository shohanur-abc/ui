import {
	ArrowDownRight,
	ArrowUpRight,
	Box,
	CreditCard,
	DollarSign,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type KpiItem = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	subMetrics: { label: string; value: string }[];
};

const KpiCardStacked = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
	subMetrics,
}: KpiItem) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:border-primary/50">
		<CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-primary/20 p-2.5">
						<Icon className="size-5 text-primary" />
					</div>
					<span className="font-medium text-foreground">{title}</span>
				</div>
				<div
					className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}
				>
					{trend === 'up' ? (
						<ArrowUpRight className="size-3" />
					) : (
						<ArrowDownRight className="size-3" />
					)}
					{change}
				</div>
			</div>
		</CardHeader>
		<CardContent className="pt-4">
			<div className="text-3xl font-bold tracking-tight @sm:text-4xl">
				{value}
			</div>
			<Separator className="my-4" />
			<div className="grid grid-cols-2 gap-4">
				{subMetrics.map((metric, i) => (
					<div key={i}>
						<p className="text-xs text-muted-foreground">{metric.label}</p>
						<p className="mt-0.5 text-sm font-semibold">{metric.value}</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const kpis: KpiItem[] = [
		{
			title: 'Revenue',
			value: '$156,892',
			change: '+24.5%',
			trend: 'up',
			icon: DollarSign,
			subMetrics: [
				{ label: 'Today', value: '$5,234' },
				{ label: 'This Week', value: '$42,150' },
			],
		},
		{
			title: 'Orders',
			value: '4,521',
			change: '+18.2%',
			trend: 'up',
			icon: Box,
			subMetrics: [
				{ label: 'Pending', value: '127' },
				{ label: 'Completed', value: '4,394' },
			],
		},
		{
			title: 'Customers',
			value: '12,847',
			change: '+9.8%',
			trend: 'up',
			icon: Users,
			subMetrics: [
				{ label: 'New Today', value: '89' },
				{ label: 'Returning', value: '67%' },
			],
		},
		{
			title: 'Transactions',
			value: '8,234',
			change: '-2.1%',
			trend: 'down',
			icon: CreditCard,
			subMetrics: [
				{ label: 'Successful', value: '98.2%' },
				{ label: 'Refunded', value: '1.8%' },
			],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4 @xl:gap-6">
					{kpis.map((kpi, i) => (
						<KpiCardStacked key={i} {...kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
