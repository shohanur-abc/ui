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
import { Badge } from '@/components/ui/badge';
import { Lock, CreditCard, Shield, Sparkles } from 'lucide-react';

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

interface TrustBadgeProps {
	items: { icon: React.ElementType; text: string }[];
}

interface HeaderProps {
	badge: { icon: React.ElementType; text: string };
	title: string;
	subtitle: string;
}

const Header = ({ badge, title, subtitle }: HeaderProps) => (
	<div className="text-center mb-8">
		<Badge variant="secondary" className="gap-1.5 mb-4">
			<badge.icon className="size-3.5" />
			{badge.text}
		</Badge>
		<h1 className="text-2xl @md:text-3xl @lg:text-4xl font-bold mb-2">
			{title}
		</h1>
		<p className="text-muted-foreground">{subtitle}</p>
	</div>
);

const TrustBadges = ({ items }: TrustBadgeProps) => (
	<div className="flex items-center justify-center gap-6 mb-8">
		{items.map((item, i) => (
			<div
				key={i}
				className="flex items-center gap-2 text-sm text-muted-foreground"
			>
				<item.icon className="size-4" />
				<span>{item.text}</span>
			</div>
		))}
	</div>
);

const Field = ({ label, placeholder, type = 'text' }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm font-medium">{label}</Label>
		<Input type={type} placeholder={placeholder} className="h-11" />
	</div>
);

const SelectField = ({ label, placeholder, options }: SelectFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm font-medium">{label}</Label>
		<Select>
			<SelectTrigger className="h-11 w-full">
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

const FormDivider = ({ text }: { text: string }) => (
	<div className="relative py-6">
		<div className="absolute inset-0 flex items-center">
			<div className="w-full border-t border-border" />
		</div>
		<div className="relative flex justify-center">
			<span className="bg-background px-4 text-sm font-medium text-muted-foreground">
				{text}
			</span>
		</div>
	</div>
);

const CheckboxWithLabel = ({ id, label }: { id: string; label: string }) => (
	<div className="flex items-center gap-3">
		<Checkbox id={id} />
		<Label htmlFor={id} className="text-sm font-normal cursor-pointer">
			{label}
		</Label>
	</div>
);

export default function Main() {
	const trustBadges = [
		{ icon: Lock, text: 'Secure' },
		{ icon: Shield, text: 'Protected' },
		{ icon: CreditCard, text: 'Encrypted' },
	];

	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'au', label: 'Australia' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
		{ value: 'tx', label: 'Texas' },
		{ value: 'fl', label: 'Florida' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Header
					badge={{ icon: Sparkles, text: 'Almost There' }}
					title="Enter Your Address"
					subtitle="We'll deliver your order to this address"
				/>

				<TrustBadges items={trustBadges} />

				<div className="rounded-2xl border border-border bg-card p-6 @md:p-8">
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<Field label="First Name" placeholder="John" />
							<Field label="Last Name" placeholder="Doe" />
						</div>
						<Field label="Email" placeholder="john@example.com" type="email" />
						<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
					</div>

					<FormDivider text="Shipping Address" />

					<div className="space-y-4">
						<Field label="Street Address" placeholder="123 Main St" />
						<Field label="Apt, Suite, Unit" placeholder="Optional" />
						<div className="grid grid-cols-2 gap-4">
							<Field label="City" placeholder="City" />
							<Field label="ZIP Code" placeholder="12345" />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<SelectField label="State" placeholder="State" options={states} />
							<SelectField
								label="Country"
								placeholder="Country"
								options={countries}
							/>
						</div>
					</div>

					<div className="mt-6 space-y-3">
						<CheckboxWithLabel
							id="save-address"
							label="Save this address for future orders"
						/>
						<CheckboxWithLabel
							id="billing-same"
							label="Billing address is the same as shipping"
						/>
					</div>

					<div className="mt-8 flex flex-col gap-3">
						<Button size="lg" className="w-full">
							Continue to Shipping Method
						</Button>
						<Button variant="ghost" size="lg" className="w-full">
							Return to Cart
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
