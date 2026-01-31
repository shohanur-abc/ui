import { Truck, Store, Box, MapPin, Clock, Check, ChevronRight, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const DeliveryTypeCard = ({
	value,
	icon: Icon,
	title,
	description,
	badge,
	selected,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	badge?: string;
	selected?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="flex-1 flex flex-col items-center gap-2 p-4 border-2 rounded-xl cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} className="sr-only" />
		<div className={`flex size-12 items-center justify-center rounded-xl transition-colors ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
			<Icon className="size-6" />
		</div>
		<span className="font-semibold">{title}</span>
		<span className="text-xs text-muted-foreground text-center">{description}</span>
		{badge && <Badge variant="secondary" className="text-xs">{badge}</Badge>}
	</Label>
);

const LocationItem = ({
	value,
	name,
	address,
	distance,
	hours,
	type,
}: {
	value: string;
	name: string;
	address: string;
	distance: string;
	hours: string;
	type: 'store' | 'locker';
}) => (
	<Label
		htmlFor={value}
		className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
			{type === 'store' ? <Store className="size-5 text-muted-foreground" /> : <Box className="size-5 text-muted-foreground" />}
		</div>
		<div className="flex-1">
			<div className="flex items-center justify-between mb-1">
				<span className="font-medium">{name}</span>
				<Badge variant="outline">{distance}</Badge>
			</div>
			<p className="text-sm text-muted-foreground">{address}</p>
			<div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
				<Clock className="size-3.5" />
				<span>{hours}</span>
			</div>
		</div>
	</Label>
);

const ShippingSpeed = ({
	value,
	name,
	time,
	price,
	free,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	free?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<div className="flex items-center gap-3">
			<RadioGroupItem value={value} id={value} />
			<div>
				<span className="font-medium">{name}</span>
				<div className="flex items-center gap-1 text-sm text-muted-foreground">
					<Clock className="size-3.5" />
					<span>{time}</span>
				</div>
			</div>
		</div>
		<span className={`font-bold ${free ? 'text-green-600 dark:text-green-400' : 'text-primary'}`}>
			{price}
		</span>
	</Label>
);

export default function Main() {
	const pickupLocations = [
		{ value: 'store-1', name: 'Main Street Store', address: '123 Main St, NY', distance: '0.3 mi', hours: 'Open until 9 PM', type: 'store' as const },
		{ value: 'store-2', name: 'Central Mall', address: '456 Central Ave, NY', distance: '0.8 mi', hours: 'Open until 10 PM', type: 'store' as const },
		{ value: 'locker-1', name: 'Locker NYC-001', address: '100 Broadway, NY', distance: '0.5 mi', hours: '24/7 Access', type: 'locker' as const },
	];

	const shippingSpeeds = [
		{ value: 'standard', name: 'Standard', time: '5-7 days', price: 'Free', free: true },
		{ value: 'express', name: 'Express', time: '2-3 days', price: '$12.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-2">How Would You Like to Receive Your Order?</h1>
				<p className="text-muted-foreground mb-8">Choose delivery or pickup</p>

				{/* Delivery Type */}
				<RadioGroup defaultValue="delivery" className="grid grid-cols-3 gap-3 mb-8">
					<DeliveryTypeCard
						value="delivery"
						icon={Truck}
						title="Delivery"
						description="To your door"
					/>
					<DeliveryTypeCard
						value="pickup"
						icon={Store}
						title="Store Pickup"
						description="Ready in 2 hours"
						badge="Free"
					/>
					<DeliveryTypeCard
						value="locker"
						icon={Box}
						title="Locker"
						description="24/7 pickup"
					/>
				</RadioGroup>

				<Separator className="my-6" />

				{/* Delivery Address (shown for delivery) */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<MapPin className="size-5 text-primary" />
							Delivering To
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="p-4 rounded-xl bg-muted/50">
							<div className="flex items-center justify-between mb-1">
								<span className="font-medium">John Doe</span>
								<Button variant="ghost" size="sm">Change</Button>
							</div>
							<p className="text-sm text-muted-foreground">123 Main Street, Apt 4B</p>
							<p className="text-sm text-muted-foreground">New York, NY 10001</p>
						</div>
					</CardContent>
				</Card>

				{/* Shipping Speed */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Truck className="size-5 text-primary" />
							Shipping Speed
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="express" className="space-y-3">
							{shippingSpeeds.map((speed) => (
								<ShippingSpeed key={speed.value} {...speed} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				{/* Nearby Pickup Locations (collapsed by default) */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Store className="size-5 text-primary" />
							Nearby Pickup Points
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="relative mb-4">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
							<Input placeholder="Search by ZIP code" className="pl-10" />
						</div>
						<RadioGroup className="space-y-3">
							{pickupLocations.map((location) => (
								<LocationItem key={location.value} {...location} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<Button className="w-full h-12 text-base">
					Continue
					<ChevronRight className="size-5 ml-2" />
				</Button>
			</div>
		</section>
	);
}
