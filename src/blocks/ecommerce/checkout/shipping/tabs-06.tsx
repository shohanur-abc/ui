import { User, MapPin, Truck, Check, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const FormField = ({
	label,
	placeholder,
	type = 'text',
	half,
}: {
	label: string;
	placeholder: string;
	type?: string;
	half?: boolean;
}) => (
	<div className={half ? 'flex-1' : 'w-full'}>
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} className="mt-1.5 h-10" />
	</div>
);

const SavedAddress = ({
	value,
	type,
	name,
	address,
}: {
	value: string;
	type: string;
	name: string;
	address: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div>
			<div className="flex items-center gap-2">
				<span className="font-medium">{type}</span>
			</div>
			<p className="text-sm text-muted-foreground">{name}</p>
			<p className="text-sm text-muted-foreground">{address}</p>
		</div>
	</Label>
);

const ShippingMethod = ({
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
		className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<div className="flex items-center gap-3">
			<RadioGroupItem value={value} id={value} />
			<div>
				<span className="font-medium">{name}</span>
				<p className="text-sm text-muted-foreground">{time}</p>
			</div>
		</div>
		<span className="font-bold text-primary">{price}</span>
	</Label>
);

export default function Main() {
	const savedAddresses = [
		{ value: 'home', type: 'Home', name: 'John Doe', address: '123 Main St, New York, NY 10001' },
		{ value: 'work', type: 'Work', name: 'John Doe', address: '456 Business Ave, New York, NY 10002' },
	];

	const shippingMethods = [
		{ value: 'standard', name: 'Standard', time: '5-7 business days', price: 'Free' },
		{ value: 'express', name: 'Express', time: '2-3 business days', price: '$12.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-8">Shipping Information</h1>

				<Tabs defaultValue="new" className="w-full">
					<TabsList className="grid w-full grid-cols-2 mb-6">
						<TabsTrigger value="new" className="gap-2">
							<Plus className="size-4" />
							New Address
						</TabsTrigger>
						<TabsTrigger value="saved" className="gap-2">
							<MapPin className="size-4" />
							Saved Addresses
						</TabsTrigger>
					</TabsList>

					<TabsContent value="new">
						<Card>
							<CardHeader>
								<CardTitle className="text-base flex items-center gap-2">
									<User className="size-5 text-primary" />
									Contact Details
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex flex-col @sm:flex-row gap-4">
									<FormField label="First Name" placeholder="John" half />
									<FormField label="Last Name" placeholder="Doe" half />
								</div>
								<FormField label="Email" placeholder="john@example.com" type="email" />
								<FormField label="Phone" placeholder="+1 (555) 123-4567" type="tel" />
							</CardContent>
						</Card>

						<Card className="mt-4">
							<CardHeader>
								<CardTitle className="text-base flex items-center gap-2">
									<MapPin className="size-5 text-primary" />
									Shipping Address
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<FormField label="Street Address" placeholder="123 Main Street" />
								<FormField label="Apartment, Suite, etc." placeholder="Apt 4B (optional)" />
								<div className="flex flex-col @sm:flex-row gap-4">
									<FormField label="City" placeholder="New York" half />
									<FormField label="ZIP Code" placeholder="10001" half />
								</div>
								<div className="flex items-center gap-2 pt-2">
									<Checkbox id="save-address" />
									<Label htmlFor="save-address" className="text-sm cursor-pointer">
										Save this address for future orders
									</Label>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="saved">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Select Address</CardTitle>
							</CardHeader>
							<CardContent>
								<RadioGroup defaultValue="home" className="space-y-3">
									{savedAddresses.map((addr) => (
										<SavedAddress key={addr.value} {...addr} />
									))}
								</RadioGroup>
								<Button variant="outline" className="w-full mt-4 gap-2">
									<Plus className="size-4" />
									Add New Address
								</Button>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				<Card className="mt-6">
					<CardHeader>
						<CardTitle className="text-base flex items-center gap-2">
							<Truck className="size-5 text-primary" />
							Shipping Method
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="express" className="space-y-3">
							{shippingMethods.map((method) => (
								<ShippingMethod key={method.value} {...method} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
