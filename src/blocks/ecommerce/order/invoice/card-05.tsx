import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Building2,
	Car,
	Clock,
	CreditCard,
	Fuel,
	MapPin,
	Receipt,
	Sparkles,
	Wrench,
} from 'lucide-react';

interface VehicleCardProps {
	make: string;
	model: string;
	year: number;
	vin: string;
	mileage: number;
	licensePlate: string;
}

interface ShopCardProps {
	name: string;
	address: string;
	phone: string;
	technicianName: string;
}

interface ServiceItemCardProps {
	category: string;
	name: string;
	description: string;
	laborHours: number;
	laborRate: number;
	partsTotal: number;
	currency: string;
}

interface InvoiceTotalsCardProps {
	laborTotal: number;
	partsTotal: number;
	shopSupplies: number;
	tax: number;
	total: number;
	currency: string;
}

const VehicleCard = ({
	make,
	model,
	year,
	vin,
	mileage,
	licensePlate,
}: VehicleCardProps) => (
	<Card className="bg-gradient-to-br from-slate-500/5 to-zinc-500/5">
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Car className="size-4" />
				Vehicle Information
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div>
				<p className="text-2xl font-bold">
					{year} {make} {model}
				</p>
				<p className="text-sm text-muted-foreground font-mono">
					{licensePlate}
				</p>
			</div>
			<div className="grid grid-cols-2 gap-4 text-sm">
				<div>
					<p className="text-muted-foreground">VIN</p>
					<p className="font-mono text-xs">{vin}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Mileage</p>
					<p className="font-medium">{mileage.toLocaleString()} mi</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ShopCard = ({ name, address, phone, technicianName }: ShopCardProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Building2 className="size-4" />
				Service Center
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<p className="font-semibold">{name}</p>
			<div className="flex items-start gap-2 text-sm text-muted-foreground">
				<MapPin className="size-3 mt-1" />
				<span>{address}</span>
			</div>
			<p className="text-sm text-muted-foreground">{phone}</p>
			<Badge variant="secondary" className="gap-1">
				<Wrench className="size-3" />
				Tech: {technicianName}
			</Badge>
		</CardContent>
	</Card>
);

const ServiceItemCard = ({
	category,
	name,
	description,
	laborHours,
	laborRate,
	partsTotal,
	currency,
}: ServiceItemCardProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-start gap-3">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
					{category === 'Maintenance' ? (
						<Sparkles className="size-5 text-primary" />
					) : (
						<Wrench className="size-5 text-primary" />
					)}
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="font-medium">{name}</p>
							<p className="text-sm text-muted-foreground">{description}</p>
						</div>
						<p className="font-bold text-lg shrink-0">
							{currency}
							{(laborHours * laborRate + partsTotal).toFixed(2)}
						</p>
					</div>
					<div className="flex gap-4 mt-2 text-sm text-muted-foreground">
						<div className="flex items-center gap-1">
							<Clock className="size-3" />
							<span>
								{laborHours}h @ {currency}
								{laborRate}/hr
							</span>
						</div>
						<span>
							Parts: {currency}
							{partsTotal.toFixed(2)}
						</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const InvoiceTotalsCard = ({
	laborTotal,
	partsTotal,
	shopSupplies,
	tax,
	total,
	currency,
}: InvoiceTotalsCardProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="pt-6 space-y-4">
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="opacity-80">Labor Total</span>
					<span>
						{currency}
						{laborTotal.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Parts Total</span>
					<span>
						{currency}
						{partsTotal.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Shop Supplies</span>
					<span>
						{currency}
						{shopSupplies.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Tax</span>
					<span>
						{currency}
						{tax.toFixed(2)}
					</span>
				</div>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-2xl">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<Button variant="secondary" className="gap-2">
					<CreditCard className="size-4" />
					Pay Now
				</Button>
				<Button variant="secondary" className="gap-2">
					<Receipt className="size-4" />
					Print Invoice
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const vehicle: VehicleCardProps = {
		make: 'Toyota',
		model: 'Camry XLE',
		year: 2021,
		vin: '4T1BF1FK5MU123456',
		mileage: 45230,
		licensePlate: 'ABC-1234',
	};

	const shop: ShopCardProps = {
		name: 'Premier Auto Care',
		address: '789 Mechanic Lane, Austin, TX 78701',
		phone: '(512) 555-0199',
		technicianName: 'Mike R.',
	};

	const services: ServiceItemCardProps[] = [
		{
			category: 'Maintenance',
			name: 'Oil Change - Full Synthetic',
			description: '5W-30 full synthetic oil, OEM filter',
			laborHours: 0.5,
			laborRate: 125,
			partsTotal: 65.0,
			currency: '$',
		},
		{
			category: 'Maintenance',
			name: 'Tire Rotation & Balance',
			description: 'Rotate all 4 tires, balance and inspect',
			laborHours: 0.5,
			laborRate: 125,
			partsTotal: 0,
			currency: '$',
		},
		{
			category: 'Repair',
			name: 'Brake Pad Replacement - Front',
			description: 'Ceramic brake pads, rotor inspection',
			laborHours: 1.5,
			laborRate: 125,
			partsTotal: 145.0,
			currency: '$',
		},
		{
			category: 'Repair',
			name: 'Cabin Air Filter',
			description: 'Replace cabin air filter',
			laborHours: 0.25,
			laborRate: 125,
			partsTotal: 35.0,
			currency: '$',
		},
	];

	const totals: InvoiceTotalsCardProps = {
		laborTotal: 343.75,
		partsTotal: 245.0,
		shopSupplies: 15.0,
		tax: 48.3,
		total: 652.05,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-4">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center gap-2">
							<Wrench className="size-5 text-primary" />
							<h1 className="text-xl font-bold">Service Invoice</h1>
						</div>
						<Badge variant="outline" className="font-mono">
							INV-2024-0892
						</Badge>
					</div>
					<div className="grid @md:grid-cols-2 gap-4">
						<VehicleCard {...vehicle} />
						<ShopCard {...shop} />
					</div>
					<div className="space-y-3">
						<h3 className="font-semibold text-sm text-muted-foreground">
							Services Performed
						</h3>
						{services.map((service, index) => (
							<ServiceItemCard key={index} {...service} />
						))}
					</div>
					<InvoiceTotalsCard {...totals} />
				</div>
			</div>
		</section>
	);
}
