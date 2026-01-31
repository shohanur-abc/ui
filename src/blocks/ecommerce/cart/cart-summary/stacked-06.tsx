'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Wallet, Landmark, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type PaymentMethodProps = {
	id: string;
	icon: LucideIcon;
	label: string;
	description: string;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	currency,
}: { label: string; value: string; currency: string }) => (
	<div className="rounded-lg bg-primary/5 p-4">
		<div className="flex items-center justify-between">
			<span className="text-lg font-semibold">{label}</span>
			<div className="text-right">
				<span className="text-sm text-muted-foreground">{currency}</span>
				<span className="ml-1 text-2xl font-bold">{value}</span>
			</div>
		</div>
	</div>
);

const Header = ({
	title,
	status,
}: { title: string; status: { label: string; variant: 'default' | 'secondary' } }) => (
	<CardHeader className="border-b">
		<CardTitle className="flex items-center justify-between">
			{title}
			<Badge variant={status.variant}>{status.label}</Badge>
		</CardTitle>
	</CardHeader>
);

const PaymentMethod = ({
	id,
	icon: Icon,
	label,
	description,
}: PaymentMethodProps) => (
	<label
		htmlFor={id}
		className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
	>
		<RadioGroupItem value={id} id={id} />
		<Icon className="size-5 text-muted-foreground" />
		<div className="flex-1">
			<div className="text-sm font-medium">{label}</div>
			<div className="text-xs text-muted-foreground">{description}</div>
		</div>
	</label>
);

const Actions = ({
	label,
	href,
	termsText,
}: { label: string; href: string; termsText: string }) => (
	<div className="space-y-3">
		<Button className="w-full" size="lg" asChild>
			<Link href={href}>{label}</Link>
		</Button>
		<p className="text-center text-xs text-muted-foreground">{termsText}</p>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Product Total', value: '$429.00' },
		{ label: 'Discount (SAVE20)', value: '-$85.80' },
		{ label: 'Shipping & Handling', value: '$0.00' },
		{ label: 'Sales Tax', value: '$34.32' },
	];

	const paymentMethods: PaymentMethodProps[] = [
		{
			id: 'card',
			icon: CreditCard,
			label: 'Credit/Debit Card',
			description: 'Visa, Mastercard, Amex',
		},
		{
			id: 'wallet',
			icon: Wallet,
			label: 'Digital Wallet',
			description: 'PayPal, Apple Pay, Google Pay',
		},
		{
			id: 'bank',
			icon: Landmark,
			label: 'Bank Transfer',
			description: 'Direct bank payment',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card>
					<Header
						title="Checkout"
						status={{ label: 'Ready', variant: 'default' }}
					/>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
						<TotalRow label="Total" value="377.52" currency="USD" />
						<Separator />
						<div className="space-y-2">
							<p className="text-sm font-medium">Payment Method</p>
							<RadioGroup defaultValue="card" className="space-y-2">
								{paymentMethods.map((method) => (
									<PaymentMethod key={method.id} {...method} />
								))}
							</RadioGroup>
						</div>
					</CardContent>
					<CardFooter className="border-t">
						<Actions
							label="Complete Purchase"
							href="/checkout/confirm"
							termsText="By completing, you agree to our Terms of Service"
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
