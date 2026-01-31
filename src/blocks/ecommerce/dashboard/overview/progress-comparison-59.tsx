'use client';

import { Line, LineChart, XAxis, YAxis } from 'recharts';
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
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

type ComparisonMetric = {
	title: string;
	current: string;
	previous: string;
	change: number;
	progress: number;
	icon: LucideIcon;
};

const ComparisonCard = ({ title, current, previous, change, progress, icon: Icon }: ComparisonMetric) => {
	const isPositive = change >= 0;

	return (
		<Card>
			<CardContent className="p-5">
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-primary/10 p-2">
						<Icon className="size-4 text-primary" />
					</div>
					<span className="font-medium">{title}</span>
				</div>
				<div className="mt-4 flex items-end justify-between">
					<div>
						<p className="text-3xl font-bold">{current}</p>
						<p className="text-xs text-muted-foreground">vs {previous} last month</p>
					</div>
					<Badge
						variant="secondary"
						className={isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}
					>
						{isPositive ? (
							<ArrowUpRight className="mr-0.5 size-3" />
						) : (
							<ArrowDownRight className="mr-0.5 size-3" />
						)}
						{Math.abs(change)}%
					</Badge>
				</div>
				<div className="mt-4 space-y-1">
					<div className="flex items-center justify-between text-xs">
						<span className="text-muted-foreground">Target progress</span>
						<span className="font-medium">{progress}%</span>
					</div>
					<Progress value={progress} className="h-1.5" />
				</div>
			</CardContent>
		</Card>
	);
};

const chartConfig: ChartConfig = {
	current: { label: 'This Month', color: 'var(--chart-1)' },
	previous: { label: 'Last Month', color: 'var(--chart-2)' },
};

export default function Main() {
	const metrics: ComparisonMetric[] = [
		{ title: 'Revenue', current: '$248K', previous: '$194K', change: 28, progress: 83, icon: DollarSign },
		{ title: 'Orders', current: '6,842', previous: '5,608', change: 22, progress: 85, icon: ShoppingCart },
		{ title: 'Customers', current: '3,847', previous: '3,256', change: 18, progress: 96, icon: Users },
		{ title: 'Products Sold', current: '12,456', previous: '10,234', change: 22, progress: 83, icon: Package },
	];

	const chartData = [
		{ week: 'W1', current: 45000, previous: 38000 },
		{ week: 'W2', current: 52000, previous: 42000 },
		{ week: 'W3', current: 68000, previous: 55000 },
		{ week: 'W4', current: 83000, previous: 59000 },
	];

	const overallGrowth = Math.round(
		metrics.reduce((acc, m) => acc + m.change, 0) / metrics.length
	);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{metrics.map((metric, i) => (
							<ComparisonCard key={i} {...metric} />
						))}
					</div>
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Month-over-Month Comparison</CardTitle>
									<CardDescription>Revenue trend comparison</CardDescription>
								</div>
								<Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">
									<TrendingUp className="mr-1 size-3" />
									{overallGrowth}% avg growth
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<ChartContainer config={chartConfig} className="h-[280px] w-full">
								<LineChart data={chartData}>
									<XAxis dataKey="week" tickLine={false} axisLine={false} />
									<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}K`} />
									<ChartTooltip content={<ChartTooltipContent />} />
									<Line
										type="monotone"
										dataKey="previous"
										stroke="var(--color-previous)"
										strokeWidth={2}
										strokeDasharray="5 5"
										dot={false}
									/>
									<Line
										type="monotone"
										dataKey="current"
										stroke="var(--color-current)"
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</ChartContainer>
							<div className="mt-4 flex justify-center gap-6">
								<div className="flex items-center gap-2">
									<div className="h-0.5 w-4 bg-[var(--chart-1)]" />
									<span className="text-sm text-muted-foreground">This Month</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="h-0.5 w-4 border-t-2 border-dashed border-[var(--chart-2)]" />
									<span className="text-sm text-muted-foreground">Last Month</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
