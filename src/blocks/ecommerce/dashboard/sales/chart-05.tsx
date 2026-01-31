'use client';

import { Target } from 'lucide-react';
import {
	RadialBar,
	RadialBarChart,
	PolarAngleAxis,
	ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

type RadialDataPoint = {
	name: string;
	value: number;
	target: number;
	fill: string;
};

type RadialChartCardProps = {
	title: string;
	description: string;
	data: RadialDataPoint[];
	config: ChartConfig;
};

const RadialChartCard = ({
	title,
	description,
	data,
	config,
}: RadialChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Target className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
				{data.map((item, idx) => {
					const percentage = (item.value / item.target) * 100;
					return (
						<div key={idx} className="text-center">
							<ChartContainer config={config} className="h-[120px] w-full">
								<RadialBarChart
									cx="50%"
									cy="50%"
									innerRadius="70%"
									outerRadius="100%"
									data={[{ value: percentage, fill: item.fill }]}
									startAngle={90}
									endAngle={-270}
								>
									<PolarAngleAxis
										type="number"
										domain={[0, 100]}
										angleAxisId={0}
										tick={false}
									/>
									<RadialBar
										background={{ fill: 'var(--muted)' }}
										dataKey="value"
										cornerRadius={10}
									/>
									<text
										x="50%"
										y="50%"
										textAnchor="middle"
										dominantBaseline="middle"
										className="fill-foreground text-lg font-bold"
									>
										{percentage.toFixed(0)}%
									</text>
								</RadialBarChart>
							</ChartContainer>
							<p className="text-sm font-medium mt-2">{item.name}</p>
							<p className="text-xs text-muted-foreground">
								${(item.value / 1000).toFixed(0)}k / ${(item.target / 1000).toFixed(0)}k
							</p>
						</div>
					);
				})}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const chartData: RadialDataPoint[] = [
		{ name: 'Q1 Target', value: 85000, target: 100000, fill: 'oklch(0.70 0.18 155)' },
		{ name: 'Q2 Target', value: 72000, target: 100000, fill: 'oklch(0.65 0.16 175)' },
		{ name: 'Q3 Target', value: 95000, target: 100000, fill: 'oklch(0.62 0.14 200)' },
		{ name: 'Q4 Target', value: 45000, target: 100000, fill: 'oklch(0.68 0.15 130)' },
	];

	const chartConfig: ChartConfig = {
		value: { label: 'Progress', color: 'oklch(0.70 0.18 155)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<RadialChartCard
					title="Quarterly Targets"
					description="Progress towards quarterly sales goals"
					data={chartData}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
