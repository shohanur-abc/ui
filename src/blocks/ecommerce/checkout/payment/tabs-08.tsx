'use client';

import { ArrowRight, Clock, CreditCard, Gift, Globe, Lock, RefreshCcw, Smartphone, Truck, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ShippingOption {
	id: string;
	name: string;
	time: string;
	price: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface PaymentFeature {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}

const ProductPreview = ({ name, variant, price, image }: { name: string; variant: string; price: string; image: string }) => (
	<div className="flex gap-4 p-4 rounded-xl bg-muted/30">
		<div className="size-20 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-3xl">
			{image}
		</div>
		<div className="flex-1">
			<h3 className="font-semibold">{name}</h3>
			<p className="text-sm text-muted-foreground">{variant}</p>
			<p className="text-lg font-bold mt-2">{price}</p>
		</div>
	</div>
);

const ShippingOptionCard = ({ id, name, time, price, icon: Icon }: ShippingOption) => (
	<Label
		htmlFor={id}
		className="flex items-center gap-3 p-3 rounded-xl border border-border/50 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<RadioGroupItem value={id} id={id} />
		<Icon className="size-5 text-muted-foreground" />
		<div className="flex-1">
			<span className="text-sm font-medium">{name}</span>
			<p className="text-xs text-muted-foreground">{time}</p>
		</div>
		<span className="text-sm font-medium">{price}</span>
	</Label>
);

const ShippingTab = ({ options }: { options: ShippingOption[] }) => (
	<div className="space-y-4">
		<h3 className="font-medium">Delivery Options</h3>
		<RadioGroup defaultValue={options[0]?.id} className="space-y-2">
			{options.map((option) => (
				<ShippingOptionCard key={option.id} {...option} />
			))}
		</RadioGroup>
	</div>
);

const PaymentTab = () => (
	<div className="space-y-4">
		<h3 className="font-medium">Payment Method</h3>
		<div className="space-y-3">
			<Button variant="outline" className="w-full h-14 justify-start gap-4">
				<CreditCard className="size-5" />
				<div className="text-left">
					<span className="block text-sm">Credit/Debit Card</span>
					<span className="text-xs text-muted-foreground">Visa, Mastercard, Amex</span>
				</div>
			</Button>
			<Button variant="outline" className="w-full h-14 justify-start gap-4">
				<Wallet className="size-5" />
				<div className="text-left">
					<span className="block text-sm">Digital Wallet</span>
					<span className="text-xs text-muted-foreground">Apple Pay, Google Pay</span>
				</div>
			</Button>
			<Button variant="outline" className="w-full h-14 justify-start gap-4">
				<Smartphone className="size-5" />
				<div className="text-left">
					<span className="block text-sm">PayPal</span>
					<span className="text-xs text-muted-foreground">Fast and secure</span>
				</div>
			</Button>
		</div>
	</div>
);

const GiftTab = () => (
	<div className="space-y-4">
		<h3 className="font-medium">Gift Options</h3>
		<div className="space-y-4">
			<div className="space-y-2">
				<Label className="text-sm">Gift Card Code</Label>
				<div className="flex gap-2">
					<div className="relative flex-1">
						<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
						<Input placeholder="Enter gift card code" className="pl-10" />
					</div>
					<Button variant="outline">Apply</Button>
				</div>
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Gift Message (Optional)</Label>
				<textarea 
					className="w-full h-24 px-3 py-2 rounded-lg border border-input bg-transparent text-sm resize-none"
					placeholder="Add a personal message..."
				/>
			</div>
			<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
				<input type="checkbox" className="size-4 rounded border-input" />
				<Label className="text-sm cursor-pointer">Gift wrap this order (+$5.00)</Label>
			</div>
		</div>
	</div>
);

const ReviewTab = () => (
	<div className="space-y-4">
		<h3 className="font-medium">Order Review</h3>
		<div className="space-y-3">
			<div className="p-3 rounded-lg bg-muted/30">
				<div className="flex items-center gap-2 text-sm">
					<Truck className="size-4 text-muted-foreground" />
					<span className="font-medium">Express Shipping</span>
				</div>
				<p className="text-xs text-muted-foreground ml-6">1-2 business days</p>
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
					<Globe className="size-4 text-muted-foreground" />
					<span className="font-medium">Shipping Address</span>
				</div>
				<p className="text-xs text-muted-foreground ml-6">123 Main St, New York, NY 10001</p>
			</div>
		</div>
	</div>
);

const FeaturesList = ({ features }: { features: PaymentFeature[] }) => (
	<div className="flex items-center justify-center gap-4 flex-wrap text-xs text-muted-foreground">
		{features.map((feature, index) => (
			<div key={index} className="flex items-center gap-1">
				<feature.icon className="size-3" />
				<span>{feature.label}</span>
			</div>
		))}
	</div>
);

const PriceSummary = ({ lines }: { lines: { label: string; value: string; isTotal?: boolean }[] }) => (
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
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

export default function Main() {
	const shippingOptions: ShippingOption[] = [
		{ id: 'express', name: 'Express', time: '1-2 days', price: '$12.99', icon: Truck },
		{ id: 'standard', name: 'Standard', time: '3-5 days', price: '$5.99', icon: Clock },
		{ id: 'free', name: 'Economy', time: '7-10 days', price: 'Free', icon: RefreshCcw },
	];

	const features: PaymentFeature[] = [
		{ icon: Lock, label: 'Secure' },
		{ icon: RefreshCcw, label: '30-day returns' },
		{ icon: Truck, label: 'Free shipping over $50' },
	];

	const priceLines = [
		{ label: 'Subtotal', value: '$249.00' },
		{ label: 'Shipping', value: '$12.99' },
		{ label: 'Tax', value: '$20.96' },
		{ label: 'Total', value: '$282.95', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="space-y-4">
						<ProductPreview 
							name="Premium Wireless Earbuds" 
							variant="Midnight Black • 1 item" 
							price="$249.00"
							image="🎧"
						/>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="shipping" className="w-full">
							<TabsList className="w-full grid grid-cols-4 h-10 text-xs mb-6">
								<TabsTrigger value="shipping">Shipping</TabsTrigger>
								<TabsTrigger value="payment">Payment</TabsTrigger>
								<TabsTrigger value="gift">Gift</TabsTrigger>
								<TabsTrigger value="review">Review</TabsTrigger>
							</TabsList>
							<TabsContent value="shipping">
								<ShippingTab options={shippingOptions} />
							</TabsContent>
							<TabsContent value="payment">
								<PaymentTab />
							</TabsContent>
							<TabsContent value="gift">
								<GiftTab />
							</TabsContent>
							<TabsContent value="review">
								<ReviewTab />
							</TabsContent>
						</Tabs>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<PriceSummary lines={priceLines} />
						<PayButton label="Place Order" />
						<FeaturesList features={features} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
