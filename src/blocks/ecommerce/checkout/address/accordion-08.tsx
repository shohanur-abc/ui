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
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import {
	Building2,
	Truck,
	Clock,
	Package,
	AlertCircle,
	ArrowRight,
} from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
	required?: boolean;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}

const Field = ({ label, placeholder, type = 'text', required }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">
			{label}
			{required && <span className="text-red-500 ml-1">*</span>}
		</Label>
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

const BusinessInfoHeader = ({
	icon: Icon,
	title,
}: {
	icon: React.ElementType;
	title: string;
}) => (
	<div className="flex items-center gap-3 flex-1">
		<div className="size-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<span className="font-semibold">{title}</span>
	</div>
);

const BusinessDetailsSection = () => (
	<div className="space-y-4 pt-4">
		<Field label="Company Name" placeholder="Acme Corporation" required />
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Tax ID / VAT" placeholder="XX-XXXXXXX" />
			<Field label="DUNS Number" placeholder="Optional" />
		</div>
		<Field label="Attention / Department" placeholder="e.g., Purchasing Dept" />
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Contact Name" placeholder="Jane Smith" required />
			<Field
				label="Contact Email"
				placeholder="jane@acme.com"
				type="email"
				required
			/>
		</div>
		<Field
			label="Contact Phone"
			placeholder="+1 (555) 000-0000"
			type="tel"
			required
		/>
	</div>
);

const BusinessAddressSection = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4 pt-4">
		<SelectField
			label="Country"
			placeholder="Select country"
			options={countries}
		/>
		<Field label="Street Address" placeholder="Business address" required />
		<Field label="Suite / Floor" placeholder="Suite 500 (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" required />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" required />
		</div>
		<div className="flex items-center justify-between py-4 border-t">
			<div>
				<Label className="font-medium">Loading dock available?</Label>
				<p className="text-xs text-muted-foreground">
					Required for freight deliveries
				</p>
			</div>
			<Switch />
		</div>
	</div>
);

const DeliveryRestrictionsSection = () => {
	const timeSlots = [
		{ value: 'business', label: 'Business Hours (9AM - 5PM)' },
		{ value: 'morning', label: 'Morning Only (9AM - 12PM)' },
		{ value: 'afternoon', label: 'Afternoon Only (12PM - 5PM)' },
	];

	return (
		<div className="space-y-4 pt-4">
			<SelectField
				label="Delivery Window"
				placeholder="Select preferred time"
				options={timeSlots}
			/>
			<div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
				<div className="flex items-start gap-3">
					<AlertCircle className="size-5 text-yellow-500 shrink-0 mt-0.5" />
					<div className="text-sm">
						<p className="font-medium text-yellow-600 dark:text-yellow-400">
							Business Address Requirements
						</p>
						<ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
							<li>Someone must be present to sign for delivery</li>
							<li>Forklift or loading dock may be required for large orders</li>
							<li>Weekend deliveries available for additional fee</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Checkbox id="appointment" />
				<Label
					htmlFor="appointment"
					className="text-sm font-normal cursor-pointer"
				>
					Require delivery appointment
				</Label>
			</div>
			<div className="flex items-center gap-2">
				<Checkbox id="liftgate" />
				<Label
					htmlFor="liftgate"
					className="text-sm font-normal cursor-pointer"
				>
					Liftgate service needed (+$75)
				</Label>
			</div>
		</div>
	);
};

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
				<div className="flex items-center gap-3 mb-8">
					<Badge variant="outline" className="text-primary border-primary">
						B2B
					</Badge>
					<h1 className="text-2xl @md:text-3xl font-bold">Business Shipping</h1>
				</div>

				<Card>
					<CardContent className="pt-6">
						<Accordion type="multiple" defaultValue={['business', 'address']}>
							<AccordionItem value="business">
								<AccordionTrigger className="hover:no-underline">
									<BusinessInfoHeader
										icon={Building2}
										title="Business Information"
									/>
								</AccordionTrigger>
								<AccordionContent>
									<BusinessDetailsSection />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="address">
								<AccordionTrigger className="hover:no-underline">
									<BusinessInfoHeader icon={Package} title="Delivery Address" />
								</AccordionTrigger>
								<AccordionContent>
									<BusinessAddressSection
										countries={countries}
										states={states}
									/>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="restrictions">
								<AccordionTrigger className="hover:no-underline">
									<BusinessInfoHeader
										icon={Clock}
										title="Delivery Requirements"
									/>
								</AccordionTrigger>
								<AccordionContent>
									<DeliveryRestrictionsSection />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8 gap-2">
					Request Quote
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
