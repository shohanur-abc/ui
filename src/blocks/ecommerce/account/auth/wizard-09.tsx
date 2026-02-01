import Link from 'next/link';
import {
	ArrowRight,
	ArrowLeft,
	CreditCard,
	Package,
	Check,
	Shield,
	Lock,
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
import { Badge } from '@/components/ui/badge';

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

const PaymentOption = ({
	value,
	label,
	description,
	icon: Icon,
	recommended,
}: {
	value: string;
	label: string;
	description: string;
	icon: React.ElementType;
	recommended?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<Icon className="size-4" />
				<span className="font-medium text-sm">{label}</span>
				{recommended && (
					<Badge variant="secondary" className="text-xs">
						Recommended
					</Badge>
				)}
			</div>
			<p className="text-xs text-muted-foreground mt-0.5">{description}</p>
		</div>
	</Label>
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

const SecurityBadge = ({
	icon: Icon,
	label,
}: {
	icon: React.ElementType;
	label: string;
}) => (
	<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
		<Icon className="size-3" />
		<span>{label}</span>
	</div>
);

const PaymentStep = () => (
	<form className="space-y-4">
		<RadioGroup defaultValue="card" className="space-y-2">
			<PaymentOption
				value="card"
				label="Credit/Debit Card"
				description="Visa, Mastercard, American Express"
				icon={CreditCard}
				recommended
			/>
			<PaymentOption
				value="paypal"
				label="PayPal"
				description="Pay with your PayPal account"
				icon={Shield}
			/>
		</RadioGroup>

		<div className="space-y-4 p-4 rounded-xl bg-muted/50 border border-border/50">
			<FormField
				id="card-number"
				label="Card Number"
				type="text"
				placeholder="1234 5678 9012 3456"
				icon={CreditCard}
			/>
			<div className="grid grid-cols-2 gap-3">
				<FormField
					id="card-expiry"
					label="Expiry"
					type="text"
					placeholder="MM/YY"
				/>
				<FormField
					id="card-cvc"
					label="CVC"
					type="text"
					placeholder="123"
					icon={Lock}
				/>
			</div>
			<FormField
				id="card-name"
				label="Name on Card"
				type="text"
				placeholder="John Doe"
			/>
		</div>

		<div className="flex items-center justify-center gap-4 py-2">
			<SecurityBadge icon={Lock} label="256-bit encryption" />
			<SecurityBadge icon={Shield} label="PCI compliant" />
		</div>

		<NavigationButtons showBack={true} nextLabel="Review Order" />
	</form>
);

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
						<CardTitle className="text-2xl">Payment</CardTitle>
						<CardDescription>Secure payment processing</CardDescription>
					</CardHeader>
					<CardContent>
						<VerticalSteps steps={steps} currentStep={3} />
						<PaymentStep />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
