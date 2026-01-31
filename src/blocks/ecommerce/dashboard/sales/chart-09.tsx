'use client';

import { BarChartHorizontal } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type HorizontalBarData = {
	name: string;
	value: number;
	color: string;
};

type HorizontalBarChartCardProps = {
	title: string;
	description: string;
	data: HorizontalBarData[];
	config: ChartConfig;
};

const HorizontalBarChartCard = ({
	title,
	description,
	data,
	config,
}: HorizontalBarChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<BarChartHorizontal className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<ChartContainer config={config} className="h-[300px] w-full">
				<BarChart
					data={data}
					layout="vertical"
					margin={{ top: 20, right: 40, bottom: 20, left: 80 }}
				>
					<XAxis
						type="number"
						tickLine={false}
						axisLine={false}
						tickFormatter={(value) => `$${value / 1000}k`}
						className="text-xs"
					/>
					<YAxis
						type="category"
						dataKey="name"
						tickLine={false}
						axisLine={false}
						className="text-xs"
						width={70}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar dataKey="value" radius={[0, 4, 4, 0]}>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Bar>
				</BarChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const chartData: HorizontalBarData[] = [
		{ name: 'Direct', value: 48500, color: 'oklch(0.70 0.18 155)' },
		{ name: 'Organic', value: 35200, color: 'oklch(0.65 0.16 175)' },
		{ name: 'Paid Ads', value: 28400, color: 'oklch(0.62 0.14 200)' },
		{ name: 'Social', value: 22100, color: 'oklch(0.68 0.15 130)' },
		{ name: 'Referral', value: 15800, color: 'oklch(0.58 0.18 190)' },
		{ name: 'Email', value: 12400, color: 'oklch(0.72 0.12 220)' },
	];

	const chartConfig: ChartConfig = {
		value: { label: 'Revenue', color: 'oklch(0.70 0.18 155)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<HorizontalBarChartCard
					title="Revenue by Source"
					description="Traffic source performance"
					data={chartData}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
