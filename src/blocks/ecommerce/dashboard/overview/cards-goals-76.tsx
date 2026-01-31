'use client';

import { Cell, Pie, PieChart } from 'recharts';
import {
	ArrowUpRight,
	DollarSign,
	Package,
	ShoppingCart,
	Target,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
} from '@/components/ui/chart';

type GoalCard = {
	title: string;
	current: string;
	target: string;
	progress: number;
	icon: LucideIcon;
	trend: string;
	color: string;
	chartColor: string;
};

const chartConfig: ChartConfig = {
	value: { label: 'Progress' },
};

const GoalCardComponent = ({ title, current, target, progress, icon: Icon, trend, color, chartColor }: GoalCard) => {
	const chartData = [
		{ name: 'Progress', value: progress, fill: chartColor },
		{ name: 'Remaining', value: 100 - progress, fill: 'var(--muted)' },
	];

	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-center justify-between">
					<div className={`rounded-lg p-2 ${color}`}>
						<Icon className="size-4" />
					</div>
					<Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 text-xs">
						<ArrowUpRight className="mr-0.5 size-3" />
						{trend}
					</Badge>
				</div>
				<p className="mt-3 text-sm font-medium">{title}</p>
				<div className="mt-4 flex items-center gap-4">
					<ChartContainer config={chartConfig} className="size-20">
						<PieChart>
							<Pie
								data={chartData}
								dataKey="value"
								innerRadius={28}
								outerRadius={38}
								startAngle={90}
								endAngle={-270}
								strokeWidth={0}
							>
								{chartData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.fill} />
								))}
							</Pie>
						</PieChart>
					</ChartContainer>
					<div className="flex-1">
						<p className="text-2xl font-bold">{current}</p>
						<p className="text-xs text-muted-foreground">of {target} target</p>
						<p className="mt-1 text-sm font-medium" style={{ color: chartColor }}>
							{progress}% complete
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const goals: GoalCard[] = [
		{
			title: 'Monthly Revenue',
			current: '$248K',
			target: '$300K',
			progress: 83,
			icon: DollarSign,
			trend: '+28%',
			color: 'bg-primary/10 text-primary',
			chartColor: 'var(--chart-1)',
		},
		{
			title: 'Order Target',
			current: '6,842',
			target: '8,000',
			progress: 86,
			icon: ShoppingCart,
			trend: '+22%',
			color: 'bg-emerald-500/10 text-emerald-500',
			chartColor: 'var(--chart-2)',
		},
		{
			title: 'New Customers',
			current: '847',
			target: '1,000',
			progress: 85,
			icon: Users,
			trend: '+18%',
			color: 'bg-amber-500/10 text-amber-500',
			chartColor: 'var(--chart-3)',
		},
		{
			title: 'Products Sold',
			current: '12,456',
			target: '15,000',
			progress: 83,
			icon: Package,
			trend: '+24%',
			color: 'bg-blue-500/10 text-blue-500',
			chartColor: 'var(--chart-4)',
		},
		{
			title: 'Conversion Rate',
			current: '3.2%',
			target: '4.0%',
			progress: 80,
			icon: Target,
			trend: '+0.5%',
			color: 'bg-violet-500/10 text-violet-500',
			chartColor: 'var(--chart-5)',
		},
		{
			title: 'Revenue Growth',
			current: '28%',
			target: '35%',
			progress: 80,
			icon: TrendingUp,
			trend: '+8%',
			color: 'bg-rose-500/10 text-rose-500',
			chartColor: 'var(--chart-1)',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{goals.map((goal, i) => (
						<GoalCardComponent key={i} {...goal} />
					))}
				</div>
			</div>
		</section>
	);
}
