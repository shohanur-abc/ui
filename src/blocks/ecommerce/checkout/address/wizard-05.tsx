'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
	Truck,
	Package,
	Zap,
	Clock,
	ArrowRight,
	ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';

interface ShippingOptionProps {
	value: string;
	icon: React.ElementType;
	label: string;
	description: string;
	price: string;
	days: string;
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

const PageHeader = ({
	step,
	total,
	title,
}: {
	step: number;
	total: number;
	title: string;
}) => (
	<div className="mb-8">
		<div className="flex items-center gap-3 mb-4">
			{Array.from({ length: total }).map((_, i) => (
				<div
					key={i}
					className={`flex-1 h-1 rounded-full transition-colors ${
						i + 1 <= step ? 'bg-primary' : 'bg-muted'
					}`}
				/>
			))}
		</div>
		<div className="flex items-center justify-between">
			<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
			<Badge variant="outline">
				{step}/{total}
			</Badge>
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

const ShippingOption = ({
	value,
	icon: Icon,
	label,
	description,
	price,
	days,
}: ShippingOptionProps) => (
	<label className="block cursor-pointer">
		<Card className="transition-all hover:shadow-md has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
			<CardContent className="py-4">
				<div className="flex items-center gap-4">
					<RadioGroupItem value={value} />
					<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
						<Icon className="size-5 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="font-semibold">{label}</span>
							<Badge variant="secondary" className="text-xs">
								{days}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
					<span className="font-semibold text-primary">{price}</span>
				</div>
			</CardContent>
		</Card>
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
		<CardContent className="pt-6 space-y-4">
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
			<Field label="Address Line 1" placeholder="123 Main Street" />
			<Field label="Address Line 2" placeholder="Apt, Suite, etc. (Optional)" />
			<div className="grid @sm:grid-cols-3 gap-4">
				<Field label="City" placeholder="City" />
				<SelectField label="State" placeholder="State" options={states} />
				<Field label="ZIP" placeholder="12345" />
			</div>
		</CardContent>
	</Card>
);

const ShippingStep = () => (
	<RadioGroup defaultValue="standard" className="space-y-3">
		<ShippingOption
			value="express"
			icon={Zap}
			label="Express Shipping"
			description="Priority handling with tracking"
			price="$14.99"
			days="1-2 days"
		/>
		<ShippingOption
			value="standard"
			icon={Truck}
			label="Standard Shipping"
			description="Regular delivery with tracking"
			price="FREE"
			days="3-5 days"
		/>
		<ShippingOption
			value="economy"
			icon={Package}
			label="Economy Shipping"
			description="Budget-friendly option"
			price="FREE"
			days="7-10 days"
		/>
	</RadioGroup>
);

const InstructionsStep = () => (
	<Card>
		<CardHeader>
			<CardTitle>Delivery Instructions</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="space-y-2">
				<Label>Special Instructions</Label>
				<Textarea
					placeholder="E.g., Leave at front door, Ring doorbell twice, etc."
					rows={4}
				/>
			</div>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Clock className="size-4" />
				<span>Drivers will follow your instructions when possible</span>
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

	const titles = [
		'Shipping Address',
		'Shipping Method',
		'Delivery Preferences',
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageHeader step={step} total={3} title={titles[step - 1]} />

				{step === 1 && <AddressForm countries={countries} states={states} />}
				{step === 2 && <ShippingStep />}
				{step === 3 && <InstructionsStep />}

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
						{step === 3 ? 'Continue to Payment' : 'Continue'}
						<ArrowRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
