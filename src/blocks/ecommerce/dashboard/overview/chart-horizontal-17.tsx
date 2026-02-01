'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

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
	product: string;
	sales: number;
};

const chartConfig: ChartConfig = {
	sales: {
		label: 'Sales',
		color: 'var(--chart-1)',
	},
};

export default function Main() {
	const chartData: ChartDataItem[] = [
		{ product: 'Wireless Headphones Pro', sales: 12450 },
		{ product: 'Smart Watch Ultra', sales: 10280 },
		{ product: 'Laptop Stand Ergonomic', sales: 8920 },
		{ product: 'USB-C Hub Premium', sales: 7640 },
		{ product: 'Mechanical Keyboard RGB', sales: 6890 },
		{ product: 'Gaming Mouse Wireless', sales: 5420 },
		{ product: 'Webcam HD 4K', sales: 4850 },
		{ product: 'Monitor Light Bar', sales: 4120 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Top Selling Products</CardTitle>
						<CardDescription>
							Best performing products by revenue
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[360px] w-full">
							<BarChart
								data={chartData}
								layout="vertical"
								margin={{ left: 0, right: 24 }}
							>
								<XAxis
									type="number"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => `$${value / 1000}k`}
								/>
								<YAxis
									type="category"
									dataKey="product"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									width={160}
									tick={{ fontSize: 12 }}
								/>
								<ChartTooltip
									content={<ChartTooltipContent hideLabel />}
									formatter={(value) => [
										`$${Number(value).toLocaleString()}`,
										'Sales',
									]}
								/>
								<Bar
									dataKey="sales"
									fill="var(--color-sales)"
									radius={[0, 4, 4, 0]}
								/>
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
