import { ArrowRight, Check, CreditCard, Lock, MapPin, Package, User } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface StepProps {
	number: number;
	label: string;
	completed: boolean;
	current: boolean;
}

interface PaymentMethodProps {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	description: string;
}

interface ConfirmationItemProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}

const CheckoutStep = ({ number, label, completed, current }: StepProps) => (
	<div className="flex items-center gap-3">
		<div
			className={`size-8 rounded-full flex items-center justify-center text-sm font-medium ${
				completed
					? 'bg-primary text-primary-foreground'
					: current
						? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{completed ? <Check className="size-4" /> : number}
		</div>
		<span className={`text-sm font-medium ${current ? 'text-foreground' : 'text-muted-foreground'}`}>
			{label}
		</span>
	</div>
);

const StepsSidebar = ({ steps }: { steps: StepProps[] }) => (
	<div className="space-y-6">
		{steps.map((step, index) => (
			<div key={index}>
				<CheckoutStep {...step} />
				{index < steps.length - 1 && (
					<div className="ml-4 mt-2 h-8 w-px bg-border" />
				)}
			</div>
		))}
	</div>
);

const PaymentMethodOption = ({ id, icon: Icon, label, description }: PaymentMethodProps) => (
	<Label
		htmlFor={id}
		className="flex items-center gap-4 p-4 rounded-xl border border-border/50 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<RadioGroupItem value={id} id={id} />
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<span className="font-medium">{label}</span>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	</Label>
);

const PaymentMethods = ({ methods }: { methods: PaymentMethodProps[] }) => (
	<RadioGroup defaultValue={methods[0]?.id} className="space-y-3">
		{methods.map((method) => (
			<PaymentMethodOption key={method.id} {...method} />
		))}
	</RadioGroup>
);

const CardFormField = ({
	id,
	label,
	placeholder,
	type = 'text',
}: {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id} className="text-sm">{label}</Label>
		<Input id={id} type={type} placeholder={placeholder} />
	</div>
);

const ConfirmationItem = ({ icon: Icon, label, value }: ConfirmationItemProps) => (
	<div className="flex items-start gap-3">
		<div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
			<Icon className="size-4 text-muted-foreground" />
		</div>
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-sm font-medium">{value}</p>
		</div>
	</div>
);

const OrderConfirmation = ({ items }: { items: ConfirmationItemProps[] }) => (
	<Card className="border-border/50 bg-muted/30">
		<CardContent className="pt-4 space-y-4">
			{items.map((item, index) => (
				<ConfirmationItem key={index} {...item} />
			))}
		</CardContent>
	</Card>
);

const TotalBar = ({ label, amount }: { label: string; amount: string }) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
		<span className="font-medium">{label}</span>
		<span className="text-2xl font-bold">{amount}</span>
	</div>
);

const SubmitButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

export default function Main() {
	const steps: StepProps[] = [
		{ number: 1, label: 'Cart', completed: true, current: false },
		{ number: 2, label: 'Shipping', completed: true, current: false },
		{ number: 3, label: 'Payment', completed: false, current: true },
		{ number: 4, label: 'Review', completed: false, current: false },
	];

	const paymentMethods: PaymentMethodProps[] = [
		{ id: 'credit', icon: CreditCard, label: 'Credit Card', description: 'Pay with Visa, Mastercard, Amex' },
	];

	const confirmationItems: ConfirmationItemProps[] = [
		{ icon: User, label: 'Customer', value: 'John Doe (john@example.com)' },
		{ icon: MapPin, label: 'Shipping Address', value: '123 Main St, New York, NY 10001' },
		{ icon: Package, label: 'Delivery', value: 'Express (2-3 business days)' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid gap-8 @lg:grid-cols-[200px_1fr]">
					<div className="hidden @lg:block">
						<StepsSidebar steps={steps} />
					</div>
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<h1 className="text-2xl font-bold">Payment</h1>
							<Badge variant="outline" className="gap-1.5">
								<Lock className="size-3" />
								Secure
							</Badge>
						</div>
						<PaymentMethods methods={paymentMethods} />
						<Card className="border-border/50 bg-card/50">
							<CardContent className="pt-6 space-y-4">
								<CardFormField id="number" label="Card Number" placeholder="1234 5678 9012 3456" />
								<CardFormField id="name" label="Name on Card" placeholder="John Doe" />
								<div className="grid grid-cols-2 gap-4">
									<CardFormField id="expiry" label="Expiry Date" placeholder="MM/YY" />
									<CardFormField id="cvv" label="Security Code" placeholder="CVV" type="password" />
								</div>
							</CardContent>
						</Card>
						<Separator />
						<OrderConfirmation items={confirmationItems} />
						<TotalBar label="Order Total" amount="$342.00" />
						<SubmitButton label="Complete Order" />
					</div>
				</div>
			</div>
		</section>
	);
}
