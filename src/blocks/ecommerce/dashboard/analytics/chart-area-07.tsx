'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type HourlyData = { hour: string; value: number };

const RealtimeAreaChart = ({ data }: { data: HourlyData[] }) => {
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
		const cpX = (prev.x + p.x) / 2;
		return `${acc} Q ${cpX} ${prev.y}, ${p.x} ${p.y}`;
	}, '');

	const areaD = `${pathD} L 100 100 L 0 100 Z`;

	return (
		<div className="relative h-48 w-full">
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
				<defs>
					<linearGradient id="realtimeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
						<stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
					</linearGradient>
					<linearGradient id="realtimeLine" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
						<stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
					</linearGradient>
				</defs>
				<path d={areaD} fill="url(#realtimeGrad)" />
				<path d={pathD} fill="none" stroke="url(#realtimeLine)" strokeWidth="0.5" />
				<circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="1.5" fill="#3b82f6">
					<animate attributeName="r" values="1.5;2;1.5" dur="1s" repeatCount="indefinite" />
				</circle>
			</svg>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
				{data.filter((_, i) => i % 4 === 0).map((d, i) => (
					<span key={i}>{d.hour}</span>
				))}
			</div>
		</div>
	);
};

const realtimeData: HourlyData[] = Array.from({ length: 24 }, (_, i) => ({
	hour: `${i}:00`,
	value: Math.floor(Math.random() * 500 + 200 + Math.sin(i / 3) * 200),
}));

const currentValue = realtimeData[realtimeData.length - 1].value;
const avgValue = Math.floor(realtimeData.reduce((a, b) => a + b.value, 0) / realtimeData.length);
const peakValue = Math.max(...realtimeData.map((d) => d.value));

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<div className="flex items-center gap-3">
							<div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
							<CardTitle className="text-sm font-medium">Real-time Visitors</CardTitle>
						</div>
						<Badge variant="outline">Live</Badge>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-3 gap-4 mb-6">
							<div className="p-3 rounded-lg bg-muted/30 border border-border/30">
								<p className="text-xs text-muted-foreground">Current</p>
								<p className="text-2xl font-bold">{currentValue}</p>
							</div>
							<div className="p-3 rounded-lg bg-muted/30">
								<p className="text-xs text-muted-foreground">24h Average</p>
								<p className="text-2xl font-bold">{avgValue}</p>
							</div>
							<div className="p-3 rounded-lg bg-muted/30">
								<p className="text-xs text-muted-foreground">Peak Today</p>
								<p className="text-2xl font-bold">{peakValue}</p>
							</div>
						</div>
						<RealtimeAreaChart data={realtimeData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
