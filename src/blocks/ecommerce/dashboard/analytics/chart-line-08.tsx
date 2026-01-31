'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type DataPoint = { label: string; value: number };

const GradientLineChart = ({ data, color }: { data: DataPoint[]; color: string }) => {
	const max = Math.max(...data.map((d) => d.value));
	const min = Math.min(...data.map((d) => d.value));
	const range = max - min || 1;

	const points = data.map((d, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - ((d.value - min) / range) * 80 - 10,
	}));

	const pathD = points.reduce((acc, p, i) => {
		if (i === 0) return `M ${p.x} ${p.y}`;
		const prev = points[i - 1];
		const cp1x = prev.x + (p.x - prev.x) / 3;
		const cp2x = p.x - (p.x - prev.x) / 3;
		return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${p.y}, ${p.x} ${p.y}`;
	}, '');

	const areaD = `${pathD} L 100 100 L 0 100 Z`;
	const id = `grad-${color.replace('#', '')}`;

	return (
		<div className="relative h-48 w-full">
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
				<defs>
					<linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor={color} stopOpacity="0.4" />
						<stop offset="100%" stopColor={color} stopOpacity="0" />
					</linearGradient>
				</defs>
				<path d={areaD} fill={`url(#${id})`} />
				<path d={pathD} fill="none" stroke={color} strokeWidth="0.5" />
			</svg>
		</div>
	);
};

type ChartCardData = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	data: DataPoint[];
	color: string;
};

const ChartCard = ({ title, value, change, trend, data, color }: ChartCardData) => (
	<Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
		<CardHeader className="pb-0">
			<div className="flex items-center justify-between">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Badge
					variant="outline"
					className={`text-xs ${trend === 'up' ? 'text-emerald-500 border-emerald-500/30' : 'text-rose-500 border-rose-500/30'}`}
				>
					{change}
				</Badge>
			</div>
			<p className="text-2xl font-bold mt-1">{value}</p>
		</CardHeader>
		<CardContent className="p-0">
			<GradientLineChart data={data} color={color} />
		</CardContent>
	</Card>
);

const chartCards: ChartCardData[] = [
	{
		title: 'Revenue',
		value: '$124,532',
		change: '+12.5%',
		trend: 'up',
		data: [{ label: '1', value: 45 }, { label: '2', value: 52 }, { label: '3', value: 48 }, { label: '4', value: 65 }, { label: '5', value: 58 }, { label: '6', value: 72 }, { label: '7', value: 85 }],
		color: '#3b82f6',
	},
	{
		title: 'Orders',
		value: '3,847',
		change: '+8.3%',
		trend: 'up',
		data: [{ label: '1', value: 32 }, { label: '2', value: 38 }, { label: '3', value: 35 }, { label: '4', value: 42 }, { label: '5', value: 48 }, { label: '6', value: 52 }, { label: '7', value: 58 }],
		color: '#22c55e',
	},
	{
		title: 'Customers',
		value: '1,284',
		change: '+15.2%',
		trend: 'up',
		data: [{ label: '1', value: 120 }, { label: '2', value: 135 }, { label: '3', value: 148 }, { label: '4', value: 162 }, { label: '5', value: 178 }, { label: '6', value: 195 }, { label: '7', value: 212 }],
		color: '#a855f7',
	},
	{
		title: 'Refunds',
		value: '$2,340',
		change: '+5.1%',
		trend: 'down',
		data: [{ label: '1', value: 180 }, { label: '2', value: 195 }, { label: '3', value: 185 }, { label: '4', value: 200 }, { label: '5', value: 210 }, { label: '6', value: 205 }, { label: '7', value: 220 }],
		color: '#ef4444',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
					{chartCards.map((card, i) => (
						<ChartCard key={i} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
