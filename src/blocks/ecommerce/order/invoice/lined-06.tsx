import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, Plane, User, Luggage } from 'lucide-react';

interface TravelerProps {
	name: string;
	email: string;
	phone: string;
	loyaltyNumber?: string;
}

interface FlightProps {
	airline: string;
	flightNumber: string;
	departure: { city: string; airport: string; date: string; time: string };
	arrival: { city: string; airport: string; date: string; time: string };
	duration: string;
	class: string;
	seat: string;
}

interface FareProps {
	description: string;
	amount: number;
}

interface TotalsProps {
	baseFare: number;
	taxes: number;
	fees: number;
	total: number;
	currency: string;
}

const ItineraryHeader = ({
	confirmationCode,
	bookingDate,
}: {
	confirmationCode: string;
	bookingDate: string;
}) => (
	<div className="py-6">
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<Plane className="size-8 text-primary" />
				<div>
					<h1 className="text-2xl font-bold">Flight Itinerary</h1>
					<p className="text-sm text-muted-foreground">E-Ticket Receipt</p>
				</div>
			</div>
			<div className="text-right">
				<p className="text-xs text-muted-foreground">Confirmation Code</p>
				<p className="font-mono text-2xl font-bold text-primary">
					{confirmationCode}
				</p>
				<p className="text-xs text-muted-foreground mt-1">
					Booked: {bookingDate}
				</p>
			</div>
		</div>
	</div>
);

const TravelerSection = ({ traveler }: { traveler: TravelerProps }) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Traveler Information
		</p>
		<div className="flex items-center gap-4">
			<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
				<User className="size-6 text-primary" />
			</div>
			<div className="flex-1">
				<p className="font-bold">{traveler.name}</p>
				<p className="text-sm text-muted-foreground">
					{traveler.email} • {traveler.phone}
				</p>
			</div>
			{traveler.loyaltyNumber && (
				<Badge variant="outline">
					Frequent Flyer: {traveler.loyaltyNumber}
				</Badge>
			)}
		</div>
	</div>
);

const FlightSection = ({
	flight,
	leg,
}: {
	flight: FlightProps;
	leg: string;
}) => (
	<>
		<div className="py-4">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<Badge variant="default">{leg}</Badge>
					<span className="font-medium">
						{flight.airline} {flight.flightNumber}
					</span>
				</div>
				<div className="flex items-center gap-4 text-sm">
					<span className="flex items-center gap-1">
						<Clock className="size-3 text-muted-foreground" />
						{flight.duration}
					</span>
					<Badge variant="outline">{flight.class}</Badge>
				</div>
			</div>
			<div className="grid @md:grid-cols-2 gap-8">
				<div>
					<p className="text-xs text-muted-foreground uppercase">Departure</p>
					<div className="flex items-baseline gap-3 mt-1">
						<p className="text-3xl font-bold">{flight.departure.time}</p>
						<div>
							<p className="font-medium">{flight.departure.city}</p>
							<p className="text-sm text-muted-foreground">
								{flight.departure.airport}
							</p>
						</div>
					</div>
					<p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
						<Calendar className="size-3" />
						{flight.departure.date}
					</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground uppercase">Arrival</p>
					<div className="flex items-baseline gap-3 mt-1">
						<p className="text-3xl font-bold">{flight.arrival.time}</p>
						<div>
							<p className="font-medium">{flight.arrival.city}</p>
							<p className="text-sm text-muted-foreground">
								{flight.arrival.airport}
							</p>
						</div>
					</div>
					<p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
						<Calendar className="size-3" />
						{flight.arrival.date}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-4 mt-4 text-sm">
				<span className="flex items-center gap-1">
					<MapPin className="size-3 text-muted-foreground" />
					Seat: <span className="font-medium">{flight.seat}</span>
				</span>
				<span className="flex items-center gap-1">
					<Luggage className="size-3 text-muted-foreground" />
					Carry-on + 1 Checked Bag
				</span>
			</div>
		</div>
		<Separator />
	</>
);

const FareRow = ({ fare, currency }: { fare: FareProps; currency: string }) => (
	<>
		<div className="flex justify-between py-3 text-sm">
			<span className="text-muted-foreground">{fare.description}</span>
			<span>
				{currency}
				{fare.amount.toFixed(2)}
			</span>
		</div>
		<Separator />
	</>
);

const TotalsSection = ({
	baseFare,
	taxes,
	fees,
	total,
	currency,
}: TotalsProps) => (
	<div className="py-4 space-y-3">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Base Fare</span>
			<span>
				{currency}
				{baseFare.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Taxes & Surcharges</span>
			<span>
				{currency}
				{taxes.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Fees</span>
			<span>
				{currency}
				{fees.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-xl font-bold pt-2">
			<span>Total Paid</span>
			<span className="text-primary">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const traveler: TravelerProps = {
		name: 'John Anderson',
		email: 'j.anderson@email.com',
		phone: '(555) 123-4567',
		loyaltyNumber: 'SKY-789456',
	};

	const outboundFlight: FlightProps = {
		airline: 'Delta',
		flightNumber: 'DL 1234',
		departure: {
			city: 'New York',
			airport: 'JFK Terminal 4',
			date: 'March 15, 2024',
			time: '08:30',
		},
		arrival: {
			city: 'Los Angeles',
			airport: 'LAX Terminal 2',
			date: 'March 15, 2024',
			time: '11:45',
		},
		duration: '5h 15m',
		class: 'Economy Plus',
		seat: '14A',
	};

	const returnFlight: FlightProps = {
		airline: 'Delta',
		flightNumber: 'DL 5678',
		departure: {
			city: 'Los Angeles',
			airport: 'LAX Terminal 2',
			date: 'March 22, 2024',
			time: '19:00',
		},
		arrival: {
			city: 'New York',
			airport: 'JFK Terminal 4',
			date: 'March 23, 2024',
			time: '05:15',
		},
		duration: '5h 15m',
		class: 'Economy Plus',
		seat: '14A',
	};

	const totals: TotalsProps = {
		baseFare: 498.0,
		taxes: 72.5,
		fees: 35.0,
		total: 605.5,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<ItineraryHeader
					confirmationCode="ABC123"
					bookingDate="February 10, 2024"
				/>
				<Separator />
				<TravelerSection traveler={traveler} />
				<Separator />
				<div className="py-4">
					<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
						Flight Details
					</p>
				</div>
				<FlightSection flight={outboundFlight} leg="Outbound" />
				<FlightSection flight={returnFlight} leg="Return" />
				<TotalsSection {...totals} />
				<Separator className="my-4" />
				<div className="flex items-center justify-between">
					<p className="text-sm text-muted-foreground">
						Check-in opens 24 hours before departure
					</p>
					<div className="flex gap-4">
						<Button variant="outline">Manage Booking</Button>
						<Button>Check In</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
