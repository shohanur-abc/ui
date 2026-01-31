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
	MapPin,
	Check,
	Circle,
	Loader2,
	ArrowRight,
	ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
	defaultValue?: string;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
	defaultValue?: string;
}

interface StepperDotProps {
	step: number;
	label: string;
	active: boolean;
	completed: boolean;
}

const StepperDot = ({ step, label, active, completed }: StepperDotProps) => (
	<div className="flex flex-col items-center gap-2">
		<div
			className={`size-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
				completed
					? 'bg-green-500 text-white'
					: active
						? 'bg-primary text-primary-foreground animate-pulse'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{completed ? <Check className="size-5" /> : step}
		</div>
		<span
			className={`text-xs ${active ? 'font-medium text-primary' : 'text-muted-foreground'}`}
		>
			{label}
		</span>
	</div>
);

const StepperLine = ({ completed }: { completed: boolean }) => (
	<div
		className={`flex-1 h-0.5 mt-5 transition-colors ${
			completed ? 'bg-green-500' : 'bg-border'
		}`}
	/>
);

const WizardStepper = ({ currentStep }: { currentStep: number }) => {
	const steps = ['Location', 'Address', 'Review'];

	return (
		<div className="flex items-start justify-between mb-10 max-w-lg mx-auto">
			{steps.map((label, i) => (
				<div key={label} className="flex items-start flex-1 last:flex-none">
					<StepperDot
						step={i + 1}
						label={label}
						active={i + 1 === currentStep}
						completed={i + 1 < currentStep}
					/>
					{i < steps.length - 1 && <StepperLine completed={i + 1 < currentStep} />}
				</div>
			))}
		</div>
	);
};

const Field = ({
	label,
	placeholder,
	type = 'text',
	defaultValue,
}: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} defaultValue={defaultValue} />
	</div>
);

const SelectField = ({
	label,
	placeholder,
	options,
	defaultValue,
}: SelectFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Select defaultValue={defaultValue}>
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

const LocationStep = ({
	countries,
}: {
	countries: { value: string; label: string }[];
}) => (
	<div className="space-y-6 text-center">
		<div className="size-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto">
			<MapPin className="size-10 text-primary" />
		</div>
		<div>
			<h2 className="text-2xl font-bold">Where are you?</h2>
			<p className="text-muted-foreground mt-1">
				Select your country to see shipping options
			</p>
		</div>
		<div className="max-w-sm mx-auto">
			<SelectField
				label="Country / Region"
				placeholder="Choose your country"
				options={countries}
				defaultValue="us"
			/>
		</div>
	</div>
);

const AddressStep = ({
	states,
}: {
	states: { value: string; label: string }[];
}) => (
	<Card>
		<CardContent className="pt-6 space-y-4">
			<h2 className="text-xl font-bold">Enter your address</h2>
			<div className="grid @sm:grid-cols-2 gap-4">
				<Field label="First Name" placeholder="First name" defaultValue="John" />
				<Field label="Last Name" placeholder="Last name" defaultValue="Doe" />
			</div>
			<Field
				label="Phone"
				placeholder="Phone number"
				type="tel"
				defaultValue="+1 (555) 123-4567"
			/>
			<Separator />
			<Field
				label="Street Address"
				placeholder="Street address"
				defaultValue="123 Main Street"
			/>
			<Field label="Apartment / Suite" placeholder="Apt, suite, etc. (Optional)" />
			<div className="grid @sm:grid-cols-3 gap-4">
				<Field label="City" placeholder="City" defaultValue="San Francisco" />
				<SelectField label="State" placeholder="State" options={states} defaultValue="ca" />
				<Field label="ZIP" placeholder="ZIP" defaultValue="94102" />
			</div>
			<div className="flex items-center gap-2 pt-2">
				<Checkbox id="default" defaultChecked />
				<Label htmlFor="default" className="text-sm font-normal cursor-pointer">
					Save as default address
				</Label>
			</div>
		</CardContent>
	</Card>
);

const ReviewStep = () => (
	<div className="space-y-6">
		<div className="text-center">
			<div className="size-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
				<Check className="size-8 text-green-500" />
			</div>
			<h2 className="text-2xl font-bold">Review your address</h2>
			<p className="text-muted-foreground mt-1">
				Make sure everything looks correct
			</p>
		</div>
		<Card className="bg-muted/30">
			<CardContent className="pt-6">
				<div className="flex items-start gap-4">
					<MapPin className="size-5 text-primary shrink-0 mt-0.5" />
					<div>
						<p className="font-semibold">John Doe</p>
						<p className="text-sm text-muted-foreground mt-1">
							123 Main Street
							<br />
							San Francisco, CA 94102
							<br />
							United States
						</p>
						<p className="text-sm text-muted-foreground mt-2">
							+1 (555) 123-4567
						</p>
						<Badge variant="secondary" className="mt-3">
							Default Address
						</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
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
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<WizardStepper currentStep={step} />

				{step === 1 && <LocationStep countries={countries} />}
				{step === 2 && <AddressStep states={states} />}
				{step === 3 && <ReviewStep />}

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
						{step === 3 ? 'Confirm & Continue' : 'Continue'}
						<ArrowRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
