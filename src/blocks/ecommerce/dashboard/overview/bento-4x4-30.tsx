'use client';

import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	Cell,
	Pie,
	PieChart,
	XAxis,
} from 'recharts';
import {
	ArrowDownRight,
	ArrowRight,
	ArrowUpRight,
	Box,
	Calendar,
	Clock,
	CreditCard,
	DollarSign,
	Eye,
	Globe,
	Package,
	ShoppingBag,
	ShoppingCart,
	Star,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type HeroKpi = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
};

type MiniKpi = {
	label: string;
	value: string;
	icon: LucideIcon;
};

type TopProduct = {
	name: string;
	sold: number;
	revenue: string;
	rating: number;
};

type RegionData = {
	name: string;
	value: number;
	fill: string;
};

const HeroKpiCard = ({ title, value, change, trend, icon: Icon }: HeroKpi) => (
	<Card className="group overflow-hidden transition-all hover:shadow-lg">
		<CardContent className="p-5">
			<div className="flex items-start justify-between">
				<div className="rounded-lg bg-primary/10 p-2.5">
					<Icon className="size-5 text-primary" />
				</div>
				<Badge
					variant="secondary"
					className={
						trend === 'up'
							? 'bg-emerald-500/10 text-emerald-500'
							: 'bg-red-500/10 text-red-500'
					}
				>
					{trend === 'up' ? (
						<ArrowUpRight className="mr-1 size-3" />
					) : (
						<ArrowDownRight className="mr-1 size-3" />
					)}
					{change}
				</Badge>
			</div>
			<div className="mt-4">
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="text-3xl font-bold tracking-tight">{value}</p>
			</div>
		</CardContent>
	</Card>
);

const MiniKpiItem = ({ label, value, icon: Icon }: MiniKpi) => (
	<div className="flex items-center gap-3 py-2">
		<Icon className="size-4 text-muted-foreground" />
		<span className="flex-1 text-sm text-muted-foreground">{label}</span>
		<span className="font-semibold">{value}</span>
	</div>
);

const TopProductRow = ({ name, sold, revenue, rating }: TopProduct) => (
	<div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
		<div className="size-10 rounded-lg bg-muted" />
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{name}</p>
			<p className="text-xs text-muted-foreground">{sold} sold</p>
		</div>
		<div className="text-right">
			<p className="text-sm font-medium">{revenue}</p>
			<div className="flex items-center gap-0.5 text-xs text-amber-500">
				<Star className="size-3 fill-current" />
				{rating}
			</div>
		</div>
	</div>
);

const areaConfig: ChartConfig = {
	value: { label: 'Value', color: 'var(--chart-1)' },
};
const pieConfig: ChartConfig = { value: { label: 'Value' } };
const barConfig: ChartConfig = {
	orders: { label: 'Orders', color: 'var(--chart-2)' },
};

