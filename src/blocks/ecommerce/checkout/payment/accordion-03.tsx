'use client';

import { ArrowRight, BadgeCheck, Clock, CreditCard, Gift, Lock, Percent, Shield, Star, Wallet, Zap } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface InstallmentPlan {
	id: string;
	months: number;
	monthly: string;
	total: string;
	apr: string;
	popular?: boolean;
}

interface CartItem {
	name: string;
	quantity: number;
	price: string;
	image: string;
}

const CartSummary = ({ items }: { items: CartItem[] }) => (
	<div className="space-y-3 pt-4">
		{items.map((item, index) => (
			<div key={index} className="flex gap-3 p-2 rounded-lg bg-muted/30">
				<div className="size-12 rounded-lg bg-muted flex items-center justify-center text-lg shrink-0">
					{item.image}
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-sm font-medium truncate">{item.name}</p>
					<p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
				</div>
				<span className="text-sm font-medium">{item.price}</span>
			</div>
		))}
	</div>
);

const InstallmentOption = ({ id, months, monthly, total, apr, popular }: InstallmentPlan) => (
	<Label
		htmlFor={id}
		className="relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		{popular && (
			<Badge className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs gap-0.5">
				<Star className="size-2.5" />
				Best
			</Badge>
		)}
		<RadioGroupItem value={id} id={id} />
		<div className="flex-1">
			<div className="flex items-center justify-between">
				<span className="font-medium">{months} months</span>
				<span className="font-bold">{monthly}/mo</span>
			</div>
			<div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
				<span>Total: {total}</span>
				<span>{apr}</span>
			</div>
		</div>
	</Label>
);

const InstallmentContent = ({ plans }: { plans: InstallmentPlan[] }) => (
	<div className="space-y-4 pt-4">
		<div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
			<Clock className="size-4 text-primary" />
			<span className="text-sm">Split your payment with 0% APR</span>
		</div>
		<RadioGroup defaultValue={plans.find(p => p.popular)?.id} className="space-y-3">
			{plans.map((plan) => (
				<InstallmentOption key={plan.id} {...plan} />
			))}
		</RadioGroup>
	</div>
);

const PaymentMethodContent = () => (
	<div className="space-y-4 pt-4">
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
				<Label className="text-sm">Expiry</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">CVV</Label>
				<Input type="password" placeholder="•••" />
			</div>
		</div>
		<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
			<Checkbox id="save" />
			<Label htmlFor="save" className="text-sm cursor-pointer">Save card for future purchases</Label>
		</div>
	</div>
);

const DiscountContent = () => (
	<div className="space-y-4 pt-4">
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Promo code" className="pl-10" />
			</div>
			<Button variant="outline">Apply</Button>
		</div>
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Wallet className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Gift card" className="pl-10" />
			</div>
			<Button variant="outline">Apply</Button>
		</div>
		<div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<BadgeCheck className="size-4 text-emerald-500" />
				<span className="text-sm font-medium">SAVE20 applied</span>
			</div>
			<Badge variant="secondary">-$20.00</Badge>
		</div>
	</div>
);

const ReviewContent = () => (
	<div className="space-y-3 pt-4">
		<div className="p-3 rounded-lg bg-muted/30">
			<div className="flex items-center gap-2 text-sm">
				<Clock className="size-4 text-muted-foreground" />
				<span className="font-medium">6 Monthly Payments</span>
			</div>
			<p className="text-xs text-muted-foreground ml-6">$83.00/month at 0% APR</p>
		</div>
		<div className="p-3 rounded-lg bg-muted/30">
			<div className="flex items-center gap-2 text-sm">
				<CreditCard className="size-4 text-muted-foreground" />
				<span className="font-medium">Visa •••• 4242</span>
			</div>
			<p className="text-xs text-muted-foreground ml-6">Expires 12/26</p>
		</div>
		<div className="p-3 rounded-lg bg-muted/30">
			<div className="flex items-center gap-2 text-sm">
				<Percent className="size-4 text-muted-foreground" />
				<span className="font-medium">Discount Applied</span>
			</div>
			<p className="text-xs text-muted-foreground ml-6">SAVE20 - $20.00 off</p>
		</div>
	</div>
);

const PaymentSummary = ({ firstPayment, monthly }: { firstPayment: string; monthly: string }) => (
	<div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
		<div className="flex items-center justify-between">
			<div>
				<span className="font-medium">Due today</span>
				<p className="text-xs text-muted-foreground">First payment</p>
			</div>
			<span className="text-2xl font-bold">{firstPayment}</span>
		</div>
		<Separator />
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">5 remaining payments</span>
			<span>{monthly} each</span>
		</div>
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

export default function Main() {
	const cartItems: CartItem[] = [
		{ name: 'Premium Headphones', quantity: 1, price: '$299.00', image: '🎧' },
		{ name: 'Wireless Charger', quantity: 2, price: '$49.00', image: '🔋' },
	];

	const installmentPlans: InstallmentPlan[] = [
		{ id: '3', months: 3, monthly: '$133.00', total: '$399.00', apr: '0% APR' },
		{ id: '6', months: 6, monthly: '$66.50', total: '$399.00', apr: '0% APR', popular: true },
		{ id: '12', months: 12, monthly: '$36.58', total: '$439.00', apr: '10% APR' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">Buy Now, Pay Later</h2>
							<Badge variant="outline" className="gap-1">
								<Zap className="size-3" />
								0% APR
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<Accordion type="multiple" defaultValue={['cart', 'installment']} className="w-full">
							<AccordionItem value="cart">
								<AccordionTrigger className="text-sm font-medium">
									Your Cart ({cartItems.length} items)
								</AccordionTrigger>
								<AccordionContent>
									<CartSummary items={cartItems} />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="installment">
								<AccordionTrigger className="text-sm font-medium">
									Payment Plan
								</AccordionTrigger>
								<AccordionContent>
									<InstallmentContent plans={installmentPlans} />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="payment">
								<AccordionTrigger className="text-sm font-medium">
									Payment Method
								</AccordionTrigger>
								<AccordionContent>
									<PaymentMethodContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="discount">
								<AccordionTrigger className="text-sm font-medium">
									Discounts & Gift Cards
								</AccordionTrigger>
								<AccordionContent>
									<DiscountContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="review">
								<AccordionTrigger className="text-sm font-medium">
									Review Order
								</AccordionTrigger>
								<AccordionContent>
									<ReviewContent />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<PaymentSummary firstPayment="$66.50" monthly="$66.50" />
						<PayButton label="Start Payment Plan" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
