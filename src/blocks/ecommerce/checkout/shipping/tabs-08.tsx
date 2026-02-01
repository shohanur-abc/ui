import {
	Box,
	Truck,
	Warehouse,
	Timer,
	Clock,
	Check,
	MapPin,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const DeliveryOption = ({
	value,
	icon: Icon,
	name,
	description,
	time,
	price,
	badge,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	description: string;
	time: string;
	price: string;
	badge?: string;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card className="relative transition-all hover:shadow-md hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
			{badge && <Badge className="absolute -top-2.5 right-4">{badge}</Badge>}
			<CardContent className="p-5">
				<div className="flex items-start gap-4">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<Icon className="size-6" />
					</div>
					<div className="flex-1">
						<h3 className="font-semibold text-lg">{name}</h3>
						<p className="text-sm text-muted-foreground mb-2">{description}</p>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Clock className="size-4" />
							<span>{time}</span>
						</div>
					</div>
					<div className="text-right">
						<span className="text-xl font-bold text-primary">{price}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const PickupPoint = ({
	value,
	name,
	address,
	hours,
	distance,
}: {
	value: string;
	name: string;
	address: string;
	hours: string;
	distance: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex-1">
			<div className="flex items-center justify-between mb-1">
				<span className="font-medium">{name}</span>
				<Badge variant="outline">{distance}</Badge>
			</div>
			<p className="text-sm text-muted-foreground">{address}</p>
			<p className="text-sm text-muted-foreground mt-1">{hours}</p>
		</div>
	</Label>
);

const LockerLocation = ({
	value,
	id,
	address,
	available,
}: {
	value: string;
	id: string;
	address: string;
	available: number;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} />
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
			<Box className="size-5 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<span className="font-medium">Locker {id}</span>
			<p className="text-sm text-muted-foreground">{address}</p>
		</div>
		<Badge variant="secondary" className="shrink-0">
			{available} available
		</Badge>
	</Label>
);

export default function Main() {
	const deliveryOptions = [
		{
			value: 'standard',
			icon: Truck,
			name: 'Home Delivery',
			description: 'Delivered to your doorstep',
			time: '3-5 business days',
			price: '$5.99',
		},
		{
			value: 'express',
			icon: Timer,
			name: 'Express Delivery',
			description: 'Fast and tracked',
			time: '1-2 business days',
			price: '$12.99',
			badge: 'Fastest',
		},
	];

	const pickupPoints = [
		{
			value: 'store-1',
			name: 'Main Street Store',
			address: '123 Main St',
			hours: 'Open until 9 PM',
			distance: '0.3 mi',
		},
		{
			value: 'store-2',
			name: 'Central Mall',
			address: '456 Central Ave',
			hours: 'Open until 10 PM',
			distance: '0.8 mi',
		},
	];

	const lockerLocations = [
		{ value: 'locker-1', id: 'NYC-001', address: '100 Broadway', available: 5 },
		{
			value: 'locker-2',
			id: 'NYC-002',
			address: '200 5th Avenue',
			available: 12,
		},
		{ value: 'locker-3', id: 'NYC-003', address: '300 Park Ave', available: 3 },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						How Would You Like to Receive Your Order?
					</h1>
					<p className="text-muted-foreground">
						Choose delivery, pickup, or locker
					</p>
				</div>

				<Tabs defaultValue="delivery" className="w-full">
					<TabsList className="grid w-full grid-cols-3 mb-8">
						<TabsTrigger value="delivery" className="gap-2">
							<Truck className="size-4" />
							Delivery
						</TabsTrigger>
						<TabsTrigger value="pickup" className="gap-2">
							<Warehouse className="size-4" />
							Pickup
						</TabsTrigger>
						<TabsTrigger value="locker" className="gap-2">
							<Box className="size-4" />
							Locker
						</TabsTrigger>
					</TabsList>

					<TabsContent value="delivery">
						<RadioGroup defaultValue="standard" className="space-y-4">
							{deliveryOptions.map((option) => (
								<DeliveryOption key={option.value} {...option} />
							))}
						</RadioGroup>
					</TabsContent>

					<TabsContent value="pickup">
						<Card className="mb-4 bg-muted/30">
							<CardContent className="p-4">
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Check className="size-4 text-primary" />
									<span>Free pickup at all locations</span>
								</div>
							</CardContent>
						</Card>
						<RadioGroup defaultValue="store-1" className="space-y-3">
							{pickupPoints.map((point) => (
								<PickupPoint key={point.value} {...point} />
							))}
						</RadioGroup>
					</TabsContent>

					<TabsContent value="locker">
						<Card className="mb-4 bg-muted/30">
							<CardContent className="p-4">
								<p className="text-sm text-muted-foreground">
									Pick up anytime with your unique code. Free for orders over
									$35.
								</p>
							</CardContent>
						</Card>
						<RadioGroup defaultValue="locker-1" className="space-y-3">
							{lockerLocations.map((locker) => (
								<LockerLocation key={locker.value} {...locker} />
							))}
						</RadioGroup>
					</TabsContent>
				</Tabs>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">
						Back
					</Button>
					<Button className="flex-1">Continue</Button>
				</div>
			</div>
		</section>
	);
}
