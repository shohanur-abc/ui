'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Building2, Home, Check } from 'lucide-react';

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

interface AddressTypeTabProps {
	items: { icon: React.ElementType; label: string; value: string }[];
	activeValue: string;
}

const AddressTypeTabs = ({ items, activeValue }: AddressTypeTabProps) => (
	<div className="grid grid-cols-2 gap-3 mb-6">
		{items.map((item) => {
			const Icon = item.icon;
			const isActive = item.value === activeValue;
			return (
				<button
					key={item.value}
					type="button"
					className={`relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all ${
						isActive
							? 'border-primary bg-primary/5 text-primary'
							: 'border-border hover:border-primary/40 text-muted-foreground'
					}`}
				>
					<Icon className="size-4" />
					<span className="font-medium text-sm">{item.label}</span>
					{isActive && (
						<div className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
							<Check className="size-3" />
						</div>
					)}
				</button>
			);
		})}
	</div>
);

const FormCard = ({
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
	<Card className="overflow-hidden">
		<CardHeader className="bg-muted/30 border-b border-border py-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Icon className="size-4" />
					</div>
					<CardTitle className="text-base">{title}</CardTitle>
				</div>
				{badge && <Badge variant="secondary">{badge}</Badge>}
			</div>
		</CardHeader>
		<CardContent className="pt-6">{children}</CardContent>
	</Card>
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

export default function Main() {
	const addressTypes = [
		{ icon: Home, label: 'Residential', value: 'residential' },
		{ icon: Building2, label: 'Business', value: 'business' },
	];

	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'uk', label: 'United Kingdom' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
		{ value: 'tx', label: 'Texas' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold">Delivery Details</h1>
					<p className="text-muted-foreground mt-1">
						Where would you like your order delivered?
					</p>
				</div>

				<div className="grid @md:grid-cols-2 gap-6">
					<FormCard icon={User} title="Contact Information" badge="Required">
						<div className="space-y-4">
							<Field label="Full Name" placeholder="John Doe" />
							<Field label="Email Address" placeholder="john@example.com" type="email" />
							<Field label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
						</div>
					</FormCard>

					<FormCard icon={MapPin} title="Shipping Address" badge="Required">
						<AddressTypeTabs items={addressTypes} activeValue="residential" />
						<div className="space-y-4">
							<Field label="Company Name" placeholder="Optional" />
							<SelectField
								label="Country"
								placeholder="Select country"
								options={countries}
							/>
						</div>
					</FormCard>

					<div className="@md:col-span-2">
						<Card>
							<CardContent className="pt-6">
								<div className="grid @md:grid-cols-2 gap-4">
									<div className="@md:col-span-2">
										<Field label="Street Address" placeholder="123 Main Street" />
									</div>
									<div className="@md:col-span-2">
										<Field
											label="Apartment, Suite, etc."
											placeholder="Apt 4B"
										/>
									</div>
									<Field label="City" placeholder="San Francisco" />
									<Field label="ZIP / Postal Code" placeholder="94102" />
									<SelectField
										label="State / Province"
										placeholder="Select state"
										options={states}
									/>
									<Field
										label="Delivery Instructions"
										placeholder="Optional notes"
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="flex flex-col @sm:flex-row gap-3 mt-8">
					<Button variant="outline" size="lg" className="@sm:order-1">
						Cancel
					</Button>
					<Button size="lg" className="flex-1 @sm:order-2">
						Save and Continue
					</Button>
				</div>
			</div>
		</section>
	);
}
