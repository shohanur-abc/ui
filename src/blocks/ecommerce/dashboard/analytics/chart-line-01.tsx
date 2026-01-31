'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type LineData = { label: string; value: number };

const SimpleLineChart = ({ data }: { data: LineData[] }) => {
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

	return (
		<div className="relative h-64 w-full">
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
				{[0, 25, 50, 75, 100].map((y) => (
					<line key={y} x1="0" y1={y} x2="100" y2={y} stroke="hsl(var(--border))" strokeWidth="0.1" />
				))}
				<path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" />
				{points.map((p, i) => (
					<circle key={i} cx={p.x} cy={p.y} r="0.8" fill="hsl(var(--primary))" />
				))}
			</svg>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
				{data.filter((_, i) => i % 3 === 0).map((d, i) => (
					<span key={i}>{d.label}</span>
				))}
			</div>
		</div>
	);
};

const revenueData: LineData[] = [
	{ label: 'Jan', value: 42000 },
	{ label: 'Feb', value: 48000 },
	{ label: 'Mar', value: 45000 },
	{ label: 'Apr', value: 52000 },
	{ label: 'May', value: 58000 },
	{ label: 'Jun', value: 55000 },
	{ label: 'Jul', value: 62000 },
	{ label: 'Aug', value: 68000 },
	{ label: 'Sep', value: 65000 },
	{ label: 'Oct', value: 72000 },
	{ label: 'Nov', value: 78000 },
	{ label: 'Dec', value: 85000 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Annual Revenue Trend</CardTitle>
						<p className="text-xs text-muted-foreground">Monthly revenue over the year</p>
					</CardHeader>
					<CardContent>
						<SimpleLineChart data={revenueData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
