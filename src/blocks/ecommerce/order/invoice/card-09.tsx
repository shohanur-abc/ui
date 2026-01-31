import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CalendarDays,
	Check,
	Clock,
	MapPin,
	PartyPopper,
	Phone,
	Star,
	Users,
	Utensils,
} from 'lucide-react';

interface VenueCardProps {
	name: string;
	address: string;
	phone: string;
	rating: number;
	capacity: number;
}

interface EventDetailsCardProps {
	eventName: string;
	eventType: string;
	date: string;
	time: string;
	duration: string;
	guestCount: number;
}

interface PackageCardProps {
	name: string;
	description: string;
	includes: string[];
	pricePerPerson: number;
	guests: number;
	currency: string;
}

interface ExtraServiceCardProps {
	name: string;
	description: string;
	price: number;
	currency: string;
}

interface PaymentSummaryCardProps {
	venueRental: number;
	catering: number;
	extras: number;
	serviceCharge: number;
	tax: number;
	total: number;
	deposit: number;
	depositPaid: boolean;
	balance: number;
	currency: string;
}

const VenueCard = ({
	name,
	address,
	phone,
	rating,
	capacity,
}: VenueCardProps) => (
	<Card className="bg-gradient-to-br from-violet-500/5 to-purple-500/5 border-violet-500/20">
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<PartyPopper className="size-4" />
				Event Venue
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div>
				<p className="text-xl font-bold">{name}</p>
				<div className="flex items-center gap-1 mt-1">
					{Array.from({ length: Math.floor(rating) }).map((_, i) => (
						<Star key={i} className="size-3 fill-amber-400 text-amber-400" />
					))}
					<span className="text-sm text-muted-foreground ml-1">{rating}</span>
				</div>
			</div>
			<div className="flex items-start gap-2 text-sm text-muted-foreground">
				<MapPin className="size-3 mt-1" />
				<span>{address}</span>
			</div>
			<div className="flex gap-4 text-sm text-muted-foreground">
				<div className="flex items-center gap-1">
					<Phone className="size-3" />
					<span>{phone}</span>
				</div>
				<div className="flex items-center gap-1">
					<Users className="size-3" />
					<span>Up to {capacity}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const EventDetailsCard = ({
	eventName,
	eventType,
	date,
	time,
	duration,
	guestCount,
}: EventDetailsCardProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<CalendarDays className="size-4" />
				Event Details
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div>
				<p className="font-semibold">{eventName}</p>
				<Badge variant="secondary">{eventType}</Badge>
			</div>
			<div className="grid grid-cols-2 gap-4 text-sm">
				<div>
					<p className="text-muted-foreground">Date</p>
					<p className="font-medium">{date}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Time</p>
					<p className="font-medium">{time}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Duration</p>
					<p className="font-medium">{duration}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Guests</p>
					<p className="font-medium">{guestCount} people</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const PackageCard = ({
	name,
	description,
	includes,
	pricePerPerson,
	guests,
	currency,
}: PackageCardProps) => (
	<Card className="border-primary">
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Utensils className="size-4 text-primary" />
					<CardTitle className="text-base">{name}</CardTitle>
				</div>
				<Badge variant="default">
					{currency}
					{pricePerPerson}/person
				</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<p className="text-sm text-muted-foreground">{description}</p>
			<div className="grid grid-cols-2 gap-2">
				{includes.map((item, index) => (
					<div key={index} className="flex items-center gap-2 text-sm">
						<Check className="size-4 text-green-500" />
						<span>{item}</span>
					</div>
				))}
			</div>
			<Separator />
			<div className="flex justify-between font-semibold">
				<span>
					{guests} guests × {currency}
					{pricePerPerson}
				</span>
				<span className="text-primary">
					{currency}
					{(guests * pricePerPerson).toLocaleString()}
				</span>
			</div>
		</CardContent>
	</Card>
);

const ExtraServiceCard = ({
	name,
	description,
	price,
	currency,
}: ExtraServiceCardProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				<div>
					<p className="font-medium">{name}</p>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
				<p className="font-bold">
					{currency}
					{price.toLocaleString()}
				</p>
			</div>
		</CardContent>
	</Card>
);

const PaymentSummaryCard = ({
	venueRental,
	catering,
	extras,
	serviceCharge,
	tax,
	total,
	deposit,
	depositPaid,
	balance,
	currency,
}: PaymentSummaryCardProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="pt-6 space-y-4">
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="opacity-80">Venue Rental</span>
					<span>
						{currency}
						{venueRental.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Catering</span>
					<span>
						{currency}
						{catering.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Extra Services</span>
					<span>
						{currency}
						{extras.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Service Charge (18%)</span>
					<span>
						{currency}
						{serviceCharge.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Tax</span>
					<span>
						{currency}
						{tax.toLocaleString()}
					</span>
				</div>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-lg">
				<span>Total</span>
				<span>
					{currency}
					{total.toLocaleString()}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="opacity-80">Deposit (50%)</span>
				{depositPaid ? (
					<Badge variant="secondary" className="gap-1">
						<Check className="size-3" />
						Paid
					</Badge>
				) : (
					<span>
						{currency}
						{deposit.toLocaleString()}
					</span>
				)}
			</div>
			<div className="pt-2 border-t border-primary-foreground/20">
				<p className="text-sm opacity-80">Balance Due (Event Day)</p>
				<p className="text-3xl font-bold">
					{currency}
					{balance.toLocaleString()}
				</p>
			</div>
			<Button variant="secondary" className="w-full">
				Pay Balance
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const venue: VenueCardProps = {
		name: 'The Grand Ballroom',
		address: '500 Celebration Ave, Los Angeles, CA 90015',
		phone: '(213) 555-0100',
		rating: 4.8,
		capacity: 300,
	};

	const event: EventDetailsCardProps = {
		eventName: 'Johnson Family Reunion',
		eventType: 'Private Event',
		date: 'Saturday, July 20, 2024',
		time: '6:00 PM - 11:00 PM',
		duration: '5 hours',
		guestCount: 120,
	};

	const cateringPackage: PackageCardProps = {
		name: 'Premium Dinner Package',
		description: 'Full-service plated dinner with appetizers and dessert',
		includes: [
			'3 appetizer options',
			'Salad course',
			'Choice of 2 entrées',
			'Sides & bread',
			'Dessert table',
			'Coffee & tea service',
		],
		pricePerPerson: 85,
		guests: 120,
		currency: '$',
	};

	const extras: ExtraServiceCardProps[] = [
		{
			name: 'Premium Bar Package',
			description: '4-hour open bar with top-shelf spirits',
			price: 2400,
			currency: '$',
		},
		{
			name: 'DJ & Sound System',
			description: 'Professional DJ with lighting',
			price: 1200,
			currency: '$',
		},
		{
			name: 'Photography Package',
			description: '4 hours with digital delivery',
			price: 1500,
			currency: '$',
		},
	];

	const payment: PaymentSummaryCardProps = {
		venueRental: 3500,
		catering: 10200,
		extras: 5100,
		serviceCharge: 3384,
		tax: 1776.72,
		total: 23960.72,
		deposit: 11980.36,
		depositPaid: true,
		balance: 11980.36,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-4">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center gap-2">
							<PartyPopper className="size-5 text-primary" />
							<h1 className="text-xl font-bold">Event Invoice</h1>
						</div>
						<Badge variant="outline" className="font-mono">
							INV-2024-0567
						</Badge>
					</div>
					<div className="grid @md:grid-cols-2 gap-4">
						<VenueCard {...venue} />
						<EventDetailsCard {...event} />
					</div>
					<PackageCard {...cateringPackage} />
					<div className="space-y-3">
						<h3 className="font-semibold text-sm text-muted-foreground">
							Additional Services
						</h3>
						<div className="grid @md:grid-cols-2 gap-3">
							{extras.map((extra, index) => (
								<ExtraServiceCard key={index} {...extra} />
							))}
						</div>
					</div>
					<PaymentSummaryCard {...payment} />
				</div>
			</div>
		</section>
	);
}
