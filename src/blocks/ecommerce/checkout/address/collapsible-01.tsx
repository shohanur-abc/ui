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
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import {
	ChevronDown,
	ChevronUp,
	MapPin,
	Plus,
	ArrowRight,
} from 'lucide-react';
import { useState } from 'react';

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

const CollapsibleSection = ({
	title,
	icon: Icon,
	defaultOpen,
	children,
}: {
	title: string;
	icon: React.ElementType;
	defaultOpen?: boolean;
	children: React.ReactNode;
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen || false);

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<CollapsibleTrigger asChild>
				<button
					type="button"
					className="flex items-center justify-between w-full p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
				>
					<div className="flex items-center gap-3">
						<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
							<Icon className="size-5 text-primary" />
						</div>
						<span className="font-medium">{title}</span>
					</div>
					{isOpen ? (
						<ChevronUp className="size-5 text-muted-foreground" />
					) : (
						<ChevronDown className="size-5 text-muted-foreground" />
					)}
				</button>
			</CollapsibleTrigger>
			<CollapsibleContent className="pt-4">{children}</CollapsibleContent>
		</Collapsible>
	);
};

const AddressForm = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<Card>
		<CardContent className="pt-6 space-y-4">
			<div className="grid @sm:grid-cols-2 gap-4">
				<Field label="First Name" placeholder="John" />
				<Field label="Last Name" placeholder="Doe" />
			</div>
			<Field label="Email" placeholder="john@example.com" type="email" />
			<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
			<SelectField label="Country" placeholder="Select country" options={countries} />
			<Field label="Street Address" placeholder="123 Main Street" />
			<div className="grid @sm:grid-cols-3 gap-4">
				<Field label="City" placeholder="City" />
				<SelectField label="State" placeholder="State" options={states} />
				<Field label="ZIP" placeholder="12345" />
			</div>
		</CardContent>
	</Card>
);

const OptionalAddressFields = () => (
	<div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border">
		<Field label="Company Name" placeholder="Company (Optional)" />
		<Field label="Apt / Suite / Floor" placeholder="Apt 4B (Optional)" />
		<Field
			label="Delivery Instructions"
			placeholder="e.g., Leave at front door"
		/>
	</div>
);

const SaveAddressOptions = () => (
	<div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
		<div className="flex items-center gap-2">
			<Checkbox id="save-addr" defaultChecked />
			<Label htmlFor="save-addr" className="text-sm font-normal cursor-pointer">
				Save this address for future orders
			</Label>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="default-addr" />
			<Label htmlFor="default-addr" className="text-sm font-normal cursor-pointer">
				Set as my default shipping address
			</Label>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="billing-same" defaultChecked />
			<Label htmlFor="billing-same" className="text-sm font-normal cursor-pointer">
				Billing address same as shipping
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
				<div className="text-center mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold mb-2">
						Shipping Address
					</h1>
					<p className="text-muted-foreground">
						Enter your delivery information
					</p>
				</div>

				<div className="space-y-4">
					<AddressForm countries={countries} states={states} />

					<CollapsibleSection title="Additional Details" icon={Plus}>
						<OptionalAddressFields />
					</CollapsibleSection>

					<CollapsibleSection title="Save Address Options" icon={MapPin} defaultOpen>
						<SaveAddressOptions />
					</CollapsibleSection>
				</div>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Shipping Method
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
