import { Building2, ChevronRight, CreditCard, Globe2, Lock, Smartphone, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface PaymentMethodProps {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	description: string;
	badge?: string;
}

interface RecentPaymentProps {
	method: string;
	last4: string;
	date: string;
}

interface CountryProps {
	code: string;
	name: string;
	flag: string;
}

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="space-y-1">
		<h1 className="text-2xl @md:text-3xl font-bold">{text}</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
	</div>
);

const PaymentMethodCard = ({ icon: Icon, name, description, badge }: PaymentMethodProps) => (
	<button className="flex items-center gap-4 w-full p-4 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-accent/30 transition-all text-left group">
		<div className="size-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
			<Icon className="size-6" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{name}</span>
				{badge && <Badge variant="secondary" className="text-xs">{badge}</Badge>}
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<ChevronRight className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
	</button>
);

const PaymentMethods = ({ methods }: { methods: PaymentMethodProps[] }) => (
	<div className="space-y-3">
		{methods.map((method) => (
			<PaymentMethodCard key={method.id} {...method} />
		))}
	</div>
);

const RecentPayment = ({ method, last4, date }: RecentPaymentProps) => (
	<div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
		<div className="flex items-center gap-3">
			<CreditCard className="size-4 text-muted-foreground" />
			<div>
				<p className="text-sm font-medium">{method} •••• {last4}</p>
				<p className="text-xs text-muted-foreground">Last used {date}</p>
			</div>
		</div>
		<Button variant="outline" size="sm">Use</Button>
	</div>
);

const RecentPayments = ({ payments, title }: { payments: RecentPaymentProps[]; title: string }) => (
	<div className="space-y-3">
		<h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
		{payments.map((payment, index) => (
			<RecentPayment key={index} {...payment} />
		))}
	</div>
);

const CountrySelector = ({ countries, current }: { countries: CountryProps[]; current: string }) => (
	<div className="flex items-center gap-2">
		<Globe2 className="size-4 text-muted-foreground" />
		<select className="bg-transparent text-sm border-none outline-none cursor-pointer font-medium">
			{countries.map((c) => (
				<option key={c.code} value={c.code} selected={c.code === current}>
					{c.flag} {c.name}
				</option>
			))}
		</select>
	</div>
);

const FormField = ({
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
		<Label htmlFor={id} className="text-sm">{label}</Label>
		<div className="relative">
			{Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />}
			<Input id={id} type={type} placeholder={placeholder} className={Icon ? 'pl-10' : ''} />
		</div>
	</div>
);

const AmountDisplay = ({ label, amount, currency }: { label: string; amount: string; currency: string }) => (
	<div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center">
		<p className="text-sm text-muted-foreground mb-1">{label}</p>
		<p className="text-3xl font-bold">{currency}{amount}</p>
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const paymentMethods: PaymentMethodProps[] = [
		{ id: 'card', icon: CreditCard, name: 'Credit / Debit Card', description: 'Visa, Mastercard, Amex' },
		{ id: 'wallet', icon: Wallet, name: 'Digital Wallet', description: 'Apple Pay, Google Pay', badge: 'Fast' },
		{ id: 'bank', icon: Building2, name: 'Bank Transfer', description: 'ACH, Wire transfer' },
		{ id: 'mobile', icon: Smartphone, name: 'Mobile Payment', description: 'Venmo, Cash App' },
	];

	const recentPayments: RecentPaymentProps[] = [
		{ method: 'Visa', last4: '4242', date: 'Jan 15' },
		{ method: 'Mastercard', last4: '8888', date: 'Dec 28' },
	];

	const countries: CountryProps[] = [
		{ code: 'US', name: 'United States', flag: '🇺🇸' },
		{ code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
		{ code: 'CA', name: 'Canada', flag: '🇨🇦' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid gap-8 @lg:grid-cols-2">
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<Title text="Payment" subtitle="Select how you'd like to pay" />
							<CountrySelector countries={countries} current="US" />
						</div>
						<PaymentMethods methods={paymentMethods} />
						<Separator />
						<RecentPayments payments={recentPayments} title="Recent Payment Methods" />
					</div>
					<div>
						<Card className="border-border/50 bg-card/50 backdrop-blur-sm @lg:sticky @lg:top-8">
							<CardHeader className="pb-4">
								<h3 className="font-semibold">Card Details</h3>
							</CardHeader>
							<CardContent className="space-y-4">
								<AmountDisplay label="Amount Due" amount="199.00" currency="$" />
								<Separator />
								<FormField id="number" label="Card Number" placeholder="1234 5678 9012 3456" icon={CreditCard} />
								<FormField id="name" label="Cardholder Name" placeholder="John Doe" />
								<div className="grid grid-cols-2 gap-4">
									<FormField id="exp" label="Expiry" placeholder="MM/YY" />
									<FormField id="cvc" label="CVC" placeholder="123" type="password" />
								</div>
							</CardContent>
							<CardFooter>
								<PayButton label="Pay $199.00" />
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
