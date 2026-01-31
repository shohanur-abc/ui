'use client';

import { ShoppingBag, CreditCard, Truck, RotateCcw, Check, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

type FunnelStepProps = {
	icon: LucideIcon;
	step: string;
	count: string;
	rate: string;
	dropoff: string;
	iconBg: string;
	iconColor: string;
};

const FunnelStep = ({ icon: Icon, step, count, rate, dropoff, iconBg, iconColor }: FunnelStepProps) => (
	<div className="relative">
		<div className="flex items-center gap-4 rounded-xl border border-border/30 bg-card/60 p-4">
			<div className={`rounded-lg p-2.5 ${iconBg}`}>
				<Icon className={`size-5 ${iconColor}`} />
			</div>
			<div className="flex-1">
				<p className="font-medium">{step}</p>
				<p className="text-2xl font-bold">{count}</p>
			</div>
			<div className="text-right">
				<p className="text-lg font-bold text-primary">{rate}</p>
				<p className="text-xs text-muted-foreground">{dropoff}</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const funnelSteps: FunnelStepProps[] = [
		{
			icon: ShoppingBag,
			step: 'Added to Cart',
			count: '15,420',
			rate: '100%',
			dropoff: 'Entry point',
			iconBg: 'bg-primary/10',
			iconColor: 'text-primary',
		},
		{
			icon: CreditCard,
			step: 'Initiated Checkout',
			count: '8,245',
			rate: '53.5%',
			dropoff: '-46.5% dropoff',
			iconBg: 'bg-violet-500/10',
			iconColor: 'text-violet-500',
		},
		{
			icon: Check,
			step: 'Payment Completed',
			count: '6,892',
			rate: '44.7%',
			dropoff: '-8.8% dropoff',
			iconBg: 'bg-emerald-500/10',
			iconColor: 'text-emerald-500',
		},
		{
			icon: Truck,
			step: 'Order Shipped',
			count: '6,754',
			rate: '43.8%',
			dropoff: '-0.9% cancelled',
			iconBg: 'bg-cyan-500/10',
			iconColor: 'text-cyan-500',
		},
		{
			icon: Check,
			step: 'Delivered',
			count: '6,542',
			rate: '42.4%',
			dropoff: '-1.4% failed',
			iconBg: 'bg-emerald-500/10',
			iconColor: 'text-emerald-500',
		},
		{
			icon: RotateCcw,
			step: 'Returned',
			count: '328',
			rate: '5.0%',
			dropoff: 'of delivered',
			iconBg: 'bg-amber-500/10',
			iconColor: 'text-amber-500',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Order Funnel Report
						</CardTitle>
						<CardDescription>
							Conversion funnel from cart to delivery
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-3 @lg:grid-cols-2 @xl:grid-cols-3">
							{funnelSteps.map((step, i) => (
								<FunnelStep key={i} {...step} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
