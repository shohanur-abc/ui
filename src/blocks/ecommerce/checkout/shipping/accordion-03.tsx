import { Truck, Home, Building2, Store, MapPin, Clock, Plus, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const AddressRadio = ({
	value,
	icon: Icon,
	type,
	name,
	address,
	isDefault,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	type: string;
	name: string;
	address: string;
	isDefault?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
			<Icon className="size-5 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{type}</span>
				{isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
			</div>
			<p className="text-sm text-muted-foreground">{name}</p>
			<p className="text-sm text-muted-foreground">{address}</p>
		</div>
	</Label>
);

const ShippingRadio = ({
	value,
	name,
	time,
	price,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<div className="flex items-center gap-3">
			<RadioGroupItem value={value} id={value} />
			<span className="font-medium">{name}</span>
		</div>
		<div className="text-right">
			<span className="font-bold text-primary">{price}</span>
			<p className="text-xs text-muted-foreground">{time}</p>
		</div>
	</Label>
);

const PickupRadio = ({
	value,
	name,
	address,
	distance,
}: {
	value: string;
	name: string;
	address: string;
	distance: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<RadioGroupItem value={value} id={value} />
		<Store className="size-5 text-muted-foreground" />
		<div className="flex-1">
			<span className="font-medium">{name}</span>
			<p className="text-sm text-muted-foreground">{address}</p>
		</div>
		<Badge variant="outline">{distance}</Badge>
	</Label>
);

export default function Main() {
	const addresses = [
		{ value: 'home', icon: Home, type: 'Home', name: 'John Doe', address: '123 Main St, New York, NY 10001', isDefault: true },
		{ value: 'work', icon: Building2, type: 'Work', name: 'John Doe', address: '456 Business Ave, New York, NY 10002' },
	];

	const shippingOptions = [
		{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$5.99' },
		{ value: 'express', name: 'Express', time: '2-3 days', price: '$12.99' },
		{ value: 'overnight', name: 'Overnight', time: '1 day', price: '$24.99' },
	];

	const pickupLocations = [
		{ value: 'store-1', name: 'Downtown Store', address: '100 Central Plaza', distance: '0.3 mi' },
		{ value: 'store-2', name: 'City Mall', address: '500 Shopping Center', distance: '0.8 mi' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-8">Delivery Options</h1>

				<Accordion type="multiple" defaultValue={['addresses', 'shipping']} className="space-y-4">
					<AccordionItem value="addresses" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<MapPin className="size-5 text-primary" />
								<span className="font-semibold">Saved Addresses</span>
								<Badge variant="secondary">{addresses.length}</Badge>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<RadioGroup defaultValue="home" className="space-y-2">
								{addresses.map((addr) => (
									<AddressRadio key={addr.value} {...addr} />
								))}
							</RadioGroup>
							<Button variant="outline" className="w-full mt-3 gap-2">
								<Plus className="size-4" />
								Add New Address
							</Button>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="shipping" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<Truck className="size-5 text-primary" />
								<span className="font-semibold">Shipping Method</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<RadioGroup defaultValue="express" className="space-y-2">
								{shippingOptions.map((option) => (
									<ShippingRadio key={option.value} {...option} />
								))}
							</RadioGroup>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="pickup" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<Store className="size-5 text-primary" />
								<span className="font-semibold">Store Pickup</span>
								<Badge className="bg-green-600">Free</Badge>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<div className="relative mb-3">
								<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
								<Input placeholder="Enter ZIP code" className="pl-10" />
							</div>
							<RadioGroup className="space-y-2">
								{pickupLocations.map((loc) => (
									<PickupRadio key={loc.value} {...loc} />
								))}
							</RadioGroup>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
