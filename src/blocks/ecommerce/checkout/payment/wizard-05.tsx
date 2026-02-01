'use client';

import {
	ArrowLeft,
	ArrowRight,
	Building2,
	Check,
	CreditCard,
	Lock,
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

interface PaymentProvider {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	description: string;
	badge?: string;
	color: string;
}

const DotIndicator = ({
	total,
	current,
}: {
	total: number;
	current: number;
}) => (
	<div className="flex items-center justify-center gap-2 mb-6">
		{Array.from({ length: total }, (_, i) => (
			<div
				key={i}
				className={`rounded-full transition-all ${
					i < current
						? 'size-2 bg-primary'
						: i === current
							? 'size-3 bg-primary'
							: 'size-2 bg-muted'
				}`}
			/>
		))}
	</div>
);

const PaymentProviderCard = ({
	id,
	name,
	icon: Icon,
	description,
	badge,
	color,
	selected,
	onSelect,
}: PaymentProvider & { selected: boolean; onSelect: (id: string) => void }) => (
	<button
		type="button"
		onClick={() => onSelect(id)}
		className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
			selected
				? 'border-primary bg-primary/5'
				: 'border-border/50 hover:border-primary/30'
		}`}
	>
		<div
			className={`size-12 rounded-xl flex items-center justify-center ${color}`}
		>
			<Icon className="size-6" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{name}</span>
				{badge && (
					<Badge variant="secondary" className="text-xs gap-0.5">
						{badge === 'Instant' && <Zap className="size-2.5" />}
						{badge}
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<div
			className={`size-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-primary bg-primary' : 'border-muted-foreground'}`}
		>
			{selected && <Check className="size-3 text-primary-foreground" />}
		</div>
	</button>
);

const CardPaymentForm = () => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-muted/30 flex items-center gap-3">
			<div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
				<CreditCard className="size-5 text-blue-500" />
			</div>
			<div>
				<span className="font-medium">Credit/Debit Card</span>
				<p className="text-xs text-muted-foreground">Secure card payment</p>
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Card Number</Label>
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="1234 5678 9012 3456" className="pl-10" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Name on Card</Label>
			<Input placeholder="JOHN DOE" />
		</div>
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">Expiry Date</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Security Code</Label>
				<Input type="password" placeholder="CVV" />
			</div>
		</div>
		<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
			<Checkbox id="save-payment" defaultChecked />
			<Label htmlFor="save-payment" className="text-sm cursor-pointer">
				Save for faster checkout
			</Label>
		</div>
	</div>
);

const WalletConfirmation = () => (
	<div className="space-y-4">
		<div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-primary/20 text-center">
			<div className="size-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
				<Wallet className="size-8 text-purple-500" />
			</div>
			<h3 className="font-medium mb-1">PayPal Checkout</h3>
			<p className="text-sm text-muted-foreground">
				You'll be redirected to PayPal to complete your purchase
			</p>
		</div>
		<Button variant="outline" className="w-full gap-2">
			<Wallet className="size-4" />
			Continue with PayPal
		</Button>
	</div>
);

const BankTransferInfo = () => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
			<div className="flex items-center gap-2 mb-2">
				<Building2 className="size-4 text-emerald-500" />
				<span className="font-medium">Bank Transfer</span>
			</div>
			<p className="text-sm text-muted-foreground">
				Secure bank-to-bank transfer. Usually completes in 1-3 business days.
			</p>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Select Your Bank</Label>
			<select className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm">
				<option>Choose a bank...</option>
				<option>Chase</option>
				<option>Bank of America</option>
				<option>Wells Fargo</option>
				<option>Citibank</option>
			</select>
		</div>
	</div>
);

const OrderAmount = ({ amount }: { amount: string }) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
		<div>
			<span className="text-sm text-muted-foreground">Amount to pay</span>
			<p className="text-2xl font-bold">{amount}</p>
		</div>
		<Badge variant="outline" className="gap-1">
			<Shield className="size-3" />
			Secure
		</Badge>
	</div>
);

const NavigationButtons = ({
	step,
	onPrev,
	onNext,
}: {
	step: number;
	onPrev: () => void;
	onNext: () => void;
}) => (
	<div className="flex gap-3">
		{step > 0 && (
			<Button variant="outline" onClick={onPrev} className="gap-2">
				<ArrowLeft className="size-4" />
				Back
			</Button>
		)}
		<Button onClick={onNext} className="flex-1 gap-2">
			{step < 2 ? (
				<>
					Continue
					<ArrowRight className="size-4" />
				</>
			) : (
				<>
					<Lock className="size-4" />
					Complete Payment
				</>
			)}
		</Button>
	</div>
);

export default function Main() {
	const currentStep = 1;

	const providers: PaymentProvider[] = [
		{
			id: 'card',
			name: 'Credit/Debit Card',
			icon: CreditCard,
			description: 'Visa, Mastercard, Amex',
			badge: 'Popular',
			color: 'bg-blue-500/10 text-blue-500',
		},
		{
			id: 'wallet',
			name: 'PayPal',
			icon: Wallet,
			description: 'Fast and secure',
			badge: 'Instant',
			color: 'bg-purple-500/10 text-purple-500',
		},
		{
			id: 'apple',
			name: 'Apple Pay',
			icon: Smartphone,
			description: 'Pay with Face ID',
			color: 'bg-gray-500/10 text-gray-500',
		},
		{
			id: 'bank',
			name: 'Bank Transfer',
			icon: Building2,
			description: '1-3 business days',
			color: 'bg-emerald-500/10 text-emerald-500',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<DotIndicator total={3} current={currentStep} />
						<div className="text-center">
							<h2 className="text-xl font-semibold">Enter Card Details</h2>
							<p className="text-sm text-muted-foreground">
								Your payment information is encrypted
							</p>
						</div>
					</CardHeader>
					<CardContent>
						<CardPaymentForm />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderAmount amount="$331.55" />
						<NavigationButtons
							step={currentStep}
							onPrev={() => {}}
							onNext={() => {}}
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