export default function Main() {
	const heroKpis: HeroKpi[] = [
		{
			title: 'Total Revenue',
			value: '$312,847',
			change: '+32%',
			trend: 'up',
			icon: DollarSign,
		},
		{
			title: 'Total Orders',
			value: '8,432',
			change: '+24%',
			trend: 'up',
			icon: ShoppingCart,
		},
		{
			title: 'Customers',
			value: '3,847',
			change: '+18%',
			trend: 'up',
			icon: Users,
		},
		{
			title: 'Avg Order',
			value: '$37.12',
			change: '-2%',
			trend: 'down',
			icon: CreditCard,
		},
	];

	const miniKpis: MiniKpi[] = [
		{ label: 'Page Views', value: '284k', icon: Eye },
		{ label: 'Conversion', value: '3.2%', icon: TrendingUp },
		{ label: 'Cart Rate', value: '45%', icon: ShoppingBag },
		{ label: 'Bounce Rate', value: '32%', icon: Globe },
	];

	const topProducts: TopProduct[] = [
		{
			name: 'Wireless Headphones Pro',
			sold: 432,
			revenue: '$25.9k',
			rating: 4.8,
		},
		{ name: 'Smart Watch Ultra', sold: 324, revenue: '$19.4k', rating: 4.7 },
		{
			name: 'Laptop Stand Ergonomic',
			sold: 287,
			revenue: '$14.3k',
			rating: 4.9,
		},
	];

	const revenueData = [
		{ name: 'Jan', value: 24000 },
		{ name: 'Feb', value: 28000 },
		{ name: 'Mar', value: 32000 },
		{ name: 'Apr', value: 38000 },
		{ name: 'May', value: 35000 },
		{ name: 'Jun', value: 42000 },
	];

	const regionData: RegionData[] = [
		{ name: 'North America', value: 45, fill: 'var(--chart-1)' },
		{ name: 'Europe', value: 28, fill: 'var(--chart-2)' },
		{ name: 'Asia', value: 18, fill: 'var(--chart-3)' },
		{ name: 'Other', value: 9, fill: 'var(--chart-4)' },
	];

	const ordersData = [
		{ day: 'Mon', orders: 145 },
		{ day: 'Tue', orders: 198 },
		{ day: 'Wed', orders: 167 },
		{ day: 'Thu', orders: 234 },
		{ day: 'Fri', orders: 278 },
		{ day: 'Sat', orders: 312 },
		{ day: 'Sun', orders: 256 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4 @xl:gap-6">
					{heroKpis.map((kpi, i) => (
						<HeroKpiCard key={i} {...kpi} />
					))}
					<Card className="@sm:col-span-2 @xl:col-span-3">
						<CardHeader className="flex-row items-center justify-between pb-2">
							<CardTitle className="text-base">Revenue Overview</CardTitle>
							<Button variant="ghost" size="sm" className="gap-1" asChild>
								<Link href="/analytics">
									Details
									<ArrowRight className="size-3" />
								</Link>
							</Button>
						</CardHeader>
						<CardContent>
							<ChartContainer config={areaConfig} className="h-[220px] w-full">
								<AreaChart data={revenueData}>
									<defs>
										<linearGradient
											id="bento30fill"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop
												offset="5%"
												stopColor="var(--color-value)"
												stopOpacity={0.3}
											/>
											<stop
												offset="95%"
												stopColor="var(--color-value)"
												stopOpacity={0}
											/>
										</linearGradient>
									</defs>
									<XAxis dataKey="name" tickLine={false} axisLine={false} />
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Area
										type="monotone"
										dataKey="value"
										stroke="var(--color-value)"
										strokeWidth={2}
										fill="url(#bento30fill)"
									/>
								</AreaChart>
							</ChartContainer>
						</CardContent>
					</Card>
					<Card className="row-span-2">
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Quick Stats</CardTitle>
						</CardHeader>
						<CardContent className="divide-y pt-0">
							{miniKpis.map((kpi, i) => (
								<MiniKpiItem key={i} {...kpi} />
							))}
						</CardContent>
					</Card>
					<Card className="@sm:col-span-2">
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Top Products</CardTitle>
						</CardHeader>
						<CardContent className="space-y-1 pt-0">
							{topProducts.map((product, i) => (
								<TopProductRow key={i} {...product} />
							))}
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Sales by Region</CardTitle>
						</CardHeader>
						<CardContent className="flex items-center gap-4">
							<ChartContainer config={pieConfig} className="size-[120px]">
								<PieChart>
									<Pie
										data={regionData}
										dataKey="value"
										nameKey="name"
										innerRadius={35}
										outerRadius={55}
									>
										{regionData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.fill} />
										))}
									</Pie>
								</PieChart>
							</ChartContainer>
							<div className="flex-1 space-y-1.5">
								{regionData.map((item, i) => (
									<div key={i} className="flex items-center gap-2 text-xs">
										<div
											className="size-2 rounded-full"
											style={{ backgroundColor: item.fill }}
										/>
										<span className="flex-1">{item.name}</span>
										<span className="font-medium">{item.value}%</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
					<Card className="@xl:col-span-2">
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Orders This Week</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer config={barConfig} className="h-[140px] w-full">
								<BarChart data={ordersData}>
									<XAxis dataKey="day" tickLine={false} axisLine={false} />
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Bar
										dataKey="orders"
										fill="var(--color-orders)"
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
