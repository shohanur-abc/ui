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
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
	ChevronRight,
	ChevronLeft,
	Home,
	Building2,
	MapPin,
	Check,
} from 'lucide-react';
import { useState } from 'react';

interface AddressTypeOptionProps {
	value: string;
	icon: React.ElementType;
	label: string;
	selected: boolean;
}

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

const WizardProgress = ({ step, total }: { step: number; total: number }) => (
	<div className="flex items-center justify-center gap-2 mb-8">
		{Array.from({ length: total }).map((_, i) => (
			<div
				key={i}
				className={`size-3 rounded-full transition-all ${
					i + 1 === step
						? 'bg-primary scale-125'
						: i + 1 < step
							? 'bg-green-500'
							: 'bg-muted'
				}`}
			/>
		))}
	</div>
);

const AddressTypeOption = ({
	value,
	icon: Icon,
	label,
	selected,
}: AddressTypeOptionProps) => (
	<label className="cursor-pointer">
		<div
			className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
				selected
					? 'border-primary bg-primary/5'
					: 'border-border hover:border-primary/50'
			}`}
		>
			<RadioGroupItem value={value} className="sr-only" />
			<div
				className={`size-14 rounded-full flex items-center justify-center transition-colors ${
					selected ? 'bg-primary text-primary-foreground' : 'bg-muted'
				}`}
			>
				<Icon className="size-7" />
			</div>
			<span className="font-medium">{label}</span>
		</div>
	</label>
);

const Field = ({ label, placeholder, type = 'text', required }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">
			{label}
			{required && <span className="text-destructive ml-1">*</span>}
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
			{required && <span className="text-destructive ml-1">*</span>}
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

const TypeStep = () => (
	<div className="text-center">
		<h2 className="text-2xl font-bold mb-2">Address Type</h2>
		<p className="text-muted-foreground mb-8">
			What kind of address are you adding?
		</p>
		<RadioGroup
			defaultValue="home"
			className="grid grid-cols-2 gap-4 max-w-md mx-auto"
		>
			<AddressTypeOption
				value="home"
				icon={Home}
				label="Home"
				selected={true}
			/>
			<AddressTypeOption
				value="office"
				icon={Building2}
				label="Office"
				selected={false}
			/>
		</RadioGroup>
	</div>
);

const DetailsStep = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div>
		<h2 className="text-2xl font-bold mb-2 text-center">Address Details</h2>
		<p className="text-muted-foreground mb-8 text-center">
			Enter your complete shipping address
		</p>
		<Card>
			<CardContent className="pt-6 space-y-4">
				<div className="grid @sm:grid-cols-2 gap-4">
					<Field label="First Name" placeholder="John" required />
					<Field label="Last Name" placeholder="Doe" required />
				</div>
				<Field
					label="Phone"
					placeholder="+1 (555) 000-0000"
					type="tel"
					required
				/>
				<Separator />
				<SelectField
					label="Country"
					placeholder="Select country"
					options={countries}
					required
				/>
				<Field label="Street Address" placeholder="123 Main Street" required />
				<Field label="Apartment / Suite" placeholder="Apt 4B (Optional)" />
				<div className="grid @sm:grid-cols-3 gap-4">
					<Field label="City" placeholder="City" required />
					<SelectField
						label="State"
						placeholder="State"
						options={states}
						required
					/>
					<Field label="ZIP" placeholder="12345" required />
				</div>
			</CardContent>
		</Card>
	</div>
);

const ConfirmStep = () => (
	<div className="text-center">
		<div className="size-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
			<Check className="size-10 text-green-500" />
		</div>
		<h2 className="text-2xl font-bold mb-2">Address Added</h2>
		<p className="text-muted-foreground mb-8">
			Your new shipping address has been saved
		</p>
		<Card className="text-left max-w-md mx-auto">
			<CardContent className="pt-6">
				<div className="flex items-start gap-3">
					<MapPin className="size-5 text-primary mt-0.5" />
					<div>
						<p className="font-semibold">John Doe</p>
						<p className="text-sm text-muted-foreground">
							123 Main Street, Apt 4B
							<br />
							San Francisco, CA 94102
							<br />
							United States
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
		<div className="flex items-center justify-center gap-2 mt-6">
			<Checkbox id="default" />
			<Label htmlFor="default" className="text-sm font-normal cursor-pointer">
				Set as default address
			</Label>
		</div>
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
				<WizardProgress step={step} total={3} />

				{step === 1 && <TypeStep />}
				{step === 2 && <DetailsStep countries={countries} states={states} />}
				{step === 3 && <ConfirmStep />}

				<div className="flex gap-3 mt-8">
					{step > 1 && step < 3 && (
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
						className={`gap-2 ${step === 1 || step === 3 ? 'w-full' : 'flex-1'}`}
						onClick={() => setStep(Math.min(4, step + 1))}
					>
						{step === 3 ? 'Continue to Checkout' : 'Continue'}
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
