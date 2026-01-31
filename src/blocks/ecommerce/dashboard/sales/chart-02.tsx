'use client';

import { BarChart3 } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type BarDataPoint = {
	day: string;
	sales: number;
	returns: number;
};

type BarChartCardProps = {
	title: string;
	description: string;
	data: BarDataPoint[];
	config: ChartConfig;
};

const BarChartCard = ({
	title,
	description,
	data,
	config,
}: BarChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<BarChart3 className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<ChartContainer config={config} className="h-[300px] w-full">
				<BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
					<CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
					<XAxis
						dataKey="day"
						tickLine={false}
						axisLine={false}
						className="text-xs"
					/>
					<YAxis
						tickLine={false}
						axisLine={false}
						className="text-xs"
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar
						dataKey="sales"
						fill="var(--color-sales)"
						radius={[4, 4, 0, 0]}
					/>
					<Bar
						dataKey="returns"
						fill="var(--color-returns)"
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const chartData: BarDataPoint[] = [
		{ day: 'Mon', sales: 186, returns: 12 },
		{ day: 'Tue', sales: 205, returns: 8 },
		{ day: 'Wed', sales: 237, returns: 15 },
		{ day: 'Thu', sales: 273, returns: 10 },
		{ day: 'Fri', sales: 348, returns: 18 },
		{ day: 'Sat', sales: 412, returns: 22 },
		{ day: 'Sun', sales: 289, returns: 14 },
	];

	const chartConfig: ChartConfig = {
		sales: {
			label: 'Sales',
			color: 'oklch(0.70 0.18 155)',
		},
		returns: {
			label: 'Returns',
			color: 'oklch(0.55 0.22 25)',
		},
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BarChartCard
					title="Weekly Sales vs Returns"
					description="Daily breakdown of sales and returns"
					data={chartData}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
