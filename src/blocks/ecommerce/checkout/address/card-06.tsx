'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Plus, ChevronDown, ChevronUp } from 'lucide-react';
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

interface SavedAddressProps {
	id: string;
	label: string;
	address: string;
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

const SavedAddressOption = ({ id, label, address }: SavedAddressProps) => (
	<label className="flex items-center gap-3 p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
		<RadioGroupItem value={id} />
		<div className="flex-1 min-w-0">
			<p className="font-medium">{label}</p>
			<p className="text-sm text-muted-foreground truncate">{address}</p>
		</div>
	</label>
);

const ExpandableSection = ({
	title,
	icon: Icon,
	children,
	defaultOpen = false,
}: {
	title: string;
	icon: React.ElementType;
	children: React.ReactNode;
	defaultOpen?: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);
	return (
		<div className="border border-border rounded-xl overflow-hidden">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
			>
				<div className="flex items-center gap-3">
					<Icon className="size-5 text-primary" />
					<span className="font-medium">{title}</span>
				</div>
				{isOpen ? (
					<ChevronUp className="size-5 text-muted-foreground" />
				) : (
					<ChevronDown className="size-5 text-muted-foreground" />
				)}
			</button>
			{isOpen && (
				<div className="p-4 pt-0 border-t border-border">{children}</div>
			)}
		</div>
	);
};

export default function Main() {
	const savedAddresses = [
		{
			id: '1',
			label: 'Home',
			address: '123 Main Street, San Francisco, CA 94102',
		},
		{
			id: '2',
			label: 'Office',
			address: '456 Market Street, San Francisco, CA 94103',
		},
	];

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
					<h1 className="text-2xl @md:text-3xl font-bold">
						Delivery Address
					</h1>
					<p className="text-muted-foreground mt-1">
						Choose or add your shipping address
					</p>
				</div>

				<div className="space-y-4">
					<ExpandableSection icon={MapPin} title="Saved Addresses" defaultOpen>
						<RadioGroup defaultValue="1" className="space-y-3 mt-4">
							{savedAddresses.map((addr) => (
								<SavedAddressOption key={addr.id} {...addr} />
							))}
						</RadioGroup>
					</ExpandableSection>

					<ExpandableSection icon={Plus} title="Add New Address">
						<div className="space-y-4 mt-4">
							<div className="grid grid-cols-2 gap-4">
								<Field label="First Name" placeholder="John" />
								<Field label="Last Name" placeholder="Doe" />
							</div>
							<Field label="Email" placeholder="john@example.com" type="email" />
							<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
							<SelectField
								label="Country"
								placeholder="Select country"
								options={countries}
							/>
							<Field label="Street Address" placeholder="123 Main Street" />
							<Field label="Apt / Suite" placeholder="Optional" />
							<div className="grid grid-cols-3 gap-4">
								<Field label="City" placeholder="City" />
								<SelectField label="State" placeholder="State" options={states} />
								<Field label="ZIP" placeholder="12345" />
							</div>
							<div className="flex items-center gap-2 pt-2">
								<Checkbox id="save-new" />
								<Label htmlFor="save-new" className="text-sm font-normal cursor-pointer">
									Save this address for future orders
								</Label>
							</div>
						</div>
					</ExpandableSection>
				</div>

				<Card className="mt-6 bg-muted/30">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm text-muted-foreground">
							Delivery Estimate
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="font-medium">Standard Shipping: 3-5 Business Days</p>
						<p className="text-sm text-muted-foreground">
							Express options available at checkout
						</p>
					</CardContent>
				</Card>

				<div className="flex gap-3 mt-8">
					<Button variant="outline" size="lg" className="flex-1">
						Back
					</Button>
					<Button size="lg" className="flex-1">
						Continue
					</Button>
				</div>
			</div>
		</section>
	);
}
