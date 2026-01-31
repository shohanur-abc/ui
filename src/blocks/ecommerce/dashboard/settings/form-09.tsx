import { Calendar, Receipt, Sparkles, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

type PlanFeature = {
	text: string;
	included: boolean;
};

type Plan = {
	id: string;
	name: string;
	price: string;
	period: string;
	description: string;
	features: PlanFeature[];
	popular?: boolean;
	current?: boolean;
};

type UsageMetric = {
	label: string;
	used: number;
	limit: number;
	unit: string;
};

type Invoice = {
	id: string;
	date: string;
	amount: string;
	status: 'paid' | 'pending' | 'failed';
};

const PlanCard = ({
	name,
	price,
	period,
	description,
	features,
	popular,
	current,
}: Plan) => (
	<div
		className={`relative flex flex-col rounded-lg border p-6 transition-all hover:border-primary/50 ${
			current ? 'border-primary bg-primary/5' : ''
		} ${popular ? 'ring-2 ring-primary' : ''}`}
	>
		{popular && (
			<Badge className="absolute -top-3 right-4 gap-1 bg-primary">
				<Sparkles className="size-3" />
				Popular
			</Badge>
		)}
		<div className="mb-4">
			<h3 className="text-lg font-semibold">{name}</h3>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<div className="mb-4">
			<span className="text-3xl font-bold">{price}</span>
			<span className="text-muted-foreground">/{period}</span>
		</div>
		<ul className="mb-6 flex-1 space-y-2">
			{features.map((feature) => (
				<li
					key={feature.text}
					className={`flex items-center gap-2 text-sm ${
						feature.included ? '' : 'text-muted-foreground line-through'
					}`}
				>
					<div
						className={`flex size-4 items-center justify-center rounded-full ${
							feature.included ? 'bg-primary/10 text-primary' : 'bg-muted'
						}`}
					>
						{feature.included && <Zap className="size-2.5" />}
					</div>
					{feature.text}
				</li>
			))}
		</ul>
		<Button variant={current ? 'secondary' : 'default'} disabled={current}>
			{current ? 'Current Plan' : 'Upgrade'}
		</Button>
	</div>
);

const UsageBar = ({ label, used, limit, unit }: UsageMetric) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between text-sm">
			<span className="font-medium">{label}</span>
			<span className="text-muted-foreground">
				{used.toLocaleString()} / {limit.toLocaleString()} {unit}
			</span>
		</div>
		<Progress value={(used / limit) * 100} className="h-2" />
	</div>
);

const InvoiceRow = ({ id, date, amount, status }: Invoice) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-3">
			<div className="flex size-8 items-center justify-center rounded-lg bg-muted">
				<Receipt className="size-4 text-muted-foreground" />
			</div>
			<div>
				<p className="text-sm font-medium">{id}</p>
				<p className="text-xs text-muted-foreground">{date}</p>
			</div>
		</div>
		<div className="flex items-center gap-3">
			<span className="font-medium">{amount}</span>
			<Badge
				variant={status === 'paid' ? 'default' : status === 'pending' ? 'secondary' : 'destructive'}
				className={status === 'paid' ? 'bg-emerald-500/10 text-emerald-500 border-0' : ''}
			>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</Badge>
		</div>
	</div>
);

export default function Main() {
	const plans: Plan[] = [
		{
			id: 'starter',
			name: 'Starter',
			price: '$9',
			period: 'month',
			description: 'For small businesses',
			features: [
				{ text: 'Up to 100 products', included: true },
				{ text: '1,000 monthly orders', included: true },
				{ text: 'Basic analytics', included: true },
				{ text: 'Email support', included: true },
				{ text: 'API access', included: false },
				{ text: 'Custom integrations', included: false },
			],
			current: true,
		},
		{
			id: 'pro',
			name: 'Pro',
			price: '$29',
			period: 'month',
			description: 'For growing businesses',
			features: [
				{ text: 'Unlimited products', included: true },
				{ text: '10,000 monthly orders', included: true },
				{ text: 'Advanced analytics', included: true },
				{ text: 'Priority support', included: true },
				{ text: 'API access', included: true },
				{ text: 'Custom integrations', included: false },
			],
			popular: true,
		},
		{
			id: 'enterprise',
			name: 'Enterprise',
			price: '$99',
			period: 'month',
			description: 'For large organizations',
			features: [
				{ text: 'Unlimited everything', included: true },
				{ text: 'Unlimited orders', included: true },
				{ text: 'Custom analytics', included: true },
				{ text: '24/7 support', included: true },
				{ text: 'Full API access', included: true },
				{ text: 'Custom integrations', included: true },
			],
		},
	];

	const usage: UsageMetric[] = [
		{ label: 'Products', used: 67, limit: 100, unit: '' },
		{ label: 'Monthly Orders', used: 842, limit: 1000, unit: '' },
		{ label: 'Storage', used: 2.4, limit: 5, unit: 'GB' },
	];

	const invoices: Invoice[] = [
		{ id: 'INV-2026-001', date: 'Jan 1, 2026', amount: '$9.00', status: 'paid' },
		{ id: 'INV-2025-012', date: 'Dec 1, 2025', amount: '$9.00', status: 'paid' },
		{ id: 'INV-2025-011', date: 'Nov 1, 2025', amount: '$9.00', status: 'paid' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Zap className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Subscription Plans</CardTitle>
									<CardDescription>Choose the plan that fits your needs</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid gap-4 @md:grid-cols-3">
								{plans.map((plan) => (
									<PlanCard key={plan.id} {...plan} />
								))}
							</div>
						</CardContent>
					</Card>

					<div className="grid gap-6 @lg:grid-cols-2">
						<Card>
							<CardHeader className="border-b">
								<CardTitle>Current Usage</CardTitle>
								<CardDescription>Your usage this billing period</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								{usage.map((metric) => (
									<UsageBar key={metric.label} {...metric} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle>Billing History</CardTitle>
										<CardDescription>Recent invoices and payments</CardDescription>
									</div>
									<Button variant="outline" size="sm" className="gap-2">
										<Calendar className="size-4" />
										View All
									</Button>
								</div>
							</CardHeader>
							<CardContent className="divide-y pt-2">
								{invoices.map((invoice) => (
									<InvoiceRow key={invoice.id} {...invoice} />
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
