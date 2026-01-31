import { CreditCard, Plus, Trash2, type LucideIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type PaymentMethod = {
	id: string;
	type: 'visa' | 'mastercard' | 'amex';
	last4: string;
	expiry: string;
	isDefault: boolean;
};

type BillingField = {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	colSpan?: number;
};

const CardIcon = ({ type }: { type: PaymentMethod['type'] }) => {
	const colors = {
		visa: 'bg-blue-500/10 text-blue-500',
		mastercard: 'bg-orange-500/10 text-orange-500',
		amex: 'bg-indigo-500/10 text-indigo-500',
	};

	return (
		<div className={`flex size-12 items-center justify-center rounded-lg ${colors[type]}`}>
			<CreditCard className="size-6" />
		</div>
	);
};

const PaymentCard = ({ id, type, last4, expiry, isDefault }: PaymentMethod) => (
	<div className="group flex items-center gap-4 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-muted/30">
		<RadioGroupItem value={id} id={id} />
		<CardIcon type={type} />
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium capitalize">{type}</span>
				<span className="text-muted-foreground">•••• {last4}</span>
				{isDefault && (
					<Badge variant="secondary" className="text-xs">
						Default
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">Expires {expiry}</p>
		</div>
		<Button
			variant="ghost"
			size="icon-sm"
			className="opacity-0 transition-opacity group-hover:opacity-100"
		>
			<Trash2 className="size-4 text-destructive" />
		</Button>
	</div>
);

const BillingInput = ({ id, label, placeholder, type = 'text', colSpan = 1 }: BillingField) => (
	<div className={`space-y-2 ${colSpan === 2 ? '@sm:col-span-2' : ''}`}>
		<Label htmlFor={id} className="text-sm font-medium">
			{label}
		</Label>
		<Input
			id={id}
			type={type}
			placeholder={placeholder}
			className="transition-all focus:ring-2 focus:ring-primary/20"
		/>
	</div>
);

export default function Main() {
	const paymentMethods: PaymentMethod[] = [
		{ id: 'card1', type: 'visa', last4: '4242', expiry: '12/26', isDefault: true },
		{ id: 'card2', type: 'mastercard', last4: '8888', expiry: '03/25', isDefault: false },
		{ id: 'card3', type: 'amex', last4: '1234', expiry: '09/27', isDefault: false },
	];

	const billingFields: BillingField[] = [
		{ id: 'cardholderName', label: 'Cardholder Name', placeholder: 'Name on card', colSpan: 2 },
		{ id: 'cardNumber', label: 'Card Number', placeholder: '1234 5678 9012 3456', colSpan: 2 },
		{ id: 'expiry', label: 'Expiry Date', placeholder: 'MM/YY' },
		{ id: 'cvv', label: 'CVV', placeholder: '123', type: 'password' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<CreditCard className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Payment Methods</CardTitle>
										<CardDescription>Manage your saved payment methods</CardDescription>
									</div>
								</div>
								<Button size="sm" variant="outline" className="gap-2">
									<Plus className="size-4" />
									Add Card
								</Button>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<RadioGroup defaultValue="card1" className="space-y-3">
								{paymentMethods.map((method) => (
									<PaymentCard key={method.id} {...method} />
								))}
							</RadioGroup>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle>Add New Card</CardTitle>
							<CardDescription>Enter your card details to add a new payment method</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid gap-4 @sm:grid-cols-2">
								{billingFields.map((field) => (
									<BillingInput key={field.id} {...field} />
								))}
							</div>
							<div className="mt-6 flex justify-end gap-3">
								<Button variant="outline">Cancel</Button>
								<Button className="gap-2">
									<CreditCard className="size-4" />
									Add Card
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
