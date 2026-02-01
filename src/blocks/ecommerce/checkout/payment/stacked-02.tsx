import { Building2, CreditCard, Lock, Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface PaymentMethodProps {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	description: string;
}

interface InputFieldProps {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	className?: string;
}

const SectionTitle = ({ text }: { text: string }) => (
	<h3 className="text-lg font-semibold tracking-tight">{text}</h3>
);

const PaymentMethodCard = ({
	id,
	icon: Icon,
	label,
	description,
}: PaymentMethodProps) => (
	<Label
		htmlFor={id}
		className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card/30 cursor-pointer transition-all hover:bg-accent/50 hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<RadioGroupItem value={id} id={id} />
		<div className="flex items-center gap-3 flex-1">
			<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
				<Icon className="size-5 text-foreground" />
			</div>
			<div>
				<span className="font-medium block">{label}</span>
				<span className="text-xs text-muted-foreground">{description}</span>
			</div>
		</div>
	</Label>
);

const PaymentMethodSelector = ({
	methods,
}: {
	methods: PaymentMethodProps[];
}) => (
	<RadioGroup defaultValue={methods[0]?.id} className="space-y-3">
		{methods.map((method) => (
			<PaymentMethodCard key={method.id} {...method} />
		))}
	</RadioGroup>
);

const FormField = ({
	id,
	label,
	placeholder,
	type = 'text',
	className,
}: InputFieldProps) => (
	<div className={`space-y-2 ${className || ''}`}>
		<Label htmlFor={id} className="text-sm">
			{label}
		</Label>
		<Input id={id} type={type} placeholder={placeholder} />
	</div>
);

const CardDetailsForm = ({ fields }: { fields: InputFieldProps[] }) => (
	<div className="grid gap-4 @sm:grid-cols-2">
		{fields.map((field) => (
			<FormField key={field.id} {...field} />
		))}
	</div>
);

const SecurityNote = ({ text }: { text: string }) => (
	<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
		<Lock className="size-3" />
		<span>{text}</span>
	</div>
);

const SubmitButton = ({ label, amount }: { label: string; amount: string }) => (
	<Button className="w-full" size="lg">
		{label} {amount}
	</Button>
);

export default function Main() {
	const paymentMethods: PaymentMethodProps[] = [
		{
			id: 'card',
			icon: CreditCard,
			label: 'Credit / Debit Card',
			description: 'Visa, Mastercard, Amex',
		},
		{
			id: 'wallet',
			icon: Wallet,
			label: 'Digital Wallet',
			description: 'Apple Pay, Google Pay',
		},
		{
			id: 'bank',
			icon: Building2,
			label: 'Bank Transfer',
			description: 'Direct bank payment',
		},
	];

	const cardFields: InputFieldProps[] = [
		{
			id: 'cardNumber',
			label: 'Card Number',
			placeholder: '1234 5678 9012 3456',
			className: '@sm:col-span-2',
		},
		{
			id: 'cardName',
			label: 'Name on Card',
			placeholder: 'John Doe',
			className: '@sm:col-span-2',
		},
		{ id: 'expiry', label: 'Expiry', placeholder: 'MM/YY' },
		{ id: 'cvv', label: 'CVV', placeholder: '123', type: 'password' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="space-y-1 pb-6">
						<SectionTitle text="Payment Method" />
						<p className="text-sm text-muted-foreground">
							Choose how you want to pay
						</p>
					</CardHeader>
					<CardContent className="space-y-6">
						<PaymentMethodSelector methods={paymentMethods} />
						<Separator />
						<div className="space-y-4">
							<SectionTitle text="Card Details" />
							<CardDetailsForm fields={cardFields} />
						</div>
						<div className="pt-4 space-y-3">
							<SubmitButton label="Complete Payment" amount="$149.99" />
							<SecurityNote text="Your payment info is encrypted and secure" />
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
