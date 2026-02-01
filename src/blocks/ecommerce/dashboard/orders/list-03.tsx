import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Clock,
	Truck,
	Package,
	CheckCircle2,
	MapPin,
	ArrowRight,
} from 'lucide-react';

interface TrackingEvent {
	status: 'pending' | 'processing' | 'shipped' | 'in-transit' | 'delivered';
	title: string;
	description: string;
	location?: string;
	timestamp: string;
	isActive: boolean;
}

interface TrackingListProps {
	orderId: string;
	events: TrackingEvent[];
	labels: { trackingNumber: string; estimatedDelivery: string };
	trackingNumber: string;
	estimatedDelivery: string;
}

interface TrackingEventRowProps {
	event: TrackingEvent;
	isLast: boolean;
}

const StatusIcon = ({
	status,
	isActive,
}: {
	status: TrackingEvent['status'];
	isActive: boolean;
}) => {
	const icons: Record<TrackingEvent['status'], typeof Clock> = {
		pending: Clock,
		processing: Package,
		shipped: Truck,
		'in-transit': Truck,
		delivered: CheckCircle2,
	};
	const Icon = icons[status];
	return (
		<div
			className={`size-10 rounded-full flex items-center justify-center ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground'}`}
		>
			<Icon className="size-5" />
		</div>
	);
};

const TrackingEventRow = ({ event, isLast }: TrackingEventRowProps) => (
	<div className="flex gap-4">
		<div className="flex flex-col items-center">
			<StatusIcon status={event.status} isActive={event.isActive} />
			{!isLast && (
				<div
					className={`w-0.5 flex-1 my-2 ${event.isActive ? 'bg-primary' : 'bg-border'}`}
				/>
			)}
		</div>
		<div className={`flex-1 pb-8 ${isLast ? 'pb-0' : ''}`}>
			<div className="flex items-start justify-between mb-1">
				<div>
					<p
						className={`font-semibold ${event.isActive ? 'text-foreground' : 'text-muted-foreground'}`}
					>
						{event.title}
					</p>
					<p className="text-sm text-muted-foreground">{event.description}</p>
				</div>
				<span className="text-xs text-muted-foreground whitespace-nowrap">
					{event.timestamp}
				</span>
			</div>
			{event.location && (
				<div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
					<MapPin className="size-3.5" />
					<span>{event.location}</span>
				</div>
			)}
		</div>
	</div>
);

const TrackingHeader = ({
	orderId,
	trackingNumber,
	estimatedDelivery,
	labels,
}: Omit<TrackingListProps, 'events'>) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50 mb-6">
		<div>
			<p className="text-xs text-muted-foreground">{labels.trackingNumber}</p>
			<p className="font-mono font-semibold">{trackingNumber}</p>
		</div>
		<Separator orientation="vertical" className="h-10" />
		<div>
			<p className="text-xs text-muted-foreground">
				{labels.estimatedDelivery}
			</p>
			<p className="font-semibold text-primary">{estimatedDelivery}</p>
		</div>
		<Button size="sm" className="gap-1.5">
			Track Package
			<ArrowRight className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const labels = {
		trackingNumber: 'Tracking Number',
		estimatedDelivery: 'Est. Delivery',
	};

	const events: TrackingEvent[] = [
		{
			status: 'delivered',
			title: 'Delivered',
			description: 'Package delivered to front door',
			location: '123 Main St, New York, NY',
			timestamp: 'Jan 30, 2:45 PM',
			isActive: true,
		},
		{
			status: 'in-transit',
			title: 'Out for Delivery',
			description: 'Package is out for delivery',
			location: 'New York, NY',
			timestamp: 'Jan 30, 8:00 AM',
			isActive: true,
		},
		{
			status: 'in-transit',
			title: 'In Transit',
			description: 'Package arrived at local facility',
			location: 'Newark, NJ',
			timestamp: 'Jan 29, 6:30 PM',
			isActive: true,
		},
		{
			status: 'shipped',
			title: 'Shipped',
			description: 'Package picked up by carrier',
			location: 'Los Angeles, CA',
			timestamp: 'Jan 28, 3:15 PM',
			isActive: true,
		},
		{
			status: 'processing',
			title: 'Order Processed',
			description: 'Order has been processed and packed',
			location: 'Warehouse',
			timestamp: 'Jan 28, 10:00 AM',
			isActive: true,
		},
		{
			status: 'pending',
			title: 'Order Placed',
			description: 'Your order has been confirmed',
			timestamp: 'Jan 27, 9:00 PM',
			isActive: true,
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<TrackingHeader
					orderId="ORD-2024-001"
					trackingNumber="1Z999AA10123456784"
					estimatedDelivery="Jan 30, 2024"
					labels={labels}
				/>
				<div className="pl-2">
					{events.map((event, i) => (
						<TrackingEventRow
							key={i}
							event={event}
							isLast={i === events.length - 1}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
