import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Calendar,
	Clock,
	Home,
	Key,
	MapPin,
	Shield,
	Star,
	User,
} from 'lucide-react';

interface PropertyProps {
	name: string;
	address: string;
	type: string;
	rating: number;
	reviews: number;
}

interface BookingProps {
	checkIn: string;
	checkOut: string;
	nights: number;
	guests: number;
	confirmationCode: string;
}

interface ChargeProps {
	description: string;
	nights?: number;
	pricePerNight?: number;
	amount: number;
}

interface GuestProps {
	name: string;
	email: string;
	phone: string;
}

interface TotalsProps {
	accommodation: number;
	cleaningFee: number;
	serviceFee: number;
	taxes: number;
	total: number;
	currency: string;
}

const PropertyCard = ({
	name,
	address,
	type,
	rating,
	reviews,
}: PropertyProps) => (
	<Card className="@md:col-span-2">
		<CardContent className="pt-4">
			<div className="flex items-start gap-4">
				<div className="size-20 rounded-lg bg-muted flex items-center justify-center">
					<Home className="size-10 text-muted-foreground" />
				</div>
				<div className="flex-1">
					<Badge variant="outline" className="mb-2">
						{type}
					</Badge>
					<h2 className="text-lg font-bold">{name}</h2>
					<p className="text-sm text-muted-foreground flex items-center gap-1">
						<MapPin className="size-3" />
						{address}
					</p>
					<div className="flex items-center gap-2 mt-2">
						<div className="flex items-center gap-1">
							<Star className="size-4 fill-amber-400 text-amber-400" />
							<span className="font-medium">{rating}</span>
						</div>
						<span className="text-sm text-muted-foreground">
							({reviews} reviews)
						</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const BookingCard = ({
	checkIn,
	checkOut,
	nights,
	guests,
	confirmationCode,
}: BookingProps) => (
	<Card>
		<CardContent className="pt-4 space-y-3">
			<div className="flex items-center justify-between">
				<Badge variant="default">Confirmed</Badge>
				<span className="font-mono text-xs text-muted-foreground">
					{confirmationCode}
				</span>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-primary" />
					<div>
						<p className="text-xs text-muted-foreground">Check-in</p>
						<p className="text-sm font-medium">{checkIn}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-primary" />
					<div>
						<p className="text-xs text-muted-foreground">Check-out</p>
						<p className="text-sm font-medium">{checkOut}</p>
					</div>
				</div>
			</div>
			<div className="flex justify-between text-sm">
				<span className="flex items-center gap-1 text-muted-foreground">
					<Clock className="size-3" />
					{nights} nights
				</span>
				<span className="flex items-center gap-1 text-muted-foreground">
					<User className="size-3" />
					{guests} guests
				</span>
			</div>
		</CardContent>
	</Card>
);

const ChargeCard = ({
	charge,
	currency,
}: {
	charge: ChargeProps;
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-4">
			<div className="flex items-start justify-between">
				<div>
					<p className="font-medium text-sm">{charge.description}</p>
					{charge.nights && charge.pricePerNight && (
						<p className="text-xs text-muted-foreground">
							{charge.nights} nights × {currency}
							{charge.pricePerNight}/night
						</p>
					)}
				</div>
				<span className="font-bold">
					{currency}
					{charge.amount.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

const GuestCard = ({ name, email, phone }: GuestProps) => (
	<Card>
		<CardHeader className="pb-2">
			<CardTitle className="text-sm flex items-center gap-2">
				<User className="size-4" />
				Guest Details
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2 text-sm">
			<p className="font-medium">{name}</p>
			<p className="text-muted-foreground">{email}</p>
			<p className="text-muted-foreground">{phone}</p>
		</CardContent>
	</Card>
);

const PoliciesCard = () => (
	<Card>
		<CardHeader className="pb-2">
			<CardTitle className="text-sm flex items-center gap-2">
				<Shield className="size-4" />
				Policies
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2 text-xs text-muted-foreground">
			<p>
				<strong>Check-in:</strong> 3:00 PM - 10:00 PM
			</p>
			<p>
				<strong>Check-out:</strong> By 11:00 AM
			</p>
			<p>
				<strong>Cancellation:</strong> Free cancellation up to 48 hours before
				check-in
			</p>
		</CardContent>
	</Card>
);

const TotalsCard = ({
	accommodation,
	cleaningFee,
	serviceFee,
	taxes,
	total,
	currency,
}: TotalsProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm text-primary-foreground">
				Payment Summary
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			<div className="flex justify-between text-sm opacity-80">
				<span>Accommodation</span>
				<span>
					{currency}
					{accommodation.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Cleaning Fee</span>
				<span>
					{currency}
					{cleaningFee.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Service Fee</span>
				<span>
					{currency}
					{serviceFee.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Taxes</span>
				<span>
					{currency}
					{taxes.toFixed(2)}
				</span>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-lg">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const property: PropertyProps = {
		name: 'Oceanfront Beach House',
		address: '123 Coastal Highway, Malibu, CA 90265',
		type: 'Entire House',
		rating: 4.9,
		reviews: 127,
	};

	const booking: BookingProps = {
		checkIn: 'Sat, Mar 15, 2024',
		checkOut: 'Sat, Mar 22, 2024',
		nights: 7,
		guests: 6,
		confirmationCode: 'HMX7Y9K2R',
	};

	const charges: ChargeProps[] = [
		{
			description: 'Accommodation',
			nights: 7,
			pricePerNight: 350,
			amount: 2450,
		},
		{ description: 'Cleaning Fee', amount: 150 },
		{ description: 'Service Fee', amount: 245 },
		{ description: 'Occupancy Taxes', amount: 285 },
	];

	const guest: GuestProps = {
		name: 'Jennifer Martinez',
		email: 'jennifer.m@email.com',
		phone: '(555) 123-4567',
	};

	const totals: TotalsProps = {
		accommodation: 2450,
		cleaningFee: 150,
		serviceFee: 245,
		taxes: 285,
		total: 3130,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 py-8">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-xl font-bold">Reservation Receipt</h1>
						<p className="text-sm text-muted-foreground">
							Booking ID: BK-2024-78945
						</p>
					</div>
					<Button variant="outline" size="sm" className="gap-2">
						<Key className="size-4" />
						Get Directions
					</Button>
				</div>
				<div className="grid @md:grid-cols-3 gap-4">
					<PropertyCard {...property} />
					<BookingCard {...booking} />
				</div>
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 mt-4">
					{charges.map((charge, index) => (
						<ChargeCard key={index} charge={charge} currency="$" />
					))}
				</div>
				<div className="grid @md:grid-cols-3 gap-4 mt-4">
					<GuestCard {...guest} />
					<PoliciesCard />
					<TotalsCard {...totals} />
				</div>
			</div>
		</section>
	);
}
