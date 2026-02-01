import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Wallet, Building, Smartphone } from 'lucide-react';

interface PaymentStatProps {
	icon: React.ElementType;
	method: string;
	amount: string;
	transactions: string;
	percentage: number;
}

const PaymentStat = ({
	icon: Icon,
	method,
	amount,
	transactions,
	percentage,
}: PaymentStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center gap-3">
			<div className="rounded-lg bg-primary/10 p-2.5">
				<Icon className="size-5 text-primary" />
			</div>
			<div className="flex-1">
				<p className="font-medium">{method}</p>
				<p className="text-xs text-muted-foreground">
					{transactions} transactions
				</p>
			</div>
			<Badge variant="secondary">{percentage}%</Badge>
		</div>
		<div className="mt-4 space-y-2">
			<div className="flex items-baseline justify-between">
				<span className="text-2xl font-bold">{amount}</span>
			</div>
			<Progress value={percentage} className="h-1.5" />
		</div>
	</Card>
);

export default function Main() {
	const stats: PaymentStatProps[] = [
		{
			icon: CreditCard,
			method: 'Credit Cards',
			amount: '$1.2M',
			transactions: '8,294',
			percentage: 58,
		},
		{
			icon: Wallet,
			method: 'Digital Wallets',
			amount: '$524K',
			transactions: '4,847',
			percentage: 25,
		},
		{
			icon: Building,
			method: 'Bank Transfer',
			amount: '$248K',
			transactions: '847',
			percentage: 12,
		},
		{
			icon: Smartphone,
			method: 'Buy Now Pay Later',
			amount: '$98K',
			transactions: '1,284',
			percentage: 5,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{stats.map((stat, i) => (
						<PaymentStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
