'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DataPoint = { label: string; value: number };

const StepLineChart = ({ data }: { data: DataPoint[] }) => {
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
		return `${acc} H ${p.x} V ${p.y}`;
	}, '');

	return (
		<div className="relative h-64 w-full">
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
				{[0, 25, 50, 75, 100].map((y) => (
					<line key={y} x1="0" y1={y} x2="100" y2={y} stroke="hsl(var(--border))" strokeWidth="0.1" />
				))}
				<path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
				{points.map((p, i) => (
					<circle key={i} cx={p.x} cy={p.y} r="0.8" fill="hsl(var(--primary))" />
				))}
			</svg>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
				{data.map((d, i) => (
					<span key={i}>{d.label}</span>
				))}
			</div>
		</div>
	);
};

const pricingData: DataPoint[] = [
	{ label: 'Q1 22', value: 29 },
	{ label: 'Q2 22', value: 29 },
	{ label: 'Q3 22', value: 35 },
	{ label: 'Q4 22', value: 35 },
	{ label: 'Q1 23', value: 39 },
	{ label: 'Q2 23', value: 39 },
	{ label: 'Q3 23', value: 45 },
	{ label: 'Q4 23', value: 49 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Pricing History</CardTitle>
						<p className="text-xs text-muted-foreground">Step chart showing price changes over time</p>
					</CardHeader>
					<CardContent>
						<div className="flex items-baseline gap-2 mb-4">
							<span className="text-3xl font-bold">$49</span>
							<span className="text-sm text-muted-foreground">current price</span>
						</div>
						<StepLineChart data={pricingData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
