'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Globe } from 'lucide-react';

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
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TrafficData = {
	hour: string;
	americas: number;
	europe: number;
	asia: number;
};

type RegionStatProps = {
	region: string;
	visitors: string;
	peak: string;
	color: string;
};

const RegionStat = ({ region, visitors, peak, color }: RegionStatProps) => (
	<div className="flex items-center gap-3 rounded-lg border border-border/50 px-4 py-3">
		<div className={`size-3 rounded-full ${color}`} />
		<div className="flex-1">
			<p className="font-medium">{region}</p>
			<p className="text-xs text-muted-foreground">{visitors} visitors</p>
		</div>
		<p className="text-xs text-muted-foreground">Peak: {peak}</p>
	</div>
);

const chartConfig: ChartConfig = {
	americas: {
		label: 'Americas',
		color: 'oklch(0.7 0.2 280)',
	},
	europe: {
		label: 'Europe',
		color: 'oklch(0.7 0.18 160)',
	},
	asia: {
		label: 'Asia Pacific',
		color: 'oklch(0.72 0.16 200)',
	},
};

export default function Main() {
	const regions: RegionStatProps[] = [
		{ region: 'Americas', visitors: '45.2K', peak: '2:00 PM EST', color: 'bg-[oklch(0.7_0.2_280)]' },
		{ region: 'Europe', visitors: '32.8K', peak: '10:00 AM CET', color: 'bg-[oklch(0.7_0.18_160)]' },
		{ region: 'Asia Pacific', visitors: '28.4K', peak: '8:00 PM JST', color: 'bg-[oklch(0.72_0.16_200)]' },
	];

	const chartData: TrafficData[] = [
		{ hour: '00:00', americas: 1200, europe: 3500, asia: 4800 },
		{ hour: '02:00', americas: 800, europe: 2800, asia: 4200 },
		{ hour: '04:00', americas: 500, europe: 2200, asia: 3100 },
		{ hour: '06:00', americas: 600, europe: 3800, asia: 2400 },
		{ hour: '08:00', americas: 1500, europe: 5200, asia: 2800 },
		{ hour: '10:00', americas: 3200, europe: 6400, asia: 3500 },
		{ hour: '12:00', americas: 4800, europe: 5800, asia: 4200 },
		{ hour: '14:00', americas: 6200, europe: 4800, asia: 5800 },
		{ hour: '16:00', americas: 5400, europe: 3200, asia: 6400 },
		{ hour: '18:00', americas: 4200, europe: 2400, asia: 5800 },
		{ hour: '20:00', americas: 3100, europe: 1800, asia: 4500 },
		{ hour: '22:00', americas: 2200, europe: 2200, asia: 3200 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-4 @sm:flex-row @sm:items-start @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Globe className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Global Traffic Report
								</CardTitle>
								<CardDescription>
									Visitor traffic across time zones
								</CardDescription>
							</div>
						</div>
						<Tabs defaultValue="today">
							<TabsList>
								<TabsTrigger value="today">Today</TabsTrigger>
								<TabsTrigger value="week">This Week</TabsTrigger>
								<TabsTrigger value="month">This Month</TabsTrigger>
							</TabsList>
						</Tabs>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-3 @sm:grid-cols-3">
							{regions.map((r, i) => (
								<RegionStat key={i} {...r} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[320px] w-full">
							<AreaChart data={chartData} margin={{ left: 12, right: 12 }} stackOffset="expand">
								<defs>
									<linearGradient id="americasGrad" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="var(--color-americas)" stopOpacity={0.5} />
										<stop offset="95%" stopColor="var(--color-americas)" stopOpacity={0.1} />
									</linearGradient>
									<linearGradient id="europeGrad" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="var(--color-europe)" stopOpacity={0.5} />
										<stop offset="95%" stopColor="var(--color-europe)" stopOpacity={0.1} />
									</linearGradient>
									<linearGradient id="asiaGrad" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="var(--color-asia)" stopOpacity={0.5} />
										<stop offset="95%" stopColor="var(--color-asia)" stopOpacity={0.1} />
									</linearGradient>
								</defs>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="hour"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Area
									type="monotone"
									dataKey="americas"
									stackId="1"
									stroke="var(--color-americas)"
									fill="url(#americasGrad)"
								/>
								<Area
									type="monotone"
									dataKey="europe"
									stackId="1"
									stroke="var(--color-europe)"
									fill="url(#europeGrad)"
								/>
								<Area
									type="monotone"
									dataKey="asia"
									stackId="1"
									stroke="var(--color-asia)"
									fill="url(#asiaGrad)"
								/>
							</AreaChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
