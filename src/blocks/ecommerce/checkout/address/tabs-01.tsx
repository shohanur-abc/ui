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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Truck, CreditCard, ArrowRight } from 'lucide-react';

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

const AddressForm = ({
	countries,
	states,
	type,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
	type: 'shipping' | 'billing';
}) => (
	<div className="space-y-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		{type === 'shipping' && (
			<Field label="Email" placeholder="john@example.com" type="email" />
		)}
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
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
		{type === 'shipping' && (
			<div className="flex items-center gap-2 pt-2">
				<Checkbox id="save-shipping" />
				<Label
					htmlFor="save-shipping"
					className="text-sm font-normal cursor-pointer"
				>
					Save for future orders
				</Label>
			</div>
		)}
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
						Address Information
					</h1>
					<p className="text-muted-foreground">
						Enter your shipping and billing details
					</p>
				</div>

				<Card>
					<CardContent className="pt-6">
						<Tabs defaultValue="shipping">
							<TabsList className="w-full grid grid-cols-2 mb-6">
								<TabsTrigger value="shipping" className="gap-2">
									<Truck className="size-4" />
									Shipping
								</TabsTrigger>
								<TabsTrigger value="billing" className="gap-2">
									<CreditCard className="size-4" />
									Billing
								</TabsTrigger>
							</TabsList>

							<TabsContent value="shipping">
								<AddressForm
									countries={countries}
									states={states}
									type="shipping"
								/>
							</TabsContent>

							<TabsContent value="billing">
								<div className="flex items-center gap-2 mb-6">
									<Checkbox id="same-billing" defaultChecked />
									<Label
										htmlFor="same-billing"
										className="text-sm font-normal cursor-pointer"
									>
										Same as shipping address
									</Label>
								</div>
								<AddressForm
									countries={countries}
									states={states}
									type="billing"
								/>
							</TabsContent>
						</Tabs>
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
