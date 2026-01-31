'use client';

import { Circle } from 'lucide-react';
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type DonutDataPoint = {
	name: string;
	value: number;
	color: string;
};

type DonutChartCardProps = {
	title: string;
	centerLabel: string;
	centerValue: string;
	data: DonutDataPoint[];
	config: ChartConfig;
};

const DonutChartCard = ({
	title,
	centerLabel,
	centerValue,
	data,
	config,
}: DonutChartCardProps) => {
	const total = data.reduce((sum, item) => sum + item.value, 0);

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardHeader className="flex flex-row items-center gap-3 pb-2">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<Circle className="size-4" />
				</div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-6 items-center">
					<ChartContainer config={config} className="h-[250px] w-full">
						<PieChart>
							<ChartTooltip content={<ChartTooltipContent />} />
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								innerRadius={70}
								outerRadius={100}
								paddingAngle={2}
								dataKey="value"
								nameKey="name"
							>
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<text
								x="50%"
								y="45%"
								textAnchor="middle"
								className="fill-foreground text-2xl font-bold"
							>
								{centerValue}
							</text>
							<text
								x="50%"
								y="58%"
								textAnchor="middle"
								className="fill-muted-foreground text-sm"
							>
								{centerLabel}
							</text>
						</PieChart>
					</ChartContainer>
					<div className="space-y-3">
						{data.map((item, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
							>
								<div className="flex items-center gap-3">
									<div
										className="size-3 rounded-full"
										style={{ backgroundColor: item.color }}
									/>
									<span className="font-medium">{item.name}</span>
								</div>
								<div className="text-right">
									<span className="font-semibold">
										${(item.value / 1000).toFixed(1)}k
									</span>
									<span className="text-xs text-muted-foreground ml-2">
										({((item.value / total) * 100).toFixed(0)}%)
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const chartData: DonutDataPoint[] = [
		{ name: 'Online Store', value: 68500, color: 'oklch(0.70 0.18 155)' },
		{ name: 'Mobile App', value: 42300, color: 'oklch(0.65 0.16 175)' },
		{ name: 'Marketplace', value: 28200, color: 'oklch(0.62 0.14 200)' },
		{ name: 'Wholesale', value: 15800, color: 'oklch(0.68 0.15 130)' },
	];

	const chartConfig: ChartConfig = {
		value: { label: 'Revenue', color: 'oklch(0.70 0.18 155)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<DonutChartCard
					title="Revenue by Channel"
					centerLabel="Total Revenue"
					centerValue="$154.8k"
					data={chartData}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
