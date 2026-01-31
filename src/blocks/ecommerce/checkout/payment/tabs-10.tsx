'use client';

import { ArrowRight, Bitcoin, Building2, CreditCard, Globe, HelpCircle, Lock, Percent, Shield, Smartphone, Timer, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ExpressOption {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	label?: string;
}

interface CryptoOption {
	id: string;
	name: string;
	rate: string;
	color: string;
}

const PageTitle = ({ title }: { title: string }) => (
	<div className="flex items-center justify-between mb-6">
		<h2 className="text-xl font-semibold">{title}</h2>
		<Badge variant="outline" className="gap-1">
			<Shield className="size-3" />
			Secure
		</Badge>
	</div>
);

const ExpressPaymentGrid = ({ options }: { options: ExpressOption[] }) => (
	<div className="space-y-3">
		<h3 className="text-sm font-medium">Express Checkout</h3>
		<div className="grid grid-cols-2 gap-2">
			{options.map((option) => (
				<Button key={option.id} variant="outline" className="h-14 gap-2 relative">
					<option.icon className="size-5" />
					<span className="text-sm">{option.name}</span>
					{option.label && (
						<Badge className="absolute -top-2 -right-2 text-xs">{option.label}</Badge>
					)}
				</Button>
			))}
		</div>
	</div>
);

const CardForm = () => (
	<div className="space-y-4">
		<h3 className="text-sm font-medium">Card Details</h3>
		<div className="space-y-3">
			<div className="space-y-2">
				<Label className="text-sm">Card Number</Label>
				<div className="relative">
					<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input placeholder="1234 5678 9012 3456" className="pl-10" />
				</div>
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Name on Card</Label>
				<Input placeholder="JOHN DOE" />
			</div>
			<div className="grid grid-cols-2 gap-3">
				<div className="space-y-2">
					<Label className="text-sm">Expiry Date</Label>
					<Input placeholder="MM/YY" />
				</div>
				<div className="space-y-2">
					<div className="flex items-center gap-1">
						<Label className="text-sm">CVV</Label>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="size-3 text-muted-foreground cursor-help" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">3 digits on back of card</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<Input type="password" placeholder="•••" />
				</div>
			</div>
		</div>
		<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
			<Checkbox id="save-card" />
			<Label htmlFor="save-card" className="text-sm cursor-pointer">Remember this card</Label>
		</div>
	</div>
);

const ExpressTab = ({ options }: { options: ExpressOption[] }) => (
	<div className="space-y-6">
		<ExpressPaymentGrid options={options} />
		<div className="relative">
			<Separator />
			<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
				or pay with card
			</span>
		</div>
		<CardForm />
	</div>
);

const BankList = ({ banks }: { banks: string[] }) => (
	<div className="space-y-4">
		<h3 className="text-sm font-medium">Select Your Bank</h3>
		<div className="grid grid-cols-2 gap-2">
			{banks.map((bank) => (
				<Button key={bank} variant="outline" className="h-12 justify-start gap-2 text-sm">
					<Building2 className="size-4" />
					{bank}
				</Button>
			))}
		</div>
		<div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 text-sm text-muted-foreground">
			<Timer className="size-4" />
			<span>Bank transfers take 1-3 days</span>
		</div>
	</div>
);

const BankTab = () => (
	<BankList banks={['Chase', 'Bank of America', 'Wells Fargo', 'Citibank', 'Capital One', 'US Bank']} />
);

const CryptoGrid = ({ options }: { options: CryptoOption[] }) => (
	<div className="space-y-4">
		<div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
			<Percent className="size-4 text-primary" />
			<span className="text-sm font-medium text-primary">5% discount with crypto!</span>
		</div>
		<div className="grid grid-cols-2 gap-2">
			{options.map((option) => (
				<Button key={option.id} variant="outline" className={`h-16 flex-col gap-1 ${option.color}`}>
					<Bitcoin className="size-5" />
					<span className="text-sm">{option.name}</span>
					<span className="text-xs text-muted-foreground">{option.rate}</span>
				</Button>
			))}
		</div>
	</div>
);

const CryptoTab = () => {
	const cryptoOptions: CryptoOption[] = [
		{ id: 'btc', name: 'Bitcoin', rate: '≈ 0.0043 BTC', color: 'hover:border-orange-500/50' },
		{ id: 'eth', name: 'Ethereum', rate: '≈ 0.065 ETH', color: 'hover:border-blue-500/50' },
		{ id: 'usdc', name: 'USDC', rate: '≈ 189.99 USDC', color: 'hover:border-green-500/50' },
		{ id: 'usdt', name: 'USDT', rate: '≈ 189.99 USDT', color: 'hover:border-teal-500/50' },
	];

	return <CryptoGrid options={cryptoOptions} />;
};

const InternationalTab = () => (
	<div className="space-y-4">
		<div className="space-y-3">
			<div className="space-y-2">
				<Label className="text-sm">Country</Label>
				<select className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm">
					<option>United States</option>
					<option>United Kingdom</option>
					<option>Germany</option>
					<option>France</option>
					<option>Canada</option>
					<option>Australia</option>
				</select>
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Currency</Label>
				<select className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm">
					<option>USD - US Dollar</option>
					<option>EUR - Euro</option>
					<option>GBP - British Pound</option>
					<option>CAD - Canadian Dollar</option>
					<option>AUD - Australian Dollar</option>
				</select>
			</div>
		</div>
		<div className="p-4 rounded-xl bg-muted/30 space-y-2">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Original price</span>
				<span>$199.99 USD</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Exchange rate</span>
				<span>1 USD = 0.92 EUR</span>
			</div>
			<Separator className="my-2" />
			<div className="flex justify-between font-medium">
				<span>Converted amount</span>
				<span>€183.99 EUR</span>
			</div>
		</div>
		<div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-600 dark:text-amber-400">
			<Globe className="size-4" />
			<span>International fees may apply</span>
		</div>
	</div>
);

const OrderTotal = ({ total, savings }: { total: string; savings?: string }) => (
	<div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
		<div className="flex items-center justify-between">
			<div>
				<span className="text-sm text-muted-foreground">Order Total</span>
				{savings && <Badge variant="secondary" className="ml-2 text-xs">{savings}</Badge>}
			</div>
			<span className="text-2xl font-bold">{total}</span>
		</div>
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

export default function Main() {
	const expressOptions: ExpressOption[] = [
		{ id: 'apple', name: 'Apple Pay', icon: Smartphone, label: 'Fast' },
		{ id: 'google', name: 'Google Pay', icon: Smartphone },
		{ id: 'paypal', name: 'PayPal', icon: Wallet },
		{ id: 'shop', name: 'Shop Pay', icon: Wallet },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-0">
						<PageTitle title="Checkout" />
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="express" className="w-full">
							<TabsList className="w-full grid grid-cols-4 h-10 text-xs mb-6">
								<TabsTrigger value="express">Express</TabsTrigger>
								<TabsTrigger value="bank">Bank</TabsTrigger>
								<TabsTrigger value="crypto">Crypto</TabsTrigger>
								<TabsTrigger value="global">Global</TabsTrigger>
							</TabsList>
							<TabsContent value="express">
								<ExpressTab options={expressOptions} />
							</TabsContent>
							<TabsContent value="bank">
								<BankTab />
							</TabsContent>
							<TabsContent value="crypto">
								<CryptoTab />
							</TabsContent>
							<TabsContent value="global">
								<InternationalTab />
							</TabsContent>
						</Tabs>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderTotal total="$199.99" savings="Save 5%" />
						<PayButton label="Complete Purchase" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
