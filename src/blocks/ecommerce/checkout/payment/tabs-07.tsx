'use client';

import { Banknote, Building2, Check, CreditCard, Gift, Lock, Percent, Shield, Star, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface OrderItem {
	name: string;
	quantity: number;
	price: string;
	image: string;
}

const OrderItemRow = ({ name, quantity, price, image }: OrderItem) => (
	<div className="flex gap-3">
		<div className="size-12 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0">
			{image}
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium truncate">{name}</p>
			<p className="text-xs text-muted-foreground">Qty: {quantity}</p>
		</div>
		<span className="text-sm font-medium">{price}</span>
	</div>
);

const OrderSummaryCard = ({ items, total }: { items: OrderItem[]; total: string }) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-4">
		<div className="flex items-center justify-between">
			<h3 className="font-medium">Order Summary</h3>
			<Badge variant="secondary">{items.length} items</Badge>
		</div>
		<div className="space-y-3">
			{items.map((item, index) => (
				<OrderItemRow key={index} {...item} />
			))}
		</div>
		<Separator />
		<div className="flex justify-between font-semibold">
			<span>Total</span>
			<span>{total}</span>
		</div>
	</div>
);

const FormField = ({ 
	id, 
	label, 
	placeholder, 
	type = 'text',
	icon: Icon 
}: { 
	id: string; 
	label: string; 
	placeholder: string; 
	type?: string;
	icon?: React.ComponentType<{ className?: string }>
}) => (
	<div className="space-y-2">
		<Label htmlFor={id} className="text-sm">{label}</Label>
		<div className="relative">
			{Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />}
			<Input id={id} type={type} placeholder={placeholder} className={Icon ? 'pl-10' : ''} />
		</div>
	</div>
);

const CreditCardTab = () => (
	<div className="space-y-4">
		<FormField id="cc-number" label="Card Number" placeholder="1234 5678 9012 3456" icon={CreditCard} />
		<FormField id="cc-name" label="Cardholder Name" placeholder="JOHN DOE" />
		<div className="grid grid-cols-2 gap-4">
			<FormField id="cc-exp" label="Expiry" placeholder="MM/YY" />
			<FormField id="cc-cvc" label="CVC" placeholder="123" type="password" />
		</div>
		<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
			<Checkbox id="save-card" />
			<Label htmlFor="save-card" className="text-sm cursor-pointer">Save for future purchases</Label>
		</div>
	</div>
);

const DebitCardTab = () => (
	<div className="space-y-4">
		<FormField id="dc-number" label="Debit Card Number" placeholder="1234 5678 9012 3456" icon={Banknote} />
		<FormField id="dc-name" label="Name on Card" placeholder="JOHN DOE" />
		<div className="grid grid-cols-2 gap-4">
			<FormField id="dc-exp" label="Valid Thru" placeholder="MM/YY" />
			<FormField id="dc-pin" label="PIN" placeholder="••••" type="password" />
		</div>
		<div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-600 dark:text-amber-400">
			You'll receive an OTP for verification
		</div>
	</div>
);

const WalletTab = () => (
	<div className="space-y-3">
		<Button variant="outline" className="w-full h-14 justify-between">
			<div className="flex items-center gap-3">
				<Wallet className="size-5" />
				<span>PayPal</span>
			</div>
			<span className="text-xs text-muted-foreground">john@email.com</span>
		</Button>
		<Button variant="outline" className="w-full h-14 justify-between">
			<div className="flex items-center gap-3">
				<Wallet className="size-5" />
				<span>Apple Pay</span>
			</div>
			<Badge variant="secondary">Linked</Badge>
		</Button>
		<Button variant="outline" className="w-full h-14 justify-between">
			<div className="flex items-center gap-3">
				<Wallet className="size-5" />
				<span>Google Pay</span>
			</div>
			<span className="text-xs text-primary">Connect</span>
		</Button>
	</div>
);

const NetBankingTab = () => (
	<div className="space-y-4">
		<Label className="text-sm font-medium">Popular Banks</Label>
		<div className="grid grid-cols-2 gap-2">
			{['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank'].map((bank) => (
				<Button key={bank} variant="outline" className="h-12 text-sm justify-start gap-2">
					<Building2 className="size-4" />
					{bank}
				</Button>
			))}
		</div>
		<FormField id="other-bank" label="Other Banks" placeholder="Search bank..." icon={Building2} />
	</div>
);

const DiscountSection = () => (
	<div className="space-y-3 pt-4 border-t border-border/50">
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Gift card or promo code" className="pl-10" />
			</div>
			<Button variant="outline">Apply</Button>
		</div>
		<div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
			<div className="flex items-center gap-2">
				<Percent className="size-4 text-primary" />
				<span className="text-sm font-medium">NEW10 applied</span>
			</div>
			<Badge variant="secondary" className="gap-1">
				<Check className="size-3" />
				-$15.00
			</Badge>
		</div>
	</div>
);

const TrustIndicators = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-4">
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>Secure Payment</span>
		</div>
		<div className="flex items-center gap-1">
			<Star className="size-3" />
			<span>Trusted by 10K+</span>
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
	const orderItems: OrderItem[] = [
		{ name: 'Wireless Headphones Pro', quantity: 1, price: '$199.00', image: '🎧' },
		{ name: 'USB-C Charging Cable', quantity: 2, price: '$29.00', image: '🔌' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">Payment</h2>
							<Badge variant="outline" className="gap-1">
								<Shield className="size-3" />
								Secure
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<OrderSummaryCard items={orderItems} total="$228.00" />
						<Tabs defaultValue="credit" className="w-full">
							<TabsList className="w-full grid grid-cols-4 h-10 text-xs">
								<TabsTrigger value="credit">Credit</TabsTrigger>
								<TabsTrigger value="debit">Debit</TabsTrigger>
								<TabsTrigger value="wallet">Wallet</TabsTrigger>
								<TabsTrigger value="bank">Bank</TabsTrigger>
							</TabsList>
							<div className="mt-4">
								<TabsContent value="credit">
									<CreditCardTab />
								</TabsContent>
								<TabsContent value="debit">
									<DebitCardTab />
								</TabsContent>
								<TabsContent value="wallet">
									<WalletTab />
								</TabsContent>
								<TabsContent value="bank">
									<NetBankingTab />
								</TabsContent>
							</div>
						</Tabs>
						<DiscountSection />
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<PayButton label="Pay $213.00" />
						<TrustIndicators />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
