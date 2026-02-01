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
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
	ChevronDown,
	MapPin,
	User,
	Settings,
	CheckCircle2,
	Circle,
	ArrowRight,
	X,
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

interface StepProps {
	number: number;
	title: string;
	isComplete: boolean;
	isActive: boolean;
	isOpen: boolean;
	onToggle: () => void;
	children: React.ReactNode;
}

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

const CollapsibleStep = ({
	number,
	title,
	isComplete,
	isActive,
	isOpen,
	onToggle,
	children,
}: StepProps) => (
	<Collapsible open={isOpen} onOpenChange={onToggle}>
		<div
			className={`border-l-4 transition-colors ${
				isComplete
					? 'border-l-green-500'
					: isActive
						? 'border-l-primary'
						: 'border-l-border'
			}`}
		>
			<CollapsibleTrigger asChild>
				<button
					type="button"
					className="flex items-center justify-between w-full p-4 hover:bg-muted/30 transition-colors"
				>
					<div className="flex items-center gap-4">
						<div
							className={`size-10 rounded-full flex items-center justify-center font-bold ${
								isComplete
									? 'bg-green-500 text-white'
									: isActive
										? 'bg-primary text-primary-foreground'
										: 'bg-muted text-muted-foreground'
							}`}
						>
							{isComplete ? <CheckCircle2 className="size-5" /> : number}
						</div>
						<div className="text-left">
							<span className="font-medium block">{title}</span>
							{isComplete && !isOpen && (
								<span className="text-sm text-green-600 dark:text-green-400">
									Completed
								</span>
							)}
						</div>
					</div>
					<ChevronDown
						className={`size-5 text-muted-foreground transition-transform ${
							isOpen ? 'rotate-180' : ''
						}`}
					/>
				</button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="px-4 pb-4 pl-[4.5rem]">{children}</div>
			</CollapsibleContent>
		</div>
	</Collapsible>
);

const ContactForm = ({ onComplete }: { onComplete: () => void }) => (
	<div className="space-y-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Email" placeholder="john@example.com" type="email" />
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<Button onClick={onComplete}>Save & Continue</Button>
	</div>
);

const AddressForm = ({
	countries,
	states,
	onComplete,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
	onComplete: () => void;
}) => (
	<div className="space-y-4">
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
		<Button onClick={onComplete}>Save & Continue</Button>
	</div>
);

const PreferencesForm = ({ onComplete }: { onComplete: () => void }) => (
	<div className="space-y-4">
		<div className="flex items-center gap-2">
			<Checkbox id="billing-same" defaultChecked />
			<Label
				htmlFor="billing-same"
				className="text-sm font-normal cursor-pointer"
			>
				Billing address same as shipping
			</Label>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="save-address" defaultChecked />
			<Label
				htmlFor="save-address"
				className="text-sm font-normal cursor-pointer"
			>
				Save this address for future orders
			</Label>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="newsletter" />
			<Label
				htmlFor="newsletter"
				className="text-sm font-normal cursor-pointer"
			>
				Subscribe to order updates via SMS
			</Label>
		</div>
		<Button onClick={onComplete}>Complete</Button>
	</div>
);

export default function Main() {
	const [completedSteps, setCompletedSteps] = useState<number[]>([]);
	const [openStep, setOpenStep] = useState(1);

	const completeStep = (step: number) => {
		if (!completedSteps.includes(step)) {
			setCompletedSteps([...completedSteps, step]);
		}
		setOpenStep(step + 1);
	};

	const progress = (completedSteps.length / 3) * 100;

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
				<div className="mb-8">
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-2xl @md:text-3xl font-bold">
							Complete Your Details
						</h1>
						<Badge variant="outline">{completedSteps.length}/3 Complete</Badge>
					</div>
					<Progress value={progress} className="h-2" />
				</div>

				<Card>
					<CardContent className="p-0">
						<CollapsibleStep
							number={1}
							title="Contact Information"
							isComplete={completedSteps.includes(1)}
							isActive={openStep === 1}
							isOpen={openStep === 1}
							onToggle={() => setOpenStep(openStep === 1 ? 0 : 1)}
						>
							<ContactForm onComplete={() => completeStep(1)} />
						</CollapsibleStep>

						<CollapsibleStep
							number={2}
							title="Shipping Address"
							isComplete={completedSteps.includes(2)}
							isActive={openStep === 2}
							isOpen={openStep === 2}
							onToggle={() =>
								completedSteps.includes(1) &&
								setOpenStep(openStep === 2 ? 0 : 2)
							}
						>
							<AddressForm
								countries={countries}
								states={states}
								onComplete={() => completeStep(2)}
							/>
						</CollapsibleStep>

						<CollapsibleStep
							number={3}
							title="Preferences"
							isComplete={completedSteps.includes(3)}
							isActive={openStep === 3}
							isOpen={openStep === 3}
							onToggle={() =>
								completedSteps.includes(2) &&
								setOpenStep(openStep === 3 ? 0 : 3)
							}
						>
							<PreferencesForm onComplete={() => completeStep(3)} />
						</CollapsibleStep>
					</CardContent>
				</Card>

				{completedSteps.length === 3 && (
					<Button size="lg" className="w-full mt-8 gap-2">
						Continue to Shipping Method
						<ArrowRight className="size-4" />
					</Button>
				)}
			</div>
		</section>
	);
}
