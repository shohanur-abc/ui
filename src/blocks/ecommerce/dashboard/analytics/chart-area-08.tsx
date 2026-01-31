'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ComparisonData = { label: string; current: number; previous: number };

const ComparisonAreaChart = ({ data }: { data: ComparisonData[] }) => {
	const allValues = data.flatMap((d) => [d.current, d.previous]);
	const max = Math.max(...allValues);

	const createPoints = (values: number[]) =>
		values.map((v, i) => ({
			x: (i / (values.length - 1)) * 100,
			y: 100 - (v / max) * 80 - 10,
		}));

	const currentPoints = createPoints(data.map((d) => d.current));
	const previousPoints = createPoints(data.map((d) => d.previous));

	const createPath = (points: { x: number; y: number }[]) =>
		points.reduce((acc, p, i) => {
			if (i === 0) return `M ${p.x} ${p.y}`;
			const prev = points[i - 1];
			const cp1x = prev.x + (p.x - prev.x) / 3;
			const cp2x = p.x - (p.x - prev.x) / 3;
			return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${p.y}, ${p.x} ${p.y}`;
		}, '');

	const currentPath = createPath(currentPoints);
	const previousPath = createPath(previousPoints);

	return (
		<div className="relative h-64 w-full">
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
				<defs>
					<linearGradient id="currentGradComp" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
						<stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
					</linearGradient>
				</defs>
				<path d={`${previousPath} L 100 100 L 0 100 Z`} fill="hsl(var(--muted))" fillOpacity="0.3" />
				<path d={previousPath} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" strokeDasharray="1,1" />
				<path d={`${currentPath} L 100 100 L 0 100 Z`} fill="url(#currentGradComp)" />
				<path d={currentPath} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
			</svg>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
				{data.filter((_, i) => i % 2 === 0).map((d, i) => (
					<span key={i}>{d.label}</span>
				))}
			</div>
		</div>
	);
};

const comparisonData: ComparisonData[] = [
	{ label: 'Mon', current: 4500, previous: 4000 },
	{ label: 'Tue', current: 5200, previous: 4800 },
	{ label: 'Wed', current: 4800, previous: 5000 },
	{ label: 'Thu', current: 6100, previous: 5200 },
	{ label: 'Fri', current: 7200, previous: 5800 },
	{ label: 'Sat', current: 8500, previous: 6200 },
	{ label: 'Sun', current: 7800, previous: 5500 },
];

const currentTotal = comparisonData.reduce((a, b) => a + b.current, 0);
const previousTotal = comparisonData.reduce((a, b) => a + b.previous, 0);
const changePercent = ((currentTotal - previousTotal) / previousTotal * 100).toFixed(1);

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-start justify-between pb-2">
						<div>
							<CardTitle className="text-sm font-medium">Weekly Comparison</CardTitle>
							<p className="text-xs text-muted-foreground">This week vs Last week</p>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<div className="w-4 h-0.5 bg-primary" />
								<span className="text-xs text-muted-foreground">This Week</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-0.5 bg-muted-foreground/50 border-dashed" />
								<span className="text-xs text-muted-foreground">Last Week</span>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-3 gap-4 mb-6">
							<div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
								<p className="text-xs text-muted-foreground">This Week</p>
								<p className="text-2xl font-bold">${(currentTotal / 1000).toFixed(1)}K</p>
							</div>
							<div className="p-4 rounded-lg bg-muted/30">
								<p className="text-xs text-muted-foreground">Last Week</p>
								<p className="text-2xl font-bold">${(previousTotal / 1000).toFixed(1)}K</p>
							</div>
							<div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
								<p className="text-xs text-muted-foreground">Change</p>
								<p className="text-2xl font-bold text-emerald-500">+{changePercent}%</p>
							</div>
						</div>
						<ComparisonAreaChart data={comparisonData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
