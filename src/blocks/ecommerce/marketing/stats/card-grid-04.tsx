import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, ShoppingBag, Truck, RotateCcw, type LucideIcon } from 'lucide-react';

interface StatItemProps {
	icon: LucideIcon;
	label: string;
	value: string;
	subvalue: string;
	color: 'primary' | 'accent' | 'chart-3' | 'chart-4';
}

const StatCard = ({ icon: Icon, label, value, subvalue, color }: StatItemProps) => {
	const colorClasses = {
		primary: 'bg-primary/10 text-primary ring-primary/20',
		accent: 'bg-accent/10 text-accent ring-accent/20',
		'chart-3': 'bg-chart-3/10 text-chart-3 ring-chart-3/20',
		'chart-4': 'bg-chart-4/10 text-chart-4 ring-chart-4/20',
	};

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
			<div className="p-6">
				<div className={`mb-4 inline-flex rounded-xl p-3 ring-1 ${colorClasses[color]}`}>
					<Icon className="size-5" />
				</div>
				<p className="text-sm font-medium text-muted-foreground">{label}</p>
				<p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
			</div>
			<Separator />
			<div className="bg-secondary/30 px-6 py-3">
				<p className="text-xs text-muted-foreground">{subvalue}</p>
			</div>
		</Card>
	);
};

export default function Main() {
	const stats: StatItemProps[] = [
		{ icon: CreditCard, label: 'Total Transactions', value: '12,847', subvalue: 'Avg. $156 per transaction', color: 'primary' },
		{ icon: ShoppingBag, label: 'Items Sold', value: '48,294', subvalue: '3.8 items per order avg', color: 'accent' },
		{ icon: Truck, label: 'Deliveries', value: '9,184', subvalue: '98.2% on-time delivery', color: 'chart-3' },
		{ icon: RotateCcw, label: 'Returns', value: '847', subvalue: '6.5% return rate', color: 'chart-4' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
