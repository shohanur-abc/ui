'use client';

import * as React from 'react';
import {
	Package,
	Users,
	Calendar,
	Clock,
	CreditCard,
	RotateCcw,
	Pause,
	Play,
	MoreHorizontal,
	TrendingUp,
	TrendingDown,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

interface SubscriptionProduct {
	id: string;
	name: string;
	sku: string;
	image: string;
	monthlyPrice: number;
	yearlyPrice: number;
	activeSubscribers: number;
	subscribersTrend: number;
	mrr: number;
	mrrTrend: number;
	churnRate: number;
	trialConversion: number;
	billingCycle: 'monthly' | 'quarterly' | 'yearly' | 'custom';
	status: 'active' | 'paused' | 'discontinued';
}

interface SubscriberCountProps {
	count: number;
	trend: number;
}

const SubscriberCount = ({ count, trend }: SubscriberCountProps) => {
	const isPositive = trend >= 0;

	return (
		<div className="text-center">
			<div className="flex items-center justify-center gap-1">
				<Users className="size-4 text-muted-foreground" />
				<span className="text-xl font-bold">{count.toLocaleString()}</span>
			</div>
			<div className={`flex items-center justify-center gap-1 text-xs ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
				{isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
				{isPositive ? '+' : ''}{trend}% this month
			</div>
		</div>
	);
};

interface MRRDisplayProps {
	mrr: number;
	trend: number;
	label: string;
}

const MRRDisplay = ({ mrr, trend, label }: MRRDisplayProps) => {
	const isPositive = trend >= 0;

	return (
		<div className="rounded-lg bg-primary/10 p-3 text-center">
			<div className="text-xs text-muted-foreground">{label}</div>
			<div className="text-xl font-bold text-primary">${mrr.toLocaleString()}</div>
			<div className={`flex items-center justify-center gap-1 text-xs ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
				{isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
				{isPositive ? '+' : ''}{trend}%
			</div>
		</div>
	);
};

interface ChurnRateProps {
	rate: number;
	label: string;
}

const ChurnRate = ({ rate, label }: ChurnRateProps) => {
	const getColor = () => {
		if (rate < 3) return 'text-emerald-500';
		if (rate < 5) return 'text-amber-500';
		return 'text-red-500';
	};

	return (
		<div className="space-y-1 text-center">
			<div className="text-xs text-muted-foreground">{label}</div>
			<div className={`text-lg font-bold ${getColor()}`}>{rate.toFixed(1)}%</div>
			<Progress
				value={100 - rate * 10}
				className={`h-1.5 [&>div]:${rate < 3 ? 'bg-emerald-500' : rate < 5 ? 'bg-amber-500' : 'bg-red-500'}`}
			/>
		</div>
	);
};

interface TrialConversionProps {
	rate: number;
	label: string;
}

const TrialConversion = ({ rate, label }: TrialConversionProps) => {
	const getColor = () => {
		if (rate >= 30) return 'text-emerald-500';
		if (rate >= 20) return 'text-amber-500';
		return 'text-red-500';
	};

	return (
		<div className="space-y-1 text-center">
			<div className="text-xs text-muted-foreground">{label}</div>
			<div className={`text-lg font-bold ${getColor()}`}>{rate.toFixed(1)}%</div>
			<Progress value={rate} className="h-1.5" />
		</div>
	);
};

interface BillingCycleBadgeProps {
	cycle: 'monthly' | 'quarterly' | 'yearly' | 'custom';
	labels: Record<'monthly' | 'quarterly' | 'yearly' | 'custom', string>;
}

const BillingCycleBadge = ({ cycle, labels }: BillingCycleBadgeProps) => (
	<Badge variant="outline" className="gap-1">
		<RotateCcw className="size-3" />
		{labels[cycle]}
	</Badge>
);

interface StatusBadgeProps {
	status: 'active' | 'paused' | 'discontinued';
	labels: Record<'active' | 'paused' | 'discontinued', string>;
}

const StatusBadge = ({ status, labels }: StatusBadgeProps) => {
	const config = {
		active: { variant: 'default' as const, icon: Play },
		paused: { variant: 'secondary' as const, icon: Pause },
		discontinued: { variant: 'outline' as const, icon: Clock },
	};

	const { variant, icon: Icon } = config[status];

	return (
		<Badge variant={variant} className="gap-1">
			<Icon className="size-3" />
			{labels[status]}
		</Badge>
	);
};

interface PricingDisplayProps {
	monthly: number;
	yearly: number;
	labels: { monthly: string; yearly: string; save: string };
}

const PricingDisplay = ({ monthly, yearly, labels }: PricingDisplayProps) => {
	const yearlyMonthly = yearly / 12;
	const savings = Math.round(((monthly - yearlyMonthly) / monthly) * 100);

	return (
		<div className="flex gap-3">
			<div className="rounded-lg border bg-muted/30 p-2 text-center">
				<div className="text-xs text-muted-foreground">{labels.monthly}</div>
				<div className="font-bold">${monthly}/mo</div>
			</div>
			<div className="rounded-lg border bg-primary/5 p-2 text-center">
				<div className="text-xs text-muted-foreground">{labels.yearly}</div>
				<div className="font-bold">${yearly}/yr</div>
				<Badge variant="secondary" className="mt-1 text-xs">
					{labels.save} {savings}%
				</Badge>
			</div>
		</div>
	);
};

interface ProductRowProps {
	product: SubscriptionProduct;
	actions: { label: string; icon: React.ElementType; onClick: (id: string) => void; variant?: 'destructive' }[];
	labels: {
		mrr: string;
		churn: string;
		trialConversion: string;
		billingCycles: Record<'monthly' | 'quarterly' | 'yearly' | 'custom', string>;
		statuses: Record<'active' | 'paused' | 'discontinued', string>;
		pricing: { monthly: string; yearly: string; save: string };
	};
}

const ProductRow = ({ product, actions, labels }: ProductRowProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-4 flex items-start gap-4">
			<div className="size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				{product.image ? (
					<img src={product.image} alt={product.name} className="size-full object-cover" />
				) : (
					<div className="flex size-full items-center justify-center">
						<Package className="size-8 text-muted-foreground" />
					</div>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-start justify-between">
					<div>
						<h3 className="font-semibold">{product.name}</h3>
						<p className="text-sm text-muted-foreground">{product.sku}</p>
					</div>
					<div className="flex items-center gap-2">
						<BillingCycleBadge cycle={product.billingCycle} labels={labels.billingCycles} />
						<StatusBadge status={product.status} labels={labels.statuses} />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon-sm">
									<MoreHorizontal className="size-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{actions.map((action) => (
									<React.Fragment key={action.label}>
										{action.variant === 'destructive' && <DropdownMenuSeparator />}
										<DropdownMenuItem
											onClick={() => action.onClick(product.id)}
											className={action.variant === 'destructive' ? 'text-destructive' : ''}
										>
											<action.icon className="mr-2 size-4" />
											{action.label}
										</DropdownMenuItem>
									</React.Fragment>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</div>

		<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-5">
			<PricingDisplay
				monthly={product.monthlyPrice}
				yearly={product.yearlyPrice}
				labels={labels.pricing}
			/>
			<SubscriberCount count={product.activeSubscribers} trend={product.subscribersTrend} />
			<MRRDisplay mrr={product.mrr} trend={product.mrrTrend} label={labels.mrr} />
			<ChurnRate rate={product.churnRate} label={labels.churn} />
			<TrialConversion rate={product.trialConversion} label={labels.trialConversion} />
		</div>
	</div>
);

export default function Main() {
	const products: SubscriptionProduct[] = [
		{
			id: '1',
			name: 'Premium Plan',
			sku: 'SUB-PRM-001',
			image: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=100&h=100&fit=crop',
			monthlyPrice: 29.99,
			yearlyPrice: 299.99,
			activeSubscribers: 12456,
			subscribersTrend: 8,
			mrr: 373307,
			mrrTrend: 12,
			churnRate: 2.3,
			trialConversion: 34.5,
			billingCycle: 'monthly',
			status: 'active',
		},
		{
			id: '2',
			name: 'Business Plan',
			sku: 'SUB-BUS-002',
			image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
			monthlyPrice: 99.99,
			yearlyPrice: 999.99,
			activeSubscribers: 3456,
			subscribersTrend: 15,
			mrr: 345566,
			mrrTrend: 18,
			churnRate: 1.8,
			trialConversion: 42.1,
			billingCycle: 'monthly',
			status: 'active',
		},
		{
			id: '3',
			name: 'Starter Plan',
			sku: 'SUB-STR-003',
			image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
			monthlyPrice: 9.99,
			yearlyPrice: 99.99,
			activeSubscribers: 8934,
			subscribersTrend: -3,
			mrr: 89251,
			mrrTrend: -5,
			churnRate: 5.6,
			trialConversion: 22.3,
			billingCycle: 'monthly',
			status: 'active',
		},
		{
			id: '4',
			name: 'Legacy Enterprise',
			sku: 'SUB-ENT-004',
			image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
			monthlyPrice: 499.99,
			yearlyPrice: 4999.99,
			activeSubscribers: 234,
			subscribersTrend: -12,
			mrr: 116997,
			mrrTrend: -8,
			churnRate: 3.2,
			trialConversion: 0,
			billingCycle: 'yearly',
			status: 'discontinued',
		},
	];

	const actions = [
		{ label: 'View Subscribers', icon: Users, onClick: (id: string) => console.log('Subscribers', id) },
		{ label: 'Edit Pricing', icon: CreditCard, onClick: (id: string) => console.log('Pricing', id) },
		{ label: 'Pause Plan', icon: Pause, onClick: (id: string) => console.log('Pause', id), variant: 'destructive' as const },
	];

	const labels = {
		mrr: 'MRR',
		churn: 'Churn Rate',
		trialConversion: 'Trial Conv.',
		billingCycles: { monthly: 'Monthly', quarterly: 'Quarterly', yearly: 'Yearly', custom: 'Custom' },
		statuses: { active: 'Active', paused: 'Paused', discontinued: 'Discontinued' },
		pricing: { monthly: 'Monthly', yearly: 'Yearly', save: 'Save' },
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl space-y-4 px-4 py-8 @sm:px-6 @2xl:px-8">
				{products.map((product) => (
					<ProductRow
						key={product.id}
						product={product}
						actions={actions}
						labels={labels}
					/>
				))}
			</div>
		</section>
	);
}
