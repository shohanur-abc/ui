'use client';

import {
	ArrowDownRight,
	ArrowUpRight,
	DollarSign,
	type LucideIcon,
	Package,
	ShoppingCart,
	Users,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

type MetricCardProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: number;
	trend: 'up' | 'down';
};

const MetricCard = ({
	icon: Icon,
	label,
	value,
	change,
	trend,
}: MetricCardProps) => (
	<Card className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
		<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		<CardContent className="relative p-4 @sm:p-5 @lg:p-6">
			<div className="flex items-start justify-between gap-4">
				<div className="flex-1 space-y-2">
					<p className="text-xs @sm:text-sm font-medium text-muted-foreground">
						{label}
					</p>
					<p className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">
						{value}
					</p>
					<div
						className={`inline-flex items-center gap-1 text-xs @sm:text-sm font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}
					>
						{trend === 'up' ? (
							<ArrowUpRight className="size-3 @sm:size-4" />
						) : (
							<ArrowDownRight className="size-3 @sm:size-4" />
						)}
						<span>{Math.abs(change)}%</span>
						<span className="text-muted-foreground">vs last month</span>
					</div>
				</div>
				<div className="rounded-xl bg-primary/10 p-2.5 @sm:p-3 ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
					<Icon className="size-5 @sm:size-6 text-primary" />
				</div>
			</div>
		</CardContent>
	</Card>
);

const metrics: MetricCardProps[] = [
	{
		icon: DollarSign,
		label: 'Total Revenue',
		value: '$45,231',
		change: 12.5,
		trend: 'up',
	},
	{
		icon: ShoppingCart,
		label: 'Total Orders',
		value: '2,345',
		change: 8.2,
		trend: 'up',
	},
	{
		icon: Users,
		label: 'Active Customers',
		value: '1,234',
		change: 3.1,
		trend: 'down',
	},
	{
		icon: Package,
		label: 'Products Sold',
		value: '12,543',
		change: 15.3,
		trend: 'up',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @lg:gap-6">
					{metrics.map((metric, i) => (
						<MetricCard key={i} {...metric} />
					))}
				</div>
			</div>
		</section>
	);
}
