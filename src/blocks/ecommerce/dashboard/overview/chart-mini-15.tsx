'use client';

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ArrowUpRight, DollarSign, ShoppingCart } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type AreaDataItem = {
	hour: string;
	revenue: number;
};

type BarDataItem = {
	hour: string;
	orders: number;
};

type MiniChartCardProps = {
	title: string;
	value: string;
	change: string;
	icon: React.ElementType;
	chartType: 'area' | 'bar';
	data: AreaDataItem[] | BarDataItem[];
	dataKey: string;
	color: string;
};

const areaConfig: ChartConfig = {
	revenue: { label: 'Revenue', color: 'var(--chart-1)' },
};

const barConfig: ChartConfig = {
	orders: { label: 'Orders', color: 'var(--chart-2)' },
};

const MiniChartCard = ({
	title,
	value,
	change,
	icon: Icon,
	chartType,
	data,
	dataKey,
	color,
}: MiniChartCardProps) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:border-primary/50">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="rounded-lg bg-primary/10 p-2">
						<Icon className="size-4 text-primary" />
					</div>
					<CardTitle className="text-sm font-medium text-muted-foreground">
						{title}
					</CardTitle>
				</div>
				<div className="flex items-center gap-1 text-xs font-medium text-emerald-500">
					<ArrowUpRight className="size-3" />
					{change}
				</div>
			</div>
		</CardHeader>
		<CardContent className="space-y-3 pt-0">
			<p className="text-2xl font-bold">{value}</p>
			<ChartContainer
				config={chartType === 'area' ? areaConfig : barConfig}
				className="h-[80px] w-full"
			>
				{chartType === 'area' ? (
					<AreaChart
						data={data}
						margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
					>
						<defs>
							<linearGradient
								id={`fill-${dataKey}`}
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop offset="5%" stopColor={color} stopOpacity={0.3} />
								<stop offset="95%" stopColor={color} stopOpacity={0} />
							</linearGradient>
						</defs>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Area
							type="monotone"
							dataKey={dataKey}
							stroke={color}
							strokeWidth={2}
							fill={`url(#fill-${dataKey})`}
						/>
					</AreaChart>
				) : (
					<BarChart
						data={data}
						margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
					>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Bar dataKey={dataKey} fill={color} radius={[2, 2, 0, 0]} />
					</BarChart>
				)}
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const revenueData: AreaDataItem[] = [
		{ hour: '00:00', revenue: 1200 },
		{ hour: '04:00', revenue: 800 },
		{ hour: '08:00', revenue: 2400 },
		{ hour: '12:00', revenue: 4200 },
		{ hour: '16:00', revenue: 3800 },
		{ hour: '20:00', revenue: 5100 },
		{ hour: '23:00', revenue: 3200 },
	];

	const ordersData: BarDataItem[] = [
		{ hour: '00:00', orders: 12 },
		{ hour: '04:00', orders: 8 },
		{ hour: '08:00', orders: 45 },
		{ hour: '12:00', orders: 78 },
		{ hour: '16:00', orders: 62 },
		{ hour: '20:00', orders: 95 },
		{ hour: '23:00', orders: 42 },
	];

	const cards: MiniChartCardProps[] = [
		{
			title: 'Today Revenue',
			value: '$20,700',
			change: '+18.2%',
			icon: DollarSign,
			chartType: 'area',
			data: revenueData,
			dataKey: 'revenue',
			color: 'var(--chart-1)',
		},
		{
			title: 'Today Orders',
			value: '342',
			change: '+12.5%',
			icon: ShoppingCart,
			chartType: 'bar',
			data: ordersData,
			dataKey: 'orders',
			color: 'var(--chart-2)',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-2">
					{cards.map((card, i) => (
						<MiniChartCard key={i} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
