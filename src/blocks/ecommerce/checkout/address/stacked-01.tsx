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
import { MapPin } from 'lucide-react';

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
	required?: boolean;
}

interface FormHeaderProps {
	icon: React.ElementType;
	title: string;
	description: string;
}

interface ActionButtonsProps {
	items: { label: string; variant?: 'default' | 'outline' | 'ghost' }[];
}

const FormHeader = ({ icon: Icon, title, description }: FormHeaderProps) => (
	<div className="flex items-center gap-3 mb-6 @md:mb-8">
		<div className="flex size-10 @md:size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
			<Icon className="size-5 @md:size-6" />
		</div>
		<div>
			<h2 className="text-lg @md:text-xl font-semibold">{title}</h2>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

const Field = ({ label, placeholder, type = 'text', required }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm font-medium">
			{label}
			{required && <span className="text-destructive ml-1">*</span>}
		</Label>
		<Input type={type} placeholder={placeholder} className="h-10 @md:h-11" />
	</div>
);

const SelectField = ({
	label,
	placeholder,
	options,
	required,
}: SelectFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm font-medium">
			{label}
			{required && <span className="text-destructive ml-1">*</span>}
		</Label>
		<Select>
			<SelectTrigger className="h-10 @md:h-11 w-full">
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

const ActionButtons = ({ items }: ActionButtonsProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 pt-4 @md:pt-6">
		{items.map((item, i) => (
			<Button
				key={i}
				variant={item.variant || 'default'}
				size="lg"
				className="flex-1"
			>
				{item.label}
			</Button>
		))}
	</div>
);

export default function Main() {
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
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<FormHeader
					icon={MapPin}
					title="Shipping Address"
					description="Enter your delivery address"
				/>

				<div className="space-y-4 @md:space-y-5">
					<Field label="Full Name" placeholder="John Doe" required />
					<Field
						label="Email"
						placeholder="john@example.com"
						type="email"
						required
					/>
					<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
					<Field
						label="Street Address"
						placeholder="123 Main Street"
						required
					/>
					<Field label="Apartment, suite, etc." placeholder="Apt 4B" />
					<div className="grid grid-cols-2 gap-4">
						<Field label="City" placeholder="San Francisco" required />
						<Field label="ZIP Code" placeholder="94102" required />
					</div>
					<div className="grid grid-cols-2 gap-4">
						<SelectField
							label="State"
							placeholder="Select state"
							options={states}
							required
						/>
						<SelectField
							label="Country"
							placeholder="Select country"
							options={countries}
							required
						/>
					</div>
				</div>

				<ActionButtons
					items={[
						{ label: 'Back', variant: 'outline' },
						{ label: 'Continue to Payment' },
					]}
				/>
			</div>
		</section>
	);
}
