import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Package, DollarSign, RotateCcw, Star, AlertCircle, CheckCircle, Truck } from 'lucide-react';

interface CustomerHistoryEvent {
	id: string;
	type: 'order' | 'return' | 'review' | 'support';
	title: string;
	description: string;
	date: string;
	amount?: string;
	rating?: number;
	orderId?: string;
	status?: 'positive' | 'neutral' | 'negative';
}

interface CustomerHistoryTimelineProps {
	customerName: string;
	events: CustomerHistoryEvent[];
}

interface HistoryEventProps {
	event: CustomerHistoryEvent;
	isLast: boolean;
}

const EventTypeConfig: Record<CustomerHistoryEvent['type'], { icon: typeof Package; color: string; bg: string }> = {
	order: { icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
	return: { icon: RotateCcw, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
	review: { icon: Star, color: 'text-accent', bg: 'bg-accent/10' },
	support: { icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
};

const HistoryEvent = ({ event, isLast }: HistoryEventProps) => {
	const { icon: Icon, color, bg } = EventTypeConfig[event.type];
	return (
		<div className="flex gap-4">
			<div className="flex flex-col items-center">
				<div className={`size-10 rounded-full flex items-center justify-center ${bg}`}>
					<Icon className={`size-5 ${color}`} />
				</div>
				{!isLast && <div className="w-0.5 flex-1 bg-border my-2" />}
			</div>

			<div className={`flex-1 ${isLast ? '' : 'pb-6'}`}>
				<div className="p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-primary/30 transition-colors">
					<div className="flex items-start justify-between mb-2">
						<div>
							<p className="font-semibold">{event.title}</p>
							{event.orderId && (
								<p className="text-xs text-muted-foreground font-mono">{event.orderId}</p>
							)}
						</div>
						<span className="text-xs text-muted-foreground">{event.date}</span>
					</div>

					<p className="text-sm text-muted-foreground mb-3">{event.description}</p>

					<div className="flex items-center gap-3">
						{event.amount && (
							<Badge variant="outline" className="gap-1">
								<DollarSign className="size-3" />
								{event.amount}
							</Badge>
						)}
						{event.rating && (
							<div className="flex items-center gap-1">
								{[...Array(5)].map((_, i) => (
									<Star key={i} className={`size-3 ${i < event.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
								))}
							</div>
						)}
						{event.status && (
							<Badge variant="outline" className={
								event.status === 'positive' ? 'text-accent border-accent/30' :
								event.status === 'negative' ? 'text-destructive border-destructive/30' : ''
							}>
								{event.status === 'positive' ? <CheckCircle className="size-3 mr-1" /> : null}
								{event.status}
							</Badge>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const events: CustomerHistoryEvent[] = [
		{ id: '1', type: 'order', title: 'Order Completed', orderId: '#ORD-2024-156', description: 'Wireless headphones and accessories delivered', date: 'Jan 30, 2024', amount: '$289.00', status: 'positive' },
		{ id: '2', type: 'review', title: 'Product Review', orderId: '#ORD-2024-142', description: 'Left a 5-star review for Bluetooth Speaker', date: 'Jan 25, 2024', rating: 5 },
		{ id: '3', type: 'return', title: 'Return Processed', orderId: '#ORD-2024-138', description: 'Returned USB-C Hub - wrong product received', date: 'Jan 20, 2024', amount: '$49.99', status: 'neutral' },
		{ id: '4', type: 'order', title: 'Order Completed', orderId: '#ORD-2024-125', description: '3 items delivered successfully', date: 'Jan 15, 2024', amount: '$156.00', status: 'positive' },
		{ id: '5', type: 'support', title: 'Support Ticket', description: 'Inquiry about product warranty', date: 'Jan 10, 2024', status: 'positive' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg">Customer History</CardTitle>
					</CardHeader>
					<CardContent>
						{events.map((event, i) => (
							<HistoryEvent key={event.id} event={event} isLast={i === events.length - 1} />
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
