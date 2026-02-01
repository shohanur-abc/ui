import { CreditCard, Lock, ShieldCheck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface PaymentFieldProps {
	label: string;
	placeholder: string;
	type?: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface TrustBadgeProps {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

interface PaymentFormProps {
	title: string;
	description: string;
	fields: PaymentFieldProps[];
	submitLabel: string;
}

interface OrderSummaryItemProps {
	label: string;
	value: string;
	isTotal?: boolean;
}

interface OrderSummaryProps {
	title: string;
	items: OrderSummaryItemProps[];
}

const SectionHeader = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => (
	<div className="space-y-1">
		<h2 className="text-xl @md:text-2xl font-semibold tracking-tight">
			{title}
		</h2>
		<p className="text-sm text-muted-foreground">{description}</p>
	</div>
);

const PaymentField = ({
	label,
	placeholder,
	type = 'text',
	icon: Icon,
}: PaymentFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm font-medium">{label}</Label>
		<div className="relative">
			{Icon && (
				<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			)}
			<Input
				type={type}
				placeholder={placeholder}
				className={Icon ? 'pl-10' : ''}
			/>
		</div>
	</div>
);

const TrustBadge = ({ icon: Icon, text }: TrustBadgeProps) => (
	<div className="flex items-center gap-2 text-xs text-muted-foreground">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</div>
);

const PaymentForm = ({
	title,
	description,
	fields,
	submitLabel,
}: PaymentFormProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4">
			<SectionHeader title={title} description={description} />
		</CardHeader>
		<CardContent className="space-y-4">
			{fields.map((field, index) => (
				<PaymentField key={index} {...field} />
			))}
		</CardContent>
		<CardFooter className="flex-col gap-4 pt-2">
			<Button className="w-full gap-2" size="lg">
				<Lock className="size-4" />
				{submitLabel}
			</Button>
			<div className="flex items-center justify-center gap-4">
				<TrustBadge icon={ShieldCheck} text="SSL Secured" />
				<TrustBadge icon={Lock} text="256-bit Encryption" />
			</div>
		</CardFooter>
	</Card>
);

const OrderSummary = ({ title, items }: OrderSummaryProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4">
			<h3 className="font-semibold">{title}</h3>
		</CardHeader>
		<CardContent className="space-y-3">
			{items.map((item, index) => (
				<div key={index}>
					{item.isTotal && <Separator className="mb-3" />}
					<div
						className={`flex justify-between ${item.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}
					>
						<span className={item.isTotal ? '' : 'text-muted-foreground'}>
							{item.label}
						</span>
						<span>{item.value}</span>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const SecureBadge = ({ text }: { text: string }) => (
	<Badge variant="secondary" className="gap-1.5">
		<ShieldCheck className="size-3" />
		{text}
	</Badge>
);

export default function Main() {
	const paymentFields: PaymentFieldProps[] = [
		{
			label: 'Card Number',
			placeholder: '4242 4242 4242 4242',
			icon: CreditCard,
		},
		{ label: 'Cardholder Name', placeholder: 'John Doe' },
		{ label: 'Expiry Date', placeholder: 'MM/YY' },
		{ label: 'CVV', placeholder: '123', type: 'password' },
	];

	const summaryItems: OrderSummaryItemProps[] = [
		{ label: 'Subtotal', value: '$99.00' },
		{ label: 'Shipping', value: '$5.00' },
		{ label: 'Tax', value: '$8.32' },
		{ label: 'Total', value: '$112.32', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex justify-center mb-6">
					<SecureBadge text="Secure Checkout" />
				</div>
				<div className="space-y-6">
					<PaymentForm
						title="Payment Details"
						description="Enter your card information to complete the purchase"
						fields={paymentFields}
						submitLabel="Pay $112.32"
					/>
					<OrderSummary title="Order Summary" items={summaryItems} />
				</div>
			</div>
		</section>
	);
}
