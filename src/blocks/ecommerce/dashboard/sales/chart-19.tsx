'use client';

import { Sparkles } from 'lucide-react';
import {
	Bar,
	BarChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Cell,
	ReferenceLine,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';

type VarianceDataPoint = {
	category: string;
	actual: number;
	target: number;
	variance: number;
};

type VarianceChartCardProps = {
	title: string;
	description: string;
	data: VarianceDataPoint[];
	config: ChartConfig;
};

const VarianceChartCard = ({
	title,
	description,
	data,
	config,
}: VarianceChartCardProps) => {
	const totalVariance = data.reduce((sum, d) => sum + d.variance, 0);
	const isPositive = totalVariance >= 0;

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-primary/10 text-primary">
						<Sparkles className="size-4" />
					</div>
					<div>
						<CardTitle className="text-base font-semibold">{title}</CardTitle>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
				</div>
				<Badge variant={isPositive ? 'default' : 'destructive'}>
					{isPositive ? '+' : ''}${(totalVariance / 1000).toFixed(1)}k variance
				</Badge>
			</CardHeader>
			<CardContent>
				<ChartContainer config={config} className="h-[300px] w-full">
					<BarChart
						data={data}
						margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
					>
						<CartesianGrid
							strokeDasharray="3 3"
							className="stroke-border/50"
							vertical={false}
						/>
						<XAxis
							dataKey="category"
							tickLine={false}
							axisLine={false}
							className="text-xs"
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) =>
								`${value > 0 ? '+' : ''}$${value / 1000}k`
							}
							className="text-xs"
						/>
						<ReferenceLine y={0} stroke="var(--border)" />
						<ChartTooltip content={<ChartTooltipContent />} />
						<Bar dataKey="variance" radius={[4, 4, 4, 4]}>
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={
										entry.variance >= 0
											? 'oklch(0.70 0.18 155)'
											: 'oklch(0.55 0.22 25)'
									}
								/>
							))}
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const chartData: VarianceDataPoint[] = [
		{ category: 'Electronics', actual: 58000, target: 50000, variance: 8000 },
		{ category: 'Clothing', actual: 42000, target: 45000, variance: -3000 },
		{ category: 'Home', actual: 35000, target: 30000, variance: 5000 },
		{ category: 'Sports', actual: 22000, target: 25000, variance: -3000 },
		{ category: 'Beauty', actual: 28000, target: 20000, variance: 8000 },
		{ category: 'Books', actual: 12000, target: 15000, variance: -3000 },
	];

	const chartConfig: ChartConfig = {
		variance: { label: 'Variance', color: 'oklch(0.70 0.18 155)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<VarianceChartCard
					title="Target Variance"
					description="Actual vs target by category"
					data={chartData}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
