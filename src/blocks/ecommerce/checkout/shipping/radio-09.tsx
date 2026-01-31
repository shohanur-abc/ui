import { Truck, Store, Box, MapPin, Clock, Check, Navigation } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const DeliveryTypeRadio = ({
	value,
	icon: Icon,
	title,
	subtitle,
	price,
	free,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	subtitle: string;
	price: string;
	free?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="flex-1 flex flex-col items-center gap-2 p-5 rounded-xl border-2 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} className="sr-only" />
		<div className="flex size-14 items-center justify-center rounded-2xl bg-muted has-[:checked]:bg-primary has-[:checked]:text-primary-foreground transition-colors">
			<Icon className="size-7" />
		</div>
		<span className="font-semibold text-lg">{title}</span>
		<span className="text-sm text-muted-foreground text-center">{subtitle}</span>
		<span className={`font-bold ${free ? 'text-green-600 dark:text-green-400' : 'text-primary'}`}>
			{price}
		</span>
	</Label>
);

const LocationRadio = ({
	value,
	name,
	address,
	distance,
	hours,
	available,
}: {
	value: string;
	name: string;
	address: string;
	distance: string;
	hours: string;
	available: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all
			${available ? 'hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5' : 'opacity-60 cursor-not-allowed'}
		`}
	>
		<RadioGroupItem value={value} id={value} className="mt-1" disabled={!available} />
		<div className="flex-1">
			<div className="flex items-center justify-between mb-1">
				<span className="font-medium">{name}</span>
				<Badge variant={available ? 'outline' : 'secondary'}>
					{available ? distance : 'Unavailable'}
				</Badge>
			</div>
			<div className="flex items-center gap-1 text-sm text-muted-foreground">
				<MapPin className="size-3.5" />
				<span>{address}</span>
			</div>
			<div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
				<Clock className="size-3.5" />
				<span>{hours}</span>
			</div>
		</div>
	</Label>
);

export default function Main() {
	const deliveryTypes = [
		{ value: 'delivery', icon: Truck, title: 'Delivery', subtitle: 'To your address', price: 'From $5.99' },
		{ value: 'store', icon: Store, title: 'Store Pickup', subtitle: 'Ready in 2 hours', price: 'Free', free: true },
		{ value: 'locker', icon: Box, title: 'Pickup Locker', subtitle: '24/7 access', price: '$1.99' },
	];

	const locations = [
		{ value: 'loc-1', name: 'Downtown Store', address: '123 Main Street', distance: '0.3 mi', hours: 'Open until 9 PM', available: true },
		{ value: 'loc-2', name: 'City Center Mall', address: '456 Shopping Ave', distance: '0.8 mi', hours: 'Open until 10 PM', available: true },
		{ value: 'loc-3', name: 'East Side Location', address: '789 East Blvd', distance: '1.5 mi', hours: 'Open until 8 PM', available: false },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">How Would You Like to Get Your Order?</h1>
					<p className="text-muted-foreground">Choose delivery or pickup</p>
				</div>

				<RadioGroup defaultValue="store" className="grid grid-cols-3 gap-4 mb-8">
					{deliveryTypes.map((type) => (
						<DeliveryTypeRadio key={type.value} {...type} />
					))}
				</RadioGroup>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center justify-between">
							<span>Pickup Locations</span>
							<Button variant="ghost" size="sm" className="gap-2">
								<Navigation className="size-4" />
								Use my location
							</Button>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="relative mb-4">
							<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
							<Input placeholder="Enter ZIP code or address" className="pl-10" />
						</div>
						<RadioGroup defaultValue="loc-1" className="space-y-3">
							{locations.map((loc) => (
								<LocationRadio key={loc.value} {...loc} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">Continue</Button>
				</div>
			</div>
		</section>
	);
}
