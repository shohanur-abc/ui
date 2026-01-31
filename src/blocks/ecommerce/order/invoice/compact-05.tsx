import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Ticket } from 'lucide-react';

interface EventInfoProps {
	eventName: string;
	eventDate: string;
	eventTime: string;
	venue: string;
}

interface TicketItemProps {
	type: string;
	quantity: number;
	price: number;
}

interface OrderTotalsProps {
	subtotal: number;
	serviceFee: number;
	total: number;
	currency: string;
}

const EventHeader = ({
	eventName,
	eventDate,
	eventTime,
	venue,
}: EventInfoProps) => (
	<div className="space-y-2">
		<div className="flex items-start gap-3">
			<div className="size-12 rounded bg-primary/10 flex items-center justify-center">
				<Ticket className="size-6 text-primary" />
			</div>
			<div className="flex-1 min-w-0">
				<h2 className="font-bold text-sm truncate">{eventName}</h2>
				<div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-1">
					<Calendar className="size-3" />
					<span>
						{eventDate} • {eventTime}
					</span>
				</div>
				<div className="flex items-center gap-2 text-[10px] text-muted-foreground">
					<MapPin className="size-3" />
					<span className="truncate">{venue}</span>
				</div>
			</div>
		</div>
	</div>
);

const TicketItems = ({
	tickets,
	currency,
}: {
	tickets: TicketItemProps[];
	currency: string;
}) => (
	<div className="space-y-2">
		{tickets.map((ticket, index) => (
			<div key={index} className="flex items-center justify-between text-xs">
				<div className="flex items-center gap-2">
					<Badge variant="outline" className="text-[10px]">
						{ticket.quantity}x
					</Badge>
					<span>{ticket.type}</span>
				</div>
				<span className="font-medium">
					{currency}
					{(ticket.quantity * ticket.price).toFixed(2)}
				</span>
			</div>
		))}
	</div>
);

const OrderTotals = ({
	subtotal,
	serviceFee,
	total,
	currency,
}: OrderTotalsProps) => (
	<div className="text-xs space-y-1">
		<div className="flex justify-between text-muted-foreground">
			<span>Subtotal</span>
			<span>
				{currency}
				{subtotal.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between text-muted-foreground">
			<span>Service Fee</span>
			<span>
				{currency}
				{serviceFee.toFixed(2)}
			</span>
		</div>
		<Separator className="my-2" />
		<div className="flex justify-between font-bold text-sm">
			<span>Total</span>
			<span>
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const event: EventInfoProps = {
		eventName: 'Summer Music Festival 2024',
		eventDate: 'Sat, Jul 20, 2024',
		eventTime: '4:00 PM',
		venue: 'Central Park Amphitheater',
	};

	const tickets: TicketItemProps[] = [
		{ type: 'General Admission', quantity: 2, price: 75.0 },
		{ type: 'VIP Upgrade', quantity: 1, price: 150.0 },
	];

	const totals: OrderTotalsProps = {
		subtotal: 300.0,
		serviceFee: 28.5,
		total: 328.5,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-6">
				<div className="rounded-lg border p-4 space-y-4">
					<div className="flex items-center justify-between">
						<span className="text-[10px] text-muted-foreground font-mono">
							TKT-2024-78945
						</span>
						<Badge variant="default" className="text-[10px]">
							Confirmed
						</Badge>
					</div>
					<EventHeader {...event} />
					<Separator />
					<TicketItems tickets={tickets} currency="$" />
					<Separator />
					<OrderTotals {...totals} />
					<Button size="sm" className="w-full text-xs">
						View Tickets
					</Button>
				</div>
			</div>
		</section>
	);
}
