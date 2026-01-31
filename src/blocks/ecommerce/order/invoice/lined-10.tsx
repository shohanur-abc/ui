import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Building,
	Calendar,
	Clock,
	CreditCard,
	MapPin,
	Phone,
	Receipt,
	Sparkles,
	User,
} from 'lucide-react';

interface VenueProps {
	name: string;
	address: string;
	phone: string;
}

interface ClientProps {
	name: string;
	email: string;
	phone: string;
}

interface EventProps {
	type: string;
	date: string;
	time: string;
	duration: string;
	guests: number;
}

interface ServiceProps {
	category: string;
	description: string;
	hours?: number;
	rate?: number;
	amount: number;
}

interface PaymentProps {
	method: string;
	last4: string;
	date: string;
	amount: number;
}

interface TotalsProps {
	services: number;
	gratuity: number;
	tax: number;
	total: number;
	paid: number;
	balance: number;
	currency: string;
}

const InvoiceHeader = ({
	venue,
	invoiceNumber,
}: {
	venue: VenueProps;
	invoiceNumber: string;
}) => (
	<div className="py-6">
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<Sparkles className="size-8 text-primary" />
				<div>
					<h1 className="text-2xl font-bold">{venue.name}</h1>
					<p className="text-sm text-muted-foreground flex items-center gap-1">
						<MapPin className="size-3" />
						{venue.address}
					</p>
					<p className="text-sm text-muted-foreground flex items-center gap-1">
						<Phone className="size-3" />
						{venue.phone}
					</p>
				</div>
			</div>
			<div className="text-right">
				<Badge variant="default">Final Invoice</Badge>
				<p className="font-mono font-bold mt-1">{invoiceNumber}</p>
			</div>
		</div>
	</div>
);

const ClientSection = ({ client }: { client: ClientProps }) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Bill To
		</p>
		<div className="flex items-center gap-3">
			<User className="size-5 text-primary" />
			<div>
				<p className="font-medium">{client.name}</p>
				<p className="text-sm text-muted-foreground">{client.email}</p>
				<p className="text-sm text-muted-foreground">{client.phone}</p>
			</div>
		</div>
	</div>
);

const EventSection = ({ event }: { event: EventProps }) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Event Details
		</p>
		<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 text-sm">
			<div className="flex items-center gap-2">
				<Sparkles className="size-4 text-primary" />
				<div>
					<p className="text-muted-foreground">Event Type</p>
					<p className="font-medium">{event.type}</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Calendar className="size-4 text-primary" />
				<div>
					<p className="text-muted-foreground">Date</p>
					<p className="font-medium">{event.date}</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Clock className="size-4 text-primary" />
				<div>
					<p className="text-muted-foreground">Time</p>
					<p className="font-medium">{event.time}</p>
				</div>
			</div>
			<div>
				<p className="text-muted-foreground">Guests</p>
				<p className="font-medium">{event.guests} people</p>
			</div>
		</div>
	</div>
);

const ServiceRow = ({
	service,
	currency,
}: {
	service: ServiceProps;
	currency: string;
}) => (
	<>
		<div className="py-4">
			<div className="flex items-start justify-between">
				<div>
					<div className="flex items-center gap-2 mb-1">
						<Badge variant="outline" className="text-xs">
							{service.category}
						</Badge>
					</div>
					<p className="font-medium">{service.description}</p>
					{service.hours && service.rate && (
						<p className="text-sm text-muted-foreground">
							{service.hours}h × {currency}
							{service.rate}/hr
						</p>
					)}
				</div>
				<span className="font-bold">
					{currency}
					{service.amount.toFixed(2)}
				</span>
			</div>
		</div>
		<Separator />
	</>
);

const PaymentRow = ({
	payment,
	currency,
}: {
	payment: PaymentProps;
	currency: string;
}) => (
	<>
		<div className="flex items-center justify-between py-3 text-sm">
			<div className="flex items-center gap-2">
				<CreditCard className="size-4 text-muted-foreground" />
				<span>
					{payment.method} ••••{payment.last4}
				</span>
				<span className="text-muted-foreground">({payment.date})</span>
			</div>
			<span className="text-green-600">
				-{currency}
				{payment.amount.toFixed(2)}
			</span>
		</div>
		<Separator />
	</>
);

