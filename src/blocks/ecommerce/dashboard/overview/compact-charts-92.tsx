import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

type MiniChartData = {
	id: string;
	title: string;
	value: string;
	data: { date: string; value: number }[];
};

const chartConfig = {
	value: { label: 'Value', color: 'var(--chart-1)' },
} satisfies ChartConfig;

const MiniChartCard = ({ title, value, data }: MiniChartData) => (
	<Card className="overflow-hidden">
		<CardHeader className="p-3 pb-0">
			<CardTitle className="text-xs text-muted-foreground">{title}</CardTitle>
			<p className="text-xl font-bold">{value}</p>
		</CardHeader>
		<CardContent className="p-0">
			<ChartContainer config={chartConfig} className="h-16 w-full">
				<AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
					<defs>
						<linearGradient id="fillMini" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
							<stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
						</linearGradient>
					</defs>
					<Area type="monotone" dataKey="value" stroke="var(--chart-1)" strokeWidth={1.5} fill="url(#fillMini)" />
				</AreaChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const charts: MiniChartData[] = [
		{ id: '1', title: 'Revenue', value: '$48.2K', data: [{ date: 'Mon', value: 320 }, { date: 'Tue', value: 380 }, { date: 'Wed', value: 350 }, { date: 'Thu', value: 420 }, { date: 'Fri', value: 480 }, { date: 'Sat', value: 520 }, { date: 'Sun', value: 482 }] },
		{ id: '2', title: 'Orders', value: '1,284', data: [{ date: 'Mon', value: 150 }, { date: 'Tue', value: 180 }, { date: 'Wed', value: 165 }, { date: 'Thu', value: 200 }, { date: 'Fri', value: 235 }, { date: 'Sat', value: 260 }, { date: 'Sun', value: 284 }] },
		{ id: '3', title: 'Visitors', value: '24.5K', data: [{ date: 'Mon', value: 2800 }, { date: 'Tue', value: 3200 }, { date: 'Wed', value: 3500 }, { date: 'Thu', value: 3800 }, { date: 'Fri', value: 4100 }, { date: 'Sat', value: 3600 }, { date: 'Sun', value: 3500 }] },
		{ id: '4', title: 'Conversion', value: '3.24%', data: [{ date: 'Mon', value: 2.8 }, { date: 'Tue', value: 3.0 }, { date: 'Wed', value: 3.1 }, { date: 'Thu', value: 3.4 }, { date: 'Fri', value: 3.2 }, { date: 'Sat', value: 3.5 }, { date: 'Sun', value: 3.24 }] },
		{ id: '5', title: 'AOV', value: '$87.50', data: [{ date: 'Mon', value: 82 }, { date: 'Tue', value: 85 }, { date: 'Wed', value: 84 }, { date: 'Thu', value: 88 }, { date: 'Fri', value: 90 }, { date: 'Sat', value: 86 }, { date: 'Sun', value: 87.5 }] },
		{ id: '6', title: 'Reviews', value: '892', data: [{ date: 'Mon', value: 110 }, { date: 'Tue', value: 125 }, { date: 'Wed', value: 135 }, { date: 'Thu', value: 145 }, { date: 'Fri', value: 138 }, { date: 'Sat', value: 120 }, { date: 'Sun', value: 119 }] },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-6">
					{charts.map((chart) => (
						<MiniChartCard key={chart.id} {...chart} />
					))}
				</div>
			</div>
		</section>
	);
}
