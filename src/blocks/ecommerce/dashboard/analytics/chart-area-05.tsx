'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

type DataPoint = {
	time: string;
	value: number;
};

const GradientAreaChart = ({
	data,
	showGrid = true,
}: {
	data: DataPoint[];
	showGrid?: boolean;
}) => {
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
		const cp1x = prev.x + (p.x - prev.x) / 2;
		const cp2x = p.x - (p.x - prev.x) / 2;
		return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${p.y}, ${p.x} ${p.y}`;
	}, '');

	const areaD = `${pathD} L 100 100 L 0 100 Z`;

	return (
		<div className="relative h-72 w-full">
			<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				className="w-full h-full"
			>
				<defs>
					<linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop
							offset="0%"
							stopColor="hsl(var(--primary))"
							stopOpacity="0.5"
						/>
						<stop
							offset="50%"
							stopColor="hsl(var(--primary))"
							stopOpacity="0.2"
						/>
						<stop
							offset="100%"
							stopColor="hsl(var(--primary))"
							stopOpacity="0"
						/>
					</linearGradient>
					<filter id="glow">
						<feGaussianBlur stdDeviation="1" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>
				{showGrid && (
					<g className="text-border" stroke="currentColor" strokeOpacity="0.1">
						{[20, 40, 60, 80].map((y) => (
							<line key={y} x1="0" y1={y} x2="100" y2={y} strokeWidth="0.2" />
						))}
					</g>
				)}
				<path d={areaD} fill="url(#gradientFill)" />
				<path
					d={pathD}
					fill="none"
					stroke="hsl(var(--primary))"
					strokeWidth="0.4"
					filter="url(#glow)"
				/>
				{points
					.filter((_, i) => i === points.length - 1)
					.map((p, i) => (
						<circle
							key={i}
							cx={p.x}
							cy={p.y}
							r="1"
							fill="hsl(var(--primary))"
						/>
					))}
			</svg>
			<div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-xs text-muted-foreground">
				<span>${(max / 1000).toFixed(0)}K</span>
				<span>${((max + min) / 2 / 1000).toFixed(0)}K</span>
				<span>${(min / 1000).toFixed(0)}K</span>
			</div>
			<div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-muted-foreground">
				{data
					.filter((_, i) => i % Math.ceil(data.length / 5) === 0)
					.map((d, i) => (
						<span key={i}>{d.time}</span>
					))}
			</div>
		</div>
	);
};

const TimeRangeSelector = ({
	ranges,
	active,
	onSelect,
}: {
	ranges: TimeRange[];
	active: TimeRange;
	onSelect: (r: TimeRange) => void;
}) => (
	<div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
		{ranges.map((r) => (
			<button
				key={r}
				onClick={() => onSelect(r)}
				className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${active === r ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}
			>
				{r}
			</button>
		))}
	</div>
);

const monthlyData: DataPoint[] = [
	{ time: 'Jan 1', value: 42000 },
	{ time: 'Jan 5', value: 45000 },
	{ time: 'Jan 10', value: 43500 },
	{ time: 'Jan 15', value: 48000 },
	{ time: 'Jan 20', value: 52000 },
	{ time: 'Jan 25', value: 49000 },
	{ time: 'Feb 1', value: 55000 },
	{ time: 'Feb 5', value: 58000 },
	{ time: 'Feb 10', value: 54000 },
	{ time: 'Feb 15', value: 62000 },
	{ time: 'Feb 20', value: 68000 },
	{ time: 'Feb 25', value: 72000 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col @md:flex-row @md:items-center justify-between gap-4 pb-2">
						<div>
							<CardTitle className="text-sm font-medium">
								Revenue Trend
							</CardTitle>
							<div className="flex items-baseline gap-2 mt-1">
								<p className="text-3xl font-bold">$72,450</p>
								<Badge variant="secondary" className="text-emerald-500">
									+15.3%
								</Badge>
							</div>
						</div>
						<TimeRangeSelector
							ranges={['1D', '1W', '1M', '3M', '1Y', 'ALL']}
							active="1M"
							onSelect={() => {}}
						/>
					</CardHeader>
					<CardContent>
						<GradientAreaChart data={monthlyData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
