'use client';

import { Cell, Pie, PieChart } from 'recharts';
import {
	ArrowDownRight,
	ArrowUpRight,
	CreditCard,
	DollarSign,
	Package,
	RotateCcw,
	ShoppingCart,
	Truck,
	type LucideIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type StatItem = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
};

type PieDataItem = {
	name: string;
	value: number;
	fill: string;
};

type FulfillmentItem = {
	label: string;
	value: number;
	color: string;
};

const StatCard = ({ title, value, change, trend, icon: Icon }: StatItem) => (
	<Card className="group transition-all hover:border-primary/50">
		<CardContent className="flex items-center gap-4 p-4">
			<div className="rounded-lg bg-primary/10 p-2.5">
				<Icon className="size-5 text-primary" />
			</div>
			<div className="flex-1">
				<p className="text-xs text-muted-foreground">{title}</p>
				<p className="text-xl font-bold">{value}</p>
			</div>
			<span
				className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
			>
				{trend === 'up' ? (
					<ArrowUpRight className="size-3" />
				) : (
					<ArrowDownRight className="size-3" />
				)}
				{change}
			</span>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	value: { label: 'Value' },
};

export default function Main() {
	const stats: StatItem[] = [
		{
			title: 'Revenue',
			value: '$124.5k',
			change: '+23%',
			trend: 'up',
			icon: DollarSign,
		},
		{
			title: 'Orders',
			value: '3,842',
			change: '+18%',
			trend: 'up',
			icon: ShoppingCart,
		},
		{
			title: 'Avg Order',
			value: '$68.45',
			change: '-2%',
			trend: 'down',
			icon: CreditCard,
		},
		{
			title: 'Products',
			value: '1,247',
			change: '+5%',
			trend: 'up',
			icon: Package,
		},
	];

	const pieData: PieDataItem[] = [
		{ name: 'Electronics', value: 42, fill: 'var(--chart-1)' },
		{ name: 'Clothing', value: 28, fill: 'var(--chart-2)' },
		{ name: 'Home', value: 18, fill: 'var(--chart-3)' },
		{ name: 'Other', value: 12, fill: 'var(--chart-4)' },
	];

	const fulfillment: FulfillmentItem[] = [
		{ label: 'Shipped', value: 78, color: 'bg-emerald-500' },
		{ label: 'Processing', value: 15, color: 'bg-primary' },
		{ label: 'Pending', value: 7, color: 'bg-amber-500' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4 @xl:gap-6">
					{stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
					<Card className="@sm:col-span-2">
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Sales by Category</CardTitle>
						</CardHeader>
						<CardContent className="flex items-center gap-6">
							<ChartContainer
								config={chartConfig}
								className="h-[140px] w-[140px]"
							>
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Pie
										data={pieData}
										dataKey="value"
										nameKey="name"
										innerRadius={40}
										outerRadius={65}
									>
										{pieData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.fill} />
										))}
									</Pie>
								</PieChart>
							</ChartContainer>
							<div className="flex-1 space-y-2">
								{pieData.map((item, i) => (
									<div key={i} className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<div
												className="size-2.5 rounded-full"
												style={{ backgroundColor: item.fill }}
											/>
											<span className="text-sm">{item.name}</span>
										</div>
										<span className="text-sm font-medium">{item.value}%</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
					<Card className="@sm:col-span-2">
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Fulfillment Status</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{fulfillment.map((item, i) => (
								<div key={i} className="space-y-1.5">
									<div className="flex justify-between text-sm">
										<span>{item.label}</span>
										<span className="font-medium">{item.value}%</span>
									</div>
									<div className="h-2 overflow-hidden rounded-full bg-muted">
										<div
											className={`h-full ${item.color} transition-all`}
											style={{ width: `${item.value}%` }}
										/>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
