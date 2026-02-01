import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CreditCard,
	Wallet,
	Landmark,
	Smartphone,
	DollarSign,
	TrendingUp,
	ArrowUpRight,
} from 'lucide-react';

interface PaymentMethodCard {
	method: string;
	icon: React.ComponentType<{ className?: string }>;
	orders: number;
	revenue: string;
	percentage: number;
	avgOrderValue: string;
	growth: string;
	growthType: 'positive' | 'negative';
}

interface PaymentGridCardProps {
	payment: PaymentMethodCard;
	labels: { orders: string; revenue: string; avg: string; share: string };
}

const PaymentGridCard = ({ payment, labels }: PaymentGridCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-md transition-all group">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-3">
					<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
						<payment.icon className="size-6 text-primary" />
					</div>
					<div>
						<p className="font-semibold">{payment.method}</p>
						<p className="text-xs text-muted-foreground">
							{payment.orders} {labels.orders}
						</p>
					</div>
				</div>
				<Badge
					variant="outline"
					className={
						payment.growthType === 'positive'
							? 'text-accent border-accent/30'
							: 'text-destructive border-destructive/30'
					}
				>
					{payment.growth}
				</Badge>
			</div>

			<div className="relative h-2 bg-muted/50 rounded-full overflow-hidden mb-4">
				<div
					className="absolute inset-y-0 left-0 bg-primary rounded-full"
					style={{ width: `${payment.percentage}%` }}
				/>
			</div>
			<div className="flex items-center justify-between text-sm mb-4">
				<span className="text-muted-foreground">{labels.share}</span>
				<span className="font-semibold">{payment.percentage}%</span>
			</div>

			<Separator className="mb-4" />

			<div className="grid grid-cols-2 gap-3">
				<div>
					<p className="text-xs text-muted-foreground mb-1">{labels.revenue}</p>
					<p className="text-lg font-bold text-accent">{payment.revenue}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground mb-1">{labels.avg}</p>
					<p className="text-lg font-bold">{payment.avgOrderValue}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const labels = {
		orders: 'orders',
		revenue: 'Revenue',
		avg: 'Avg Order',
		share: 'Share',
	};

	const payments: PaymentMethodCard[] = [
		{
			method: 'Credit Card',
			icon: CreditCard,
			orders: 856,
			revenue: '$68,450',
			percentage: 65,
			avgOrderValue: '$79.96',
			growth: '+12%',
			growthType: 'positive',
		},
		{
			method: 'PayPal',
			icon: Wallet,
			orders: 234,
			revenue: '$18,720',
			percentage: 18,
			avgOrderValue: '$80.00',
			growth: '+8%',
			growthType: 'positive',
		},
		{
			method: 'Bank Transfer',
			icon: Landmark,
			orders: 145,
			revenue: '$14,500',
			percentage: 11,
			avgOrderValue: '$100.00',
			growth: '-3%',
			growthType: 'negative',
		},
		{
			method: 'Apple Pay',
			icon: Smartphone,
			orders: 78,
			revenue: '$6,240',
			percentage: 6,
			avgOrderValue: '$80.00',
			growth: '+25%',
			growthType: 'positive',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					{payments.map((payment, i) => (
						<PaymentGridCard key={i} payment={payment} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
