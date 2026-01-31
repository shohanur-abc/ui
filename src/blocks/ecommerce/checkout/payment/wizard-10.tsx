'use client';

import { ArrowLeft, ArrowRight, Bitcoin, Building2, Check, CreditCard, Globe, Lock, Shield, Smartphone, Wallet, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface Currency {
	code: string;
	name: string;
	symbol: string;
	flag: string;
}

interface PaymentMethod {
	id: string;
	name: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	badge?: string;
	color: string;
}

const StepHeader = ({ currentStep, totalSteps, title, subtitle }: { currentStep: number; totalSteps: number; title: string; subtitle: string }) => (
	<div className="mb-6">
		<div className="flex items-center justify-between mb-4">
			<div className="flex items-center gap-2">
				{Array.from({ length: totalSteps }, (_, i) => (
					<div
						key={i}
						className={`h-1.5 rounded-full transition-all ${
							i < currentStep ? 'w-8 bg-primary' : i === currentStep ? 'w-8 bg-primary' : 'w-4 bg-muted'
						}`}
					/>
				))}
			</div>
			<span className="text-xs text-muted-foreground">{currentStep + 1}/{totalSteps}</span>
		</div>
		<h2 className="text-xl font-semibold">{title}</h2>
		<p className="text-sm text-muted-foreground">{subtitle}</p>
	</div>
);

const CurrencySelector = ({ currencies, selected }: { currencies: Currency[]; selected: string }) => (
	<div className="space-y-3">
		<Label className="text-sm">Select Currency</Label>
		<RadioGroup defaultValue={selected} className="grid grid-cols-2 gap-2">
			{currencies.map((currency) => (
				<Label
					key={currency.code}
					htmlFor={currency.code}
					className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5"
				>
					<RadioGroupItem value={currency.code} id={currency.code} />
					<span className="text-lg">{currency.flag}</span>
					<div>
						<span className="text-sm font-medium">{currency.code}</span>
						<p className="text-xs text-muted-foreground">{currency.name}</p>
					</div>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const PaymentMethodGrid = ({ methods, selected }: { methods: PaymentMethod[]; selected: string }) => (
	<div className="space-y-3">
		<Label className="text-sm">Payment Method</Label>
		<RadioGroup defaultValue={selected} className="grid grid-cols-2 gap-3">
			{methods.map((method) => (
				<Label
					key={method.id}
					htmlFor={method.id}
					className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5`}
				>
					{method.badge && (
						<Badge className="absolute -top-2 right-2 text-xs">{method.badge}</Badge>
					)}
					<RadioGroupItem value={method.id} id={method.id} className="sr-only" />
					<div className={`size-10 rounded-lg flex items-center justify-center ${method.color}`}>
						<method.icon className="size-5" />
					</div>
					<span className="text-sm font-medium text-center">{method.name}</span>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const CardFormContent = () => (
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
				<Label className="text-sm">Expiry</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">CVV</Label>
				<Input type="password" placeholder="•••" />
			</div>
		</div>
	</div>
);

const BillingAddressContent = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
			<Checkbox id="use-shipping" defaultChecked />
			<Label htmlFor="use-shipping" className="text-sm cursor-pointer">Use shipping address for billing</Label>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Country</Label>
			<select className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm">
				<option>United States</option>
				<option>Canada</option>
				<option>United Kingdom</option>
				<option>Germany</option>
			</select>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">ZIP / Postal Code</Label>
			<Input placeholder="10001" />
		</div>
	</div>
);

const CurrencyConversion = ({ from, to, rate, amount, converted }: { from: string; to: string; rate: string; amount: string; converted: string }) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-3">
		<div className="flex items-center gap-2">
			<Globe className="size-4 text-muted-foreground" />
			<span className="text-sm font-medium">Currency Conversion</span>
		</div>
		<div className="flex items-center justify-between">
			<span className="text-sm text-muted-foreground">{amount} {from}</span>
			<ArrowRight className="size-4 text-muted-foreground" />
			<span className="text-lg font-bold">{converted} {to}</span>
		</div>
		<p className="text-xs text-muted-foreground">Rate: 1 {from} = {rate} {to}</p>
	</div>
);

const OrderTotal = ({ amount, currency }: { amount: string; currency: string }) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
		<div>
			<span className="text-sm text-muted-foreground">Total in {currency}</span>
			<p className="text-2xl font-bold">{amount}</p>
		</div>
		<Badge variant="outline" className="gap-1">
			<Shield className="size-3" />
			Secure
		</Badge>
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
					Complete Order
				</>
			)}
		</Button>
	</div>
);

const SecurityBadges = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>PCI Compliant</span>
		</div>
		<div className="flex items-center gap-1">
			<Lock className="size-3" />
			<span>256-bit SSL</span>
		</div>
		<div className="flex items-center gap-1">
			<Globe className="size-3" />
			<span>170+ Countries</span>
		</div>
	</div>
);

export default function Main() {
	const currentStep = 2;
	const totalSteps = 4;

	const currencies: Currency[] = [
		{ code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
		{ code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
		{ code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
		{ code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
	];

	const paymentMethods: PaymentMethod[] = [
		{ id: 'card', name: 'Card', description: 'Credit/Debit', icon: CreditCard, badge: 'Popular', color: 'bg-blue-500/10 text-blue-500' },
		{ id: 'paypal', name: 'PayPal', description: 'Fast checkout', icon: Wallet, color: 'bg-purple-500/10 text-purple-500' },
		{ id: 'bank', name: 'Bank', description: 'Direct transfer', icon: Building2, color: 'bg-emerald-500/10 text-emerald-500' },
		{ id: 'crypto', name: 'Crypto', description: 'Bitcoin, ETH', icon: Bitcoin, color: 'bg-orange-500/10 text-orange-500' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-0">
						<StepHeader
							currentStep={currentStep}
							totalSteps={totalSteps}
							title="Card Details"
							subtitle="Enter your payment information"
						/>
					</CardHeader>
					<CardContent>
						<CardFormContent />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<CurrencyConversion from="USD" to="EUR" rate="0.92" amount="$299.00" converted="€275.08" />
						<OrderTotal amount="€275.08" currency="EUR" />
						<NavigationButtons step={currentStep} totalSteps={totalSteps} onPrev={() => {}} onNext={() => {}} />
						<SecurityBadges />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
