import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Package,
	Truck,
	CheckCircle2,
	Clock,
	MapPin,
	ArrowRight,
	RefreshCw,
	AlertTriangle,
	type LucideIcon,
} from 'lucide-react';

interface ShipmentStep {
	status: 'completed' | 'current' | 'pending';
	label: string;
	location?: string;
	timestamp?: string;
}

interface Shipment {
	id: string;
	orderId: string;
	carrier: string;
	trackingNumber: string;
	destination: string;
	estimatedDelivery: string;
	status: 'in_transit' | 'out_for_delivery' | 'delivered' | 'delayed';
	progress: number;
	steps: ShipmentStep[];
}

interface ShipmentTrackerProps {
	title: string;
	shipments: Shipment[];
	stats: {
		inTransit: number;
		outForDelivery: number;
		delivered: number;
	};
}

const StatusConfig: Record<
	Shipment['status'],
	{ label: string; className: string; icon: LucideIcon }
> = {
	in_transit: {
		label: 'In Transit',
		className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		icon: Truck,
	},
	out_for_delivery: {
		label: 'Out for Delivery',
		className: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		icon: Truck,
	},
	delivered: {
		label: 'Delivered',
		className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		icon: CheckCircle2,
	},
	delayed: {
		label: 'Delayed',
		className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		icon: AlertTriangle,
	},
};

const StepIndicator = ({ steps }: { steps: ShipmentStep[] }) => (
	<div className="flex items-center gap-1 w-full">
		{steps.map((step, index) => (
			<div key={index} className="flex-1 flex items-center gap-1">
				<div
					className={`size-2.5 rounded-full ${
						step.status === 'completed'
							? 'bg-emerald-500'
							: step.status === 'current'
								? 'bg-primary animate-pulse'
								: 'bg-muted'
					}`}
				/>
				{index < steps.length - 1 && (
					<div
						className={`flex-1 h-0.5 ${
							step.status === 'completed' ? 'bg-emerald-500' : 'bg-muted'
						}`}
					/>
				)}
			</div>
		))}
	</div>
);

