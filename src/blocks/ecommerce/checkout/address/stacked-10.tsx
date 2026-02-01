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
import { Separator } from '@/components/ui/separator';
import { Check, Circle } from 'lucide-react';

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

interface StepIndicatorProps {
	steps: { label: string; status: 'completed' | 'current' | 'upcoming' }[];
}

const StepIndicator = ({ steps }: StepIndicatorProps) => (
	<div className="flex items-center justify-between mb-10">
		{steps.map((step, i) => (
			<div key={i} className="flex items-center flex-1">
				<div className="flex flex-col items-center gap-2">
					<div
						className={`size-10 rounded-full flex items-center justify-center border-2 transition-colors ${
							step.status === 'completed'
								? 'bg-primary border-primary text-primary-foreground'
								: step.status === 'current'
									? 'border-primary text-primary bg-primary/10'
									: 'border-muted-foreground/30 text-muted-foreground'
						}`}
					>
						{step.status === 'completed' ? (
							<Check className="size-5" />
						) : (
							<Circle className="size-3 fill-current" />
						)}
					</div>
					<span
						className={`text-xs font-medium ${
							step.status === 'current'
								? 'text-primary'
								: 'text-muted-foreground'
						}`}
					>
						{step.label}
					</span>
				</div>
				{i < steps.length - 1 && (
					<div className="flex-1 h-0.5 bg-border mx-4 -mt-6">
						<div
							className={`h-full transition-all ${
								step.status === 'completed' ? 'bg-primary w-full' : 'w-0'
							}`}
						/>
					</div>
				)}
			</div>
		))}
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

const SectionTitle = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => (
	<div className="mb-6">
		<h2 className="text-lg font-semibold">{title}</h2>
		<p className="text-sm text-muted-foreground">{description}</p>
	</div>
);

export default function Main() {
	const steps = [
		{ label: 'Cart', status: 'completed' as const },
		{ label: 'Address', status: 'current' as const },
		{ label: 'Shipping', status: 'upcoming' as const },
		{ label: 'Payment', status: 'upcoming' as const },
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
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<StepIndicator steps={steps} />

				<div className="grid @md:grid-cols-2 gap-8">
					<div>
						<SectionTitle
							title="Contact Information"
							description="We'll use this email to send your receipt"
						/>
						<div className="space-y-4">
							<Field
								label="Email Address"
								placeholder="john@example.com"
								type="email"
							/>
							<Field
								label="Phone Number"
								placeholder="+1 (555) 000-0000"
								type="tel"
							/>
						</div>
					</div>

					<div>
						<SectionTitle
							title="Personal Details"
							description="Enter the recipient's name"
						/>
						<div className="space-y-4">
							<Field label="First Name" placeholder="John" />
							<Field label="Last Name" placeholder="Doe" />
						</div>
					</div>
				</div>

				<Separator className="my-8" />

				<SectionTitle
					title="Shipping Address"
					description="Where should we deliver your order?"
				/>

				<div className="grid @md:grid-cols-2 gap-4">
					<div className="@md:col-span-2">
						<Field label="Street Address" placeholder="123 Main Street" />
					</div>
					<div className="@md:col-span-2">
						<Field label="Apartment, Suite, Unit" placeholder="Optional" />
					</div>
					<Field label="City" placeholder="San Francisco" />
					<Field label="ZIP / Postal Code" placeholder="94102" />
					<SelectField
						label="State / Province"
						placeholder="Select state"
						options={states}
					/>
					<SelectField
						label="Country"
						placeholder="Select country"
						options={countries}
					/>
				</div>

				<div className="mt-10 flex flex-col-reverse @sm:flex-row gap-3">
					<Button variant="outline" size="lg">
						Return to Cart
					</Button>
					<Button size="lg" className="flex-1 @sm:flex-none @sm:min-w-[200px]">
						Continue to Shipping
					</Button>
				</div>
			</div>
		</section>
	);
}
