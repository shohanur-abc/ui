'use client';

import {
	Building2,
	Check,
	CreditCard,
	Lock,
	Shield,
	Smartphone,
	Wallet,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PaymentMethodCard {
	id: string;
	name: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	popular?: boolean;
}

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="text-center mb-6">
		<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
		<p className="text-muted-foreground mt-2">{subtitle}</p>
	</div>
);

const MethodCard = ({
	id,
	name,
	description,
	icon: Icon,
	popular,
}: PaymentMethodCard) => (
	<Label
		htmlFor={id}
		className="relative flex flex-col items-center p-6 rounded-2xl border-2 border-border/50 cursor-pointer transition-all hover:border-primary/30 hover:bg-muted/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		{popular && (
			<Badge className="absolute -top-2 right-4 text-xs">Popular</Badge>
		)}
		<RadioGroupItem value={id} id={id} className="sr-only" />
		<div className="size-12 rounded-xl bg-muted flex items-center justify-center mb-3">
			<Icon className="size-6" />
		</div>
		<span className="font-semibold">{name}</span>
		<span className="text-xs text-muted-foreground text-center mt-1">
			{description}
		</span>
		<div className="absolute top-4 right-4 size-5 rounded-full border-2 border-border flex items-center justify-center opacity-0 has-[:checked]:opacity-100 peer-checked:opacity-100 transition-opacity">
			<Check className="size-3 text-primary" />
		</div>
	</Label>
);

const PaymentMethodGrid = ({ methods }: { methods: PaymentMethodCard[] }) => (
	<RadioGroup
		defaultValue={methods.find((m) => m.popular)?.id || methods[0]?.id}
		className="grid grid-cols-2 @md:grid-cols-4 gap-3"
	>
		{methods.map((method) => (
			<MethodCard key={method.id} {...method} />
		))}
	</RadioGroup>
);

const CardForm = () => (
	<div className="mt-6 p-4 rounded-xl bg-muted/30 space-y-4">
		<h3 className="font-medium">Card Details</h3>
		<div className="space-y-3">
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

const TotalDisplay = ({ amount }: { amount: string }) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
		<span className="font-medium">Total</span>
		<span className="text-2xl font-bold">{amount}</span>
	</div>
);

const SecurityBadges = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>256-bit SSL</span>
		</div>
		<div className="flex items-center gap-1">
			<Lock className="size-3" />
			<span>Secure checkout</span>
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
	const paymentMethods: PaymentMethodCard[] = [
		{
			id: 'card',
			name: 'Card',
			description: 'Credit or debit',
			icon: CreditCard,
			popular: true,
		},
		{
			id: 'wallet',
			name: 'Wallet',
			description: 'Apple/Google Pay',
			icon: Wallet,
		},
		{
			id: 'bank',
			name: 'Bank',
			description: 'Direct transfer',
			icon: Building2,
		},
		{
			id: 'mobile',
			name: 'Mobile',
			description: 'Phone payment',
			icon: Smartphone,
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<PageHeader
					title="Select Payment"
					subtitle="Choose your preferred payment method"
				/>
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="pt-6">
						<PaymentMethodGrid methods={paymentMethods} />
						<CardForm />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<TotalDisplay amount="$299.00" />
						<PayButton label="Pay Now" />
						<SecurityBadges />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
