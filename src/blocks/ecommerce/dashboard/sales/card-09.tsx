'use client';

import { CreditCard, Smartphone, Globe, Building2, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type PaymentMethodData = {
	icon: LucideIcon;
	name: string;
	amount: string;
	percentage: number;
	transactions: number;
};

type PaymentMethodsCardProps = {
	title: string;
	totalAmount: string;
	methods: PaymentMethodData[];
};

const PaymentMethodsCard = ({
	title,
	totalAmount,
	methods,
}: PaymentMethodsCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center justify-between pb-4">
			<CardTitle className="text-base font-semibold">{title}</CardTitle>
			<span className="text-lg font-bold text-primary">{totalAmount}</span>
		</CardHeader>
		<CardContent className="space-y-5">
			{methods.map((method, idx) => (
				<div key={idx} className="space-y-2">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-muted">
								<method.icon className="size-4 text-foreground" />
							</div>
							<div>
								<p className="font-medium">{method.name}</p>
								<p className="text-xs text-muted-foreground">
									{method.transactions.toLocaleString()} transactions
								</p>
							</div>
						</div>
						<div className="text-right">
							<p className="font-semibold">{method.amount}</p>
							<p className="text-xs text-muted-foreground">
								{method.percentage}%
							</p>
						</div>
					</div>
					<Progress value={method.percentage} className="h-1.5" />
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const paymentMethods: PaymentMethodData[] = [
		{
			icon: CreditCard,
			name: 'Credit Card',
			amount: '$68,420',
			percentage: 48,
			transactions: 2847,
		},
		{
			icon: Smartphone,
			name: 'Mobile Payment',
			amount: '$42,150',
			percentage: 30,
			transactions: 1856,
		},
		{
			icon: Building2,
			name: 'Bank Transfer',
			amount: '$21,340',
			percentage: 15,
			transactions: 542,
		},
		{
			icon: Globe,
			name: 'PayPal',
			amount: '$9,940',
			percentage: 7,
			transactions: 421,
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="max-w-xl mx-auto">
					<PaymentMethodsCard
						title="Payment Methods"
						totalAmount="$141,850"
						methods={paymentMethods}
					/>
				</div>
			</div>
		</section>
	);
}
