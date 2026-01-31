import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';

interface StatItemProps {
	icon: LucideIcon;
	label: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
}

const StatCard = ({ icon: Icon, label, value, change, trend }: StatItemProps) => (
	<Card className="group relative overflow-hidden p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
		<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		<div className="relative flex items-start justify-between">
			<div className="space-y-3">
				<span className="text-sm font-medium text-muted-foreground">{label}</span>
				<p className="text-3xl font-bold tracking-tight">{value}</p>
				<div className="flex items-center gap-1.5">
					{trend === 'up' ? (
						<TrendingUp className="size-4 text-accent" />
					) : (
						<TrendingDown className="size-4 text-destructive" />
					)}
					<span className={trend === 'up' ? 'text-sm font-medium text-accent' : 'text-sm font-medium text-destructive'}>
						{change}
					</span>
				</div>
			</div>
			<div className="rounded-xl bg-primary/10 p-3 transition-colors duration-300 group-hover:bg-primary/15">
				<Icon className="size-5 text-primary" />
			</div>
		</div>
	</Card>
);

export default function Main() {
	const stats: StatItemProps[] = [
		{ icon: TrendingUp, label: 'Total Revenue', value: '$48,294', change: '+12.5%', trend: 'up' },
		{ icon: TrendingUp, label: 'Orders', value: '2,847', change: '+8.2%', trend: 'up' },
		{ icon: TrendingDown, label: 'Returns', value: '142', change: '-3.1%', trend: 'down' },
		{ icon: TrendingUp, label: 'Conversion Rate', value: '3.24%', change: '+0.8%', trend: 'up' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @xl:grid-cols-4">
					{stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
