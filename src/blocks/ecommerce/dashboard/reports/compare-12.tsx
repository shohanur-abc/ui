'use client';

import {
	Area,
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from 'recharts';
import {
	ArrowUpRight,
	ArrowDownRight,
	Percent,
	DollarSign,
	ShoppingCart,
	Users,
} from 'lucide-react';

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
import { Badge } from '@/components/ui/badge';

type PromoData = {
	day: string;
	promo: number;
	normal: number;
};

type MetricCompareProps = {
	label: string;
	icon: React.ElementType;
	promo: string;
	normal: string;
	change: number;
};

const MetricCompare = ({
	label,
	icon: Icon,
	promo,
	normal,
	change,
}: MetricCompareProps) => (
	<div className="rounded-lg border border-border/30 bg-muted/20 p-4">
		<div className="flex items-center gap-2 text-muted-foreground">
			<Icon className="size-4" />
			<span className="text-sm">{label}</span>
		</div>
		<div className="mt-2 flex items-baseline justify-between">
			<div>
				<span className="text-lg font-bold">{promo}</span>
				<span className="ml-2 text-sm text-muted-foreground">vs {normal}</span>
			</div>
			<Badge
				variant="outline"
				className={
					change >= 0
						? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
						: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
				}
			>
				{change >= 0 ? (
					<ArrowUpRight className="mr-1 size-3" />
				) : (
					<ArrowDownRight className="mr-1 size-3" />
				)}
				{change >= 0 ? '+' : ''}
				{change}%
			</Badge>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	promo: {
		label: 'Promotion Period',
		color: 'var(--chart-1)',
	},
	normal: {
		label: 'Normal Period',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const metrics: MetricCompareProps[] = [
		{
			label: 'Avg Order Value',
			icon: DollarSign,
			promo: '$168',
			normal: '$142',
			change: 18.3,
		},
		{
			label: 'Orders/Day',
			icon: ShoppingCart,
			promo: '845',
			normal: '420',
			change: 101.2,
		},
		{
			label: 'Conversion Rate',
			icon: Percent,
			promo: '5.8%',
			normal: '4.2%',
			change: 38.1,
		},
		{
			label: 'New Customers',
			icon: Users,
			promo: '1,245',
			normal: '580',
			change: 114.7,
		},
	];

	const chartData: PromoData[] = [
		{ day: 'Day 1', promo: 48000, normal: 28000 },
		{ day: 'Day 2', promo: 62000, normal: 30000 },
		{ day: 'Day 3', promo: 85000, normal: 32000 },
		{ day: 'Day 4', promo: 95000, normal: 28000 },
		{ day: 'Day 5', promo: 118000, normal: 35000 },
		{ day: 'Day 6', promo: 142000, normal: 38000 },
		{ day: 'Day 7', promo: 165000, normal: 32000 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Promotional Period Comparison
							</CardTitle>
							<CardDescription>
								Flash Sale vs normal week performance
							</CardDescription>
						</div>
						<Badge className="w-fit bg-primary/20 text-primary">
							7-Day Analysis
						</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{metrics.map((m, i) => (
								<MetricCompare key={i} {...m} />
							))}
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<p className="mb-4 text-sm font-medium">
									Daily Revenue Comparison
								</p>
								<ChartContainer
									config={chartConfig}
									className="h-[280px] w-full"
								>
									<AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
										<CartesianGrid strokeDasharray="3 3" vertical={false} />
										<XAxis dataKey="day" tickLine={false} axisLine={false} />
										<YAxis
											tickLine={false}
											axisLine={false}
											tickFormatter={(v) => `$${v / 1000}K`}
										/>
										<ChartTooltip content={<ChartTooltipContent />} />
										<ChartLegend content={<ChartLegendContent />} />
										<Area
											type="monotone"
											dataKey="promo"
											stroke="var(--color-promo)"
											fill="var(--color-promo)"
											fillOpacity={0.3}
										/>
										<Area
											type="monotone"
											dataKey="normal"
											stroke="var(--color-normal)"
											fill="var(--color-normal)"
											fillOpacity={0.3}
										/>
									</AreaChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
