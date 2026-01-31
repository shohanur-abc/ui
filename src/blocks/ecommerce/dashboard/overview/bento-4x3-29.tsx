'use client';

import { Area, AreaChart, Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
	ArrowDownRight,
	ArrowUpRight,
	Box,
	CreditCard,
	DollarSign,
	Package,
	Percent,
	RefreshCw,
	ShoppingBag,
	ShoppingCart,
	Truck,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type MegaKpi = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	subtitle: string;
};

type TopCategory = {
	name: string;
	revenue: string;
	growth: string;
	color: string;
};

type PendingTask = {
	label: string;
	count: number;
	icon: LucideIcon;
	urgent: boolean;
};

const MegaKpiCard = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
	subtitle,
}: MegaKpi) => (
	<Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
		<div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-primary/5 transition-all duration-500 group-hover:bg-primary/10" />
		<CardContent className="relative p-6">
			<div className="flex items-start justify-between">
				<div>
					<p className="text-sm text-muted-foreground">{title}</p>
					<p className="mt-1 text-4xl font-bold tracking-tight">{value}</p>
					<p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
				</div>
				<div className="rounded-xl bg-primary/10 p-3">
					<Icon className="size-6 text-primary" />
				</div>
			</div>
			<div className="mt-4 flex items-center gap-2">
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
				<span className="text-xs text-muted-foreground">vs last month</span>
			</div>
		</CardContent>
	</Card>
);

const TopCategoryRow = ({ name, revenue, growth, color }: TopCategory) => (
	<div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
		<div className={`size-3 rounded-full ${color}`} />
		<span className="flex-1 text-sm font-medium">{name}</span>
		<span className="text-sm">{revenue}</span>
		<Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 text-xs">
			{growth}
		</Badge>
	</div>
);

const PendingTaskCard = ({ label, count, icon: Icon, urgent }: PendingTask) => (
	<div
		className={`flex items-center gap-3 rounded-lg border p-3 transition-all hover:border-primary/50 ${
			urgent ? 'border-amber-500/30 bg-amber-500/5' : 'bg-card'
		}`}
	>
		<Icon className={`size-5 ${urgent ? 'text-amber-500' : 'text-muted-foreground'}`} />
		<span className="flex-1 text-sm">{label}</span>
		<Badge variant={urgent ? 'destructive' : 'secondary'}>{count}</Badge>
	</div>
);

const chartConfig: ChartConfig = {
	value: { label: 'Value', color: 'var(--chart-1)' },
};

export default function Main() {
	const megaKpis: MegaKpi[] = [
		{
			title: 'Total Revenue',
			value: '$248,632',
			change: '+28.4%',
			trend: 'up',
			icon: DollarSign,
			subtitle: 'Gross revenue this month',
		},
		{
			title: 'Total Orders',
			value: '6,842',
			change: '+22.1%',
			trend: 'up',
			icon: ShoppingCart,
			subtitle: 'Orders processed this month',
		},
	];

	const topCategories: TopCategory[] = [
		{ name: 'Electronics', revenue: '$89.4k', growth: '+24%', color: 'bg-chart-1' },
		{ name: 'Clothing', revenue: '$67.2k', growth: '+18%', color: 'bg-chart-2' },
		{ name: 'Home & Garden', revenue: '$45.8k', growth: '+12%', color: 'bg-chart-3' },
		{ name: 'Sports', revenue: '$32.1k', growth: '+8%', color: 'bg-chart-4' },
	];

	const pendingTasks: PendingTask[] = [
		{ label: 'Orders to Ship', count: 42, icon: Truck, urgent: true },
		{ label: 'Low Stock Items', count: 18, icon: Package, urgent: true },
		{ label: 'Pending Reviews', count: 156, icon: Users, urgent: false },
		{ label: 'Returns to Process', count: 7, icon: RefreshCw, urgent: false },
	];

	const chartData = [
		{ day: 'Mon', value: 12400 },
		{ day: 'Tue', value: 18200 },
		{ day: 'Wed', value: 14800 },
		{ day: 'Thu', value: 22100 },
		{ day: 'Fri', value: 28400 },
		{ day: 'Sat', value: 32100 },
		{ day: 'Sun', value: 24800 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @lg:grid-cols-2 @xl:grid-cols-3 @xl:gap-6">
					{megaKpis.map((kpi, i) => (
						<MegaKpiCard key={i} {...kpi} />
					))}
					<Card className="row-span-2">
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Pending Tasks</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2 pt-0">
							{pendingTasks.map((task, i) => (
								<PendingTaskCard key={i} {...task} />
							))}
						</CardContent>
					</Card>
					<Card className="@lg:col-span-2">
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Weekly Revenue</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer config={chartConfig} className="h-[200px] w-full">
								<AreaChart data={chartData}>
									<defs>
										<linearGradient id="bento29fill" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.3} />
											<stop offset="95%" stopColor="var(--color-value)" stopOpacity={0} />
										</linearGradient>
									</defs>
									<XAxis dataKey="day" tickLine={false} axisLine={false} />
									<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Area
										type="monotone"
										dataKey="value"
										stroke="var(--color-value)"
										strokeWidth={2}
										fill="url(#bento29fill)"
									/>
								</AreaChart>
							</ChartContainer>
						</CardContent>
					</Card>
					<Card className="@xl:col-span-2">
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Top Categories</CardTitle>
						</CardHeader>
						<CardContent className="space-y-1 pt-0">
							{topCategories.map((category, i) => (
								<TopCategoryRow key={i} {...category} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
