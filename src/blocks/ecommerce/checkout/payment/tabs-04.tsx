'use client';

import {
	Bitcoin,
	Building2,
	CreditCard,
	DollarSign,
	Lock,
	Sparkles,
	Wallet,
} from 'lucide-react';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PaymentTabProps {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	fee: string;
	recommended?: boolean;
}

const SectionTitle = ({ text }: { text: string }) => (
	<h1 className="text-2xl font-bold text-center mb-6">{text}</h1>
);

const PaymentTabButton = ({
	value,
	icon: Icon,
	label,
	fee,
	recommended,
}: PaymentTabProps) => (
	<TabsTrigger
		value={value}
		className="relative flex-col h-auto py-4 px-3 gap-2 data-[state=active]:bg-primary/5 data-[state=active]:border-primary border border-transparent rounded-xl"
	>
		{recommended && (
			<Badge className="absolute -top-2 -right-2 text-xs gap-1">
				<Sparkles className="size-2.5" />
				Best
			</Badge>
		)}
		<Icon className="size-6" />
		<span className="text-sm font-medium">{label}</span>
		<span className="text-xs text-muted-foreground">{fee}</span>
	</TabsTrigger>
);

const PaymentTabs = ({
	tabs,
	children,
}: {
	tabs: PaymentTabProps[];
	children: React.ReactNode;
}) => (
	<Tabs defaultValue="card" className="w-full">
		<TabsList className="w-full flex h-auto p-2 bg-muted/50 rounded-2xl gap-2">
			{tabs.map((tab) => (
				<PaymentTabButton key={tab.value} {...tab} />
			))}
		</TabsList>
		<div className="mt-6">{children}</div>
	</Tabs>
);

const FormInput = ({
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

const CardContent_Tab = () => (
	<div className="space-y-4">
		<FormInput
			id="card"
			label="Card Number"
			placeholder="4242 4242 4242 4242"
			icon={CreditCard}
		/>
		<FormInput id="name" label="Name on Card" placeholder="John Doe" />
		<div className="grid grid-cols-2 gap-4">
			<FormInput id="exp" label="Expiry" placeholder="MM/YY" />
			<FormInput id="cvc" label="CVC" placeholder="123" type="password" />
		</div>
	</div>
);

const WalletContent = () => (
	<div className="space-y-4">
		<div className="grid grid-cols-2 gap-3">
			<Button variant="outline" className="h-16 flex-col gap-1">
				<DollarSign className="size-5" />
				<span className="text-xs">Apple Pay</span>
			</Button>
			<Button variant="outline" className="h-16 flex-col gap-1">
				<DollarSign className="size-5" />
				<span className="text-xs">Google Pay</span>
			</Button>
			<Button variant="outline" className="h-16 flex-col gap-1">
				<Wallet className="size-5" />
				<span className="text-xs">PayPal</span>
			</Button>
			<Button variant="outline" className="h-16 flex-col gap-1">
				<Wallet className="size-5" />
				<span className="text-xs">Venmo</span>
			</Button>
		</div>
		<p className="text-sm text-center text-muted-foreground">
			Select a wallet to continue
		</p>
	</div>
);

const BankContent = () => (
	<div className="space-y-4">
		<FormInput
			id="bank"
			label="Bank Name"
			placeholder="Select your bank"
			icon={Building2}
		/>
		<FormInput
			id="account"
			label="Account Number"
			placeholder="Enter account number"
		/>
		<FormInput
			id="routing"
			label="Routing Number"
			placeholder="Enter routing number"
		/>
		<div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
			Bank transfers typically process within 1-3 business days
		</div>
	</div>
);

const CryptoContent = () => (
	<div className="space-y-4">
		<div className="grid grid-cols-2 gap-3">
			<Button
				variant="outline"
				className="h-16 flex-col gap-1 bg-orange-500/5 border-orange-500/20 hover:bg-orange-500/10"
			>
				<Bitcoin className="size-6 text-orange-500" />
				<span className="text-xs">Bitcoin</span>
			</Button>
			<Button
				variant="outline"
				className="h-16 flex-col gap-1 bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10"
			>
				<DollarSign className="size-6 text-blue-500" />
				<span className="text-xs">Ethereum</span>
			</Button>
			<Button variant="outline" className="h-16 flex-col gap-1">
				<DollarSign className="size-5" />
				<span className="text-xs">USDC</span>
			</Button>
			<Button variant="outline" className="h-16 flex-col gap-1">
				<DollarSign className="size-5" />
				<span className="text-xs">USDT</span>
			</Button>
		</div>
		<div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
			<span className="font-medium text-primary">5% discount</span> when paying
			with crypto
		</div>
	</div>
);

const PricingBreakdown = ({
	lines,
}: {
	lines: {
		label: string;
		value: string;
		isTotal?: boolean;
		isDiscount?: boolean;
	}[];
}) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<div
					className={`flex justify-between ${line.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}
				>
					<span
						className={
							line.isDiscount
								? 'text-primary'
								: line.isTotal
									? ''
									: 'text-muted-foreground'
						}
					>
						{line.label}
					</span>
					<span className={line.isDiscount ? 'text-primary' : ''}>
						{line.value}
					</span>
				</div>
			</div>
		))}
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const tabs: PaymentTabProps[] = [
		{ value: 'card', icon: CreditCard, label: 'Card', fee: 'No fee' },
		{
			value: 'wallet',
			icon: Wallet,
			label: 'Wallet',
			fee: 'No fee',
			recommended: true,
		},
		{ value: 'bank', icon: Building2, label: 'Bank', fee: 'No fee' },
		{ value: 'crypto', icon: Bitcoin, label: 'Crypto', fee: '-5%' },
	];

	const priceLines = [
		{ label: 'Subtotal', value: '$399.00' },
		{ label: 'Processing', value: '$0.00' },
		{ label: 'Tax', value: '$31.92' },
		{ label: 'Total', value: '$430.92', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<SectionTitle text="Select Payment" />
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="pt-6">
						<PaymentTabs tabs={tabs}>
							<TabsContent value="card">
								<CardContent_Tab />
							</TabsContent>
							<TabsContent value="wallet">
								<WalletContent />
							</TabsContent>
							<TabsContent value="bank">
								<BankContent />
							</TabsContent>
							<TabsContent value="crypto">
								<CryptoContent />
							</TabsContent>
						</PaymentTabs>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<PricingBreakdown lines={priceLines} />
						<PayButton label="Pay $430.92" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
