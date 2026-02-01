'use client';

import * as React from 'react';
import {
	Package,
	TrendingUp,
	TrendingDown,
	AlertTriangle,
	BarChart3,
	ArrowUpRight,
	ArrowDownRight,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type KPICardProps = {
	title: string;
	value: string;
	change: number;
	changeLabel: string;
	target?: { value: number; current: number };
	icon: React.ReactNode;
	variant?: 'default' | 'success' | 'warning' | 'danger';
};

const KPICard = ({
	title,
	value,
	change,
	changeLabel,
	target,
	icon,
	variant = 'default',
}: KPICardProps) => {
	const isPositive = change >= 0;
	const variantColors = {
		default: 'bg-primary/10 text-primary',
		success: 'bg-emerald-500/10 text-emerald-500',
		warning: 'bg-amber-500/10 text-amber-500',
		danger: 'bg-destructive/10 text-destructive',
	};

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-start justify-between">
					<div
						className={`flex size-12 items-center justify-center rounded-xl ${variantColors[variant]}`}
					>
						{icon}
					</div>
					<Badge
						variant={isPositive ? 'default' : 'destructive'}
						className="gap-1 text-xs"
					>
						{isPositive ? (
							<ArrowUpRight className="size-3" />
						) : (
							<ArrowDownRight className="size-3" />
						)}
						{Math.abs(change)}%
					</Badge>
				</div>
				<div className="mt-4">
					<p className="text-sm text-muted-foreground">{title}</p>
					<p className="mt-1 text-3xl font-bold">{value}</p>
					<p className="mt-1 text-xs text-muted-foreground">{changeLabel}</p>
				</div>
				{target && (
					<div className="mt-4 space-y-2">
						<div className="flex justify-between text-xs">
							<span className="text-muted-foreground">Target</span>
							<span>{Math.round((target.current / target.value) * 100)}%</span>
						</div>
						<Progress
							value={(target.current / target.value) * 100}
							className="h-2"
						/>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const kpis: KPICardProps[] = [
		{
			title: 'Inventory Turnover',
			value: '8.4x',
			change: 12.5,
			changeLabel: 'vs last quarter',
			target: { value: 10, current: 8.4 },
			icon: <TrendingUp className="size-6" />,
			variant: 'success',
		},
		{
			title: 'Days Sales of Inventory',
			value: '43 days',
			change: -8.2,
			changeLabel: 'Improved by 4 days',
			icon: <BarChart3 className="size-6" />,
			variant: 'default',
		},
		{
			title: 'Stockout Rate',
			value: '2.3%',
			change: -15.4,
			changeLabel: 'vs last month',
			target: { value: 100, current: 2.3 },
			icon: <AlertTriangle className="size-6" />,
			variant: 'warning',
		},
		{
			title: 'Carrying Cost',
			value: '$124.5K',
			change: 5.8,
			changeLabel: 'Monthly average',
			icon: <Package className="size-6" />,
			variant: 'danger',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="mb-6">
					<h2 className="text-xl font-semibold @lg:text-2xl">Inventory KPIs</h2>
					<p className="text-sm text-muted-foreground">
						Key performance indicators with targets
					</p>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
					{kpis.map((kpi) => (
						<KPICard key={kpi.title} {...kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
