import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Car, Fuel, MapPin, Settings, Shield, Wrench } from 'lucide-react';

interface VehicleProps {
	make: string;
	model: string;
	year: number;
	mileage: number;
	vin: string;
	licensePlate: string;
}

interface ServiceProps {
	icon: React.ReactNode;
	category: string;
	description: string;
	partsCost: number;
	laborCost: number;
	color: string;
}

interface RecommendationProps {
	priority: string;
	service: string;
	estimatedCost: number;
}

interface TotalsProps {
	parts: number;
	labor: number;
	shopSupplies: number;
	tax: number;
	total: number;
	currency: string;
}

const VehicleCard = ({
	make,
	model,
	year,
	mileage,
	vin,
	licensePlate,
}: VehicleProps) => (
	<Card className="@md:col-span-2">
		<CardContent className="pt-4">
			<div className="flex items-center gap-4">
				<div className="size-16 rounded-lg bg-primary/10 flex items-center justify-center">
					<Car className="size-8 text-primary" />
				</div>
				<div className="flex-1">
					<h2 className="text-xl font-bold">
						{year} {make} {model}
					</h2>
					<div className="grid grid-cols-3 gap-4 mt-2 text-sm">
						<div>
							<p className="text-xs text-muted-foreground">Mileage</p>
							<p className="font-medium">{mileage.toLocaleString()} mi</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">VIN</p>
							<p className="font-mono text-xs">{vin}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">License</p>
							<p className="font-medium">{licensePlate}</p>
						</div>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ServiceCard = ({
	icon,
	category,
	description,
	partsCost,
	laborCost,
	color,
	currency,
}: ServiceProps & { currency: string }) => (
	<Card>
		<CardContent className="pt-4 space-y-3">
			<div className="flex items-center gap-2">
				<div
					className={`size-8 rounded flex items-center justify-center ${color}`}
				>
					{icon}
				</div>
				<Badge variant="outline" className="text-[10px]">
					{category}
				</Badge>
			</div>
			<p className="text-sm font-medium">{description}</p>
			<div className="grid grid-cols-2 gap-2 text-xs">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Parts</span>
					<span>
						{currency}
						{partsCost.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Labor</span>
					<span>
						{currency}
						{laborCost.toFixed(2)}
					</span>
				</div>
			</div>
			<Separator />
			<div className="flex justify-between font-medium text-sm">
				<span>Subtotal</span>
				<span>
					{currency}
					{(partsCost + laborCost).toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

const RecommendationsCard = ({
	recommendations,
	currency,
}: {
	recommendations: RecommendationProps[];
	currency: string;
}) => (
	<Card className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm flex items-center gap-2">
				<Shield className="size-4 text-amber-600" />
				Recommended Services
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{recommendations.map((rec, index) => (
				<div key={index} className="flex items-center justify-between">
					<div>
						<Badge
							variant={
								rec.priority === 'High'
									? 'destructive'
									: rec.priority === 'Medium'
										? 'default'
										: 'secondary'
							}
							className="text-[10px]"
						>
							{rec.priority}
						</Badge>
						<p className="text-sm mt-1">{rec.service}</p>
					</div>
					<span className="text-sm text-muted-foreground">
						~{currency}
						{rec.estimatedCost}
					</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const TotalsCard = ({
	parts,
	labor,
	shopSupplies,
	tax,
	total,
	currency,
}: TotalsProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm text-primary-foreground">
				Invoice Total
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			<div className="flex justify-between text-sm opacity-80">
				<span>Parts</span>
				<span>
					{currency}
					{parts.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Labor</span>
				<span>
					{currency}
					{labor.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Shop Supplies</span>
				<span>
					{currency}
					{shopSupplies.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Tax</span>
				<span>
					{currency}
					{tax.toFixed(2)}
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
	const vehicle: VehicleProps = {
		make: 'Honda',
		model: 'Accord',
		year: 2021,
		mileage: 45678,
		vin: '1HGCV1F34MA****',
		licensePlate: 'ABC-1234',
	};

	const services: ServiceProps[] = [
		{
			icon: <Fuel className="size-4 text-blue-600" />,
			category: 'Maintenance',
			description: 'Oil change - Full synthetic 5W-30',
			partsCost: 45.0,
			laborCost: 35.0,
			color: 'bg-blue-100',
		},
		{
			icon: <Settings className="size-4 text-gray-600" />,
			category: 'Maintenance',
			description: 'Brake pad replacement - Front',
			partsCost: 120.0,
			laborCost: 95.0,
			color: 'bg-gray-100',
		},
		{
			icon: <Settings className="size-4 text-gray-600" />,
			category: 'Maintenance',
			description: 'Brake rotor resurfacing - Front',
			partsCost: 0,
			laborCost: 75.0,
			color: 'bg-gray-100',
		},
		{
			icon: <Wrench className="size-4 text-amber-600" />,
			category: 'Repair',
			description: 'Engine air filter replacement',
			partsCost: 28.0,
			laborCost: 15.0,
			color: 'bg-amber-100',
		},
		{
			icon: <Wrench className="size-4 text-amber-600" />,
			category: 'Repair',
			description: 'Cabin air filter replacement',
			partsCost: 32.0,
			laborCost: 15.0,
			color: 'bg-amber-100',
		},
		{
			icon: <Settings className="size-4 text-green-600" />,
			category: 'Inspection',
			description: 'Multi-point vehicle inspection',
			partsCost: 0,
			laborCost: 0,
			color: 'bg-green-100',
		},
	];

	const recommendations: RecommendationProps[] = [
		{
			priority: 'High',
			service: 'Transmission fluid flush',
			estimatedCost: 180,
		},
		{ priority: 'Medium', service: 'Coolant system flush', estimatedCost: 120 },
		{ priority: 'Low', service: 'Windshield wiper blades', estimatedCost: 45 },
	];

	const totals: TotalsProps = {
		parts: 225.0,
		labor: 235.0,
		shopSupplies: 15.0,
		tax: 38.0,
		total: 513.0,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 py-8">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-xl font-bold">Service Invoice</h1>
						<p className="text-sm text-muted-foreground">RO# 2024-4567</p>
					</div>
					<Badge>Complete</Badge>
				</div>
				<div className="grid @md:grid-cols-3 gap-4">
					<VehicleCard {...vehicle} />
					<TotalsCard {...totals} />
				</div>
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 mt-4">
					{services.map((service, index) => (
						<ServiceCard key={index} {...service} currency="$" />
					))}
				</div>
				<div className="mt-4">
					<RecommendationsCard recommendations={recommendations} currency="$" />
				</div>
				<div className="flex justify-end gap-4 mt-4">
					<Button variant="outline">Print Invoice</Button>
					<Button>Pay Now</Button>
				</div>
			</div>
		</section>
	);
}
