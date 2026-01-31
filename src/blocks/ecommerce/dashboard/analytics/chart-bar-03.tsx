'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StackedBarData = { label: string; segments: { value: number; color: string; name: string }[] };

const StackedBarChart = ({ data, legend }: { data: StackedBarData[]; legend: { name: string; color: string }[] }) => {
	const maxTotal = Math.max(...data.map((d) => d.segments.reduce((a, b) => a + b.value, 0)));

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-4 flex-wrap">
				{legend.map((item, i) => (
					<div key={i} className="flex items-center gap-2">
						<div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
						<span className="text-xs text-muted-foreground">{item.name}</span>
					</div>
				))}
			</div>
			<div className="flex items-end justify-between gap-2 h-48">
				{data.map((item, i) => {
					const total = item.segments.reduce((a, b) => a + b.value, 0);
					const heightPercent = (total / maxTotal) * 100;
					return (
						<div key={i} className="flex-1 flex flex-col items-center gap-2">
							<div
								className="w-full rounded-t-md overflow-hidden flex flex-col-reverse"
								style={{ height: `${heightPercent}%` }}
							>
								{item.segments.map((seg, j) => {
									const segHeight = (seg.value / total) * 100;
									return (
										<div
											key={j}
											className="w-full transition-all duration-500"
											style={{ height: `${segHeight}%`, backgroundColor: seg.color }}
										/>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
			<div className="flex justify-between text-xs text-muted-foreground">
				{data.map((item, i) => (
					<span key={i} className="flex-1 text-center">{item.label}</span>
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

const trafficData: StackedBarData[] = [
	{ label: 'Mon', segments: [{ value: 320, color: '#3b82f6', name: 'Desktop' }, { value: 180, color: '#22c55e', name: 'Mobile' }, { value: 50, color: '#f59e0b', name: 'Tablet' }] },
	{ label: 'Tue', segments: [{ value: 380, color: '#3b82f6', name: 'Desktop' }, { value: 220, color: '#22c55e', name: 'Mobile' }, { value: 60, color: '#f59e0b', name: 'Tablet' }] },
	{ label: 'Wed', segments: [{ value: 350, color: '#3b82f6', name: 'Desktop' }, { value: 200, color: '#22c55e', name: 'Mobile' }, { value: 55, color: '#f59e0b', name: 'Tablet' }] },
	{ label: 'Thu', segments: [{ value: 420, color: '#3b82f6', name: 'Desktop' }, { value: 250, color: '#22c55e', name: 'Mobile' }, { value: 70, color: '#f59e0b', name: 'Tablet' }] },
	{ label: 'Fri', segments: [{ value: 480, color: '#3b82f6', name: 'Desktop' }, { value: 280, color: '#22c55e', name: 'Mobile' }, { value: 85, color: '#f59e0b', name: 'Tablet' }] },
	{ label: 'Sat', segments: [{ value: 280, color: '#3b82f6', name: 'Desktop' }, { value: 350, color: '#22c55e', name: 'Mobile' }, { value: 90, color: '#f59e0b', name: 'Tablet' }] },
	{ label: 'Sun', segments: [{ value: 250, color: '#3b82f6', name: 'Desktop' }, { value: 380, color: '#22c55e', name: 'Mobile' }, { value: 95, color: '#f59e0b', name: 'Tablet' }] },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Traffic by Device</CardTitle>
						<p className="text-xs text-muted-foreground">Stacked view of device usage</p>
					</CardHeader>
					<CardContent>
						<StackedBarChart data={trafficData} legend={legend} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
