'use client';

import { ArrowLeft, ArrowRight, Check, Circle, CreditCard, Lock, MapPin, Shield, Truck, User } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface TimelineStep {
	number: number;
	title: string;
	summary?: string;
	status: 'completed' | 'current' | 'upcoming';
}

const VerticalTimeline = ({ steps, currentStep }: { steps: TimelineStep[]; currentStep: number }) => (
	<div className="relative">
		{steps.map((step, index) => (
			<div key={index} className="flex gap-4 pb-6 last:pb-0">
				<div className="relative flex flex-col items-center">
					<div
						className={`size-8 rounded-full flex items-center justify-center text-sm font-medium z-10 ${
							step.status === 'completed'
								? 'bg-primary text-primary-foreground'
								: step.status === 'current'
									? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
									: 'bg-muted text-muted-foreground border-2 border-dashed'
						}`}
					>
						{step.status === 'completed' ? <Check className="size-4" /> : step.number}
					</div>
					{index < steps.length - 1 && (
						<div className={`absolute top-8 w-0.5 h-full ${step.status === 'completed' ? 'bg-primary' : 'bg-muted'}`} />
					)}
				</div>
				<div className="flex-1 pt-1">
					<span className={`font-medium ${step.status === 'current' ? 'text-primary' : ''}`}>{step.title}</span>
					{step.summary && <p className="text-xs text-muted-foreground mt-0.5">{step.summary}</p>}
				</div>
			</div>
		))}
	</div>
);

const CustomerInfoForm = () => (
	<div className="space-y-4">
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">First Name</Label>
				<Input placeholder="John" defaultValue="John" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Last Name</Label>
				<Input placeholder="Doe" defaultValue="Doe" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Email</Label>
			<Input type="email" placeholder="john@example.com" defaultValue="john@example.com" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Phone</Label>
			<Input type="tel" placeholder="+1 (555) 000-0000" />
		</div>
	</div>
);

const ShippingForm = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label className="text-sm">Address</Label>
			<Input placeholder="123 Main Street" />
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
	<div className="space-y-3">
		{[
			{ id: 'express', name: 'Express', time: '1-2 days', price: '$14.99' },
			{ id: 'standard', name: 'Standard', time: '3-5 days', price: '$7.99', selected: true },
			{ id: 'economy', name: 'Economy', time: '7-10 days', price: 'Free' },
		].map((option) => (
			<Label
				key={option.id}
				htmlFor={option.id}
				className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/30 ${
					option.selected ? 'border-primary bg-primary/5' : ''
				}`}
			>
				<input type="radio" name="delivery" id={option.id} className="sr-only" defaultChecked={option.selected} />
				<div className={`size-4 rounded-full border-2 flex items-center justify-center ${option.selected ? 'border-primary' : 'border-muted-foreground'}`}>
					{option.selected && <div className="size-2 rounded-full bg-primary" />}
				</div>
				<Truck className="size-4 text-muted-foreground" />
				<div className="flex-1">
					<span className="font-medium text-sm">{option.name}</span>
					<span className="text-xs text-muted-foreground ml-2">{option.time}</span>
				</div>
				<span className={`text-sm font-medium ${option.price === 'Free' ? 'text-primary' : ''}`}>{option.price}</span>
			</Label>
		))}
	</div>
);

const PaymentForm = () => (
	<div className="space-y-4">
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

const OrderTotal = ({ lines }: { lines: { label: string; value: string; isTotal?: boolean }[] }) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<div className={`flex justify-between ${line.isTotal ? 'font-semibold' : 'text-sm'}`}>
					<span className={line.isTotal ? '' : 'text-muted-foreground'}>{line.label}</span>
					<span>{line.value}</span>
				</div>
			</div>
		))}
	</div>
);

const WizardNavigation = ({ step, onPrev, onNext }: { step: number; onPrev: () => void; onNext: () => void }) => (
	<div className="flex gap-3">
		{step > 1 && (
			<Button variant="outline" onClick={onPrev} className="gap-2">
				<ArrowLeft className="size-4" />
			</Button>
		)}
		<Button onClick={onNext} className="flex-1 gap-2">
			{step < 4 ? (
				<>
					Continue
					<ArrowRight className="size-4" />
				</>
			) : (
				<>
					<Lock className="size-4" />
					Pay Now
				</>
			)}
		</Button>
	</div>
);

export default function Main() {
	const currentStep = 2;

	const steps: TimelineStep[] = [
		{ number: 1, title: 'Contact Information', summary: 'john@example.com', status: 'completed' },
		{ number: 2, title: 'Shipping Address', status: 'current' },
		{ number: 3, title: 'Delivery Method', status: 'upcoming' },
		{ number: 4, title: 'Payment', status: 'upcoming' },
	];

	const orderLines = [
		{ label: 'Subtotal', value: '$299.00' },
		{ label: 'Shipping', value: 'TBD' },
		{ label: 'Tax', value: '$23.92' },
		{ label: 'Total', value: '$322.92+', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
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
						<div className="grid @md:grid-cols-[200px_1fr] gap-6">
							<div className="hidden @md:block">
								<VerticalTimeline steps={steps} currentStep={currentStep} />
							</div>
							<div className="space-y-4">
								<div>
									<h3 className="text-lg font-medium mb-1 flex items-center gap-2">
										<MapPin className="size-5" />
										Shipping Address
									</h3>
									<p className="text-sm text-muted-foreground">Where should we deliver?</p>
								</div>
								<Separator />
								<ShippingForm />
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderTotal lines={orderLines} />
						<WizardNavigation step={currentStep} onPrev={() => {}} onNext={() => {}} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
