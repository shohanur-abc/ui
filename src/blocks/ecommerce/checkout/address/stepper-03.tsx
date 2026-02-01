'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ArrowLeft, Check, Circle } from 'lucide-react';
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

interface InlineStepProps {
	step: number;
	label: string;
	active: boolean;
	completed: boolean;
	onClick: () => void;
}

const InlineStep = ({
	step,
	label,
	active,
	completed,
	onClick,
}: InlineStepProps) => (
	<button
		type="button"
		onClick={onClick}
		className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
			active
				? 'bg-primary text-primary-foreground'
				: completed
					? 'bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20'
					: 'bg-muted/50 text-muted-foreground hover:bg-muted'
		}`}
	>
		<div
			className={`size-8 rounded-full flex items-center justify-center text-sm font-bold ${
				active
					? 'bg-white/20'
					: completed
						? 'bg-green-500 text-white'
						: 'bg-muted-foreground/20'
			}`}
		>
			{completed ? <Check className="size-4" /> : step}
		</div>
		<span className="font-medium">{label}</span>
	</button>
);

const InlineStepperNav = ({
	currentStep,
	setStep,
}: {
	currentStep: number;
	setStep: (step: number) => void;
}) => {
	const steps = ['Contact', 'Address', 'Review'];

	return (
		<div className="flex flex-wrap gap-2 mb-8">
			{steps.map((label, i) => (
				<InlineStep
					key={label}
					step={i + 1}
					label={label}
					active={i + 1 === currentStep}
					completed={i + 1 < currentStep}
					onClick={() => i + 1 <= currentStep && setStep(i + 1)}
				/>
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

const StepCard = ({
	title,
	description,
	children,
}: {
	title: string;
	description: string;
	children: React.ReactNode;
}) => (
	<Card>
		<CardHeader>
			<CardTitle>{title}</CardTitle>
			<p className="text-sm text-muted-foreground">{description}</p>
		</CardHeader>
		<CardContent>{children}</CardContent>
	</Card>
);

const ContactForm = () => (
	<div className="space-y-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Email" placeholder="john@example.com" type="email" />
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
	</div>
);

const AddressForm = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
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
	</div>
);

const ReviewSection = () => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-muted/30">
			<h4 className="text-sm font-medium text-muted-foreground mb-2">
				Contact
			</h4>
			<p className="font-medium">John Doe</p>
			<p className="text-sm text-muted-foreground">
				john@example.com • +1 (555) 000-0000
			</p>
		</div>
		<div className="p-4 rounded-xl bg-muted/30">
			<h4 className="text-sm font-medium text-muted-foreground mb-2">
				Shipping Address
			</h4>
			<p className="font-medium">123 Main Street, Apt 4B</p>
			<p className="text-sm text-muted-foreground">
				San Francisco, CA 94102, United States
			</p>
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

	const stepContent = [
		{
			title: 'Contact Information',
			description: 'Enter your contact details',
			content: <ContactForm />,
		},
		{
			title: 'Shipping Address',
			description: 'Where should we deliver?',
			content: <AddressForm countries={countries} states={states} />,
		},
		{
			title: 'Review Information',
			description: 'Make sure everything is correct',
			content: <ReviewSection />,
		},
	];

	const current = stepContent[step - 1];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<InlineStepperNav currentStep={step} setStep={setStep} />

				<StepCard title={current.title} description={current.description}>
					{current.content}
				</StepCard>

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
