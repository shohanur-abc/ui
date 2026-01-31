import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Car, Clock, MapPin } from 'lucide-react';

interface RentalInfoProps {
	confirmationNumber: string;
	vehicleType: string;
	pickupDate: string;
	pickupLocation: string;
	returnDate: string;
	returnLocation: string;
}

interface ChargeItemProps {
	description: string;
	days: number;
	rate: number;
}

interface TotalsProps {
	rental: number;
	insurance: number;
	fuel: number;
	taxes: number;
	total: number;
	currency: string;
}

const RentalHeader = ({
	confirmationNumber,
	vehicleType,
	pickupDate,
	pickupLocation,
	returnDate,
	returnLocation,
}: RentalInfoProps) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Car className="size-4 text-primary" />
				<span className="font-bold text-sm">{vehicleType}</span>
			</div>
			<Badge variant="default" className="text-[10px]">
				Completed
			</Badge>
		</div>
		<div className="grid grid-cols-2 gap-3 text-[10px]">
			<div className="space-y-1">
				<p className="text-muted-foreground uppercase">Pick-up</p>
				<p className="font-medium">{pickupDate}</p>
				<p className="text-muted-foreground flex items-center gap-1">
					<MapPin className="size-3" />
					{pickupLocation}
				</p>
			</div>
			<div className="space-y-1">
				<p className="text-muted-foreground uppercase">Return</p>
				<p className="font-medium">{returnDate}</p>
				<p className="text-muted-foreground flex items-center gap-1">
					<MapPin className="size-3" />
					{returnLocation}
				</p>
			</div>
		</div>
		<p className="text-[10px] text-muted-foreground">
			Confirmation: {confirmationNumber}
		</p>
	</div>
);

const ChargeItems = ({
	items,
	currency,
}: {
	items: ChargeItemProps[];
	currency: string;
}) => (
	<div className="space-y-1">
		{items.map((item, index) => (
			<div key={index} className="flex justify-between text-xs">
				<span>
					{item.description} ({item.days} days)
				</span>
				<span>
					{currency}
					{(item.days * item.rate).toFixed(2)}
				</span>
			</div>
		))}
	</div>
);

const TotalsSection = ({
	rental,
	insurance,
	fuel,
	taxes,
	total,
	currency,
}: TotalsProps) => (
	<div className="text-xs space-y-1">
		<div className="flex justify-between">
			<span className="text-muted-foreground">Rental</span>
			<span>
				{currency}
				{rental.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between">
			<span className="text-muted-foreground">Insurance</span>
			<span>
				{currency}
				{insurance.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between">
			<span className="text-muted-foreground">Fuel Service</span>
			<span>
				{currency}
				{fuel.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between">
			<span className="text-muted-foreground">Taxes & Fees</span>
			<span>
				{currency}
				{taxes.toFixed(2)}
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
	const rental: RentalInfoProps = {
		confirmationNumber: 'RC-2024-78456',
		vehicleType: 'Toyota Camry or Similar',
		pickupDate: 'Feb 15, 10:00 AM',
		pickupLocation: 'LAX Airport',
		returnDate: 'Feb 18, 10:00 AM',
		returnLocation: 'LAX Airport',
	};

	const charges: ChargeItemProps[] = [
		{ description: 'Daily Rate', days: 3, rate: 65.0 },
	];

	const totals: TotalsProps = {
		rental: 195.0,
		insurance: 45.0,
		fuel: 55.0,
		taxes: 44.25,
		total: 339.25,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-6">
				<div className="rounded-lg border p-4 space-y-4">
					<RentalHeader {...rental} />
					<Separator />
					<ChargeItems items={charges} currency="$" />
					<Separator />
					<TotalsSection {...totals} />
					<Button variant="outline" size="sm" className="w-full text-xs">
						Download Receipt
					</Button>
				</div>
			</div>
		</section>
	);
}
