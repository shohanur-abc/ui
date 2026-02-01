import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';
import { DollarSign, ShoppingBag, Users, Repeat } from 'lucide-react';

interface StatItemProps {
	icon: LucideIcon;
	label: string;
	value: string;
	change: number;
	period: string;
}

const StatItem = ({
	icon: Icon,
	label,
	value,
	change,
	period,
}: StatItemProps) => {
	const isPositive = change >= 0;

	return (
		<div className="group flex items-center justify-between p-5 transition-colors hover:bg-secondary/30">
			<div className="flex items-center gap-4">
				<div className="rounded-lg bg-primary/10 p-2.5">
					<Icon className="size-5 text-primary" />
				</div>
				<div>
					<p className="font-medium">{label}</p>
					<p className="text-xs text-muted-foreground">{period}</p>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<p className="text-xl font-bold">{value}</p>
				<Badge
					variant={isPositive ? 'default' : 'destructive'}
					className="gap-0.5"
				>
					{isPositive ? (
						<ArrowUpRight className="size-3" />
					) : (
						<ArrowDownRight className="size-3" />
					)}
					{Math.abs(change)}%
				</Badge>
			</div>
		</div>
	);
};

export default function Main() {
	const stats: StatItemProps[] = [
		{
			icon: DollarSign,
			label: 'Total Revenue',
			value: '$284,847',
			change: 24.5,
			period: 'Last 30 days',
		},
		{
			icon: ShoppingBag,
			label: 'Total Orders',
			value: '12,847',
			change: 18.2,
			period: 'Last 30 days',
		},
		{
			icon: Users,
			label: 'New Customers',
			value: '4,284',
			change: -2.4,
			period: 'Last 30 days',
		},
		{
			icon: Repeat,
			label: 'Repeat Purchases',
			value: '68.4%',
			change: 8.7,
			period: 'Last 30 days',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="divide-y divide-border overflow-hidden">
					{stats.map((stat, i) => (
						<StatItem key={i} {...stat} />
					))}
				</Card>
			</div>
		</section>
	);
}
