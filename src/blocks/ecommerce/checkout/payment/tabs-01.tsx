'use client';

import { Building2, CreditCard, Lock, Smartphone, Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabConfig {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}

interface FormFieldProps {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	icon?: React.ComponentType<{ className?: string }>;
}

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="text-center space-y-2 mb-6">
		<h1 className="text-2xl @md:text-3xl font-bold tracking-tight">{title}</h1>
		<p className="text-muted-foreground">{subtitle}</p>
	</div>
);

const PaymentTabs = ({
	tabs,
	children,
}: {
	tabs: TabConfig[];
	children: React.ReactNode;
}) => (
	<Tabs defaultValue={tabs[0]?.value} className="w-full">
		<TabsList className="w-full grid grid-cols-4 h-12 mb-6">
			{tabs.map((tab) => (
				<TabsTrigger
					key={tab.value}
					value={tab.value}
					className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
				>
					<tab.icon className="size-4" />
					<span className="hidden @sm:inline">{tab.label}</span>
				</TabsTrigger>
			))}
		</TabsList>
		{children}
	</Tabs>
);

const FormField = ({
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

const CardForm = () => (
	<div className="space-y-4">
		<FormField
			id="card-number"
			label="Card Number"
			placeholder="1234 5678 9012 3456"
			icon={CreditCard}
		/>
		<FormField id="card-name" label="Cardholder Name" placeholder="John Doe" />
		<div className="grid grid-cols-2 gap-4">
			<FormField id="card-exp" label="Expiry Date" placeholder="MM/YY" />
			<FormField id="card-cvc" label="CVC" placeholder="123" type="password" />
		</div>
	</div>
);

const WalletOptions = () => (
	<div className="space-y-4">
		<Button
			variant="outline"
			className="w-full h-14 justify-center gap-3 text-base"
		>
			<Smartphone className="size-5" />
			Pay with Apple Pay
		</Button>
		<Button
			variant="outline"
			className="w-full h-14 justify-center gap-3 text-base"
		>
			<Smartphone className="size-5" />
			Pay with Google Pay
		</Button>
		<p className="text-sm text-center text-muted-foreground">
			You'll be redirected to complete payment
		</p>
	</div>
);

const BankForm = () => (
	<div className="space-y-4">
		<FormField
			id="bank-name"
			label="Bank Name"
			placeholder="Select your bank"
			icon={Building2}
		/>
		<FormField
			id="account-number"
			label="Account Number"
			placeholder="••••••••1234"
		/>
		<FormField id="routing" label="Routing Number" placeholder="•••••1234" />
		<p className="text-sm text-muted-foreground">
			Transfer will be initiated within 1-2 business days
		</p>
	</div>
);

const CryptoOptions = () => (
	<div className="space-y-4">
		<div className="grid grid-cols-2 gap-3">
			{['Bitcoin', 'Ethereum', 'USDC', 'USDT'].map((crypto) => (
				<Button key={crypto} variant="outline" className="h-14">
					{crypto}
				</Button>
			))}
		</div>
		<p className="text-sm text-center text-muted-foreground">
			Select a cryptocurrency to see payment address
		</p>
	</div>
);

const TotalDisplay = ({ amount }: { amount: string }) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
		<span className="font-medium">Total</span>
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
	const tabs: TabConfig[] = [
		{ value: 'card', icon: CreditCard, label: 'Card' },
		{ value: 'wallet', icon: Wallet, label: 'Wallet' },
		{ value: 'bank', icon: Building2, label: 'Bank' },
		{ value: 'crypto', icon: Smartphone, label: 'Crypto' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<PageHeader
					title="Choose Payment"
					subtitle="Select your preferred payment method"
				/>
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="pt-6">
						<PaymentTabs tabs={tabs}>
							<TabsContent value="card">
								<CardForm />
							</TabsContent>
							<TabsContent value="wallet">
								<WalletOptions />
							</TabsContent>
							<TabsContent value="bank">
								<BankForm />
							</TabsContent>
							<TabsContent value="crypto">
								<CryptoOptions />
							</TabsContent>
						</PaymentTabs>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<TotalDisplay amount="$299.00" />
						<PayButton label="Complete Payment" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