const TotalsSection = ({
	services,
	gratuity,
	tax,
	total,
	paid,
	balance,
	currency,
}: TotalsProps) => (
	<div className="py-4 space-y-3">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Services Total</span>
			<span>
				{currency}
				{services.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Gratuity (20%)</span>
			<span>
				{currency}
				{gratuity.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Tax</span>
			<span>
				{currency}
				{tax.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between font-bold">
			<span>Grand Total</span>
			<span>
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm text-green-600">
			<span>Payments</span>
			<span>
				-{currency}
				{paid.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-xl font-bold pt-2">
			<span>Balance Due</span>
			<span className={balance === 0 ? 'text-green-600' : 'text-primary'}>
				{balance === 0 ? 'PAID IN FULL' : `${currency}${balance.toFixed(2)}`}
			</span>
		</div>
	</div>
);

export default function Main() {
	const venue: VenueProps = {
		name: 'The Grand Ballroom',
		address: '500 Celebration Way, Chicago, IL 60601',
		phone: '(312) 555-9000',
	};

	const client: ClientProps = {
		name: 'Robert & Jennifer Williams',
		email: 'williams.event@email.com',
		phone: '(555) 456-7890',
	};

	const event: EventProps = {
		type: 'Wedding Reception',
		date: 'Saturday, June 15, 2024',
		time: '5:00 PM - 11:00 PM',
		duration: '6 hours',
		guests: 180,
	};

	const services: ServiceProps[] = [
		{
			category: 'Venue',
			description: 'Grand Ballroom Rental (6 hours)',
			amount: 8500,
		},
		{
			category: 'Catering',
			description: 'Plated Dinner Service (180 guests)',
			amount: 16200,
		},
		{
			category: 'Bar',
			description: 'Premium Open Bar (6 hours)',
			amount: 5400,
		},
		{
			category: 'Rentals',
			description: 'Tables, chairs, linens, centerpieces',
			amount: 2800,
		},
		{
			category: 'A/V',
			description: 'Sound system, microphones, lighting',
			amount: 1500,
		},
		{
			category: 'Staff',
			description: 'Event coordination, servers, bartenders',
			hours: 6,
			rate: 450,
			amount: 2700,
		},
	];

	const payments: PaymentProps[] = [
		{ method: 'Visa', last4: '4242', date: 'Dec 15, 2023', amount: 10000 },
		{ method: 'Visa', last4: '4242', date: 'Mar 15, 2024', amount: 15000 },
		{ method: 'Visa', last4: '4242', date: 'Jun 1, 2024', amount: 15850.8 },
	];

	const totals: TotalsProps = {
		services: 37100,
		gratuity: 7420,
		tax: 3330.8,
		total: 47850.8,
		paid: 40850.8,
		balance: 7000,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<InvoiceHeader venue={venue} invoiceNumber="EVT-2024-0156" />
				<Separator />
				<div className="grid @md:grid-cols-2 gap-4">
					<ClientSection client={client} />
					<EventSection event={event} />
				</div>
				<Separator />
				<div className="py-4">
					<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
						Services & Charges
					</p>
				</div>
				{services.map((service, index) => (
					<ServiceRow key={index} service={service} currency="$" />
				))}
				<div className="py-4">
					<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
						Payment History
					</p>
				</div>
				{payments.map((payment, index) => (
					<PaymentRow key={index} payment={payment} currency="$" />
				))}
				<TotalsSection {...totals} />
				<Separator className="my-4" />
				<div className="flex items-center justify-between">
					<p className="text-sm text-muted-foreground">
						Thank you for celebrating with us!
					</p>
					<div className="flex gap-4">
						<Button variant="outline">Download Invoice</Button>
						<Button>Pay Balance</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
