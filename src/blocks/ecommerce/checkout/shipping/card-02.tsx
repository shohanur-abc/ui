import { Home, Building2, Store, MapPin, Clock, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const AddressCard = ({
	value,
	icon: Icon,
	type,
	name,
	address,
	phone,
	note,
	isDefault,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	type: string;
	name: string;
	address: string;
	phone: string;
	note?: string;
	isDefault?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				relative transition-all hover:border-primary/50 hover:shadow-md
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
			`}
		>
			<CardContent className="p-5">
				<div className="flex items-start gap-4">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
						<Icon className="size-5 text-muted-foreground" />
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-2">
							<span className="font-semibold">{type}</span>
							{isDefault && (
								<Badge variant="secondary" className="text-xs">
									Default
								</Badge>
							)}
						</div>
						<div className="space-y-1.5 text-sm">
							<p className="font-medium">{name}</p>
							<div className="flex items-start gap-2 text-muted-foreground">
								<MapPin className="size-4 shrink-0 mt-0.5" />
								<span>{address}</span>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground">
								<Phone className="size-4" />
								<span>{phone}</span>
							</div>
							{note && (
								<div className="flex items-center gap-2 text-muted-foreground">
									<Clock className="size-4" />
									<span>{note}</span>
								</div>
							)}
						</div>
					</div>
					<Button variant="ghost" size="sm">
						Edit
					</Button>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const AddNewCard = ({
	label,
	description,
}: {
	label: string;
	description: string;
}) => (
	<Card className="border-dashed hover:border-primary/50 transition-colors cursor-pointer">
		<CardContent className="p-5">
			<div className="flex flex-col items-center justify-center text-center py-6">
				<div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
					<MapPin className="size-6 text-muted-foreground" />
				</div>
				<span className="font-medium">{label}</span>
				<span className="text-sm text-muted-foreground">{description}</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const addresses = [
		{
			value: 'home',
			icon: Home,
			type: 'Home',
			name: 'John Doe',
			address: '123 Main Street, Apartment 4B, New York, NY 10001',
			phone: '+1 (555) 123-4567',
			isDefault: true,
		},
		{
			value: 'office',
			icon: Building2,
			type: 'Office',
			name: 'John Doe - Acme Corp',
			address: '456 Business Avenue, Floor 12, New York, NY 10002',
			phone: '+1 (555) 987-6543',
			note: 'Available 9 AM - 6 PM',
		},
		{
			value: 'pickup',
			icon: Store,
			type: 'Pickup Point',
			name: 'Downtown Locker Station',
			address: '789 Central Plaza, New York, NY 10003',
			phone: 'Open 24/7',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-2xl font-bold mb-2">Delivery Address</h1>
					<p className="text-muted-foreground">
						Select where you want your order delivered
					</p>
				</div>

				<RadioGroup defaultValue="home" className="space-y-4">
					{addresses.map((addr) => (
						<AddressCard key={addr.value} {...addr} />
					))}
				</RadioGroup>

				<div className="mt-6">
					<AddNewCard
						label="Add New Address"
						description="Save a new delivery location"
					/>
				</div>

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
