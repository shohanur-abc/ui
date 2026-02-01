'use client';

import { Pie, PieChart, Cell } from 'recharts';
import { ShoppingCart } from 'lucide-react';

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
import { Badge } from '@/components/ui/badge';

type OrderStatusProps = {
	status: string;
	count: string;
	percentage: number;
	value: string;
	color: string;
	avgTime?: string;
};

const OrderStatus = ({
	status,
	count,
	percentage,
	value,
	color,
	avgTime,
}: OrderStatusProps) => (
	<div className="flex items-center gap-4 border-b border-border/30 py-4 last:border-0">
		<div
			className="size-4 shrink-0 rounded-full"
			style={{ backgroundColor: color }}
		/>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<p className="font-medium">{status}</p>
				<Badge variant="outline" className="text-[10px]">
					{percentage}%
				</Badge>
			</div>
			{avgTime && (
				<p className="text-xs text-muted-foreground">Avg time: {avgTime}</p>
			)}
		</div>
		<div className="text-center">
			<p className="text-lg font-bold">{count}</p>
			<p className="text-xs text-muted-foreground">orders</p>
		</div>
		<div className="text-right">
			<p className="font-medium">{value}</p>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	orders: {
		label: 'Orders',
	},
};

export default function Main() {
	const statuses: OrderStatusProps[] = [
		{
			status: 'Completed',
			count: '8,450',
			percentage: 65,
			value: '$985,200',
			color: 'var(--chart-1)',
			avgTime: '3.2 days',
		},
		{
			status: 'Processing',
			count: '1,850',
			percentage: 14,
			value: '$215,400',
			color: 'var(--chart-2)',
			avgTime: '0.5 days',
		},
		{
			status: 'Shipped',
			count: '1,520',
			percentage: 12,
			value: '$178,300',
			color: 'var(--chart-3)',
			avgTime: '2.1 days',
		},
		{
			status: 'Pending',
			count: '680',
			percentage: 5,
			value: '$85,600',
			color: 'var(--chart-4)',
			avgTime: '1.2 days',
		},
		{
			status: 'Cancelled',
			count: '380',
			percentage: 3,
			value: '$45,200',
			color: 'var(--chart-5)',
		},
		{
			status: 'Refunded',
			count: '120',
			percentage: 1,
			value: '$14,800',
			color: 'var(--muted-foreground)',
		},
	];

	const chartData = statuses.map((s) => ({
		name: s.status,
		value: s.percentage,
		fill: s.color,
	}));

	const summaryCards = [
		{
			label: 'Fulfillment Rate',
			value: '91%',
			desc: 'Orders shipped within 24h',
		},
		{
			label: 'Avg Processing Time',
			value: '4.2h',
			desc: 'From order to shipment',
		},
		{
			label: 'Cancellation Rate',
			value: '3%',
			desc: 'Below industry avg of 5%',
		},
		{ label: 'On-Time Delivery', value: '96%', desc: 'Delivered as promised' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<ShoppingCart className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Order Status Breakdown
								</CardTitle>
								<CardDescription>
									Distribution of orders by fulfillment status
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">13,000 Total Orders</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{summaryCards.map((c, i) => (
								<Card key={i} className="border-border/30 bg-muted/20">
									<CardContent className="p-4">
										<p className="text-2xl font-bold">{c.value}</p>
										<p className="text-sm font-medium">{c.label}</p>
										<p className="text-xs text-muted-foreground">{c.desc}</p>
									</CardContent>
								</Card>
							))}
						</div>
						<div className="grid gap-6 @lg:grid-cols-2">
							<ChartContainer
								config={chartConfig}
								className="mx-auto aspect-square h-[280px]"
							>
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Pie
										data={chartData}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										innerRadius={60}
										outerRadius={100}
										paddingAngle={2}
									>
										{chartData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.fill} />
										))}
									</Pie>
								</PieChart>
							</ChartContainer>
							<div>
								{statuses.map((s, i) => (
									<OrderStatus key={i} {...s} />
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
