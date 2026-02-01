'use client';

import {
	ArrowRight,
	BadgeCheck,
	Check,
	CreditCard,
	Gift,
	Lock,
	MapPin,
	Receipt,
	Shield,
	Truck,
	User,
} from 'lucide-react';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
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

interface StepIndicator {
	step: number;
	label: string;
	completed?: boolean;
	current?: boolean;
}

const StepProgress = ({ steps }: { steps: StepIndicator[] }) => (
	<div className="flex items-center justify-between mb-6">
		{steps.map((step, index) => (
			<div key={index} className="flex items-center">
				<div
					className={`flex items-center gap-2 ${step.current ? 'text-primary' : step.completed ? 'text-primary' : 'text-muted-foreground'}`}
				>
					<div
						className={`size-8 rounded-full flex items-center justify-center text-sm font-medium ${
							step.completed
								? 'bg-primary text-primary-foreground'
								: step.current
									? 'bg-primary text-primary-foreground'
									: 'bg-muted'
						}`}
					>
						{step.completed ? <Check className="size-4" /> : step.step}
					</div>
					<span className="text-sm font-medium hidden @sm:inline">
						{step.label}
					</span>
				</div>
				{index < steps.length - 1 && (
					<div
						className={`w-8 @sm:w-16 h-0.5 mx-2 ${step.completed ? 'bg-primary' : 'bg-muted'}`}
					/>
				)}
			</div>
		))}
	</div>
);

const CustomerInfoContent = () => (
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
		<div className="flex items-center gap-3">
			<Checkbox id="newsletter" />
			<Label htmlFor="newsletter" className="text-sm cursor-pointer">
				Receive updates and promotions
			</Label>
		</div>
	</div>
);

const ShippingContent = () => (
	<div className="space-y-4 pt-4">
		<div className="space-y-2">
			<Label className="text-sm">Street Address</Label>
			<Input placeholder="123 Main Street" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Apartment, suite, etc. (optional)</Label>
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
		<div className="flex items-center gap-3">
			<Checkbox id="billing-same" defaultChecked />
			<Label htmlFor="billing-same" className="text-sm cursor-pointer">
				Billing address same as shipping
			</Label>
		</div>
	</div>
);

const DeliveryContent = () => (
	<div className="space-y-3 pt-4">
		{[
			{
				id: 'express',
				name: 'Express',
				time: '1-2 days',
				price: '$14.99',
				icon: Truck,
			},
			{
				id: 'standard',
				name: 'Standard',
				time: '3-5 days',
				price: '$7.99',
				icon: Truck,
			},
			{
				id: 'economy',
				name: 'Economy',
				time: '7-10 days',
				price: 'Free',
				icon: Truck,
			},
		].map((option) => (
			<Label
				key={option.id}
				htmlFor={option.id}
				className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
			>
				<input
					type="radio"
					name="delivery"
					id={option.id}
					className="sr-only"
					defaultChecked={option.id === 'standard'}
				/>
				<Truck className="size-5 text-muted-foreground" />
				<div className="flex-1">
					<span className="font-medium">{option.name}</span>
					<p className="text-xs text-muted-foreground">{option.time}</p>
				</div>
				<span
					className={`font-medium ${option.price === 'Free' ? 'text-primary' : ''}`}
				>
					{option.price}
				</span>
			</Label>
		))}
	</div>
);

const PaymentContent = () => (
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
		<div className="flex items-center gap-3">
			<Checkbox id="save-card" />
			<Label htmlFor="save-card" className="text-sm cursor-pointer">
				Save card for future purchases
			</Label>
		</div>
	</div>
);

const PromoContent = () => (
	<div className="space-y-4 pt-4">
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Promo or gift card code" className="pl-10" />
			</div>
			<Button variant="outline">Apply</Button>
		</div>
		<div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<BadgeCheck className="size-4 text-emerald-500" />
				<span className="text-sm font-medium">WELCOME15</span>
			</div>
			<span className="text-sm text-emerald-600">-15%</span>
		</div>
	</div>
);

const OrderSummary = ({
	lines,
}: {
	lines: {
		label: string;
		value: string;
		isTotal?: boolean;
		isDiscount?: boolean;
	}[];
}) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<div
					className={`flex justify-between ${line.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}
				>
					<span
						className={
							line.isDiscount
								? 'text-emerald-600'
								: line.isTotal
									? ''
									: 'text-muted-foreground'
						}
					>
						{line.label}
					</span>
					<span className={line.isDiscount ? 'text-emerald-600' : ''}>
						{line.value}
					</span>
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
	const steps: StepIndicator[] = [
		{ step: 1, label: 'Info', completed: true },
		{ step: 2, label: 'Shipping', completed: true },
		{ step: 3, label: 'Delivery', current: true },
		{ step: 4, label: 'Payment' },
	];

	const orderLines = [
		{ label: 'Subtotal (3 items)', value: '$449.00' },
		{ label: 'Shipping', value: '$7.99' },
		{ label: 'Discount (15%)', value: '-$67.35', isDiscount: true },
		{ label: 'Tax', value: '$31.17' },
		{ label: 'Total', value: '$420.81', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<StepProgress steps={steps} />
					</CardHeader>
					<CardContent>
						<Accordion
							type="single"
							collapsible
							defaultValue="delivery"
							className="w-full"
						>
							<AccordionItem value="customer">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-3">
										<div className="size-8 rounded-full bg-primary flex items-center justify-center">
											<Check className="size-4 text-primary-foreground" />
										</div>
										<div className="text-left">
											<span className="font-medium">Customer Information</span>
											<p className="text-xs text-muted-foreground">
												john@example.com
											</p>
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<CustomerInfoContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="shipping">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-3">
										<div className="size-8 rounded-full bg-primary flex items-center justify-center">
											<Check className="size-4 text-primary-foreground" />
										</div>
										<div className="text-left">
											<span className="font-medium">Shipping Address</span>
											<p className="text-xs text-muted-foreground">
												123 Main St, New York, NY 10001
											</p>
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<ShippingContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="delivery">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-3">
										<div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
											3
										</div>
										<div className="text-left">
											<span className="font-medium">Delivery Method</span>
											<p className="text-xs text-muted-foreground">
												Choose shipping speed
											</p>
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<DeliveryContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="payment">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-3">
										<div className="size-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium">
											4
										</div>
										<div className="text-left">
											<span className="font-medium">Payment</span>
											<p className="text-xs text-muted-foreground">
												Card details
											</p>
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<PaymentContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="promo">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-3">
										<div className="size-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
											<Gift className="size-4" />
										</div>
										<div className="text-left">
											<span className="font-medium">Promo Code</span>
											<p className="text-xs text-emerald-600">
												WELCOME15 applied
											</p>
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<PromoContent />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderSummary lines={orderLines} />
						<PayButton label="Continue to Payment" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
