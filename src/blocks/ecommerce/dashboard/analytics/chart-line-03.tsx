'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

type SparklineData = {
	title: string;
	value: string;
	change: number;
	data: number[];
	color: string;
};

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
	const max = Math.max(...data);
	const min = Math.min(...data);
	const range = max - min || 1;

	const points = data.map((v, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - ((v - min) / range) * 90 - 5,
	}));

	const pathD = points.reduce(
		(acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
		'',
	);

	return (
		<svg
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
			className="w-full h-12"
		>
			<path
				d={pathD}
				fill="none"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

const SparklineCard = ({
	title,
	value,
	change,
	data,
	color,
}: SparklineData) => (
	<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-2">
				<span className="text-xs text-muted-foreground">{title}</span>
				<Badge
					variant="outline"
					className={`text-xs ${change >= 0 ? 'text-emerald-500 border-emerald-500/30' : 'text-rose-500 border-rose-500/30'}`}
				>
					{change >= 0 ? (
						<TrendingUp className="size-3 mr-1" />
					) : (
						<TrendingDown className="size-3 mr-1" />
					)}
					{change >= 0 ? '+' : ''}
					{change}%
				</Badge>
			</div>
			<p className="text-2xl font-bold mb-3">{value}</p>
			<Sparkline data={data} color={color} />
		</CardContent>
	</Card>
);

const sparklineCards: SparklineData[] = [
	{
		title: 'Active Users',
		value: '12,453',
		change: 12.5,
		data: [45, 52, 48, 65, 58, 72, 85],
		color: '#3b82f6',
	},
	{
		title: 'Page Views',
		value: '845,231',
		change: 8.3,
		data: [32, 38, 35, 42, 48, 52, 58],
		color: '#22c55e',
	},
	{
		title: 'Bounce Rate',
		value: '32.4%',
		change: -2.1,
		data: [42, 38, 40, 35, 38, 34, 32],
		color: '#a855f7',
	},
	{
		title: 'Avg. Session',
		value: '4m 32s',
		change: 5.8,
		data: [220, 235, 228, 248, 255, 262, 272],
		color: '#f59e0b',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
					{sparklineCards.map((card, i) => (
						<SparklineCard key={i} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
