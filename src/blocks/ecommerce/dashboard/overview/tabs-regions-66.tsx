'use client';

import { Area, AreaChart, Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
	ArrowUpRight,
	DollarSign,
	MapPin,
	Package,
	ShoppingCart,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type RegionData = {
	name: string;
	revenue: string;
	orders: number;
	growth: string;
	share: number;
};

type TimeSeriesData = {
	name: string;
	na: number;
	eu: number;
	ap: number;
};

const RegionCard = ({ name, revenue, orders, growth, share }: RegionData) => (
	<div className="rounded-xl border bg-card p-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<MapPin className="size-4 text-primary" />
				<span className="font-medium">{name}</span>
			</div>
			<Badge
				variant="secondary"
				className="bg-emerald-500/10 text-emerald-500 text-xs"
			>
				{growth}
			</Badge>
		</div>
		<div className="mt-3 grid grid-cols-2 gap-4">
			<div>
				<p className="text-xs text-muted-foreground">Revenue</p>
				<p className="text-lg font-bold">{revenue}</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Orders</p>
				<p className="text-lg font-bold">{orders.toLocaleString()}</p>
			</div>
		</div>
		<div className="mt-3 space-y-1">
			<div className="flex items-center justify-between text-xs">
				<span className="text-muted-foreground">Market Share</span>
				<span className="font-medium">{share}%</span>
			</div>
			<Progress value={share} className="h-1.5" />
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	na: { label: 'North America', color: 'var(--chart-1)' },
	eu: { label: 'Europe', color: 'var(--chart-2)' },
	ap: { label: 'Asia Pacific', color: 'var(--chart-3)' },
};

export default function Main() {
	const naRegions: RegionData[] = [
		{
			name: 'United States',
			revenue: '$142,350',
			orders: 3845,
			growth: '+28%',
			share: 65,
		},
		{
			name: 'Canada',
			revenue: '$45,230',
			orders: 1234,
			growth: '+22%',
			share: 21,
		},
		{
			name: 'Mexico',
			revenue: '$18,420',
			orders: 567,
			growth: '+18%',
			share: 14,
		},
	];

	const euRegions: RegionData[] = [
		{
			name: 'United Kingdom',
			revenue: '$52,340',
			orders: 1456,
			growth: '+24%',
			share: 35,
		},
		{
			name: 'Germany',
			revenue: '$48,230',
			orders: 1324,
			growth: '+20%',
			share: 32,
		},
		{
			name: 'France',
			revenue: '$32,560',
			orders: 897,
			growth: '+15%',
			share: 22,
		},
	];

	const apRegions: RegionData[] = [
		{
			name: 'Australia',
			revenue: '$38,450',
			orders: 987,
			growth: '+32%',
			share: 42,
		},
		{
			name: 'Japan',
			revenue: '$28,340',
			orders: 756,
			growth: '+18%',
			share: 31,
		},
		{
			name: 'Singapore',
			revenue: '$15,670',
			orders: 423,
			growth: '+25%',
			share: 17,
		},
	];

	const trendData: TimeSeriesData[] = [
		{ name: 'Jan', na: 45, eu: 32, ap: 18 },
		{ name: 'Feb', na: 52, eu: 35, ap: 22 },
		{ name: 'Mar', na: 48, eu: 38, ap: 25 },
		{ name: 'Apr', na: 61, eu: 42, ap: 28 },
		{ name: 'May', na: 55, eu: 45, ap: 32 },
		{ name: 'Jun', na: 67, eu: 48, ap: 38 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle>Regional Performance</CardTitle>
						<CardDescription>
							Sales breakdown by geographic region
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="na" className="w-full">
							<TabsList className="mb-4">
								<TabsTrigger value="na">North America</TabsTrigger>
								<TabsTrigger value="eu">Europe</TabsTrigger>
								<TabsTrigger value="ap">Asia Pacific</TabsTrigger>
								<TabsTrigger value="trends">Trends</TabsTrigger>
							</TabsList>
							<TabsContent value="na">
								<div className="grid gap-4 @lg:grid-cols-3">
									{naRegions.map((region, i) => (
										<RegionCard key={i} {...region} />
									))}
								</div>
							</TabsContent>
							<TabsContent value="eu">
								<div className="grid gap-4 @lg:grid-cols-3">
									{euRegions.map((region, i) => (
										<RegionCard key={i} {...region} />
									))}
								</div>
							</TabsContent>
							<TabsContent value="ap">
								<div className="grid gap-4 @lg:grid-cols-3">
									{apRegions.map((region, i) => (
										<RegionCard key={i} {...region} />
									))}
								</div>
							</TabsContent>
							<TabsContent value="trends">
								<ChartContainer
									config={chartConfig}
									className="h-[280px] w-full"
								>
									<AreaChart data={trendData}>
										<defs>
											<linearGradient id="tabs66na" x1="0" y1="0" x2="0" y2="1">
												<stop
													offset="5%"
													stopColor="var(--color-na)"
													stopOpacity={0.3}
												/>
												<stop
													offset="95%"
													stopColor="var(--color-na)"
													stopOpacity={0}
												/>
											</linearGradient>
											<linearGradient id="tabs66eu" x1="0" y1="0" x2="0" y2="1">
												<stop
													offset="5%"
													stopColor="var(--color-eu)"
													stopOpacity={0.3}
												/>
												<stop
													offset="95%"
													stopColor="var(--color-eu)"
													stopOpacity={0}
												/>
											</linearGradient>
											<linearGradient id="tabs66ap" x1="0" y1="0" x2="0" y2="1">
												<stop
													offset="5%"
													stopColor="var(--color-ap)"
													stopOpacity={0.3}
												/>
												<stop
													offset="95%"
													stopColor="var(--color-ap)"
													stopOpacity={0}
												/>
											</linearGradient>
										</defs>
										<XAxis dataKey="name" tickLine={false} axisLine={false} />
										<YAxis
											tickLine={false}
											axisLine={false}
											tickFormatter={(v) => `$${v}K`}
										/>
										<ChartTooltip content={<ChartTooltipContent />} />
										<Area
											type="monotone"
											dataKey="na"
											stroke="var(--color-na)"
											fill="url(#tabs66na)"
										/>
										<Area
											type="monotone"
											dataKey="eu"
											stroke="var(--color-eu)"
											fill="url(#tabs66eu)"
										/>
										<Area
											type="monotone"
											dataKey="ap"
											stroke="var(--color-ap)"
											fill="url(#tabs66ap)"
										/>
									</AreaChart>
								</ChartContainer>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
