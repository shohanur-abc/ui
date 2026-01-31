import {
	AlertCircle,
	Check,
	Clock,
	Globe,
	Package,
	Plane,
	Plus,
	Settings2,
	Truck,
	Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

type Carrier = {
	id: string;
	name: string;
	logo: string;
	description: string;
	deliveryTime: string;
	enabled: boolean;
	services: string[];
};

type ShippingMethod = {
	id: string;
	name: string;
	description: string;
	estimatedDays: string;
	price: string;
	icon: React.ComponentType<{ className?: string }>;
	enabled: boolean;
};

const CarrierCard = ({
	name,
	logo,
	description,
	deliveryTime,
	enabled,
	services,
}: Carrier) => (
	<div
		className={`rounded-lg border p-4 transition-all ${
			enabled ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div className="flex items-start justify-between">
			<div className="flex items-start gap-4">
				<div
					className={`flex size-14 items-center justify-center rounded-lg text-2xl font-bold ${
						enabled
							? 'bg-primary/10 text-primary'
							: 'bg-muted text-muted-foreground'
					}`}
				>
					{logo}
				</div>
				<div>
					<div className="flex items-center gap-2">
						<h4 className="font-semibold">{name}</h4>
						{enabled && (
							<Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-xs">
								<Check className="mr-1 size-3" />
								Active
							</Badge>
						)}
					</div>
					<p className="text-sm text-muted-foreground">{description}</p>
					<div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
						<Clock className="size-3" />
						{deliveryTime}
					</div>
					<div className="mt-2 flex flex-wrap gap-1">
						{services.map((service) => (
							<Badge key={service} variant="outline" className="text-xs">
								{service}
							</Badge>
						))}
					</div>
				</div>
			</div>
			<div className="flex flex-col items-end gap-2">
				<Switch defaultChecked={enabled} />
				<Button variant="ghost" size="sm">
					<Settings2 className="size-4" />
				</Button>
			</div>
		</div>
	</div>
);

const ShippingMethodRow = ({
	name,
	description,
	estimatedDays,
	price,
	icon: Icon,
	enabled,
}: ShippingMethod) => (
	<div className="flex items-center justify-between rounded-lg border p-4">
		<div className="flex items-center gap-4">
			<div
				className={`flex size-10 items-center justify-center rounded-lg ${
					enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
				}`}
			>
				<Icon className="size-5" />
			</div>
			<div>
				<h4 className="font-medium">{name}</h4>
				<p className="text-sm text-muted-foreground">{description}</p>
				<p className="text-xs text-muted-foreground mt-1">
					{estimatedDays} • {price}
				</p>
			</div>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

export default function Main() {
	const carriers: Carrier[] = [
		{
			id: 'usps',
			name: 'USPS',
			logo: '📦',
			description: 'United States Postal Service',
			deliveryTime: '3-7 business days',
			enabled: true,
			services: ['Priority', 'Express', 'First Class'],
		},
		{
			id: 'ups',
			name: 'UPS',
			logo: '🟤',
			description: 'United Parcel Service',
			deliveryTime: '1-5 business days',
			enabled: true,
			services: ['Ground', 'Next Day', '2nd Day Air'],
		},
		{
			id: 'fedex',
			name: 'FedEx',
			logo: '📨',
			description: 'Federal Express',
			deliveryTime: '1-5 business days',
			enabled: false,
			services: ['Ground', 'Express', 'Overnight'],
		},
		{
			id: 'dhl',
			name: 'DHL',
			logo: '✈️',
			description: 'International shipping',
			deliveryTime: '2-10 business days',
			enabled: false,
			services: ['Express', 'Economy', 'International'],
		},
	];

	const shippingMethods: ShippingMethod[] = [
		{
			id: 'standard',
			name: 'Standard Shipping',
			description: 'Economy delivery',
			estimatedDays: '5-7 days',
			price: '$5.99',
			icon: Truck,
			enabled: true,
		},
		{
			id: 'express',
			name: 'Express Shipping',
			description: 'Faster delivery',
			estimatedDays: '2-3 days',
			price: '$12.99',
			icon: Zap,
			enabled: true,
		},
		{
			id: 'overnight',
			name: 'Overnight Shipping',
			description: 'Next day delivery',
			estimatedDays: '1 day',
			price: '$24.99',
			icon: Plane,
			enabled: false,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Truck className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Shipping Carriers</CardTitle>
										<CardDescription>
											Configure available shipping carriers
										</CardDescription>
									</div>
								</div>
								<Button variant="outline" className="gap-2">
									<Plus className="size-4" />
									Add Carrier
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							{carriers.map((carrier) => (
								<CarrierCard key={carrier.id} {...carrier} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle>Shipping Methods</CardTitle>
							<CardDescription>
								Choose which shipping methods to offer customers
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3 pt-6">
							{shippingMethods.map((method) => (
								<ShippingMethodRow key={method.id} {...method} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
