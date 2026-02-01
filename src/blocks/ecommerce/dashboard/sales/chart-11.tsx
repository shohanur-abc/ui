'use client';

import { ScatterChart as ScatterIcon } from 'lucide-react';
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	ZAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type ScatterDataPoint = {
	price: number;
	sales: number;
	product: string;
};

type ScatterChartCardProps = {
	title: string;
	description: string;
	data: ScatterDataPoint[];
	config: ChartConfig;
};

const ScatterChartCard = ({
	title,
	description,
	data,
	config,
}: ScatterChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<ScatterIcon className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<ChartContainer config={config} className="h-[300px] w-full">
				<ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
					<CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
					<XAxis
						type="number"
						dataKey="price"
						name="Price"
						unit="$"
						tickLine={false}
						axisLine={false}
						className="text-xs"
					/>
					<YAxis
						type="number"
						dataKey="sales"
						name="Sales"
						tickLine={false}
						axisLine={false}
						className="text-xs"
					/>
					<ZAxis range={[60, 200]} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Scatter data={data} fill="var(--color-scatter)" fillOpacity={0.7} />
				</ScatterChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const chartData: ScatterDataPoint[] = [
		{ price: 25, sales: 450, product: 'Basic Tee' },
		{ price: 45, sales: 380, product: 'Premium Shirt' },
		{ price: 89, sales: 220, product: 'Designer Jacket' },
		{ price: 35, sales: 520, product: 'Casual Pants' },
		{ price: 65, sales: 280, product: 'Running Shoes' },
		{ price: 120, sales: 150, product: 'Smart Watch' },
		{ price: 55, sales: 340, product: 'Backpack' },
		{ price: 28, sales: 620, product: 'Socks Pack' },
		{ price: 75, sales: 190, product: 'Sunglasses' },
		{ price: 42, sales: 410, product: 'Cap' },
	];

	const chartConfig: ChartConfig = {
		scatter: { label: 'Product', color: 'oklch(0.70 0.18 155)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<ScatterChartCard
					title="Price vs Sales Volume"
					description="Product pricing analysis"
					data={chartData}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
