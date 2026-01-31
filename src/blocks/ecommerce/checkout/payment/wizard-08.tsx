'use client';

import { ArrowLeft, ArrowRight, Check, CreditCard, Download, Key, Lock, Mail, Server, Shield, Smartphone, Wallet, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface LicenseOption {
	id: string;
	name: string;
	description: string;
	price: string;
	features: string[];
	popular?: boolean;
}

const AnimatedProgress = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
	<div className="relative mb-8">
		<div className="flex justify-between mb-2">
			{Array.from({ length: totalSteps }, (_, i) => (
				<div key={i} className="flex flex-col items-center">
					<div
						className={`size-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
							i < currentStep
								? 'bg-primary text-primary-foreground scale-100'
								: i === currentStep
									? 'bg-primary text-primary-foreground scale-110 ring-4 ring-primary/20'
									: 'bg-muted text-muted-foreground scale-90'
						}`}
					>
						{i < currentStep ? <Check className="size-5" /> : i + 1}
					</div>
				</div>
			))}
		</div>
		<div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
			<div
				className="h-full bg-primary transition-all duration-500"
				style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
			/>
		</div>
	</div>
);

const LicenseSelectionContent = ({ options }: { options: LicenseOption[] }) => (
	<div className="space-y-3">
		<RadioGroup defaultValue={options.find(o => o.popular)?.id || options[0].id} className="space-y-3">
			{options.map((option) => (
				<Label
					key={option.id}
					htmlFor={option.id}
					className={`relative flex flex-col gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5 ${
						option.popular ? 'ring-2 ring-primary/20' : ''
					}`}
				>
					{option.popular && (
						<Badge className="absolute -top-2.5 right-3 text-xs gap-0.5">
							<Zap className="size-2.5" />
							Popular
						</Badge>
					)}
					<div className="flex items-start gap-3">
						<RadioGroupItem value={option.id} id={option.id} className="mt-1" />
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<span className="font-medium">{option.name}</span>
								<span className="text-lg font-bold">{option.price}</span>
							</div>
							<p className="text-xs text-muted-foreground">{option.description}</p>
						</div>
					</div>
					<div className="ml-7 flex flex-wrap gap-2">
						{option.features.map((feature, index) => (
							<Badge key={index} variant="secondary" className="text-xs">{feature}</Badge>
						))}
					</div>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const AccountSetupContent = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label className="text-sm">Email Address</Label>
			<div className="relative">
				<Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input type="email" placeholder="you@example.com" className="pl-10" />
			</div>
			<p className="text-xs text-muted-foreground">License key will be sent here</p>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Full Name</Label>
			<Input placeholder="John Doe" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Company (Optional)</Label>
			<Input placeholder="Acme Inc." />
		</div>
		<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
			<Checkbox id="create-account" defaultChecked />
			<Label htmlFor="create-account" className="text-sm cursor-pointer">Create account to manage licenses</Label>
		</div>
	</div>
);

const PaymentMethodContent = () => (
	<div className="space-y-4">
		<div className="grid grid-cols-3 gap-2">
			<Button variant="outline" className="h-14 flex-col gap-1 border-primary bg-primary/5">
				<CreditCard className="size-5" />
				<span className="text-xs">Card</span>
			</Button>
			<Button variant="outline" className="h-14 flex-col gap-1">
				<Wallet className="size-5" />
				<span className="text-xs">PayPal</span>
			</Button>
			<Button variant="outline" className="h-14 flex-col gap-1">
				<Smartphone className="size-5" />
				<span className="text-xs">Apple Pay</span>
			</Button>
		</div>
		<Separator />
		<div className="space-y-4">
			<div className="space-y-2">
				<Label className="text-sm">Card Number</Label>
				<div className="relative">
					<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input placeholder="1234 5678 9012 3456" className="pl-10" />
				</div>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<div className="space-y-2">
					<Label className="text-sm">Expiry</Label>
					<Input placeholder="MM/YY" />
				</div>
				<div className="space-y-2">
					<Label className="text-sm">CVC</Label>
					<Input type="password" placeholder="•••" />
				</div>
			</div>
		</div>
	</div>
);

const ConfirmationContent = ({ license }: { license: { name: string; price: string; features: string[] } }) => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<Key className="size-5 text-primary" />
					<span className="font-medium">{license.name}</span>
				</div>
				<span className="text-xl font-bold">{license.price}</span>
			</div>
			<div className="space-y-2">
				{license.features.map((feature, index) => (
					<div key={index} className="flex items-center gap-2 text-sm">
						<Check className="size-4 text-primary" />
						<span className="text-muted-foreground">{feature}</span>
					</div>
				))}
			</div>
		</div>
		<div className="p-3 rounded-lg bg-muted/30 space-y-2 text-sm">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Email</span>
				<span>john@example.com</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Payment</span>
				<span>Visa •••• 4242</span>
			</div>
		</div>
		<div className="flex items-start gap-3">
			<Checkbox id="agree" className="mt-0.5" />
			<Label htmlFor="agree" className="text-sm cursor-pointer">
				I agree to the <a href="#" className="text-primary underline">License Agreement</a> and <a href="#" className="text-primary underline">Terms</a>
			</Label>
		</div>
	</div>
);

const PurchaseSummary = ({ price }: { price: string }) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
				<Key className="size-5 text-primary" />
			</div>
			<div>
				<span className="font-medium">Pro License</span>
				<p className="text-xs text-muted-foreground">One-time purchase</p>
			</div>
		</div>
		<span className="text-xl font-bold">{price}</span>
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
					Complete Purchase
				</>
			)}
		</Button>
	</div>
);

const SecurityBadges = () => (
	<div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Download className="size-3" />
			<span>Instant</span>
		</div>
		<div className="flex items-center gap-1">
			<Key className="size-3" />
			<span>License Key</span>
		</div>
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>30-Day Refund</span>
		</div>
	</div>
);

export default function Main() {
	const currentStep = 2;
	const totalSteps = 4;

	const licenses: LicenseOption[] = [
		{ id: 'personal', name: 'Personal', description: 'For individual use', price: '$49', features: ['1 User', '1 Year'] },
		{ id: 'pro', name: 'Pro', description: 'For professionals', price: '$99', features: ['1 User', 'Lifetime', 'Priority Support'], popular: true },
		{ id: 'team', name: 'Team', description: 'For teams', price: '$249', features: ['5 Users', 'Lifetime', '24/7 Support'] },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<AnimatedProgress currentStep={currentStep} totalSteps={totalSteps} />
						<div className="text-center">
							<h2 className="text-xl font-semibold">Payment Details</h2>
							<p className="text-sm text-muted-foreground">Secure payment processing</p>
						</div>
					</CardHeader>
					<CardContent>
						<PaymentMethodContent />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<PurchaseSummary price="$99" />
						<NavigationButtons step={currentStep} totalSteps={totalSteps} onPrev={() => {}} onNext={() => {}} />
						<SecurityBadges />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
