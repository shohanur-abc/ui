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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	MapPin,
	Truck,
	Clock,
	CheckCircle,
	ArrowRight,
	ArrowLeft,
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

interface ShippingOptionProps {
	value: string;
	label: string;
	time: string;
	price: string;
}

const SegmentedStepper = ({ currentStep }: { currentStep: number }) => {
	const steps = ['Address', 'Delivery'];

	return (
		<div className="flex items-center gap-1 p-1 bg-muted rounded-lg mb-8">
			{steps.map((label, i) => (
				<button
					key={label}
					type="button"
					className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all ${
						i + 1 === currentStep
							? 'bg-background shadow-sm'
							: i + 1 < currentStep
								? 'text-green-600 dark:text-green-400'
								: 'text-muted-foreground'
					}`}
				>
					{i + 1 < currentStep ? (
						<CheckCircle className="size-4" />
					) : (
						<span
							className={`size-5 rounded-full flex items-center justify-center text-xs ${
								i + 1 === currentStep
									? 'bg-primary text-primary-foreground'
									: 'bg-muted-foreground/30'
							}`}
						>
							{i + 1}
						</span>
					)}
					{label}
				</button>
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

const ShippingOption = ({ value, label, time, price }: ShippingOptionProps) => (
	<label className="flex items-center gap-4 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
		<RadioGroupItem value={value} />
		<div className="flex-1">
			<p className="font-medium">{label}</p>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Clock className="size-3.5" />
				<span>{time}</span>
			</div>
		</div>
		<span className="font-bold text-primary">{price}</span>
	</label>
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
			<CardTitle className="flex items-center gap-2">
				<MapPin className="size-5 text-primary" />
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
			<Separator />
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
		</CardContent>
	</Card>
);

const DeliveryStep = () => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<Truck className="size-5 text-primary" />
				Delivery Method
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<RadioGroup defaultValue="standard" className="space-y-3">
				<ShippingOption
					value="express"
					label="Express Delivery"
					time="1-2 business days"
					price="$14.99"
				/>
				<ShippingOption
					value="standard"
					label="Standard Shipping"
					time="3-5 business days"
					price="FREE"
				/>
				<ShippingOption
					value="economy"
					label="Economy"
					time="7-10 business days"
					price="FREE"
				/>
			</RadioGroup>
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
				<SegmentedStepper currentStep={step} />

				{step === 1 && <AddressForm countries={countries} states={states} />}
				{step === 2 && <DeliveryStep />}

				<div className="flex gap-3 mt-8">
					{step > 1 && (
						<Button
							variant="outline"
							size="lg"
							className="flex-1 gap-2"
							onClick={() => setStep(step - 1)}
						>
							<ArrowLeft className="size-4" />
							Edit Address
						</Button>
					)}
					<Button
						size="lg"
						className={`gap-2 ${step === 1 ? 'w-full' : 'flex-1'}`}
						onClick={() => setStep(Math.min(3, step + 1))}
					>
						{step === 2 ? 'Continue to Payment' : 'Choose Delivery'}
						<ArrowRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
