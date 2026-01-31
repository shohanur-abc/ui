'use client';

import { AreaChart } from 'lucide-react';
import { Area, AreaChart as RechartsAreaChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type TimeSeriesDataPoint = {
	time: string;
	value: number;
};

type TimeRangeData = {
	label: string;
	value: string;
	data: TimeSeriesDataPoint[];
};

type MultiRangeChartCardProps = {
	title: string;
	ranges: TimeRangeData[];
	config: ChartConfig;
};

const ChartContent = ({
	data,
	config,
}: {
	data: TimeSeriesDataPoint[];
	config: ChartConfig;
}) => (
	<ChartContainer config={config} className="h-[250px] w-full">
		<RechartsAreaChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
			<defs>
				<linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
					<stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.4} />
					<stop offset="95%" stopColor="var(--color-value)" stopOpacity={0} />
				</linearGradient>
			</defs>
			<CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
			<XAxis
				dataKey="time"
				tickLine={false}
				axisLine={false}
				className="text-xs"
			/>
			<YAxis
				tickLine={false}
				axisLine={false}
				tickFormatter={(val) => `$${val / 1000}k`}
				className="text-xs"
			/>
			<ChartTooltip content={<ChartTooltipContent />} />
			<Area
				type="monotone"
				dataKey="value"
				stroke="var(--color-value)"
				strokeWidth={2}
				fill="url(#valueGradient)"
			/>
		</RechartsAreaChart>
	</ChartContainer>
);

const MultiRangeChartCard = ({
	title,
	ranges,
	config,
}: MultiRangeChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<AreaChart className="size-4" />
			</div>
			<CardTitle className="text-base font-semibold">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<Tabs defaultValue={ranges[0].value} className="w-full">
				<TabsList className="mb-4">
					{ranges.map((range) => (
						<TabsTrigger key={range.value} value={range.value}>
							{range.label}
						</TabsTrigger>
					))}
				</TabsList>
				{ranges.map((range) => (
					<TabsContent key={range.value} value={range.value}>
						<ChartContent data={range.data} config={config} />
					</TabsContent>
				))}
			</Tabs>
		</CardContent>
	</Card>
);

export default function Main() {
	const ranges: TimeRangeData[] = [
		{
			label: '7 Days',
			value: '7d',
			data: [
				{ time: 'Mon', value: 12500 },
				{ time: 'Tue', value: 15200 },
				{ time: 'Wed', value: 13800 },
				{ time: 'Thu', value: 18400 },
				{ time: 'Fri', value: 22100 },
				{ time: 'Sat', value: 25800 },
				{ time: 'Sun', value: 19200 },
			],
		},
		{
			label: '30 Days',
			value: '30d',
			data: [
				{ time: 'Week 1', value: 42000 },
				{ time: 'Week 2', value: 48000 },
				{ time: 'Week 3', value: 52000 },
				{ time: 'Week 4', value: 58000 },
			],
		},
		{
			label: '90 Days',
			value: '90d',
			data: [
				{ time: 'Jan', value: 125000 },
				{ time: 'Feb', value: 142000 },
				{ time: 'Mar', value: 168000 },
			],
		},
	];

	const chartConfig: ChartConfig = {
		value: { label: 'Revenue', color: 'oklch(0.70 0.18 155)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<MultiRangeChartCard
					title="Revenue Over Time"
					ranges={ranges}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
