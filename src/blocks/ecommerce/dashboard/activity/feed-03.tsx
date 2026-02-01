import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ShoppingBag,
	Package,
	CreditCard,
	Truck,
	RotateCcw,
	XCircle,
	CheckCircle,
	Clock,
	ArrowRight,
	type LucideIcon,
} from 'lucide-react';

interface OrderEvent {
	id: string;
	orderId: string;
	type:
		| 'placed'
		| 'paid'
		| 'processing'
		| 'shipped'
		| 'delivered'
		| 'returned'
		| 'cancelled';
	customer: {
		name: string;
		avatar?: string;
		initials: string;
	};
	items: number;
	total: string;
	timestamp: string;
}

interface OrderFeedProps {
	title: string;
	events: OrderEvent[];
	stats: {
		today: number;
		pending: number;
		shipped: number;
	};
}

const EventTypeConfig: Record<
	OrderEvent['type'],
	{ icon: LucideIcon; label: string; color: string; bgColor: string }
> = {
	placed: {
		icon: ShoppingBag,
		label: 'New Order',
		color: 'text-blue-400',
		bgColor: 'bg-blue-500/20',
	},
	paid: {
		icon: CreditCard,
		label: 'Payment Received',
		color: 'text-emerald-400',
		bgColor: 'bg-emerald-500/20',
	},
	processing: {
		icon: Package,
		label: 'Processing',
		color: 'text-amber-400',
		bgColor: 'bg-amber-500/20',
	},
	shipped: {
		icon: Truck,
		label: 'Shipped',
		color: 'text-purple-400',
		bgColor: 'bg-purple-500/20',
	},
	delivered: {
		icon: CheckCircle,
		label: 'Delivered',
		color: 'text-emerald-400',
		bgColor: 'bg-emerald-500/20',
	},
	returned: {
		icon: RotateCcw,
		label: 'Returned',
		color: 'text-amber-400',
		bgColor: 'bg-amber-500/20',
	},
	cancelled: {
		icon: XCircle,
		label: 'Cancelled',
		color: 'text-rose-400',
		bgColor: 'bg-rose-500/20',
	},
};

const EventIcon = ({ type }: { type: OrderEvent['type'] }) => {
	const config = EventTypeConfig[type];
	const Icon = config.icon;

	return (
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${config.bgColor}`}
		>
			<Icon className={`size-5 ${config.color}`} />
		</div>
	);
};

const EventCard = ({ event }: { event: OrderEvent }) => {
	const config = EventTypeConfig[event.type];

	return (
		<div className="group flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
			<EventIcon type={event.type} />
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-1">
					<Badge
						variant="outline"
						className={`${config.bgColor} ${config.color} border-0`}
					>
						{config.label}
					</Badge>
					<span className="text-xs font-mono text-muted-foreground">
						{event.orderId}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<Avatar className="size-5">
						<AvatarImage
							src={event.customer.avatar}
							alt={event.customer.name}
						/>
						<AvatarFallback className="text-[10px] bg-secondary">
							{event.customer.initials}
						</AvatarFallback>
					</Avatar>
					<span className="text-sm text-foreground truncate">
						{event.customer.name}
					</span>
					<span className="text-xs text-muted-foreground">
						• {event.items} items
					</span>
				</div>
			</div>
			<div className="flex flex-col items-end gap-1">
				<span className="font-semibold text-foreground">{event.total}</span>
				<span className="text-xs text-muted-foreground">{event.timestamp}</span>
			</div>
			<Button
				variant="ghost"
				size="icon-sm"
				className="opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<ArrowRight className="size-4" />
			</Button>
		</div>
	);
};

const StatsBar = ({ stats }: { stats: OrderFeedProps['stats'] }) => (
	<div className="grid grid-cols-3 gap-4">
		<div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
			<ShoppingBag className="size-5 text-blue-400" />
			<span className="text-xl font-bold text-blue-400">{stats.today}</span>
			<span className="text-xs text-muted-foreground">Today</span>
		</div>
		<div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
			<Clock className="size-5 text-amber-400" />
			<span className="text-xl font-bold text-amber-400">{stats.pending}</span>
			<span className="text-xs text-muted-foreground">Pending</span>
		</div>
		<div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
			<Truck className="size-5 text-purple-400" />
			<span className="text-xl font-bold text-purple-400">{stats.shipped}</span>
			<span className="text-xs text-muted-foreground">Shipped</span>
		</div>
	</div>
);

const OrderFeed = ({ title, events, stats }: OrderFeedProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			<Button variant="outline" size="sm">
				View All Orders
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-6">
			<StatsBar stats={stats} />
			<div className="space-y-3">
				{events.map((event) => (
					<EventCard key={event.id} event={event} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const orderEvents: OrderEvent[] = [
		{
			id: '1',
			orderId: '#ORD-2024-0892',
			type: 'placed',
			customer: { name: 'Emma Thompson', initials: 'ET' },
			items: 3,
			total: '$347.00',
			timestamp: '2 min ago',
		},
		{
			id: '2',
			orderId: '#ORD-2024-0891',
			type: 'paid',
			customer: { name: 'James Wilson', initials: 'JW' },
			items: 1,
			total: '$149.00',
			timestamp: '8 min ago',
		},
		{
			id: '3',
			orderId: '#ORD-2024-0890',
			type: 'shipped',
			customer: { name: 'Sarah Chen', initials: 'SC' },
			items: 5,
			total: '$892.00',
			timestamp: '15 min ago',
		},
		{
			id: '4',
			orderId: '#ORD-2024-0889',
			type: 'processing',
			customer: { name: 'Michael Brown', initials: 'MB' },
			items: 2,
			total: '$234.00',
			timestamp: '32 min ago',
		},
		{
			id: '5',
			orderId: '#ORD-2024-0888',
			type: 'delivered',
			customer: { name: 'Lisa Anderson', initials: 'LA' },
			items: 4,
			total: '$567.00',
			timestamp: '1 hour ago',
		},
		{
			id: '6',
			orderId: '#ORD-2024-0887',
			type: 'cancelled',
			customer: { name: 'David Kim', initials: 'DK' },
			items: 1,
			total: '$89.00',
			timestamp: '2 hours ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<OrderFeed
					title="Order Activity"
					events={orderEvents}
					stats={{ today: 47, pending: 12, shipped: 23 }}
				/>
			</div>
		</section>
	);
}
