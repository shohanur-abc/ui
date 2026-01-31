'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type HourlyData = {
	hour: string;
	visitors: number;
	conversions: number;
	intensity: 'low' | 'medium' | 'high' | 'peak';
};

const intensityColors = {
	low: 'oklch(0.68 0.18 250 / 0.4)',
	medium: 'oklch(0.68 0.18 250 / 0.6)',
	high: 'oklch(0.7 0.2 280 / 0.8)',
	peak: 'oklch(0.7 0.2 280)',
};

type InsightCardProps = {
	label: string;
	value: string;
	subtext: string;
};

const InsightCard = ({ label, value, subtext }: InsightCardProps) => (
	<div className="flex-1 rounded-lg border border-border/50 bg-muted/30 p-4">
		<p className="text-xs font-medium text-muted-foreground">{label}</p>
		<p className="mt-1 text-lg font-bold">{value}</p>
		<p className="text-xs text-muted-foreground">{subtext}</p>
	</div>
);

const chartConfig: ChartConfig = {
	visitors: {
		label: 'Visitors',
		color: 'var(--chart-1)',
	},
	conversions: {
		label: 'Conversions',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const insights: InsightCardProps[] = [
		{ label: 'Peak Hour', value: '2:00 PM', subtext: '1,245 visitors' },
		{ label: 'Best Conversion', value: '11:00 AM', subtext: '8.2% rate' },
		{ label: 'Lowest Traffic', value: '4:00 AM', subtext: '45 visitors' },
	];

	const chartData: HourlyData[] = [
		{ hour: '6AM', visitors: 120, conversions: 8, intensity: 'low' },
		{ hour: '8AM', visitors: 380, conversions: 24, intensity: 'medium' },
		{ hour: '10AM', visitors: 720, conversions: 52, intensity: 'high' },
		{ hour: '12PM', visitors: 980, conversions: 68, intensity: 'peak' },
		{ hour: '2PM', visitors: 1245, conversions: 82, intensity: 'peak' },
		{ hour: '4PM', visitors: 890, conversions: 58, intensity: 'high' },
		{ hour: '6PM', visitors: 620, conversions: 42, intensity: 'medium' },
		{ hour: '8PM', visitors: 450, conversions: 32, intensity: 'medium' },
		{ hour: '10PM', visitors: 280, conversions: 18, intensity: 'low' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Hourly Traffic Report
						</CardTitle>
						<CardDescription>
							Website visitor patterns throughout the day
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex flex-col gap-3 @sm:flex-row">
							{insights.map((insight, i) => (
								<InsightCard key={i} {...insight} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[300px] w-full">
							<BarChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="hour"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis tickLine={false} axisLine={false} tickMargin={8} />
								<ChartTooltip
									content={<ChartTooltipContent />}
									cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
								/>
								<Bar dataKey="visitors" radius={[6, 6, 0, 0]}>
									{chartData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={intensityColors[entry.intensity]}
										/>
									))}
								</Bar>
							</BarChart>
						</ChartContainer>
						<div className="flex items-center justify-center gap-4 text-xs">
							<div className="flex items-center gap-1.5">
								<div className="size-3 rounded-full bg-[oklch(0.68_0.18_250_/_0.4)]" />
								<span className="text-muted-foreground">Low</span>
							</div>
							<div className="flex items-center gap-1.5">
								<div className="size-3 rounded-full bg-[oklch(0.68_0.18_250_/_0.6)]" />
								<span className="text-muted-foreground">Medium</span>
							</div>
							<div className="flex items-center gap-1.5">
								<div className="size-3 rounded-full bg-[oklch(0.7_0.2_280_/_0.8)]" />
								<span className="text-muted-foreground">High</span>
							</div>
							<div className="flex items-center gap-1.5">
								<div className="size-3 rounded-full bg-[oklch(0.7_0.2_280)]" />
								<span className="text-muted-foreground">Peak</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
