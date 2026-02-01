'use client';

import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
	ArrowUpRight,
	Calendar,
	DollarSign,
	TrendingUp,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type SummaryItem = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
};

const SummaryCard = ({ title, value, change, icon: Icon }: SummaryItem) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card/50 p-4">
		<div className="rounded-lg bg-primary/10 p-2.5">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-sm text-muted-foreground">{title}</p>
			<p className="text-2xl font-bold">{value}</p>
		</div>
		<Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">
			<ArrowUpRight className="mr-1 size-3" />
			{change}
		</Badge>
	</div>
);

const lineConfig: ChartConfig = {
	sales: { label: 'Sales', color: 'var(--chart-1)' },
	orders: { label: 'Orders', color: 'var(--chart-2)' },
};

const barConfig: ChartConfig = {
	revenue: { label: 'Revenue', color: 'var(--chart-1)' },
};

export default function Main() {
	const summaries: SummaryItem[] = [
		{
			title: 'Monthly Revenue',
			value: '$156,432',
			change: '+28%',
			icon: DollarSign,
		},
		{ title: 'Growth Rate', value: '24.5%', change: '+4.2%', icon: TrendingUp },
	];

	const lineData = [
		{ name: 'Jan', sales: 4000, orders: 240 },
		{ name: 'Feb', sales: 5200, orders: 310 },
		{ name: 'Mar', sales: 4800, orders: 290 },
		{ name: 'Apr', sales: 6100, orders: 350 },
		{ name: 'May', sales: 7200, orders: 420 },
		{ name: 'Jun', sales: 6800, orders: 390 },
	];

	const barData = [
		{ category: 'Electronics', revenue: 45000 },
		{ category: 'Clothing', revenue: 32000 },
		{ category: 'Home', revenue: 28000 },
		{ category: 'Sports', revenue: 19000 },
		{ category: 'Books', revenue: 12000 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @xl:grid-cols-2">
					<div className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2">
							{summaries.map((item, i) => (
								<SummaryCard key={i} {...item} />
							))}
						</div>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Sales vs Orders</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer
									config={lineConfig}
									className="h-[200px] w-full"
								>
									<LineChart data={lineData}>
										<XAxis dataKey="name" tickLine={false} axisLine={false} />
										<ChartTooltip content={<ChartTooltipContent />} />
										<Line
											type="monotone"
											dataKey="sales"
											stroke="var(--color-sales)"
											strokeWidth={2}
											dot={false}
										/>
										<Line
											type="monotone"
											dataKey="orders"
											stroke="var(--color-orders)"
											strokeWidth={2}
											dot={false}
										/>
									</LineChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
					<Card>
						<CardHeader className="pb-2">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base">Revenue by Category</CardTitle>
								<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
									<Calendar className="size-3" />
									This Month
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<ChartContainer config={barConfig} className="h-[280px] w-full">
								<BarChart data={barData} layout="vertical">
									<XAxis
										type="number"
										tickLine={false}
										axisLine={false}
										tickFormatter={(v) => `$${v / 1000}k`}
									/>
									<YAxis
										dataKey="category"
										type="category"
										tickLine={false}
										axisLine={false}
										width={80}
									/>
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Bar
										dataKey="revenue"
										fill="var(--color-revenue)"
										radius={[0, 4, 4, 0]}
									/>
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
