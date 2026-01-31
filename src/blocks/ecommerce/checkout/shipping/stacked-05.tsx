import { Truck, Clock, MapPin, Package, Phone, AlertCircle, Check, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

const FormField = ({
	label,
	placeholder,
	type = 'text',
	required,
}: {
	label: string;
	placeholder: string;
	type?: string;
	required?: boolean;
}) => (
	<div className="space-y-1.5">
		<Label className="text-sm">
			{label}
			{required && <span className="text-destructive ml-1">*</span>}
		</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const DeliveryMethod = ({
	value,
	icon: Icon,
	name,
	description,
	time,
	price,
	popular,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	description: string;
	time: string;
	price: string;
	popular?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="relative flex items-start gap-4 p-5 border-2 rounded-xl cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		{popular && <Badge className="absolute -top-2.5 right-4">Popular</Badge>}
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
			<Icon className="size-6" />
		</div>
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-semibold">{name}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
				<span className="text-lg font-bold text-primary shrink-0">{price}</span>
			</div>
			<div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
				<Clock className="size-3.5" />
				<span>{time}</span>
			</div>
		</div>
	</Label>
);

export default function Main() {
	const deliveryMethods = [
		{
			value: 'standard',
			icon: Package,
			name: 'Standard Delivery',
			description: 'Reliable and economical',
			time: '5-7 business days',
			price: '$5.99',
		},
		{
			value: 'express',
			icon: Truck,
			name: 'Express Delivery',
			description: 'Fast and tracked',
			time: '2-3 business days',
			price: '$12.99',
			popular: true,
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-2">Shipping Details</h1>
				<p className="text-muted-foreground mb-8">Enter your delivery information</p>

				{/* Contact Info */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Phone className="size-5 text-primary" />
							Contact Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid @sm:grid-cols-2 gap-4">
							<FormField label="First Name" placeholder="John" required />
							<FormField label="Last Name" placeholder="Doe" required />
						</div>
						<FormField label="Email" placeholder="john@example.com" type="email" required />
						<FormField label="Phone Number" placeholder="+1 (555) 123-4567" type="tel" required />
					</CardContent>
				</Card>

				{/* Address */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<MapPin className="size-5 text-primary" />
							Shipping Address
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField label="Street Address" placeholder="123 Main Street" required />
						<FormField label="Apartment, Suite, etc." placeholder="Apt 4B (optional)" />
						<div className="grid @sm:grid-cols-2 gap-4">
							<FormField label="City" placeholder="New York" required />
							<FormField label="State / Province" placeholder="NY" required />
						</div>
						<div className="grid @sm:grid-cols-2 gap-4">
							<FormField label="ZIP / Postal Code" placeholder="10001" required />
							<FormField label="Country" placeholder="United States" required />
						</div>
					</CardContent>
				</Card>

				{/* Delivery Instructions */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="text-lg">Delivery Instructions</CardTitle>
					</CardHeader>
					<CardContent>
						<Textarea
							placeholder="Leave at door, ring doorbell, etc. (optional)"
							rows={3}
						/>
					</CardContent>
				</Card>

				{/* Shipping Method */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Truck className="size-5 text-primary" />
							Delivery Method
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="express" className="space-y-4">
							{deliveryMethods.map((method) => (
								<DeliveryMethod key={method.value} {...method} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<Alert className="mb-6">
					<AlertCircle className="size-4" />
					<AlertDescription>
						Your information is securely encrypted and protected.
					</AlertDescription>
				</Alert>

				<Button className="w-full h-12 text-base">
					Continue to Payment
					<ChevronRight className="size-5 ml-2" />
				</Button>
			</div>
		</section>
	);
}
