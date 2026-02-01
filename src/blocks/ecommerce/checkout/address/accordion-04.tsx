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
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
	Truck,
	Clock,
	Zap,
	Leaf,
	ArrowRight,
	CheckCircle2,
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

interface ShippingOptionProps {
	value: string;
	icon: React.ElementType;
	label: string;
	description: string;
	time: string;
	price: string;
	tag?: string;
}

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

const ShippingOption = ({
	value,
	icon: Icon,
	label,
	description,
	time,
	price,
	tag,
}: ShippingOptionProps) => (
	<label className="flex items-start gap-4 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
		<RadioGroupItem value={value} className="mt-1" />
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2 mb-1">
				<span className="font-medium">{label}</span>
				{tag && (
					<Badge
						variant="secondary"
						className="text-xs bg-green-500/10 text-green-600 dark:text-green-400"
					>
						{tag}
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
			<div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
				<Clock className="size-3" />
				<span>{time}</span>
			</div>
		</div>
		<span className="font-bold text-lg">{price}</span>
	</label>
);

const AddressFormSection = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4 pt-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Email" placeholder="john@example.com" type="email" />
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<Separator />
		<SelectField
			label="Country"
			placeholder="Select country"
			options={countries}
		/>
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
	</div>
);

const ShippingMethodSection = () => (
	<div className="pt-4">
		<RadioGroup defaultValue="standard" className="space-y-3">
			<ShippingOption
				value="express"
				icon={Zap}
				label="Express Delivery"
				description="Priority handling with guaranteed delivery"
				time="1-2 business days"
				price="$19.99"
			/>
			<ShippingOption
				value="standard"
				icon={Truck}
				label="Standard Shipping"
				description="Regular delivery with tracking"
				time="3-5 business days"
				price="FREE"
				tag="Recommended"
			/>
			<ShippingOption
				value="eco"
				icon={Leaf}
				label="Eco-Friendly"
				description="Carbon-neutral delivery option"
				time="5-7 business days"
				price="FREE"
				tag="Green"
			/>
		</RadioGroup>
	</div>
);

const ReviewSection = () => (
	<div className="pt-4 space-y-4">
		<div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
			<CheckCircle2 className="size-5 text-green-500 shrink-0 mt-0.5" />
			<div>
				<p className="font-medium">John Doe</p>
				<p className="text-sm text-muted-foreground">
					123 Main Street, Apt 4B, San Francisco, CA 94102
				</p>
				<p className="text-sm text-muted-foreground">
					john@example.com • +1 (555) 000-0000
				</p>
			</div>
		</div>
		<div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
			<CheckCircle2 className="size-5 text-green-500 shrink-0 mt-0.5" />
			<div>
				<p className="font-medium">Standard Shipping</p>
				<p className="text-sm text-muted-foreground">
					Estimated delivery: 3-5 business days • FREE
				</p>
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
				<h1 className="text-2xl @md:text-3xl font-bold text-center mb-8">
					Complete Your Order
				</h1>

				<Accordion type="single" collapsible defaultValue="address">
					<AccordionItem
						value="address"
						className="border rounded-xl px-4 mb-4"
					>
						<AccordionTrigger className="hover:no-underline py-4">
							<span className="font-semibold">1. Shipping Address</span>
						</AccordionTrigger>
						<AccordionContent>
							<AddressFormSection countries={countries} states={states} />
						</AccordionContent>
					</AccordionItem>

					<AccordionItem
						value="shipping"
						className="border rounded-xl px-4 mb-4"
					>
						<AccordionTrigger className="hover:no-underline py-4">
							<span className="font-semibold">2. Shipping Method</span>
						</AccordionTrigger>
						<AccordionContent>
							<ShippingMethodSection />
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="review" className="border rounded-xl px-4 mb-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<span className="font-semibold">3. Review</span>
						</AccordionTrigger>
						<AccordionContent>
							<ReviewSection />
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<Button size="lg" className="w-full gap-2">
					Proceed to Payment
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
