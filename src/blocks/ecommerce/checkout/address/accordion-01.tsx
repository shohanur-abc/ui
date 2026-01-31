'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, User, Truck, CheckCircle2 } from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}

interface AccordionHeaderProps {
	icon: React.ElementType;
	title: string;
	subtitle: string;
	completed?: boolean;
}

const AccordionHeader = ({
	icon: Icon,
	title,
	subtitle,
	completed,
}: AccordionHeaderProps) => (
	<div className="flex items-center gap-3 flex-1">
		<div
			className={`size-10 rounded-lg flex items-center justify-center ${
				completed ? 'bg-green-500/10' : 'bg-primary/10'
			}`}
		>
			{completed ? (
				<CheckCircle2 className="size-5 text-green-500" />
			) : (
				<Icon className="size-5 text-primary" />
			)}
		</div>
		<div>
			<h3 className="font-semibold">{title}</h3>
			<p className="text-sm text-muted-foreground">{subtitle}</p>
		</div>
	</div>
);

const Field = ({ label, placeholder, type = 'text' }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const SelectField = ({ label, placeholder, options }: SelectFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Select>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const ContactSection = () => (
	<div className="space-y-4 pt-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Email" placeholder="john@example.com" type="email" />
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
	</div>
);

const AddressSection = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4 pt-4">
		<SelectField label="Country" placeholder="Select country" options={countries} />
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="same-billing" defaultChecked />
			<Label htmlFor="same-billing" className="text-sm font-normal cursor-pointer">
				Billing address same as shipping
			</Label>
		</div>
	</div>
);

const DeliverySection = () => (
	<div className="space-y-4 pt-4">
		<div className="p-4 rounded-lg border border-border">
			<div className="flex items-center justify-between">
				<div>
					<p className="font-medium">Standard Shipping</p>
					<p className="text-sm text-muted-foreground">3-5 business days</p>
				</div>
				<span className="font-bold text-primary">FREE</span>
			</div>
		</div>
		<div className="p-4 rounded-lg border border-border">
			<div className="flex items-center justify-between">
				<div>
					<p className="font-medium">Express Delivery</p>
					<p className="text-sm text-muted-foreground">1-2 business days</p>
				</div>
				<span className="font-bold">$14.99</span>
			</div>
		</div>
	</div>
);

export default function Main() {
	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold mb-2">
						Checkout
					</h1>
					<p className="text-muted-foreground">
						Complete your order details below
					</p>
				</div>

				<Card>
					<CardContent className="pt-6">
						<Accordion type="single" collapsible defaultValue="contact">
							<AccordionItem value="contact">
								<AccordionTrigger className="hover:no-underline">
									<AccordionHeader
										icon={User}
										title="Contact Information"
										subtitle="How can we reach you?"
									/>
								</AccordionTrigger>
								<AccordionContent>
									<ContactSection />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="address">
								<AccordionTrigger className="hover:no-underline">
									<AccordionHeader
										icon={MapPin}
										title="Shipping Address"
										subtitle="Where should we deliver?"
									/>
								</AccordionTrigger>
								<AccordionContent>
									<AddressSection countries={countries} states={states} />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="delivery">
								<AccordionTrigger className="hover:no-underline">
									<AccordionHeader
										icon={Truck}
										title="Delivery Method"
										subtitle="Choose your shipping speed"
									/>
								</AccordionTrigger>
								<AccordionContent>
									<DeliverySection />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8">
					Continue to Payment
				</Button>
			</div>
		</section>
	);
}
