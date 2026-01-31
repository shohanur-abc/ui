'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type DataPoint = { label: string; value: number; target: number };

const TargetLineChart = ({ data }: { data: DataPoint[] }) => {
	const allValues = [...data.map((d) => d.value), ...data.map((d) => d.target)];
	const max = Math.max(...allValues);
	const min = Math.min(...allValues);
	const range = max - min || 1;

	const valuePoints = data.map((d, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - ((d.value - min) / range) * 80 - 10,
	}));

	const targetPoints = data.map((d, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - ((d.target - min) / range) * 80 - 10,
	}));

	const valuePath = valuePoints.reduce((acc, p, i) => {
		if (i === 0) return `M ${p.x} ${p.y}`;
		const prev = valuePoints[i - 1];
		const cpX = (prev.x + p.x) / 2;
		return `${acc} Q ${cpX} ${prev.y}, ${p.x} ${p.y}`;
	}, '');

	const targetPath = targetPoints.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

	return (
		<div className="relative h-64 w-full">
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
				<path d={targetPath} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" strokeDasharray="2,1" />
				<path d={valuePath} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
				{valuePoints.map((p, i) => {
					const isAbove = data[i].value >= data[i].target;
					return (
						<circle key={i} cx={p.x} cy={p.y} r="0.8" fill={isAbove ? '#22c55e' : '#ef4444'} />
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

const performanceData: DataPoint[] = [
	{ label: 'Jan', value: 42000, target: 40000 },
	{ label: 'Feb', value: 38000, target: 42000 },
	{ label: 'Mar', value: 48000, target: 44000 },
	{ label: 'Apr', value: 45000, target: 46000 },
	{ label: 'May', value: 52000, target: 48000 },
	{ label: 'Jun', value: 58000, target: 50000 },
	{ label: 'Jul', value: 54000, target: 52000 },
	{ label: 'Aug', value: 56000, target: 54000 },
	{ label: 'Sep', value: 62000, target: 56000 },
	{ label: 'Oct', value: 58000, target: 58000 },
	{ label: 'Nov', value: 65000, target: 60000 },
	{ label: 'Dec', value: 72000, target: 62000 },
];

const aboveTarget = performanceData.filter((d) => d.value >= d.target).length;
const totalMonths = performanceData.length;

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-start justify-between pb-2">
						<div>
							<CardTitle className="text-sm font-medium">Performance vs Target</CardTitle>
							<p className="text-xs text-muted-foreground">Monthly revenue against goals</p>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<div className="w-4 h-0.5 bg-primary" />
								<span className="text-xs text-muted-foreground">Actual</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-0.5 bg-muted-foreground/50 border-dashed" />
								<span className="text-xs text-muted-foreground">Target</span>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-4 mb-4">
							<Badge variant="secondary" className="text-emerald-500 bg-emerald-500/10">
								{aboveTarget}/{totalMonths} months above target
							</Badge>
						</div>
						<TargetLineChart data={performanceData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
