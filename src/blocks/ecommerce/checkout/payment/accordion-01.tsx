'use client';

import { Building2, CreditCard, Gift, Lock, MapPin, Shield, Smartphone, Truck, User, Wallet } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface AccordionSection {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	subtitle: string;
}

const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: React.ComponentType<{ className?: string }>; title: string; subtitle: string }) => (
	<div className="flex items-center gap-3">
		<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<span className="font-medium">{title}</span>
			<p className="text-sm text-muted-foreground">{subtitle}</p>
		</div>
	</div>
);

const BillingForm = () => (
	<div className="space-y-4 pt-4">
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">First Name</Label>
				<Input placeholder="John" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Last Name</Label>
				<Input placeholder="Doe" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Email</Label>
			<Input type="email" placeholder="john@example.com" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Phone</Label>
			<Input type="tel" placeholder="+1 (555) 000-0000" />
		</div>
	</div>
);

const ShippingForm = () => (
	<div className="space-y-4 pt-4">
		<div className="space-y-2">
			<Label className="text-sm">Address</Label>
			<Input placeholder="123 Main Street" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Apartment, suite, etc.</Label>
			<Input placeholder="Apt 4B" />
		</div>
		<div className="grid grid-cols-3 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">City</Label>
				<Input placeholder="New York" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">State</Label>
				<Input placeholder="NY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">ZIP</Label>
				<Input placeholder="10001" />
			</div>
		</div>
	</div>
);

const DeliveryOptions = () => (
	<div className="space-y-3 pt-4">
		<RadioGroup defaultValue="express" className="space-y-2">
			<Label htmlFor="express" className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
				<RadioGroupItem value="express" id="express" />
				<div className="flex-1">
					<span className="font-medium">Express Delivery</span>
					<p className="text-xs text-muted-foreground">1-2 business days</p>
				</div>
				<span className="font-medium">$12.99</span>
			</Label>
			<Label htmlFor="standard" className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
				<RadioGroupItem value="standard" id="standard" />
				<div className="flex-1">
					<span className="font-medium">Standard Delivery</span>
					<p className="text-xs text-muted-foreground">3-5 business days</p>
				</div>
				<span className="font-medium">$5.99</span>
			</Label>
			<Label htmlFor="free" className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
				<RadioGroupItem value="free" id="free" />
				<div className="flex-1">
					<span className="font-medium">Economy</span>
					<p className="text-xs text-muted-foreground">7-10 business days</p>
				</div>
				<span className="font-medium text-primary">Free</span>
			</Label>
		</RadioGroup>
	</div>
);

const PaymentForm = () => (
	<div className="space-y-4 pt-4">
		<div className="space-y-2">
			<Label className="text-sm">Card Number</Label>
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="1234 5678 9012 3456" className="pl-10" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Cardholder Name</Label>
			<Input placeholder="JOHN DOE" />
		</div>
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">Expiry Date</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">CVV</Label>
				<Input type="password" placeholder="•••" />
			</div>
		</div>
	</div>
);

const PromoCodeInput = () => (
	<div className="space-y-3 pt-4">
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Enter promo code" className="pl-10" />
			</div>
			<Button variant="outline">Apply</Button>
		</div>
	</div>
);

const OrderSummary = ({ lines }: { lines: { label: string; value: string; isTotal?: boolean }[] }) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<div className={`flex justify-between ${line.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}>
					<span className={line.isTotal ? '' : 'text-muted-foreground'}>{line.label}</span>
					<span>{line.value}</span>
				</div>
			</div>
		))}
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const sections: AccordionSection[] = [
		{ id: 'billing', icon: User, title: 'Billing Information', subtitle: 'Enter your details' },
		{ id: 'shipping', icon: MapPin, title: 'Shipping Address', subtitle: 'Where to deliver' },
		{ id: 'delivery', icon: Truck, title: 'Delivery Method', subtitle: 'Choose shipping speed' },
		{ id: 'payment', icon: CreditCard, title: 'Payment', subtitle: 'Card details' },
		{ id: 'promo', icon: Gift, title: 'Promo Code', subtitle: 'Have a code?' },
	];

	const orderLines = [
		{ label: 'Subtotal', value: '$299.00' },
		{ label: 'Shipping', value: '$12.99' },
		{ label: 'Tax', value: '$24.96' },
		{ label: 'Total', value: '$336.95', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
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
					<CardContent>
						<Accordion type="single" collapsible defaultValue="billing" className="w-full">
							<AccordionItem value="billing">
								<AccordionTrigger className="hover:no-underline">
									<SectionHeader icon={User} title="Billing Information" subtitle="Enter your details" />
								</AccordionTrigger>
								<AccordionContent>
									<BillingForm />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="shipping">
								<AccordionTrigger className="hover:no-underline">
									<SectionHeader icon={MapPin} title="Shipping Address" subtitle="Where to deliver" />
								</AccordionTrigger>
								<AccordionContent>
									<ShippingForm />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="delivery">
								<AccordionTrigger className="hover:no-underline">
									<SectionHeader icon={Truck} title="Delivery Method" subtitle="Choose shipping speed" />
								</AccordionTrigger>
								<AccordionContent>
									<DeliveryOptions />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="payment">
								<AccordionTrigger className="hover:no-underline">
									<SectionHeader icon={CreditCard} title="Payment" subtitle="Card details" />
								</AccordionTrigger>
								<AccordionContent>
									<PaymentForm />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="promo">
								<AccordionTrigger className="hover:no-underline">
									<SectionHeader icon={Gift} title="Promo Code" subtitle="Have a code?" />
								</AccordionTrigger>
								<AccordionContent>
									<PromoCodeInput />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderSummary lines={orderLines} />
						<PayButton label="Place Order" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
