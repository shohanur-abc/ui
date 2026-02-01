'use client';

import {
	Area,
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from 'recharts';
import { Clock } from 'lucide-react';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type QuarterData = {
	month: string;
	q1: number;
	q2: number;
	q3: number;
	q4: number;
};

type QuarterSummaryProps = {
	quarter: string;
	total: string;
	growth: string;
	isActive?: boolean;
};

const QuarterSummary = ({
	quarter,
	total,
	growth,
	isActive,
}: QuarterSummaryProps) => (
	<div
		className={`rounded-lg border p-4 transition-colors ${isActive ? 'border-primary bg-primary/5' : 'border-border/30 bg-muted/20'}`}
	>
		<p className="text-sm font-medium text-muted-foreground">{quarter}</p>
		<p className="mt-1 text-xl font-bold">{total}</p>
		<p className="text-xs text-emerald-500">{growth}</p>
	</div>
);

const chartConfig: ChartConfig = {
	q1: { label: 'Q1', color: 'var(--chart-1)' },
	q2: { label: 'Q2', color: 'var(--chart-2)' },
	q3: { label: 'Q3', color: 'var(--chart-3)' },
	q4: { label: 'Q4', color: 'var(--chart-4)' },
};

export default function Main() {
	const summaries: QuarterSummaryProps[] = [
		{ quarter: 'Q1 2024', total: '$3.2M', growth: '+12.4% YoY' },
		{ quarter: 'Q2 2024', total: '$3.8M', growth: '+18.2% YoY' },
		{
			quarter: 'Q3 2024',
			total: '$4.1M',
			growth: '+15.8% YoY',
			isActive: true,
		},
		{ quarter: 'Q4 2024 (Est)', total: '$4.6M', growth: '+14.2% YoY' },
	];

	const revenueData: QuarterData[] = [
		{ month: 'Month 1', q1: 980000, q2: 1150000, q3: 1280000, q4: 1420000 },
		{ month: 'Month 2', q1: 1050000, q2: 1280000, q3: 1380000, q4: 1550000 },
		{ month: 'Month 3', q1: 1170000, q2: 1370000, q3: 1420000, q4: 1630000 },
	];

	const ordersData: QuarterData[] = [
		{ month: 'Month 1', q1: 8500, q2: 9800, q3: 10500, q4: 11200 },
		{ month: 'Month 2', q1: 9200, q2: 10500, q3: 11200, q4: 12100 },
		{ month: 'Month 3', q1: 9800, q2: 11200, q3: 11800, q4: 12800 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-3 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Clock className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Quarter-over-Quarter Comparison
								</CardTitle>
								<CardDescription>
									Performance trends across fiscal quarters
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid grid-cols-2 gap-4 @lg:grid-cols-4">
							{summaries.map((s, i) => (
								<QuarterSummary key={i} {...s} />
							))}
						</div>
						<Tabs defaultValue="revenue">
							<TabsList>
								<TabsTrigger value="revenue">Revenue</TabsTrigger>
								<TabsTrigger value="orders">Orders</TabsTrigger>
							</TabsList>
							<TabsContent value="revenue" className="mt-4">
								<ChartContainer
									config={chartConfig}
									className="h-[300px] w-full"
								>
									<AreaChart
										data={revenueData}
										margin={{ left: 12, right: 12 }}
									>
										<CartesianGrid strokeDasharray="3 3" vertical={false} />
										<XAxis dataKey="month" tickLine={false} axisLine={false} />
										<YAxis
											tickLine={false}
											axisLine={false}
											tickFormatter={(v) => `$${v / 1000000}M`}
										/>
										<ChartTooltip content={<ChartTooltipContent />} />
										<ChartLegend content={<ChartLegendContent />} />
										<Area
											type="monotone"
											dataKey="q1"
											stroke="var(--color-q1)"
											fill="var(--color-q1)"
											fillOpacity={0.2}
										/>
										<Area
											type="monotone"
											dataKey="q2"
											stroke="var(--color-q2)"
											fill="var(--color-q2)"
											fillOpacity={0.2}
										/>
										<Area
											type="monotone"
											dataKey="q3"
											stroke="var(--color-q3)"
											fill="var(--color-q3)"
											fillOpacity={0.2}
										/>
										<Area
											type="monotone"
											dataKey="q4"
											stroke="var(--color-q4)"
											fill="var(--color-q4)"
											fillOpacity={0.2}
										/>
									</AreaChart>
								</ChartContainer>
							</TabsContent>
							<TabsContent value="orders" className="mt-4">
								<ChartContainer
									config={chartConfig}
									className="h-[300px] w-full"
								>
									<AreaChart data={ordersData} margin={{ left: 12, right: 12 }}>
										<CartesianGrid strokeDasharray="3 3" vertical={false} />
										<XAxis dataKey="month" tickLine={false} axisLine={false} />
										<YAxis
											tickLine={false}
											axisLine={false}
											tickFormatter={(v) => `${v / 1000}K`}
										/>
										<ChartTooltip content={<ChartTooltipContent />} />
										<ChartLegend content={<ChartLegendContent />} />
										<Area
											type="monotone"
											dataKey="q1"
											stroke="var(--color-q1)"
											fill="var(--color-q1)"
											fillOpacity={0.2}
										/>
										<Area
											type="monotone"
											dataKey="q2"
											stroke="var(--color-q2)"
											fill="var(--color-q2)"
											fillOpacity={0.2}
										/>
										<Area
											type="monotone"
											dataKey="q3"
											stroke="var(--color-q3)"
											fill="var(--color-q3)"
											fillOpacity={0.2}
										/>
										<Area
											type="monotone"
											dataKey="q4"
											stroke="var(--color-q4)"
											fill="var(--color-q4)"
											fillOpacity={0.2}
										/>
									</AreaChart>
								</ChartContainer>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
