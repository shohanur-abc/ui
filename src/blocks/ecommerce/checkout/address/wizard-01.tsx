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
import { MapPin, User, Home, CreditCard, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface StepProps {
	number: number;
	icon: React.ElementType;
	label: string;
	active: boolean;
	completed: boolean;
}

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

const Step = ({ number, icon: Icon, label, active, completed }: StepProps) => (
	<div className="flex items-center gap-3">
		<div
			className={`size-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
				completed
					? 'bg-green-500 text-white'
					: active
						? 'bg-primary text-primary-foreground'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{completed ? <CheckCircle className="size-5" /> : number}
		</div>
		<div className="hidden @md:block">
			<p
				className={`text-sm font-medium ${
					active ? 'text-foreground' : 'text-muted-foreground'
				}`}
			>
				{label}
			</p>
		</div>
	</div>
);

const StepConnector = ({ completed }: { completed: boolean }) => (
	<div
		className={`flex-1 h-0.5 max-w-16 ${
			completed ? 'bg-green-500' : 'bg-border'
		}`}
	/>
);

const Stepper = ({ currentStep }: { currentStep: number }) => {
	const steps = [
		{ icon: User, label: 'Contact' },
		{ icon: MapPin, label: 'Address' },
		{ icon: Home, label: 'Delivery' },
		{ icon: CreditCard, label: 'Payment' },
	];

	return (
		<div className="flex items-center justify-between mb-10">
			{steps.map((step, i) => (
				<div key={i} className="flex items-center flex-1 last:flex-none">
					<Step
						number={i + 1}
						icon={step.icon}
						label={step.label}
						active={i + 1 === currentStep}
						completed={i + 1 < currentStep}
					/>
					{i < steps.length - 1 && (
						<StepConnector completed={i + 1 < currentStep} />
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

const StepContent = ({
	step,
	countries,
	states,
}: {
	step: number;
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => {
	if (step === 1) {
		return (
			<div className="space-y-4">
				<h2 className="text-xl font-bold">Contact Information</h2>
				<p className="text-muted-foreground text-sm">
					We&apos;ll use this to keep you updated on your order
				</p>
				<div className="grid @sm:grid-cols-2 gap-4">
					<Field label="First Name" placeholder="John" />
					<Field label="Last Name" placeholder="Doe" />
				</div>
				<Field label="Email" placeholder="john@example.com" type="email" />
				<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-bold">Shipping Address</h2>
			<p className="text-muted-foreground text-sm">
				Where should we deliver your order?
			</p>
			<SelectField
				label="Country"
				placeholder="Select country"
				options={countries}
			/>
			<Field label="Street Address" placeholder="123 Main Street" />
			<Field label="Apartment, suite, etc." placeholder="Optional" />
			<div className="grid @sm:grid-cols-3 gap-4">
				<Field label="City" placeholder="City" />
				<SelectField label="State" placeholder="State" options={states} />
				<Field label="ZIP Code" placeholder="12345" />
			</div>
			<div className="flex items-center gap-2 pt-2">
				<Checkbox id="save" />
				<Label htmlFor="save" className="text-sm font-normal cursor-pointer">
					Save this address for future orders
				</Label>
			</div>
		</div>
	);
};

export default function Main() {
	const [currentStep, setCurrentStep] = useState(2);

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
				<Stepper currentStep={currentStep} />

				<Card>
					<CardContent className="pt-6">
						<StepContent
							step={currentStep}
							countries={countries}
							states={states}
						/>
					</CardContent>
				</Card>

				<div className="flex gap-3 mt-8">
					<Button
						variant="outline"
						size="lg"
						className="flex-1"
						onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
					>
						Back
					</Button>
					<Button
						size="lg"
						className="flex-1"
						onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
					>
						Continue
					</Button>
				</div>
			</div>
		</section>
	);
}
