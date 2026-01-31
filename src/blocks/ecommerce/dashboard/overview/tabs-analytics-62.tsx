'use client';

import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
	ArrowUpRight,
	Eye,
	Globe,
	MousePointerClick,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type AnalyticsKpi = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
	color: string;
};

const AnalyticsKpiCard = ({ title, value, change, icon: Icon, color }: AnalyticsKpi) => (
	<div className="flex items-center gap-3 rounded-xl border bg-card p-4">
		<div className={`rounded-lg p-2 ${color}`}>
			<Icon className="size-4" />
		</div>
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="text-lg font-bold">{value}</p>
		</div>
		<span className="flex items-center text-xs text-emerald-500">
			<ArrowUpRight className="size-3" />
			{change}
		</span>
	</div>
);

const trafficConfig: ChartConfig = {
	visitors: { label: 'Visitors', color: 'var(--chart-1)' },
	sessions: { label: 'Sessions', color: 'var(--chart-2)' },
};

const sourceConfig: ChartConfig = {
	value: { label: 'Visitors', color: 'var(--chart-1)' },
};

const conversionConfig: ChartConfig = {
	rate: { label: 'Rate', color: 'var(--chart-3)' },
};

export default function Main() {
	const kpis: AnalyticsKpi[] = [
		{ title: 'Page Views', value: '284K', change: '+24%', icon: Eye, color: 'bg-primary/10 text-primary' },
		{ title: 'Unique Visitors', value: '45K', change: '+18%', icon: Users, color: 'bg-emerald-500/10 text-emerald-500' },
		{ title: 'Bounce Rate', value: '32%', change: '-5%', icon: Globe, color: 'bg-amber-500/10 text-amber-500' },
		{ title: 'Conversion', value: '3.2%', change: '+0.5%', icon: MousePointerClick, color: 'bg-blue-500/10 text-blue-500' },
	];

	const trafficData = [
		{ day: 'Mon', visitors: 4500, sessions: 5200 },
		{ day: 'Tue', visitors: 5200, sessions: 6100 },
		{ day: 'Wed', visitors: 4800, sessions: 5600 },
		{ day: 'Thu', visitors: 6100, sessions: 7200 },
		{ day: 'Fri', visitors: 5500, sessions: 6500 },
		{ day: 'Sat', visitors: 3200, sessions: 3800 },
		{ day: 'Sun', visitors: 2800, sessions: 3300 },
	];

	const sourceData = [
		{ source: 'Organic', value: 12500 },
		{ source: 'Direct', value: 8400 },
		{ source: 'Referral', value: 6200 },
		{ source: 'Social', value: 4800 },
		{ source: 'Email', value: 3200 },
	];

	const conversionData = [
		{ hour: '00:00', rate: 2.1 },
		{ hour: '04:00', rate: 1.8 },
		{ hour: '08:00', rate: 2.8 },
		{ hour: '12:00', rate: 3.5 },
		{ hour: '16:00', rate: 4.2 },
		{ hour: '20:00', rate: 3.1 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{kpis.map((kpi, i) => (
							<AnalyticsKpiCard key={i} {...kpi} />
						))}
					</div>
					<Card>
						<CardHeader>
							<CardTitle>Analytics Dashboard</CardTitle>
							<CardDescription>Traffic, sources, and conversion metrics</CardDescription>
						</CardHeader>
						<CardContent>
							<Tabs defaultValue="traffic" className="w-full">
								<TabsList className="mb-4">
									<TabsTrigger value="traffic">Traffic</TabsTrigger>
									<TabsTrigger value="sources">Sources</TabsTrigger>
									<TabsTrigger value="conversion">Conversion</TabsTrigger>
								</TabsList>
								<TabsContent value="traffic">
									<ChartContainer config={trafficConfig} className="h-[280px] w-full">
										<LineChart data={trafficData}>
											<XAxis dataKey="day" tickLine={false} axisLine={false} />
											<YAxis tickLine={false} axisLine={false} />
											<ChartTooltip content={<ChartTooltipContent />} />
											<Line type="monotone" dataKey="visitors" stroke="var(--color-visitors)" strokeWidth={2} dot={false} />
											<Line type="monotone" dataKey="sessions" stroke="var(--color-sessions)" strokeWidth={2} dot={false} />
										</LineChart>
									</ChartContainer>
								</TabsContent>
								<TabsContent value="sources">
									<ChartContainer config={sourceConfig} className="h-[280px] w-full">
										<BarChart data={sourceData} layout="vertical">
											<XAxis type="number" tickLine={false} axisLine={false} />
											<YAxis dataKey="source" type="category" tickLine={false} axisLine={false} width={70} />
											<ChartTooltip content={<ChartTooltipContent />} />
											<Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
										</BarChart>
									</ChartContainer>
								</TabsContent>
								<TabsContent value="conversion">
									<ChartContainer config={conversionConfig} className="h-[280px] w-full">
										<LineChart data={conversionData}>
											<XAxis dataKey="hour" tickLine={false} axisLine={false} />
											<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
											<ChartTooltip content={<ChartTooltipContent />} />
											<Line type="monotone" dataKey="rate" stroke="var(--color-rate)" strokeWidth={2} dot />
										</LineChart>
									</ChartContainer>
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
