import { MapPin } from 'lucide-react';

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

const SectionHeader = ({
	icon: Icon,
	title,
	subtitle,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-start gap-4 mb-8">
		<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
			<Icon className="size-6" />
		</div>
		<div>
			<h2 className="text-xl font-semibold tracking-tight">{title}</h2>
			<p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
		</div>
	</div>
);

const FormField = ({
	label,
	placeholder,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const SelectField = ({
	label,
	placeholder,
	options,
}: {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
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

const FormActions = ({
	backLabel,
	continueLabel,
}: {
	backLabel: string;
	continueLabel: string;
}) => (
	<div className="flex flex-col-reverse @sm:flex-row gap-3 pt-6">
		<Button variant="outline" className="flex-1">
			{backLabel}
		</Button>
		<Button className="flex-1">{continueLabel}</Button>
	</div>
);

export default function Main() {
	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'de', label: 'Germany' },
		{ value: 'fr', label: 'France' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<SectionHeader
					icon={MapPin}
					title="Shipping Address"
					subtitle="Enter the address where you'd like your order delivered"
				/>

				<div className="space-y-6">
					<div className="grid @sm:grid-cols-2 gap-4">
						<FormField label="First Name" placeholder="John" />
						<FormField label="Last Name" placeholder="Doe" />
					</div>

					<FormField label="Email Address" placeholder="john@example.com" type="email" />
					<FormField label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
					<FormField label="Street Address" placeholder="123 Main Street" />
					<FormField label="Apartment, Suite, etc." placeholder="Apt 4B (optional)" />

					<div className="grid @sm:grid-cols-3 gap-4">
						<FormField label="City" placeholder="New York" />
						<FormField label="State / Province" placeholder="NY" />
						<FormField label="Postal Code" placeholder="10001" />
					</div>

					<SelectField
						label="Country"
						placeholder="Select country"
						options={countries}
					/>

					<FormActions backLabel="Back to Cart" continueLabel="Continue to Delivery" />
				</div>
			</div>
		</section>
	);
}
