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
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
	MapPin,
	Package,
	User,
	ArrowRight,
	ArrowLeft,
	CheckCircle2,
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

const NumberedStepper = ({ currentStep }: { currentStep: number }) => {
	const steps = [
		{ label: 'Contact', icon: User },
		{ label: 'Address', icon: MapPin },
		{ label: 'Confirm', icon: Package },
	];

	return (
		<div className="mb-8">
			<div className="flex items-center justify-between mb-4">
				{steps.map((s, i) => (
					<div key={i} className="flex items-center gap-2">
						<div
							className={`relative size-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
								i + 1 < currentStep
									? 'bg-green-500 text-white'
									: i + 1 === currentStep
										? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
										: 'bg-muted text-muted-foreground'
							}`}
						>
							{i + 1 < currentStep ? (
								<CheckCircle2 className="size-6" />
							) : (
								i + 1
							)}
						</div>
						<span
							className={`hidden @sm:block text-sm ${
								i + 1 === currentStep
									? 'font-medium text-foreground'
									: 'text-muted-foreground'
							}`}
						>
							{s.label}
						</span>
						{i < steps.length - 1 && (
							<div
								className={`w-8 @sm:w-16 h-0.5 ml-2 ${
									i + 1 < currentStep ? 'bg-green-500' : 'bg-border'
								}`}
							/>
						)}
					</div>
				))}
			</div>
			<Progress value={(currentStep / steps.length) * 100} className="h-1" />
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

const ContactStep = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-3 mb-6">
			<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
				<User className="size-6 text-primary" />
			</div>
			<div>
				<h2 className="text-xl font-bold">Contact Details</h2>
				<p className="text-sm text-muted-foreground">
					How can we reach you?
				</p>
			</div>
		</div>
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Email Address" placeholder="john@example.com" type="email" />
		<Field label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="updates" />
			<Label htmlFor="updates" className="text-sm font-normal cursor-pointer">
				Send me order updates via SMS
			</Label>
		</div>
	</div>
);

const AddressStep = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="flex items-center gap-3 mb-6">
			<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
				<MapPin className="size-6 text-primary" />
			</div>
			<div>
				<h2 className="text-xl font-bold">Shipping Address</h2>
				<p className="text-sm text-muted-foreground">
					Where should we deliver?
				</p>
			</div>
		</div>
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
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="save" defaultChecked />
			<Label htmlFor="save" className="text-sm font-normal cursor-pointer">
				Save this address for future orders
			</Label>
		</div>
	</div>
);

const ConfirmStep = () => (
	<div className="space-y-6">
		<div className="flex items-center gap-3 mb-6">
			<div className="size-12 rounded-xl bg-green-500/10 flex items-center justify-center">
				<Package className="size-6 text-green-500" />
			</div>
			<div>
				<h2 className="text-xl font-bold">Confirm Details</h2>
				<p className="text-sm text-muted-foreground">
					Review your information
				</p>
			</div>
		</div>
		<Card className="bg-muted/30">
			<CardContent className="pt-6 space-y-4">
				<div>
					<Badge variant="outline" className="mb-2">
						Contact
					</Badge>
					<p className="font-medium">John Doe</p>
					<p className="text-sm text-muted-foreground">
						john@example.com • +1 (555) 000-0000
					</p>
				</div>
				<div>
					<Badge variant="outline" className="mb-2">
						Address
					</Badge>
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
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<NumberedStepper currentStep={step} />

				<Card>
					<CardContent className="pt-6">
						{step === 1 && <ContactStep />}
						{step === 2 && <AddressStep countries={countries} states={states} />}
						{step === 3 && <ConfirmStep />}
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
							Previous
						</Button>
					)}
					<Button
						size="lg"
						className={`gap-2 ${step === 1 ? 'w-full' : 'flex-1'}`}
						onClick={() => setStep(Math.min(4, step + 1))}
					>
						{step === 3 ? 'Continue to Payment' : 'Next Step'}
						<ArrowRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
