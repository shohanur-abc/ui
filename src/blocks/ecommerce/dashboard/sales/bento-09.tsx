'use client';

import { Truck, Package, Clock, CheckCircle2, XCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type ShippingMetric = {
	label: string;
	value: string;
	change: number;
	icon: React.ReactNode;
};

type DeliveryStatus = {
	status: string;
	count: number;
	percentage: number;
	color: string;
};

type CarrierPerformance = {
	name: string;
	deliveries: number;
	onTime: number;
	avgDays: number;
};

type BentoLayout9Props = {
	metrics: ShippingMetric[];
	statuses: DeliveryStatus[];
	carriers: CarrierPerformance[];
};

const MetricCard = ({ metric }: { metric: ShippingMetric }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">{metric.label}</p>
					<p className="text-2xl font-bold mt-1">{metric.value}</p>
				</div>
				<div className="p-3 rounded-lg bg-primary/10 text-primary">{metric.icon}</div>
			</div>
			<Badge variant={metric.change >= 0 ? 'default' : 'destructive'} className="mt-2">
				{metric.change >= 0 ? '+' : ''}{metric.change}% vs last month
			</Badge>
		</CardContent>
	</Card>
);

const StatusCard = ({ statuses }: { statuses: DeliveryStatus[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @xl:col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Package className="size-4 text-muted-foreground" />
				<CardTitle className="text-sm font-medium">Order Status Distribution</CardTitle>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex gap-2 mb-4">
				{statuses.map((status, idx) => (
					<div
						key={idx}
						className="h-3 rounded-full"
						style={{
							width: `${status.percentage}%`,
							backgroundColor: status.color,
						}}
					/>
				))}
			</div>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
				{statuses.map((status, idx) => (
					<div key={idx} className="flex items-center gap-2">
						<div className="size-3 rounded-full" style={{ backgroundColor: status.color }} />
						<div>
							<p className="text-sm font-medium">{status.status}</p>
							<p className="text-xs text-muted-foreground">{status.count} orders</p>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const CarrierCard = ({ carriers }: { carriers: CarrierPerformance[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @xl:col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Truck className="size-4 text-muted-foreground" />
				<CardTitle className="text-sm font-medium">Carrier Performance</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{carriers.map((carrier, idx) => (
				<div key={idx} className="flex items-center gap-4">
					<div className="w-24 font-medium">{carrier.name}</div>
					<div className="flex-1">
						<div className="flex items-center justify-between text-sm mb-1">
							<span className="text-muted-foreground">{carrier.deliveries} deliveries</span>
							<span className={carrier.onTime >= 95 ? 'text-primary' : carrier.onTime >= 90 ? 'text-amber-500' : 'text-destructive'}>
								{carrier.onTime}% on-time
							</span>
						</div>
						<Progress value={carrier.onTime} className="h-2" />
					</div>
					<div className="text-sm text-muted-foreground w-16 text-right">
						~{carrier.avgDays}d avg
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const BentoLayout9 = ({ metrics, statuses, carriers }: BentoLayout9Props) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
		{metrics.map((metric, idx) => (
			<MetricCard key={idx} metric={metric} />
		))}
		<StatusCard statuses={statuses} />
		<CarrierCard carriers={carriers} />
	</div>
);

export default function Main() {
	const metrics: ShippingMetric[] = [
		{ label: 'Shipped Today', value: '142', change: 8.2, icon: <Truck className="size-5" /> },
		{ label: 'In Transit', value: '486', change: 12.5, icon: <MapPin className="size-5" /> },
		{ label: 'Delivered', value: '1,284', change: 15.3, icon: <CheckCircle2 className="size-5" /> },
		{ label: 'Returns', value: '28', change: -5.2, icon: <XCircle className="size-5" /> },
	];

	const statuses: DeliveryStatus[] = [
		{ status: 'Processing', count: 85, percentage: 15, color: 'oklch(0.60 0.12 250)' },
		{ status: 'Shipped', count: 142, percentage: 25, color: 'oklch(0.65 0.14 200)' },
		{ status: 'In Transit', count: 198, percentage: 35, color: 'oklch(0.70 0.16 175)' },
		{ status: 'Delivered', count: 142, percentage: 25, color: 'oklch(0.70 0.18 155)' },
	];

	const carriers: CarrierPerformance[] = [
		{ name: 'FedEx', deliveries: 1250, onTime: 97, avgDays: 2.3 },
		{ name: 'UPS', deliveries: 980, onTime: 95, avgDays: 2.5 },
		{ name: 'USPS', deliveries: 620, onTime: 88, avgDays: 3.8 },
		{ name: 'DHL', deliveries: 380, onTime: 94, avgDays: 2.8 },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoLayout9 metrics={metrics} statuses={statuses} carriers={carriers} />
			</div>
		</section>
	);
}
