import { MapPin, CreditCard, Package, Lock, ShieldCheck, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const StepIndicator = ({
	steps,
	currentStep,
}: {
	steps: { number: number; label: string }[];
	currentStep: number;
}) => (
	<div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
		{steps.map((step, i) => (
			<div key={step.number} className="flex items-center gap-2">
				<div
					className={`
						flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors
						${step.number < currentStep ? 'bg-primary text-primary-foreground' : ''}
						${step.number === currentStep ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : ''}
						${step.number > currentStep ? 'bg-muted text-muted-foreground' : ''}
					`}
				>
					{step.number < currentStep ? <Check className="size-4" /> : step.number}
				</div>
				<span className={`text-sm whitespace-nowrap ${step.number === currentStep ? 'font-medium' : 'text-muted-foreground'}`}>
					{step.label}
				</span>
				{i < steps.length - 1 && <div className="w-8 h-px bg-border" />}
			</div>
		))}
	</div>
);

const FormSection = ({
	icon: Icon,
	title,
	subtitle,
	children,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	subtitle: string;
	children: React.ReactNode;
}) => (
	<div className="rounded-2xl border bg-card p-6 shadow-sm">
		<div className="flex items-start gap-4 mb-6">
			<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
				<Icon className="size-6" />
			</div>
			<div>
				<h3 className="font-semibold text-lg">{title}</h3>
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			</div>
		</div>
		{children}
	</div>
);

const FormInput = ({
	label,
	placeholder,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Input type={type} placeholder={placeholder} className="h-11" />
	</div>
);

const OrderItemCompact = ({
	name,
	qty,
	price,
}: {
	name: string;
	qty: number;
	price: string;
}) => (
	<div className="flex justify-between text-sm">
		<span className="text-muted-foreground">
			{name} <span className="text-foreground/60">×{qty}</span>
		</span>
		<span>{price}</span>
	</div>
);

const TrustBadges = ({
	badges,
}: {
	badges: { icon: React.ComponentType<{ className?: string }>; text: string }[];
}) => (
	<div className="flex flex-wrap items-center justify-center gap-4">
		{badges.map((badge, i) => (
			<div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
				<badge.icon className="size-3.5" />
				<span>{badge.text}</span>
			</div>
		))}
	</div>
);

export default function Main() {
	const checkoutSteps = [
		{ number: 1, label: 'Cart' },
		{ number: 2, label: 'Shipping' },
		{ number: 3, label: 'Payment' },
		{ number: 4, label: 'Confirm' },
	];

	const orderItems = [
		{ name: 'Premium Headphones', qty: 1, price: '$299.00' },
		{ name: 'Wireless Charger', qty: 2, price: '$78.00' },
		{ name: 'Phone Case', qty: 1, price: '$29.00' },
	];

	const trustBadges = [
		{ icon: Lock, text: 'SSL Encrypted' },
		{ icon: ShieldCheck, text: 'Buyer Protection' },
	];

	return (
		<section className="@container relative overflow-hidden bg-muted/20">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<StepIndicator steps={checkoutSteps} currentStep={2} />

				<div className="grid @xl:grid-cols-[1fr,380px] gap-8">
					<div className="space-y-6">
						<FormSection
							icon={MapPin}
							title="Shipping Address"
							subtitle="Where should we deliver your order?"
						>
							<div className="space-y-4">
								<div className="grid @sm:grid-cols-2 gap-4">
									<FormInput label="First Name" placeholder="John" />
									<FormInput label="Last Name" placeholder="Doe" />
								</div>
								<FormInput label="Email" placeholder="john@example.com" type="email" />
								<FormInput label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
								<FormInput label="Street Address" placeholder="123 Main Street" />
								<FormInput label="Apt / Suite" placeholder="Apartment 4B" />
								<div className="grid @sm:grid-cols-3 gap-4">
									<FormInput label="City" placeholder="New York" />
									<FormInput label="State" placeholder="NY" />
									<FormInput label="ZIP" placeholder="10001" />
								</div>
							</div>
						</FormSection>

						<div className="flex gap-3">
							<Button variant="outline" className="flex-1">Back to Cart</Button>
							<Button className="flex-1">Continue to Payment</Button>
						</div>
					</div>

					<div className="space-y-6 @xl:sticky @xl:top-6 @xl:self-start">
						<div className="rounded-2xl border bg-card p-6 shadow-sm">
							<div className="flex items-center gap-2 mb-4">
								<Package className="size-5" />
								<h4 className="font-semibold">Order Summary</h4>
							</div>

							<div className="space-y-2 mb-4">
								{orderItems.map((item, i) => (
									<OrderItemCompact key={i} {...item} />
								))}
							</div>

							<Separator className="my-4" />

							<div className="space-y-2 text-sm">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Subtotal</span>
									<span>$406.00</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Shipping</span>
									<span>$9.99</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Tax</span>
									<span>$33.28</span>
								</div>
							</div>

							<Separator className="my-4" />

							<div className="flex justify-between font-semibold text-lg">
								<span>Total</span>
								<span className="text-primary">$449.27</span>
							</div>
						</div>

						<div className="rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/20 p-4">
							<div className="flex items-center gap-2 mb-2">
								<CreditCard className="size-4 text-primary" />
								<span className="text-sm font-medium">Secure Checkout</span>
							</div>
							<p className="text-xs text-muted-foreground">
								Your payment information is encrypted and secure. We never store your card details.
							</p>
						</div>

						<TrustBadges badges={trustBadges} />
					</div>
				</div>
			</div>
		</section>
	);
}
