import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Package, Truck, CheckCircle2, CreditCard, User, MapPin, FileText } from 'lucide-react';

interface TimelineEvent {
	id: string;
	title: string;
	description: string;
	timestamp: string;
	icon: React.ComponentType<{ className?: string }>;
	iconColor: string;
	iconBgColor: string;
}

interface OrderTimelineProps {
	orderId: string;
	events: TimelineEvent[];
}

interface TimelineItemProps {
	event: TimelineEvent;
	isLast: boolean;
}

const TimelineItem = ({ event, isLast }: TimelineItemProps) => (
	<div className="flex gap-4">
		<div className="flex flex-col items-center">
			<div className={`size-10 rounded-full flex items-center justify-center ${event.iconBgColor}`}>
				<event.icon className={`size-5 ${event.iconColor}`} />
			</div>
			{!isLast && <div className="w-0.5 flex-1 bg-border my-2" />}
		</div>
		<div className={`flex-1 ${isLast ? '' : 'pb-8'}`}>
			<div className="flex items-start justify-between mb-1">
				<p className="font-semibold">{event.title}</p>
				<span className="text-xs text-muted-foreground whitespace-nowrap">{event.timestamp}</span>
			</div>
			<p className="text-sm text-muted-foreground">{event.description}</p>
		</div>
	</div>
);

const OrderTimeline = ({ orderId, events }: OrderTimelineProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4">
			<div className="flex items-center justify-between">
				<CardTitle className="text-lg">Order Timeline</CardTitle>
				<Badge variant="outline" className="font-mono">{orderId}</Badge>
			</div>
		</CardHeader>
		<CardContent>
			{events.map((event, i) => (
				<TimelineItem key={event.id} event={event} isLast={i === events.length - 1} />
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const events: TimelineEvent[] = [
		{ id: '1', title: 'Order Delivered', description: 'Package delivered to front door', timestamp: 'Jan 30, 2:45 PM', icon: CheckCircle2, iconColor: 'text-accent', iconBgColor: 'bg-accent/10' },
		{ id: '2', title: 'Out for Delivery', description: 'Package is out for delivery with carrier', timestamp: 'Jan 30, 8:00 AM', icon: Truck, iconColor: 'text-primary', iconBgColor: 'bg-primary/10' },
		{ id: '3', title: 'Arrived at Local Facility', description: 'Package arrived at New York distribution center', timestamp: 'Jan 29, 6:30 PM', icon: MapPin, iconColor: 'text-blue-500', iconBgColor: 'bg-blue-500/10' },
		{ id: '4', title: 'In Transit', description: 'Package in transit to destination', timestamp: 'Jan 28, 10:00 AM', icon: Truck, iconColor: 'text-indigo-500', iconBgColor: 'bg-indigo-500/10' },
		{ id: '5', title: 'Shipped', description: 'Package picked up by UPS', timestamp: 'Jan 27, 3:15 PM', icon: Package, iconColor: 'text-purple-500', iconBgColor: 'bg-purple-500/10' },
		{ id: '6', title: 'Order Packed', description: 'Order has been packed and ready for pickup', timestamp: 'Jan 27, 11:00 AM', icon: Package, iconColor: 'text-orange-500', iconBgColor: 'bg-orange-500/10' },
		{ id: '7', title: 'Payment Confirmed', description: 'Payment of $245.00 processed successfully', timestamp: 'Jan 26, 9:05 PM', icon: CreditCard, iconColor: 'text-green-500', iconBgColor: 'bg-green-500/10' },
		{ id: '8', title: 'Order Placed', description: 'Order placed by John Smith', timestamp: 'Jan 26, 9:00 PM', icon: FileText, iconColor: 'text-muted-foreground', iconBgColor: 'bg-muted' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<OrderTimeline orderId="ORD-2024-001" events={events} />
			</div>
		</section>
	);
}
