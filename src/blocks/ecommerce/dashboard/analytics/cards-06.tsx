'use client';

import {
	Activity,
	CreditCard,
	type LucideIcon,
	Package2,
	Target,
	TrendingDown,
	TrendingUp,
	Zap,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type ComparisonCardProps = {
	icon: LucideIcon;
	title: string;
	current: { label: string; value: string; amount: number };
	previous: { label: string; value: string; amount: number };
};

const ComparisonCard = ({ icon: Icon, title, current, previous }: ComparisonCardProps) => {
	const total = current.amount + previous.amount;
	const currentPercent = (current.amount / total) * 100;
	const isPositive = current.amount > previous.amount;

	return (
		<Card className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
			<CardHeader className="flex flex-row items-center gap-3 pb-3">
				<div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/20">
					<Icon className="size-4 text-primary" />
				</div>
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">{current.label}</p>
						<p className="text-xl @sm:text-2xl font-bold">{current.value}</p>
					</div>
					<div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
						{isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
						{Math.abs(((current.amount - previous.amount) / previous.amount) * 100).toFixed(1)}%
					</div>
				</div>
				<div className="space-y-2">
					<div className="flex h-2 overflow-hidden rounded-full bg-muted">
						<div
							className="bg-primary transition-all duration-500"
							style={{ width: `${currentPercent}%` }}
						/>
						<div
							className="bg-muted-foreground/30"
							style={{ width: `${100 - currentPercent}%` }}
						/>
					</div>
					<div className="flex items-center justify-between text-xs text-muted-foreground">
						<span>{current.label}: {current.value}</span>
						<span>{previous.label}: {previous.value}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const comparisons: ComparisonCardProps[] = [
	{ icon: CreditCard, title: 'Revenue Comparison', current: { label: 'This Month', value: '$45,230', amount: 45230 }, previous: { label: 'Last Month', value: '$38,420', amount: 38420 } },
	{ icon: Package2, title: 'Orders Comparison', current: { label: 'This Week', value: '1,234', amount: 1234 }, previous: { label: 'Last Week', value: '1,456', amount: 1456 } },
	{ icon: Target, title: 'Conversion Rate', current: { label: 'Current', value: '3.8%', amount: 38 }, previous: { label: 'Target', value: '4.0%', amount: 40 } },
	{ icon: Activity, title: 'Site Traffic', current: { label: 'Today', value: '12,543', amount: 12543 }, previous: { label: 'Yesterday', value: '11,230', amount: 11230 } },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-4 @lg:gap-6">
					{comparisons.map((card, i) => (
						<ComparisonCard key={i} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
