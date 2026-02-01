'use client';

import {
	ArrowRight,
	Building2,
	Check,
	CreditCard,
	Download,
	Globe,
	Key,
	Lock,
	Mail,
	Shield,
	Smartphone,
	Wallet,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface DigitalProduct {
	name: string;
	type: string;
	size: string;
	price: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface PaymentOption {
	id: string;
	name: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	instant?: boolean;
}

const ProductHeader = ({
	name,
	type,
	size,
	price,
	icon: Icon,
}: DigitalProduct) => (
	<div className="flex gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
		<div className="size-16 rounded-xl bg-primary/20 flex items-center justify-center">
			<Icon className="size-8 text-primary" />
		</div>
		<div className="flex-1">
			<h3 className="font-semibold text-lg">{name}</h3>
			<p className="text-sm text-muted-foreground">
				{type} • {size}
			</p>
			<div className="flex items-center gap-2 mt-2">
				<span className="text-xl font-bold">{price}</span>
				<Badge variant="secondary" className="text-xs gap-1">
					<Zap className="size-2.5" />
					Instant
				</Badge>
			</div>
		</div>
	</div>
);

const PaymentOptionCard = ({
	id,
	name,
	description,
	icon: Icon,
	instant,
	selected,
	onSelect,
}: PaymentOption & { selected: boolean; onSelect: (id: string) => void }) => (
	<button
		type="button"
		onClick={() => onSelect(id)}
		className={`relative w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
			selected
				? 'border-primary bg-primary/5'
				: 'border-border/50 hover:border-primary/30'
		}`}
	>
		<div className="size-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
			<Icon className="size-6" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{name}</span>
				{instant && (
					<Badge variant="secondary" className="text-xs gap-0.5">
						<Zap className="size-2.5" />
						Instant
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		{selected && (
			<div className="size-6 rounded-full bg-primary flex items-center justify-center">
				<Check className="size-4 text-primary-foreground" />
			</div>
		)}
	</button>
);

const PaymentOptions = ({
	options,
	selected,
	onSelect,
}: {
	options: PaymentOption[];
	selected: string;
	onSelect: (id: string) => void;
}) => (
	<div className="space-y-3">
		<h3 className="font-medium">Select Payment</h3>
		<div className="space-y-2">
			{options.map((option) => (
				<PaymentOptionCard
					key={option.id}
					{...option}
					selected={selected === option.id}
					onSelect={onSelect}
				/>
			))}
		</div>
	</div>
);

const CardInputForm = () => (
	<div className="space-y-4 p-4 rounded-xl bg-muted/30">
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

const EmailInput = () => (
	<div className="space-y-2">
		<Label className="text-sm">Delivery Email</Label>
		<div className="relative">
			<Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input type="email" placeholder="your@email.com" className="pl-10" />
		</div>
		<p className="text-xs text-muted-foreground">
			Download link will be sent to this email
		</p>
	</div>
);

const TermsCheckbox = () => (
	<div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
		<Checkbox id="terms" className="mt-0.5" />
		<Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
			I agree to the{' '}
			<span className="text-primary underline">Terms of Service</span> and{' '}
			<span className="text-primary underline">License Agreement</span>
		</Label>
	</div>
);

const SecurityFeatures = () => (
	<div className="flex items-center justify-center gap-4 flex-wrap text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>Secure</span>
		</div>
		<div className="flex items-center gap-1">
			<Download className="size-3" />
			<span>Instant delivery</span>
		</div>
		<div className="flex items-center gap-1">
			<Key className="size-3" />
			<span>License included</span>
		</div>
	</div>
);

const TotalAmount = ({ amount }: { amount: string }) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
		<span className="font-medium">Total</span>
		<span className="text-2xl font-bold">{amount}</span>
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

export default function Main() {
	const product: DigitalProduct = {
		name: 'Pro License',
		type: 'Software License',
		size: 'Lifetime access',
		price: '$99.00',
		icon: Key,
	};

	const paymentOptions: PaymentOption[] = [
		{
			id: 'card',
			name: 'Credit Card',
			description: 'Visa, Mastercard, Amex',
			icon: CreditCard,
			instant: true,
		},
		{
			id: 'wallet',
			name: 'Digital Wallet',
			description: 'Apple Pay, Google Pay',
			icon: Smartphone,
			instant: true,
		},
		{
			id: 'paypal',
			name: 'PayPal',
			description: 'Pay with your PayPal account',
			icon: Wallet,
			instant: true,
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<ProductHeader {...product} />
					</CardHeader>
					<CardContent className="space-y-6">
						<PaymentOptions
							options={paymentOptions}
							selected="card"
							onSelect={() => {}}
						/>
						<CardInputForm />
						<Separator />
						<EmailInput />
						<TermsCheckbox />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<TotalAmount amount="$99.00" />
						<PayButton label="Purchase & Download" />
						<SecurityFeatures />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
