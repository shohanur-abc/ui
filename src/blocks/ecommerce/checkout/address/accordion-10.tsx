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
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
	CheckCircle2,
	Circle,
	MapPin,
	User,
	CreditCard,
	Sparkles,
	ArrowRight,
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

interface StepIndicatorProps {
	completed: boolean;
	active: boolean;
	label: string;
	stepNumber: number;
}

const StepIndicator = ({
	completed,
	active,
	label,
	stepNumber,
}: StepIndicatorProps) => (
	<div className="flex items-center gap-2">
		<div
			className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${
				completed
					? 'bg-green-500 text-white'
					: active
						? 'bg-primary text-primary-foreground ring-2 ring-primary/30'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{completed ? <CheckCircle2 className="size-4" /> : stepNumber}
		</div>
		<span
			className={`text-sm hidden @sm:inline ${
				active ? 'font-medium' : 'text-muted-foreground'
			}`}
		>
			{label}
		</span>
	</div>
);

const ProgressHeader = ({
	currentStep,
	totalSteps,
}: {
	currentStep: number;
	totalSteps: number;
}) => {
	const steps = [
		{ label: 'Contact', icon: User },
		{ label: 'Address', icon: MapPin },
		{ label: 'Billing', icon: CreditCard },
	];

	return (
		<div className="mb-8">
			<div className="flex items-center justify-between mb-4">
				{steps.map((step, i) => (
					<div key={step.label} className="flex items-center gap-2">
						<StepIndicator
							stepNumber={i + 1}
							label={step.label}
							completed={i + 1 < currentStep}
							active={i + 1 === currentStep}
						/>
						{i < steps.length - 1 && (
							<div
								className={`h-0.5 w-8 @sm:w-16 ${
									i + 1 < currentStep ? 'bg-green-500' : 'bg-border'
								}`}
							/>
						)}
					</div>
				))}
			</div>
			<Progress value={(currentStep / totalSteps) * 100} className="h-2" />
			<p className="text-xs text-muted-foreground mt-2 text-center">
				Step {currentStep} of {totalSteps}
			</p>
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

const AccordionSectionHeader = ({
	icon: Icon,
	title,
	completed,
}: {
	icon: React.ElementType;
	title: string;
	completed?: boolean;
}) => (
	<div className="flex items-center gap-3 flex-1">
		<div
			className={`size-8 rounded-lg flex items-center justify-center ${
				completed ? 'bg-green-500/10' : 'bg-primary/10'
			}`}
		>
			{completed ? (
				<CheckCircle2 className="size-4 text-green-500" />
			) : (
				<Icon className="size-4 text-primary" />
			)}
		</div>
		<span className="font-semibold">{title}</span>
		{completed && (
			<Badge
				variant="secondary"
				className="ml-auto bg-green-500/10 text-green-600 dark:text-green-400"
			>
				Complete
			</Badge>
		)}
	</div>
);

const ContactSection = () => (
	<div className="space-y-4 pt-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Email" placeholder="john@example.com" type="email" />
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<div className="flex items-center gap-2">
			<Checkbox id="marketing" />
			<Label htmlFor="marketing" className="text-sm font-normal cursor-pointer">
				Send me exclusive offers and updates
			</Label>
		</div>
	</div>
);

const AddressSection = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4 pt-4">
		<SelectField label="Country" placeholder="Select country" options={countries} />
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
	</div>
);

const BillingSection = () => (
	<div className="space-y-4 pt-4">
		<div className="flex items-center gap-2">
			<Checkbox id="same-billing" defaultChecked />
			<Label htmlFor="same-billing" className="text-sm font-normal cursor-pointer">
				Billing address same as shipping
			</Label>
		</div>
		<div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
			<div className="flex items-start gap-3">
				<Sparkles className="size-5 text-primary shrink-0 mt-0.5" />
				<div className="text-sm">
					<p className="font-medium">You&apos;re almost done!</p>
					<p className="text-muted-foreground">
						Complete this step to proceed to payment options
					</p>
				</div>
			</div>
		</div>
	</div>
);

export default function Main() {
	const [step, setStep] = useState(2);
	const [completedSections, setCompletedSections] = useState(['contact']);

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
				<ProgressHeader currentStep={step} totalSteps={3} />

				<Card>
					<CardContent className="pt-6">
						<Accordion
							type="single"
							collapsible
							defaultValue="address"
						>
							<AccordionItem value="contact">
								<AccordionTrigger className="hover:no-underline">
									<AccordionSectionHeader
										icon={User}
										title="Contact Information"
										completed={completedSections.includes('contact')}
									/>
								</AccordionTrigger>
								<AccordionContent>
									<ContactSection />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="address">
								<AccordionTrigger className="hover:no-underline">
									<AccordionSectionHeader
										icon={MapPin}
										title="Shipping Address"
										completed={completedSections.includes('address')}
									/>
								</AccordionTrigger>
								<AccordionContent>
									<AddressSection countries={countries} states={states} />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="billing">
								<AccordionTrigger className="hover:no-underline">
									<AccordionSectionHeader
										icon={CreditCard}
										title="Billing Address"
										completed={completedSections.includes('billing')}
									/>
								</AccordionTrigger>
								<AccordionContent>
									<BillingSection />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Payment
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
