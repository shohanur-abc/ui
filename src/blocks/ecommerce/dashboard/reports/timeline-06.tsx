'use client';

import {
	Clock,
	Package,
	ShoppingCart,
	CreditCard,
	Truck,
	CheckCircle,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type EventType = 'order' | 'payment' | 'shipping' | 'delivery' | 'return';

type TimelineEvent = {
	id: string;
	type: EventType;
	title: string;
	description: string;
	time: string;
	orderId: string;
	customer: {
		name: string;
		avatar: string;
		initials: string;
	};
};

type EventCardProps = {
	event: TimelineEvent;
};

const getEventIcon = (type: EventType) => {
	const icons = {
		order: ShoppingCart,
		payment: CreditCard,
		shipping: Truck,
		delivery: CheckCircle,
		return: Package,
	};
	return icons[type];
};

const getEventColor = (type: EventType) => {
	const colors = {
		order: 'bg-blue-500/10 text-blue-500',
		payment: 'bg-emerald-500/10 text-emerald-500',
		shipping: 'bg-amber-500/10 text-amber-500',
		delivery: 'bg-primary/10 text-primary',
		return: 'bg-rose-500/10 text-rose-500',
	};
	return colors[type];
};

const EventCard = ({ event }: EventCardProps) => {
	const Icon = getEventIcon(event.type);
	const colorClass = getEventColor(event.type);

	return (
		<div className="relative flex gap-4 pb-8 last:pb-0">
			<div className="absolute left-5 top-12 h-[calc(100%-2rem)] w-px bg-border/50 last:hidden" />
			<div
				className={`flex size-10 shrink-0 items-center justify-center rounded-full ${colorClass}`}
			>
				<Icon className="size-5" />
			</div>
			<div className="flex-1 space-y-2">
				<div className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
					<div>
						<p className="font-medium">{event.title}</p>
						<p className="text-sm text-muted-foreground">{event.description}</p>
					</div>
					<Badge variant="outline" className="w-fit">
						{event.orderId}
					</Badge>
				</div>
				<div className="flex items-center gap-3 text-sm text-muted-foreground">
					<div className="flex items-center gap-2">
						<Avatar className="size-6">
							<AvatarImage
								src={event.customer.avatar}
								alt={event.customer.name}
							/>
							<AvatarFallback className="text-xs">
								{event.customer.initials}
							</AvatarFallback>
						</Avatar>
						<span>{event.customer.name}</span>
					</div>
					<span>•</span>
					<span>{event.time}</span>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const events: TimelineEvent[] = [
		{
			id: '1',
			type: 'order',
			title: 'New Order Placed',
			description: 'Order received for 3 items worth $285.00',
			time: '2 minutes ago',
			orderId: '#ORD-9847',
			customer: { name: 'Alex Johnson', avatar: '', initials: 'AJ' },
		},
		{
			id: '2',
			type: 'payment',
			title: 'Payment Confirmed',
			description: 'Payment of $542.50 processed via Stripe',
			time: '15 minutes ago',
			orderId: '#ORD-9845',
			customer: { name: 'Sarah Chen', avatar: '', initials: 'SC' },
		},
		{
			id: '3',
			type: 'shipping',
			title: 'Order Shipped',
			description: 'Package handed to FedEx for delivery',
			time: '32 minutes ago',
			orderId: '#ORD-9832',
			customer: { name: 'Mike Brown', avatar: '', initials: 'MB' },
		},
		{
			id: '4',
			type: 'delivery',
			title: 'Order Delivered',
			description: 'Package successfully delivered',
			time: '1 hour ago',
			orderId: '#ORD-9820',
			customer: { name: 'Emily Davis', avatar: '', initials: 'ED' },
		},
		{
			id: '5',
			type: 'return',
			title: 'Return Initiated',
			description: 'Customer requested return for 1 item',
			time: '2 hours ago',
			orderId: '#ORD-9815',
			customer: { name: 'James Wilson', avatar: '', initials: 'JW' },
		},
		{
			id: '6',
			type: 'order',
			title: 'New Order Placed',
			description: 'Order received for 5 items worth $1,245.00',
			time: '3 hours ago',
			orderId: '#ORD-9812',
			customer: { name: 'Lisa Park', avatar: '', initials: 'LP' },
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Clock className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Order Event Timeline
								</CardTitle>
								<CardDescription>
									Real-time order events and activity
								</CardDescription>
							</div>
						</div>
						<Badge className="bg-emerald-500/20 text-emerald-500">
							<span className="mr-2 inline-flex size-2 animate-pulse rounded-full bg-emerald-500" />
							Live Feed
						</Badge>
					</CardHeader>
					<CardContent>
						<div className="space-y-0">
							{events.map((e) => (
								<EventCard key={e.id} event={e} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
