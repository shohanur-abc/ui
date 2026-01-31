import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DollarSign, TrendingUp, CreditCard, Wallet, ArrowUpRight, ArrowDownRight, Percent, ShoppingBag } from 'lucide-react';

interface RevenueSummaryProps {
	revenue: {
		total: string;
		change: string;
		trend: 'up' | 'down';
	};
	breakdown: {
		label: string;
		value: string;
		percentage: string;
		icon: 'sales' | 'returns' | 'discounts' | 'shipping';
	}[];
	payments: {
		method: string;
		value: string;
		count: number;
	}[];
}

const breakdownIcons = {
	sales: ShoppingBag,
	returns: ArrowDownRight,
	discounts: Percent,
	shipping: ArrowUpRight,
};

const RevenueSummary = ({ revenue, breakdown, payments }: RevenueSummaryProps) => {
	const TrendIcon = revenue.trend === 'up' ? TrendingUp : ArrowDownRight;
	const trendColor = revenue.trend === 'up' ? 'text-accent' : 'text-destructive';

	return (
		<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
			<CardHeader className="pb-4">
				<CardTitle className="text-lg">Revenue Summary</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
					<DollarSign className="size-8 text-primary mx-auto mb-2" />
					<p className="text-4xl font-bold">{revenue.total}</p>
					<div className={`flex items-center justify-center gap-1 mt-2 ${trendColor}`}>
						<TrendIcon className="size-4" />
						<span className="font-medium">{revenue.change}</span>
						<span className="text-muted-foreground">vs last period</span>
					</div>
				</div>

				<div>
					<p className="text-sm font-semibold text-muted-foreground mb-3">Breakdown</p>
					<div className="space-y-3">
						{breakdown.map((item, i) => {
							const Icon = breakdownIcons[item.icon];
							const isNegative = item.icon === 'returns' || item.icon === 'discounts';
							return (
								<div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
									<div className="flex items-center gap-3">
										<Icon className={`size-5 ${isNegative ? 'text-destructive' : 'text-muted-foreground'}`} />
										<span>{item.label}</span>
									</div>
									<div className="text-right">
										<p className={`font-semibold ${isNegative ? 'text-destructive' : ''}`}>
											{isNegative ? '-' : ''}{item.value}
										</p>
										<p className="text-xs text-muted-foreground">{item.percentage}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<Separator />

				<div>
					<p className="text-sm font-semibold text-muted-foreground mb-3">Payment Methods</p>
					<div className="grid grid-cols-2 gap-3">
						{payments.map((payment, i) => (
							<div key={i} className="p-3 rounded-lg bg-muted/20 border border-border/50">
								<div className="flex items-center gap-2 mb-2">
									<CreditCard className="size-4 text-muted-foreground" />
									<span className="text-sm font-medium">{payment.method}</span>
								</div>
								<p className="text-lg font-bold">{payment.value}</p>
								<p className="text-xs text-muted-foreground">{payment.count} transactions</p>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const revenue = { total: '$89,432', change: '+12.5%', trend: 'up' as const };

	const breakdown = [
		{ label: 'Gross Sales', value: '$102,500', percentage: '100%', icon: 'sales' as const },
		{ label: 'Returns', value: '$8,420', percentage: '8.2%', icon: 'returns' as const },
		{ label: 'Discounts', value: '$4,648', percentage: '4.5%', icon: 'discounts' as const },
		{ label: 'Shipping Revenue', value: '$4,500', percentage: '4.4%', icon: 'shipping' as const },
	];

	const payments = [
		{ method: 'Credit Card', value: '$67,200', count: 892 },
		{ method: 'PayPal', value: '$15,800', count: 234 },
		{ method: 'Apple Pay', value: '$4,320', count: 87 },
		{ method: 'Bank Transfer', value: '$2,112', count: 34 },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<RevenueSummary revenue={revenue} breakdown={breakdown} payments={payments} />
			</div>
		</section>
	);
}
