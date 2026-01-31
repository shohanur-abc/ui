'use client';

import { ArrowLeft, ArrowRight, Check, CreditCard, Gift, Lock, MapPin, Shield, Truck, User, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface StepConfig {
	id: string;
	title: string;
	description: string;
}

const ProgressHeader = ({ currentStep, totalSteps, title }: { currentStep: number; totalSteps: number; title: string }) => (
	<div className="space-y-3 mb-6">
		<div className="flex items-center justify-between">
			<span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
			<span className="text-sm font-medium">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
		</div>
		<Progress value={(currentStep / totalSteps) * 100} className="h-2" />
		<h2 className="text-xl font-semibold">{title}</h2>
	</div>
);

const PaymentMethodStep = () => (
	<div className="space-y-4">
		<RadioGroup defaultValue="card" className="space-y-3">
			{[
				{ id: 'card', name: 'Credit/Debit Card', description: 'Visa, Mastercard, Amex', icon: CreditCard, badge: 'Popular' },
				{ id: 'wallet', name: 'Digital Wallet', description: 'Apple Pay, Google Pay', icon: Wallet, badge: 'Fast' },
				{ id: 'gift', name: 'Gift Card', description: 'Use store credit', icon: Gift },
			].map((method) => (
				<Label
					key={method.id}
					htmlFor={method.id}
					className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
				>
					<RadioGroupItem value={method.id} id={method.id} />
					<div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
						<method.icon className="size-5" />
					</div>
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="font-medium">{method.name}</span>
							{method.badge && <Badge variant="secondary" className="text-xs">{method.badge}</Badge>}
						</div>
						<p className="text-xs text-muted-foreground">{method.description}</p>
					</div>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const CardDetailsStep = () => (
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
				<Label className="text-sm">Security Code</Label>
				<Input type="password" placeholder="CVV" />
			</div>
		</div>
		<div className="p-3 rounded-lg bg-muted/30 flex items-center gap-3">
			<Checkbox id="save-card" />
			<Label htmlFor="save-card" className="text-sm cursor-pointer">Save for faster checkout</Label>
		</div>
	</div>
);

const BillingAddressStep = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
			<Checkbox id="same-as-shipping" defaultChecked />
			<Label htmlFor="same-as-shipping" className="text-sm cursor-pointer">Same as shipping address</Label>
		</div>
		<Separator />
		<div className="space-y-2 opacity-50">
			<Label className="text-sm">Street Address</Label>
			<Input placeholder="123 Main Street" disabled />
		</div>
		<div className="grid grid-cols-3 gap-3 opacity-50">
			<div className="space-y-2">
				<Label className="text-sm">City</Label>
				<Input placeholder="New York" disabled />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">State</Label>
				<Input placeholder="NY" disabled />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">ZIP</Label>
				<Input placeholder="10001" disabled />
			</div>
		</div>
	</div>
);

const ReviewStep = () => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-muted/30 space-y-3">
			<div className="flex items-center gap-2">
				<CreditCard className="size-4 text-muted-foreground" />
				<span className="font-medium">Payment Method</span>
			</div>
			<div className="ml-6">
				<p className="text-sm">Visa •••• 4242</p>
				<p className="text-xs text-muted-foreground">Expires 12/26</p>
			</div>
		</div>
		<div className="p-4 rounded-xl bg-muted/30 space-y-3">
			<div className="flex items-center gap-2">
				<MapPin className="size-4 text-muted-foreground" />
				<span className="font-medium">Billing Address</span>
			</div>
			<div className="ml-6">
				<p className="text-sm">123 Main Street, Apt 4B</p>
				<p className="text-xs text-muted-foreground">New York, NY 10001</p>
			</div>
		</div>
		<div className="p-4 rounded-xl bg-muted/30 space-y-3">
			<div className="flex items-center gap-2">
				<Truck className="size-4 text-muted-foreground" />
				<span className="font-medium">Delivery</span>
			</div>
			<div className="ml-6">
				<p className="text-sm">Standard Shipping</p>
				<p className="text-xs text-muted-foreground">Arrives in 3-5 business days</p>
			</div>
		</div>
		<div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
			<Checkbox id="terms" className="mt-0.5" />
			<Label htmlFor="terms" className="text-sm cursor-pointer">
				I agree to the <a href="#" className="text-primary underline">Terms of Service</a> and <a href="#" className="text-primary underline">Privacy Policy</a>
			</Label>
		</div>
	</div>
);

const OrderSummaryCompact = ({ total }: { total: string }) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
		<span className="font-medium">Order Total</span>
		<span className="text-xl font-bold">{total}</span>
	</div>
);

const NavigationButtons = ({ step, totalSteps, onPrev, onNext }: { step: number; totalSteps: number; onPrev: () => void; onNext: () => void }) => (
	<div className="flex gap-3">
		{step > 1 && (
			<Button variant="outline" onClick={onPrev} className="gap-2">
				<ArrowLeft className="size-4" />
				Back
			</Button>
		)}
		<Button onClick={onNext} className="flex-1 gap-2">
			{step < totalSteps ? (
				<>
					Continue
					<ArrowRight className="size-4" />
				</>
			) : (
				<>
					<Lock className="size-4" />
					Complete Order
				</>
			)}
		</Button>
	</div>
);

export default function Main() {
	const currentStep = 2;
	const totalSteps = 4;

	const steps: StepConfig[] = [
		{ id: 'method', title: 'Payment Method', description: 'Select how to pay' },
		{ id: 'details', title: 'Card Details', description: 'Enter card information' },
		{ id: 'billing', title: 'Billing Address', description: 'Confirm billing info' },
		{ id: 'review', title: 'Review & Pay', description: 'Confirm your order' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<ProgressHeader currentStep={currentStep} totalSteps={totalSteps} title={steps[currentStep - 1].title} />
					</CardHeader>
					<CardContent>
						<CardDetailsStep />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderSummaryCompact total="$331.55" />
						<NavigationButtons step={currentStep} totalSteps={totalSteps} onPrev={() => {}} onNext={() => {}} />
						<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
							<Shield className="size-3" />
							<span>Your payment info is encrypted and secure</span>
						</div>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
