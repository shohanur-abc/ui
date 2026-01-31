'use client';

import { Area, AreaChart, Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
	ArrowRight,
	ArrowUpRight,
	Eye,
	Globe,
	MousePointerClick,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type AnalyticsKpi = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
};

type PageRow = {
	path: string;
	title: string;
	views: number;
	uniqueViews: number;
	bounceRate: string;
	avgTime: string;
	conversions: number;
};

const AnalyticsKpiCard = ({ title, value, change, icon: Icon }: AnalyticsKpi) => (
	<Card>
		<CardContent className="flex items-center gap-4 p-4">
			<div className="rounded-lg bg-primary/10 p-2.5">
				<Icon className="size-5 text-primary" />
			</div>
			<div className="flex-1">
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="text-2xl font-bold">{value}</p>
			</div>
			<Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">
				<ArrowUpRight className="mr-1 size-3" />
				{change}
			</Badge>
		</CardContent>
	</Card>
);

const areaConfig: ChartConfig = {
	visitors: { label: 'Visitors', color: 'var(--chart-1)' },
};

const barConfig: ChartConfig = {
	value: { label: 'Conversions', color: 'var(--chart-2)' },
};

export default function Main() {
	const kpis: AnalyticsKpi[] = [
		{ title: 'Page Views', value: '284,521', change: '+24%', icon: Eye },
		{ title: 'Unique Visitors', value: '45,234', change: '+18%', icon: Users },
		{ title: 'Bounce Rate', value: '32.4%', change: '-5%', icon: Globe },
		{ title: 'Conversion Rate', value: '3.24%', change: '+0.5%', icon: MousePointerClick },
	];

	const pages: PageRow[] = [
		{ path: '/', title: 'Homepage', views: 45234, uniqueViews: 38456, bounceRate: '28%', avgTime: '2:45', conversions: 1245 },
		{ path: '/products', title: 'Products Listing', views: 32456, uniqueViews: 28234, bounceRate: '35%', avgTime: '3:12', conversions: 892 },
		{ path: '/products/wireless-headphones', title: 'Wireless Headphones Pro', views: 18234, uniqueViews: 15678, bounceRate: '22%', avgTime: '4:32', conversions: 432 },
		{ path: '/cart', title: 'Shopping Cart', views: 12456, uniqueViews: 11234, bounceRate: '45%', avgTime: '1:45', conversions: 567 },
		{ path: '/checkout', title: 'Checkout', views: 8234, uniqueViews: 7456, bounceRate: '18%', avgTime: '5:12', conversions: 723 },
		{ path: '/about', title: 'About Us', views: 5678, uniqueViews: 4567, bounceRate: '52%', avgTime: '1:23', conversions: 45 },
	];

	const visitorData = [
		{ time: '00:00', visitors: 234 },
		{ time: '04:00', visitors: 145 },
		{ time: '08:00', visitors: 456 },
		{ time: '12:00', visitors: 892 },
		{ time: '16:00', visitors: 1234 },
		{ time: '20:00', visitors: 789 },
		{ time: '24:00', visitors: 345 },
	];

	const conversionData = [
		{ day: 'Mon', value: 145 },
		{ day: 'Tue', value: 198 },
		{ day: 'Wed', value: 167 },
		{ day: 'Thu', value: 234 },
		{ day: 'Fri', value: 278 },
		{ day: 'Sat', value: 312 },
		{ day: 'Sun', value: 256 },
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
					<div className="grid gap-6 @xl:grid-cols-2">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm">Visitors Today</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer config={areaConfig} className="h-[160px] w-full">
									<AreaChart data={visitorData}>
										<defs>
											<linearGradient id="table48fill" x1="0" y1="0" x2="0" y2="1">
												<stop offset="5%" stopColor="var(--color-visitors)" stopOpacity={0.3} />
												<stop offset="95%" stopColor="var(--color-visitors)" stopOpacity={0} />
											</linearGradient>
										</defs>
										<XAxis dataKey="time" tickLine={false} axisLine={false} />
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Area
											type="monotone"
											dataKey="visitors"
											stroke="var(--color-visitors)"
											fill="url(#table48fill)"
										/>
									</AreaChart>
								</ChartContainer>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm">Weekly Conversions</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer config={barConfig} className="h-[160px] w-full">
									<BarChart data={conversionData}>
										<XAxis dataKey="day" tickLine={false} axisLine={false} />
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
									</BarChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
					<Card>
						<CardHeader className="flex-row items-center justify-between pb-4">
							<CardTitle className="text-base">Top Pages</CardTitle>
							<Button variant="ghost" size="sm" className="gap-1" asChild>
								<Link href="/analytics">
									View All
									<ArrowRight className="size-3" />
								</Link>
							</Button>
						</CardHeader>
						<CardContent className="pt-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Page</TableHead>
										<TableHead>Views</TableHead>
										<TableHead className="hidden @lg:table-cell">Unique</TableHead>
										<TableHead className="hidden @xl:table-cell">Bounce</TableHead>
										<TableHead className="hidden @lg:table-cell">Avg Time</TableHead>
										<TableHead>Conversions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{pages.map((page) => (
										<TableRow key={page.path}>
											<TableCell>
												<div>
													<p className="font-medium">{page.title}</p>
													<p className="text-xs text-muted-foreground">{page.path}</p>
												</div>
											</TableCell>
											<TableCell className="font-medium">{page.views.toLocaleString()}</TableCell>
											<TableCell className="hidden @lg:table-cell">{page.uniqueViews.toLocaleString()}</TableCell>
											<TableCell className="hidden @xl:table-cell">{page.bounceRate}</TableCell>
											<TableCell className="hidden @lg:table-cell">{page.avgTime}</TableCell>
											<TableCell className="font-medium">{page.conversions}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
