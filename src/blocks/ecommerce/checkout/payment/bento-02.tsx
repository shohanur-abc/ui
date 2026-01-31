'use client';

import { ArrowRight, Bitcoin, Building2, CreditCard, Gift, Lock, Percent, Shield, Smartphone, Wallet, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface PaymentMethod {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}

const PaymentMethodsCell = ({ methods, selected }: { methods: PaymentMethod[]; selected: string }) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm row-span-2">
		<CardHeader className="pb-2">
			<span className="font-semibold text-sm">Payment Method</span>
		</CardHeader>
		<CardContent>
			<RadioGroup defaultValue={selected} className="space-y-2">
				{methods.map((method) => (
					<Label
						key={method.id}
						htmlFor={method.id}
						className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5"
					>
						<RadioGroupItem value={method.id} id={method.id} />
						<div className={`size-8 rounded-lg flex items-center justify-center ${method.color}`}>
							<method.icon className="size-4" />
						</div>
						<span className="text-sm font-medium">{method.name}</span>
					</Label>
				))}
			</RadioGroup>
		</CardContent>
	</Card>
);

const ExpressCheckoutCell = () => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Zap className="size-4 text-primary" />
				<span className="font-semibold text-sm">Express Checkout</span>
			</div>
		</CardHeader>
		<CardContent className="flex gap-2">
			<Button variant="outline" className="flex-1 h-10 gap-2">
				<Smartphone className="size-4" />
				<span className="text-xs">Apple Pay</span>
			</Button>
			<Button variant="outline" className="flex-1 h-10 gap-2">
				<Wallet className="size-4" />
				<span className="text-xs">Google Pay</span>
			</Button>
		</CardContent>
	</Card>
);

const PromoCodeCell = () => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Gift className="size-4 text-primary" />
				<span className="font-semibold text-sm">Promo Code</span>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex gap-2">
				<Input placeholder="Enter code" className="h-9 text-sm" />
				<Button variant="outline" size="sm">Apply</Button>
			</div>
		</CardContent>
	</Card>
);

const CardFormCell = () => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<CreditCard className="size-4 text-primary" />
				<span className="font-semibold text-sm">Card Details</span>
			</div>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-4 gap-3">
				<div className="col-span-2 relative">
					<CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input placeholder="Card number" className="h-9 text-sm pl-9" />
				</div>
				<Input placeholder="MM/YY" className="h-9 text-sm" />
				<Input placeholder="CVV" type="password" className="h-9 text-sm" />
			</div>
		</CardContent>
	</Card>
);

const TotalAndPayCell = ({ total }: { total: string }) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm col-span-2">
		<CardContent className="p-4 flex items-center justify-between gap-4">
			<div>
				<span className="text-sm text-muted-foreground">Total</span>
				<p className="text-2xl font-bold">{total}</p>
			</div>
			<Button className="flex-1 max-w-xs gap-2">
				<Lock className="size-4" />
				Pay Now
				<ArrowRight className="size-4" />
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const methods: PaymentMethod[] = [
		{ id: 'card', name: 'Credit Card', icon: CreditCard, color: 'bg-blue-500/10 text-blue-500' },
		{ id: 'paypal', name: 'PayPal', icon: Wallet, color: 'bg-indigo-500/10 text-indigo-500' },
		{ id: 'bank', name: 'Bank Transfer', icon: Building2, color: 'bg-emerald-500/10 text-emerald-500' },
		{ id: 'crypto', name: 'Cryptocurrency', icon: Bitcoin, color: 'bg-orange-500/10 text-orange-500' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 gap-4">
					<PaymentMethodsCell methods={methods} selected="card" />
					<ExpressCheckoutCell />
					<PromoCodeCell />
					<CardFormCell />
					<TotalAndPayCell total="$349.00" />
				</div>
			</div>
		</section>
	);
}
