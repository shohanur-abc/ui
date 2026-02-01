'use client';

import {
	ArrowRight,
	Bitcoin,
	Building2,
	Check,
	CreditCard,
	Lock,
	Shield,
	Smartphone,
	Wallet,
	X,
	Zap,
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
import { Separator } from '@/components/ui/separator';

interface PaymentMethod {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}

const DrawerHeader = ({
	title,
	subtitle,
	amount,
	onClose,
}: {
	title: string;
	subtitle: string;
	amount: string;
	onClose: () => void;
}) => (
	<div className="flex items-center justify-between">
		<div>
			<h2 className="text-xl font-semibold">{title}</h2>
			<p className="text-sm text-muted-foreground">{subtitle}</p>
		</div>
		<div className="text-right">
			<span className="text-2xl font-bold">{amount}</span>
			<Button variant="ghost" size="icon" onClick={onClose} className="ml-2">
				<X className="size-4" />
			</Button>
		</div>
	</div>
);

const PaymentMethodSelector = ({
	methods,
	selected,
}: {
	methods: PaymentMethod[];
	selected: string;
}) => (
	<RadioGroup defaultValue={selected} className="grid grid-cols-4 gap-2">
		{methods.map((method) => (
			<Label
				key={method.id}
				htmlFor={method.id}
				className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
			>
				<RadioGroupItem value={method.id} id={method.id} className="sr-only" />
				<div
					className={`size-8 rounded-lg flex items-center justify-center ${method.color}`}
				>
					<method.icon className="size-4" />
				</div>
				<span className="text-xs font-medium">{method.name}</span>
			</Label>
		))}
	</RadioGroup>
);

const QuickCardForm = () => (
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
				<Label className="text-sm">CVV</Label>
				<Input type="password" placeholder="•••" />
			</div>
		</div>
	</div>
);

const ExpressCheckoutButtons = () => (
	<div className="space-y-3">
		<div className="relative">
			<Separator />
			<span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-card text-xs text-muted-foreground">
				or pay with
			</span>
		</div>
		<div className="grid grid-cols-2 gap-2">
			<Button variant="outline" className="gap-2">
				<Smartphone className="size-4" />
				Apple Pay
			</Button>
			<Button variant="outline" className="gap-2">
				<Wallet className="size-4" />
				Google Pay
			</Button>
		</div>
	</div>
);

const SavedCard = ({
	last4,
	brand,
	selected,
}: {
	last4: string;
	brand: string;
	selected: boolean;
}) => (
	<div
		className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer ${selected ? 'border-primary bg-primary/5' : 'border-border'}`}
	>
		<CreditCard className="size-5" />
		<div className="flex-1">
			<span className="text-sm font-medium">
				{brand} •••• {last4}
			</span>
		</div>
		{selected && <Check className="size-4 text-primary" />}
	</div>
);

const PromoCodeInput = () => (
	<div className="flex gap-2">
		<Input placeholder="Promo code" className="flex-1" />
		<Button variant="outline">Apply</Button>
	</div>
);

export default function Main() {
	const methods: PaymentMethod[] = [
		{
			id: 'card',
			name: 'Card',
			icon: CreditCard,
			color: 'bg-blue-500/10 text-blue-500',
		},
		{
			id: 'paypal',
			name: 'PayPal',
			icon: Wallet,
			color: 'bg-indigo-500/10 text-indigo-500',
		},
		{
			id: 'bank',
			name: 'Bank',
			icon: Building2,
			color: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			id: 'crypto',
			name: 'Crypto',
			icon: Bitcoin,
			color: 'bg-orange-500/10 text-orange-500',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm @sm:max-w-md mx-auto">
					<CardHeader>
						<DrawerHeader
							title="Payment"
							subtitle="Order #12345"
							amount="$299.00"
							onClose={() => {}}
						/>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-3">
							<Label className="text-sm font-medium">Saved Cards</Label>
							<SavedCard last4="4242" brand="Visa" selected={true} />
							<SavedCard last4="8888" brand="Mastercard" selected={false} />
						</div>
						<Separator />
						<PaymentMethodSelector methods={methods} selected="card" />
						<QuickCardForm />
						<PromoCodeInput />
						<ExpressCheckoutButtons />
					</CardContent>
					<CardFooter>
						<Button className="w-full gap-2">
							<Lock className="size-4" />
							Complete Payment
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
