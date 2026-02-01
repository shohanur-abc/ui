'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

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
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type ChartDataItem = {
	month: string;
	desktop: number;
	mobile: number;
	tablet: number;
};

const chartConfig: ChartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'var(--chart-1)',
	},
	mobile: {
		label: 'Mobile',
		color: 'var(--chart-2)',
	},
	tablet: {
		label: 'Tablet',
		color: 'var(--chart-3)',
	},
};

export default function Main() {
	const chartData: ChartDataItem[] = [
		{ month: 'Jan', desktop: 12400, mobile: 8200, tablet: 2100 },
		{ month: 'Feb', desktop: 14200, mobile: 9800, tablet: 2400 },
		{ month: 'Mar', desktop: 15800, mobile: 11200, tablet: 2800 },
		{ month: 'Apr', desktop: 17400, mobile: 12800, tablet: 3100 },
		{ month: 'May', desktop: 16200, mobile: 14200, tablet: 3400 },
		{ month: 'Jun', desktop: 18600, mobile: 15800, tablet: 3800 },
		{ month: 'Jul', desktop: 21200, mobile: 17400, tablet: 4200 },
		{ month: 'Aug', desktop: 19800, mobile: 18200, tablet: 4500 },
		{ month: 'Sep', desktop: 22400, mobile: 19800, tablet: 4800 },
		{ month: 'Oct', desktop: 25200, mobile: 21400, tablet: 5200 },
		{ month: 'Nov', desktop: 28400, mobile: 23200, tablet: 5600 },
		{ month: 'Dec', desktop: 32100, mobile: 25800, tablet: 6100 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Sales by Device</CardTitle>
						<CardDescription>
							Stacked area chart showing sales by device type
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[320px] w-full">
							<AreaChart
								data={chartData}
								margin={{ left: 12, right: 12 }}
								stackOffset="none"
							>
								<defs>
									<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="5%"
											stopColor="var(--color-desktop)"
											stopOpacity={0.4}
										/>
										<stop
											offset="95%"
											stopColor="var(--color-desktop)"
											stopOpacity={0.1}
										/>
									</linearGradient>
									<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="5%"
											stopColor="var(--color-mobile)"
											stopOpacity={0.4}
										/>
										<stop
											offset="95%"
											stopColor="var(--color-mobile)"
											stopOpacity={0.1}
										/>
									</linearGradient>
									<linearGradient id="fillTablet" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="5%"
											stopColor="var(--color-tablet)"
											stopOpacity={0.4}
										/>
										<stop
											offset="95%"
											stopColor="var(--color-tablet)"
											stopOpacity={0.1}
										/>
									</linearGradient>
								</defs>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="month"
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
								<ChartLegend content={<ChartLegendContent />} />
								<Area
									type="monotone"
									dataKey="tablet"
									stackId="1"
									stroke="var(--color-tablet)"
									fill="url(#fillTablet)"
								/>
								<Area
									type="monotone"
									dataKey="mobile"
									stackId="1"
									stroke="var(--color-mobile)"
									fill="url(#fillMobile)"
								/>
								<Area
									type="monotone"
									dataKey="desktop"
									stackId="1"
									stroke="var(--color-desktop)"
									fill="url(#fillDesktop)"
								/>
							</AreaChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
