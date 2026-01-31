import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Bed,
	Calendar,
	Coffee,
	MapPin,
	Star,
	Utensils,
	Wifi,
} from 'lucide-react';

interface AmenityProps {
	icon: React.ComponentType<{ className?: string }>;
	name: string;
}

interface HotelInfoProps {
	name: string;
	rating: number;
	address: string;
	amenities: AmenityProps[];
}

interface RoomDetailsProps {
	roomType: string;
	guests: number;
	beds: string;
	view: string;
}

interface StayDatesProps {
	checkIn: string;
	checkInTime: string;
	checkOut: string;
	checkOutTime: string;
	nights: number;
}

interface ReservationSummaryProps {
	confirmationNumber: string;
	guestName: string;
	status: string;
}

interface PricingDetailsProps {
	roomRate: number;
	nights: number;
	taxes: number;
	resortFee: number;
	total: number;
	currency: string;
	prepaid: boolean;
}

const HotelInfo = ({ name, rating, address, amenities }: HotelInfoProps) => (
	<div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 space-y-4">
		<div>
			<div className="flex items-center gap-2 mb-1">
				{Array.from({ length: rating }).map((_, i) => (
					<Star key={i} className="size-4 fill-amber-400 text-amber-400" />
				))}
			</div>
			<h2 className="text-xl font-bold">{name}</h2>
			<div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
				<MapPin className="size-3" />
				<span>{address}</span>
			</div>
		</div>
		<div className="flex flex-wrap gap-3">
			{amenities.map((amenity, index) => (
				<div
					key={index}
					className="flex items-center gap-1 text-sm text-muted-foreground"
				>
					<amenity.icon className="size-4" />
					<span>{amenity.name}</span>
				</div>
			))}
		</div>
	</div>
);

const RoomDetails = ({ roomType, guests, beds, view }: RoomDetailsProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<div className="flex items-center gap-2">
			<Bed className="size-4 text-muted-foreground" />
			<p className="font-semibold">Room Details</p>
		</div>
		<div className="grid grid-cols-2 gap-3 text-sm">
			<div>
				<p className="text-muted-foreground">Room Type</p>
				<p className="font-medium">{roomType}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Guests</p>
				<p className="font-medium">{guests} Adults</p>
			</div>
			<div>
				<p className="text-muted-foreground">Beds</p>
				<p className="font-medium">{beds}</p>
			</div>
			<div>
				<p className="text-muted-foreground">View</p>
				<p className="font-medium">{view}</p>
			</div>
		</div>
	</div>
);

const StayDates = ({
	checkIn,
	checkInTime,
	checkOut,
	checkOutTime,
	nights,
}: StayDatesProps) => (
	<div className="grid grid-cols-2 gap-4">
		<div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 space-y-2">
			<p className="text-sm font-semibold text-green-600">Check-In</p>
			<div className="space-y-1">
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-muted-foreground" />
					<p className="font-medium">{checkIn}</p>
				</div>
				<p className="text-sm text-muted-foreground">After {checkInTime}</p>
			</div>
		</div>
		<div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 space-y-2">
			<p className="text-sm font-semibold text-red-500">Check-Out</p>
			<div className="space-y-1">
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-muted-foreground" />
					<p className="font-medium">{checkOut}</p>
				</div>
				<p className="text-sm text-muted-foreground">Before {checkOutTime}</p>
			</div>
		</div>
	</div>
);

const ReservationSummary = ({
	confirmationNumber,
	guestName,
	status,
}: ReservationSummaryProps) => (
	<div className="p-4 rounded-lg bg-muted/40 space-y-2">
		<div className="flex items-center justify-between">
			<div>
				<p className="text-xs text-muted-foreground">Confirmation #</p>
				<p className="font-mono font-bold text-lg">{confirmationNumber}</p>
			</div>
			<Badge variant="default">{status}</Badge>
		</div>
		<p className="text-sm text-muted-foreground">
			Guest: <span className="text-foreground font-medium">{guestName}</span>
		</p>
	</div>
);

const PricingDetails = ({
	roomRate,
	nights,
	taxes,
	resortFee,
	total,
	currency,
	prepaid,
}: PricingDetailsProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<p className="font-semibold">Price Details</p>
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">
					{nights} nights × {currency}
					{roomRate}/night
				</span>
				<span>
					{currency}
					{(nights * roomRate).toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Taxes & Service Charges</span>
				<span>
					{currency}
					{taxes.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Resort Fee</span>
				<span>
					{currency}
					{resortFee.toFixed(2)}
				</span>
			</div>
		</div>
		<Separator />
		<div className="flex justify-between font-bold text-lg">
			<span>Total</span>
			<span className="text-primary">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
		{prepaid && (
			<Badge variant="secondary" className="w-full justify-center">
				Prepaid - No payment due at hotel
			</Badge>
		)}
	</div>
);

export default function Main() {
	const amenities: AmenityProps[] = [
		{ icon: Wifi, name: 'Free WiFi' },
		{ icon: Coffee, name: 'Breakfast' },
		{ icon: Utensils, name: 'Restaurant' },
	];

	const hotel: HotelInfoProps = {
		name: 'The Grand Plaza Hotel',
		rating: 5,
		address: '100 Luxury Lane, Miami Beach, FL 33139',
		amenities,
	};

	const room: RoomDetailsProps = {
		roomType: 'Deluxe Ocean View Suite',
		guests: 2,
		beds: '1 King Bed',
		view: 'Ocean Front',
	};

	const dates: StayDatesProps = {
		checkIn: 'March 15, 2024',
		checkInTime: '3:00 PM',
		checkOut: 'March 18, 2024',
		checkOutTime: '11:00 AM',
		nights: 3,
	};

	const reservation: ReservationSummaryProps = {
		confirmationNumber: 'HTL-2024-89012',
		guestName: 'James & Lisa Wilson',
		status: 'Confirmed',
	};

	const pricing: PricingDetailsProps = {
		roomRate: 450.0,
		nights: 3,
		taxes: 162.0,
		resortFee: 75.0,
		total: 1587.0,
		currency: '$',
		prepaid: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardContent className="pt-6">
						<div className="grid @lg:grid-cols-5 gap-6">
							<div className="@lg:col-span-2 space-y-4">
								<HotelInfo {...hotel} />
								<RoomDetails {...room} />
								<Button variant="outline" className="w-full">
									Contact Hotel
								</Button>
							</div>
							<div className="@lg:col-span-3 space-y-4">
								<h2 className="text-xl font-bold">Hotel Reservation</h2>
								<ReservationSummary {...reservation} />
								<StayDates {...dates} />
								<PricingDetails {...pricing} />
								<div className="flex gap-3">
									<Button className="flex-1">Download Confirmation</Button>
									<Button variant="outline" className="flex-1">
										Modify Booking
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
