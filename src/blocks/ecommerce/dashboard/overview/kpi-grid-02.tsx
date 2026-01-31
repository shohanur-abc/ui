import {
	ArrowDownRight,
	ArrowUpRight,
	CreditCard,
	DollarSign,
	Package,
	TrendingUp,
	type LucideIcon,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type KpiItem = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	progress: number;
	target: string;
	icon: LucideIcon;
};

const KpiCardWithProgress = ({
	title,
	value,
	change,
	trend,
	progress,
	target,
	icon: Icon,
}: KpiItem) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:border-primary/50">
		<CardContent className="p-5 @sm:p-6">
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<p className="text-sm font-medium text-muted-foreground">{title}</p>
					<div className="mt-2 flex items-baseline gap-2">
						<span className="text-2xl font-bold tracking-tight @sm:text-3xl">
							{value}
						</span>
						<span
							className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
						>
							{trend === 'up' ? (
								<ArrowUpRight className="size-3" />
							) : (
								<ArrowDownRight className="size-3" />
							)}
							{change}
						</span>
					</div>
				</div>
				<div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-3">
					<Icon className="size-5 text-primary" />
				</div>
			</div>
			<div className="mt-4 space-y-2">
				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<span>Progress to target</span>
					<span>{target}</span>
				</div>
				<Progress value={progress} className="h-1.5" />
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const kpis: KpiItem[] = [
		{
			title: 'Monthly Revenue',
			value: '$124,500',
			change: '+23.5%',
			trend: 'up',
			progress: 78,
			target: '$160,000',
			icon: DollarSign,
		},
		{
			title: 'Total Orders',
			value: '8,543',
			change: '+12.8%',
			trend: 'up',
			progress: 85,
			target: '10,000',
			icon: Package,
		},
		{
			title: 'Avg Order Value',
			value: '$68.45',
			change: '-2.3%',
			trend: 'down',
			progress: 62,
			target: '$75.00',
			icon: CreditCard,
		},
		{
			title: 'Conversion Rate',
			value: '3.24%',
			change: '+0.8%',
			trend: 'up',
			progress: 81,
			target: '4.0%',
			icon: TrendingUp,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4 @xl:gap-6">
					{kpis.map((kpi, i) => (
						<KpiCardWithProgress key={i} {...kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
