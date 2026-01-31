import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building, Clock, User } from 'lucide-react';

interface BookingInfoProps {
	confirmationNumber: string;
	hotelName: string;
	checkIn: string;
	checkOut: string;
	nights: number;
	guestName: string;
}

interface RoomChargeProps {
	description: string;
	nights: number;
	rate: number;
}

interface ExtraChargeProps {
	description: string;
	amount: number;
}

interface TotalsProps {
	roomCharges: number;
	taxes: number;
	extras: number;
	total: number;
	currency: string;
}

const BookingHeader = ({
	confirmationNumber,
	hotelName,
	checkIn,
	checkOut,
	nights,
	guestName,
}: BookingInfoProps) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Building className="size-4 text-primary" />
				<span className="font-bold text-sm">{hotelName}</span>
			</div>
			<Badge variant="default" className="text-[10px]">
				Checked Out
			</Badge>
		</div>
		<div className="grid grid-cols-3 gap-2 text-[10px]">
			<div>
				<p className="text-muted-foreground">Check-in</p>
				<p className="font-medium">{checkIn}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Check-out</p>
				<p className="font-medium">{checkOut}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Nights</p>
				<p className="font-medium">{nights}</p>
			</div>
		</div>
		<div className="flex items-center gap-4 text-[10px] text-muted-foreground">
			<span>Conf: {confirmationNumber}</span>
			<span className="flex items-center gap-1">
				<User className="size-3" />
				{guestName}
			</span>
		</div>
	</div>
);

const RoomCharges = ({
	charges,
	currency,
}: {
	charges: RoomChargeProps[];
	currency: string;
}) => (
	<div className="space-y-1">
		{charges.map((charge, index) => (
			<div key={index} className="flex justify-between text-xs">
				<span>
					{charge.description} × {charge.nights}
				</span>
				<span>
					{currency}
					{(charge.nights * charge.rate).toFixed(2)}
				</span>
			</div>
		))}
	</div>
);

const ExtraCharges = ({
	charges,
	currency,
}: {
	charges: ExtraChargeProps[];
	currency: string;
}) => (
	<div className="space-y-1">
		{charges.map((charge, index) => (
			<div
				key={index}
				className="flex justify-between text-xs text-muted-foreground"
			>
				<span>{charge.description}</span>
				<span>
					{currency}
					{charge.amount.toFixed(2)}
				</span>
			</div>
		))}
	</div>
);

const TotalsSection = ({
	roomCharges,
	taxes,
	extras,
	total,
	currency,
}: TotalsProps) => (
	<div className="text-xs space-y-1">
		<div className="flex justify-between">
			<span className="text-muted-foreground">Room Charges</span>
			<span>
				{currency}
				{roomCharges.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between">
			<span className="text-muted-foreground">Taxes & Fees</span>
			<span>
				{currency}
				{taxes.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between">
			<span className="text-muted-foreground">Incidentals</span>
			<span>
				{currency}
				{extras.toFixed(2)}
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
	const booking: BookingInfoProps = {
		confirmationNumber: 'HTL789456',
		hotelName: 'Grand Plaza Hotel',
		checkIn: 'Feb 14',
		checkOut: 'Feb 17',
		nights: 3,
		guestName: 'John Smith',
	};

	const roomCharges: RoomChargeProps[] = [
		{ description: 'Deluxe King Room', nights: 3, rate: 189.0 },
	];

	const extras: ExtraChargeProps[] = [
		{ description: 'Room Service', amount: 45.5 },
		{ description: 'Mini Bar', amount: 22.0 },
		{ description: 'Parking (3 days)', amount: 75.0 },
	];

	const totals: TotalsProps = {
		roomCharges: 567.0,
		taxes: 85.05,
		extras: 142.5,
		total: 794.55,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-6">
				<div className="rounded-lg border p-4 space-y-4">
					<BookingHeader {...booking} />
					<Separator />
					<div>
						<p className="text-[10px] text-muted-foreground uppercase mb-2">
							Room
						</p>
						<RoomCharges charges={roomCharges} currency="$" />
					</div>
					<div>
						<p className="text-[10px] text-muted-foreground uppercase mb-2">
							Incidentals
						</p>
						<ExtraCharges charges={extras} currency="$" />
					</div>
					<Separator />
					<TotalsSection {...totals} />
					<div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground pt-2">
						<Clock className="size-3" />
						<span>Paid at checkout</span>
					</div>
				</div>
			</div>
		</section>
	);
}
