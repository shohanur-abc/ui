import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Calendar,
	Music,
	MapPin,
	Star,
	Ticket,
	User,
	Clock,
} from 'lucide-react';

interface EventProps {
	name: string;
	artist: string;
	venue: string;
	address: string;
	date: string;
	time: string;
	doors: string;
}

interface TicketProps {
	section: string;
	row: string;
	seat: string;
	type: string;
	price: number;
}

interface TotalsProps {
	tickets: number;
	fees: number;
	tax: number;
	total: number;
	currency: string;
}

const EventHeader = ({
	name,
	artist,
	venue,
	address,
	date,
	time,
	doors,
}: EventProps) => (
	<div className="border-8 border-double border-primary">
		<div className="bg-primary text-primary-foreground p-4">
			<div className="flex items-center gap-3">
				<Music className="size-8" />
				<div>
					<p className="text-xs uppercase tracking-widest opacity-80">
						Live Concert
					</p>
					<h1 className="text-2xl font-bold">{name}</h1>
				</div>
			</div>
		</div>
		<div className="p-4 space-y-3">
			<div className="flex items-center gap-2">
				<Star className="size-4 text-primary" />
				<span className="font-bold">{artist}</span>
			</div>
			<div className="flex items-center gap-2">
				<MapPin className="size-4 text-muted-foreground" />
				<div>
					<p className="font-medium">{venue}</p>
					<p className="text-sm text-muted-foreground">{address}</p>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4 pt-2 border-t-2 border-dashed border-foreground/30">
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-primary" />
					<div>
						<p className="text-xs text-muted-foreground">Date</p>
						<p className="font-medium text-sm">{date}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Clock className="size-4 text-primary" />
					<div>
						<p className="text-xs text-muted-foreground">Show Time</p>
						<p className="font-medium text-sm">{time}</p>
					</div>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Doors Open</p>
					<p className="font-medium text-sm">{doors}</p>
				</div>
			</div>
		</div>
	</div>
);

const TicketCard = ({
	ticket,
	index,
	currency,
}: {
	ticket: TicketProps;
	index: number;
	currency: string;
}) => (
	<div className="border-4 border-foreground relative">
		<div className="absolute -top-3 right-4 bg-background px-2">
			<Badge variant="default" className="rounded-none">
				Ticket {index + 1}
			</Badge>
		</div>
		<div className="p-4 pt-6">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-3">
					<div className="size-12 border-2 border-primary flex items-center justify-center">
						<Ticket className="size-6 text-primary" />
					</div>
					<Badge variant="outline" className="rounded-none">
						{ticket.type}
					</Badge>
				</div>
				<span className="text-xl font-bold">
					{currency}
					{ticket.price.toFixed(2)}
				</span>
			</div>
			<div className="grid grid-cols-3 gap-4 text-center border-t-2 border-foreground/30 pt-3">
				<div>
					<p className="text-xs text-muted-foreground uppercase">Section</p>
					<p className="font-bold text-lg">{ticket.section}</p>
				</div>
				<div className="border-x-2 border-foreground/30">
					<p className="text-xs text-muted-foreground uppercase">Row</p>
					<p className="font-bold text-lg">{ticket.row}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground uppercase">Seat</p>
					<p className="font-bold text-lg">{ticket.seat}</p>
				</div>
			</div>
		</div>
		<div className="border-t-2 border-dashed border-foreground" />
		<div className="p-2 bg-muted/50">
			<p className="text-[10px] text-muted-foreground text-center font-mono">
				BARCODE: EVT2024-TICKET-{index + 1}
			</p>
		</div>
	</div>
);

const OrderInfo = ({
	orderNumber,
	orderDate,
	buyer,
}: {
	orderNumber: string;
	orderDate: string;
	buyer: { name: string; email: string };
}) => (
	<div className="border-2 border-foreground p-4">
		<div className="flex items-center justify-between mb-3 border-b-2 border-foreground pb-2">
			<p className="text-xs font-bold uppercase tracking-widest">
				Order Details
			</p>
			<span className="font-mono text-sm">{orderNumber}</span>
		</div>
		<div className="grid grid-cols-2 gap-4 text-sm">
			<div>
				<p className="text-muted-foreground">Order Date</p>
				<p className="font-medium">{orderDate}</p>
			</div>
			<div>
				<p className="text-muted-foreground flex items-center gap-1">
					<User className="size-3" />
					Buyer
				</p>
				<p className="font-medium">{buyer.name}</p>
				<p className="text-xs text-muted-foreground">{buyer.email}</p>
			</div>
		</div>
	</div>
);

const TotalsBox = ({ tickets, fees, tax, total, currency }: TotalsProps) => (
	<div className="border-4 border-foreground">
		<div className="bg-foreground text-background p-3">
			<p className="text-xs font-bold uppercase tracking-widest">Order Total</p>
		</div>
		<div className="p-4 space-y-2">
			<div className="flex justify-between text-sm">
				<span>Tickets (2)</span>
				<span>
					{currency}
					{tickets.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span>Service Fees</span>
				<span>
					{currency}
					{fees.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span>Tax</span>
				<span>
					{currency}
					{tax.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between text-xl font-bold">
				<span>Total Paid</span>
				<span className="text-primary">
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

export default function Main() {
	const event: EventProps = {
		name: 'World Tour 2024',
		artist: 'The Electric Dreams',
		venue: 'Madison Square Garden',
		address: '4 Pennsylvania Plaza, New York, NY 10001',
		date: 'Saturday, May 18, 2024',
		time: '8:00 PM',
		doors: '6:30 PM',
	};

	const tickets: TicketProps[] = [
		{ section: 'A', row: '12', seat: '15', type: 'VIP Floor', price: 249.0 },
		{ section: 'A', row: '12', seat: '16', type: 'VIP Floor', price: 249.0 },
	];

	const totals: TotalsProps = {
		tickets: 498.0,
		fees: 74.7,
		tax: 50.24,
		total: 622.94,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<EventHeader {...event} />
				<div className="grid @md:grid-cols-2 gap-4 mt-4">
					{tickets.map((ticket, index) => (
						<TicketCard
							key={index}
							ticket={ticket}
							index={index}
							currency="$"
						/>
					))}
				</div>
				<div className="grid @md:grid-cols-2 gap-4 mt-4">
					<OrderInfo
						orderNumber="ORD-2024-567890"
						orderDate="February 10, 2024"
						buyer={{ name: 'John Smith', email: 'john.s@email.com' }}
					/>
					<TotalsBox {...totals} />
				</div>
				<div className="mt-4 border-2 border-dashed border-foreground/50 p-4 text-center">
					<p className="text-sm text-muted-foreground">
						Present this confirmation at the venue. Mobile tickets are accepted.
					</p>
				</div>
			</div>
		</section>
	);
}
