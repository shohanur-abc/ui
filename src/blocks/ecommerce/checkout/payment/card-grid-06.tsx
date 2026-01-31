'use client';

import { ArrowRight, Check, Clock, CreditCard, Lock, RefreshCcw, Shield, Smartphone, Star, Wallet, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface SubscriptionPlan {
	id: string;
	name: string;
	price: string;
	period: string;
	features: string[];
	popular?: boolean;
}

interface PaymentMethod {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	description: string;
}

const PlanCard = ({ id, name, price, period, features, popular, selected, onSelect }: SubscriptionPlan & { selected: boolean; onSelect: (id: string) => void }) => (
	<button
		type="button"
		onClick={() => onSelect(id)}
		className={`relative flex-1 p-4 rounded-xl border-2 transition-all text-left ${
			selected 
				? 'border-primary bg-primary/5' 
				: 'border-border/50 hover:border-primary/30'
		}`}
	>
		{popular && (
			<Badge className="absolute -top-2 left-1/2 -translate-x-1/2 gap-1 text-xs">
				<Star className="size-2.5" />
				Popular
			</Badge>
		)}
		<div className="text-center mb-3">
			<span className="text-sm font-medium">{name}</span>
			<div className="mt-1">
				<span className="text-2xl font-bold">{price}</span>
				<span className="text-sm text-muted-foreground">/{period}</span>
			</div>
		</div>
		<div className="space-y-1.5">
			{features.map((feature, index) => (
				<div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
					<Check className="size-3 text-primary shrink-0" />
					<span>{feature}</span>
				</div>
			))}
		</div>
		{selected && (
			<div className="absolute top-3 right-3 size-5 rounded-full bg-primary flex items-center justify-center">
				<Check className="size-3 text-primary-foreground" />
			</div>
		)}
	</button>
);

const PlanSelector = ({ plans, selected, onSelect }: { plans: SubscriptionPlan[]; selected: string; onSelect: (id: string) => void }) => (
	<div className="flex gap-3">
		{plans.map((plan) => (
			<PlanCard key={plan.id} {...plan} selected={selected === plan.id} onSelect={onSelect} />
		))}
	</div>
);

const PaymentMethodRow = ({ id, name, icon: Icon, description, selected, onSelect }: PaymentMethod & { selected: boolean; onSelect: (id: string) => void }) => (
	<button
		type="button"
		onClick={() => onSelect(id)}
		className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
			selected 
				? 'border-primary bg-primary/5' 
				: 'border-border/50 hover:border-primary/30'
		}`}
	>
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
			<Icon className="size-5" />
		</div>
		<div className="text-left flex-1">
			<span className="text-sm font-medium">{name}</span>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
		{selected && (
			<div className="size-5 rounded-full bg-primary flex items-center justify-center">
				<Check className="size-3 text-primary-foreground" />
			</div>
		)}
	</button>
);

const PaymentMethodSelector = ({ methods, selected, onSelect }: { methods: PaymentMethod[]; selected: string; onSelect: (id: string) => void }) => (
	<div className="space-y-2">
		<h3 className="text-sm font-medium">Payment Method</h3>
		<div className="space-y-2">
			{methods.map((method) => (
				<PaymentMethodRow key={method.id} {...method} selected={selected === method.id} onSelect={onSelect} />
			))}
		</div>
	</div>
);

const CardForm = () => (
	<div className="space-y-3 p-4 rounded-xl bg-muted/30">
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
);

const Benefits = ({ items }: { items: { icon: React.ComponentType<{ className?: string }>; label: string }[] }) => (
	<div className="flex items-center justify-center gap-4 flex-wrap text-xs text-muted-foreground">
		{items.map((item, index) => (
			<div key={index} className="flex items-center gap-1">
				<item.icon className="size-3" />
				<span>{item.label}</span>
			</div>
		))}
	</div>
);

const TotalDisplay = ({ label, amount, frequency }: { label: string; amount: string; frequency: string }) => (
	<div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
		<div className="flex items-center justify-between">
			<div>
				<span className="text-sm text-muted-foreground">{label}</span>
				<p className="text-xs text-muted-foreground">{frequency}</p>
			</div>
			<span className="text-2xl font-bold">{amount}</span>
		</div>
	</div>
);

const SubscribeButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

export default function Main() {
	const plans: SubscriptionPlan[] = [
		{
			id: 'monthly',
			name: 'Monthly',
			price: '$19',
			period: 'mo',
			features: ['Cancel anytime', 'All features'],
		},
		{
			id: 'yearly',
			name: 'Yearly',
			price: '$15',
			period: 'mo',
			features: ['Save 20%', 'Billed yearly'],
			popular: true,
		},
	];

	const paymentMethods: PaymentMethod[] = [
		{ id: 'card', name: 'Credit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
		{ id: 'wallet', name: 'Digital Wallet', icon: Wallet, description: 'Apple Pay, Google Pay' },
	];

	const benefits = [
		{ icon: Shield, label: 'Secure' },
		{ icon: RefreshCcw, label: 'Cancel anytime' },
		{ icon: Zap, label: 'Instant access' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="text-center">
						<h2 className="text-xl font-semibold">Subscribe to Pro</h2>
						<p className="text-sm text-muted-foreground">Unlock all features and priority support</p>
					</CardHeader>
					<CardContent className="space-y-6">
						<PlanSelector plans={plans} selected="yearly" onSelect={() => {}} />
						<Separator />
						<PaymentMethodSelector methods={paymentMethods} selected="card" onSelect={() => {}} />
						<CardForm />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<TotalDisplay label="Total today" amount="$180/yr" frequency="Billed annually" />
						<SubscribeButton label="Start Subscription" />
						<Benefits items={benefits} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
