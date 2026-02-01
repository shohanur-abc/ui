'use client';

import {
	ArrowUpRight,
	Calendar,
	Clock,
	type LucideIcon,
	Package,
	RefreshCcw,
	ShoppingCart,
	TrendingUp,
	Truck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type OrderStatusProps = {
	status: string;
	count: number;
	percentage: number;
	color: string;
};

const OrderStatusCard = ({ statuses }: { statuses: OrderStatusProps[] }) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<CardTitle className="text-sm font-medium">Order Status</CardTitle>
			<Badge variant="outline">Today</Badge>
		</CardHeader>
		<CardContent>
			<div className="flex h-3 rounded-full overflow-hidden mb-4">
				{statuses.map((status, i) => (
					<div
						key={i}
						className={status.color}
						style={{ width: `${status.percentage}%` }}
					/>
				))}
			</div>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
				{statuses.map((status, i) => (
					<div key={i} className="space-y-1">
						<div className="flex items-center gap-2">
							<div className={`size-2 rounded-full ${status.color}`} />
							<span className="text-xs text-muted-foreground">
								{status.status}
							</span>
						</div>
						<p className="text-lg font-bold">{status.count}</p>
						<p className="text-xs text-muted-foreground">
							{status.percentage}%
						</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

type TimeMetricProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	unit: string;
	trend: string;
};

const TimeMetricCard = ({
	icon: Icon,
	label,
	value,
	unit,
	trend,
}: TimeMetricProps) => (
	<Card className="group border-border/50 bg-card/80 transition-all duration-300 hover:border-primary/30">
		<CardContent className="p-4">
			<div className="flex items-center gap-3 mb-3">
				<div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-colors">
					<Icon className="size-4 text-primary" />
				</div>
				<p className="text-xs text-muted-foreground">{label}</p>
			</div>
			<div className="flex items-baseline gap-1">
				<p className="text-2xl font-bold">{value}</p>
				<p className="text-sm text-muted-foreground">{unit}</p>
			</div>
			<p className="text-xs text-emerald-500 mt-1">{trend}</p>
		</CardContent>
	</Card>
);

type FulfillmentRowProps = {
	warehouse: string;
	pending: number;
	processing: number;
	shipped: number;
	delivered: number;
};

const FulfillmentCard = ({
	warehouses,
}: {
	warehouses: FulfillmentRowProps[];
}) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">
				Fulfillment by Warehouse
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground pb-2 border-b border-border/30">
				<span>Warehouse</span>
				<span className="text-center">Pending</span>
				<span className="text-center">Processing</span>
				<span className="text-center">Shipped</span>
				<span className="text-center">Delivered</span>
			</div>
			<div className="space-y-3 mt-3">
				{warehouses.map((wh, i) => (
					<div key={i} className="grid grid-cols-5 gap-2 text-sm">
						<span className="font-medium">{wh.warehouse}</span>
						<span className="text-center text-amber-500">{wh.pending}</span>
						<span className="text-center text-blue-500">{wh.processing}</span>
						<span className="text-center text-purple-500">{wh.shipped}</span>
						<span className="text-center text-emerald-500">{wh.delivered}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

type ReturnsItemProps = {
	reason: string;
	count: number;
	percentage: number;
};

const ReturnsCard = ({ returns }: { returns: ReturnsItemProps[] }) => (
	<Card className="border-border/50 bg-card/80">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-2">
				<RefreshCcw className="size-4 text-primary" />
				<CardTitle className="text-sm font-medium">Return Reasons</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{returns.map((item, i) => (
				<div key={i} className="space-y-1.5">
					<div className="flex items-center justify-between text-sm">
						<span>{item.reason}</span>
						<span className="font-semibold">{item.count}</span>
					</div>
					<Progress value={item.percentage} className="h-1" />
				</div>
			))}
		</CardContent>
	</Card>
);

type HourlyDataProps = {
	hour: string;
	orders: number;
};

const HourlyCard = ({ data }: { data: HourlyDataProps[] }) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Orders by Hour</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="h-32 flex items-end gap-1">
				{data.map((item, i) => (
					<div key={i} className="flex-1 flex flex-col items-center gap-1">
						<div
							className="w-full bg-gradient-to-t from-primary/30 to-primary rounded-t"
							style={{ height: `${(item.orders / 50) * 100}%` }}
						/>
						<span className="text-[10px] text-muted-foreground">
							{item.hour}
						</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const orderStatuses: OrderStatusProps[] = [
	{ status: 'Pending', count: 45, percentage: 15, color: 'bg-amber-500' },
	{ status: 'Processing', count: 78, percentage: 26, color: 'bg-blue-500' },
	{ status: 'Shipped', count: 112, percentage: 37, color: 'bg-purple-500' },
	{ status: 'Delivered', count: 65, percentage: 22, color: 'bg-emerald-500' },
];

const timeMetrics: TimeMetricProps[] = [
	{
		icon: Clock,
		label: 'Avg Processing',
		value: '2.4',
		unit: 'hours',
		trend: '-15% faster',
	},
	{
		icon: Truck,
		label: 'Avg Delivery',
		value: '3.2',
		unit: 'days',
		trend: '-0.5 days',
	},
	{
		icon: Package,
		label: 'Pick & Pack',
		value: '45',
		unit: 'mins',
		trend: '-8 mins',
	},
	{
		icon: Calendar,
		label: 'Lead Time',
		value: '4.1',
		unit: 'days',
		trend: '-0.3 days',
	},
];

const warehouses: FulfillmentRowProps[] = [
	{
		warehouse: 'East Coast',
		pending: 12,
		processing: 28,
		shipped: 45,
		delivered: 89,
	},
	{
		warehouse: 'West Coast',
		pending: 8,
		processing: 22,
		shipped: 38,
		delivered: 76,
	},
	{
		warehouse: 'Central',
		pending: 15,
		processing: 18,
		shipped: 29,
		delivered: 54,
	},
];

const returns: ReturnsItemProps[] = [
	{ reason: 'Defective Product', count: 23, percentage: 35 },
	{ reason: 'Wrong Size', count: 18, percentage: 27 },
	{ reason: 'Not as Described', count: 15, percentage: 23 },
	{ reason: 'Changed Mind', count: 10, percentage: 15 },
];

const hourlyData: HourlyDataProps[] = [
	{ hour: '8am', orders: 12 },
	{ hour: '9am', orders: 25 },
	{ hour: '10am', orders: 38 },
	{ hour: '11am', orders: 42 },
	{ hour: '12pm', orders: 35 },
	{ hour: '1pm', orders: 28 },
	{ hour: '2pm', orders: 45 },
	{ hour: '3pm', orders: 50 },
	{ hour: '4pm', orders: 48 },
	{ hour: '5pm', orders: 42 },
	{ hour: '6pm', orders: 35 },
	{ hour: '7pm', orders: 22 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @lg:gap-6">
					{timeMetrics.map((metric, i) => (
						<TimeMetricCard key={i} {...metric} />
					))}
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-3 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<OrderStatusCard statuses={orderStatuses} />
					<ReturnsCard returns={returns} />
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<FulfillmentCard warehouses={warehouses} />
					<HourlyCard data={hourlyData} />
				</div>
			</div>
		</section>
	);
}
