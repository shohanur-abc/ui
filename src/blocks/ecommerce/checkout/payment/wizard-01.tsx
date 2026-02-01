'use client';

import {
	ArrowLeft,
	ArrowRight,
	Check,
	CreditCard,
	Lock,
	MapPin,
	Shield,
	Truck,
	User,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface WizardStep {
	number: number;
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	status: 'completed' | 'current' | 'upcoming';
}

const StepIndicator = ({
	steps,
	currentStep,
}: {
	steps: WizardStep[];
	currentStep: number;
}) => (
	<div className="flex items-center justify-between mb-8">
		{steps.map((step, index) => (
			<div key={index} className="flex items-center">
				<div className="flex flex-col items-center">
					<div
						className={`size-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
							step.status === 'completed'
								? 'bg-primary text-primary-foreground'
								: step.status === 'current'
									? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
									: 'bg-muted text-muted-foreground'
						}`}
					>
						{step.status === 'completed' ? (
							<Check className="size-5" />
						) : (
							<step.icon className="size-5" />
						)}
					</div>
					<span
						className={`text-xs mt-2 font-medium ${step.status === 'current' ? 'text-primary' : 'text-muted-foreground'}`}
					>
						{step.title}
					</span>
				</div>
				{index < steps.length - 1 && (
					<div
						className={`w-12 @sm:w-20 h-0.5 mx-2 ${step.status === 'completed' ? 'bg-primary' : 'bg-muted'}`}
					/>
				)}
			</div>
		))}
	</div>
);

const CustomerInfoStep = () => (
	<div className="space-y-4">
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">First Name</Label>
				<Input placeholder="John" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Last Name</Label>
				<Input placeholder="Doe" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Email Address</Label>
			<Input type="email" placeholder="john@example.com" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Phone Number</Label>
			<Input type="tel" placeholder="+1 (555) 000-0000" />
		</div>
		<div className="flex items-center gap-3">
			<Checkbox id="newsletter" />
			<Label htmlFor="newsletter" className="text-sm cursor-pointer">
				Receive order updates via SMS
			</Label>
		</div>
	</div>
);

const ShippingStep = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label className="text-sm">Street Address</Label>
			<Input placeholder="123 Main Street" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Apartment, suite, etc. (optional)</Label>
			<Input placeholder="Apt 4B" />
		</div>
		<div className="grid grid-cols-3 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">City</Label>
				<Input placeholder="New York" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">State</Label>
				<Input placeholder="NY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">ZIP Code</Label>
				<Input placeholder="10001" />
			</div>
		</div>
		<div className="flex items-center gap-3">
			<Checkbox id="save-address" defaultChecked />
			<Label htmlFor="save-address" className="text-sm cursor-pointer">
				Save as default address
			</Label>
		</div>
	</div>
);

const DeliveryStep = () => (
	<div className="space-y-3">
		{[
			{
				id: 'express',
				name: 'Express Delivery',
				time: '1-2 business days',
				price: '$14.99',
				recommended: true,
			},
			{
				id: 'standard',
				name: 'Standard Shipping',
				time: '3-5 business days',
				price: '$7.99',
			},
			{
				id: 'economy',
				name: 'Economy',
				time: '7-10 business days',
				price: 'Free',
			},
		].map((option) => (
			<Label
				key={option.id}
				htmlFor={option.id}
				className={`relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5 ${
					option.recommended ? 'ring-2 ring-primary/20' : ''
				}`}
			>
				{option.recommended && (
					<Badge className="absolute -top-2.5 left-4 text-xs">Fastest</Badge>
				)}
				<input
					type="radio"
					name="delivery"
					id={option.id}
					className="sr-only"
					defaultChecked={option.id === 'standard'}
				/>
				<Truck className="size-5 text-muted-foreground shrink-0" />
				<div className="flex-1">
					<span className="font-medium">{option.name}</span>
					<p className="text-xs text-muted-foreground">{option.time}</p>
				</div>
				<span
					className={`font-medium ${option.price === 'Free' ? 'text-primary' : ''}`}
				>
					{option.price}
				</span>
			</Label>
		))}
	</div>
);

const PaymentStep = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label className="text-sm">Card Number</Label>
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="1234 5678 9012 3456" className="pl-10" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Cardholder Name</Label>
			<Input placeholder="JOHN DOE" />
		</div>
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">Expiry Date</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">CVV</Label>
				<Input type="password" placeholder="•••" />
			</div>
		</div>
		<div className="flex items-center gap-3">
			<Checkbox id="save-card" />
			<Label htmlFor="save-card" className="text-sm cursor-pointer">
				Save card for future purchases
			</Label>
		</div>
	</div>
);

const NavigationButtons = ({
	step,
	onPrev,
	onNext,
}: {
	step: number;
	onPrev: () => void;
	onNext: () => void;
}) => (
	<div className="flex gap-3">
		{step > 1 && (
			<Button variant="outline" onClick={onPrev} className="gap-2">
				<ArrowLeft className="size-4" />
				Back
			</Button>
		)}
		<Button onClick={onNext} className="flex-1 gap-2">
			{step < 4 ? (
				<>
					Continue
					<ArrowRight className="size-4" />
				</>
			) : (
				<>
					<Lock className="size-4" />
					Place Order
				</>
			)}
		</Button>
	</div>
);

const OrderSummary = ({
	lines,
}: {
	lines: { label: string; value: string; isTotal?: boolean }[];
}) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<div
					className={`flex justify-between ${line.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}
				>
					<span className={line.isTotal ? '' : 'text-muted-foreground'}>
						{line.label}
					</span>
					<span>{line.value}</span>
				</div>
			</div>
		))}
	</div>
);

export default function Main() {
	const currentStep = 3;

	const steps: WizardStep[] = [
		{ number: 1, title: 'Info', icon: User, status: 'completed' },
		{ number: 2, title: 'Address', icon: MapPin, status: 'completed' },
		{ number: 3, title: 'Delivery', icon: Truck, status: 'current' },
		{ number: 4, title: 'Payment', icon: CreditCard, status: 'upcoming' },
	];

	const orderLines = [
		{ label: 'Subtotal (2 items)', value: '$299.00' },
		{ label: 'Shipping', value: '$7.99' },
		{ label: 'Tax', value: '$24.56' },
		{ label: 'Total', value: '$331.55', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-xl font-semibold">Checkout</h2>
							<Badge variant="outline" className="gap-1">
								<Shield className="size-3" />
								Secure
							</Badge>
						</div>
						<StepIndicator steps={steps} currentStep={currentStep} />
					</CardHeader>
					<CardContent>
						<div className="mb-4">
							<h3 className="text-lg font-medium mb-1">Delivery Method</h3>
							<p className="text-sm text-muted-foreground">
								Choose how you want to receive your order
							</p>
						</div>
						<DeliveryStep />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderSummary lines={orderLines} />
						<NavigationButtons
							step={currentStep}
							onPrev={() => {}}
							onNext={() => {}}
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
