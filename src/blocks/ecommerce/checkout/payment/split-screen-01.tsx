import { CreditCard, Lock, Package, ShieldCheck, Truck } from 'lucide-react';

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

interface CartItemProps {
	name: string;
	variant: string;
	price: string;
	quantity: number;
	image: string;
}

interface FormFieldProps {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface SummaryLineProps {
	label: string;
	value: string;
	isTotal?: boolean;
}

const CartItem = ({ name, variant, price, quantity, image }: CartItemProps) => (
	<div className="flex gap-4">
		<div className="size-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
			<Package className="size-6 text-muted-foreground" />
		</div>
		<div className="flex-1 min-w-0">
			<h4 className="font-medium truncate">{name}</h4>
			<p className="text-sm text-muted-foreground">{variant}</p>
			<p className="text-sm">Qty: {quantity}</p>
		</div>
		<span className="font-medium">{price}</span>
	</div>
);

const CartItemsList = ({ items }: { items: CartItemProps[] }) => (
	<div className="space-y-4">
		{items.map((item, index) => (
			<CartItem key={index} {...item} />
		))}
	</div>
);

const ShippingInfo = ({
	address,
	method,
}: {
	address: string;
	method: string;
}) => (
	<div className="p-4 rounded-lg bg-muted/50 space-y-2">
		<div className="flex items-center gap-2">
			<Truck className="size-4 text-muted-foreground" />
			<span className="text-sm font-medium">Shipping</span>
		</div>
		<p className="text-sm text-muted-foreground">{address}</p>
		<Badge variant="secondary" className="text-xs">
			{method}
		</Badge>
	</div>
);

const SummaryLine = ({ label, value, isTotal }: SummaryLineProps) => (
	<div
		className={`flex justify-between ${isTotal ? 'text-lg font-semibold' : 'text-sm'}`}
	>
		<span className={isTotal ? '' : 'text-muted-foreground'}>{label}</span>
		<span>{value}</span>
	</div>
);

const OrderSummary = ({ lines }: { lines: SummaryLineProps[] }) => (
	<div className="space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-3" />}
				<SummaryLine {...line} />
			</div>
		))}
	</div>
);

const FormInput = ({
	id,
	label,
	placeholder,
	type = 'text',
	icon: Icon,
}: FormFieldProps) => (
	<div className="space-y-2">
		<Label htmlFor={id} className="text-sm">
			{label}
		</Label>
		<div className="relative">
			{Icon && (
				<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			)}
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				className={Icon ? 'pl-10' : ''}
			/>
		</div>
	</div>
);

const PaymentForm = ({ fields }: { fields: FormFieldProps[] }) => (
	<div className="space-y-4">
		{fields.slice(0, 2).map((field) => (
			<FormInput key={field.id} {...field} />
		))}
		<div className="grid grid-cols-2 gap-4">
			{fields.slice(2).map((field) => (
				<FormInput key={field.id} {...field} />
			))}
		</div>
	</div>
);

const PayButton = ({ amount }: { amount: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		Pay {amount}
	</Button>
);

const SecurityFooter = () => (
	<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
		<ShieldCheck className="size-3.5" />
		<span>Secured by 256-bit SSL encryption</span>
	</div>
);

export default function Main() {
	const cartItems: CartItemProps[] = [
		{
			name: 'Wireless Headphones',
			variant: 'Black / Large',
			price: '$199.00',
			quantity: 1,
			image: '',
		},
		{
			name: 'Phone Case',
			variant: 'Clear',
			price: '$29.00',
			quantity: 2,
			image: '',
		},
	];

	const summaryLines: SummaryLineProps[] = [
		{ label: 'Subtotal', value: '$257.00' },
		{ label: 'Shipping', value: '$12.00' },
		{ label: 'Tax', value: '$21.52' },
		{ label: 'Total', value: '$290.52', isTotal: true },
	];

	const formFields: FormFieldProps[] = [
		{
			id: 'card',
			label: 'Card Number',
			placeholder: '1234 5678 9012 3456',
			icon: CreditCard,
		},
		{ id: 'name', label: 'Cardholder Name', placeholder: 'John Doe' },
		{ id: 'exp', label: 'Expiry', placeholder: 'MM/YY' },
		{ id: 'cvc', label: 'CVC', placeholder: '123', type: 'password' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid gap-8 @lg:grid-cols-2">
					<div className="space-y-6">
						<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
							<CardHeader className="pb-4">
								<h2 className="text-lg font-semibold">Order Summary</h2>
							</CardHeader>
							<CardContent className="space-y-6">
								<CartItemsList items={cartItems} />
								<ShippingInfo
									address="123 Main St, New York, NY 10001"
									method="Express Delivery (2-3 days)"
								/>
								<OrderSummary lines={summaryLines} />
							</CardContent>
						</Card>
					</div>
					<div>
						<Card className="border-border/50 bg-card/50 backdrop-blur-sm @lg:sticky @lg:top-8">
							<CardHeader className="pb-4">
								<h2 className="text-lg font-semibold">Payment Details</h2>
							</CardHeader>
							<CardContent>
								<PaymentForm fields={formFields} />
							</CardContent>
							<CardFooter className="flex-col gap-4 pt-2">
								<PayButton amount="$290.52" />
								<SecurityFooter />
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
