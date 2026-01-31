'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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

type ChartDataItem = {
	category: string;
	sales: number;
	returns: number;
};

type LegendItem = {
	label: string;
	color: string;
};

const ChartLegend = ({ items }: { items: LegendItem[] }) => (
	<div className="flex flex-wrap gap-4">
		{items.map((item, i) => (
			<div key={i} className="flex items-center gap-2">
				<div
					className="size-3 rounded-full"
					style={{ backgroundColor: item.color }}
				/>
				<span className="text-sm text-muted-foreground">{item.label}</span>
			</div>
		))}
	</div>
);

const chartConfig: ChartConfig = {
	sales: {
		label: 'Sales',
		color: 'var(--chart-1)',
	},
	returns: {
		label: 'Returns',
		color: 'var(--chart-5)',
	},
};

export default function Main() {
	const chartData: ChartDataItem[] = [
		{ category: 'Electronics', sales: 45200, returns: 2100 },
		{ category: 'Clothing', sales: 38400, returns: 3200 },
		{ category: 'Home & Garden', sales: 28900, returns: 1400 },
		{ category: 'Sports', sales: 22100, returns: 890 },
		{ category: 'Books', sales: 18600, returns: 420 },
		{ category: 'Toys', sales: 15400, returns: 680 },
	];

	const legendItems: LegendItem[] = [
		{ label: 'Sales', color: 'var(--chart-1)' },
		{ label: 'Returns', color: 'var(--chart-5)' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<div className="flex flex-col gap-4 @sm:flex-row @sm:items-start @sm:justify-between">
							<div>
								<CardTitle className="text-lg">Sales by Category</CardTitle>
								<CardDescription>
									Product category performance comparison
								</CardDescription>
							</div>
							<ChartLegend items={legendItems} />
						</div>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[320px] w-full">
							<BarChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="category"
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
								<ChartTooltip
									content={<ChartTooltipContent indicator="dot" />}
								/>
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
			</div>
		</section>
	);
}
