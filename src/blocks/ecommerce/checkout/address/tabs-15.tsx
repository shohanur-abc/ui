'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	ShoppingBag,
	MapPin,
	CreditCard,
	CheckCircle2,
	ArrowRight,
	ArrowLeft,
} from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}

const Field = ({ label, placeholder, type = 'text' }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const SelectField = ({ label, placeholder, options }: SelectFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Select>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const CartSummaryTab = () => (
	<div className="space-y-4">
		<div className="space-y-3">
			{[
				{ name: 'Premium Headphones', price: '$299.99', qty: 1 },
				{ name: 'Wireless Charger', price: '$49.99', qty: 2 },
			].map((item) => (
				<div
					key={item.name}
					className="flex items-center gap-4 p-3 rounded-lg bg-muted/30"
				>
					<div className="size-12 rounded-lg bg-muted flex items-center justify-center">
						<ShoppingBag className="size-6 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<span className="font-medium">{item.name}</span>
						<p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
					</div>
					<span className="font-bold">{item.price}</span>
				</div>
			))}
		</div>
		<Separator />
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Subtotal</span>
				<span>$399.97</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Shipping</span>
				<Badge variant="secondary">Calculated next</Badge>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Tax</span>
				<span>$32.00</span>
			</div>
		</div>
		<Separator />
		<div className="flex justify-between font-bold text-lg">
			<span>Estimated Total</span>
			<span>$431.97</span>
		</div>
	</div>
);

const AddressTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Email" placeholder="john@example.com" type="email" />
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<Separator />
		<SelectField label="Country" placeholder="Select country" options={countries} />
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="billing-same" defaultChecked />
			<Label htmlFor="billing-same" className="text-sm font-normal cursor-pointer">
				Billing address same as shipping
			</Label>
		</div>
	</div>
);

const PaymentTab = () => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
			<div className="flex items-center gap-3">
				<CheckCircle2 className="size-5 text-green-500" />
				<div>
					<span className="font-medium text-green-600 dark:text-green-400">
						Shipping Address Saved
					</span>
					<p className="text-sm text-muted-foreground">
						123 Main Street, San Francisco, CA 94102
					</p>
				</div>
			</div>
		</div>
		<Separator />
		<Field label="Card Number" placeholder="1234 5678 9012 3456" />
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Expiry Date" placeholder="MM/YY" />
			<Field label="CVC" placeholder="123" />
		</div>
		<Field label="Name on Card" placeholder="John Doe" />
		<Separator />
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Subtotal</span>
				<span>$399.97</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Shipping (Standard)</span>
				<span>FREE</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Tax</span>
				<span>$32.00</span>
			</div>
		</div>
		<Separator />
		<div className="flex justify-between font-bold text-lg">
			<span>Total</span>
			<span>$431.97</span>
		</div>
	</div>
);

const ConfirmationTab = () => (
	<div className="space-y-6 text-center">
		<div className="size-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
			<CheckCircle2 className="size-8 text-green-500" />
		</div>
		<div>
			<h2 className="text-xl font-bold mb-2">Order Confirmed!</h2>
			<p className="text-muted-foreground">
				Your order #12345 has been placed successfully
			</p>
		</div>
		<div className="p-4 rounded-xl bg-muted/30 border border-border text-left">
			<h3 className="font-medium mb-3">Shipping To:</h3>
			<p className="text-sm text-muted-foreground">John Doe</p>
			<p className="text-sm text-muted-foreground">
				123 Main Street, Apt 4B
			</p>
			<p className="text-sm text-muted-foreground">
				San Francisco, CA 94102
			</p>
		</div>
		<div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-left">
			<h3 className="font-medium mb-2">Estimated Delivery</h3>
			<p className="text-2xl font-bold text-primary">Jan 20-22, 2025</p>
		</div>
	</div>
);

export default function Main() {
	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Card>
					<CardHeader className="pb-4">
						<div className="flex items-center justify-between mb-4">
							<h1 className="text-xl font-bold">Checkout</h1>
							<span className="text-sm text-muted-foreground">Step 2 of 4</span>
						</div>
						<Progress value={50} className="h-2" />
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="address">
							<TabsList className="w-full grid grid-cols-4 mb-6">
								<TabsTrigger value="cart" className="gap-1.5">
									<ShoppingBag className="size-4" />
									<span className="hidden @lg:inline">Cart</span>
								</TabsTrigger>
								<TabsTrigger value="address" className="gap-1.5">
									<MapPin className="size-4" />
									<span className="hidden @lg:inline">Address</span>
								</TabsTrigger>
								<TabsTrigger value="payment" className="gap-1.5">
									<CreditCard className="size-4" />
									<span className="hidden @lg:inline">Payment</span>
								</TabsTrigger>
								<TabsTrigger value="confirm" className="gap-1.5">
									<CheckCircle2 className="size-4" />
									<span className="hidden @lg:inline">Confirm</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="cart">
								<CartSummaryTab />
							</TabsContent>

							<TabsContent value="address">
								<AddressTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="payment">
								<PaymentTab />
							</TabsContent>

							<TabsContent value="confirm">
								<ConfirmationTab />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				<div className="flex gap-4 mt-8">
					<Button variant="outline" size="lg" className="gap-2">
						<ArrowLeft className="size-4" />
						Back
					</Button>
					<Button size="lg" className="flex-1 gap-2">
						Continue
						<ArrowRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
