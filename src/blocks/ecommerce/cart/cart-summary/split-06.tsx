'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Wallet,
	Smartphone,
	CreditCard,
	Building2,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type PaymentOptionProps = {
	id: string;
	icon: LucideIcon;
	name: string;
	description: string;
	badge?: string;
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
	installment,
}: {
	label: string;
	value: string;
	installment: string;
}) => (
	<div className="space-y-1">
		<div className="flex items-center justify-between">
			<span className="text-lg font-semibold">{label}</span>
			<span className="text-2xl font-bold">{value}</span>
		</div>
		<p className="text-right text-xs text-muted-foreground">{installment}</p>
	</div>
);

const PaymentOption = ({
	id,
	icon: Icon,
	name,
	description,
	badge,
}: PaymentOptionProps) => (
	<label
		htmlFor={id}
		className="flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all hover:border-muted-foreground/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
	>
		<RadioGroupItem value={id} id={id} className="sr-only" />
		<div className="flex size-12 items-center justify-center rounded-xl bg-muted">
			<Icon className="size-6 text-foreground" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{name}</span>
				{badge && (
					<Badge variant="secondary" className="text-xs">
						{badge}
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<div className="size-5 rounded-full border-2 transition-colors [[data-state=checked]~&]:border-primary [[data-state=checked]~&]:bg-primary" />
	</label>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Cart Total', value: '$899.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$71.92' },
	];

	const paymentOptions: PaymentOptionProps[] = [
		{
			id: 'card',
			icon: CreditCard,
			name: 'Credit / Debit Card',
			description: 'Visa, Mastercard, Amex accepted',
		},
		{
			id: 'wallet',
			icon: Wallet,
			name: 'Digital Wallet',
			description: 'Apple Pay, Google Pay',
			badge: 'Fastest',
		},
		{
			id: 'phone',
			icon: Smartphone,
			name: 'Buy Now, Pay Later',
			description: 'Split into 4 payments with Klarna',
		},
		{
			id: 'bank',
			icon: Building2,
			name: 'Bank Transfer',
			description: 'Direct bank payment',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<Card>
						<CardHeader>
							<CardTitle>Payment Method</CardTitle>
						</CardHeader>
						<CardContent>
							<RadioGroup defaultValue="wallet" className="space-y-3">
								{paymentOptions.map((option) => (
									<PaymentOption key={option.id} {...option} />
								))}
							</RadioGroup>
						</CardContent>
					</Card>
					<Card className="h-fit">
						<CardHeader className="border-b">
							<CardTitle>Order Total</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								{summaryItems.map((item, i) => (
									<SummaryRow key={i} {...item} />
								))}
							</div>
							<Separator />
							<TotalRow
								label="Total"
								value="$970.92"
								installment="or 4 x $242.73 with Klarna"
							/>
							<Button className="w-full" size="lg" asChild>
								<Link href="/checkout/confirm">Pay Now</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
