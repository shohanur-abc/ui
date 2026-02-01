'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';

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

type CategoryData = {
	category: string;
	sales: number;
	fill: string;
};

type LegendItemProps = {
	color: string;
	label: string;
	value: string;
};

const LegendItem = ({ color, label, value }: LegendItemProps) => (
	<div className="flex items-center gap-2">
		<div className={`size-3 rounded-full ${color}`} />
		<span className="text-sm text-muted-foreground">{label}</span>
		<span className="text-sm font-medium">{value}</span>
	</div>
);

const chartConfig: ChartConfig = {
	sales: {
		label: 'Sales',
	},
	electronics: {
		label: 'Electronics',
		color: 'oklch(0.7 0.2 280)',
	},
	fashion: {
		label: 'Fashion',
		color: 'oklch(0.68 0.18 250)',
	},
	home: {
		label: 'Home & Living',
		color: 'oklch(0.72 0.16 200)',
	},
	beauty: {
		label: 'Beauty',
		color: 'oklch(0.65 0.2 320)',
	},
	sports: {
		label: 'Sports',
		color: 'oklch(0.7 0.18 160)',
	},
};

export default function Main() {
	const chartData: CategoryData[] = [
		{
			category: 'Electronics',
			sales: 128500,
			fill: 'var(--color-electronics)',
		},
		{ category: 'Fashion', sales: 89200, fill: 'var(--color-fashion)' },
		{ category: 'Home & Living', sales: 67800, fill: 'var(--color-home)' },
		{ category: 'Beauty', sales: 52300, fill: 'var(--color-beauty)' },
		{ category: 'Sports', sales: 45600, fill: 'var(--color-sports)' },
	];

	const legendItems: LegendItemProps[] = [
		{
			color: 'bg-[oklch(0.7_0.2_280)]',
			label: 'Electronics',
			value: '$128.5k',
		},
		{ color: 'bg-[oklch(0.68_0.18_250)]', label: 'Fashion', value: '$89.2k' },
		{ color: 'bg-[oklch(0.72_0.16_200)]', label: 'Home', value: '$67.8k' },
		{ color: 'bg-[oklch(0.65_0.2_320)]', label: 'Beauty', value: '$52.3k' },
		{ color: 'bg-[oklch(0.7_0.18_160)]', label: 'Sports', value: '$45.6k' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Sales by Category
						</CardTitle>
						<CardDescription>
							Total sales distribution across product categories
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex flex-wrap gap-4 @lg:gap-6">
							{legendItems.map((item, i) => (
								<LegendItem key={i} {...item} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[300px] w-full">
							<BarChart
								data={chartData}
								layout="vertical"
								margin={{ left: 100, right: 20 }}
							>
								<CartesianGrid strokeDasharray="3 3" horizontal={false} />
								<XAxis
									type="number"
									tickLine={false}
									axisLine={false}
									tickFormatter={(value) => `$${value / 1000}k`}
								/>
								<YAxis
									type="category"
									dataKey="category"
									tickLine={false}
									axisLine={false}
									width={90}
								/>
								<ChartTooltip
									content={<ChartTooltipContent />}
									cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
								/>
								<Bar dataKey="sales" radius={[0, 4, 4, 0]}>
									{chartData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.fill} />
									))}
								</Bar>
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
