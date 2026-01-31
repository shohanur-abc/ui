'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Building2 } from 'lucide-react';

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

interface AddressTypeProps {
	items: { icon: React.ElementType; label: string; value: string }[];
	selected: string;
}

interface CheckboxFieldProps {
	id: string;
	label: string;
	description?: string;
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

const AddressType = ({ items, selected }: AddressTypeProps) => (
	<div className="flex gap-3 mb-6">
		{items.map((item) => {
			const Icon = item.icon;
			const isSelected = item.value === selected;
			return (
				<button
					key={item.value}
					type="button"
					className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
						isSelected
							? 'border-primary bg-primary/5 text-primary'
							: 'border-border hover:border-primary/50'
					}`}
				>
					<Icon className="size-4" />
					<span className="text-sm font-medium">{item.label}</span>
				</button>
			);
		})}
	</div>
);

const CheckboxField = ({ id, label, description }: CheckboxFieldProps) => (
	<div className="flex items-start gap-3">
		<Checkbox id={id} className="mt-0.5" />
		<div>
			<Label htmlFor={id} className="text-sm font-medium cursor-pointer">
				{label}
			</Label>
			{description && (
				<p className="text-xs text-muted-foreground mt-0.5">{description}</p>
			)}
		</div>
	</div>
);

export default function Main() {
	const addressTypes = [
		{ icon: Home, label: 'Home', value: 'home' },
		{ icon: Building2, label: 'Office', value: 'office' },
	];

	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'uk', label: 'United Kingdom' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur">
					<CardHeader className="border-b border-border/50">
						<CardTitle className="text-xl">Delivery Address</CardTitle>
					</CardHeader>
					<CardContent className="pt-6">
						<AddressType items={addressTypes} selected="home" />

						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<Field label="First Name" placeholder="John" />
								<Field label="Last Name" placeholder="Doe" />
							</div>
							<Field label="Address Line 1" placeholder="Street address" />
							<Field
								label="Address Line 2"
								placeholder="Apartment, suite, unit"
							/>
							<div className="grid grid-cols-3 gap-4">
								<Field label="City" placeholder="City" />
								<Field label="State" placeholder="State" />
								<Field label="ZIP" placeholder="12345" />
							</div>
							<SelectField
								label="Country"
								placeholder="Select country"
								options={countries}
							/>
							<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
						</div>

						<div className="mt-6 space-y-4 border-t border-border/50 pt-6">
							<CheckboxField
								id="save-address"
								label="Save this address"
								description="For faster checkout next time"
							/>
							<CheckboxField
								id="default-address"
								label="Set as default address"
							/>
						</div>

						<div className="mt-8 flex gap-3">
							<Button variant="outline" className="flex-1">
								Cancel
							</Button>
							<Button className="flex-1">Save Address</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
