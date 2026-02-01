import { Home, Building2, Store, MapPin, Plus, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const AddressCard = ({
	value,
	name,
	address,
	phone,
	isDefault,
}: {
	value: string;
	name: string;
	address: string;
	phone: string;
	isDefault?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card className="transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
			<CardContent className="p-4">
				<div className="flex items-start gap-3">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-1">
							<span className="font-semibold">{name}</span>
							{isDefault && (
								<Badge variant="secondary" className="text-xs">
									Default
								</Badge>
							)}
						</div>
						<p className="text-sm text-muted-foreground">{address}</p>
						<p className="text-sm text-muted-foreground mt-1">{phone}</p>
					</div>
					<Button variant="ghost" size="sm">
						Edit
					</Button>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const PickupLocation = ({
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
	<Label htmlFor={value} className="cursor-pointer block">
		<Card className="transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
			<CardContent className="p-4">
				<div className="flex items-start gap-3">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex-1">
						<div className="flex items-center justify-between mb-1">
							<span className="font-semibold">{name}</span>
							<Badge variant="outline">{distance}</Badge>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<MapPin className="size-3.5" />
							<span>{address}</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
							<Clock className="size-3.5" />
							<span>{hours}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const AddNewAddress = ({ label }: { label: string }) => (
	<Card className="border-dashed hover:border-primary/50 cursor-pointer transition-colors">
		<CardContent className="p-4">
			<div className="flex items-center gap-3 text-muted-foreground">
				<Plus className="size-5" />
				<span className="font-medium">{label}</span>
			</div>
		</CardContent>
	</Card>
);

const SearchLocation = ({ placeholder }: { placeholder: string }) => (
	<div className="relative mb-4">
		<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
		<Input placeholder={placeholder} className="pl-10 h-11" />
	</div>
);

export default function Main() {
	const homeAddresses = [
		{
			value: 'home-main',
			name: 'Home',
			address: '123 Main Street, Apt 4B, New York, NY 10001',
			phone: '+1 (555) 123-4567',
			isDefault: true,
		},
		{
			value: 'home-vacation',
			name: 'Vacation Home',
			address: '456 Beach Road, Miami, FL 33139',
			phone: '+1 (555) 987-6543',
		},
	];

	const officeAddresses = [
		{
			value: 'office-main',
			name: 'Main Office',
			address: '789 Business Ave, Floor 12, New York, NY 10002',
			phone: '+1 (555) 456-7890',
		},
	];

	const pickupLocations = [
		{
			value: 'store-downtown',
			name: 'Downtown Store',
			address: '100 Central Plaza',
			hours: 'Open 9 AM - 9 PM',
			distance: '0.5 mi',
		},
		{
			value: 'store-mall',
			name: 'City Mall',
			address: '500 Shopping Center',
			hours: 'Open 10 AM - 8 PM',
			distance: '1.2 mi',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Delivery Options
					</h1>
					<p className="text-muted-foreground">
						Where would you like to receive your order?
					</p>
				</div>

				<Tabs defaultValue="home" className="w-full">
					<TabsList className="grid w-full grid-cols-3 mb-6">
						<TabsTrigger value="home" className="gap-2">
							<Home className="size-4" />
							Home
						</TabsTrigger>
						<TabsTrigger value="office" className="gap-2">
							<Building2 className="size-4" />
							Office
						</TabsTrigger>
						<TabsTrigger value="pickup" className="gap-2">
							<Store className="size-4" />
							Pickup
						</TabsTrigger>
					</TabsList>

					<TabsContent value="home">
						<RadioGroup defaultValue="home-main" className="space-y-3">
							{homeAddresses.map((addr) => (
								<AddressCard key={addr.value} {...addr} />
							))}
						</RadioGroup>
						<div className="mt-4">
							<AddNewAddress label="Add new home address" />
						</div>
					</TabsContent>

					<TabsContent value="office">
						<RadioGroup defaultValue="office-main" className="space-y-3">
							{officeAddresses.map((addr) => (
								<AddressCard key={addr.value} {...addr} />
							))}
						</RadioGroup>
						<div className="mt-4">
							<AddNewAddress label="Add new office address" />
						</div>
					</TabsContent>

					<TabsContent value="pickup">
						<SearchLocation placeholder="Search by ZIP code or address" />
						<RadioGroup defaultValue="store-downtown" className="space-y-3">
							{pickupLocations.map((loc) => (
								<PickupLocation key={loc.value} {...loc} />
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
