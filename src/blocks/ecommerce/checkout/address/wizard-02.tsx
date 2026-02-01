'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, MapPin, Check } from 'lucide-react';
import { useState } from 'react';

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

const ProgressHeader = ({ step, total }: { step: number; total: number }) => (
	<div className="mb-8">
		<div className="flex items-center justify-between mb-2">
			<Badge variant="outline">
				Step {step} of {total}
			</Badge>
			<span className="text-sm text-muted-foreground">
				{Math.round((step / total) * 100)}% Complete
			</span>
		</div>
		<Progress value={(step / total) * 100} className="h-2" />
	</div>
);

const Field = ({ label, placeholder, type = 'text', required }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">
			{label}
			{required && <span className="text-destructive ml-0.5">*</span>}
		</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const SelectField = ({
	label,
	placeholder,
	options,
	required,
}: SelectFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">
			{label}
			{required && <span className="text-destructive ml-0.5">*</span>}
		</Label>
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

const StepIndicator = ({
	steps,
	current,
}: {
	steps: string[];
	current: number;
}) => (
	<div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
		{steps.map((step, i) => (
			<div key={step} className="flex items-center gap-2 shrink-0">
				<div
					className={`size-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
						i + 1 < current
							? 'bg-green-500 text-white'
							: i + 1 === current
								? 'bg-primary text-primary-foreground'
								: 'bg-muted text-muted-foreground'
					}`}
				>
					{i + 1 < current ? <Check className="size-4" /> : i + 1}
				</div>
				<span
					className={`text-sm ${
						i + 1 === current ? 'font-medium' : 'text-muted-foreground'
					}`}
				>
					{step}
				</span>
				{i < steps.length - 1 && <div className="w-8 h-px bg-border" />}
			</div>
		))}
	</div>
);

const CountryStep = ({
	countries,
}: {
	countries: { value: string; label: string }[];
}) => (
	<div className="space-y-6">
		<div className="text-center">
			<div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
				<MapPin className="size-8 text-primary" />
			</div>
			<h2 className="text-xl font-bold">Where are you located?</h2>
			<p className="text-muted-foreground mt-1">
				Select your country to see available shipping options
			</p>
		</div>
		<SelectField
			label="Country / Region"
			placeholder="Select your country"
			options={countries}
			required
		/>
	</div>
);

const AddressStep = ({
	states,
}: {
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div>
			<h2 className="text-xl font-bold">Your Address</h2>
			<p className="text-muted-foreground mt-1">
				Enter your complete shipping address
			</p>
		</div>
		<Field label="Street Address" placeholder="123 Main Street" required />
		<Field label="Apartment, Suite, etc." placeholder="Apt 4B" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="San Francisco" required />
			<SelectField
				label="State"
				placeholder="Select"
				options={states}
				required
			/>
			<Field label="ZIP Code" placeholder="94102" required />
		</div>
	</div>
);

const ContactStep = () => (
	<div className="space-y-4">
		<div>
			<h2 className="text-xl font-bold">Contact Information</h2>
			<p className="text-muted-foreground mt-1">
				We&apos;ll use this to send delivery updates
			</p>
		</div>
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" required />
			<Field label="Last Name" placeholder="Doe" required />
		</div>
		<Field
			label="Email Address"
			placeholder="john@example.com"
			type="email"
			required
		/>
		<Field
			label="Phone Number"
			placeholder="+1 (555) 000-0000"
			type="tel"
			required
		/>
		<div className="flex items-start gap-2 pt-2">
			<Checkbox id="updates" />
			<Label htmlFor="updates" className="text-sm font-normal cursor-pointer">
				Send me order updates via SMS
			</Label>
		</div>
	</div>
);

export default function Main() {
	const [step, setStep] = useState(2);
	const steps = ['Country', 'Address', 'Contact'];

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
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<ProgressHeader step={step} total={steps.length} />
				<StepIndicator steps={steps} current={step} />

				<Card>
					<CardContent className="pt-6">
						{step === 1 && <CountryStep countries={countries} />}
						{step === 2 && <AddressStep states={states} />}
						{step === 3 && <ContactStep />}
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
							<ArrowLeft className="size-4" />
							Back
						</Button>
					)}
					<Button
						size="lg"
						className={`gap-2 ${step === 1 ? 'w-full' : 'flex-1'}`}
						onClick={() => setStep(Math.min(4, step + 1))}
					>
						{step === steps.length ? 'Complete' : 'Continue'}
						{step < steps.length && <ArrowRight className="size-4" />}
					</Button>
				</div>
			</div>
		</section>
	);
}
