'use client';

import { PieChart as PieIcon } from 'lucide-react';
import { Pie, PieChart, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type PieDataPoint = {
	name: string;
	value: number;
	fill: string;
};

type PieChartCardProps = {
	title: string;
	description: string;
	data: PieDataPoint[];
	config: ChartConfig;
};

const PieChartCard = ({
	title,
	description,
	data,
	config,
}: PieChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<PieIcon className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<ChartContainer config={config} className="h-[300px] w-full">
				<PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						innerRadius={60}
						outerRadius={100}
						paddingAngle={2}
						dataKey="value"
						nameKey="name"
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.fill} />
						))}
					</Pie>
					<Legend
						verticalAlign="bottom"
						height={36}
						formatter={(value) => (
							<span className="text-sm text-foreground">{value}</span>
						)}
					/>
				</PieChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const chartData: PieDataPoint[] = [
		{ name: 'Electronics', value: 35, fill: 'oklch(0.70 0.18 155)' },
		{ name: 'Clothing', value: 25, fill: 'oklch(0.65 0.16 175)' },
		{ name: 'Home', value: 20, fill: 'oklch(0.62 0.14 200)' },
		{ name: 'Sports', value: 12, fill: 'oklch(0.68 0.15 130)' },
		{ name: 'Other', value: 8, fill: 'oklch(0.58 0.18 190)' },
	];

	const chartConfig: ChartConfig = {
		electronics: { label: 'Electronics', color: 'oklch(0.70 0.18 155)' },
		clothing: { label: 'Clothing', color: 'oklch(0.65 0.16 175)' },
		home: { label: 'Home', color: 'oklch(0.62 0.14 200)' },
		sports: { label: 'Sports', color: 'oklch(0.68 0.15 130)' },
		other: { label: 'Other', color: 'oklch(0.58 0.18 190)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="max-w-xl mx-auto">
					<PieChartCard
						title="Sales by Category"
						description="Revenue distribution across categories"
						data={chartData}
						config={chartConfig}
					/>
				</div>
			</div>
		</section>
	);
}
