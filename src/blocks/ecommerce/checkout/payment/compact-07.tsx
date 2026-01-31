'use client';

import { Bitcoin, Building2, CreditCard, Lock, Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface PaymentMethod {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
}

const PaymentMethodRadio = ({ methods, selected }: { methods: PaymentMethod[]; selected: string }) => (
	<RadioGroup defaultValue={selected} className="flex gap-2">
		{methods.map((method) => (
			<Label
				key={method.id}
				htmlFor={method.id}
				className="flex-1 flex flex-col items-center gap-1 p-2.5 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5"
			>
				<RadioGroupItem value={method.id} id={method.id} className="sr-only" />
				<method.icon className="size-4" />
				<span className="text-[10px]">{method.name}</span>
			</Label>
		))}
	</RadioGroup>
);

const DynamicCardForm = () => (
	<div className="space-y-2">
		<div className="relative">
			<CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
			<Input placeholder="Card number" className="h-9 text-sm pl-8" />
		</div>
		<div className="grid grid-cols-2 gap-2">
			<Input placeholder="MM/YY" className="h-9 text-sm" />
			<Input placeholder="CVV" type="password" className="h-9 text-sm" />
		</div>
	</div>
);

const AmountDisplay = ({ amount, label }: { amount: string; label: string }) => (
	<div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30">
		<span className="text-xs text-muted-foreground">{label}</span>
		<span className="font-bold">{amount}</span>
	</div>
);

export default function Main() {
	const methods: PaymentMethod[] = [
		{ id: 'card', name: 'Card', icon: CreditCard },
		{ id: 'paypal', name: 'PayPal', icon: Wallet },
		{ id: 'bank', name: 'Bank', icon: Building2 },
		{ id: 'crypto', name: 'Crypto', icon: Bitcoin },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-sm px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="p-4 space-y-4">
						<PaymentMethodRadio methods={methods} selected="card" />
						<Separator />
						<DynamicCardForm />
						<AmountDisplay amount="$159.00" label="Order Total" />
						<Button className="w-full h-9 text-sm gap-2">
							<Lock className="size-3.5" />
							Pay Now
						</Button>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
