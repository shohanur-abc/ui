import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Package,
	Truck,
	CheckCircle2,
	MapPin,
	Calendar,
	ExternalLink,
} from 'lucide-react';

interface ShipmentCard {
	trackingNumber: string;
	carrier: string;
	carrierLogo?: string;
	status: 'in-transit' | 'out-for-delivery' | 'delivered' | 'delayed';
	origin: string;
	destination: string;
	progress: number;
	estimatedDelivery: string;
	lastUpdate: string;
	items: number;
}

interface ShipmentGridCardProps {
	shipment: ShipmentCard;
	labels: {
		from: string;
		to: string;
		eta: string;
		items: string;
		track: string;
	};
}

const StatusConfig: Record<
	ShipmentCard['status'],
	{ className: string; bgClass: string; label: string }
> = {
	'in-transit': {
		className: 'text-blue-500',
		bgClass: 'bg-blue-500/10',
		label: 'In Transit',
	},
	'out-for-delivery': {
		className: 'text-primary',
		bgClass: 'bg-primary/10',
		label: 'Out for Delivery',
	},
	delivered: {
		className: 'text-accent',
		bgClass: 'bg-accent/10',
		label: 'Delivered',
	},
	delayed: {
		className: 'text-destructive',
		bgClass: 'bg-destructive/10',
		label: 'Delayed',
	},
};

const ShipmentGridCard = ({ shipment, labels }: ShipmentGridCardProps) => {
	const { className, bgClass, label } = StatusConfig[shipment.status];
	return (
		<Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all overflow-hidden">
			<div
				className={`h-1 ${shipment.status === 'delivered' ? 'bg-accent' : shipment.status === 'delayed' ? 'bg-destructive' : 'bg-primary'}`}
			/>
			<CardContent className="p-4">
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center gap-2">
						<div className="size-8 rounded-lg bg-muted flex items-center justify-center">
							<Truck className="size-4" />
						</div>
						<div>
							<p className="text-sm font-medium">{shipment.carrier}</p>
							<p className="text-xs text-muted-foreground font-mono">
								{shipment.trackingNumber}
							</p>
						</div>
					</div>
					<Badge
						variant="outline"
						className={`${className} ${bgClass} border-current/30 text-xs`}
					>
						{label}
					</Badge>
				</div>

				<div className="relative mb-4">
					<div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
						<div className="flex items-center gap-1">
							<MapPin className="size-3" />
							{shipment.origin}
						</div>
						<div className="flex items-center gap-1">
							<MapPin className="size-3" />
							{shipment.destination}
						</div>
					</div>
					<Progress value={shipment.progress} className="h-2" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1">
						<div
							className={`size-4 rounded-full border-2 border-background shadow ${shipment.status === 'delivered' ? 'bg-accent' : 'bg-primary'}`}
						>
							{shipment.status === 'delivered' ? (
								<CheckCircle2 className="size-4 text-white p-0.5" />
							) : (
								<Truck className="size-4 text-white p-0.5" />
							)}
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3 text-sm mb-3">
					<div>
						<p className="text-muted-foreground text-xs">{labels.eta}</p>
						<p className="font-medium">{shipment.estimatedDelivery}</p>
					</div>
					<div>
						<p className="text-muted-foreground text-xs">{labels.items}</p>
						<p className="font-medium">{shipment.items} items</p>
					</div>
				</div>

				<p className="text-xs text-muted-foreground mb-3">
					Last update: {shipment.lastUpdate}
				</p>

				<Button variant="outline" size="sm" className="w-full gap-1.5">
					{labels.track}
					<ExternalLink className="size-3" />
				</Button>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const labels = {
		from: 'From',
		to: 'To',
		eta: 'Est. Delivery',
		items: 'Package',
		track: 'Track Shipment',
	};

	const shipments: ShipmentCard[] = [
		{
			trackingNumber: '1Z999AA1012345',
			carrier: 'UPS',
			status: 'in-transit',
			origin: 'LA, CA',
			destination: 'NYC, NY',
			progress: 65,
			estimatedDelivery: 'Feb 2',
			lastUpdate: '2 hours ago',
			items: 3,
		},
		{
			trackingNumber: '9400111899223',
			carrier: 'USPS',
			status: 'out-for-delivery',
			origin: 'Chicago, IL',
			destination: 'Detroit, MI',
			progress: 90,
			estimatedDelivery: 'Today',
			lastUpdate: '30 min ago',
			items: 1,
		},
		{
			trackingNumber: '7489372619283',
			carrier: 'FedEx',
			status: 'delivered',
			origin: 'Seattle, WA',
			destination: 'Portland, OR',
			progress: 100,
			estimatedDelivery: 'Jan 30',
			lastUpdate: 'Delivered',
			items: 2,
		},
		{
			trackingNumber: '2847561938274',
			carrier: 'DHL',
			status: 'delayed',
			origin: 'Miami, FL',
			destination: 'Atlanta, GA',
			progress: 45,
			estimatedDelivery: 'TBD',
			lastUpdate: '6 hours ago',
			items: 4,
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
					{shipments.map((shipment) => (
						<ShipmentGridCard
							key={shipment.trackingNumber}
							shipment={shipment}
							labels={labels}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
