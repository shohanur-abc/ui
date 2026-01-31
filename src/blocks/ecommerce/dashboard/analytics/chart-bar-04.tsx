'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type GroupedBarData = { label: string; values: { value: number; color: string; name: string }[] };

const GroupedBarChart = ({ data, legend }: { data: GroupedBarData[]; legend: { name: string; color: string }[] }) => {
	const allValues = data.flatMap((d) => d.values.map((v) => v.value));
	const max = Math.max(...allValues);

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
			<div className="flex items-end justify-between gap-4 h-48">
				{data.map((item, i) => (
					<div key={i} className="flex-1 flex items-end justify-center gap-1">
						{item.values.map((v, j) => {
							const height = (v.value / max) * 100;
							return (
								<div
									key={j}
									className="flex-1 max-w-6 rounded-t-sm transition-all duration-500"
									style={{ height: `${height}%`, backgroundColor: v.color }}
								/>
							);
						})}
					</div>
				))}
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
	{ name: 'Last Year', color: '#64748b' },
	{ name: 'This Year', color: '#3b82f6' },
];

const revenueData: GroupedBarData[] = [
	{ label: 'Q1', values: [{ value: 42000, color: '#64748b', name: 'Last Year' }, { value: 48000, color: '#3b82f6', name: 'This Year' }] },
	{ label: 'Q2', values: [{ value: 55000, color: '#64748b', name: 'Last Year' }, { value: 62000, color: '#3b82f6', name: 'This Year' }] },
	{ label: 'Q3', values: [{ value: 48000, color: '#64748b', name: 'Last Year' }, { value: 58000, color: '#3b82f6', name: 'This Year' }] },
	{ label: 'Q4', values: [{ value: 72000, color: '#64748b', name: 'Last Year' }, { value: 85000, color: '#3b82f6', name: 'This Year' }] },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Quarterly Revenue Comparison</CardTitle>
						<p className="text-xs text-muted-foreground">Year over year performance</p>
					</CardHeader>
					<CardContent>
						<GroupedBarChart data={revenueData} legend={legend} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
