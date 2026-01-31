'use client';

import { BadgeCheck, Bitcoin, Building2, CreditCard, DollarSign, Lock, Shield, Smartphone, Wallet, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface PaymentOption {
	id: string;
	name: string;
	fee: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
	fast?: boolean;
}

const SectionHeader = ({ title, badge }: { title: string; badge: string }) => (
	<div className="flex items-center justify-between mb-6">
		<h1 className="text-2xl font-bold">{title}</h1>
		<Badge variant="outline" className="gap-1">
			<Shield className="size-3" />
			{badge}
		</Badge>
	</div>
);

const PaymentOptionCard = ({ 
	id, 
	name, 
	fee, 
	icon: Icon, 
	color, 
	fast, 
	selected, 
	onSelect 
}: PaymentOption & { selected: boolean; onSelect: (id: string) => void }) => (
	<button
		type="button"
		onClick={() => onSelect(id)}
		className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
			selected 
				? 'border-primary bg-primary/5' 
				: 'border-border/50 hover:border-primary/30 hover:bg-muted/30'
		}`}
	>
		{fast && (
			<Badge className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs gap-1">
				<Zap className="size-2.5" />
				Fast
			</Badge>
		)}
		<div className={`size-12 rounded-xl flex items-center justify-center mb-2 ${color}`}>
			<Icon className="size-6" />
		</div>
		<span className="font-medium text-sm">{name}</span>
		<span className="text-xs text-muted-foreground">{fee}</span>
		{selected && (
			<div className="absolute top-2 right-2 size-5 rounded-full bg-primary flex items-center justify-center">
				<BadgeCheck className="size-3 text-primary-foreground" />
			</div>
		)}
	</button>
);

const PaymentGrid = ({ options, selected, onSelect }: { options: PaymentOption[]; selected: string; onSelect: (id: string) => void }) => (
	<div className="grid grid-cols-3 @md:grid-cols-6 gap-3">
		{options.map((option) => (
			<PaymentOptionCard 
				key={option.id} 
				{...option} 
				selected={selected === option.id}
				onSelect={onSelect}
			/>
		))}
	</div>
);

const CardInputForm = () => (
	<div className="mt-6 space-y-4 p-4 rounded-xl bg-muted/30">
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
	</div>
);

const PriceSummary = ({ subtotal, fee, total }: { subtotal: string; fee: string; total: string }) => (
	<div className="space-y-2">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>{subtotal}</span>
		</div>
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Processing Fee</span>
			<span>{fee}</span>
		</div>
		<Separator className="my-2" />
		<div className="flex justify-between font-semibold text-lg">
			<span>Total</span>
			<span>{total}</span>
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
	const paymentOptions: PaymentOption[] = [
		{ id: 'visa', name: 'Visa', fee: 'No fee', icon: CreditCard, color: 'bg-blue-500/10 text-blue-500' },
		{ id: 'mastercard', name: 'Mastercard', fee: 'No fee', icon: CreditCard, color: 'bg-orange-500/10 text-orange-500' },
		{ id: 'apple', name: 'Apple Pay', fee: 'No fee', icon: Smartphone, color: 'bg-slate-500/10 text-slate-500', fast: true },
		{ id: 'paypal', name: 'PayPal', fee: '2.9%', icon: Wallet, color: 'bg-sky-500/10 text-sky-500' },
		{ id: 'bank', name: 'Bank', fee: 'No fee', icon: Building2, color: 'bg-emerald-500/10 text-emerald-500' },
		{ id: 'crypto', name: 'Crypto', fee: '-5%', icon: Bitcoin, color: 'bg-amber-500/10 text-amber-500' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<SectionHeader title="Payment" badge="Secure" />
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="pt-6">
						<PaymentGrid 
							options={paymentOptions} 
							selected="visa" 
							onSelect={() => {}} 
						/>
						<CardInputForm />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<PriceSummary subtotal="$149.00" fee="$0.00" total="$149.00" />
						<PayButton label="Complete Payment" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
