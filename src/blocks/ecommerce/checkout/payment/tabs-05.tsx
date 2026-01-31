'use client';

import { Building2, CheckCircle2, CreditCard, Globe, Lock, Shield, Smartphone, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SavedCardProps {
	id: string;
	brand: string;
	last4: string;
	expiry: string;
	isDefault?: boolean;
}

interface WalletOptionProps {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	connected?: boolean;
}

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="text-center mb-6">
		<Badge variant="outline" className="gap-1.5 mb-4">
			<Shield className="size-3" />
			Secure Checkout
		</Badge>
		<h1 className="text-2xl font-bold">{title}</h1>
		<p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
	</div>
);

const IconTab = ({ value, icon: Icon, label }: { value: string; icon: React.ComponentType<{ className?: string }>; label: string }) => (
	<TabsTrigger value={value} className="flex-col gap-1 h-auto py-3">
		<Icon className="size-5" />
		<span className="text-xs">{label}</span>
	</TabsTrigger>
);

const SavedCard = ({ id, brand, last4, expiry, isDefault }: SavedCardProps) => (
	<Label
		htmlFor={id}
		className="flex items-center gap-4 p-4 rounded-xl border border-border/50 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<RadioGroupItem value={id} id={id} />
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
			<CreditCard className="size-5" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium text-sm">{brand} •••• {last4}</span>
				{isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
			</div>
			<p className="text-xs text-muted-foreground">Expires {expiry}</p>
		</div>
	</Label>
);

const SavedCardsContent = ({ cards }: { cards: SavedCardProps[] }) => (
	<div className="space-y-4">
		<RadioGroup defaultValue={cards.find(c => c.isDefault)?.id} className="space-y-3">
			{cards.map((card) => (
				<SavedCard key={card.id} {...card} />
			))}
		</RadioGroup>
		<Button variant="outline" className="w-full gap-2">
			<CreditCard className="size-4" />
			Add New Card
		</Button>
	</div>
);

const WalletOption = ({ id, name, icon: Icon, connected }: WalletOptionProps) => (
	<Button variant="outline" className="w-full h-14 justify-between">
		<div className="flex items-center gap-3">
			<Icon className="size-5" />
			<span>{name}</span>
		</div>
		{connected ? (
			<Badge variant="secondary" className="gap-1">
				<CheckCircle2 className="size-3" />
				Connected
			</Badge>
		) : (
			<span className="text-xs text-muted-foreground">Connect</span>
		)}
	</Button>
);

const WalletContent = ({ wallets }: { wallets: WalletOptionProps[] }) => (
	<div className="space-y-3">
		{wallets.map((wallet) => (
			<WalletOption key={wallet.id} {...wallet} />
		))}
	</div>
);

const BankContent = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label className="text-sm">Select Bank</Label>
			<div className="grid grid-cols-2 gap-2">
				{['Chase', 'Bank of America', 'Wells Fargo', 'Citibank'].map((bank) => (
					<Button key={bank} variant="outline" className="h-12 text-sm">
						{bank}
					</Button>
				))}
			</div>
		</div>
		<div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
			You'll be redirected to your bank to authorize the payment
		</div>
	</div>
);

const InternationalContent = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label className="text-sm">Country</Label>
			<select className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm">
				<option>United States</option>
				<option>United Kingdom</option>
				<option>Canada</option>
				<option>Germany</option>
				<option>France</option>
			</select>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Currency</Label>
			<select className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm">
				<option>USD - US Dollar</option>
				<option>EUR - Euro</option>
				<option>GBP - British Pound</option>
				<option>CAD - Canadian Dollar</option>
			</select>
		</div>
		<div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
			Exchange rate: 1 USD = 0.92 EUR (updated live)
		</div>
	</div>
);

const CvvInput = () => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-3">
		<Label className="text-sm font-medium">Enter CVV to confirm</Label>
		<div className="flex gap-3">
			<Input type="password" placeholder="•••" className="w-24" />
			<Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
				What's this?
			</Button>
		</div>
	</div>
);

const TotalAmount = ({ amount }: { amount: string }) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
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
	const savedCards: SavedCardProps[] = [
		{ id: 'visa', brand: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
		{ id: 'mc', brand: 'Mastercard', last4: '8888', expiry: '08/25' },
	];

	const wallets: WalletOptionProps[] = [
		{ id: 'apple', name: 'Apple Pay', icon: Smartphone, connected: true },
		{ id: 'google', name: 'Google Pay', icon: Smartphone },
		{ id: 'paypal', name: 'PayPal', icon: Wallet, connected: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<SectionHeader title="Payment" subtitle="Choose your payment method" />
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="pt-6">
						<Tabs defaultValue="cards" className="w-full">
							<TabsList className="w-full grid grid-cols-4 h-auto p-1">
								<IconTab value="cards" icon={CreditCard} label="Cards" />
								<IconTab value="wallets" icon={Wallet} label="Wallets" />
								<IconTab value="bank" icon={Building2} label="Bank" />
								<IconTab value="global" icon={Globe} label="Global" />
							</TabsList>
							<div className="mt-6">
								<TabsContent value="cards">
									<SavedCardsContent cards={savedCards} />
								</TabsContent>
								<TabsContent value="wallets">
									<WalletContent wallets={wallets} />
								</TabsContent>
								<TabsContent value="bank">
									<BankContent />
								</TabsContent>
								<TabsContent value="global">
									<InternationalContent />
								</TabsContent>
							</div>
						</Tabs>
						<Separator className="my-6" />
						<CvvInput />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<TotalAmount amount="$189.99" />
						<PayButton label="Complete Payment" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