const ShipmentCard = ({ shipment }: { shipment: Shipment }) => {
	const config = StatusConfig[shipment.status];
	const StatusIcon = config.icon;

	return (
		<div
			className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
				shipment.status === 'delayed'
					? 'border-amber-500/30 bg-amber-500/5'
					: shipment.status === 'out_for_delivery'
						? 'border-purple-500/30 bg-purple-500/5'
						: 'border-border/50 bg-card/80'
			}`}
		>
			<div className="flex items-start justify-between mb-3">
				<div>
					<div className="flex items-center gap-2 mb-1">
						<span className="font-semibold text-foreground font-mono">
							{shipment.orderId}
						</span>
						<Badge variant="outline" className={config.className}>
							<StatusIcon className="size-3 mr-1" />
							{config.label}
						</Badge>
					</div>
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<span>{shipment.carrier}</span>
						<span>•</span>
						<span className="font-mono">{shipment.trackingNumber}</span>
					</div>
				</div>
				<Button variant="ghost" size="sm" className="gap-1 text-xs">
					<RefreshCw className="size-3" />
					Refresh
				</Button>
			</div>

			<div className="mb-4">
				<StepIndicator steps={shipment.steps} />
				<div className="flex justify-between mt-2 text-xs">
					{shipment.steps.map((step, index) => (
						<span
							key={index}
							className={`text-center ${
								step.status === 'current'
									? 'text-primary font-medium'
									: step.status === 'completed'
										? 'text-muted-foreground'
										: 'text-muted'
							}`}
							style={{ maxWidth: `${100 / shipment.steps.length}%` }}
						>
							{step.label}
						</span>
					))}
				</div>
			</div>

			<div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
				<div className="flex items-center gap-2">
					<MapPin className="size-4 text-muted-foreground" />
					<span className="text-sm text-foreground">{shipment.destination}</span>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<Clock className="size-4 text-muted-foreground" />
					<span className="text-muted-foreground">ETA:</span>
					<span className="font-medium text-foreground">
						{shipment.estimatedDelivery}
					</span>
				</div>
			</div>
		</div>
	);
};

const TrackerStats = ({ stats }: { stats: ShipmentTrackerProps['stats'] }) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
			<Truck className="size-4 text-blue-400 mb-2" />
			<span className="text-2xl font-bold text-blue-400 block">
				{stats.inTransit}
			</span>
			<span className="text-xs text-muted-foreground">In Transit</span>
		</div>
		<div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
			<Package className="size-4 text-purple-400 mb-2" />
			<span className="text-2xl font-bold text-purple-400 block">
				{stats.outForDelivery}
			</span>
			<span className="text-xs text-muted-foreground">Out for Delivery</span>
		</div>
		<div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<CheckCircle2 className="size-4 text-emerald-400 mb-2" />
			<span className="text-2xl font-bold text-emerald-400 block">
				{stats.delivered}
			</span>
			<span className="text-xs text-muted-foreground">Delivered</span>
		</div>
	</div>
);

const ShipmentTracker = ({ title, shipments, stats }: ShipmentTrackerProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Truck className="size-5" />
				{title}
			</CardTitle>
			<Button variant="outline" size="sm">
				View All
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<TrackerStats stats={stats} />
			<ScrollArea className="h-[380px]">
				<div className="space-y-3 pr-4">
					{shipments.map((shipment) => (
						<ShipmentCard key={shipment.id} shipment={shipment} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const shipments: Shipment[] = [
		{
			id: '1',
			orderId: 'ORD-2024-0892',
			carrier: 'FedEx',
			trackingNumber: '789456123456',
			destination: 'San Francisco, CA',
			estimatedDelivery: 'Today, 3:00 PM',
			status: 'out_for_delivery',
			progress: 85,
			steps: [
				{ status: 'completed', label: 'Shipped', timestamp: 'Mar 15' },
				{ status: 'completed', label: 'In Transit', timestamp: 'Mar 16' },
				{ status: 'current', label: 'Out for Delivery', timestamp: 'Mar 18' },
				{ status: 'pending', label: 'Delivered' },
			],
		},
		{
			id: '2',
			orderId: 'ORD-2024-0891',
			carrier: 'UPS',
			trackingNumber: '1Z999AA10123456784',
			destination: 'Los Angeles, CA',
			estimatedDelivery: 'Mar 20 (Delayed)',
			status: 'delayed',
			progress: 60,
			steps: [
				{ status: 'completed', label: 'Shipped', timestamp: 'Mar 14' },
				{ status: 'current', label: 'In Transit', location: 'Denver Hub' },
				{ status: 'pending', label: 'Out for Delivery' },
				{ status: 'pending', label: 'Delivered' },
			],
		},
		{
			id: '3',
			orderId: 'ORD-2024-0890',
			carrier: 'USPS',
			trackingNumber: '9400111899223100012345',
			destination: 'Chicago, IL',
			estimatedDelivery: 'Mar 19',
			status: 'in_transit',
			progress: 45,
			steps: [
				{ status: 'completed', label: 'Shipped', timestamp: 'Mar 16' },
				{ status: 'current', label: 'In Transit', location: 'St. Louis' },
				{ status: 'pending', label: 'Out for Delivery' },
				{ status: 'pending', label: 'Delivered' },
			],
		},
		{
			id: '4',
			orderId: 'ORD-2024-0889',
			carrier: 'DHL',
			trackingNumber: '1234567890',
			destination: 'Miami, FL',
			estimatedDelivery: 'Delivered Mar 17',
			status: 'delivered',
			progress: 100,
			steps: [
				{ status: 'completed', label: 'Shipped', timestamp: 'Mar 14' },
				{ status: 'completed', label: 'In Transit', timestamp: 'Mar 15' },
				{ status: 'completed', label: 'Out for Delivery', timestamp: 'Mar 17' },
				{ status: 'completed', label: 'Delivered', timestamp: 'Mar 17' },
			],
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<ShipmentTracker
					title="Shipment Tracker"
					shipments={shipments}
					stats={{
						inTransit: 23,
						outForDelivery: 8,
						delivered: 156,
					}}
				/>
			</div>
		</section>
	);
}
