'use client';

import { Building2, Check, Clock, CreditCard, Lock, Percent, Shield, Smartphone, Sparkles, Timer, Wallet, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface PaymentMethod {
	id: string;
	name: string;
	description: string;
	processingTime: string;
	fee: string;
	icon: React.ComponentType<{ className?: string }>;
	badge?: { text: string; variant: 'default' | 'secondary' | 'outline' };
}

const PageTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="mb-6">
		<h1 className="text-2xl font-bold">{title}</h1>
		<p className="text-muted-foreground mt-1">{subtitle}</p>
	</div>
);

const MethodCard = ({ 
	id, 
	name, 
	description, 
	processingTime, 
	fee, 
	icon: Icon, 
	badge 
}: PaymentMethod) => (
	<Label
		htmlFor={id}
		className="relative flex gap-4 p-4 rounded-xl border-2 border-border/50 cursor-pointer transition-all hover:border-primary/30 hover:bg-muted/20 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<RadioGroupItem value={id} id={id} className="mt-1" />
		<div className="size-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
			<Icon className="size-6" />
		</div>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2 mb-1">
				<span className="font-semibold">{name}</span>
				{badge && (
					<Badge variant={badge.variant} className="text-xs gap-1">
						{badge.text === 'Instant' && <Zap className="size-2.5" />}
						{badge.text === 'Popular' && <Sparkles className="size-2.5" />}
						{badge.text === 'Discount' && <Percent className="size-2.5" />}
						{badge.text}
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
			<div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
				<span className="flex items-center gap-1">
					<Timer className="size-3" />
					{processingTime}
				</span>
				<span>{fee}</span>
			</div>
		</div>
		<div className="size-5 rounded-full border-2 border-muted flex items-center justify-center shrink-0 self-center opacity-0 has-[:checked]:opacity-100 peer-checked:opacity-100 transition-opacity">
			<Check className="size-3 text-primary" />
		</div>
	</Label>
);

const PaymentMethodList = ({ methods }: { methods: PaymentMethod[] }) => (
	<RadioGroup defaultValue={methods[0]?.id} className="space-y-3">
		{methods.map((method) => (
			<MethodCard key={method.id} {...method} />
		))}
	</RadioGroup>
);

const CardDetailsForm = () => (
	<div className="mt-6 p-4 rounded-xl bg-muted/30 space-y-4">
		<h3 className="font-medium flex items-center gap-2">
			<CreditCard className="size-4" />
			Card Details
		</h3>
		<div className="space-y-3">
			<div className="space-y-2">
				<Label className="text-sm">Card Number</Label>
				<Input placeholder="1234 5678 9012 3456" />
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
		</div>
	</div>
);

const OrderSummary = ({ lines }: { lines: { label: string; value: string; isTotal?: boolean; isDiscount?: boolean }[] }) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<div className={`flex justify-between ${line.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}>
					<span className={line.isDiscount ? 'text-primary' : line.isTotal ? '' : 'text-muted-foreground'}>
						{line.label}
					</span>
					<span className={line.isDiscount ? 'text-primary' : ''}>{line.value}</span>
				</div>
			</div>
		))}
	</div>
);

const SecurityInfo = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>PCI Compliant</span>
		</div>
		<div className="flex items-center gap-1">
			<Lock className="size-3" />
			<span>256-bit Encryption</span>
		</div>
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const paymentMethods: PaymentMethod[] = [
		{
			id: 'card',
			name: 'Credit/Debit Card',
			description: 'Pay securely with Visa, Mastercard, or Amex',
			processingTime: 'Instant',
			fee: 'No fee',
			icon: CreditCard,
			badge: { text: 'Popular', variant: 'secondary' },
		},
		{
			id: 'wallet',
			name: 'Digital Wallet',
			description: 'Apple Pay, Google Pay, or Samsung Pay',
			processingTime: 'Instant',
			fee: 'No fee',
			icon: Wallet,
			badge: { text: 'Instant', variant: 'default' },
		},
		{
			id: 'bank',
			name: 'Bank Transfer',
			description: 'Direct transfer from your bank account',
			processingTime: '1-3 days',
			fee: 'No fee',
			icon: Building2,
		},
		{
			id: 'bnpl',
			name: 'Buy Now, Pay Later',
			description: 'Split payment into 4 interest-free installments',
			processingTime: 'Instant',
			fee: '0% APR',
			icon: Clock,
			badge: { text: 'Discount', variant: 'outline' },
		},
	];

	const orderLines = [
		{ label: 'Subtotal', value: '$199.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$15.92' },
		{ label: 'Total', value: '$214.92', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<PageTitle title="Payment Method" subtitle="Select how you'd like to pay" />
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="pt-6">
						<PaymentMethodList methods={paymentMethods} />
						<CardDetailsForm />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderSummary lines={orderLines} />
						<PayButton label="Pay $214.92" />
						<SecurityInfo />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
