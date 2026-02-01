import {
	ArrowRight,
	CheckCircle2,
	CreditCard,
	Globe,
	Lock,
	Wallet,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface CurrencyOptionProps {
	code: string;
	symbol: string;
	name: string;
}

interface PaymentProviderProps {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	fee?: string;
	popular?: boolean;
}

interface BillingFieldProps {
	id: string;
	label: string;
	placeholder: string;
	colSpan?: number;
}

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="space-y-2 text-center">
		<Badge variant="outline" className="gap-1.5">
			<Lock className="size-3" />
			Secure Checkout
		</Badge>
		<h1 className="text-2xl @md:text-3xl font-bold tracking-tight">{title}</h1>
		<p className="text-muted-foreground">{subtitle}</p>
	</div>
);

const CurrencySelector = ({
	currencies,
	current,
}: {
	currencies: CurrencyOptionProps[];
	current: string;
}) => (
	<div className="flex items-center gap-2 justify-center">
		<Globe className="size-4 text-muted-foreground" />
		<select className="bg-transparent text-sm font-medium border-none outline-none cursor-pointer">
			{currencies.map((c) => (
				<option key={c.code} value={c.code} selected={c.code === current}>
					{c.symbol} {c.code}
				</option>
			))}
		</select>
	</div>
);

const PaymentProviderCard = ({
	id,
	name,
	icon: Icon,
	fee,
	popular,
}: PaymentProviderProps) => (
	<Label
		htmlFor={id}
		className="relative flex flex-col items-center gap-3 p-4 rounded-xl border border-border/50 cursor-pointer transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:shadow-md"
	>
		<RadioGroupItem value={id} id={id} className="sr-only" />
		<div className="size-12 rounded-xl bg-muted flex items-center justify-center">
			<Icon className="size-6" />
		</div>
		<div className="text-center">
			<span className="font-medium text-sm">{name}</span>
			{fee && <p className="text-xs text-muted-foreground">{fee}</p>}
		</div>
		{popular && (
			<Badge className="absolute -top-2 -right-2 text-xs">Popular</Badge>
		)}
	</Label>
);

const PaymentProviders = ({
	providers,
}: {
	providers: PaymentProviderProps[];
}) => (
	<RadioGroup
		defaultValue={providers[0]?.id}
		className="grid grid-cols-3 gap-3"
	>
		{providers.map((provider) => (
			<PaymentProviderCard key={provider.id} {...provider} />
		))}
	</RadioGroup>
);

const BillingField = ({
	id,
	label,
	placeholder,
	colSpan,
}: BillingFieldProps) => (
	<div className={`space-y-2 ${colSpan === 2 ? '@sm:col-span-2' : ''}`}>
		<Label htmlFor={id} className="text-sm">
			{label}
		</Label>
		<Input id={id} placeholder={placeholder} />
	</div>
);

const BillingForm = ({ fields }: { fields: BillingFieldProps[] }) => (
	<div className="grid gap-4 @sm:grid-cols-2">
		{fields.map((field) => (
			<BillingField key={field.id} {...field} />
		))}
	</div>
);

const SuccessIndicator = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap gap-3 justify-center">
		{items.map((item, index) => (
			<div
				key={index}
				className="flex items-center gap-1.5 text-xs text-muted-foreground"
			>
				<CheckCircle2 className="size-3.5 text-primary" />
				<span>{item}</span>
			</div>
		))}
	</div>
);

const AmountDisplay = ({
	amount,
	currency,
}: {
	amount: string;
	currency: string;
}) => (
	<div className="text-center p-4 rounded-xl bg-muted/50">
		<p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
		<p className="text-3xl font-bold">
			{currency}
			{amount}
		</p>
	</div>
);

const SubmitButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

export default function Main() {
	const currencies: CurrencyOptionProps[] = [
		{ code: 'USD', symbol: '$', name: 'US Dollar' },
		{ code: 'EUR', symbol: '€', name: 'Euro' },
		{ code: 'GBP', symbol: '£', name: 'British Pound' },
	];

	const providers: PaymentProviderProps[] = [
		{
			id: 'card',
			name: 'Card',
			icon: CreditCard,
			fee: 'No fee',
			popular: true,
		},
		{ id: 'wallet', name: 'Wallet', icon: Wallet, fee: '0.5% fee' },
		{ id: 'crypto', name: 'Crypto', icon: Globe, fee: '1% fee' },
	];

	const billingFields: BillingFieldProps[] = [
		{
			id: 'email',
			label: 'Email',
			placeholder: 'john@example.com',
			colSpan: 2,
		},
		{ id: 'name', label: 'Full Name', placeholder: 'John Doe', colSpan: 2 },
		{ id: 'country', label: 'Country', placeholder: 'United States' },
		{ id: 'zip', label: 'ZIP Code', placeholder: '10001' },
	];

	const trustItems = [
		'Instant confirmation',
		'Money-back guarantee',
		'24/7 Support',
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="space-y-6">
					<PageHeader
						title="International Payment"
						subtitle="Pay securely in your preferred currency"
					/>
					<CurrencySelector currencies={currencies} current="USD" />
					<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
						<CardContent className="pt-6 space-y-6">
							<AmountDisplay amount="299.00" currency="$" />
							<div className="space-y-3">
								<Label className="text-sm font-medium">Payment Method</Label>
								<PaymentProviders providers={providers} />
							</div>
							<Separator />
							<div className="space-y-4">
								<Label className="text-sm font-medium">
									Billing Information
								</Label>
								<BillingForm fields={billingFields} />
							</div>
							<SubmitButton label="Complete Payment" />
							<SuccessIndicator items={trustItems} />
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
