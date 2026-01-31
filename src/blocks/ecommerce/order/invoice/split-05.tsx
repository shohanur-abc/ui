import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Calendar,
	Car,
	Clock,
	Fuel,
	Key,
	MapPin,
	Shield,
	Users,
} from 'lucide-react';

interface VehicleSpecProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}

interface VehicleInfoProps {
	name: string;
	category: string;
	specs: VehicleSpecProps[];
}

interface RentalDetailsProps {
	confirmationNumber: string;
	pickupDate: string;
	pickupTime: string;
	pickupLocation: string;
	returnDate: string;
	returnTime: string;
	returnLocation: string;
}

interface PricingBreakdownProps {
	dailyRate: number;
	days: number;
	insurance: number;
	extras: { name: string; price: number }[];
	taxes: number;
	total: number;
	currency: string;
}

interface RenterInfoProps {
	name: string;
	email: string;
	phone: string;
	licenseNumber: string;
}

const VehicleInfo = ({ name, category, specs }: VehicleInfoProps) => (
	<div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 space-y-4">
		<div className="flex items-center gap-3">
			<div className="size-16 rounded-xl bg-background flex items-center justify-center">
				<Car className="size-8 text-primary" />
			</div>
			<div>
				<p className="text-lg font-bold">{name}</p>
				<Badge variant="secondary">{category}</Badge>
			</div>
		</div>
		<div className="grid grid-cols-2 gap-3">
			{specs.map((spec, index) => (
				<div key={index} className="flex items-center gap-2 text-sm">
					<spec.icon className="size-4 text-muted-foreground" />
					<span className="text-muted-foreground">{spec.label}:</span>
					<span className="font-medium">{spec.value}</span>
				</div>
			))}
		</div>
	</div>
);

const RentalDetails = ({
	confirmationNumber,
	pickupDate,
	pickupTime,
	pickupLocation,
	returnDate,
	returnTime,
	returnLocation,
}: RentalDetailsProps) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
			<div>
				<p className="text-xs text-muted-foreground">Confirmation #</p>
				<p className="font-mono font-bold">{confirmationNumber}</p>
			</div>
			<Badge variant="default">Confirmed</Badge>
		</div>
		<div className="grid grid-cols-2 gap-4">
			<div className="p-4 rounded-lg border space-y-2">
				<div className="flex items-center gap-2 text-green-600">
					<Key className="size-4" />
					<p className="font-semibold">Pick-up</p>
				</div>
				<div className="space-y-1 text-sm">
					<div className="flex items-center gap-2">
						<Calendar className="size-3 text-muted-foreground" />
						<span>{pickupDate}</span>
					</div>
					<div className="flex items-center gap-2">
						<Clock className="size-3 text-muted-foreground" />
						<span>{pickupTime}</span>
					</div>
					<div className="flex items-center gap-2">
						<MapPin className="size-3 text-muted-foreground" />
						<span className="text-muted-foreground">{pickupLocation}</span>
					</div>
				</div>
			</div>
			<div className="p-4 rounded-lg border space-y-2">
				<div className="flex items-center gap-2 text-red-500">
					<Key className="size-4" />
					<p className="font-semibold">Return</p>
				</div>
				<div className="space-y-1 text-sm">
					<div className="flex items-center gap-2">
						<Calendar className="size-3 text-muted-foreground" />
						<span>{returnDate}</span>
					</div>
					<div className="flex items-center gap-2">
						<Clock className="size-3 text-muted-foreground" />
						<span>{returnTime}</span>
					</div>
					<div className="flex items-center gap-2">
						<MapPin className="size-3 text-muted-foreground" />
						<span className="text-muted-foreground">{returnLocation}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const PricingBreakdown = ({
	dailyRate,
	days,
	insurance,
	extras,
	taxes,
	total,
	currency,
}: PricingBreakdownProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<p className="font-semibold">Pricing Breakdown</p>
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">
					{days} days × {currency}
					{dailyRate}/day
				</span>
				<span>
					{currency}
					{(days * dailyRate).toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Insurance</span>
				<span>
					{currency}
					{insurance.toFixed(2)}
				</span>
			</div>
			{extras.map((extra, index) => (
				<div key={index} className="flex justify-between">
					<span className="text-muted-foreground">{extra.name}</span>
					<span>
						{currency}
						{extra.price.toFixed(2)}
					</span>
				</div>
			))}
			<div className="flex justify-between">
				<span className="text-muted-foreground">Taxes & Fees</span>
				<span>
					{currency}
					{taxes.toFixed(2)}
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
	</div>
);

const RenterInfo = ({ name, email, phone, licenseNumber }: RenterInfoProps) => (
	<div className="p-4 rounded-lg bg-muted/40 space-y-3">
		<p className="font-semibold">Renter Information</p>
		<div className="grid grid-cols-2 gap-3 text-sm">
			<div>
				<p className="text-muted-foreground">Name</p>
				<p className="font-medium">{name}</p>
			</div>
			<div>
				<p className="text-muted-foreground">License #</p>
				<p className="font-mono">{licenseNumber}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Email</p>
				<p>{email}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Phone</p>
				<p>{phone}</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const vehicleSpecs: VehicleSpecProps[] = [
		{ icon: Users, label: 'Seats', value: '5' },
		{ icon: Fuel, label: 'Fuel', value: 'Hybrid' },
		{ icon: Shield, label: 'Insurance', value: 'Full' },
		{ icon: Car, label: 'Transmission', value: 'Auto' },
	];

	const vehicle: VehicleInfoProps = {
		name: 'Toyota Camry 2024',
		category: 'Mid-Size Sedan',
		specs: vehicleSpecs,
	};

	const rental: RentalDetailsProps = {
		confirmationNumber: 'CAR-2024-7891',
		pickupDate: 'Feb 20, 2024',
		pickupTime: '10:00 AM',
		pickupLocation: 'SFO Airport Terminal 2',
		returnDate: 'Feb 25, 2024',
		returnTime: '10:00 AM',
		returnLocation: 'SFO Airport Terminal 2',
	};

	const pricing: PricingBreakdownProps = {
		dailyRate: 65.0,
		days: 5,
		insurance: 75.0,
		extras: [
			{ name: 'GPS Navigation', price: 25.0 },
			{ name: 'Child Seat', price: 35.0 },
		],
		taxes: 42.5,
		total: 502.5,
		currency: '$',
	};

	const renter: RenterInfoProps = {
		name: 'David Miller',
		email: 'david@email.com',
		phone: '+1 (555) 123-4567',
		licenseNumber: 'D1234567',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardContent className="pt-6">
						<div className="grid @lg:grid-cols-5 gap-6">
							<div className="@lg:col-span-2 space-y-4">
								<VehicleInfo {...vehicle} />
								<RenterInfo {...renter} />
								<Button variant="outline" className="w-full">
									Modify Reservation
								</Button>
							</div>
							<div className="@lg:col-span-3 space-y-4">
								<h2 className="text-xl font-bold">Rental Confirmation</h2>
								<RentalDetails {...rental} />
								<PricingBreakdown {...pricing} />
								<div className="flex gap-3">
									<Button className="flex-1">Download Voucher</Button>
									<Button variant="outline" className="flex-1">
										Add to Calendar
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
