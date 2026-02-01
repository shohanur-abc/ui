'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
	Gift,
	Calendar,
	MessageSquare,
	MapPin,
	ArrowRight,
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

const AccordionSection = ({
	icon: Icon,
	title,
	badge,
	children,
}: {
	icon: React.ElementType;
	title: string;
	badge?: string;
	children: React.ReactNode;
}) => (
	<div className="flex items-center gap-3 flex-1">
		<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex items-center gap-2">
			<span className="font-semibold">{title}</span>
			{badge && (
				<Badge variant="secondary" className="text-xs">
					{badge}
				</Badge>
			)}
		</div>
	</div>
);

const AddressForm = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4 pt-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Recipient Name" placeholder="John Doe" />
			<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		</div>
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

const GiftOptionsSection = () => (
	<div className="space-y-4 pt-4">
		<div className="flex items-center gap-2">
			<Checkbox id="gift-wrap" />
			<Label htmlFor="gift-wrap" className="text-sm font-normal cursor-pointer">
				Add gift wrapping (+$5.99)
			</Label>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="gift-receipt" />
			<Label
				htmlFor="gift-receipt"
				className="text-sm font-normal cursor-pointer"
			>
				Include gift receipt (prices hidden)
			</Label>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="surprise" />
			<Label htmlFor="surprise" className="text-sm font-normal cursor-pointer">
				Make it a surprise (plain packaging)
			</Label>
		</div>
		<div className="p-4 rounded-lg bg-muted/30 border border-border">
			<p className="text-sm text-muted-foreground">
				🎁 Gift items will be wrapped in premium paper with a ribbon.
			</p>
		</div>
	</div>
);

const DeliveryScheduleSection = () => {
	const dates = [
		{ value: 'asap', label: 'As Soon As Possible' },
		{ value: 'tomorrow', label: 'Tomorrow' },
		{ value: 'specific', label: 'Choose a Date' },
	];

	const times = [
		{ value: 'morning', label: 'Morning (8AM - 12PM)' },
		{ value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
		{ value: 'evening', label: 'Evening (5PM - 9PM)' },
	];

	return (
		<div className="space-y-4 pt-4">
			<SelectField
				label="Delivery Date"
				placeholder="Select date preference"
				options={dates}
			/>
			<SelectField
				label="Preferred Time"
				placeholder="Select time window"
				options={times}
			/>
			<div className="flex items-center gap-2">
				<Checkbox id="leave-door" />
				<Label
					htmlFor="leave-door"
					className="text-sm font-normal cursor-pointer"
				>
					Leave at door if no one is home
				</Label>
			</div>
		</div>
	);
};

const DeliveryNotesSection = () => (
	<div className="space-y-4 pt-4">
		<div className="space-y-2">
			<Label className="text-sm">Delivery Instructions</Label>
			<Textarea
				placeholder="E.g., Ring doorbell, leave with neighbor, gate code is 1234..."
				className="min-h-[100px]"
			/>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="signature" />
			<Label htmlFor="signature" className="text-sm font-normal cursor-pointer">
				Require signature on delivery
			</Label>
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
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Delivery Details</CardTitle>
						<p className="text-sm text-muted-foreground">
							Customize your delivery experience
						</p>
					</CardHeader>
					<CardContent>
						<Accordion type="single" collapsible defaultValue="address">
							<AccordionItem value="address">
								<AccordionTrigger className="hover:no-underline">
									<AccordionSection icon={MapPin} title="Delivery Address" />
								</AccordionTrigger>
								<AccordionContent>
									<AddressForm countries={countries} states={states} />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="schedule">
								<AccordionTrigger className="hover:no-underline">
									<AccordionSection icon={Calendar} title="Delivery Schedule" />
								</AccordionTrigger>
								<AccordionContent>
									<DeliveryScheduleSection />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="gift">
								<AccordionTrigger className="hover:no-underline">
									<AccordionSection
										icon={Gift}
										title="Gift Options"
										badge="Optional"
									/>
								</AccordionTrigger>
								<AccordionContent>
									<GiftOptionsSection />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="notes">
								<AccordionTrigger className="hover:no-underline">
									<AccordionSection
										icon={MessageSquare}
										title="Delivery Notes"
										badge="Optional"
									/>
								</AccordionTrigger>
								<AccordionContent>
									<DeliveryNotesSection />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Payment
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
