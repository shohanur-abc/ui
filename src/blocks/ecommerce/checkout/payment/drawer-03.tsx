'use client';

import { ArrowLeft, Check, ChevronRight, CreditCard, Gift, Lock, MapPin, Package, Shield, Truck, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface Step {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	completed: boolean;
	current: boolean;
}

const SteppedDrawerHeader = ({ steps, onClose }: { steps: Step[]; onClose: () => void }) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between">
			<h2 className="text-lg font-semibold">Checkout</h2>
			<Button variant="ghost" size="icon" onClick={onClose}>
				<X className="size-4" />
			</Button>
		</div>
		<div className="flex items-center gap-1">
			{steps.map((step, index) => (
				<div key={step.id} className="flex items-center flex-1">
					<div className={`flex items-center gap-2 ${step.current ? 'text-primary' : step.completed ? 'text-primary' : 'text-muted-foreground'}`}>
						<div className={`size-7 rounded-full flex items-center justify-center text-xs ${
							step.completed ? 'bg-primary text-primary-foreground' : step.current ? 'border-2 border-primary' : 'bg-muted'
						}`}>
							{step.completed ? <Check className="size-3" /> : <step.icon className="size-3" />}
						</div>
						<span className="text-xs font-medium hidden @sm:inline">{step.name}</span>
					</div>
					{index < steps.length - 1 && (
						<ChevronRight className="size-4 mx-2 text-muted-foreground shrink-0" />
					)}
				</div>
			))}
		</div>
	</div>
);

const ShippingAddressForm = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-2 mb-2">
			<MapPin className="size-4 text-primary" />
			<span className="font-medium">Shipping Address</span>
		</div>
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
			<Label className="text-sm">Street Address</Label>
			<Input placeholder="123 Main St" />
		</div>
		<div className="grid grid-cols-3 gap-3">
			<div className="space-y-2 col-span-2">
				<Label className="text-sm">City</Label>
				<Input placeholder="New York" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">ZIP</Label>
				<Input placeholder="10001" />
			</div>
		</div>
	</div>
);

const ShippingMethodSelector = () => (
	<div className="space-y-3">
		<div className="flex items-center gap-2 mb-2">
			<Truck className="size-4 text-primary" />
			<span className="font-medium">Shipping Method</span>
		</div>
		<RadioGroup defaultValue="standard" className="space-y-2">
			{[
				{ id: 'express', name: 'Express', time: '1-2 days', price: '$12.99' },
				{ id: 'standard', name: 'Standard', time: '5-7 days', price: 'Free' },
			].map((option) => (
				<Label
					key={option.id}
					htmlFor={option.id}
					className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5"
				>
					<RadioGroupItem value={option.id} id={option.id} />
					<div className="flex-1">
						<span className="text-sm font-medium">{option.name}</span>
						<p className="text-xs text-muted-foreground">{option.time}</p>
					</div>
					<Badge variant="secondary">{option.price}</Badge>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const PaymentSection = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-2 mb-2">
			<CreditCard className="size-4 text-primary" />
			<span className="font-medium">Payment Method</span>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Card Number</Label>
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="1234 5678 9012 3456" className="pl-10" />
			</div>
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
);

const GiftOptions = () => (
	<div className="p-3 rounded-lg border border-dashed space-y-3">
		<div className="flex items-center gap-3">
			<Checkbox id="gift" />
			<Label htmlFor="gift" className="cursor-pointer flex items-center gap-2">
				<Gift className="size-4 text-muted-foreground" />
				<span className="text-sm">This is a gift</span>
			</Label>
		</div>
	</div>
);

const OrderTotal = ({ subtotal, shipping, total }: { subtotal: string; shipping: string; total: string }) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>{subtotal}</span>
		</div>
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Shipping</span>
			<span>{shipping}</span>
		</div>
		<Separator />
		<div className="flex justify-between font-semibold">
			<span>Total</span>
			<span className="text-lg">{total}</span>
		</div>
	</div>
);

const NavigationButtons = ({ onBack, onNext, isLast }: { onBack: () => void; onNext: () => void; isLast: boolean }) => (
	<div className="flex gap-3">
		<Button variant="outline" onClick={onBack} className="gap-2">
			<ArrowLeft className="size-4" />
		</Button>
		<Button onClick={onNext} className="flex-1 gap-2">
			{isLast ? (
				<>
					<Lock className="size-4" />
					Place Order
				</>
			) : (
				<>
					Continue
					<ChevronRight className="size-4" />
				</>
			)}
		</Button>
	</div>
);

export default function Main() {
	const steps: Step[] = [
		{ id: 'shipping', name: 'Shipping', icon: MapPin, completed: true, current: false },
		{ id: 'delivery', name: 'Delivery', icon: Truck, completed: true, current: false },
		{ id: 'payment', name: 'Payment', icon: CreditCard, completed: false, current: true },
		{ id: 'review', name: 'Review', icon: Package, completed: false, current: false },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm @sm:max-w-md mx-auto">
					<CardHeader>
						<SteppedDrawerHeader steps={steps} onClose={() => {}} />
					</CardHeader>
					<CardContent className="space-y-6">
						<PaymentSection />
						<GiftOptions />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderTotal subtotal="$249.00" shipping="Free" total="$249.00" />
						<NavigationButtons onBack={() => {}} onNext={() => {}} isLast={false} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
