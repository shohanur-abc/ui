'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type DataPoint = { label: string; value: number };

type SmallChartProps = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	data: DataPoint[];
	color: string;
};

const SmallAreaChart = ({
	data,
	color,
}: {
	data: DataPoint[];
	color: string;
}) => {
	const max = Math.max(...data.map((d) => d.value));
	const min = Math.min(...data.map((d) => d.value));
	const range = max - min || 1;

	const points = data.map((d, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - ((d.value - min) / range) * 90 - 5,
	}));

	const pathD = points.reduce((acc, p, i) => {
		if (i === 0) return `M ${p.x} ${p.y}`;
		return `${acc} L ${p.x} ${p.y}`;
	}, '');

	const areaD = `${pathD} L 100 100 L 0 100 Z`;

	return (
		<svg
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
			className="w-full h-20"
		>
			<defs>
				<linearGradient
					id={`smallGrad-${color}`}
					x1="0%"
					y1="0%"
					x2="0%"
					y2="100%"
				>
					<stop offset="0%" stopColor={color} stopOpacity="0.3" />
					<stop offset="100%" stopColor={color} stopOpacity="0" />
				</linearGradient>
			</defs>
			<path d={areaD} fill={`url(#smallGrad-${color})`} />
			<path d={pathD} fill="none" stroke={color} strokeWidth="0.8" />
		</svg>
	);
};

const ChartCard = ({
	title,
	value,
	change,
	trend,
	data,
	color,
}: SmallChartProps) => (
	<Card className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<CardTitle className="text-sm font-medium text-muted-foreground">
				{title}
			</CardTitle>
			<Badge
				variant={trend === 'up' ? 'default' : 'secondary'}
				className={
					trend === 'up'
						? 'bg-emerald-500/10 text-emerald-500'
						: 'bg-rose-500/10 text-rose-500'
				}
			>
				{change}
			</Badge>
		</CardHeader>
		<CardContent className="pt-0">
			<p className="text-2xl font-bold mb-2">{value}</p>
			<SmallAreaChart data={data} color={color} />
		</CardContent>
	</Card>
);

const charts: SmallChartProps[] = [
	{
		title: 'Page Views',
		value: '124,532',
		change: '+12.5%',
		trend: 'up',
		data: [
			{ label: '1', value: 45 },
			{ label: '2', value: 52 },
			{ label: '3', value: 48 },
			{ label: '4', value: 65 },
			{ label: '5', value: 58 },
			{ label: '6', value: 72 },
			{ label: '7', value: 85 },
		],
		color: '#3b82f6',
	},
	{
		title: 'Unique Visitors',
		value: '45,678',
		change: '+8.3%',
		trend: 'up',
		data: [
			{ label: '1', value: 32 },
			{ label: '2', value: 38 },
			{ label: '3', value: 35 },
			{ label: '4', value: 42 },
			{ label: '5', value: 48 },
			{ label: '6', value: 52 },
			{ label: '7', value: 58 },
		],
		color: '#22c55e',
	},
	{
		title: 'Bounce Rate',
		value: '32.4%',
		change: '-2.1%',
		trend: 'up',
		data: [
			{ label: '1', value: 42 },
			{ label: '2', value: 38 },
			{ label: '3', value: 40 },
			{ label: '4', value: 35 },
			{ label: '5', value: 38 },
			{ label: '6', value: 34 },
			{ label: '7', value: 32 },
		],
		color: '#a855f7',
	},
	{
		title: 'Avg. Session',
		value: '4m 32s',
		change: '+15s',
		trend: 'up',
		data: [
			{ label: '1', value: 220 },
			{ label: '2', value: 235 },
			{ label: '3', value: 228 },
			{ label: '4', value: 248 },
			{ label: '5', value: 255 },
			{ label: '6', value: 262 },
			{ label: '7', value: 272 },
		],
		color: '#f59e0b',
	},
	{
		title: 'Conversion Rate',
		value: '3.24%',
		change: '+0.5%',
		trend: 'up',
		data: [
			{ label: '1', value: 2.8 },
			{ label: '2', value: 2.9 },
			{ label: '3', value: 3.0 },
			{ label: '4', value: 3.1 },
			{ label: '5', value: 3.0 },
			{ label: '6', value: 3.2 },
			{ label: '7', value: 3.24 },
		],
		color: '#ec4899',
	},
	{
		title: 'Cart Abandonment',
		value: '68.5%',
		change: '+1.2%',
		trend: 'down',
		data: [
			{ label: '1', value: 65 },
			{ label: '2', value: 67 },
			{ label: '3', value: 66 },
			{ label: '4', value: 68 },
			{ label: '5', value: 67 },
			{ label: '6', value: 69 },
			{ label: '7', value: 68.5 },
		],
		color: '#ef4444',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @lg:gap-6">
					{charts.map((chart, i) => (
						<ChartCard key={i} {...chart} />
					))}
				</div>
			</div>
		</section>
	);
}
