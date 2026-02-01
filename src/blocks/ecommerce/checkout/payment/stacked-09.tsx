import {
	Banknote,
	Building2,
	CreditCard,
	Lock,
	QrCode,
	Smartphone,
	Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface QuickPayOptionProps {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	sublabel: string;
}

interface FormFieldProps {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
}

const HeaderBadge = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="gap-1.5 mb-4">
		<Icon className="size-3" />
		{text}
	</Badge>
);

const PageTitle = ({ text, subtitle }: { text: string; subtitle: string }) => (
	<div className="text-center space-y-2">
		<h1 className="text-2xl @md:text-3xl font-bold tracking-tight">{text}</h1>
		<p className="text-muted-foreground">{subtitle}</p>
	</div>
);

const QuickPayButton = ({
	icon: Icon,
	label,
	sublabel,
}: QuickPayOptionProps) => (
	<Button variant="outline" className="h-auto py-4 flex-col gap-2 flex-1">
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
			<Icon className="size-5" />
		</div>
		<span className="font-medium text-sm">{label}</span>
		<span className="text-xs text-muted-foreground">{sublabel}</span>
	</Button>
);

const QuickPayOptions = ({ options }: { options: QuickPayOptionProps[] }) => (
	<div className="flex gap-3">
		{options.map((option) => (
			<QuickPayButton key={option.id} {...option} />
		))}
	</div>
);

const OrDivider = ({ text }: { text: string }) => (
	<div className="relative">
		<Separator />
		<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
			{text}
		</span>
	</div>
);

const FormInput = ({
	id,
	label,
	placeholder,
	type = 'text',
}: FormFieldProps) => (
	<div className="space-y-2">
		<Label htmlFor={id} className="text-sm">
			{label}
		</Label>
		<Input id={id} type={type} placeholder={placeholder} />
	</div>
);

const CardForm = ({ fields }: { fields: FormFieldProps[] }) => (
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

const QRCodeDisplay = ({ text }: { text: string }) => (
	<div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-muted/30 border border-border/50">
		<div className="size-32 rounded-lg bg-white flex items-center justify-center">
			<QrCode className="size-24 text-foreground" />
		</div>
		<p className="text-sm text-muted-foreground text-center">{text}</p>
	</div>
);

const BankTransferInfo = ({
	banks,
}: {
	banks: { name: string; code: string }[];
}) => (
	<div className="space-y-3">
		<Label className="text-sm">Select Bank</Label>
		<div className="grid grid-cols-2 gap-2">
			{banks.map((bank) => (
				<Button
					key={bank.code}
					variant="outline"
					className="h-12 justify-start gap-3"
				>
					<div className="size-6 rounded bg-muted flex items-center justify-center">
						<Building2 className="size-3.5" />
					</div>
					<span className="text-sm">{bank.name}</span>
				</Button>
			))}
		</div>
	</div>
);

const TotalAmount = ({ label, amount }: { label: string; amount: string }) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
		<span className="font-medium">{label}</span>
		<span className="text-2xl font-bold">{amount}</span>
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const quickPayOptions: QuickPayOptionProps[] = [
		{ id: 'apple', icon: Smartphone, label: 'Apple Pay', sublabel: 'Instant' },
		{
			id: 'google',
			icon: Smartphone,
			label: 'Google Pay',
			sublabel: 'Instant',
		},
		{ id: 'paypal', icon: Banknote, label: 'PayPal', sublabel: '2.9% fee' },
	];

	const cardFields: FormFieldProps[] = [
		{ id: 'number', label: 'Card Number', placeholder: '4242 4242 4242 4242' },
		{ id: 'name', label: 'Name on Card', placeholder: 'John Doe' },
		{ id: 'exp', label: 'Expiry', placeholder: 'MM/YY' },
		{ id: 'cvc', label: 'CVC', placeholder: '123', type: 'password' },
	];

	const banks = [
		{ name: 'Chase', code: 'chase' },
		{ name: 'Bank of America', code: 'boa' },
		{ name: 'Wells Fargo', code: 'wf' },
		{ name: 'Citibank', code: 'citi' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex flex-col items-center">
					<HeaderBadge icon={Zap} text="Express Checkout" />
					<PageTitle
						text="Quick Payment"
						subtitle="Choose your preferred payment method"
					/>
				</div>
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm mt-6">
					<CardContent className="pt-6 space-y-6">
						<QuickPayOptions options={quickPayOptions} />
						<OrDivider text="or pay with card" />
						<CardForm fields={cardFields} />
						<TotalAmount label="Total" amount="$189.00" />
						<PayButton label="Complete Purchase" />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
