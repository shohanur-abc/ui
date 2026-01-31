'use client';

import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';
import { CreditCard, Wallet, Smartphone, Building2, Gift } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

type PaymentData = {
	method: string;
	amount: number;
	fill: string;
};

type PaymentMethodProps = {
	icon: LucideIcon;
	method: string;
	amount: string;
	percentage: number;
	transactions: string;
};

const PaymentMethod = ({ icon: Icon, method, amount, percentage, transactions }: PaymentMethodProps) => (
	<div className="flex items-start gap-3 rounded-lg border border-border/50 p-3">
		<div className="rounded-lg bg-muted/50 p-2">
			<Icon className="size-4 text-muted-foreground" />
		</div>
		<div className="flex-1 space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">{method}</span>
				<span className="text-sm font-bold">{amount}</span>
			</div>
			<Progress value={percentage} className="h-1.5" />
			<p className="text-xs text-muted-foreground">{transactions} transactions</p>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	creditCard: {
		label: 'Credit Card',
		color: 'oklch(0.7 0.2 280)',
	},
	paypal: {
		label: 'PayPal',
		color: 'oklch(0.72 0.16 200)',
	},
	applePay: {
		label: 'Apple Pay',
		color: 'oklch(0.65 0.2 320)',
	},
	bankTransfer: {
		label: 'Bank Transfer',
		color: 'oklch(0.7 0.18 160)',
	},
	giftCard: {
		label: 'Gift Card',
		color: 'oklch(0.75 0.15 55)',
	},
};

export default function Main() {
	const chartData: PaymentData[] = [
		{ method: 'creditCard', amount: 485000, fill: 'var(--color-creditCard)' },
		{ method: 'paypal', amount: 245000, fill: 'var(--color-paypal)' },
		{ method: 'applePay', amount: 185000, fill: 'var(--color-applePay)' },
		{ method: 'bankTransfer', amount: 125000, fill: 'var(--color-bankTransfer)' },
		{ method: 'giftCard', amount: 60000, fill: 'var(--color-giftCard)' },
	];

	const paymentMethods: PaymentMethodProps[] = [
		{ icon: CreditCard, method: 'Credit Card', amount: '$485K', percentage: 44, transactions: '12,450' },
		{ icon: Wallet, method: 'PayPal', amount: '$245K', percentage: 22, transactions: '6,280' },
		{ icon: Smartphone, method: 'Apple Pay', amount: '$185K', percentage: 17, transactions: '4,720' },
		{ icon: Building2, method: 'Bank Transfer', amount: '$125K', percentage: 11, transactions: '1,850' },
		{ icon: Gift, method: 'Gift Card', amount: '$60K', percentage: 6, transactions: '2,100' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Payment Methods Report
						</CardTitle>
						<CardDescription>
							Distribution of revenue by payment method
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-8 @md:grid-cols-2">
							<ChartContainer config={chartConfig} className="mx-auto aspect-square h-[280px]">
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Pie
										data={chartData}
										dataKey="amount"
										nameKey="method"
										cx="50%"
										cy="50%"
										outerRadius={110}
										strokeWidth={3}
										stroke="var(--background)"
									/>
								</PieChart>
							</ChartContainer>
							<div className="space-y-3">
								{paymentMethods.map((pm, i) => (
									<PaymentMethod key={i} {...pm} />
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
