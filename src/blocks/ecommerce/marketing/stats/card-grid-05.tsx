import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
	Sparkles,
	ChartBar,
	Globe,
	Heart,
	type LucideIcon,
} from 'lucide-react';

interface StatItemProps {
	icon: LucideIcon;
	label: string;
	value: string;
	change: string;
	period: string;
	isPositive: boolean;
}

const StatCard = ({
	icon: Icon,
	label,
	value,
	change,
	period,
	isPositive,
}: StatItemProps) => (
	<Card className="group relative isolate overflow-hidden p-6 transition-all duration-300 hover:border-primary/40">
		<div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/[0.03] to-transparent" />
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Icon className="size-4 text-primary" />
					<span className="text-sm font-medium">{label}</span>
				</div>
				<Badge
					variant={isPositive ? 'default' : 'destructive'}
					className="text-[10px]"
				>
					{change}
				</Badge>
			</div>
			<p className="text-4xl font-bold tracking-tighter">{value}</p>
			<p className="text-xs text-muted-foreground">{period}</p>
		</div>
	</Card>
);

export default function Main() {
	const stats: StatItemProps[] = [
		{
			icon: Sparkles,
			label: 'Revenue',
			value: '$284K',
			change: '+18.2%',
			period: 'vs last quarter',
			isPositive: true,
		},
		{
			icon: ChartBar,
			label: 'Orders',
			value: '12.4K',
			change: '+24.1%',
			period: 'vs last quarter',
			isPositive: true,
		},
		{
			icon: Globe,
			label: 'Visitors',
			value: '847K',
			change: '+42.8%',
			period: 'vs last quarter',
			isPositive: true,
		},
		{
			icon: Heart,
			label: 'Wishlist',
			value: '28.9K',
			change: '-2.4%',
			period: 'vs last quarter',
			isPositive: false,
		},
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
