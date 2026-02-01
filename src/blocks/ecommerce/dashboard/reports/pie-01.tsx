'use client';

import { Pie, PieChart, Cell, Label } from 'recharts';

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
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart';

type CategoryData = {
	category: string;
	revenue: number;
	fill: string;
};

type LegendItemProps = {
	color: string;
	label: string;
	value: string;
	percentage: string;
};

const LegendItem = ({ color, label, value, percentage }: LegendItemProps) => (
	<div className="flex items-center justify-between border-b border-border/30 py-2 last:border-0">
		<div className="flex items-center gap-2">
			<div className={`size-3 rounded-full ${color}`} />
			<span className="text-sm">{label}</span>
		</div>
		<div className="text-right">
			<p className="text-sm font-medium">{value}</p>
			<p className="text-xs text-muted-foreground">{percentage}</p>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	electronics: {
		label: 'Electronics',
		color: 'oklch(0.7 0.2 280)',
	},
	clothing: {
		label: 'Clothing',
		color: 'oklch(0.7 0.18 160)',
	},
	home: {
		label: 'Home & Garden',
		color: 'oklch(0.72 0.16 200)',
	},
	sports: {
		label: 'Sports',
		color: 'oklch(0.65 0.2 320)',
	},
	beauty: {
		label: 'Beauty',
		color: 'oklch(0.75 0.15 55)',
	},
};

export default function Main() {
	const chartData: CategoryData[] = [
		{
			category: 'electronics',
			revenue: 425000,
			fill: 'var(--color-electronics)',
		},
		{ category: 'clothing', revenue: 312000, fill: 'var(--color-clothing)' },
		{ category: 'home', revenue: 198000, fill: 'var(--color-home)' },
		{ category: 'sports', revenue: 145000, fill: 'var(--color-sports)' },
		{ category: 'beauty', revenue: 120000, fill: 'var(--color-beauty)' },
	];

	const legendItems: LegendItemProps[] = [
		{
			color: 'bg-[oklch(0.7_0.2_280)]',
			label: 'Electronics',
			value: '$425K',
			percentage: '35.4%',
		},
		{
			color: 'bg-[oklch(0.7_0.18_160)]',
			label: 'Clothing',
			value: '$312K',
			percentage: '26.0%',
		},
		{
			color: 'bg-[oklch(0.72_0.16_200)]',
			label: 'Home & Garden',
			value: '$198K',
			percentage: '16.5%',
		},
		{
			color: 'bg-[oklch(0.65_0.2_320)]',
			label: 'Sports',
			value: '$145K',
			percentage: '12.1%',
		},
		{
			color: 'bg-[oklch(0.75_0.15_55)]',
			label: 'Beauty',
			value: '$120K',
			percentage: '10.0%',
		},
	];

	const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Revenue by Category
						</CardTitle>
						<CardDescription>
							Product category distribution of total revenue
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-8 @lg:grid-cols-[1fr,280px]">
							<ChartContainer
								config={chartConfig}
								className="mx-auto aspect-square h-[320px]"
							>
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Pie
										data={chartData}
										dataKey="revenue"
										nameKey="category"
										innerRadius={80}
										outerRadius={130}
										strokeWidth={2}
										stroke="var(--background)"
									>
										<Label
											content={({ viewBox }) => {
												if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
													return (
														<text
															x={viewBox.cx}
															y={viewBox.cy}
															textAnchor="middle"
															dominantBaseline="middle"
														>
															<tspan
																x={viewBox.cx}
																y={viewBox.cy}
																className="fill-foreground text-2xl font-bold"
															>
																${(totalRevenue / 1000000).toFixed(2)}M
															</tspan>
															<tspan
																x={viewBox.cx}
																y={(viewBox.cy || 0) + 22}
																className="fill-muted-foreground text-sm"
															>
																Total Revenue
															</tspan>
														</text>
													);
												}
											}}
										/>
									</Pie>
								</PieChart>
							</ChartContainer>
							<div className="space-y-1">
								<h4 className="mb-3 text-sm font-medium">Breakdown</h4>
								{legendItems.map((item, i) => (
									<LegendItem key={i} {...item} />
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
