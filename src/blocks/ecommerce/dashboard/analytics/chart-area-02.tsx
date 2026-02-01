'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type DataPoint = {
	label: string;
	value: number;
};

type SeriesData = {
	name: string;
	color: string;
	data: number[];
};

const MultiAreaChart = ({
	series,
	labels,
}: {
	series: SeriesData[];
	labels: string[];
}) => {
	const allValues = series.flatMap((s) => s.data);
	const max = Math.max(...allValues);

	return (
		<div className="relative h-56 w-full">
			<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				className="w-full h-full"
			>
				<defs>
					{series.map((s, i) => (
						<linearGradient
							key={i}
							id={`gradient-${i}`}
							x1="0%"
							y1="0%"
							x2="0%"
							y2="100%"
						>
							<stop offset="0%" stopColor={s.color} stopOpacity="0.3" />
							<stop offset="100%" stopColor={s.color} stopOpacity="0.05" />
						</linearGradient>
					))}
				</defs>
				{series.map((s, seriesIndex) => {
					const points = s.data.map((v, i) => ({
						x: (i / (s.data.length - 1)) * 100,
						y: 100 - (v / max) * 100,
					}));
					const pathD = points.reduce((acc, p, i) => {
						if (i === 0) return `M ${p.x} ${p.y}`;
						const prev = points[i - 1];
						const cp1x = prev.x + (p.x - prev.x) / 3;
						const cp2x = p.x - (p.x - prev.x) / 3;
						return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${p.y}, ${p.x} ${p.y}`;
					}, '');
					const areaD = `${pathD} L 100 100 L 0 100 Z`;

					return (
						<g key={seriesIndex}>
							<path d={areaD} fill={`url(#gradient-${seriesIndex})`} />
							<path d={pathD} fill="none" stroke={s.color} strokeWidth="0.5" />
						</g>
					);
				})}
			</svg>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
				{labels
					.filter((_, i) => i % Math.ceil(labels.length / 6) === 0)
					.map((label, i) => (
						<span key={i}>{label}</span>
					))}
			</div>
		</div>
	);
};

const Legend = ({ series }: { series: SeriesData[] }) => (
	<div className="flex items-center justify-center gap-6 mt-4">
		{series.map((s, i) => (
			<div key={i} className="flex items-center gap-2">
				<div
					className="size-3 rounded-full"
					style={{ backgroundColor: s.color }}
				/>
				<span className="text-xs text-muted-foreground">{s.name}</span>
			</div>
		))}
	</div>
);

const labels = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

const revenueSeries: SeriesData[] = [
	{
		name: 'This Year',
		color: 'hsl(var(--primary))',
		data: [
			4500, 5200, 4800, 6100, 5800, 7200, 6800, 8100, 7500, 8900, 8200, 9500,
		],
	},
	{
		name: 'Last Year',
		color: 'hsl(var(--muted-foreground))',
		data: [
			3800, 4200, 4500, 5000, 4800, 5500, 5200, 6000, 5800, 6500, 6200, 7000,
		],
	},
];

const trafficSeries: SeriesData[] = [
	{
		name: 'Organic',
		color: '#22c55e',
		data: [
			12000, 14500, 13200, 16800, 15400, 18200, 17500, 20100, 19200, 22000,
			21000, 24500,
		],
	},
	{
		name: 'Paid',
		color: '#3b82f6',
		data: [
			5000, 6200, 5800, 7500, 7000, 8500, 8000, 9200, 8800, 10500, 10000, 11500,
		],
	},
	{
		name: 'Social',
		color: '#a855f7',
		data: [
			2500, 3200, 2800, 4000, 3500, 4500, 4200, 5000, 4800, 5500, 5200, 6000,
		],
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<div>
							<CardTitle className="text-sm font-medium">
								Traffic & Revenue Comparison
							</CardTitle>
							<p className="text-xs text-muted-foreground">
								Year over year analysis
							</p>
						</div>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="revenue" className="w-full">
							<TabsList className="mb-4">
								<TabsTrigger value="revenue">Revenue</TabsTrigger>
								<TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
							</TabsList>
							<TabsContent value="revenue">
								<MultiAreaChart series={revenueSeries} labels={labels} />
								<Legend series={revenueSeries} />
							</TabsContent>
							<TabsContent value="traffic">
								<MultiAreaChart series={trafficSeries} labels={labels} />
								<Legend series={trafficSeries} />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
