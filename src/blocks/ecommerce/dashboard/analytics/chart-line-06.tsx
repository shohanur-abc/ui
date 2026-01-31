'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DataPoint = { label: string; value: number };
type Annotation = { index: number; label: string; description: string };

const AnnotatedLineChart = ({ data, annotations }: { data: DataPoint[]; annotations: Annotation[] }) => {
	const max = Math.max(...data.map((d) => d.value));
	const min = Math.min(...data.map((d) => d.value));
	const range = max - min || 1;

	const points = data.map((d, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - ((d.value - min) / range) * 70 - 15,
	}));

	const pathD = points.reduce((acc, p, i) => {
		if (i === 0) return `M ${p.x} ${p.y}`;
		const prev = points[i - 1];
		const cpX = (prev.x + p.x) / 2;
		return `${acc} Q ${cpX} ${prev.y}, ${p.x} ${p.y}`;
	}, '');

	return (
		<div className="relative h-72 w-full">
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
				<path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
				{points.map((p, i) => (
					<circle key={i} cx={p.x} cy={p.y} r="0.5" fill="hsl(var(--primary))" />
				))}
				{annotations.map((a, i) => {
					const point = points[a.index];
					if (!point) return null;
					return (
						<g key={i}>
							<line
								x1={point.x}
								y1={point.y}
								x2={point.x}
								y2={point.y - 15}
								stroke="hsl(var(--muted-foreground))"
								strokeWidth="0.2"
								strokeDasharray="1,0.5"
							/>
							<circle cx={point.x} cy={point.y} r="1.5" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="0.3" />
							<text x={point.x} y={point.y - 17} textAnchor="middle" fontSize="2.5" fill="hsl(var(--foreground))">
								{a.label}
							</text>
						</g>
					);
				})}
			</svg>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
				{data.filter((_, i) => i % 2 === 0).map((d, i) => (
					<span key={i}>{d.label}</span>
				))}
			</div>
		</div>
	);
};

const salesData: DataPoint[] = [
	{ label: 'Jan', value: 42000 },
	{ label: 'Feb', value: 45000 },
	{ label: 'Mar', value: 48000 },
	{ label: 'Apr', value: 52000 },
	{ label: 'May', value: 85000 },
	{ label: 'Jun', value: 62000 },
	{ label: 'Jul', value: 58000 },
	{ label: 'Aug', value: 55000 },
	{ label: 'Sep', value: 68000 },
	{ label: 'Oct', value: 72000 },
	{ label: 'Nov', value: 95000 },
	{ label: 'Dec', value: 120000 },
];

const salesAnnotations: Annotation[] = [
	{ index: 4, label: 'Sale Event', description: 'Spring sale launched' },
	{ index: 10, label: 'Black Friday', description: 'Highest traffic' },
	{ index: 11, label: 'Holiday Peak', description: 'Record revenue' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Annual Sales with Events</CardTitle>
						<p className="text-xs text-muted-foreground">Key events and their impact on revenue</p>
					</CardHeader>
					<CardContent>
						<AnnotatedLineChart data={salesData} annotations={salesAnnotations} />
						<div className="mt-4 flex flex-wrap gap-4">
							{salesAnnotations.map((a, i) => (
								<div key={i} className="flex items-center gap-2 text-xs">
									<div className="size-2 rounded-full bg-primary" />
									<span className="font-medium">{a.label}:</span>
									<span className="text-muted-foreground">{a.description}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
