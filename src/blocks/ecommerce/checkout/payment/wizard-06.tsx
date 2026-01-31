'use client';

import { ArrowLeft, ArrowRight, Check, Clock, CreditCard, Gift, Lock, Percent, Shield, Star, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface InstallmentPlan {
	id: string;
	months: number;
	monthly: string;
	total: string;
	interest: string;
	recommended?: boolean;
}

const NumberedSteps = ({ steps, current }: { steps: string[]; current: number }) => (
	<div className="flex items-center justify-center gap-3 mb-6">
		{steps.map((step, index) => (
			<div key={index} className="flex items-center gap-2">
				<div
					className={`size-8 rounded-full flex items-center justify-center text-xs font-semibold ${
						index < current
							? 'bg-primary text-primary-foreground'
							: index === current
								? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
								: 'bg-muted text-muted-foreground'
					}`}
				>
					{index < current ? <Check className="size-4" /> : index + 1}
				</div>
				{index < steps.length - 1 && (
					<div className={`w-8 h-0.5 ${index < current ? 'bg-primary' : 'bg-muted'}`} />
				)}
			</div>
		))}
	</div>
);

const EligibilityCheck = () => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
			<div className="flex items-center gap-2 mb-2">
				<Check className="size-5 text-emerald-500" />
				<span className="font-medium text-emerald-700 dark:text-emerald-400">You're pre-approved!</span>
			</div>
			<p className="text-sm text-muted-foreground">Based on your account history, you qualify for installment payments.</p>
		</div>
		<div className="grid grid-cols-3 gap-3 text-center">
			<div className="p-3 rounded-xl bg-muted/30">
				<span className="text-2xl font-bold">0%</span>
				<p className="text-xs text-muted-foreground">APR</p>
			</div>
			<div className="p-3 rounded-xl bg-muted/30">
				<span className="text-2xl font-bold">$0</span>
				<p className="text-xs text-muted-foreground">Hidden fees</p>
			</div>
			<div className="p-3 rounded-xl bg-muted/30">
				<span className="text-2xl font-bold">12</span>
				<p className="text-xs text-muted-foreground">Max months</p>
			</div>
		</div>
	</div>
);

const PlanSelectionStep = ({ plans }: { plans: InstallmentPlan[] }) => (
	<div className="space-y-3">
		<RadioGroup defaultValue={plans.find(p => p.recommended)?.id || plans[0].id} className="space-y-3">
			{plans.map((plan) => (
				<Label
					key={plan.id}
					htmlFor={plan.id}
					className={`relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5 ${
						plan.recommended ? 'ring-2 ring-primary/20' : ''
					}`}
				>
					{plan.recommended && (
						<Badge className="absolute -top-2.5 left-4 text-xs gap-0.5">
							<Star className="size-2.5" />
							Recommended
						</Badge>
					)}
					<RadioGroupItem value={plan.id} id={plan.id} />
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="font-medium">{plan.months}x of {plan.monthly}</span>
						</div>
						<p className="text-xs text-muted-foreground">Total: {plan.total} • {plan.interest}</p>
					</div>
					<div className="size-10 rounded-lg bg-muted flex items-center justify-center font-bold">
						{plan.months}
					</div>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const PaymentSchedule = ({ payments }: { payments: { date: string; amount: string; status: 'paid' | 'upcoming' | 'scheduled' }[] }) => (
	<div className="space-y-3">
		{payments.map((payment, index) => (
			<div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
				<div className={`size-8 rounded-full flex items-center justify-center text-xs font-medium ${
					payment.status === 'paid' ? 'bg-primary text-primary-foreground' : payment.status === 'upcoming' ? 'bg-amber-500/20 text-amber-600' : 'bg-muted'
				}`}>
					{payment.status === 'paid' ? <Check className="size-4" /> : index + 1}
				</div>
				<div className="flex-1">
					<span className="text-sm font-medium">{payment.date}</span>
					{payment.status === 'upcoming' && (
						<Badge variant="secondary" className="ml-2 text-xs">Next</Badge>
					)}
				</div>
				<span className="font-medium">{payment.amount}</span>
			</div>
		))}
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
		<div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-700 dark:text-amber-400">
			<Clock className="size-4 inline mr-2" />
			Your card will be charged {'{'}$83.33{'}'} monthly on the 15th
		</div>
	</div>
);

const AgreementStep = () => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-muted/30 max-h-40 overflow-y-auto text-xs text-muted-foreground">
			<p className="font-medium text-foreground mb-2">Installment Agreement</p>
			<p>By proceeding, you agree to the following terms:</p>
			<ul className="list-disc ml-4 mt-2 space-y-1">
				<li>Monthly payments will be automatically charged to your card</li>
				<li>Late payments may result in fees and impact your credit</li>
				<li>You may pay off the balance early at any time with no penalty</li>
				<li>This agreement is subject to our Terms of Service</li>
			</ul>
		</div>
		<div className="space-y-3">
			<div className="flex items-start gap-3">
				<Checkbox id="terms" className="mt-0.5" />
				<Label htmlFor="terms" className="text-sm cursor-pointer">
					I agree to the installment payment terms and authorize automatic monthly charges
				</Label>
			</div>
			<div className="flex items-start gap-3">
				<Checkbox id="autopay" className="mt-0.5" defaultChecked />
				<Label htmlFor="autopay" className="text-sm cursor-pointer">
					Enable autopay reminders 3 days before each payment
				</Label>
			</div>
		</div>
	</div>
);

const InstallmentSummary = ({ firstPayment, monthly, total }: { firstPayment: string; monthly: string; total: string }) => (
	<div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
		<div className="flex items-center justify-between">
			<div>
				<span className="text-sm text-muted-foreground">Due today</span>
				<p className="text-xl font-bold">{firstPayment}</p>
			</div>
			<Badge variant="outline" className="gap-1">
				<Zap className="size-3" />
				0% APR
			</Badge>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">5 more payments</span>
			<span>{monthly} each</span>
		</div>
		<div className="flex justify-between text-sm font-medium">
			<span>Total</span>
			<span>{total}</span>
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
					<Lock className="size-4" />
					Start Plan
				</>
			)}
		</Button>
	</div>
);

export default function Main() {
	const currentStep = 2;
	const steps = ['Eligibility', 'Plan', 'Payment', 'Confirm'];

	const plans: InstallmentPlan[] = [
		{ id: '3', months: 3, monthly: '$166.67', total: '$500.00', interest: '0% interest' },
		{ id: '6', months: 6, monthly: '$83.33', total: '$500.00', interest: '0% interest', recommended: true },
		{ id: '12', months: 12, monthly: '$45.83', total: '$550.00', interest: '10% APR' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<NumberedSteps steps={steps} current={currentStep} />
						<div className="text-center">
							<h2 className="text-xl font-semibold">Payment Details</h2>
							<p className="text-sm text-muted-foreground">Enter your card for monthly payments</p>
						</div>
					</CardHeader>
					<CardContent>
						<CardDetailsStep />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<InstallmentSummary firstPayment="$83.33" monthly="$83.33" total="$500.00" />
						<NavigationButtons step={currentStep} totalSteps={steps.length} onPrev={() => {}} onNext={() => {}} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
