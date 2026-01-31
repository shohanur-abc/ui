'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type LineData = { label: string; value: number };

const TabbedLineChart = ({ data }: { data: LineData[] }) => {
	const max = Math.max(...data.map((d) => d.value));
	const min = Math.min(...data.map((d) => d.value));
	const range = max - min || 1;

	const points = data.map((d, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - ((d.value - min) / range) * 80 - 10,
	}));

	const pathD = points.reduce((acc, p, i) => {
		if (i === 0) return `M ${p.x} ${p.y}`;
		return `${acc} L ${p.x} ${p.y}`;
	}, '');

	return (
		<div className="relative h-48 w-full">
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
				<defs>
					<linearGradient id="lineGradTab" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
						<stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
					</linearGradient>
				</defs>
				<path d={`${pathD} L 100 100 L 0 100 Z`} fill="url(#lineGradTab)" />
				<path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
				{points.map((p, i) => (
					<circle key={i} cx={p.x} cy={p.y} r="0.6" fill="hsl(var(--primary))" />
				))}
			</svg>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
				{data.filter((_, i) => i % 2 === 0).map((d, i) => (
					<span key={i}>{d.label}</span>
				))}
			</div>
		</div>
	);
};

const dailyData: LineData[] = [
	{ label: '6am', value: 120 },
	{ label: '9am', value: 450 },
	{ label: '12pm', value: 680 },
	{ label: '3pm', value: 520 },
	{ label: '6pm', value: 380 },
	{ label: '9pm', value: 280 },
	{ label: '12am', value: 150 },
];

const weeklyData: LineData[] = [
	{ label: 'Mon', value: 4200 },
	{ label: 'Tue', value: 4800 },
	{ label: 'Wed', value: 4500 },
	{ label: 'Thu', value: 5200 },
	{ label: 'Fri', value: 6100 },
	{ label: 'Sat', value: 5800 },
	{ label: 'Sun', value: 4900 },
];

const monthlyData: LineData[] = [
	{ label: 'W1', value: 18500 },
	{ label: 'W2', value: 22000 },
	{ label: 'W3', value: 19800 },
	{ label: 'W4', value: 24500 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<Tabs defaultValue="daily" className="w-full">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium">Visitor Activity</CardTitle>
							<TabsList className="h-8">
								<TabsTrigger value="daily" className="text-xs px-3 h-6">Daily</TabsTrigger>
								<TabsTrigger value="weekly" className="text-xs px-3 h-6">Weekly</TabsTrigger>
								<TabsTrigger value="monthly" className="text-xs px-3 h-6">Monthly</TabsTrigger>
							</TabsList>
						</CardHeader>
						<CardContent>
							<TabsContent value="daily" className="mt-0">
								<TabbedLineChart data={dailyData} />
							</TabsContent>
							<TabsContent value="weekly" className="mt-0">
								<TabbedLineChart data={weeklyData} />
							</TabsContent>
							<TabsContent value="monthly" className="mt-0">
								<TabbedLineChart data={monthlyData} />
							</TabsContent>
						</CardContent>
					</Tabs>
				</Card>
			</div>
		</section>
	);
}
