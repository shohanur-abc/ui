import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
	ShoppingCart,
	Users,
	DollarSign,
	Package,
	ArrowUpRight,
	type LucideIcon,
} from 'lucide-react';

interface StatItemProps {
	icon: LucideIcon;
	label: string;
	value: string;
	subtitle: string;
	badge?: string;
}

const StatCard = ({
	icon: Icon,
	label,
	value,
	subtitle,
	badge,
}: StatItemProps) => (
	<Card className="group relative overflow-hidden p-5 transition-all duration-300 hover:border-primary/30">
		<div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />
		<div className="relative space-y-4">
			<div className="flex items-center justify-between">
				<div className="rounded-lg bg-secondary p-2.5">
					<Icon className="size-4 text-primary" />
				</div>
				{badge && (
					<Badge variant="secondary" className="gap-1 text-xs">
						<ArrowUpRight className="size-3" />
						{badge}
					</Badge>
				)}
			</div>
			<div className="space-y-1">
				<p className="text-2xl font-bold tracking-tight @sm:text-3xl">
					{value}
				</p>
				<p className="text-sm font-medium text-muted-foreground">{label}</p>
			</div>
			<p className="text-xs text-muted-foreground/80">{subtitle}</p>
		</div>
	</Card>
);

export default function Main() {
	const stats: StatItemProps[] = [
		{
			icon: DollarSign,
			label: 'Total Revenue',
			value: '$127.4K',
			subtitle: 'Last 30 days',
			badge: '12%',
		},
		{
			icon: ShoppingCart,
			label: 'Total Orders',
			value: '8,492',
			subtitle: 'Last 30 days',
			badge: '8%',
		},
		{
			icon: Users,
			label: 'Active Customers',
			value: '24.8K',
			subtitle: 'Monthly active',
			badge: '24%',
		},
		{
			icon: Package,
			label: 'Products Sold',
			value: '15,847',
			subtitle: 'Last 30 days',
			badge: '5%',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-5 @2xl:grid-cols-4">
					{stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
