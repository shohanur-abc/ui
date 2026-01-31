'use client';

import { ArrowRight, Check, CreditCard, Gift, Lock, Percent, Shield, Smartphone, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface SavedPaymentMethod {
	id: string;
	type: string;
	label: string;
	sublabel: string;
	icon: React.ComponentType<{ className?: string }>;
	isDefault?: boolean;
}

interface CartItem {
	name: string;
	variant: string;
	quantity: number;
	price: string;
	image: string;
}

const CartSummary = ({ items }: { items: CartItem[] }) => (
	<div className="space-y-3">
		<h3 className="font-medium text-sm">Order Summary ({items.length} items)</h3>
		<div className="space-y-2">
			{items.map((item, index) => (
				<div key={index} className="flex gap-3 p-2 rounded-lg bg-muted/30">
					<div className="size-12 rounded-lg bg-muted flex items-center justify-center text-lg shrink-0">
						{item.image}
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium truncate">{item.name}</p>
						<p className="text-xs text-muted-foreground">{item.variant} × {item.quantity}</p>
					</div>
					<span className="text-sm font-medium">{item.price}</span>
				</div>
			))}
		</div>
	</div>
);

const SavedMethodCard = ({ 
	id, 
	type, 
	label, 
	sublabel, 
	icon: Icon, 
	isDefault, 
	selected, 
	onSelect 
}: SavedPaymentMethod & { selected: boolean; onSelect: (id: string) => void }) => (
	<button
		type="button"
		onClick={() => onSelect(id)}
		className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
			selected 
				? 'border-primary bg-primary/5' 
				: 'border-border/50 hover:border-primary/30'
		}`}
	>
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="text-sm font-medium">{label}</span>
				{isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
			</div>
			<p className="text-xs text-muted-foreground">{sublabel}</p>
		</div>
		{selected && (
			<div className="size-5 rounded-full bg-primary flex items-center justify-center">
				<Check className="size-3 text-primary-foreground" />
			</div>
		)}
	</button>
);

const SavedPaymentMethods = ({ 
	methods, 
	selected, 
	onSelect 
}: { 
	methods: SavedPaymentMethod[]; 
	selected: string; 
	onSelect: (id: string) => void 
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h3 className="font-medium text-sm">Payment Method</h3>
			<Button variant="ghost" size="sm" className="text-xs h-7">+ Add new</Button>
		</div>
		<div className="grid gap-2">
			{methods.map((method) => (
				<SavedMethodCard 
					key={method.id} 
					{...method} 
					selected={selected === method.id}
					onSelect={onSelect}
				/>
			))}
		</div>
	</div>
);

const CvvConfirmation = () => (
	<div className="space-y-2 p-3 rounded-xl bg-muted/30">
		<Label className="text-sm">Enter CVV to confirm</Label>
		<div className="flex gap-3">
			<Input type="password" placeholder="•••" className="w-24" />
			<span className="text-xs text-muted-foreground self-center">3 digits on back of card</span>
		</div>
	</div>
);

const PromoCodeInput = () => (
	<div className="space-y-2">
		<Label className="text-sm">Promo Code</Label>
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Enter code" className="pl-10" />
			</div>
			<Button variant="outline" size="sm">Apply</Button>
		</div>
	</div>
);

const PriceBreakdown = ({ lines }: { lines: { label: string; value: string; isTotal?: boolean; isDiscount?: boolean }[] }) => (
	<div className="space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<div className={`flex justify-between ${line.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}>
					<span className={line.isDiscount ? 'text-emerald-600' : line.isTotal ? '' : 'text-muted-foreground'}>
						{line.label}
					</span>
					<span className={line.isDiscount ? 'text-emerald-600' : ''}>{line.value}</span>
				</div>
			</div>
		))}
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

const SecurityBadges = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>Secure</span>
		</div>
		<div className="flex items-center gap-1">
			<Lock className="size-3" />
			<span>Encrypted</span>
		</div>
	</div>
);

export default function Main() {
	const cartItems: CartItem[] = [
		{ name: 'Wireless Mouse', variant: 'Black', quantity: 1, price: '$79.00', image: '🖱️' },
		{ name: 'USB-C Hub', variant: 'Silver', quantity: 1, price: '$49.00', image: '🔌' },
	];

	const savedMethods: SavedPaymentMethod[] = [
		{ id: 'visa', type: 'card', label: 'Visa •••• 4242', sublabel: 'Expires 12/26', icon: CreditCard, isDefault: true },
		{ id: 'apple', type: 'wallet', label: 'Apple Pay', sublabel: 'john@apple.com', icon: Smartphone },
		{ id: 'paypal', type: 'wallet', label: 'PayPal', sublabel: 'john@email.com', icon: Wallet },
	];

	const priceLines = [
		{ label: 'Subtotal', value: '$128.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Discount (SAVE10)', value: '-$12.80', isDiscount: true },
		{ label: 'Tax', value: '$9.22' },
		{ label: 'Total', value: '$124.42', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">Checkout</h2>
							<Badge variant="outline" className="gap-1">
								<Shield className="size-3" />
								Secure
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<CartSummary items={cartItems} />
						<Separator />
						<SavedPaymentMethods 
							methods={savedMethods} 
							selected="visa" 
							onSelect={() => {}} 
						/>
						<CvvConfirmation />
						<PromoCodeInput />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<PriceBreakdown lines={priceLines} />
						<PayButton label="Pay $124.42" />
						<SecurityBadges />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
