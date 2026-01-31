'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type WeeklyData = {
	day: string;
	orders: number;
	returns: number;
	cancellations: number;
};

const chartConfig: ChartConfig = {
	orders: {
		label: 'Orders',
		color: 'var(--chart-1)',
	},
	returns: {
		label: 'Returns',
		color: 'var(--chart-4)',
	},
	cancellations: {
		label: 'Cancellations',
		color: 'var(--destructive)',
	},
};

type TimeRangeProps = {
	options: string[];
	defaultValue: string;
};

const TimeRangeSelector = ({ options, defaultValue }: TimeRangeProps) => (
	<Tabs defaultValue={defaultValue}>
		<TabsList className="h-8">
			{options.map((option) => (
				<TabsTrigger key={option} value={option} className="px-3 text-xs">
					{option}
				</TabsTrigger>
			))}
		</TabsList>
	</Tabs>
);

export default function Main() {
	const timeOptions = ['7D', '14D', '30D', '90D'];

	const chartData: WeeklyData[] = [
		{ day: 'Mon', orders: 245, returns: 12, cancellations: 8 },
		{ day: 'Tue', orders: 312, returns: 18, cancellations: 5 },
		{ day: 'Wed', orders: 289, returns: 15, cancellations: 12 },
		{ day: 'Thu', orders: 378, returns: 22, cancellations: 9 },
		{ day: 'Fri', orders: 456, returns: 28, cancellations: 15 },
		{ day: 'Sat', orders: 512, returns: 32, cancellations: 11 },
		{ day: 'Sun', orders: 398, returns: 19, cancellations: 7 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Order Activity Report
							</CardTitle>
							<CardDescription>
								Daily orders, returns, and cancellations
							</CardDescription>
						</div>
						<TimeRangeSelector options={timeOptions} defaultValue="7D" />
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[350px] w-full">
							<BarChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="day"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis tickLine={false} axisLine={false} tickMargin={8} />
								<ChartTooltip
									content={<ChartTooltipContent />}
									cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
								/>
								<ChartLegend content={<ChartLegendContent />} />
								<Bar
									dataKey="orders"
									fill="var(--color-orders)"
									radius={[4, 4, 0, 0]}
								/>
								<Bar
									dataKey="returns"
									fill="var(--color-returns)"
									radius={[4, 4, 0, 0]}
								/>
								<Bar
									dataKey="cancellations"
									fill="var(--color-cancellations)"
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
