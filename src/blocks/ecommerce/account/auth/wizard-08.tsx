import Link from 'next/link';
import {
	Mail,
	Lock,
	User,
	ArrowRight,
	ArrowLeft,
	CreditCard,
	MapPin,
	Shield,
	Package,
	Check,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const VerticalSteps = ({
	steps,
	currentStep,
}: {
	steps: { title: string; description: string }[];
	currentStep: number;
}) => (
	<div className="space-y-4 mb-6">
		{steps.map((step, index) => (
			<div key={step.title} className="flex items-start gap-3">
				<div
					className={`size-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
						index + 1 < currentStep
							? 'bg-primary text-primary-foreground'
							: index + 1 === currentStep
								? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
								: 'bg-muted text-muted-foreground'
					}`}
				>
					{index + 1 < currentStep ? <Check className="size-4" /> : index + 1}
				</div>
				<div className={index + 1 === currentStep ? '' : 'opacity-50'}>
					<p className="font-medium text-sm">{step.title}</p>
					<p className="text-xs text-muted-foreground">{step.description}</p>
				</div>
			</div>
		))}
	</div>
);

const FormField = ({
	label,
	type,
	placeholder,
	icon: Icon,
	id,
}: {
	label: string;
	type: string;
	placeholder: string;
	icon?: React.ElementType;
	id: string;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id}>{label}</Label>
		{Icon ? (
			<div className="relative">
				<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input
					id={id}
					type={type}
					placeholder={placeholder}
					className="pl-10"
				/>
			</div>
		) : (
			<Input id={id} type={type} placeholder={placeholder} />
		)}
	</div>
);

const SelectField = ({
	label,
	placeholder,
	options,
}: {
	label: string;
	placeholder: string;
	options: string[];
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Select>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem
						key={option}
						value={option.toLowerCase().replace(/\s/g, '-')}
					>
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const NavigationButtons = ({
	showBack,
	nextLabel,
}: {
	showBack: boolean;
	nextLabel: string;
}) => (
	<div className="flex gap-3">
		{showBack && (
			<Button type="button" variant="outline" className="gap-2">
				<ArrowLeft className="size-4" />
				Back
			</Button>
		)}
		<Button type="submit" className="flex-1 gap-2 group">
			{nextLabel}
			<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
		</Button>
	</div>
);

const ShippingAddressStep = () => {
	const countries = ['United States', 'Canada', 'United Kingdom', 'Australia'];

	return (
		<form className="space-y-4">
			<div className="grid grid-cols-2 gap-3">
				<FormField
					id="ship-first"
					label="First Name"
					type="text"
					placeholder="John"
				/>
				<FormField
					id="ship-last"
					label="Last Name"
					type="text"
					placeholder="Doe"
				/>
			</div>
			<FormField
				id="ship-address"
				label="Address"
				type="text"
				placeholder="123 Main St"
				icon={MapPin}
			/>
			<FormField
				id="ship-apt"
				label="Apt/Suite (optional)"
				type="text"
				placeholder="Apt 4B"
			/>
			<div className="grid grid-cols-2 gap-3">
				<FormField
					id="ship-city"
					label="City"
					type="text"
					placeholder="New York"
				/>
				<FormField
					id="ship-zip"
					label="ZIP Code"
					type="text"
					placeholder="10001"
				/>
			</div>
			<SelectField
				label="Country"
				placeholder="Select country"
				options={countries}
			/>
			<NavigationButtons showBack={true} nextLabel="Continue to Payment" />
		</form>
	);
};

export default function Main() {
	const steps = [
		{ title: 'Account', description: 'Create your account' },
		{ title: 'Shipping', description: 'Add shipping address' },
		{ title: 'Payment', description: 'Add payment method' },
		{ title: 'Review', description: 'Confirm your order' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="QuickShop" icon={Package} />
						</div>
						<CardTitle className="text-2xl">Checkout</CardTitle>
						<CardDescription>Complete your order</CardDescription>
					</CardHeader>
					<CardContent>
						<VerticalSteps steps={steps} currentStep={2} />
						<ShippingAddressStep />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
