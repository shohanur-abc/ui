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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, User, Truck, CreditCard, Check, Circle } from 'lucide-react';
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

interface TimelineStepProps {
	step: number;
	icon: React.ElementType;
	label: string;
	active: boolean;
	completed: boolean;
	isLast?: boolean;
}

const TimelineStep = ({
	step,
	icon: Icon,
	label,
	active,
	completed,
	isLast,
}: TimelineStepProps) => (
	<div className="flex items-start gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`size-10 rounded-full flex items-center justify-center transition-all ${
					completed
						? 'bg-green-500 text-white'
						: active
							? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
							: 'bg-muted text-muted-foreground'
				}`}
			>
				{completed ? <Check className="size-5" /> : <Icon className="size-5" />}
			</div>
			{!isLast && (
				<div
					className={`w-0.5 h-full min-h-[40px] mt-2 ${
						completed ? 'bg-green-500' : 'bg-border'
					}`}
				/>
			)}
		</div>
		<div className="pb-8">
			<p className="text-xs text-muted-foreground">Step {step}</p>
			<p className={`font-medium ${active ? 'text-primary' : ''}`}>{label}</p>
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

const TimelineSidebar = ({ currentStep }: { currentStep: number }) => {
	const steps = [
		{ icon: User, label: 'Contact Info' },
		{ icon: MapPin, label: 'Shipping Address' },
		{ icon: Truck, label: 'Delivery Options' },
		{ icon: CreditCard, label: 'Payment' },
	];

	return (
		<div className="hidden @lg:block">
			{steps.map((s, i) => (
				<TimelineStep
					key={i}
					step={i + 1}
					icon={s.icon}
					label={s.label}
					active={i + 1 === currentStep}
					completed={i + 1 < currentStep}
					isLast={i === steps.length - 1}
				/>
			))}
		</div>
	);
};

const MobileProgress = ({ step, total }: { step: number; total: number }) => (
	<div className="@lg:hidden mb-6">
		<div className="flex items-center justify-between mb-2">
			<Badge variant="outline">
				Step {step} of {total}
			</Badge>
			<span className="text-sm text-muted-foreground">
				{Math.round((step / total) * 100)}%
			</span>
		</div>
		<div className="h-2 bg-muted rounded-full overflow-hidden">
			<div
				className="h-full bg-primary transition-all"
				style={{ width: `${(step / total) * 100}%` }}
			/>
		</div>
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
			<SelectField
				label="Country"
				placeholder="Select country"
				options={countries}
			/>
			<Field label="Street Address" placeholder="123 Main Street" />
			<Field label="Apartment / Suite" placeholder="Apt 4B (Optional)" />
			<div className="grid @sm:grid-cols-3 gap-4">
				<Field label="City" placeholder="City" />
				<SelectField label="State" placeholder="State" options={states} />
				<Field label="ZIP Code" placeholder="12345" />
			</div>
		</div>
	);
};

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
				<MobileProgress step={step} total={4} />

				<div className="flex gap-12">
					<TimelineSidebar currentStep={step} />

					<div className="flex-1">
						<Card>
							<CardContent className="pt-6">
								<StepContent
									step={step}
									countries={countries}
									states={states}
								/>
							</CardContent>
						</Card>

						<div className="flex gap-3 mt-6">
							{step > 1 && (
								<Button
									variant="outline"
									size="lg"
									className="flex-1"
									onClick={() => setStep(step - 1)}
								>
									Back
								</Button>
							)}
							<Button
								size="lg"
								className={step === 1 ? 'w-full' : 'flex-1'}
								onClick={() => setStep(Math.min(5, step + 1))}
							>
								{step === 4 ? 'Complete Order' : 'Continue'}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
