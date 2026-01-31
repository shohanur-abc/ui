'use client';

import { BadgeCheck, Bitcoin, Building2, CreditCard, Gift, Globe, Lock, Shield, Smartphone, Star, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface PaymentCategory {
	id: string;
	title: string;
	methods: PaymentMethod[];
}

interface PaymentMethod {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	badge?: string;
}

const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="text-center mb-8">
		<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
		<p className="text-muted-foreground mt-2">{subtitle}</p>
	</div>
);

const PaymentMethodButton = ({ 
	id, 
	name, 
	icon: Icon, 
	badge, 
	selected, 
	onSelect 
}: PaymentMethod & { selected: boolean; onSelect: (id: string) => void }) => (
	<button
		type="button"
		onClick={() => onSelect(id)}
		className={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
			selected 
				? 'border-primary bg-primary/5' 
				: 'border-border/50 hover:border-primary/30'
		}`}
	>
		{badge && (
			<Badge className="absolute -top-2 -right-1 text-xs gap-0.5" variant="secondary">
				<Star className="size-2.5" />
				{badge}
			</Badge>
		)}
		<Icon className="size-5 mb-1" />
		<span className="text-xs font-medium">{name}</span>
		{selected && (
			<div className="absolute -top-1 -left-1 size-4 rounded-full bg-primary flex items-center justify-center">
				<BadgeCheck className="size-2.5 text-primary-foreground" />
			</div>
		)}
	</button>
);

const CategorySection = ({ 
	id, 
	title, 
	methods, 
	selected, 
	onSelect 
}: PaymentCategory & { selected: string; onSelect: (id: string) => void }) => (
	<div className="space-y-3">
		<h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
		<div className="grid grid-cols-4 gap-2">
			{methods.map((method) => (
				<PaymentMethodButton 
					key={method.id} 
					{...method} 
					selected={selected === method.id}
					onSelect={onSelect}
				/>
			))}
		</div>
	</div>
);

const PaymentCategories = ({ 
	categories, 
	selected, 
	onSelect 
}: { 
	categories: PaymentCategory[]; 
	selected: string; 
	onSelect: (id: string) => void 
}) => (
	<div className="space-y-4">
		{categories.map((category) => (
			<CategorySection 
				key={category.id} 
				{...category} 
				selected={selected}
				onSelect={onSelect}
			/>
		))}
	</div>
);

const CardInputSection = () => (
	<div className="space-y-4 p-4 rounded-xl bg-muted/30 mt-6">
		<div className="flex items-center gap-2">
			<CreditCard className="size-4" />
			<h3 className="font-medium">Card Details</h3>
		</div>
		<div className="space-y-3">
			<div className="space-y-2">
				<Label className="text-sm">Card Number</Label>
				<Input placeholder="1234 5678 9012 3456" />
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

const GiftCardSection = () => (
	<div className="space-y-3 mt-4">
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Gift card or promo code" className="pl-10" />
			</div>
			<Button variant="outline">Apply</Button>
		</div>
	</div>
);

const TotalSection = ({ subtotal, discount, tax, total }: { subtotal: string; discount?: string; tax: string; total: string }) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>{subtotal}</span>
		</div>
		{discount && (
			<div className="flex justify-between text-sm">
				<span className="text-emerald-600">Discount</span>
				<span className="text-emerald-600">{discount}</span>
			</div>
		)}
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Tax</span>
			<span>{tax}</span>
		</div>
		<Separator className="my-2" />
		<div className="flex justify-between font-semibold text-lg">
			<span>Total</span>
			<span>{total}</span>
		</div>
	</div>
);

const TrustBadges = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>Secure</span>
		</div>
		<div className="flex items-center gap-1">
			<Lock className="size-3" />
			<span>Encrypted</span>
		</div>
		<div className="flex items-center gap-1">
			<Globe className="size-3" />
			<span>Worldwide</span>
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
	const categories: PaymentCategory[] = [
		{
			id: 'cards',
			title: 'Credit & Debit Cards',
			methods: [
				{ id: 'visa', name: 'Visa', icon: CreditCard },
				{ id: 'mastercard', name: 'Mastercard', icon: CreditCard },
				{ id: 'amex', name: 'Amex', icon: CreditCard },
				{ id: 'discover', name: 'Discover', icon: CreditCard },
			],
		},
		{
			id: 'wallets',
			title: 'Digital Wallets',
			methods: [
				{ id: 'apple', name: 'Apple Pay', icon: Smartphone, badge: 'Fast' },
				{ id: 'google', name: 'Google Pay', icon: Smartphone },
				{ id: 'paypal', name: 'PayPal', icon: Wallet },
				{ id: 'venmo', name: 'Venmo', icon: Wallet },
			],
		},
		{
			id: 'other',
			title: 'Other Methods',
			methods: [
				{ id: 'bank', name: 'Bank', icon: Building2 },
				{ id: 'crypto', name: 'Crypto', icon: Bitcoin, badge: '-5%' },
				{ id: 'klarna', name: 'Klarna', icon: CreditCard },
				{ id: 'affirm', name: 'Affirm', icon: CreditCard },
			],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<PageHeader title="Payment" subtitle="Choose your payment method" />
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="pt-6">
						<PaymentCategories 
							categories={categories} 
							selected="visa" 
							onSelect={() => {}} 
						/>
						<CardInputSection />
						<GiftCardSection />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<TotalSection 
							subtotal="$299.00"
							tax="$23.92"
							total="$322.92"
						/>
						<PayButton label="Complete Payment" />
						<TrustBadges />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
