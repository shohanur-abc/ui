import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Car, Clock, Fuel, MapPin, Shield, User } from 'lucide-react';

interface RentalProps {
	confirmationNumber: string;
	pickupDate: string;
	pickupTime: string;
	pickupLocation: string;
	returnDate: string;
	returnTime: string;
	returnLocation: string;
}

interface VehicleProps {
	category: string;
	name: string;
	plate: string;
	color: string;
	mileageOut: number;
	mileageIn: number;
	fuelOut: string;
	fuelIn: string;
}

interface ChargeProps {
	description: string;
	days: number;
	rate: number;
	amount: number;
}

interface TotalsProps {
	rental: number;
	extras: number;
	fuel: number;
	tax: number;
	total: number;
	deposit: number;
	refund: number;
	currency: string;
}

const RentalHeader = ({
	confirmationNumber,
}: {
	confirmationNumber: string;
}) => (
	<div className="border-8 border-double border-foreground p-6 flex items-center justify-between">
		<div className="flex items-center gap-4">
			<div className="size-16 border-4 border-foreground flex items-center justify-center">
				<Car className="size-8" />
			</div>
			<div>
				<Badge variant="default" className="rounded-none mb-1">
					Completed
				</Badge>
				<h1 className="text-2xl font-bold">Rental Agreement</h1>
			</div>
		</div>
		<div className="text-right">
			<p className="text-xs uppercase tracking-widest text-muted-foreground">
				Confirmation
			</p>
			<p className="font-mono text-xl font-bold">{confirmationNumber}</p>
		</div>
	</div>
);

const LocationBox = ({
	type,
	date,
	time,
	location,
}: {
	type: string;
	date: string;
	time: string;
	location: string;
}) => (
	<div className="border-2 border-foreground">
		<div className="bg-muted px-4 py-2 border-b-2 border-foreground">
			<p className="text-xs font-bold uppercase tracking-widest">{type}</p>
		</div>
		<div className="p-4 space-y-2">
			<p className="font-bold flex items-center gap-2">
				<Calendar className="size-4" />
				{date}
			</p>
			<p className="text-sm text-muted-foreground flex items-center gap-2">
				<Clock className="size-4" />
				{time}
			</p>
			<p className="text-sm text-muted-foreground flex items-center gap-2">
				<MapPin className="size-4" />
				{location}
			</p>
		</div>
	</div>
);

const VehicleBox = ({ vehicle }: { vehicle: VehicleProps }) => (
	<div className="border-4 border-primary p-4">
		<div className="flex items-start justify-between mb-3">
			<div>
				<Badge variant="outline" className="rounded-none mb-1">
					{vehicle.category}
				</Badge>
				<h2 className="text-xl font-bold">{vehicle.name}</h2>
				<p className="text-sm text-muted-foreground">
					{vehicle.color} • {vehicle.plate}
				</p>
			</div>
		</div>
		<div className="grid grid-cols-2 gap-4 text-sm border-t-2 border-primary/30 pt-3">
			<div>
				<p className="text-xs text-muted-foreground">Mileage Out</p>
				<p className="font-medium">{vehicle.mileageOut.toLocaleString()} mi</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Mileage In</p>
				<p className="font-medium">{vehicle.mileageIn.toLocaleString()} mi</p>
			</div>
			<div className="flex items-center gap-2">
				<Fuel className="size-4 text-muted-foreground" />
				<div>
					<p className="text-xs text-muted-foreground">Fuel Out</p>
					<p className="font-medium">{vehicle.fuelOut}</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Fuel className="size-4 text-muted-foreground" />
				<div>
					<p className="text-xs text-muted-foreground">Fuel In</p>
					<p className="font-medium">{vehicle.fuelIn}</p>
				</div>
			</div>
		</div>
	</div>
);

