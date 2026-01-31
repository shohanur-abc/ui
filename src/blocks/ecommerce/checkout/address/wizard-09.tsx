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
import { Checkbox } from '@/components/ui/checkbox';
import {
	Truck,
	Zap,
	Package,
	ArrowRight,
	ArrowLeft,
	Sparkles,
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
	icon: React.ElementType;
	label: string;
	time: string;
	price: string;
	recommended?: boolean;
}

const AnimatedProgress = ({ step, total }: { step: number; total: number }) => (
	<div className="mb-8">
		<div className="flex justify-between items-center mb-3">
			<div className="flex items-center gap-2">
				<Sparkles className="size-5 text-primary" />
				<span className="font-medium">
					Step {step} of {total}
				</span>
			</div>
			<Badge
				variant="secondary"
				className="bg-primary/10 text-primary border-primary/20"
			>
				{Math.round((step / total) * 100)}% Complete
			</Badge>
		</div>
		<div className="h-3 bg-muted rounded-full overflow-hidden">
			<div
				className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500 rounded-full"
				style={{ width: `${(step / total) * 100}%` }}
			/>
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
	time,
	price,
	recommended,
}: ShippingOptionProps) => (
	<label className="block cursor-pointer">
		<Card
			className={`relative transition-all hover:shadow-md has-[:checked]:ring-2 has-[:checked]:ring-primary ${
				recommended ? 'bg-primary/5' : ''
			}`}
		>
			{recommended && (
				<Badge className="absolute -top-2 left-4 bg-gradient-to-r from-primary to-primary/60">
					Recommended
				</Badge>
			)}
			<CardContent className="py-4">
				<div className="flex items-center gap-4">
					<RadioGroupItem value={value} />
					<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
						<Icon className="size-5" />
					</div>
					<div className="flex-1">
						<p className="font-medium">{label}</p>
						<p className="text-sm text-muted-foreground">{time}</p>
					</div>
					<span className="font-bold text-primary">{price}</span>
				</div>
			</CardContent>
		</Card>
	</label>
);

const AddressStep = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<Package className="size-5 text-primary" />
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
			<Field label="Apartment / Suite" placeholder="Apt 4B (Optional)" />
			<div className="grid @sm:grid-cols-3 gap-4">
				<Field label="City" placeholder="City" />
				<SelectField label="State" placeholder="State" options={states} />
				<Field label="ZIP" placeholder="12345" />
			</div>
		</CardContent>
	</Card>
);

const ShippingStep = () => (
	<div className="space-y-4">
		<h2 className="text-xl font-bold">Shipping Method</h2>
		<p className="text-muted-foreground">
			Choose how you want your order delivered
		</p>
		<RadioGroup defaultValue="standard" className="space-y-3">
			<ShippingOption
				value="express"
				icon={Zap}
				label="Express Delivery"
				time="1-2 business days"
				price="$14.99"
			/>
			<ShippingOption
				value="standard"
				icon={Truck}
				label="Standard Shipping"
				time="3-5 business days"
				price="FREE"
				recommended
			/>
			<ShippingOption
				value="economy"
				icon={Package}
				label="Economy"
				time="7-10 business days"
				price="FREE"
			/>
		</RadioGroup>
		<div className="flex items-center gap-2 pt-4">
			<Checkbox id="carbon" defaultChecked />
			<Label htmlFor="carbon" className="text-sm font-normal cursor-pointer">
				Carbon neutral shipping (+$1.00)
			</Label>
		</div>
	</div>
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
				<AnimatedProgress step={step} total={2} />

				{step === 1 && <AddressStep countries={countries} states={states} />}
				{step === 2 && <ShippingStep />}

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
						onClick={() => setStep(Math.min(3, step + 1))}
					>
						{step === 2 ? 'Continue to Payment' : 'Choose Shipping'}
						<ArrowRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
