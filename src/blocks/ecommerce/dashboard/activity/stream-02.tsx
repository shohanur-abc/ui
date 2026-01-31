import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Package,
	Truck,
	MapPin,
	CheckCircle2,
	Clock,
	AlertCircle,
	RefreshCw,
	ExternalLink,
} from 'lucide-react';

interface ShipmentUpdate {
	id: string;
	orderId: string;
	carrier: string;
	trackingNumber: string;
	status: 'processing' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception';
	currentLocation: string;
	eta: string;
	progress: number;
	lastUpdate: string;
	customer: {
		name: string;
		destination: string;
	};
}

interface ShipmentStreamProps {
	title: string;
	shipments: ShipmentUpdate[];
	activeShipments: number;
	deliveredToday: number;
}

const StatusIcon = ({ status }: { status: ShipmentUpdate['status'] }) => {
	const config = {
		processing: { icon: Clock, className: 'text-muted-foreground' },
		picked_up: { icon: Package, className: 'text-blue-400' },
		in_transit: { icon: Truck, className: 'text-purple-400' },
		out_for_delivery: { icon: MapPin, className: 'text-amber-400' },
		delivered: { icon: CheckCircle2, className: 'text-emerald-400' },
		exception: { icon: AlertCircle, className: 'text-rose-400' },
	};

	const { icon: Icon, className } = config[status];
	return <Icon className={`size-5 ${className}`} />;
};

const StatusBadge = ({ status }: { status: ShipmentUpdate['status'] }) => {
	const config = {
		processing: 'bg-muted text-muted-foreground border-border',
		picked_up: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		in_transit: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		out_for_delivery: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		delivered: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		exception: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
	};

	const labels = {
		processing: 'Processing',
		picked_up: 'Picked Up',
		in_transit: 'In Transit',
		out_for_delivery: 'Out for Delivery',
		delivered: 'Delivered',
		exception: 'Exception',
	};

	return (
		<Badge variant="outline" className={config[status]}>
			{labels[status]}
		</Badge>
	);
};

const ShipmentCard = ({ shipment }: { shipment: ShipmentUpdate }) => (
	<div
		className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
			shipment.status === 'exception'
				? 'border-rose-500/30 bg-rose-500/5'
				: shipment.status === 'delivered'
					? 'border-emerald-500/30 bg-emerald-500/5'
					: 'border-border/50 bg-card/80 hover:border-primary/30'
		}`}
	>
		<div className="flex items-start gap-4">
			<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted/50">
				<StatusIcon status={shipment.status} />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div>
						<div className="flex items-center gap-2 mb-1">
							<span className="font-medium text-foreground">
								{shipment.orderId}
							</span>
							<StatusBadge status={shipment.status} />
						</div>
						<p className="text-sm text-muted-foreground">
							{shipment.carrier} • {shipment.trackingNumber}
						</p>
					</div>
					<Button variant="ghost" size="icon-sm" className="shrink-0">
						<ExternalLink className="size-4" />
					</Button>
				</div>

				<div className="space-y-2 mb-3">
					<div className="flex items-center justify-between text-xs">
						<span className="text-muted-foreground">Progress</span>
						<span className="text-foreground">{shipment.progress}%</span>
					</div>
					<Progress value={shipment.progress} className="h-1.5" />
				</div>

				<div className="flex items-center justify-between text-xs">
					<div className="flex items-center gap-1 text-muted-foreground">
						<MapPin className="size-3" />
						<span>{shipment.currentLocation}</span>
					</div>
					{shipment.status !== 'delivered' && (
						<div className="flex items-center gap-1 text-muted-foreground">
							<Clock className="size-3" />
							<span>ETA: {shipment.eta}</span>
						</div>
					)}
				</div>

				<div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
					<div className="text-xs">
						<span className="text-muted-foreground">To: </span>
						<span className="text-foreground">{shipment.customer.name}</span>
						<span className="text-muted-foreground"> • {shipment.customer.destination}</span>
					</div>
					<span className="text-xs text-muted-foreground">{shipment.lastUpdate}</span>
				</div>
			</div>
		</div>
	</div>
);

const ShipmentStats = ({
	activeShipments,
	deliveredToday,
}: {
	activeShipments: number;
	deliveredToday: number;
}) => (
	<div className="grid grid-cols-2 gap-4">
		<div className="flex items-center gap-3 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
			<Truck className="size-5 text-purple-400" />
			<div>
				<p className="text-2xl font-bold text-purple-400">{activeShipments}</p>
				<p className="text-xs text-muted-foreground">In Transit</p>
			</div>
		</div>
		<div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<CheckCircle2 className="size-5 text-emerald-400" />
			<div>
				<p className="text-2xl font-bold text-emerald-400">{deliveredToday}</p>
				<p className="text-xs text-muted-foreground">Delivered Today</p>
			</div>
		</div>
	</div>
);

const ShipmentStream = ({
	title,
	shipments,
	activeShipments,
	deliveredToday,
}: ShipmentStreamProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Truck className="size-5" />
				{title}
			</CardTitle>
			<Button variant="ghost" size="sm" className="gap-2">
				<RefreshCw className="size-4" />
				Refresh
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<ShipmentStats
				activeShipments={activeShipments}
				deliveredToday={deliveredToday}
			/>
			<div className="space-y-3 max-h-[400px] overflow-y-auto">
				{shipments.map((shipment) => (
					<ShipmentCard key={shipment.id} shipment={shipment} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const shipments: ShipmentUpdate[] = [
		{
			id: '1',
			orderId: 'ORD-2024-0892',
			carrier: 'FedEx',
			trackingNumber: '789456123456',
			status: 'out_for_delivery',
			currentLocation: 'San Francisco, CA',
			eta: 'Today 3:00 PM',
			progress: 85,
			lastUpdate: '10 min ago',
			customer: { name: 'Sarah Chen', destination: 'San Francisco, CA' },
		},
		{
			id: '2',
			orderId: 'ORD-2024-0891',
			carrier: 'UPS',
			trackingNumber: '1Z999AA10123456784',
			status: 'in_transit',
			currentLocation: 'Denver, CO',
			eta: 'Tomorrow',
			progress: 55,
			lastUpdate: '2 hours ago',
			customer: { name: 'Mike Johnson', destination: 'Los Angeles, CA' },
		},
		{
			id: '3',
			orderId: 'ORD-2024-0890',
			carrier: 'USPS',
			trackingNumber: '9400111899223100012345',
			status: 'delivered',
			currentLocation: 'Chicago, IL',
			eta: '-',
			progress: 100,
			lastUpdate: '1 hour ago',
			customer: { name: 'Emily Davis', destination: 'Chicago, IL' },
		},
		{
			id: '4',
			orderId: 'ORD-2024-0889',
			carrier: 'DHL',
			trackingNumber: '1234567890',
			status: 'exception',
			currentLocation: 'Miami, FL',
			eta: 'Delayed',
			progress: 40,
			lastUpdate: '30 min ago',
			customer: { name: 'Alex Kim', destination: 'Miami, FL' },
		},
		{
			id: '5',
			orderId: 'ORD-2024-0888',
			carrier: 'FedEx',
			trackingNumber: '111222333444',
			status: 'picked_up',
			currentLocation: 'Warehouse - Portland, OR',
			eta: 'Mar 18',
			progress: 15,
			lastUpdate: '4 hours ago',
			customer: { name: 'Jordan Lee', destination: 'Seattle, WA' },
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<ShipmentStream
					title="Shipment Tracking"
					shipments={shipments}
					activeShipments={47}
					deliveredToday={23}
				/>
			</div>
		</section>
	);
}
