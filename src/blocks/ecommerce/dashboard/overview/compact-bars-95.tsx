import { Bar, BarChart, XAxis } from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

type BarSparkline = {
	id: string;
	title: string;
	value: string;
	subtitle: string;
	data: { day: string; value: number }[];
	color: string;
};

const chartConfig = {
	value: { label: 'Value', color: 'var(--chart-1)' },
} satisfies ChartConfig;

const BarSparklineCard = ({ title, value, subtitle, data, color }: BarSparkline) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-start justify-between">
				<div>
					<p className="text-sm text-muted-foreground">{title}</p>
					<p className="mt-1 text-2xl font-bold">{value}</p>
					<p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
				</div>
				<ChartContainer config={chartConfig} className="h-16 w-24">
					<BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
						<Bar dataKey="value" fill={color} radius={2} />
					</BarChart>
				</ChartContainer>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const sparklines: BarSparkline[] = [
		{ id: '1', title: 'Daily Revenue', value: '$6,892', subtitle: 'vs $5,234 last week', data: [{ day: 'Mon', value: 5200 }, { day: 'Tue', value: 6100 }, { day: 'Wed', value: 5800 }, { day: 'Thu', value: 7200 }, { day: 'Fri', value: 6500 }, { day: 'Sat', value: 7800 }, { day: 'Sun', value: 6892 }], color: 'var(--chart-1)' },
		{ id: '2', title: 'Daily Orders', value: '184', subtitle: 'vs 156 last week', data: [{ day: 'Mon', value: 145 }, { day: 'Tue', value: 168 }, { day: 'Wed', value: 152 }, { day: 'Thu', value: 189 }, { day: 'Fri', value: 175 }, { day: 'Sat', value: 198 }, { day: 'Sun', value: 184 }], color: 'var(--chart-2)' },
		{ id: '3', title: 'Visitors', value: '3,452', subtitle: 'vs 2,891 last week', data: [{ day: 'Mon', value: 2800 }, { day: 'Tue', value: 3100 }, { day: 'Wed', value: 2950 }, { day: 'Thu', value: 3400 }, { day: 'Fri', value: 3200 }, { day: 'Sat', value: 3600 }, { day: 'Sun', value: 3452 }], color: 'var(--chart-3)' },
		{ id: '4', title: 'Conversions', value: '5.34%', subtitle: 'vs 4.82% last week', data: [{ day: 'Mon', value: 4.5 }, { day: 'Tue', value: 4.8 }, { day: 'Wed', value: 5.1 }, { day: 'Thu', value: 5.4 }, { day: 'Fri', value: 5.2 }, { day: 'Sat', value: 5.6 }, { day: 'Sun', value: 5.34 }], color: 'var(--chart-4)' },
		{ id: '5', title: 'New Customers', value: '89', subtitle: 'vs 72 last week', data: [{ day: 'Mon', value: 12 }, { day: 'Tue', value: 15 }, { day: 'Wed', value: 11 }, { day: 'Thu', value: 18 }, { day: 'Fri', value: 14 }, { day: 'Sat', value: 10 }, { day: 'Sun', value: 9 }], color: 'var(--chart-5)' },
		{ id: '6', title: 'Avg Cart Value', value: '$124.50', subtitle: 'vs $118.20 last week', data: [{ day: 'Mon', value: 118 }, { day: 'Tue', value: 122 }, { day: 'Wed', value: 119 }, { day: 'Thu', value: 128 }, { day: 'Fri', value: 125 }, { day: 'Sat', value: 130 }, { day: 'Sun', value: 124.5 }], color: 'var(--chart-1)' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{sparklines.map((sparkline) => (
						<BarSparklineCard key={sparkline.id} {...sparkline} />
					))}
				</div>
			</div>
		</section>
	);
}
