'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DataPoint = { label: string; actual: number; predicted: number };

const PredictionLineChart = ({ data }: { data: DataPoint[] }) => {
	const allValues = data.flatMap((d) =>
		[d.actual, d.predicted].filter((v) => v > 0),
	);
	const max = Math.max(...allValues);
	const min = Math.min(...allValues);
	const range = max - min || 1;

	const actualData = data.filter((d) => d.actual > 0);
	const predictedData = data.filter((d) => d.predicted > 0);

	const actualPoints = actualData.map((d, i) => ({
		x: (data.indexOf(d) / (data.length - 1)) * 100,
		y: 100 - ((d.actual - min) / range) * 80 - 10,
	}));

	const predictedPoints = predictedData.map((d, i) => ({
		x: (data.indexOf(d) / (data.length - 1)) * 100,
		y: 100 - ((d.predicted - min) / range) * 80 - 10,
	}));

	const createPath = (points: { x: number; y: number }[]) =>
		points.reduce(
			(acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
			'',
		);

	const actualPath = createPath(actualPoints);
	const predictedPath = createPath(predictedPoints);

	const transitionX =
		actualPoints.length > 0 ? actualPoints[actualPoints.length - 1].x : 0;

	return (
		<div className="relative h-64 w-full">
			<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				className="w-full h-full"
			>
				<defs>
					<linearGradient id="predGrad" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
						<stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
					</linearGradient>
				</defs>
				<rect
					x={transitionX}
					y="0"
					width={100 - transitionX}
					height="100"
					fill="url(#predGrad)"
				/>
				<line
					x1={transitionX}
					y1="0"
					x2={transitionX}
					y2="100"
					stroke="hsl(var(--border))"
					strokeWidth="0.2"
					strokeDasharray="2,1"
				/>
				<path d={actualPath} fill="none" stroke="#3b82f6" strokeWidth="0.5" />
				<path
					d={predictedPath}
					fill="none"
					stroke="#a855f7"
					strokeWidth="0.5"
					strokeDasharray="1.5,0.5"
				/>
				{actualPoints.map((p, i) => (
					<circle key={`a-${i}`} cx={p.x} cy={p.y} r="0.6" fill="#3b82f6" />
				))}
			</svg>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
				{data
					.filter((_, i) => i % 2 === 0)
					.map((d, i) => (
						<span key={i}>{d.label}</span>
					))}
			</div>
			<div className="absolute top-2 right-2 text-xs bg-purple-500/10 border border-purple-500/30 rounded px-2 py-1 text-purple-500">
				Forecast Zone
			</div>
		</div>
	);
};

const forecastData: DataPoint[] = [
	{ label: 'Jan', actual: 42000, predicted: 0 },
	{ label: 'Feb', actual: 48000, predicted: 0 },
	{ label: 'Mar', actual: 45000, predicted: 0 },
	{ label: 'Apr', actual: 52000, predicted: 0 },
	{ label: 'May', actual: 58000, predicted: 0 },
	{ label: 'Jun', actual: 55000, predicted: 0 },
	{ label: 'Jul', actual: 0, predicted: 55000 },
	{ label: 'Aug', actual: 0, predicted: 62000 },
	{ label: 'Sep', actual: 0, predicted: 68000 },
	{ label: 'Oct', actual: 0, predicted: 72000 },
	{ label: 'Nov', actual: 0, predicted: 78000 },
	{ label: 'Dec', actual: 0, predicted: 85000 },
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
								Actual performance with AI predictions
							</p>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<div className="w-4 h-0.5 bg-blue-500" />
								<span className="text-xs text-muted-foreground">Actual</span>
							</div>
							<div className="flex items-center gap-2">
								<div
									className="w-4 h-0.5 bg-purple-500 border-dashed"
									style={{ borderBottom: '2px dashed #a855f7', height: 0 }}
								/>
								<span className="text-xs text-muted-foreground">Predicted</span>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<PredictionLineChart data={forecastData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
