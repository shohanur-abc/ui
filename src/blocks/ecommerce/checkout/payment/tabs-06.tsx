'use client';

import { Building2, CalendarDays, CreditCard, Lock, PiggyBank, Shield, Smartphone, Star, Timer, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InstallmentPlanProps {
	id: string;
	months: number;
	monthlyAmount: string;
	total: string;
	interest: string;
	popular?: boolean;
}

const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="text-center mb-8">
		<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
		<p className="text-muted-foreground mt-2">{subtitle}</p>
	</div>
);

const InstallmentPlan = ({ id, months, monthlyAmount, total, interest, popular }: InstallmentPlanProps) => (
	<Label
		htmlFor={id}
		className="relative flex flex-col p-4 rounded-xl border border-border/50 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		{popular && (
			<Badge className="absolute -top-2 left-1/2 -translate-x-1/2 gap-1 text-xs">
				<Star className="size-3" />
				Popular
			</Badge>
		)}
		<div className="flex items-center gap-3">
			<RadioGroupItem value={id} id={id} />
			<div className="flex-1">
				<div className="flex items-center justify-between">
					<span className="font-semibold">{months} Months</span>
					<span className="text-lg font-bold">{monthlyAmount}<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
				</div>
				<div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
					<span>Total: {total}</span>
					<span>{interest}</span>
				</div>
			</div>
		</div>
	</Label>
);

const InstallmentContent = ({ plans }: { plans: InstallmentPlanProps[] }) => (
	<div className="space-y-4">
		<div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
			<CalendarDays className="size-4 text-primary" />
			<span className="text-sm">Pay in flexible installments with 0% APR</span>
		</div>
		<RadioGroup defaultValue={plans.find(p => p.popular)?.id || plans[0]?.id} className="space-y-3">
			{plans.map((plan) => (
				<InstallmentPlan key={plan.id} {...plan} />
			))}
		</RadioGroup>
	</div>
);

const FullPaymentContent = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<PiggyBank className="size-4 text-emerald-500" />
			<span className="text-sm text-emerald-600 dark:text-emerald-400">Save 5% by paying in full</span>
		</div>
		<div className="grid gap-4">
			<div className="space-y-2">
				<Label className="text-sm">Card Number</Label>
				<div className="relative">
					<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input placeholder="4242 4242 4242 4242" className="pl-10" />
				</div>
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Name on Card</Label>
				<Input placeholder="John Doe" />
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label className="text-sm">Expiry</Label>
					<Input placeholder="MM/YY" />
				</div>
				<div className="space-y-2">
					<Label className="text-sm">CVC</Label>
					<Input type="password" placeholder="•••" />
				</div>
			</div>
		</div>
	</div>
);

const WalletContent = () => (
	<div className="space-y-4">
		<div className="space-y-3">
			<Button variant="outline" className="w-full h-14 gap-3">
				<Smartphone className="size-5" />
				Apple Pay
				<Badge variant="secondary" className="ml-auto">Instant</Badge>
			</Button>
			<Button variant="outline" className="w-full h-14 gap-3">
				<Smartphone className="size-5" />
				Google Pay
				<Badge variant="secondary" className="ml-auto">Instant</Badge>
			</Button>
			<Button variant="outline" className="w-full h-14 gap-3">
				<Wallet className="size-5" />
				PayPal
			</Button>
		</div>
	</div>
);

const BankContent = () => (
	<div className="space-y-4">
		<div className="p-3 rounded-lg bg-muted/50">
			<div className="flex items-center gap-2 mb-2">
				<Timer className="size-4 text-muted-foreground" />
				<span className="text-sm font-medium">Processing Time</span>
			</div>
			<p className="text-xs text-muted-foreground">1-3 business days for bank transfers</p>
		</div>
		<div className="grid gap-4">
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
			<span>Secure</span>
		</div>
	</div>
);

const OrderSummary = ({ items }: { items: { label: string; value: string; isTotal?: boolean }[] }) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		{items.map((item, index) => (
			<div key={index}>
				{item.isTotal && <Separator className="my-2" />}
				<div className={`flex justify-between ${item.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}>
					<span className={item.isTotal ? '' : 'text-muted-foreground'}>{item.label}</span>
					<span>{item.value}</span>
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
	const installmentPlans: InstallmentPlanProps[] = [
		{ id: '3mo', months: 3, monthlyAmount: '$166.33', total: '$499.00', interest: '0% APR' },
		{ id: '6mo', months: 6, monthlyAmount: '$83.17', total: '$499.00', interest: '0% APR', popular: true },
		{ id: '12mo', months: 12, monthlyAmount: '$44.08', total: '$529.00', interest: '6% APR' },
	];

	const orderItems = [
		{ label: 'Product Total', value: '$499.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$39.92' },
		{ label: 'Order Total', value: '$538.92', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<PageHeader title="Flexible Payment" subtitle="Choose how you'd like to pay" />
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="pt-6">
						<Tabs defaultValue="installment" className="w-full">
							<TabsList className="w-full grid grid-cols-4 h-11 mb-6">
								<TabsTrigger value="installment" className="text-xs @sm:text-sm">Split Pay</TabsTrigger>
								<TabsTrigger value="full" className="text-xs @sm:text-sm">Full</TabsTrigger>
								<TabsTrigger value="wallet" className="text-xs @sm:text-sm">Wallet</TabsTrigger>
								<TabsTrigger value="bank" className="text-xs @sm:text-sm">Bank</TabsTrigger>
							</TabsList>
							<TabsContent value="installment">
								<InstallmentContent plans={installmentPlans} />
							</TabsContent>
							<TabsContent value="full">
								<FullPaymentContent />
							</TabsContent>
							<TabsContent value="wallet">
								<WalletContent />
							</TabsContent>
							<TabsContent value="bank">
								<BankContent />
							</TabsContent>
						</Tabs>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderSummary items={orderItems} />
						<PayButton label="Confirm Payment" />
						<SecurityBadges />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
