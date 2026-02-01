import { Line, LineChart, XAxis } from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

type TrendCard = {
	id: string;
	label: string;
	value: string;
	change: string;
	isPositive: boolean;
	data: { x: string; y: number }[];
};

const chartConfig = {
	y: { label: 'Value', color: 'var(--chart-1)' },
} satisfies ChartConfig;

const TrendCardComponent = ({
	label,
	value,
	change,
	isPositive,
	data,
}: TrendCard) => (
	<Card className="overflow-hidden">
		<CardContent className="p-0">
			<div className="flex items-center justify-between p-3 pb-0">
				<div>
					<p className="text-xs text-muted-foreground">{label}</p>
					<div className="flex items-baseline gap-2">
						<span className="text-xl font-bold">{value}</span>
						<span
							className={`text-xs ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}
						>
							{isPositive ? '↑' : '↓'} {change}
						</span>
					</div>
				</div>
			</div>
			<ChartContainer config={chartConfig} className="h-12 w-full">
				<LineChart
					data={data}
					margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
				>
					<Line
						type="monotone"
						dataKey="y"
						stroke={
							isPositive ? 'var(--color-chart-2)' : 'var(--color-destructive)'
						}
						strokeWidth={2}
						dot={false}
					/>
				</LineChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const trends: TrendCard[] = [
		{
			id: '1',
			label: 'Revenue',
			value: '$48.2K',
			change: '12.5%',
			isPositive: true,
			data: [
				{ x: '1', y: 30 },
				{ x: '2', y: 35 },
				{ x: '3', y: 32 },
				{ x: '4', y: 38 },
				{ x: '5', y: 42 },
				{ x: '6', y: 45 },
				{ x: '7', y: 48 },
			],
		},
		{
			id: '2',
			label: 'Orders',
			value: '1,284',
			change: '8.2%',
			isPositive: true,
			data: [
				{ x: '1', y: 100 },
				{ x: '2', y: 110 },
				{ x: '3', y: 105 },
				{ x: '4', y: 120 },
				{ x: '5', y: 115 },
				{ x: '6', y: 125 },
				{ x: '7', y: 128 },
			],
		},
		{
			id: '3',
			label: 'Conversion',
			value: '3.24%',
			change: '0.5%',
			isPositive: true,
			data: [
				{ x: '1', y: 2.8 },
				{ x: '2', y: 2.9 },
				{ x: '3', y: 3.0 },
				{ x: '4', y: 3.1 },
				{ x: '5', y: 3.0 },
				{ x: '6', y: 3.2 },
				{ x: '7', y: 3.24 },
			],
		},
		{
			id: '4',
			label: 'AOV',
			value: '$87.50',
			change: '5.4%',
			isPositive: true,
			data: [
				{ x: '1', y: 78 },
				{ x: '2', y: 82 },
				{ x: '3', y: 80 },
				{ x: '4', y: 85 },
				{ x: '5', y: 84 },
				{ x: '6', y: 86 },
				{ x: '7', y: 87.5 },
			],
		},
		{
			id: '5',
			label: 'Bounce',
			value: '32.4%',
			change: '2.1%',
			isPositive: false,
			data: [
				{ x: '1', y: 28 },
				{ x: '2', y: 30 },
				{ x: '3', y: 31 },
				{ x: '4', y: 29 },
				{ x: '5', y: 32 },
				{ x: '6', y: 33 },
				{ x: '7', y: 32.4 },
			],
		},
		{
			id: '6',
			label: 'Returns',
			value: '2.8%',
			change: '0.3%',
			isPositive: false,
			data: [
				{ x: '1', y: 2.2 },
				{ x: '2', y: 2.4 },
				{ x: '3', y: 2.5 },
				{ x: '4', y: 2.6 },
				{ x: '5', y: 2.5 },
				{ x: '6', y: 2.7 },
				{ x: '7', y: 2.8 },
			],
		},
		{
			id: '7',
			label: 'Sessions',
			value: '24.5K',
			change: '15.2%',
			isPositive: true,
			data: [
				{ x: '1', y: 18 },
				{ x: '2', y: 19 },
				{ x: '3', y: 20 },
				{ x: '4', y: 21 },
				{ x: '5', y: 22 },
				{ x: '6', y: 23 },
				{ x: '7', y: 24.5 },
			],
		},
		{
			id: '8',
			label: 'Reviews',
			value: '892',
			change: '22.1%',
			isPositive: true,
			data: [
				{ x: '1', y: 650 },
				{ x: '2', y: 700 },
				{ x: '3', y: 720 },
				{ x: '4', y: 780 },
				{ x: '5', y: 820 },
				{ x: '6', y: 860 },
				{ x: '7', y: 892 },
			],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-4">
					{trends.map((trend) => (
						<TrendCardComponent key={trend.id} {...trend} />
					))}
				</div>
			</div>
		</section>
	);
}
