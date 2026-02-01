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
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	ChevronRight,
	ChevronLeft,
	CheckCircle,
	Circle,
	Dot,
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

const BreadcrumbStepper = ({ currentStep }: { currentStep: number }) => {
	const steps = ['Information', 'Address', 'Shipping', 'Payment'];

	return (
		<div className="flex flex-wrap items-center gap-2 mb-8">
			{steps.map((label, i) => (
				<div key={label} className="flex items-center gap-2">
					<span
						className={`text-sm ${
							i + 1 === currentStep
								? 'font-semibold text-primary'
								: i + 1 < currentStep
									? 'text-green-600 dark:text-green-400'
									: 'text-muted-foreground'
						}`}
					>
						{i + 1 < currentStep && (
							<CheckCircle className="inline size-4 mr-1" />
						)}
						{label}
					</span>
					{i < steps.length - 1 && (
						<ChevronRight className="size-4 text-muted-foreground" />
					)}
				</div>
			))}
		</div>
	);
};

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

const InformationStep = () => (
	<div className="space-y-6">
		<div>
			<h2 className="text-xl font-bold mb-1">Contact Information</h2>
			<p className="text-sm text-muted-foreground">
				We&apos;ll use this to keep you updated
			</p>
		</div>
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Email" placeholder="john@example.com" type="email" />
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<div className="flex items-center gap-2">
			<Checkbox id="newsletter" />
			<Label
				htmlFor="newsletter"
				className="text-sm font-normal cursor-pointer"
			>
				Subscribe to newsletter for exclusive offers
			</Label>
		</div>
	</div>
);

const AddressStepForm = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-6">
		<div>
			<h2 className="text-xl font-bold mb-1">Shipping Address</h2>
			<p className="text-sm text-muted-foreground">
				Enter your delivery address
			</p>
		</div>
		<SelectField
			label="Country"
			placeholder="Select country"
			options={countries}
		/>
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apt, Suite, etc." placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP Code" placeholder="12345" />
		</div>
		<Separator />
		<div className="flex items-center gap-2">
			<Checkbox id="billing-same" defaultChecked />
			<Label
				htmlFor="billing-same"
				className="text-sm font-normal cursor-pointer"
			>
				Use same address for billing
			</Label>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="save-addr" />
			<Label htmlFor="save-addr" className="text-sm font-normal cursor-pointer">
				Save this address for future orders
			</Label>
		</div>
	</div>
);

export default function Main() {
	const [step, setStep] = useState(2);

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
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<BreadcrumbStepper currentStep={step} />

				<Card>
					<CardContent className="pt-6">
						{step === 1 && <InformationStep />}
						{step === 2 && (
							<AddressStepForm countries={countries} states={states} />
						)}
					</CardContent>
				</Card>

				<div className="flex gap-3 mt-8">
					{step > 1 && (
						<Button
							variant="outline"
							size="lg"
							className="flex-1 gap-2"
							onClick={() => setStep(step - 1)}
						>
							<ChevronLeft className="size-4" />
							Return to Information
						</Button>
					)}
					<Button
						size="lg"
						className={`gap-2 ${step === 1 ? 'w-full' : 'flex-1'}`}
						onClick={() => setStep(Math.min(4, step + 1))}
					>
						Continue to Shipping
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
