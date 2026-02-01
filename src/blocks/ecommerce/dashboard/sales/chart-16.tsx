'use client';

import { Calendar } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type WaterfallDataPoint = {
	name: string;
	value: number;
	type: 'start' | 'increase' | 'decrease' | 'total';
};

type WaterfallChartCardProps = {
	title: string;
	description: string;
	data: WaterfallDataPoint[];
	config: ChartConfig;
};

const WaterfallChartCard = ({
	title,
	description,
	data,
	config,
}: WaterfallChartCardProps) => {
	let cumulative = 0;
	const processedData = data.map((item) => {
		if (item.type === 'start' || item.type === 'total') {
			cumulative = item.value;
			return { ...item, start: 0, end: item.value };
		}
		const start = cumulative;
		cumulative += item.value;
		return { ...item, start, end: cumulative };
	});

	const getColor = (type: string) => {
		switch (type) {
			case 'increase':
				return 'oklch(0.70 0.18 155)';
			case 'decrease':
				return 'oklch(0.55 0.22 25)';
			default:
				return 'oklch(0.60 0.012 155)';
		}
	};

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardHeader className="flex flex-row items-center gap-3 pb-2">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<Calendar className="size-4" />
				</div>
				<div>
					<CardTitle className="text-base font-semibold">{title}</CardTitle>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</CardHeader>
			<CardContent>
				<ChartContainer config={config} className="h-[300px] w-full">
					<BarChart
						data={processedData}
						margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
					>
						<CartesianGrid
							strokeDasharray="3 3"
							className="stroke-border/50"
							vertical={false}
						/>
						<XAxis
							dataKey="name"
							tickLine={false}
							axisLine={false}
							className="text-xs"
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `$${value / 1000}k`}
							className="text-xs"
						/>
						<ChartTooltip content={<ChartTooltipContent />} />
						<Bar dataKey="end" radius={[4, 4, 0, 0]}>
							{processedData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={getColor(entry.type)} />
							))}
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const chartData: WaterfallDataPoint[] = [
		{ name: 'Jan Start', value: 50000, type: 'start' },
		{ name: 'New Sales', value: 28000, type: 'increase' },
		{ name: 'Upsells', value: 12000, type: 'increase' },
		{ name: 'Refunds', value: -8000, type: 'decrease' },
		{ name: 'Discounts', value: -5000, type: 'decrease' },
		{ name: 'Jan End', value: 77000, type: 'total' },
	];

	const chartConfig: ChartConfig = {
		end: { label: 'Amount', color: 'oklch(0.70 0.18 155)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<WaterfallChartCard
					title="Revenue Breakdown"
					description="Monthly revenue waterfall analysis"
					data={chartData}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
