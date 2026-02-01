'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type DataPoint = { label: string; value: number };

type RangeData = { min: number; max: number; avg: number };

const RangeAreaChart = ({
	data,
	ranges,
}: {
	data: DataPoint[];
	ranges: RangeData[];
}) => {
	const allValues = [
		...data.map((d) => d.value),
		...ranges.flatMap((r) => [r.min, r.max]),
	];
	const max = Math.max(...allValues);

	const valuePoints = data.map((d, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - (d.value / max) * 80 - 10,
	}));

	const minPoints = ranges.map((r, i) => ({
		x: (i / (ranges.length - 1)) * 100,
		y: 100 - (r.min / max) * 80 - 10,
	}));

	const maxPoints = ranges.map((r, i) => ({
		x: (i / (ranges.length - 1)) * 100,
		y: 100 - (r.max / max) * 80 - 10,
	}));

	const avgPoints = ranges.map((r, i) => ({
		x: (i / (ranges.length - 1)) * 100,
		y: 100 - (r.avg / max) * 80 - 10,
	}));

	const createPath = (points: { x: number; y: number }[]) =>
		points.reduce(
			(acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
			'',
		);

	const maxPath = createPath(maxPoints);
	const minPathReverse = [...minPoints]
		.reverse()
		.reduce(
			(acc, p, i) => (i === 0 ? `L ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
			'',
		);
	const rangePath = `${maxPath} ${minPathReverse} Z`;

	const valuePath = createPath(valuePoints);
	const avgPath = createPath(avgPoints);

	return (
		<div className="relative h-64 w-full">
			<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				className="w-full h-full"
			>
				<defs>
					<linearGradient id="rangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
						<stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
					</linearGradient>
				</defs>
				<path d={rangePath} fill="url(#rangeGrad)" />
				<path
					d={avgPath}
					fill="none"
					stroke="#3b82f6"
					strokeWidth="0.3"
					strokeDasharray="2,1"
				/>
				<path
					d={valuePath}
					fill="none"
					stroke="hsl(var(--primary))"
					strokeWidth="0.6"
				/>
				{valuePoints.map((p, i) => (
					<circle
						key={i}
						cx={p.x}
						cy={p.y}
						r="0.8"
						fill="hsl(var(--primary))"
					/>
				))}
			</svg>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
				{data
					.filter((_, i) => i % 2 === 0)
					.map((d, i) => (
						<span key={i}>{d.label}</span>
					))}
			</div>
		</div>
	);
};

const performanceData: DataPoint[] = [
	{ label: 'Jan', value: 85 },
	{ label: 'Feb', value: 92 },
	{ label: 'Mar', value: 78 },
	{ label: 'Apr', value: 95 },
	{ label: 'May', value: 88 },
	{ label: 'Jun', value: 102 },
	{ label: 'Jul', value: 96 },
	{ label: 'Aug', value: 110 },
	{ label: 'Sep', value: 98 },
	{ label: 'Oct', value: 115 },
	{ label: 'Nov', value: 108 },
	{ label: 'Dec', value: 120 },
];

const rangeData: RangeData[] = performanceData.map((d) => ({
	min: d.value * 0.85,
	max: d.value * 1.15,
	avg: d.value * 0.95,
}));

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-start justify-between pb-2">
						<div>
							<CardTitle className="text-sm font-medium">
								Performance with Confidence Interval
							</CardTitle>
							<p className="text-xs text-muted-foreground">
								Actual performance vs expected range
							</p>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<div className="w-4 h-3 rounded bg-blue-500/20 border border-blue-500/40" />
								<span className="text-xs text-muted-foreground">
									Expected Range
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-0.5 bg-primary" />
								<span className="text-xs text-muted-foreground">Actual</span>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex items-baseline gap-4 mb-6">
							<p className="text-3xl font-bold">120</p>
							<Badge variant="secondary" className="text-emerald-500">
								+8.5% above avg
							</Badge>
						</div>
						<RangeAreaChart data={performanceData} ranges={rangeData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
