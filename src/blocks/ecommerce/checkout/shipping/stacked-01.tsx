import { User, MapPin, Truck, CreditCard, Check, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

const SectionHeader = ({
	number,
	title,
	completed,
}: {
	number: number;
	title: string;
	completed?: boolean;
}) => (
	<div className="flex items-center gap-3 mb-4">
		<div className={`
			flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold
			${completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
		`}>
			{completed ? <Check className="size-4" /> : number}
		</div>
		<h2 className="text-lg font-semibold">{title}</h2>
	</div>
);

const FormField = ({
	label,
	placeholder,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div>
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} className="mt-1.5" />
	</div>
);

const ShippingOption = ({
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
		className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
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
	const shippingOptions = [
		{ value: 'standard', name: 'Standard', time: '5-7 business days', price: 'Free' },
		{ value: 'express', name: 'Express', time: '2-3 business days', price: '$9.99' },
		{ value: 'overnight', name: 'Overnight', time: 'Next business day', price: '$24.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-8">Checkout</h1>

				{/* Contact Section */}
				<Card className="mb-6">
					<CardHeader className="pb-2">
						<SectionHeader number={1} title="Contact Information" />
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid @sm:grid-cols-2 gap-4">
							<FormField label="First Name" placeholder="John" />
							<FormField label="Last Name" placeholder="Doe" />
						</div>
						<FormField label="Email" placeholder="john@example.com" type="email" />
						<FormField label="Phone" placeholder="+1 (555) 123-4567" type="tel" />
					</CardContent>
				</Card>

				{/* Address Section */}
				<Card className="mb-6">
					<CardHeader className="pb-2">
						<SectionHeader number={2} title="Shipping Address" />
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField label="Street Address" placeholder="123 Main Street" />
						<FormField label="Apartment, Suite, etc." placeholder="Apt 4B (optional)" />
						<div className="grid @sm:grid-cols-2 gap-4">
							<FormField label="City" placeholder="New York" />
							<FormField label="State" placeholder="NY" />
						</div>
						<div className="grid @sm:grid-cols-2 gap-4">
							<FormField label="ZIP Code" placeholder="10001" />
							<FormField label="Country" placeholder="United States" />
						</div>
					</CardContent>
				</Card>

				{/* Shipping Method Section */}
				<Card className="mb-6">
					<CardHeader className="pb-2">
						<SectionHeader number={3} title="Shipping Method" />
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="express" className="space-y-3">
							{shippingOptions.map((option) => (
								<ShippingOption key={option.value} {...option} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<Button className="w-full h-12 text-base">
					Continue to Payment
					<ChevronRight className="size-5 ml-2" />
				</Button>
			</div>
		</section>
	);
}
