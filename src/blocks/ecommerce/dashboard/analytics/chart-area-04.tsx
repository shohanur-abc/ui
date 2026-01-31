'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type DataPoint = {
	label: string;
	value: number;
};

const StackedAreaChart = ({ series, labels }: { series: { name: string; color: string; data: number[] }[]; labels: string[] }) => {
	const stackedData = labels.map((_, i) => {
		let cumulative = 0;
		return series.map((s) => {
			const start = cumulative;
			cumulative += s.data[i];
			return { start, end: cumulative };
		});
	});

	const maxValue = Math.max(...stackedData.map((d) => d[d.length - 1].end));

	return (
		<div className="relative h-64 w-full">
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
				<defs>
					{series.map((s, i) => (
						<linearGradient key={i} id={`stacked-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor={s.color} stopOpacity="0.8" />
							<stop offset="100%" stopColor={s.color} stopOpacity="0.4" />
						</linearGradient>
					))}
				</defs>
				{series.map((s, seriesIndex) => {
					const points = stackedData.map((d, i) => ({
						x: (i / (labels.length - 1)) * 100,
						yTop: 100 - (d[seriesIndex].end / maxValue) * 100,
						yBottom: 100 - (d[seriesIndex].start / maxValue) * 100,
					}));

					const topPath = points.reduce((acc, p, i) => {
						if (i === 0) return `M ${p.x} ${p.yTop}`;
						return `${acc} L ${p.x} ${p.yTop}`;
					}, '');

					const bottomPath = [...points].reverse().reduce((acc, p, i) => {
						if (i === 0) return `L ${p.x} ${p.yBottom}`;
						return `${acc} L ${p.x} ${p.yBottom}`;
					}, '');

					return (
						<path
							key={seriesIndex}
							d={`${topPath} ${bottomPath} Z`}
							fill={`url(#stacked-${seriesIndex})`}
						/>
					);
				})}
			</svg>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
				{labels.filter((_, i) => i % Math.ceil(labels.length / 6) === 0).map((label, i) => (
					<span key={i}>{label}</span>
				))}
			</div>
		</div>
	);
};

const Legend = ({ series }: { series: { name: string; color: string }[] }) => (
	<div className="flex flex-wrap items-center justify-center gap-4 @md:gap-6 mt-4">
		{series.map((s, i) => (
			<div key={i} className="flex items-center gap-2">
				<div className="size-3 rounded" style={{ backgroundColor: s.color }} />
				<span className="text-xs text-muted-foreground">{s.name}</span>
			</div>
		))}
	</div>
);

const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];

const revenueSeries = [
	{ name: 'Product Sales', color: '#3b82f6', data: [12000, 15000, 13500, 18000, 16500, 21000, 19500, 24000] },
	{ name: 'Subscriptions', color: '#22c55e', data: [5000, 5500, 5200, 6000, 5800, 6500, 6200, 7000] },
	{ name: 'Services', color: '#a855f7', data: [3000, 3500, 3200, 4000, 3800, 4500, 4200, 5000] },
	{ name: 'Other', color: '#f59e0b', data: [1000, 1200, 1100, 1400, 1300, 1600, 1500, 1800] },
];

const totalRevenue = revenueSeries.reduce((acc, s) => acc + s.data.reduce((a, b) => a + b, 0), 0);

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-start justify-between pb-2">
						<div>
							<CardTitle className="text-sm font-medium">Revenue by Source</CardTitle>
							<p className="text-xs text-muted-foreground">Stacked view of revenue streams</p>
						</div>
						<div className="text-right">
							<p className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</p>
							<Badge variant="secondary" className="mt-1">+18.5%</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<StackedAreaChart series={revenueSeries} labels={labels} />
						<Legend series={revenueSeries} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
