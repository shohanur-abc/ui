import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Clock, DollarSign, Package, Percent } from 'lucide-react';

interface StatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	size?: 'sm' | 'lg';
}

const StatCard = ({ icon: Icon, label, value, change, trend, size = 'sm' }: StatProps) => (
	<Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${size === 'lg' ? 'p-8' : 'p-5'}`}>
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className={`rounded-xl bg-primary/10 ${size === 'lg' ? 'p-4' : 'p-2.5'}`}>
					<Icon className={`text-primary ${size === 'lg' ? 'size-6' : 'size-4'}`} />
				</div>
				<Badge variant={trend === 'up' ? 'default' : 'destructive'} className="gap-1">
					{trend === 'up' ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
					{change}
				</Badge>
			</div>
			<div className="space-y-1">
				<p className={`font-bold tracking-tight ${size === 'lg' ? 'text-5xl' : 'text-2xl'}`}>{value}</p>
				<p className={`text-muted-foreground ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>{label}</p>
			</div>
		</div>
	</Card>
);

export default function Main() {
	const stats: StatProps[] = [
		{ icon: DollarSign, label: 'Gross Merchandise Value', value: '$4.8M', change: '+32%', trend: 'up', size: 'lg' },
		{ icon: Package, label: 'Units Sold', value: '124K', change: '+18%', trend: 'up' },
		{ icon: Percent, label: 'Profit Margin', value: '28.4%', change: '+2.1%', trend: 'up' },
		{ icon: Clock, label: 'Avg. Fulfillment', value: '1.8 days', change: '-0.4', trend: 'up' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @md:grid-cols-2 @lg:gap-6 @xl:grid-cols-3">
					<div className="@xl:row-span-2">
						<StatCard {...stats[0]} />
					</div>
					{stats.slice(1).map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
