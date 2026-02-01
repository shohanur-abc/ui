'use client';

import {
	Bitcoin,
	Building2,
	Check,
	CreditCard,
	Globe,
	Lock,
	Shield,
	Smartphone,
	Timer,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface PaymentOption {
	id: string;
	name: string;
	fee: string;
	time: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
	recommended?: boolean;
}

const PageHeader = ({ title }: { title: string }) => (
	<div className="flex items-center justify-between mb-6">
		<h1 className="text-2xl font-bold">{title}</h1>
		<Badge variant="outline" className="gap-1">
			<Globe className="size-3" />
			Multi-currency
		</Badge>
	</div>
);

const OptionCard = ({
	id,
	name,
	fee,
	time,
	icon: Icon,
	color,
	recommended,
	selected,
	onSelect,
}: PaymentOption & { selected: boolean; onSelect: (id: string) => void }) => (
	<button
		type="button"
		onClick={() => onSelect(id)}
		className={`relative flex flex-col p-4 rounded-xl border-2 transition-all ${
			selected
				? 'border-primary bg-primary/5'
				: 'border-border/50 hover:border-primary/30'
		}`}
	>
		{recommended && (
			<Badge className="absolute -top-2 right-2 text-xs gap-1">
				<Zap className="size-2.5" />
				Best
			</Badge>
		)}
		<div
			className={`size-10 rounded-lg flex items-center justify-center mb-3 ${color}`}
		>
			<Icon className="size-5" />
		</div>
		<span className="font-medium text-sm">{name}</span>
		<div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
			<span>{fee}</span>
			<span>•</span>
			<span className="flex items-center gap-0.5">
				<Timer className="size-2.5" />
				{time}
			</span>
		</div>
		{selected && (
			<div className="absolute top-3 left-3 size-5 rounded-full bg-primary flex items-center justify-center">
				<Check className="size-3 text-primary-foreground" />
			</div>
		)}
	</button>
);

const PaymentOptionsGrid = ({
	options,
	selected,
	onSelect,
}: {
	options: PaymentOption[];
	selected: string;
	onSelect: (id: string) => void;
}) => (
	<div className="grid grid-cols-2 @md:grid-cols-3 gap-3">
		{options.map((option) => (
			<OptionCard
				key={option.id}
				{...option}
				selected={selected === option.id}
				onSelect={onSelect}
			/>
		))}
	</div>
);

const CardDetailsForm = () => (
	<div className="space-y-4 mt-6 p-4 rounded-xl bg-muted/30">
		<h3 className="font-medium flex items-center gap-2">
			<CreditCard className="size-4" />
			Card Information
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
			<div className="grid grid-cols-3 gap-3">
				<div className="space-y-2">
					<Label className="text-sm">Expiry</Label>
					<Input placeholder="MM/YY" />
				</div>
				<div className="space-y-2">
					<Label className="text-sm">CVV</Label>
					<Input type="password" placeholder="•••" />
				</div>
				<div className="space-y-2">
					<Label className="text-sm">ZIP</Label>
					<Input placeholder="10001" />
				</div>
			</div>
		</div>
	</div>
);

const CurrencySelector = () => (
	<div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
		<Globe className="size-4 text-muted-foreground" />
		<div className="flex-1">
			<span className="text-sm">Currency</span>
		</div>
		<select className="h-8 px-2 rounded-md border border-input bg-transparent text-sm">
			<option>USD ($)</option>
			<option>EUR (€)</option>
			<option>GBP (£)</option>
			<option>JPY (¥)</option>
		</select>
	</div>
);

const OrderTotal = ({
	items,
}: {
	items: { label: string; value: string; isTotal?: boolean }[];
}) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		{items.map((item, index) => (
			<div key={index}>
				{item.isTotal && <Separator className="my-2" />}
				<div
					className={`flex justify-between ${item.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}
				>
					<span className={item.isTotal ? '' : 'text-muted-foreground'}>
						{item.label}
					</span>
					<span>{item.value}</span>
				</div>
			</div>
		))}
	</div>
);

const TrustBadges = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>PCI Compliant</span>
		</div>
		<Separator orientation="vertical" className="h-4" />
		<div className="flex items-center gap-1">
			<Lock className="size-3" />
			<span>256-bit SSL</span>
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
		{
			id: 'visa',
			name: 'Visa',
			fee: 'No fee',
			time: 'Instant',
			icon: CreditCard,
			color: 'bg-blue-500/10 text-blue-500',
		},
		{
			id: 'mastercard',
			name: 'Mastercard',
			fee: 'No fee',
			time: 'Instant',
			icon: CreditCard,
			color: 'bg-orange-500/10 text-orange-500',
		},
		{
			id: 'apple',
			name: 'Apple Pay',
			fee: 'No fee',
			time: 'Instant',
			icon: Smartphone,
			color: 'bg-slate-500/10 text-slate-600',
			recommended: true,
		},
		{
			id: 'paypal',
			name: 'PayPal',
			fee: '2.9%',
			time: 'Instant',
			icon: Wallet,
			color: 'bg-sky-500/10 text-sky-500',
		},
		{
			id: 'bank',
			name: 'Bank',
			fee: 'No fee',
			time: '1-3 days',
			icon: Building2,
			color: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			id: 'crypto',
			name: 'Bitcoin',
			fee: '-5%',
			time: '10-60 min',
			icon: Bitcoin,
			color: 'bg-amber-500/10 text-amber-500',
		},
	];

	const orderItems = [
		{ label: 'Subtotal', value: '$499.00' },
		{ label: 'Shipping', value: '$12.99' },
		{ label: 'Tax', value: '$40.96' },
		{ label: 'Total', value: '$552.95', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<PageHeader title="Payment Method" />
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="pt-6">
						<PaymentOptionsGrid
							options={paymentOptions}
							selected="visa"
							onSelect={() => {}}
						/>
						<CardDetailsForm />
						<div className="mt-4">
							<CurrencySelector />
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderTotal items={orderItems} />
						<PayButton label="Pay $552.95" />
						<TrustBadges />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
