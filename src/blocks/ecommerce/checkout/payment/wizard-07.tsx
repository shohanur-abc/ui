'use client';

import { ArrowLeft, ArrowRight, Calendar, Check, Clock, CreditCard, Gift, Lock, Package, RefreshCcw, Shield, Star, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface SubscriptionPlan {
	id: string;
	name: string;
	price: string;
	interval: string;
	savings?: string;
	popular?: boolean;
}

const StepCards = ({ steps, currentStep }: { steps: { title: string; subtitle: string }[]; currentStep: number }) => (
	<div className="grid grid-cols-4 gap-2 mb-6">
		{steps.map((step, index) => (
			<div
				key={index}
				className={`p-2 rounded-lg text-center transition-all ${
					index === currentStep
						? 'bg-primary text-primary-foreground'
						: index < currentStep
							? 'bg-primary/10 text-primary'
							: 'bg-muted text-muted-foreground'
				}`}
			>
				<span className="text-xs font-medium">{step.title}</span>
			</div>
		))}
	</div>
);

const PlanSelectionContent = ({ plans }: { plans: SubscriptionPlan[] }) => (
	<div className="space-y-3">
		<RadioGroup defaultValue={plans.find(p => p.popular)?.id || plans[0].id} className="space-y-3">
			{plans.map((plan) => (
				<Label
					key={plan.id}
					htmlFor={plan.id}
					className={`relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5 ${
						plan.popular ? 'ring-2 ring-primary/20' : ''
					}`}
				>
					{plan.popular && (
						<Badge className="absolute -top-2.5 right-3 text-xs gap-0.5">
							<Star className="size-2.5" />
							Best Value
						</Badge>
					)}
					<RadioGroupItem value={plan.id} id={plan.id} />
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="font-medium">{plan.name}</span>
							{plan.savings && <Badge variant="secondary" className="text-xs text-emerald-600">{plan.savings}</Badge>}
						</div>
						<p className="text-xs text-muted-foreground">{plan.interval}</p>
					</div>
					<span className="text-lg font-bold">{plan.price}</span>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const DeliveryFrequencyContent = () => (
	<div className="space-y-4">
		<RadioGroup defaultValue="monthly" className="space-y-3">
			{[
				{ id: 'weekly', name: 'Weekly', description: 'Every 7 days', icon: Clock },
				{ id: 'biweekly', name: 'Bi-Weekly', description: 'Every 14 days', icon: RefreshCcw },
				{ id: 'monthly', name: 'Monthly', description: 'Every 30 days', icon: Calendar, popular: true },
			].map((freq) => (
				<Label
					key={freq.id}
					htmlFor={freq.id}
					className={`relative flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5 ${
						freq.popular ? 'ring-2 ring-primary/20' : ''
					}`}
				>
					{freq.popular && (
						<Badge variant="secondary" className="absolute -top-2 right-3 text-xs">Popular</Badge>
					)}
					<RadioGroupItem value={freq.id} id={freq.id} />
					<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
						<freq.icon className="size-5" />
					</div>
					<div className="flex-1">
						<span className="font-medium">{freq.name}</span>
						<p className="text-xs text-muted-foreground">{freq.description}</p>
					</div>
				</Label>
			))}
		</RadioGroup>
		<div className="p-3 rounded-lg bg-muted/30">
			<div className="flex items-center gap-2 text-sm">
				<Package className="size-4 text-muted-foreground" />
				<span>First delivery: <strong>January 15, 2025</strong></span>
			</div>
		</div>
	</div>
);

const PaymentMethodContent = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label className="text-sm">Card Number</Label>
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="1234 5678 9012 3456" className="pl-10" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Name on Card</Label>
			<Input placeholder="JOHN DOE" />
		</div>
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">Expiry</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">CVV</Label>
				<Input type="password" placeholder="•••" />
			</div>
		</div>
		<div className="p-3 rounded-lg bg-muted/30 flex items-center gap-2">
			<RefreshCcw className="size-4 text-muted-foreground" />
			<span className="text-sm text-muted-foreground">Card will be charged automatically each billing period</span>
		</div>
	</div>
);

const ReviewContent = () => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-muted/30 space-y-3">
			<div className="flex items-center justify-between">
				<span className="font-medium">Annual Plan</span>
				<Badge variant="secondary" className="text-emerald-600">Save 20%</Badge>
			</div>
			<Separator />
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Billing</span>
				<span>$95.88/year</span>
			</div>
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Delivery</span>
				<span>Monthly</span>
			</div>
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">First delivery</span>
				<span>Jan 15, 2025</span>
			</div>
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Payment method</span>
				<span>Visa •••• 4242</span>
			</div>
		</div>
		<div className="space-y-3">
			<div className="flex items-start gap-3">
				<Checkbox id="terms" className="mt-0.5" />
				<Label htmlFor="terms" className="text-sm cursor-pointer">
					I agree to the <a href="#" className="text-primary underline">subscription terms</a> and authorize automatic billing
				</Label>
			</div>
			<div className="flex items-start gap-3">
				<Checkbox id="cancel" className="mt-0.5" defaultChecked />
				<Label htmlFor="cancel" className="text-sm cursor-pointer">
					Send me a reminder before each renewal
				</Label>
			</div>
		</div>
	</div>
);

const SubscriptionSummary = ({ plan, billing, firstCharge }: { plan: string; billing: string; firstCharge: string }) => (
	<div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
		<div className="flex items-center justify-between">
			<div>
				<span className="font-medium">{plan}</span>
				<p className="text-xs text-muted-foreground">{billing}</p>
			</div>
			<span className="text-xl font-bold">{firstCharge}</span>
		</div>
		<div className="flex items-center gap-2 text-xs text-muted-foreground">
			<Gift className="size-3" />
			<span>Includes free welcome gift with first delivery</span>
		</div>
	</div>
);

const NavigationButtons = ({ step, totalSteps, onPrev, onNext }: { step: number; totalSteps: number; onPrev: () => void; onNext: () => void }) => (
	<div className="flex gap-3">
		{step > 0 && (
			<Button variant="outline" onClick={onPrev} className="gap-2">
				<ArrowLeft className="size-4" />
			</Button>
		)}
		<Button onClick={onNext} className="flex-1 gap-2">
			{step < totalSteps - 1 ? (
				<>
					Continue
					<ArrowRight className="size-4" />
				</>
			) : (
				<>
					<Zap className="size-4" />
					Start Subscription
				</>
			)}
		</Button>
	</div>
);

export default function Main() {
	const currentStep = 2;

	const steps = [
		{ title: 'Plan', subtitle: 'Choose plan' },
		{ title: 'Frequency', subtitle: 'Delivery' },
		{ title: 'Payment', subtitle: 'Card info' },
		{ title: 'Review', subtitle: 'Confirm' },
	];

	const plans: SubscriptionPlan[] = [
		{ id: 'monthly', name: 'Monthly', price: '$9.99', interval: 'Billed monthly' },
		{ id: 'yearly', name: 'Annual', price: '$95.88', interval: 'Billed yearly ($7.99/mo)', savings: 'Save 20%', popular: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<StepCards steps={steps} currentStep={currentStep} />
						<div className="text-center">
							<h2 className="text-xl font-semibold">Payment Method</h2>
							<p className="text-sm text-muted-foreground">Add your payment details</p>
						</div>
					</CardHeader>
					<CardContent>
						<PaymentMethodContent />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<SubscriptionSummary plan="Annual Plan" billing="Billed yearly" firstCharge="$95.88" />
						<NavigationButtons step={currentStep} totalSteps={steps.length} onPrev={() => {}} onNext={() => {}} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
