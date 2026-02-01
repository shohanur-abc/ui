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
import { Separator } from '@/components/ui/separator';
import { ChevronRight, ChevronLeft, Check, Circle } from 'lucide-react';
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

interface StepIndicatorProps {
	step: number;
	label: string;
	active: boolean;
	completed: boolean;
}

const StepIndicator = ({
	step,
	label,
	active,
	completed,
}: StepIndicatorProps) => (
	<div className="flex items-center gap-2">
		<div
			className={`size-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
				completed
					? 'bg-green-500 text-white'
					: active
						? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{completed ? <Check className="size-4" /> : step}
		</div>
		<span
			className={`text-sm hidden @lg:block ${
				active ? 'font-medium text-foreground' : 'text-muted-foreground'
			}`}
		>
			{label}
		</span>
	</div>
);

const VerticalStepper = ({ currentStep }: { currentStep: number }) => {
	const steps = [
		{ step: 1, label: 'Recipient' },
		{ step: 2, label: 'Location' },
		{ step: 3, label: 'Details' },
		{ step: 4, label: 'Confirm' },
	];

	return (
		<div className="flex @lg:flex-col gap-4 @lg:gap-2 mb-8 @lg:mb-0 @lg:pr-8 @lg:border-r border-border">
			{steps.map((s, i) => (
				<div key={s.step} className="flex @lg:flex-col items-center gap-2">
					<StepIndicator
						{...s}
						active={s.step === currentStep}
						completed={s.step < currentStep}
					/>
					{i < steps.length - 1 && (
						<div
							className={`w-8 @lg:w-0.5 h-0.5 @lg:h-8 @lg:ml-4 transition-colors ${
								s.step < currentStep ? 'bg-green-500' : 'bg-border'
							}`}
						/>
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

const RecipientStep = () => (
	<div className="space-y-4">
		<h2 className="text-xl font-bold">Who is receiving this order?</h2>
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Email" placeholder="john@example.com" type="email" />
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
	</div>
);

const LocationStep = ({
	countries,
}: {
	countries: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<h2 className="text-xl font-bold">Where should we deliver?</h2>
		<SelectField
			label="Country / Region"
			placeholder="Select country"
			options={countries}
		/>
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apartment / Suite" placeholder="Apt 4B (Optional)" />
	</div>
);

const DetailsStep = ({
	states,
}: {
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<h2 className="text-xl font-bold">Complete address details</h2>
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="San Francisco" />
			<SelectField label="State" placeholder="CA" options={states} />
			<Field label="ZIP Code" placeholder="94102" />
		</div>
		<Separator />
		<div className="flex items-center gap-2">
			<Checkbox id="default" />
			<Label htmlFor="default" className="text-sm font-normal cursor-pointer">
				Set as default shipping address
			</Label>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="billing" defaultChecked />
			<Label htmlFor="billing" className="text-sm font-normal cursor-pointer">
				Same as billing address
			</Label>
		</div>
	</div>
);

const ConfirmStep = () => (
	<div className="space-y-4">
		<h2 className="text-xl font-bold">Review your information</h2>
		<Card className="bg-muted/30">
			<CardContent className="pt-6 space-y-4">
				<div>
					<p className="text-xs text-muted-foreground">Recipient</p>
					<p className="font-medium">John Doe</p>
					<p className="text-sm text-muted-foreground">
						john@example.com • +1 (555) 000-0000
					</p>
				</div>
				<Separator />
				<div>
					<p className="text-xs text-muted-foreground">Shipping Address</p>
					<p className="font-medium">123 Main Street, Apt 4B</p>
					<p className="text-sm text-muted-foreground">
						San Francisco, CA 94102, United States
					</p>
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
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex flex-col @lg:flex-row gap-8">
					<VerticalStepper currentStep={step} />

					<div className="flex-1">
						<Card>
							<CardContent className="pt-6">
								{step === 1 && <RecipientStep />}
								{step === 2 && <LocationStep countries={countries} />}
								{step === 3 && <DetailsStep states={states} />}
								{step === 4 && <ConfirmStep />}
							</CardContent>
						</Card>

						<div className="flex gap-3 mt-6">
							{step > 1 && (
								<Button
									variant="outline"
									size="lg"
									className="flex-1 gap-2"
									onClick={() => setStep(step - 1)}
								>
									<ChevronLeft className="size-4" />
									Previous
								</Button>
							)}
							<Button
								size="lg"
								className={`gap-2 ${step === 1 ? 'w-full' : 'flex-1'}`}
								onClick={() => setStep(Math.min(5, step + 1))}
							>
								{step === 4 ? 'Confirm Address' : 'Next'}
								<ChevronRight className="size-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
