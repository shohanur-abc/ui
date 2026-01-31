import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Split, Package, DollarSign, Truck, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SplitShipment {
	shipmentId: string;
	items: { name: string; quantity: number }[];
	status: 'pending' | 'shipped' | 'delivered';
	trackingNumber?: string;
	estimatedDelivery: string;
}

interface SplitOrderCardProps {
	order: {
		id: string;
		customer: string;
		total: string;
		shipments: SplitShipment[];
	};
	labels: {
		shipment: string;
		items: string;
		tracking: string;
		delivery: string;
		viewTracking: string;
	};
}

interface ShipmentCardProps {
	shipment: SplitShipment;
	index: number;
	labels: SplitOrderCardProps['labels'];
}

const StatusBadge = ({ status }: { status: SplitShipment['status'] }) => {
	const config: Record<SplitShipment['status'], { icon: typeof Clock; variant: 'default' | 'secondary' | 'outline'; label: string }> = {
		pending: { icon: Clock, variant: 'outline', label: 'Pending' },
		shipped: { icon: Truck, variant: 'secondary', label: 'Shipped' },
		delivered: { icon: CheckCircle2, variant: 'default', label: 'Delivered' },
	};
	const { icon: Icon, variant, label } = config[status];
	return (
		<Badge variant={variant} className="gap-1">
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const ShipmentCard = ({ shipment, index, labels }: ShipmentCardProps) => (
	<div className="p-4 rounded-lg bg-muted/20 border border-border/50 space-y-3">
		<div className="flex items-center justify-between">
			<span className="font-medium">{labels.shipment} {index + 1}</span>
			<StatusBadge status={shipment.status} />
		</div>
		
		<div className="space-y-1.5">
			{shipment.items.map((item, i) => (
				<div key={i} className="flex items-center gap-2 text-sm">
					<Package className="size-4 text-muted-foreground" />
					<span>{item.name}</span>
					<span className="text-muted-foreground">× {item.quantity}</span>
				</div>
			))}
		</div>

		{shipment.trackingNumber && (
			<div className="text-sm">
				<span className="text-muted-foreground">{labels.tracking}: </span>
				<span className="font-mono">{shipment.trackingNumber}</span>
			</div>
		)}

		<div className="flex items-center justify-between pt-2 border-t border-border/50">
			<div className="text-sm">
				<span className="text-muted-foreground">{labels.delivery}: </span>
				<span className="font-medium">{shipment.estimatedDelivery}</span>
			</div>
			{shipment.trackingNumber && (
				<Button variant="ghost" size="sm" className="gap-1 text-primary">
					{labels.viewTracking}
					<ArrowRight className="size-3" />
				</Button>
			)}
		</div>
	</div>
);

const SplitOrderCard = ({ order, labels }: SplitOrderCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
						<Split className="size-5 text-primary" />
					</div>
					<div>
						<CardTitle className="text-base font-mono">{order.id}</CardTitle>
						<CardDescription>{order.customer}</CardDescription>
					</div>
				</div>
				<Badge variant="outline" className="gap-1.5">
					<Package className="size-3" />
					{order.shipments.length} Shipments
				</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{order.shipments.map((shipment, i) => (
				<ShipmentCard key={shipment.shipmentId} shipment={shipment} index={i} labels={labels} />
			))}

			<Separator />

			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Order Total</span>
				<span className="text-xl font-bold">{order.total}</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const labels = {
		shipment: 'Shipment',
		items: 'Items',
		tracking: 'Tracking',
		delivery: 'Est. Delivery',
		viewTracking: 'Track',
	};

	const order = {
		id: 'ORD-2024-001',
		customer: 'John Smith',
		total: '$567.00',
		shipments: [
			{
				shipmentId: 'SHP-001',
				items: [
					{ name: 'Wireless Headphones', quantity: 1 },
					{ name: 'USB-C Cable', quantity: 2 },
				],
				status: 'delivered' as const,
				trackingNumber: '1Z999AA10123456784',
				estimatedDelivery: 'Jan 28, 2026',
			},
			{
				shipmentId: 'SHP-002',
				items: [
					{ name: 'Laptop Stand', quantity: 1 },
				],
				status: 'shipped' as const,
				trackingNumber: '1Z999AA10987654321',
				estimatedDelivery: 'Jan 30, 2026',
			},
			{
				shipmentId: 'SHP-003',
				items: [
					{ name: 'External SSD 1TB', quantity: 1 },
				],
				status: 'pending' as const,
				estimatedDelivery: 'Feb 2, 2026',
			},
		],
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<SplitOrderCard order={order} labels={labels} />
			</div>
		</section>
	);
}
