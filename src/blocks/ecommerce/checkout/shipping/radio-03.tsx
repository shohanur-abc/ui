import { MapPin, Home, Building2, Store, Clock, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

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
		className="flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
			<Icon className="size-5 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2 mb-1">
				<span className="font-semibold">{type}</span>
				{isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
			</div>
			<p className="text-sm text-muted-foreground">{name}</p>
			<p className="text-sm text-muted-foreground">{address}</p>
		</div>
		<Button variant="ghost" size="sm">Edit</Button>
	</Label>
);

const PickupRadio = ({
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
		className="flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
			<Store className="size-5 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<div className="flex items-center justify-between mb-1">
				<span className="font-semibold">{name}</span>
				<Badge variant="outline">{distance}</Badge>
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
	const addresses = [
		{ value: 'home', icon: Home, type: 'Home', name: 'John Doe', address: '123 Main St, Apt 4B, New York, NY 10001', isDefault: true },
		{ value: 'work', icon: Building2, type: 'Work', name: 'John Doe', address: '456 Business Ave, Floor 12, New York, NY 10002' },
	];

	const pickupLocations = [
		{ value: 'store-1', name: 'Downtown Store', address: '100 Central Plaza', hours: 'Open 9 AM - 9 PM', distance: '0.3 mi' },
		{ value: 'store-2', name: 'City Mall', address: '500 Shopping Center', hours: 'Open 10 AM - 8 PM', distance: '0.8 mi' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-8">Where Should We Deliver?</h1>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="text-base flex items-center gap-2">
							<Home className="size-5 text-primary" />
							Saved Addresses
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="home" className="space-y-3">
							{addresses.map((addr) => (
								<AddressRadio key={addr.value} {...addr} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-base flex items-center gap-2">
							<Store className="size-5 text-primary" />
							Store Pickup (Free)
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup className="space-y-3">
							{pickupLocations.map((loc) => (
								<PickupRadio key={loc.value} {...loc} />
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
