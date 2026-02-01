'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type DataPoint = { label: string; actual: number; forecast: number };

const ForecastAreaChart = ({ data }: { data: DataPoint[] }) => {
	const allValues = data.flatMap((d) => [d.actual, d.forecast]);
	const max = Math.max(...allValues);

	const actualPoints = data.map((d, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - (d.actual / max) * 80 - 10,
	}));

	const forecastPoints = data.map((d, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - (d.forecast / max) * 80 - 10,
	}));

	const createPath = (points: { x: number; y: number }[]) =>
		points.reduce((acc, p, i) => {
			if (i === 0) return `M ${p.x} ${p.y}`;
			return `${acc} L ${p.x} ${p.y}`;
		}, '');

	const actualPath = createPath(actualPoints);
	const forecastPath = createPath(forecastPoints);

	return (
		<div className="relative h-64 w-full">
			<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				className="w-full h-full"
			>
				<defs>
					<linearGradient id="actualGrad" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
						<stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
					</linearGradient>
					<linearGradient id="forecastGrad" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
						<stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
					</linearGradient>
				</defs>
				<path
					d={`${forecastPath} L 100 100 L 0 100 Z`}
					fill="url(#forecastGrad)"
				/>
				<path
					d={forecastPath}
					fill="none"
					stroke="#22c55e"
					strokeWidth="0.4"
					strokeDasharray="2,1"
				/>
				<path d={`${actualPath} L 100 100 L 0 100 Z`} fill="url(#actualGrad)" />
				<path d={actualPath} fill="none" stroke="#3b82f6" strokeWidth="0.5" />
				{actualPoints.map((p, i) => (
					<circle key={i} cx={p.x} cy={p.y} r="0.8" fill="#3b82f6" />
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

const forecastData: DataPoint[] = [
	{ label: 'Jan', actual: 42000, forecast: 40000 },
	{ label: 'Feb', actual: 48000, forecast: 45000 },
	{ label: 'Mar', actual: 45000, forecast: 48000 },
	{ label: 'Apr', actual: 52000, forecast: 50000 },
	{ label: 'May', actual: 58000, forecast: 55000 },
	{ label: 'Jun', actual: 55000, forecast: 58000 },
	{ label: 'Jul', actual: 0, forecast: 62000 },
	{ label: 'Aug', actual: 0, forecast: 65000 },
	{ label: 'Sep', actual: 0, forecast: 68000 },
	{ label: 'Oct', actual: 0, forecast: 72000 },
	{ label: 'Nov', actual: 0, forecast: 75000 },
	{ label: 'Dec', actual: 0, forecast: 80000 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-start justify-between pb-2">
						<div>
							<CardTitle className="text-sm font-medium">
								Revenue Forecast
							</CardTitle>
							<p className="text-xs text-muted-foreground">
								Actual vs Projected
							</p>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<div className="w-4 h-0.5 bg-blue-500" />
								<span className="text-xs text-muted-foreground">Actual</span>
							</div>
							<div className="flex items-center gap-2">
								<div
									className="w-4 h-0.5 bg-emerald-500 border-dashed"
									style={{ borderBottom: '2px dashed #22c55e', height: 0 }}
								/>
								<span className="text-xs text-muted-foreground">Forecast</span>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-3 gap-4 mb-6">
							<div className="p-3 rounded-lg bg-muted/30">
								<p className="text-xs text-muted-foreground">YTD Actual</p>
								<p className="text-xl font-bold">$300K</p>
							</div>
							<div className="p-3 rounded-lg bg-muted/30">
								<p className="text-xs text-muted-foreground">
									Full Year Forecast
								</p>
								<p className="text-xl font-bold">$718K</p>
							</div>
							<div className="p-3 rounded-lg bg-muted/30">
								<p className="text-xs text-muted-foreground">Variance</p>
								<p className="text-xl font-bold text-emerald-500">+4.2%</p>
							</div>
						</div>
						<ForecastAreaChart data={forecastData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
