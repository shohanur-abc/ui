'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type BarData = { label: string; value: number };

const VerticalBarChart = ({ data }: { data: BarData[] }) => {
	const max = Math.max(...data.map((d) => d.value));

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-end justify-between gap-2 h-48">
				{data.map((item, i) => {
					const height = (item.value / max) * 100;
					return (
						<div key={i} className="flex-1 flex flex-col items-center gap-2">
							<span className="text-xs font-medium">{item.value}</span>
							<div
								className="w-full rounded-t-md bg-gradient-to-t from-primary/60 to-primary transition-all duration-500"
								style={{ height: `${height}%` }}
							/>
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

const weeklyData: BarData[] = [
	{ label: 'Mon', value: 420 },
	{ label: 'Tue', value: 580 },
	{ label: 'Wed', value: 450 },
	{ label: 'Thu', value: 620 },
	{ label: 'Fri', value: 750 },
	{ label: 'Sat', value: 890 },
	{ label: 'Sun', value: 680 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Weekly Sales</CardTitle>
						<p className="text-xs text-muted-foreground">Orders per day this week</p>
					</CardHeader>
					<CardContent>
						<VerticalBarChart data={weeklyData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
