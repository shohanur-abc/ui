import Link from 'next/link';
import { Mail, Lock, ArrowRight, Wallet, CreditCard, Gift, User, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const FormField = ({
	label,
	type,
	placeholder,
	icon: Icon,
	id,
}: {
	label: string;
	type: string;
	placeholder: string;
	icon: React.ElementType;
	id: string;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id}>{label}</Label>
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input id={id} type={type} placeholder={placeholder} className="pl-10" />
		</div>
	</div>
);

const SubmitButton = ({
	label,
	icon: Icon,
}: {
	label: string;
	icon?: React.ElementType;
}) => (
	<Button type="submit" size="lg" className="w-full gap-2 group">
		{label}
		{Icon && (
			<Icon className="size-4 transition-transform group-hover:translate-x-0.5" />
		)}
	</Button>
);

const BalanceDisplay = ({
	label,
	amount,
	icon: Icon,
}: {
	label: string;
	amount: string;
	icon: React.ElementType;
}) => (
	<div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
					<Icon className="size-5 text-primary" />
				</div>
				<div>
					<p className="text-sm text-muted-foreground">{label}</p>
					<p className="text-2xl font-bold">{amount}</p>
				</div>
			</div>
		</div>
	</div>
);

const WalletLogin = () => (
	<div className="space-y-4">
		<BalanceDisplay label="Your Balance" amount="$125.00" icon={Wallet} />
		<form className="space-y-4">
			<FormField id="wallet-email" label="Email" type="email" placeholder="you@example.com" icon={Mail} />
			<FormField id="wallet-password" label="Password" type="password" placeholder="••••••••" icon={Lock} />
			<SubmitButton label="Access Wallet" icon={ArrowRight} />
		</form>
	</div>
);

const GiftCardLogin = () => (
	<form className="space-y-4">
		<div className="p-4 rounded-xl bg-muted/50 border border-border/50 text-center">
			<Gift className="size-10 text-primary mx-auto mb-2" />
			<p className="text-sm text-muted-foreground">
				Enter your gift card details to check balance or redeem
			</p>
		</div>
		<FormField id="card-number" label="Gift Card Number" type="text" placeholder="XXXX-XXXX-XXXX-XXXX" icon={CreditCard} />
		<FormField id="card-pin" label="PIN" type="password" placeholder="••••" icon={Lock} />
		<SubmitButton label="Check Balance" icon={ArrowRight} />
	</form>
);

const AddFunds = () => (
	<form className="space-y-4">
		<FormField id="add-email" label="Email" type="email" placeholder="you@example.com" icon={Mail} />
		<FormField id="add-password" label="Password" type="password" placeholder="••••••••" icon={Lock} />
		<div className="space-y-2">
			<Label>Amount to Add</Label>
			<div className="grid grid-cols-4 gap-2">
				{['$10', '$25', '$50', '$100'].map((amount) => (
					<Button key={amount} type="button" variant="outline" className="w-full">
						{amount}
					</Button>
				))}
			</div>
		</div>
		<SubmitButton label="Add Funds" icon={Plus} />
	</form>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="ShopWallet" icon={Wallet} />
						</div>
						<CardTitle className="text-2xl">Wallet & Gift Cards</CardTitle>
						<CardDescription>Manage your store credit</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="wallet" className="w-full">
							<TabsList className="grid w-full grid-cols-3 mb-6">
								<TabsTrigger value="wallet" className="text-xs @sm:text-sm">
									Wallet
								</TabsTrigger>
								<TabsTrigger value="gift-card" className="text-xs @sm:text-sm">
									Gift Card
								</TabsTrigger>
								<TabsTrigger value="add-funds" className="text-xs @sm:text-sm">
									Add Funds
								</TabsTrigger>
							</TabsList>
							<TabsContent value="wallet">
								<WalletLogin />
							</TabsContent>
							<TabsContent value="gift-card">
								<GiftCardLogin />
							</TabsContent>
							<TabsContent value="add-funds">
								<AddFunds />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
