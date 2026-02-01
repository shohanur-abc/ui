'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Package, ShoppingCart, RotateCcw, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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

type OrderData = {
	status: string;
	count: number;
	fill: string;
};

type StatusCardProps = {
	icon: LucideIcon;
	status: string;
	count: string;
	percentage: number;
	iconBg: string;
	iconColor: string;
};

const StatusCard = ({
	icon: Icon,
	status,
	count,
	percentage,
	iconBg,
	iconColor,
}: StatusCardProps) => (
	<Card className="border-border/30 bg-muted/20">
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<div className={`rounded-lg p-2.5 ${iconBg}`}>
					<Icon className={`size-5 ${iconColor}`} />
				</div>
				<div className="flex-1">
					<p className="text-xs text-muted-foreground">{status}</p>
					<p className="text-xl font-bold">{count}</p>
				</div>
				<div className="text-right">
					<p className="text-lg font-medium">{percentage}%</p>
				</div>
			</div>
			<Progress value={percentage} className="mt-3 h-1.5" />
		</CardContent>
	</Card>
);

type MiniChartProps = {
	data: OrderData[];
	title: string;
	total: string;
};

const MiniDonut = ({ data, title, total }: MiniChartProps) => {
	const chartConfig: ChartConfig = data.reduce((acc, item) => {
		acc[item.status] = { label: item.status, color: item.fill };
		return acc;
	}, {} as ChartConfig);

	return (
		<div className="flex flex-col items-center gap-2">
			<ChartContainer config={chartConfig} className="aspect-square h-[120px]">
				<PieChart>
					<Pie
						data={data}
						dataKey="count"
						nameKey="status"
						innerRadius={35}
						outerRadius={50}
						strokeWidth={2}
						stroke="var(--background)"
					/>
				</PieChart>
			</ChartContainer>
			<div className="text-center">
				<p className="text-lg font-bold">{total}</p>
				<p className="text-xs text-muted-foreground">{title}</p>
			</div>
		</div>
	);
};

const chartConfig: ChartConfig = {
	delivered: {
		label: 'Delivered',
		color: 'oklch(0.7 0.18 160)',
	},
	processing: {
		label: 'Processing',
		color: 'oklch(0.7 0.2 280)',
	},
	returned: {
		label: 'Returned',
		color: 'oklch(0.75 0.15 55)',
	},
	cancelled: {
		label: 'Cancelled',
		color: 'oklch(0.62 0.24 25)',
	},
};

export default function Main() {
	const mainData: OrderData[] = [
		{ status: 'delivered', count: 8450, fill: 'var(--color-delivered)' },
		{ status: 'processing', count: 1250, fill: 'var(--color-processing)' },
		{ status: 'returned', count: 420, fill: 'var(--color-returned)' },
		{ status: 'cancelled', count: 180, fill: 'var(--color-cancelled)' },
	];

	const statusCards: StatusCardProps[] = [
		{
			icon: Package,
			status: 'Delivered',
			count: '8,450',
			percentage: 82,
			iconBg: 'bg-emerald-500/10',
			iconColor: 'text-emerald-500',
		},
		{
			icon: ShoppingCart,
			status: 'Processing',
			count: '1,250',
			percentage: 12,
			iconBg: 'bg-primary/10',
			iconColor: 'text-primary',
		},
		{
			icon: RotateCcw,
			status: 'Returned',
			count: '420',
			percentage: 4,
			iconBg: 'bg-amber-500/10',
			iconColor: 'text-amber-500',
		},
		{
			icon: XCircle,
			status: 'Cancelled',
			count: '180',
			percentage: 2,
			iconBg: 'bg-rose-500/10',
			iconColor: 'text-rose-500',
		},
	];

	const weeklyData: OrderData[] = [
		{ status: 'delivered', count: 1850, fill: 'oklch(0.7 0.18 160)' },
		{ status: 'processing', count: 320, fill: 'oklch(0.7 0.2 280)' },
		{ status: 'other', count: 130, fill: 'oklch(0.6 0.1 240)' },
	];

	const todayData: OrderData[] = [
		{ status: 'delivered', count: 285, fill: 'oklch(0.7 0.18 160)' },
		{ status: 'processing', count: 98, fill: 'oklch(0.7 0.2 280)' },
		{ status: 'other', count: 17, fill: 'oklch(0.6 0.1 240)' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Order Status Report
						</CardTitle>
						<CardDescription>
							Complete breakdown of order fulfillment status
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{statusCards.map((card, i) => (
								<StatusCard key={i} {...card} />
							))}
						</div>
						<div className="grid gap-6 @md:grid-cols-[1fr,200px]">
							<ChartContainer
								config={chartConfig}
								className="mx-auto aspect-[2/1] h-[220px] w-full"
							>
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Pie
										data={mainData}
										dataKey="count"
										nameKey="status"
										cx="50%"
										cy="50%"
										innerRadius={60}
										outerRadius={95}
										strokeWidth={3}
										stroke="var(--background)"
										paddingAngle={2}
									/>
								</PieChart>
							</ChartContainer>
							<div className="flex justify-center gap-6 @md:flex-col @md:justify-start">
								<MiniDonut data={weeklyData} title="This Week" total="2,300" />
								<MiniDonut data={todayData} title="Today" total="400" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
