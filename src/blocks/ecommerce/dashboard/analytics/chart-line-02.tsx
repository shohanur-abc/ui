'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type MultiLineData = {
	label: string;
	values: { name: string; value: number; color: string }[];
};

const MultiLineChart = ({
	data,
	legend,
}: {
	data: MultiLineData[];
	legend: { name: string; color: string }[];
}) => {
	const allValues = data.flatMap((d) => d.values.map((v) => v.value));
	const max = Math.max(...allValues);
	const min = Math.min(...allValues);
	const range = max - min || 1;

	const seriesData = legend.map((l) => ({
		...l,
		points: data.map((d, i) => {
			const v = d.values.find((v) => v.name === l.name);
			return {
				x: (i / (data.length - 1)) * 100,
				y: 100 - (((v?.value || 0) - min) / range) * 80 - 10,
			};
		}),
	}));

	const createPath = (points: { x: number; y: number }[]) =>
		points.reduce((acc, p, i) => {
			if (i === 0) return `M ${p.x} ${p.y}`;
			const prev = points[i - 1];
			const cp1x = prev.x + (p.x - prev.x) / 3;
			const cp2x = p.x - (p.x - prev.x) / 3;
			return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${p.y}, ${p.x} ${p.y}`;
		}, '');

	return (
		<div className="relative h-64 w-full">
			<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				className="w-full h-full"
			>
				{[0, 25, 50, 75, 100].map((y) => (
					<line
						key={y}
						x1="0"
						y1={y}
						x2="100"
						y2={y}
						stroke="hsl(var(--border))"
						strokeWidth="0.1"
					/>
				))}
				{seriesData.map((series, i) => (
					<path
						key={i}
						d={createPath(series.points)}
						fill="none"
						stroke={series.color}
						strokeWidth="0.4"
					/>
				))}
			</svg>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
				{data
					.filter((_, i) => i % 3 === 0)
					.map((d, i) => (
						<span key={i}>{d.label}</span>
					))}
			</div>
		</div>
	);
};

const legend = [
	{ name: 'Desktop', color: '#3b82f6' },
	{ name: 'Mobile', color: '#22c55e' },
	{ name: 'Tablet', color: '#f59e0b' },
];

const trafficData: MultiLineData[] = [
	{
		label: 'Jan',
		values: [
			{ name: 'Desktop', value: 4200, color: '#3b82f6' },
			{ name: 'Mobile', value: 2800, color: '#22c55e' },
			{ name: 'Tablet', value: 800, color: '#f59e0b' },
		],
	},
	{
		label: 'Feb',
		values: [
			{ name: 'Desktop', value: 4500, color: '#3b82f6' },
			{ name: 'Mobile', value: 3200, color: '#22c55e' },
			{ name: 'Tablet', value: 850, color: '#f59e0b' },
		],
	},
	{
		label: 'Mar',
		values: [
			{ name: 'Desktop', value: 4800, color: '#3b82f6' },
			{ name: 'Mobile', value: 3500, color: '#22c55e' },
			{ name: 'Tablet', value: 900, color: '#f59e0b' },
		],
	},
	{
		label: 'Apr',
		values: [
			{ name: 'Desktop', value: 4600, color: '#3b82f6' },
			{ name: 'Mobile', value: 3800, color: '#22c55e' },
			{ name: 'Tablet', value: 920, color: '#f59e0b' },
		],
	},
	{
		label: 'May',
		values: [
			{ name: 'Desktop', value: 5000, color: '#3b82f6' },
			{ name: 'Mobile', value: 4200, color: '#22c55e' },
			{ name: 'Tablet', value: 980, color: '#f59e0b' },
		],
	},
	{
		label: 'Jun',
		values: [
			{ name: 'Desktop', value: 4800, color: '#3b82f6' },
			{ name: 'Mobile', value: 4500, color: '#22c55e' },
			{ name: 'Tablet', value: 1050, color: '#f59e0b' },
		],
	},
	{
		label: 'Jul',
		values: [
			{ name: 'Desktop', value: 4400, color: '#3b82f6' },
			{ name: 'Mobile', value: 4800, color: '#22c55e' },
			{ name: 'Tablet', value: 1100, color: '#f59e0b' },
		],
	},
	{
		label: 'Aug',
		values: [
			{ name: 'Desktop', value: 4600, color: '#3b82f6' },
			{ name: 'Mobile', value: 5000, color: '#22c55e' },
			{ name: 'Tablet', value: 1150, color: '#f59e0b' },
		],
	},
	{
		label: 'Sep',
		values: [
			{ name: 'Desktop', value: 5200, color: '#3b82f6' },
			{ name: 'Mobile', value: 4800, color: '#22c55e' },
			{ name: 'Tablet', value: 1100, color: '#f59e0b' },
		],
	},
	{
		label: 'Oct',
		values: [
			{ name: 'Desktop', value: 5500, color: '#3b82f6' },
			{ name: 'Mobile', value: 5200, color: '#22c55e' },
			{ name: 'Tablet', value: 1180, color: '#f59e0b' },
		],
	},
	{
		label: 'Nov',
		values: [
			{ name: 'Desktop', value: 5800, color: '#3b82f6' },
			{ name: 'Mobile', value: 5500, color: '#22c55e' },
			{ name: 'Tablet', value: 1250, color: '#f59e0b' },
		],
	},
	{
		label: 'Dec',
		values: [
			{ name: 'Desktop', value: 6200, color: '#3b82f6' },
			{ name: 'Mobile', value: 5800, color: '#22c55e' },
			{ name: 'Tablet', value: 1320, color: '#f59e0b' },
		],
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-start justify-between pb-2">
						<div>
							<CardTitle className="text-sm font-medium">
								Traffic by Device
							</CardTitle>
							<p className="text-xs text-muted-foreground">
								Annual comparison across devices
							</p>
						</div>
						<div className="flex items-center gap-4">
							{legend.map((l, i) => (
								<div key={i} className="flex items-center gap-2">
									<div
										className="w-3 h-0.5"
										style={{ backgroundColor: l.color }}
									/>
									<span className="text-xs text-muted-foreground">
										{l.name}
									</span>
								</div>
							))}
						</div>
					</CardHeader>
					<CardContent>
						<MultiLineChart data={trafficData} legend={legend} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
