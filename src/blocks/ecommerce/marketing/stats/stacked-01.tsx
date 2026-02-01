import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { DollarSign, ShoppingCart, Users, Eye } from 'lucide-react';

interface StatItemProps {
	icon: LucideIcon;
	label: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
}

const StatItem = ({
	icon: Icon,
	label,
	value,
	change,
	trend,
}: StatItemProps) => (
	<div className="group flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-secondary/50">
		<div className="rounded-lg bg-primary/10 p-2.5">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="text-xl font-bold">{value}</p>
		</div>
		<Badge
			variant={trend === 'up' ? 'default' : 'destructive'}
			className="gap-1"
		>
			{trend === 'up' ? (
				<TrendingUp className="size-3" />
			) : (
				<TrendingDown className="size-3" />
			)}
			{change}
		</Badge>
	</div>
);

export default function Main() {
	const stats: StatItemProps[] = [
		{
			icon: DollarSign,
			label: 'Revenue',
			value: '$124,847',
			change: '+18.2%',
			trend: 'up',
		},
		{
			icon: ShoppingCart,
			label: 'Orders',
			value: '8,492',
			change: '+12.4%',
			trend: 'up',
		},
		{
			icon: Users,
			label: 'Customers',
			value: '24,847',
			change: '+8.7%',
			trend: 'up',
		},
		{
			icon: Eye,
			label: 'Page Views',
			value: '847K',
			change: '-2.1%',
			trend: 'down',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="divide-y divide-border p-2">
					{stats.map((stat, i) => (
						<StatItem key={i} {...stat} />
					))}
				</Card>
			</div>
		</section>
	);
}
