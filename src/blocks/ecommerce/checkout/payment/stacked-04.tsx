'use client';

import {
	Building,
	CreditCard,
	Gift,
	Percent,
	Smartphone,
	X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface PaymentOptionProps {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	sublabel?: string;
	badge?: string;
}

interface PromoCodeProps {
	placeholder: string;
	buttonLabel: string;
}

interface AppliedPromoProps {
	code: string;
	discount: string;
}

const PageTitle = ({ text, subtitle }: { text: string; subtitle: string }) => (
	<div className="text-center space-y-2">
		<h1 className="text-2xl @md:text-3xl font-bold tracking-tight">{text}</h1>
		<p className="text-muted-foreground">{subtitle}</p>
	</div>
);

const PaymentOption = ({
	value,
	icon: Icon,
	label,
	sublabel,
	badge,
}: PaymentOptionProps) => (
	<Label
		htmlFor={value}
		className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-background/50 cursor-pointer transition-all hover:border-primary/50 hover:bg-accent/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:shadow-sm"
	>
		<RadioGroupItem value={value} id={value} />
		<div className="size-10 rounded-lg bg-muted/80 flex items-center justify-center">
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{label}</span>
				{badge && (
					<Badge variant="secondary" className="text-xs">
						{badge}
					</Badge>
				)}
			</div>
			{sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
		</div>
	</Label>
);

const PaymentOptionsGroup = ({
	options,
}: {
	options: PaymentOptionProps[];
}) => (
	<RadioGroup defaultValue={options[0]?.value} className="space-y-3">
		{options.map((option) => (
			<PaymentOption key={option.value} {...option} />
		))}
	</RadioGroup>
);

const PromoCodeInput = ({ placeholder, buttonLabel }: PromoCodeProps) => (
	<div className="flex gap-2">
		<div className="relative flex-1">
			<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input placeholder={placeholder} className="pl-10" />
		</div>
		<Button variant="outline">{buttonLabel}</Button>
	</div>
);

const AppliedPromo = ({ code, discount }: AppliedPromoProps) => (
	<div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
		<div className="flex items-center gap-2">
			<Percent className="size-4 text-primary" />
			<span className="text-sm font-medium">{code}</span>
			<span className="text-sm text-muted-foreground">- {discount}</span>
		</div>
		<Button variant="ghost" size="icon-sm" className="size-6">
			<X className="size-3" />
		</Button>
	</div>
);

const CardFormField = ({
	id,
	label,
	placeholder,
	type = 'text',
	icon: Icon,
}: {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	icon?: React.ComponentType<{ className?: string }>;
}) => (
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

const PriceRow = ({
	label,
	value,
	isTotal,
}: {
	label: string;
	value: string;
	isTotal?: boolean;
}) => (
	<div
		className={`flex justify-between ${isTotal ? 'text-lg font-semibold' : 'text-sm'}`}
	>
		<span className={isTotal ? '' : 'text-muted-foreground'}>{label}</span>
		<span>{value}</span>
	</div>
);

const OrderTotal = ({
	items,
}: {
	items: { label: string; value: string; isTotal?: boolean }[];
}) => (
	<div className="space-y-2 p-4 rounded-lg bg-muted/50">
		{items.map((item, index) => (
			<PriceRow key={index} {...item} />
		))}
	</div>
);

const SubmitPayment = ({ label }: { label: string }) => (
	<Button className="w-full" size="lg">
		{label}
	</Button>
);

export default function Main() {
	const paymentOptions: PaymentOptionProps[] = [
		{
			value: 'card',
			icon: CreditCard,
			label: 'Credit or Debit Card',
			sublabel: 'All major cards accepted',
		},
		{
			value: 'mobile',
			icon: Smartphone,
			label: 'Mobile Payment',
			sublabel: 'Apple Pay, Google Pay',
			badge: 'Fast',
		},
		{
			value: 'bank',
			icon: Building,
			label: 'Bank Transfer',
			sublabel: 'ACH / Wire transfer',
		},
	];

	const priceItems = [
		{ label: 'Subtotal', value: '$249.00' },
		{ label: 'Discount', value: '-$24.90' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$17.93' },
		{ label: 'Total', value: '$242.03', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="space-y-6">
					<PageTitle
						text="Complete Your Order"
						subtitle="Choose your preferred payment method"
					/>
					<Card className="border-border/50">
						<CardHeader className="pb-4">
							<h3 className="font-semibold">Payment Method</h3>
						</CardHeader>
						<CardContent className="space-y-6">
							<PaymentOptionsGroup options={paymentOptions} />
							<Separator />
							<div className="space-y-4">
								<h4 className="font-medium text-sm">Card Details</h4>
								<CardFormField
									id="cardNum"
									label="Card Number"
									placeholder="1234 5678 9012 3456"
									icon={CreditCard}
								/>
								<div className="grid grid-cols-2 gap-4">
									<CardFormField id="exp" label="Expiry" placeholder="MM/YY" />
									<CardFormField
										id="cvc"
										label="CVC"
										placeholder="123"
										type="password"
									/>
								</div>
							</div>
							<Separator />
							<div className="space-y-3">
								<h4 className="font-medium text-sm">Promo Code</h4>
								<PromoCodeInput placeholder="Enter code" buttonLabel="Apply" />
								<AppliedPromo code="SAVE10" discount="$24.90" />
							</div>
							<OrderTotal items={priceItems} />
							<SubmitPayment label="Pay $242.03" />
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
