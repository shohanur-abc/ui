import {
	ArrowDownRight,
	ArrowRight,
	ArrowUpRight,
	CheckCircle2,
	Clock,
	DollarSign,
	ShoppingCart,
	XCircle,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type KpiItem = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	status: 'success' | 'warning' | 'danger';
	href: string;
};

const getStatusStyles = (status: KpiItem['status']) => {
	switch (status) {
		case 'success':
			return {
				bg: 'bg-emerald-500/10',
				border: 'border-emerald-500/20',
				icon: 'text-emerald-500',
				StatusIcon: CheckCircle2,
			};
		case 'warning':
			return {
				bg: 'bg-amber-500/10',
				border: 'border-amber-500/20',
				icon: 'text-amber-500',
				StatusIcon: Clock,
			};
		case 'danger':
			return {
				bg: 'bg-red-500/10',
				border: 'border-red-500/20',
				icon: 'text-red-500',
				StatusIcon: XCircle,
			};
	}
};

const KpiCardAction = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
	status,
	href,
}: KpiItem) => {
	const styles = getStatusStyles(status);
	return (
		<Card
			className={`group overflow-hidden transition-all duration-300 hover:shadow-lg ${styles.border}`}
		>
			<CardHeader className={`${styles.bg} pb-3`}>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon className={`size-4 ${styles.icon}`} />
						<CardTitle className="text-sm font-medium">{title}</CardTitle>
					</div>
					<styles.StatusIcon className={`size-4 ${styles.icon}`} />
				</div>
			</CardHeader>
			<CardContent className="pt-4">
				<div className="flex items-end justify-between">
					<div>
						<p className="text-2xl font-bold tracking-tight @sm:text-3xl">
							{value}
						</p>
						<div
							className={`mt-1 flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
						>
							{trend === 'up' ? (
								<ArrowUpRight className="size-3" />
							) : (
								<ArrowDownRight className="size-3" />
							)}
							{change} vs last period
						</div>
					</div>
					<Button
						variant="ghost"
						size="sm"
						className="shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100"
						asChild
					>
						<Link href={href}>
							View
							<ArrowRight className="size-3" />
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const kpis: KpiItem[] = [
		{
			title: 'Total Revenue',
			value: '$89,432',
			change: '+24.5%',
			trend: 'up',
			icon: DollarSign,
			status: 'success',
			href: '/dashboard/revenue',
		},
		{
			title: 'Pending Orders',
			value: '142',
			change: '+8.3%',
			trend: 'up',
			icon: Clock,
			status: 'warning',
			href: '/dashboard/orders',
		},
		{
			title: 'Cart Abandonment',
			value: '34.2%',
			change: '+5.1%',
			trend: 'down',
			icon: ShoppingCart,
			status: 'danger',
			href: '/dashboard/carts',
		},
		{
			title: 'Completed Orders',
			value: '1,847',
			change: '+18.2%',
			trend: 'up',
			icon: CheckCircle2,
			status: 'success',
			href: '/dashboard/completed',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4 @xl:gap-6">
					{kpis.map((kpi, i) => (
						<KpiCardAction key={i} {...kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
