'use client';

import {
	Area,
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ReferenceLine,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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
} from '@/components/ui/chart';

type PerformanceData = {
	quarter: string;
	actual: number;
	forecast: number;
};

type InsightProps = {
	label: string;
	value: string;
	status: 'up' | 'down' | 'neutral';
};

const Insight = ({ label, value, status }: InsightProps) => {
	const statusConfig = {
		up: {
			icon: ArrowUpRight,
			class: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
		},
		down: {
			icon: ArrowDownRight,
			class: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
		},
		neutral: {
			icon: Minus,
			class: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
		},
	};
	const Icon = statusConfig[status].icon;

	return (
		<div className="flex items-center justify-between rounded-lg border border-border/50 p-3">
			<span className="text-sm text-muted-foreground">{label}</span>
			<Badge variant="outline" className={statusConfig[status].class}>
				<Icon className="mr-1 size-3" />
				{value}
			</Badge>
		</div>
	);
};

const chartConfig: ChartConfig = {
	actual: {
		label: 'Actual Revenue',
		color: 'var(--chart-1)',
	},
	forecast: {
		label: 'Forecast',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const insights: InsightProps[] = [
		{ label: 'Q4 vs Forecast', value: '+8.2%', status: 'up' },
		{ label: 'YoY Growth', value: '+15.4%', status: 'up' },
		{ label: 'Q3 vs Q2', value: '-2.1%', status: 'down' },
		{ label: 'Market Average', value: '0.0%', status: 'neutral' },
	];

	const chartData: PerformanceData[] = [
		{ quarter: 'Q1 2023', actual: 2.4, forecast: 2.5 },
		{ quarter: 'Q2 2023', actual: 2.8, forecast: 2.7 },
		{ quarter: 'Q3 2023', actual: 2.6, forecast: 2.9 },
		{ quarter: 'Q4 2023', actual: 3.2, forecast: 3.1 },
		{ quarter: 'Q1 2024', actual: 3.1, forecast: 3.0 },
		{ quarter: 'Q2 2024', actual: 3.5, forecast: 3.3 },
		{ quarter: 'Q3 2024', actual: 3.4, forecast: 3.5 },
		{ quarter: 'Q4 2024', actual: 3.8, forecast: 3.5 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Forecast Accuracy Report
						</CardTitle>
						<CardDescription>
							Actual revenue performance vs forecast predictions
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-8 @lg:grid-cols-[1fr,260px]">
							<ChartContainer config={chartConfig} className="h-[340px] w-full">
								<AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
									<defs>
										<linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
											<stop
												offset="5%"
												stopColor="var(--color-actual)"
												stopOpacity={0.4}
											/>
											<stop
												offset="95%"
												stopColor="var(--color-actual)"
												stopOpacity={0}
											/>
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" vertical={false} />
									<XAxis
										dataKey="quarter"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										tickFormatter={(value) => `$${value}M`}
										domain={[2, 4]}
									/>
									<ReferenceLine
										x="Q1 2024"
										stroke="var(--border)"
										strokeDasharray="3 3"
										label={{
											value: 'Current Year',
											position: 'top',
											fill: 'var(--muted-foreground)',
											fontSize: 11,
										}}
									/>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Area
										type="monotone"
										dataKey="actual"
										stroke="var(--color-actual)"
										strokeWidth={2.5}
										fill="url(#actualGrad)"
									/>
									<Area
										type="monotone"
										dataKey="forecast"
										stroke="var(--color-forecast)"
										strokeWidth={2}
										strokeDasharray="5 5"
										fill="transparent"
									/>
								</AreaChart>
							</ChartContainer>
							<div className="space-y-3">
								<h4 className="text-sm font-medium">Key Insights</h4>
								{insights.map((insight, i) => (
									<Insight key={i} {...insight} />
								))}
								<div className="mt-4 rounded-lg bg-muted/50 p-4">
									<p className="text-xs text-muted-foreground">
										Forecast accuracy for 2024 is{' '}
										<span className="font-medium text-foreground">94.2%</span>,
										exceeding the target of 90%.
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
