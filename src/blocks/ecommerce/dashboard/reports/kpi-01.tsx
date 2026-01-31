'use client';

import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type KPICardProps = {
	icon: LucideIcon;
	title: string;
	value: string;
	change: string;
	changeType: 'positive' | 'negative';
	description: string;
	iconBg: string;
	iconColor: string;
};

const KPICard = ({
	icon: Icon,
	title,
	value,
	change,
	changeType,
	description,
	iconBg,
	iconColor,
}: KPICardProps) => (
	<Card className="border-border/30 bg-card/60 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md">
		<CardContent className="p-5">
			<div className="flex items-start justify-between">
				<div className={`rounded-xl p-3 ${iconBg}`}>
					<Icon className={`size-5 ${iconColor}`} />
				</div>
				<Badge
					variant="outline"
					className={
						changeType === 'positive'
							? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
							: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
					}
				>
					{changeType === 'positive' ? (
						<TrendingUp className="mr-1 size-3" />
					) : (
						<TrendingDown className="mr-1 size-3" />
					)}
					{change}
				</Badge>
			</div>
			<div className="mt-4">
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
				<p className="mt-2 text-xs text-muted-foreground">{description}</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const kpis: KPICardProps[] = [
		{
			icon: DollarSign,
			title: 'Total Revenue',
			value: '$1.24M',
			change: '+18.5%',
			changeType: 'positive',
			description: 'vs $1.05M last month',
			iconBg: 'bg-primary/10',
			iconColor: 'text-primary',
		},
		{
			icon: ShoppingCart,
			title: 'Total Orders',
			value: '12,458',
			change: '+12.3%',
			changeType: 'positive',
			description: 'vs 11,092 last month',
			iconBg: 'bg-emerald-500/10',
			iconColor: 'text-emerald-500',
		},
		{
			icon: Users,
			title: 'Active Customers',
			value: '8,942',
			change: '-2.4%',
			changeType: 'negative',
			description: 'vs 9,162 last month',
			iconBg: 'bg-amber-500/10',
			iconColor: 'text-amber-500',
		},
		{
			icon: Package,
			title: 'Products Sold',
			value: '24,580',
			change: '+8.7%',
			changeType: 'positive',
			description: 'vs 22,612 last month',
			iconBg: 'bg-violet-500/10',
			iconColor: 'text-violet-500',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Performance Overview
						</CardTitle>
						<CardDescription>
							Key business metrics at a glance
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{kpis.map((kpi, i) => (
								<KPICard key={i} {...kpi} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