const ChargeRow = ({
	charge,
	currency,
}: {
	charge: ChargeProps;
	currency: string;
}) => (
	<div className="flex items-center justify-between py-3 border-b-2 border-dashed border-foreground/30 last:border-0">
		<div>
			<p className="font-medium">{charge.description}</p>
			<p className="text-sm text-muted-foreground">
				{charge.days} days × {currency}
				{charge.rate}/day
			</p>
		</div>
		<span className="font-bold">
			{currency}
			{charge.amount.toFixed(2)}
		</span>
	</div>
);

const TotalsBox = ({
	rental,
	extras,
	fuel,
	tax,
	total,
	deposit,
	refund,
	currency,
}: TotalsProps) => (
	<div className="border-4 border-foreground">
		<div className="bg-foreground text-background p-4">
			<p className="text-xs font-bold uppercase tracking-widest">
				Final Charges
			</p>
		</div>
		<div className="p-4 space-y-2">
			<div className="flex justify-between text-sm">
				<span>Rental Charges</span>
				<span>
					{currency}
					{rental.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span>Extras & Insurance</span>
				<span>
					{currency}
					{extras.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span>Fuel Service</span>
				<span>
					{currency}
					{fuel.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span>Taxes & Fees</span>
				<span>
					{currency}
					{tax.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between font-bold">
				<span>Total Charges</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span>Deposit Held</span>
				<span>
					{currency}
					{deposit.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-green-600 font-bold">
				<span>Refund Due</span>
				<span>
					{currency}
					{refund.toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

export default function Main() {
	const rental: RentalProps = {
		confirmationNumber: 'RNT-2024-456789',
		pickupDate: 'February 15, 2024',
		pickupTime: '10:00 AM',
		pickupLocation: 'LAX Airport Terminal 1',
		returnDate: 'February 18, 2024',
		returnTime: '2:00 PM',
		returnLocation: 'LAX Airport Terminal 1',
	};

	const vehicle: VehicleProps = {
		category: 'Full Size SUV',
		name: '2024 Ford Explorer',
		plate: '8ABC123',
		color: 'Magnetic Gray',
		mileageOut: 12450,
		mileageIn: 12847,
		fuelOut: 'Full',
		fuelIn: '3/4',
	};

	const charges: ChargeProps[] = [
		{ description: 'Vehicle Rental', days: 3, rate: 89.99, amount: 269.97 },
		{
			description: 'Liability Protection',
			days: 3,
			rate: 29.99,
			amount: 89.97,
		},
		{ description: 'GPS Navigation', days: 3, rate: 12.99, amount: 38.97 },
	];

	const totals: TotalsProps = {
		rental: 269.97,
		extras: 128.94,
		fuel: 45.0,
		tax: 44.39,
		total: 488.3,
		deposit: 500.0,
		refund: 11.7,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<RentalHeader confirmationNumber={rental.confirmationNumber} />
				<div className="grid @md:grid-cols-2 gap-4 mt-4">
					<LocationBox
						type="Pick-Up"
						date={rental.pickupDate}
						time={rental.pickupTime}
						location={rental.pickupLocation}
					/>
					<LocationBox
						type="Return"
						date={rental.returnDate}
						time={rental.returnTime}
						location={rental.returnLocation}
					/>
				</div>
				<div className="mt-4">
					<VehicleBox vehicle={vehicle} />
				</div>
				<div className="grid @md:grid-cols-2 gap-4 mt-4">
					<div className="border-2 border-foreground p-4">
						<p className="text-xs font-bold uppercase tracking-widest mb-3 border-b-2 border-foreground pb-2">
							Charges
						</p>
						{charges.map((charge, index) => (
							<ChargeRow key={index} charge={charge} currency="$" />
						))}
					</div>
					<TotalsBox {...totals} />
				</div>
				<div className="flex justify-end gap-4 mt-4">
					<Button variant="outline" className="rounded-none">
						Print Receipt
					</Button>
					<Button className="rounded-none">Book Again</Button>
				</div>
			</div>
		</section>
	);
}
