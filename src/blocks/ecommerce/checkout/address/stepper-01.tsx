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
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
	MapPin,
	Truck,
	CreditCard,
	ChevronRight,
	ChevronLeft,
	Check,
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

interface StepBadgeProps {
	step: number;
	icon: React.ElementType;
	label: string;
	active: boolean;
	completed: boolean;
}

const StepBadge = ({
	step,
	icon: Icon,
	label,
	active,
	completed,
}: StepBadgeProps) => (
	<div
		className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
			completed
				? 'bg-green-500/10 text-green-600 dark:text-green-400'
				: active
					? 'bg-primary text-primary-foreground'
					: 'bg-muted text-muted-foreground'
		}`}
	>
		<div className="size-6 rounded-full bg-white/20 flex items-center justify-center">
			{completed ? <Check className="size-3.5" /> : <Icon className="size-3.5" />}
		</div>
		<span className="text-sm font-medium hidden @sm:inline">{label}</span>
	</div>
);

const StepperNavigation = ({ currentStep }: { currentStep: number }) => {
	const steps = [
		{ icon: MapPin, label: 'Address' },
		{ icon: Truck, label: 'Shipping' },
		{ icon: CreditCard, label: 'Payment' },
	];

	return (
		<div className="flex items-center justify-center gap-2 mb-8">
			{steps.map((s, i) => (
				<div key={i} className="flex items-center gap-2">
					<StepBadge
						step={i + 1}
						icon={s.icon}
						label={s.label}
						active={i + 1 === currentStep}
						completed={i + 1 < currentStep}
					/>
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

const AddressForm = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-3">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<MapPin className="size-5 text-primary" />
				</div>
				Shipping Address
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="grid @sm:grid-cols-2 gap-4">
				<Field label="First Name" placeholder="John" />
				<Field label="Last Name" placeholder="Doe" />
			</div>
			<Field label="Email" placeholder="john@example.com" type="email" />
			<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
			<SelectField
				label="Country"
				placeholder="Select country"
				options={countries}
			/>
			<Field label="Street Address" placeholder="123 Main Street" />
			<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
			<div className="grid @sm:grid-cols-3 gap-4">
				<Field label="City" placeholder="City" />
				<SelectField label="State" placeholder="State" options={states} />
				<Field label="ZIP" placeholder="12345" />
			</div>
			<div className="flex items-center gap-2 pt-2">
				<Checkbox id="billing" defaultChecked />
				<Label htmlFor="billing" className="text-sm font-normal cursor-pointer">
					Billing address same as shipping
				</Label>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const [step, setStep] = useState(1);

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
				<StepperNavigation currentStep={step} />

				<AddressForm countries={countries} states={states} />

				<div className="flex gap-3 mt-8">
					{step > 1 && (
						<Button
							variant="outline"
							size="lg"
							className="flex-1 gap-2"
							onClick={() => setStep(step - 1)}
						>
							<ChevronLeft className="size-4" />
							Back
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
