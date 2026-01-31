'use client';

import { Area, AreaChart, XAxis, YAxis } from 'recharts';
import {
	ArrowDownRight,
	ArrowUpRight,
	CreditCard,
	DollarSign,
	Package,
	ShoppingCart,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type StatItem = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	progress: number;
	target: string;
};

const StatCard = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
	progress,
	target,
}: StatItem) => (
	<Card className="group transition-all hover:border-primary/50">
		<CardContent className="p-5">
			<div className="flex items-start justify-between">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className="size-4 text-primary" />
				</div>
				<span
					className={`flex items-center text-xs font-medium ${
						trend === 'up' ? 'text-emerald-500' : 'text-red-500'
					}`}
				>
					{trend === 'up' ? (
						<ArrowUpRight className="size-3" />
					) : (
						<ArrowDownRight className="size-3" />
					)}
					{change}
				</span>
			</div>
			<div className="mt-4">
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="text-2xl font-bold">{value}</p>
			</div>
			<div className="mt-3 space-y-1">
				<div className="flex justify-between text-xs text-muted-foreground">
					<span>Target: {target}</span>
					<span>{progress}%</span>
				</div>
				<Progress value={progress} className="h-1.5" />
			</div>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	revenue: { label: 'Revenue', color: 'var(--chart-1)' },
};

export default function Main() {
	const stats: StatItem[] = [
		{ title: 'Revenue', value: '$84,232', change: '+24%', trend: 'up', icon: DollarSign, progress: 78, target: '$100k' },
		{ title: 'Orders', value: '2,847', change: '+18%', trend: 'up', icon: ShoppingCart, progress: 85, target: '3,500' },
		{ title: 'Customers', value: '1,234', change: '+12%', trend: 'up', icon: Users, progress: 62, target: '2,000' },
		{ title: 'Avg Order', value: '$29.60', change: '-3%', trend: 'down', icon: CreditCard, progress: 88, target: '$35' },
	];

	const chartData = [
		{ month: 'Jan', revenue: 12000 },
		{ month: 'Feb', revenue: 18000 },
		{ month: 'Mar', revenue: 15000 },
		{ month: 'Apr', revenue: 22000 },
		{ month: 'May', revenue: 28000 },
		{ month: 'Jun', revenue: 24000 },
		{ month: 'Jul', revenue: 32000 },
		{ month: 'Aug', revenue: 38000 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @xl:grid-cols-2">
					<div className="grid gap-4 @sm:grid-cols-2">
						{stats.map((stat, i) => (
							<StatCard key={i} {...stat} />
						))}
					</div>
					<Card>
						<CardHeader className="pb-2">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base">Revenue Trend</CardTitle>
								<span className="text-xs text-muted-foreground">Last 8 months</span>
							</div>
						</CardHeader>
						<CardContent>
							<ChartContainer config={chartConfig} className="h-[300px] w-full">
								<AreaChart data={chartData}>
									<defs>
										<linearGradient id="split31fill" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3} />
											<stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0} />
										</linearGradient>
									</defs>
									<XAxis dataKey="month" tickLine={false} axisLine={false} />
									<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Area
										type="monotone"
										dataKey="revenue"
										stroke="var(--color-revenue)"
										strokeWidth={2}
										fill="url(#split31fill)"
									/>
								</AreaChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
