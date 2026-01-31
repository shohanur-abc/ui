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

type MonthlyData = {
	month: string;
	revenue: number;
	target: number;
};

type HeaderProps = {
	title: string;
	description: string;
	totalRevenue: string;
	vsTarget: string;
};

const ReportHeader = ({
	title,
	description,
	totalRevenue,
	vsTarget,
}: HeaderProps) => (
	<CardHeader>
		<div className="flex flex-col gap-1 @sm:flex-row @sm:items-start @sm:justify-between">
			<div>
				<CardTitle className="text-lg @sm:text-xl">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</div>
			<div className="text-right">
				<p className="text-2xl font-bold">{totalRevenue}</p>
				<p className="text-sm text-emerald-500">{vsTarget}</p>
			</div>
		</div>
	</CardHeader>
);

const chartConfig: ChartConfig = {
	revenue: {
		label: 'Revenue',
		color: 'var(--chart-1)',
	},
	target: {
		label: 'Target',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const headerProps: HeaderProps = {
		title: 'Monthly Revenue Report',
		description: 'Revenue vs target comparison by month',
		totalRevenue: '$524,800',
		vsTarget: '+8.4% above target',
	};

	const chartData: MonthlyData[] = [
		{ month: 'Jan', revenue: 32400, target: 30000 },
		{ month: 'Feb', revenue: 38200, target: 35000 },
		{ month: 'Mar', revenue: 45100, target: 42000 },
		{ month: 'Apr', revenue: 42800, target: 45000 },
		{ month: 'May', revenue: 51200, target: 48000 },
		{ month: 'Jun', revenue: 58900, target: 52000 },
		{ month: 'Jul', revenue: 52400, target: 55000 },
		{ month: 'Aug', revenue: 61200, target: 58000 },
		{ month: 'Sep', revenue: 48600, target: 50000 },
		{ month: 'Oct', revenue: 54800, target: 52000 },
		{ month: 'Nov', revenue: 62100, target: 58000 },
		{ month: 'Dec', revenue: 77100, target: 65000 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<ReportHeader {...headerProps} />
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[350px] w-full">
							<BarChart data={chartData} margin={{ left: 12, right: 12 }}>
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
									content={<ChartTooltipContent />}
									cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
								/>
								<Bar
									dataKey="revenue"
									fill="var(--color-revenue)"
									radius={[4, 4, 0, 0]}
								/>
								<Bar
									dataKey="target"
									fill="var(--color-target)"
									radius={[4, 4, 0, 0]}
									opacity={0.5}
								/>
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
