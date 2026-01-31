'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	MapPin,
	FileText,
	Package,
	ChevronRight,
	Edit,
	CheckCircle,
} from 'lucide-react';

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

interface StepHeaderProps {
	number: number;
	icon: React.ElementType;
	title: string;
	completed?: boolean;
	summary?: string;
}

const StepHeader = ({
	number,
	icon: Icon,
	title,
	completed,
	summary,
}: StepHeaderProps) => (
	<div className="flex items-center gap-4 flex-1">
		<div
			className={`size-12 rounded-full flex items-center justify-center font-bold ${
				completed
					? 'bg-green-500 text-white'
					: 'bg-primary/10 text-primary'
			}`}
		>
			{completed ? <CheckCircle className="size-6" /> : number}
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<Icon className="size-4 text-muted-foreground" />
				<h3 className="font-semibold">{title}</h3>
			</div>
			{summary && (
				<p className="text-sm text-muted-foreground mt-0.5">{summary}</p>
			)}
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

const ContactForm = () => (
	<div className="grid @sm:grid-cols-2 gap-4 pt-4 pl-16">
		<Field label="First Name" placeholder="John" />
		<Field label="Last Name" placeholder="Doe" />
		<Field label="Email" placeholder="john@example.com" type="email" />
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
	</div>
);

const AddressForm = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4 pt-4 pl-16">
		<SelectField label="Country" placeholder="Select country" options={countries} />
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
	</div>
);

const BillingOptions = () => (
	<div className="space-y-4 pt-4 pl-16">
		<div className="flex items-center gap-2">
			<Checkbox id="same-shipping" defaultChecked />
			<Label htmlFor="same-shipping" className="text-sm font-normal cursor-pointer">
				Same as shipping address
			</Label>
		</div>
		<div className="p-4 rounded-lg bg-muted/30 border border-border">
			<p className="text-sm text-muted-foreground">
				Your billing address will be the same as your shipping address. 
				Uncheck the box above to enter a different billing address.
			</p>
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
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="mb-8">
					<Badge variant="outline" className="mb-4">
						Step 1 of 3
					</Badge>
					<h1 className="text-2xl @md:text-3xl font-bold">
						Shipping Information
					</h1>
					<p className="text-muted-foreground mt-2">
						Complete all sections below to proceed
					</p>
				</div>

				<Card>
					<CardContent className="pt-6">
						<Accordion type="multiple" defaultValue={['contact', 'address']}>
							<AccordionItem value="contact">
								<AccordionTrigger className="hover:no-underline">
									<StepHeader
										number={1}
										icon={FileText}
										title="Contact Information"
									/>
								</AccordionTrigger>
								<AccordionContent>
									<ContactForm />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="address">
								<AccordionTrigger className="hover:no-underline">
									<StepHeader
										number={2}
										icon={MapPin}
										title="Shipping Address"
									/>
								</AccordionTrigger>
								<AccordionContent>
									<AddressForm countries={countries} states={states} />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="billing">
								<AccordionTrigger className="hover:no-underline">
									<StepHeader
										number={3}
										icon={Package}
										title="Billing Address"
									/>
								</AccordionTrigger>
								<AccordionContent>
									<BillingOptions />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>

				<div className="flex gap-4 mt-8">
					<Button variant="outline" size="lg" className="flex-1">
						Back to Cart
					</Button>
					<Button size="lg" className="flex-1 gap-2">
						Continue to Shipping
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
