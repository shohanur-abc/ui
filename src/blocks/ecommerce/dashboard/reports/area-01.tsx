'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';

type SalesData = {
	date: string;
	online: number;
	inStore: number;
};

type MetricProps = {
	label: string;
	value: string;
	badge: string;
	positive: boolean;
};

const MetricItem = ({ label, value, badge, positive }: MetricProps) => (
	<div className="flex items-center gap-2">
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-lg font-bold">{value}</p>
		</div>
		<Badge
			variant="outline"
			className={
				positive
					? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
					: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
			}
		>
			{badge}
		</Badge>
	</div>
);

const chartConfig: ChartConfig = {
	online: {
		label: 'Online Sales',
		color: 'var(--chart-1)',
	},
	inStore: {
		label: 'In-Store Sales',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const metrics: MetricProps[] = [
		{ label: 'Online Sales', value: '$845.2K', badge: '+22.5%', positive: true },
		{ label: 'In-Store Sales', value: '$412.8K', badge: '+8.3%', positive: true },
	];

	const chartData: SalesData[] = [
		{ date: 'Jan', online: 62000, inStore: 35000 },
		{ date: 'Feb', online: 68000, inStore: 32000 },
		{ date: 'Mar', online: 72000, inStore: 38000 },
		{ date: 'Apr', online: 78000, inStore: 36000 },
		{ date: 'May', online: 82000, inStore: 40000 },
		{ date: 'Jun', online: 88000, inStore: 42000 },
		{ date: 'Jul', online: 75000, inStore: 38000 },
		{ date: 'Aug', online: 85000, inStore: 35000 },
		{ date: 'Sep', online: 92000, inStore: 44000 },
		{ date: 'Oct', online: 98000, inStore: 42000 },
		{ date: 'Nov', online: 115000, inStore: 48000 },
		{ date: 'Dec', online: 125000, inStore: 52000 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-4 @sm:flex-row @sm:items-start @sm:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Sales Channel Report
							</CardTitle>
							<CardDescription>
								Comparison of online vs in-store sales performance
							</CardDescription>
						</div>
						<div className="flex gap-6">
							{metrics.map((m, i) => (
								<MetricItem key={i} {...m} />
							))}
						</div>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[350px] w-full">
							<AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
								<defs>
									<linearGradient id="onlineGrad" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="var(--color-online)" stopOpacity={0.4} />
										<stop offset="95%" stopColor="var(--color-online)" stopOpacity={0} />
									</linearGradient>
									<linearGradient id="storeGrad" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="var(--color-inStore)" stopOpacity={0.4} />
										<stop offset="95%" stopColor="var(--color-inStore)" stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="date"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => `$${value / 1000}k`}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Area
									type="monotone"
									dataKey="online"
									stroke="var(--color-online)"
									strokeWidth={2}
									fill="url(#onlineGrad)"
								/>
								<Area
									type="monotone"
									dataKey="inStore"
									stroke="var(--color-inStore)"
									strokeWidth={2}
									fill="url(#storeGrad)"
								/>
							</AreaChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
