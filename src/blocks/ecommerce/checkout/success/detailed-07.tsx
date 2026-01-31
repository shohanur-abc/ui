import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	CreditCard,
	Calendar,
	Package,
	Repeat,
	Settings,
	Bell,
	ArrowRight,
	Pause,
	XCircle,
	Clock,
	Percent,
} from 'lucide-react';
import Link from 'next/link';

interface SubscriptionProps {
	name: string;
	plan: string;
	price: number;
	currency: string;
	interval: string;
	features: string[];
}

interface BillingProps {
	method: string;
	last4: string;
	nextBilling: string;
	amount: number;
	currency: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({
	confirmationNumber,
	startDate,
}: {
	confirmationNumber: string;
	startDate: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="size-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
			<CheckCircle className="size-7 text-emerald-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-3xl font-bold">
				Subscription Activated
			</h1>
			<p className="text-muted-foreground">
				#{confirmationNumber} • Started {startDate}
			</p>
		</div>
	</div>
);

const PlanCard = ({
	name,
	plan,
	price,
	currency,
	interval,
	features,
}: SubscriptionProps) => (
	<Card className="overflow-hidden">
		<div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white">
			<div className="flex items-center justify-between">
				<div>
					<Badge className="bg-white/20 hover:bg-white/30 text-white mb-2">
						{plan}
					</Badge>
					<h2 className="text-2xl font-bold">{name}</h2>
				</div>
				<div className="text-right">
					<div className="text-4xl font-bold">
						{currency}
						{price}
					</div>
					<p className="text-sm opacity-80">per {interval}</p>
				</div>
			</div>
		</div>
		<CardContent className="pt-6">
			<p className="text-sm font-medium text-muted-foreground mb-4">
				Plan Includes:
			</p>
			<ul className="space-y-3">
				{features.map((feature, i) => (
					<li key={i} className="flex items-center gap-3">
						<CheckCircle className="size-5 text-emerald-500 shrink-0" />
						<span>{feature}</span>
					</li>
				))}
			</ul>
		</CardContent>
	</Card>
);

const BillingCard = ({
	method,
	last4,
	nextBilling,
	amount,
	currency,
}: BillingProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<CreditCard className="size-4" />
				Billing Information
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Payment Method</span>
				<div className="flex items-center gap-2">
					<CreditCard className="size-4" />
					<span className="font-medium">
						{method} •••• {last4}
					</span>
				</div>
			</div>
			<Separator />
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Next Billing</span>
				<span className="font-medium">{nextBilling}</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Amount</span>
				<span className="font-medium">
					{currency}
					{amount.toFixed(2)}
				</span>
			</div>
			<Button variant="outline" className="w-full gap-2">
				<Settings className="size-4" />
				Manage Payment Method
			</Button>
		</CardContent>
	</Card>
);

const BillingHistoryCard = ({
	invoices,
	currency,
}: {
	invoices: { date: string; amount: number; status: string }[];
	currency: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Calendar className="size-4" />
				Billing History
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{invoices.map((invoice, i) => (
				<div key={i} className="flex items-center justify-between text-sm">
					<div>
						<p className="font-medium">{invoice.date}</p>
						<p className="text-muted-foreground">
							{currency}
							{invoice.amount.toFixed(2)}
						</p>
					</div>
					<Badge
						variant={invoice.status === 'Paid' ? 'secondary' : 'outline'}
						className={invoice.status === 'Paid' ? 'text-emerald-600' : ''}
					>
						{invoice.status}
					</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

const UpcomingDeliveryCard = ({
	deliveries,
}: {
	deliveries: { date: string; items: string[] }[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Package className="size-4" />
				Upcoming Deliveries
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{deliveries.map((delivery, i) => (
				<div key={i} className="p-3 rounded-lg bg-muted/50">
					<div className="flex items-center gap-2 mb-2">
						<Calendar className="size-4 text-muted-foreground" />
						<span className="font-medium text-sm">{delivery.date}</span>
					</div>
					<ul className="space-y-1">
						{delivery.items.map((item, j) => (
							<li key={j} className="text-sm text-muted-foreground">
								• {item}
							</li>
						))}
					</ul>
				</div>
			))}
		</CardContent>
	</Card>
);

const SubscriptionControlsCard = () => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Settings className="size-4" />
				Subscription Controls
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<Button variant="outline" className="w-full justify-start gap-2">
				<Repeat className="size-4" />
				Change Frequency
			</Button>
			<Button variant="outline" className="w-full justify-start gap-2">
				<Package className="size-4" />
				Modify Products
			</Button>
			<Button variant="outline" className="w-full justify-start gap-2">
				<Pause className="size-4" />
				Pause Subscription
			</Button>
			<Button
				variant="outline"
				className="w-full justify-start gap-2 text-destructive hover:text-destructive"
			>
				<XCircle className="size-4" />
				Cancel Subscription
			</Button>
		</CardContent>
	</Card>
);

const SavingsCard = ({
	monthlysSavings,
	annualSavings,
	currency,
}: {
	monthlysSavings: number;
	annualSavings: number;
	currency: string;
}) => (
	<Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
		<CardContent className="pt-6">
			<div className="flex items-center gap-3 mb-4">
				<Percent className="size-6 text-emerald-500" />
				<span className="font-semibold">Your Subscription Savings</span>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="p-3 rounded-lg bg-white dark:bg-slate-900/50">
					<p className="text-sm text-muted-foreground">Monthly</p>
					<p className="text-xl font-bold text-emerald-600">
						{currency}
						{monthlysSavings.toFixed(2)}
					</p>
				</div>
				<div className="p-3 rounded-lg bg-white dark:bg-slate-900/50">
					<p className="text-sm text-muted-foreground">Annual</p>
					<p className="text-xl font-bold text-emerald-600">
						{currency}
						{annualSavings.toFixed(2)}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const NotificationsCard = () => (
	<Card className="bg-muted/30">
		<CardContent className="pt-6">
			<div className="flex items-center gap-3">
				<Bell className="size-5 text-muted-foreground" />
				<div className="flex-1">
					<p className="font-medium text-sm">Delivery Reminders</p>
					<p className="text-xs text-muted-foreground">
						Get notified before each delivery
					</p>
				</div>
				<Button variant="outline" size="sm">
					Manage
				</Button>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const subscriptionFeatures = [
		'Monthly curated product selection',
		'Free shipping on all deliveries',
		'15% discount on all products',
		'Early access to new releases',
		'Exclusive member-only products',
		'Cancel anytime with no fees',
	];

	const invoices = [
		{ date: 'Jan 15, 2024', amount: 49.99, status: 'Paid' },
		{ date: 'Dec 15, 2023', amount: 49.99, status: 'Paid' },
		{ date: 'Nov 15, 2023', amount: 49.99, status: 'Paid' },
	];

	const upcomingDeliveries = [
		{
			date: 'February 15, 2024',
			items: ['Premium Blend Coffee (12oz)', 'Organic Tea Selection', 'Artisan Chocolate Bar'],
		},
		{
			date: 'March 15, 2024',
			items: ['Single Origin Coffee', 'Herbal Tea Mix', 'Specialty Snacks'],
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader
					confirmationNumber="SUB-2024-78432"
					startDate="January 15, 2024"
				/>

				<PlanCard
					name="Premium Coffee Club"
					plan="Monthly"
					price={49.99}
					currency="$"
					interval="month"
					features={subscriptionFeatures}
				/>

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2 space-y-6">
						<SavingsCard
							monthlysSavings={15.50}
							annualSavings={186.00}
							currency="$"
						/>
						<UpcomingDeliveryCard deliveries={upcomingDeliveries} />
					</div>
					<div className="space-y-6">
						<BillingCard
							method="Visa"
							last4="4242"
							nextBilling="February 15, 2024"
							amount={49.99}
							currency="$"
						/>
						<SubscriptionControlsCard />
						<BillingHistoryCard invoices={invoices} currency="$" />
						<NotificationsCard />
					</div>
				</div>

				<CTA
					items={[
						{ label: 'Manage Subscription', href: '/subscriptions', icon: ArrowRight },
						{ label: 'Shop Add-ons', href: '/shop', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
