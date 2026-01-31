'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Home,
	Building2,
	Store,
	MapPin,
	ArrowRight,
	ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';

interface AddressTypeProps {
	value: string;
	icon: React.ElementType;
	label: string;
	description: string;
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

const WizardHeader = ({ step, total }: { step: number; total: number }) => (
	<div className="text-center mb-8">
		<Badge variant="outline" className="mb-3">
			Step {step} of {total}
		</Badge>
		<h1 className="text-2xl @md:text-3xl font-bold">
			{step === 1 && 'How do you want to receive your order?'}
			{step === 2 && 'Enter your address details'}
			{step === 3 && 'Review your delivery address'}
		</h1>
	</div>
);

const AddressTypeOption = ({
	value,
	icon: Icon,
	label,
	description,
}: AddressTypeProps) => (
	<label className="cursor-pointer">
		<Card className="h-full transition-all hover:shadow-md has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
			<CardContent className="pt-6 text-center">
				<RadioGroupItem value={value} className="sr-only" />
				<div className="size-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4 transition-colors group-has-[:checked]:bg-primary/10">
					<Icon className="size-7 text-muted-foreground group-has-[:checked]:text-primary" />
				</div>
				<h3 className="font-semibold">{label}</h3>
				<p className="text-sm text-muted-foreground mt-1">{description}</p>
			</CardContent>
		</Card>
	</label>
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

const StepOne = () => (
	<RadioGroup defaultValue="home" className="grid @sm:grid-cols-3 gap-4">
		<AddressTypeOption
			value="home"
			icon={Home}
			label="Home Delivery"
			description="Deliver to your doorstep"
		/>
		<AddressTypeOption
			value="office"
			icon={Building2}
			label="Office Delivery"
			description="Deliver to your workplace"
		/>
		<AddressTypeOption
			value="pickup"
			icon={Store}
			label="Store Pickup"
			description="Pick up from nearest store"
		/>
	</RadioGroup>
);

const StepTwo = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<Card>
		<CardContent className="pt-6 space-y-4">
			<div className="grid @sm:grid-cols-2 gap-4">
				<Field label="First Name" placeholder="John" />
				<Field label="Last Name" placeholder="Doe" />
			</div>
			<Field label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
			<Separator className="my-4" />
			<SelectField
				label="Country"
				placeholder="Select country"
				options={countries}
			/>
			<Field label="Street Address" placeholder="123 Main Street" />
			<Field label="Apt / Suite / Building" placeholder="Apt 4B (Optional)" />
			<div className="grid @sm:grid-cols-3 gap-4">
				<Field label="City" placeholder="City" />
				<SelectField label="State" placeholder="State" options={states} />
				<Field label="ZIP" placeholder="12345" />
			</div>
		</CardContent>
	</Card>
);

const StepThree = () => (
	<Card className="bg-muted/30">
		<CardContent className="pt-6">
			<div className="flex items-start gap-4">
				<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
					<MapPin className="size-6 text-primary" />
				</div>
				<div className="flex-1">
					<h3 className="font-semibold text-lg mb-1">Home Delivery</h3>
					<div className="text-sm text-muted-foreground space-y-1">
						<p className="font-medium text-foreground">John Doe</p>
						<p>123 Main Street, Apt 4B</p>
						<p>San Francisco, CA 94102</p>
						<p>United States</p>
						<p className="pt-2">+1 (555) 000-0000</p>
					</div>
					<Button variant="link" className="px-0 mt-2">
						Edit Address
					</Button>
				</div>
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
				<WizardHeader step={step} total={3} />

				{step === 1 && <StepOne />}
				{step === 2 && <StepTwo countries={countries} states={states} />}
				{step === 3 && <StepThree />}

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
