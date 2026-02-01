'use client';

import { Pie, PieChart, Cell, Label, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

import { Badge } from '@/components/ui/badge';
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

type CustomerData = {
	segment: string;
	count: number;
	fill: string;
};

type SegmentCardProps = {
	segment: string;
	count: string;
	revenue: string;
	avgOrder: string;
	color: string;
};

const SegmentCard = ({
	segment,
	count,
	revenue,
	avgOrder,
	color,
}: SegmentCardProps) => (
	<Card className="border-border/30 bg-muted/20">
		<CardContent className="p-4">
			<div className="flex items-center gap-2">
				<div className={`size-3 rounded-full ${color}`} />
				<span className="font-medium">{segment}</span>
			</div>
			<div className="mt-3 grid grid-cols-3 gap-4">
				<div>
					<p className="text-xs text-muted-foreground">Customers</p>
					<p className="font-bold">{count}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Revenue</p>
					<p className="font-bold">{revenue}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Avg Order</p>
					<p className="font-bold">{avgOrder}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	vip: {
		label: 'VIP',
		color: 'oklch(0.75 0.15 55)',
	},
	loyal: {
		label: 'Loyal',
		color: 'oklch(0.7 0.2 280)',
	},
	regular: {
		label: 'Regular',
		color: 'oklch(0.7 0.18 160)',
	},
	occasional: {
		label: 'Occasional',
		color: 'oklch(0.72 0.16 200)',
	},
	new: {
		label: 'New',
		color: 'oklch(0.65 0.2 320)',
	},
};

export default function Main() {
	const chartData: CustomerData[] = [
		{ segment: 'vip', count: 2450, fill: 'var(--color-vip)' },
		{ segment: 'loyal', count: 8200, fill: 'var(--color-loyal)' },
		{ segment: 'regular', count: 15400, fill: 'var(--color-regular)' },
		{ segment: 'occasional', count: 12800, fill: 'var(--color-occasional)' },
		{ segment: 'new', count: 6150, fill: 'var(--color-new)' },
	];

	const segments: SegmentCardProps[] = [
		{
			segment: 'VIP Customers',
			count: '2.45K',
			revenue: '$580K',
			avgOrder: '$425',
			color: 'bg-[oklch(0.75_0.15_55)]',
		},
		{
			segment: 'Loyal Customers',
			count: '8.2K',
			revenue: '$420K',
			avgOrder: '$185',
			color: 'bg-[oklch(0.7_0.2_280)]',
		},
		{
			segment: 'Regular Customers',
			count: '15.4K',
			revenue: '$310K',
			avgOrder: '$95',
			color: 'bg-[oklch(0.7_0.18_160)]',
		},
		{
			segment: 'Occasional Buyers',
			count: '12.8K',
			revenue: '$145K',
			avgOrder: '$65',
			color: 'bg-[oklch(0.72_0.16_200)]',
		},
		{
			segment: 'New Customers',
			count: '6.15K',
			revenue: '$85K',
			avgOrder: '$55',
			color: 'bg-[oklch(0.65_0.2_320)]',
		},
	];

	const totalCustomers = chartData.reduce((sum, item) => sum + item.count, 0);

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Customer Segmentation
							</CardTitle>
							<CardDescription>
								Customer breakdown by engagement level
							</CardDescription>
						</div>
						<Badge variant="outline" className="w-fit">
							{totalCustomers.toLocaleString()} Total Customers
						</Badge>
					</CardHeader>
					<CardContent>
						<div className="grid gap-8 @lg:grid-cols-[280px,1fr]">
							<ChartContainer
								config={chartConfig}
								className="mx-auto aspect-square h-[280px]"
							>
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Pie
										data={chartData}
										dataKey="count"
										nameKey="segment"
										innerRadius={70}
										outerRadius={110}
										strokeWidth={2}
										stroke="var(--background)"
										activeIndex={0}
										activeShape={({
											outerRadius = 0,
											...props
										}: PieSectorDataItem) => (
											<Sector {...props} outerRadius={outerRadius + 8} />
										)}
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
																className="fill-foreground text-xl font-bold"
															>
																45K
															</tspan>
															<tspan
																x={viewBox.cx}
																y={(viewBox.cy || 0) + 18}
																className="fill-muted-foreground text-xs"
															>
																Customers
															</tspan>
														</text>
													);
												}
											}}
										/>
									</Pie>
								</PieChart>
							</ChartContainer>
							<div className="grid gap-3 @sm:grid-cols-2 @xl:grid-cols-3">
								{segments.map((seg, i) => (
									<SegmentCard key={i} {...seg} />
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
