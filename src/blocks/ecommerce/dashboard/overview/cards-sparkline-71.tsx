'use client';

import { Area, AreaChart } from 'recharts';
import {
	ArrowDownRight,
	ArrowUpRight,
	DollarSign,
	Package,
	ShoppingCart,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
} from '@/components/ui/chart';

type StatCard = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	sparkline: number[];
	color: string;
};

const chartConfig: ChartConfig = {
	value: { label: 'Value', color: 'var(--chart-1)' },
};

const StatCardComponent = ({ title, value, change, trend, icon: Icon, sparkline, color }: StatCard) => (
	<Card className="overflow-hidden">
		<CardContent className="p-0">
			<div className="p-4">
				<div className="flex items-center justify-between">
					<div className={`rounded-lg p-2 ${color}`}>
						<Icon className="size-4" />
					</div>
					<Badge
						variant="secondary"
						className={trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}
					>
						{trend === 'up' ? <ArrowUpRight className="mr-0.5 size-3" /> : <ArrowDownRight className="mr-0.5 size-3" />}
						{change}
					</Badge>
				</div>
				<div className="mt-3">
					<p className="text-sm text-muted-foreground">{title}</p>
					<p className="text-2xl font-bold">{value}</p>
				</div>
			</div>
			<ChartContainer config={chartConfig} className="h-[60px] w-full">
				<AreaChart data={sparkline.map((v, i) => ({ name: i, value: v }))} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
					<defs>
						<linearGradient id={`sparkline-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
							<stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
						</linearGradient>
					</defs>
					<Area
						type="monotone"
						dataKey="value"
						stroke="var(--chart-1)"
						strokeWidth={1.5}
						fill={`url(#sparkline-${title.replace(/\s/g, '')})`}
					/>
				</AreaChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const stats: StatCard[] = [
		{
			title: 'Total Revenue',
			value: '$248,632',
			change: '+28%',
			trend: 'up',
			icon: DollarSign,
			sparkline: [30, 45, 35, 50, 48, 62, 58, 75, 70, 85, 82, 95],
			color: 'bg-primary/10 text-primary',
		},
		{
			title: 'Total Orders',
			value: '6,842',
			change: '+22%',
			trend: 'up',
			icon: ShoppingCart,
			sparkline: [25, 38, 42, 35, 55, 48, 62, 58, 72, 68, 78, 85],
			color: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			title: 'Active Customers',
			value: '3,847',
			change: '+18%',
			trend: 'up',
			icon: Users,
			sparkline: [20, 32, 28, 42, 38, 52, 48, 58, 55, 68, 72, 80],
			color: 'bg-amber-500/10 text-amber-500',
		},
		{
			title: 'Products Sold',
			value: '12,456',
			change: '+24%',
			trend: 'up',
			icon: Package,
			sparkline: [35, 42, 38, 55, 52, 65, 62, 78, 75, 88, 85, 98],
			color: 'bg-blue-500/10 text-blue-500',
		},
		{
			title: 'Conversion Rate',
			value: '3.2%',
			change: '+0.5%',
			trend: 'up',
			icon: TrendingUp,
			sparkline: [2.1, 2.3, 2.2, 2.5, 2.4, 2.8, 2.7, 3.0, 2.9, 3.1, 3.0, 3.2],
			color: 'bg-violet-500/10 text-violet-500',
		},
		{
			title: 'Avg Order Value',
			value: '$36.34',
			change: '-2%',
			trend: 'down',
			icon: DollarSign,
			sparkline: [42, 38, 40, 36, 38, 35, 37, 34, 36, 33, 35, 36],
			color: 'bg-rose-500/10 text-rose-500',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{stats.map((stat, i) => (
						<StatCardComponent key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
