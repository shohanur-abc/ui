'use client';

import { ArrowRight, Building2, CreditCard, Globe, Lock, QrCode, Shield, Smartphone } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabItemProps {
	value: string;
	label: string;
	badge?: string;
}

interface FormInputProps {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	colSpan?: number;
}

const SecureBadge = () => (
	<Badge variant="outline" className="gap-1.5">
		<Shield className="size-3" />
		Secure
	</Badge>
);

const VerticalTabs = ({ tabs, children }: { tabs: TabItemProps[]; children: React.ReactNode }) => (
	<Tabs defaultValue={tabs[0]?.value} className="flex gap-6" orientation="vertical">
		<TabsList className="flex-col h-auto bg-transparent gap-1 w-48 shrink-0">
			{tabs.map((tab) => (
				<TabsTrigger
					key={tab.value}
					value={tab.value}
					className="w-full justify-start gap-2 px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
				>
					{tab.label}
					{tab.badge && <Badge variant="secondary" className="ml-auto text-xs">{tab.badge}</Badge>}
				</TabsTrigger>
			))}
		</TabsList>
		<div className="flex-1">{children}</div>
	</Tabs>
);

const FormInput = ({ id, label, placeholder, type = 'text', colSpan }: FormInputProps) => (
	<div className={`space-y-2 ${colSpan === 2 ? 'col-span-2' : ''}`}>
		<Label htmlFor={id} className="text-sm">{label}</Label>
		<Input id={id} type={type} placeholder={placeholder} />
	</div>
);

const CardPaymentContent = () => (
	<div className="space-y-4">
		<h3 className="font-semibold">Credit or Debit Card</h3>
		<p className="text-sm text-muted-foreground">Pay securely with your card</p>
		<div className="grid gap-4 grid-cols-2">
			<FormInput id="card-num" label="Card Number" placeholder="1234 5678 9012 3456" colSpan={2} />
			<FormInput id="holder" label="Cardholder" placeholder="John Doe" colSpan={2} />
			<FormInput id="exp" label="Expiry" placeholder="MM/YY" />
			<FormInput id="cvv" label="CVV" placeholder="123" type="password" />
		</div>
	</div>
);

const WalletPaymentContent = () => (
	<div className="space-y-4">
		<h3 className="font-semibold">Digital Wallet</h3>
		<p className="text-sm text-muted-foreground">Quick checkout with your wallet</p>
		<div className="space-y-3">
			<Button variant="outline" className="w-full h-14 gap-3">
				<Smartphone className="size-5" />
				Apple Pay
			</Button>
			<Button variant="outline" className="w-full h-14 gap-3">
				<Smartphone className="size-5" />
				Google Pay
			</Button>
			<Button variant="outline" className="w-full h-14 gap-3">
				<Globe className="size-5" />
				PayPal
			</Button>
		</div>
	</div>
);

const BankPaymentContent = () => (
	<div className="space-y-4">
		<h3 className="font-semibold">Bank Transfer</h3>
		<p className="text-sm text-muted-foreground">Pay directly from your bank account</p>
		<div className="grid gap-4">
			<FormInput id="bank" label="Bank Name" placeholder="Select your bank" />
			<FormInput id="acc" label="Account Number" placeholder="Your account number" />
		</div>
		<div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-600 dark:text-amber-400">
			Bank transfers may take 1-3 business days to process
		</div>
	</div>
);

const QRPaymentContent = () => (
	<div className="space-y-4">
		<h3 className="font-semibold">QR Code Payment</h3>
		<p className="text-sm text-muted-foreground">Scan with your banking app</p>
		<div className="flex justify-center p-8">
			<div className="size-48 bg-white rounded-xl flex items-center justify-center">
				<QrCode className="size-40 text-foreground" />
			</div>
		</div>
		<p className="text-sm text-center text-muted-foreground">
			Open your banking app and scan this QR code
		</p>
	</div>
);

const PriceSummary = ({ subtotal, fee, total }: { subtotal: string; fee: string; total: string }) => (
	<div className="space-y-2 p-4 rounded-xl bg-muted/50">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>{subtotal}</span>
		</div>
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Processing Fee</span>
			<span>{fee}</span>
		</div>
		<Separator className="my-2" />
		<div className="flex justify-between font-semibold text-lg">
			<span>Total</span>
			<span>{total}</span>
		</div>
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

export default function Main() {
	const tabs: TabItemProps[] = [
		{ value: 'card', label: 'Card' },
		{ value: 'wallet', label: 'Wallet', badge: 'Fast' },
		{ value: 'bank', label: 'Bank' },
		{ value: 'qr', label: 'QR Code' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="flex-row items-center justify-between">
						<div>
							<h2 className="text-xl font-semibold">Payment Method</h2>
							<p className="text-sm text-muted-foreground">Choose how to pay</p>
						</div>
						<SecureBadge />
					</CardHeader>
					<CardContent>
						<VerticalTabs tabs={tabs}>
							<TabsContent value="card" className="mt-0">
								<CardPaymentContent />
							</TabsContent>
							<TabsContent value="wallet" className="mt-0">
								<WalletPaymentContent />
							</TabsContent>
							<TabsContent value="bank" className="mt-0">
								<BankPaymentContent />
							</TabsContent>
							<TabsContent value="qr" className="mt-0">
								<QRPaymentContent />
							</TabsContent>
						</VerticalTabs>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<PriceSummary subtotal="$199.00" fee="$0.00" total="$199.00" />
						<PayButton label="Pay Now" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
