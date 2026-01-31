'use client';

import { Bitcoin, Building2, Check, CreditCard, Lock, Shield, Smartphone, Wallet, Zap } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface PaymentMethod {
	id: string;
	name: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	badge?: string;
	color: string;
}

const MethodHeader = ({ icon: Icon, name, description, badge, color }: { icon: React.ComponentType<{ className?: string }>; name: string; description: string; badge?: string; color: string }) => (
	<div className="flex items-center gap-3 w-full">
		<div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
			<Icon className="size-5" />
		</div>
		<div className="flex-1 text-left">
			<div className="flex items-center gap-2">
				<span className="font-medium">{name}</span>
				{badge && (
					<Badge variant="secondary" className="text-xs gap-0.5">
						{badge === 'Fast' && <Zap className="size-2.5" />}
						{badge}
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

const CardForm = () => (
	<div className="space-y-4 pt-4">
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
				<Label className="text-sm">Expiry</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">CVV</Label>
				<Input type="password" placeholder="•••" />
			</div>
		</div>
	</div>
);

const WalletContent = () => (
	<div className="space-y-3 pt-4">
		<Button variant="outline" className="w-full h-12 justify-start gap-3">
			<Smartphone className="size-5" />
			Apple Pay
			<Badge variant="secondary" className="ml-auto">Connected</Badge>
		</Button>
		<Button variant="outline" className="w-full h-12 justify-start gap-3">
			<Smartphone className="size-5" />
			Google Pay
			<span className="ml-auto text-xs text-primary">Connect</span>
		</Button>
		<Button variant="outline" className="w-full h-12 justify-start gap-3">
			<Wallet className="size-5" />
			PayPal
			<Badge variant="secondary" className="ml-auto">Connected</Badge>
		</Button>
	</div>
);

const BankContent = () => (
	<div className="space-y-4 pt-4">
		<div className="space-y-2">
			<Label className="text-sm">Bank Name</Label>
			<div className="relative">
				<Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Select your bank" className="pl-10" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Account Number</Label>
			<Input placeholder="••••••••1234" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Routing Number</Label>
			<Input placeholder="•••••1234" />
		</div>
		<div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-600 dark:text-amber-400">
			Processing time: 1-3 business days
		</div>
	</div>
);

const CryptoContent = () => (
	<div className="space-y-4 pt-4">
		<div className="grid grid-cols-2 gap-2">
			<Button variant="outline" className="h-14 flex-col gap-1 bg-orange-500/5 border-orange-500/20 hover:bg-orange-500/10">
				<Bitcoin className="size-5 text-orange-500" />
				<span className="text-xs">Bitcoin</span>
			</Button>
			<Button variant="outline" className="h-14 flex-col gap-1 bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10">
				<Wallet className="size-5 text-blue-500" />
				<span className="text-xs">Ethereum</span>
			</Button>
			<Button variant="outline" className="h-14 flex-col gap-1">
				<Wallet className="size-5" />
				<span className="text-xs">USDC</span>
			</Button>
			<Button variant="outline" className="h-14 flex-col gap-1">
				<Wallet className="size-5" />
				<span className="text-xs">USDT</span>
			</Button>
		</div>
		<div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
			<span className="text-primary font-medium">5% discount</span> when paying with crypto
		</div>
	</div>
);

const TotalDisplay = ({ amount, savings }: { amount: string; savings?: string }) => (
	<div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
		<div className="flex items-center justify-between">
			<div>
				<span className="font-medium">Total</span>
				{savings && <p className="text-xs text-primary">{savings}</p>}
			</div>
			<span className="text-2xl font-bold">{amount}</span>
		</div>
	</div>
);

const SecurityBadges = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>256-bit SSL</span>
		</div>
		<Separator orientation="vertical" className="h-4" />
		<div className="flex items-center gap-1">
			<Lock className="size-3" />
			<span>PCI Compliant</span>
		</div>
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const methods: PaymentMethod[] = [
		{ id: 'card', name: 'Credit/Debit Card', description: 'Visa, Mastercard, Amex', icon: CreditCard, badge: 'Popular', color: 'bg-blue-500/10 text-blue-500' },
		{ id: 'wallet', name: 'Digital Wallet', description: 'Apple Pay, Google Pay, PayPal', icon: Wallet, badge: 'Fast', color: 'bg-purple-500/10 text-purple-500' },
		{ id: 'bank', name: 'Bank Transfer', description: 'Direct from your bank', icon: Building2, color: 'bg-emerald-500/10 text-emerald-500' },
		{ id: 'crypto', name: 'Cryptocurrency', description: 'Bitcoin, Ethereum, USDC', icon: Bitcoin, badge: '-5%', color: 'bg-orange-500/10 text-orange-500' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">Payment Method</h2>
							<Badge variant="outline" className="gap-1">
								<Shield className="size-3" />
								Secure
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<Accordion type="single" collapsible defaultValue="card" className="w-full">
							<AccordionItem value="card">
								<AccordionTrigger className="hover:no-underline">
									<MethodHeader icon={CreditCard} name="Credit/Debit Card" description="Visa, Mastercard, Amex" badge="Popular" color="bg-blue-500/10 text-blue-500" />
								</AccordionTrigger>
								<AccordionContent>
									<CardForm />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="wallet">
								<AccordionTrigger className="hover:no-underline">
									<MethodHeader icon={Wallet} name="Digital Wallet" description="Apple Pay, Google Pay, PayPal" badge="Fast" color="bg-purple-500/10 text-purple-500" />
								</AccordionTrigger>
								<AccordionContent>
									<WalletContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="bank">
								<AccordionTrigger className="hover:no-underline">
									<MethodHeader icon={Building2} name="Bank Transfer" description="Direct from your bank" color="bg-emerald-500/10 text-emerald-500" />
								</AccordionTrigger>
								<AccordionContent>
									<BankContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="crypto">
								<AccordionTrigger className="hover:no-underline">
									<MethodHeader icon={Bitcoin} name="Cryptocurrency" description="Bitcoin, Ethereum, USDC" badge="-5%" color="bg-orange-500/10 text-orange-500" />
								</AccordionTrigger>
								<AccordionContent>
									<CryptoContent />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<TotalDisplay amount="$299.00" />
						<PayButton label="Pay Now" />
						<SecurityBadges />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
