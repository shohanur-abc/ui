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
import { User, MapPin, Phone, ArrowRight, ArrowLeft } from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
	icon?: React.ElementType;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}

interface FormSectionProps {
	icon: React.ElementType;
	title: string;
	children: React.ReactNode;
}

const FormSection = ({ icon: Icon, title, children }: FormSectionProps) => (
	<div className="rounded-2xl border border-border bg-card/50 backdrop-blur p-6 space-y-4">
		<div className="flex items-center gap-3 pb-4 border-b border-border">
			<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
				<Icon className="size-4" />
			</div>
			<h3 className="font-semibold">{title}</h3>
		</div>
		{children}
	</div>
);

const FieldWithIcon = ({
	label,
	placeholder,
	type = 'text',
	icon: Icon,
}: FieldProps & { icon?: React.ElementType }) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<div className="relative">
			{Icon && (
				<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			)}
			<Input
				type={type}
				placeholder={placeholder}
				className={Icon ? 'pl-10' : ''}
			/>
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

const GlowDecorative = () => (
	<div className="absolute -top-40 -right-40 size-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
);

export default function Main() {
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
		<section className="@container relative overflow-hidden" data-theme="neon">
			<GlowDecorative />
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 relative">
				<div className="text-center mb-8 @md:mb-10">
					<h1 className="text-2xl @md:text-3xl font-bold mb-2">
						Shipping Address
					</h1>
					<p className="text-muted-foreground">
						Please enter your delivery details
					</p>
				</div>

				<div className="space-y-6">
					<FormSection icon={User} title="Contact Details">
						<div className="grid @sm:grid-cols-2 gap-4">
							<Field label="First Name" placeholder="John" />
							<Field label="Last Name" placeholder="Doe" />
						</div>
						<Field
							label="Email Address"
							placeholder="john@example.com"
							type="email"
						/>
						<FieldWithIcon
							label="Phone Number"
							placeholder="+1 (555) 000-0000"
							type="tel"
							icon={Phone}
						/>
					</FormSection>

					<FormSection icon={MapPin} title="Delivery Address">
						<SelectField
							label="Country"
							placeholder="Select your country"
							options={countries}
						/>
						<Field
							label="Street Address"
							placeholder="Enter your street address"
						/>
						<Field
							label="Apartment, Suite, etc."
							placeholder="Optional"
						/>
						<div className="grid @sm:grid-cols-3 gap-4">
							<Field label="City" placeholder="City" />
							<SelectField
								label="State"
								placeholder="State"
								options={states}
							/>
							<Field label="ZIP Code" placeholder="12345" />
						</div>
					</FormSection>

					<div className="flex items-center gap-3 px-1">
						<Checkbox id="default-shipping" />
						<Label
							htmlFor="default-shipping"
							className="text-sm font-normal cursor-pointer"
						>
							Set as my default shipping address
						</Label>
					</div>
				</div>

				<div className="mt-8 flex flex-col @sm:flex-row gap-3">
					<Button variant="outline" size="lg" className="gap-2 @sm:order-1">
						<ArrowLeft className="size-4" />
						Back
					</Button>
					<Button size="lg" className="flex-1 gap-2 @sm:order-2">
						Continue to Shipping
						<ArrowRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
