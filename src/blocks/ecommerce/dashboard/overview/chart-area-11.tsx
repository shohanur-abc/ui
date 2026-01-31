'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
	month: string;
	revenue: number;
	orders: number;
};

type HeaderProps = {
	title: string;
	description: string;
	totalValue: string;
	changePercent: string;
};

const ChartHeader = ({
	title,
	description,
	totalValue,
	changePercent,
}: HeaderProps) => (
	<CardHeader>
		<div className="flex flex-col gap-1 @sm:flex-row @sm:items-center @sm:justify-between">
			<div>
				<CardTitle className="text-lg">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</div>
			<div className="text-right">
				<p className="text-2xl font-bold">{totalValue}</p>
				<p className="text-sm text-emerald-500">{changePercent}</p>
			</div>
		</div>
	</CardHeader>
);

const chartConfig: ChartConfig = {
	revenue: {
		label: 'Revenue',
		color: 'var(--chart-1)',
	},
	orders: {
		label: 'Orders',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const chartData: ChartDataItem[] = [
		{ month: 'Jan', revenue: 18600, orders: 1200 },
		{ month: 'Feb', revenue: 22400, orders: 1450 },
		{ month: 'Mar', revenue: 28100, orders: 1890 },
		{ month: 'Apr', revenue: 31500, orders: 2100 },
		{ month: 'May', revenue: 29800, orders: 1980 },
		{ month: 'Jun', revenue: 35200, orders: 2340 },
		{ month: 'Jul', revenue: 42100, orders: 2780 },
		{ month: 'Aug', revenue: 38900, orders: 2560 },
		{ month: 'Sep', revenue: 45600, orders: 3020 },
		{ month: 'Oct', revenue: 52300, orders: 3450 },
		{ month: 'Nov', revenue: 58900, orders: 3890 },
		{ month: 'Dec', revenue: 67200, orders: 4420 },
	];

	const headerProps: HeaderProps = {
		title: 'Revenue Overview',
		description: 'Monthly revenue and order trends',
		totalValue: '$470,600',
		changePercent: '+24.5% from last year',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<ChartHeader {...headerProps} />
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[300px] w-full">
							<AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
								<defs>
									<linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="5%"
											stopColor="var(--color-revenue)"
											stopOpacity={0.3}
										/>
										<stop
											offset="95%"
											stopColor="var(--color-revenue)"
											stopOpacity={0}
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
									content={<ChartTooltipContent indicator="line" />}
								/>
								<Area
									type="monotone"
									dataKey="revenue"
									stroke="var(--color-revenue)"
									strokeWidth={2}
									fill="url(#fillRevenue)"
								/>
							</AreaChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
