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
import {
	MapPin,
	User,
	Globe,
	Check,
	ChevronRight,
	ChevronLeft,
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

interface StepCardProps {
	step: number;
	icon: React.ElementType;
	title: string;
	subtitle: string;
	active: boolean;
	completed: boolean;
}

const StepCard = ({
	step,
	icon: Icon,
	title,
	subtitle,
	active,
	completed,
}: StepCardProps) => (
	<div
		className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
			active
				? 'bg-primary/10 ring-2 ring-primary'
				: completed
					? 'bg-green-500/10'
					: 'bg-muted/50'
		}`}
	>
		<div
			className={`size-12 rounded-xl flex items-center justify-center ${
				completed
					? 'bg-green-500 text-white'
					: active
						? 'bg-primary text-primary-foreground'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{completed ? <Check className="size-6" /> : <Icon className="size-6" />}
		</div>
		<div>
			<p className="text-xs text-muted-foreground">Step {step}</p>
			<h3 className="font-semibold">{title}</h3>
			<p className="text-xs text-muted-foreground">{subtitle}</p>
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

const ContactForm = () => (
	<Card>
		<CardContent className="pt-6 space-y-4">
			<div className="flex items-center gap-3 mb-4">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<User className="size-5 text-primary" />
				</div>
				<h2 className="text-xl font-bold">Contact Details</h2>
			</div>
			<div className="grid @sm:grid-cols-2 gap-4">
				<Field label="First Name" placeholder="John" />
				<Field label="Last Name" placeholder="Doe" />
			</div>
			<Field label="Email" placeholder="john@example.com" type="email" />
			<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		</CardContent>
	</Card>
);

const LocationForm = ({
	countries,
}: {
	countries: { value: string; label: string }[];
}) => (
	<Card>
		<CardContent className="pt-6 space-y-4">
			<div className="flex items-center gap-3 mb-4">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<Globe className="size-5 text-primary" />
				</div>
				<h2 className="text-xl font-bold">Location</h2>
			</div>
			<SelectField
				label="Country / Region"
				placeholder="Select your country"
				options={countries}
			/>
			<Field label="City" placeholder="San Francisco" />
		</CardContent>
	</Card>
);

const AddressForm = ({
	states,
}: {
	states: { value: string; label: string }[];
}) => (
	<Card>
		<CardContent className="pt-6 space-y-4">
			<div className="flex items-center gap-3 mb-4">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<MapPin className="size-5 text-primary" />
				</div>
				<h2 className="text-xl font-bold">Address</h2>
			</div>
			<Field label="Street Address" placeholder="123 Main Street" />
			<Field label="Apartment / Suite" placeholder="Apt 4B (Optional)" />
			<div className="grid @sm:grid-cols-2 gap-4">
				<SelectField
					label="State"
					placeholder="Select state"
					options={states}
				/>
				<Field label="ZIP Code" placeholder="94102" />
			</div>
			<div className="flex items-center gap-2 pt-2">
				<Checkbox id="save" defaultChecked />
				<Label htmlFor="save" className="text-sm font-normal cursor-pointer">
					Save for future orders
				</Label>
			</div>
		</CardContent>
	</Card>
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

	const steps = [
		{ icon: User, title: 'Contact', subtitle: 'Your details' },
		{ icon: Globe, title: 'Location', subtitle: 'Country & city' },
		{ icon: MapPin, title: 'Address', subtitle: 'Full address' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-8">
					<Badge variant="outline" className="mb-3">
						Checkout
					</Badge>
					<h1 className="text-2xl @md:text-3xl font-bold">
						Shipping Information
					</h1>
				</div>

				<div className="grid @lg:grid-cols-3 gap-4 mb-8">
					{steps.map((s, i) => (
						<StepCard
							key={i}
							step={i + 1}
							{...s}
							active={i + 1 === step}
							completed={i + 1 < step}
						/>
					))}
				</div>

				{step === 1 && <ContactForm />}
				{step === 2 && <LocationForm countries={countries} />}
				{step === 3 && <AddressForm states={states} />}

				<div className="flex gap-3 mt-8">
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
						onClick={() => setStep(Math.min(4, step + 1))}
					>
						{step === 3 ? 'Continue to Payment' : 'Next Step'}
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
