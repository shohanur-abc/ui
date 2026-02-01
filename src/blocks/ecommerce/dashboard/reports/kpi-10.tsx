'use client';

import {
	Users,
	UserPlus,
	UserMinus,
	RefreshCw,
	Heart,
	Award,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type CustomerMetricProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: string;
	changeType: 'positive' | 'negative' | 'neutral';
	progressValue: number;
	progressLabel: string;
	iconBg: string;
	iconColor: string;
};

const CustomerMetric = ({
	icon: Icon,
	label,
	value,
	change,
	changeType,
	progressValue,
	progressLabel,
	iconBg,
	iconColor,
}: CustomerMetricProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-5">
			<div className="flex items-center justify-between">
				<div className={`rounded-lg p-2.5 ${iconBg}`}>
					<Icon className={`size-5 ${iconColor}`} />
				</div>
				<span
					className={`text-xs font-medium ${
						changeType === 'positive'
							? 'text-emerald-500'
							: changeType === 'negative'
								? 'text-rose-500'
								: 'text-muted-foreground'
					}`}
				>
					{change}
				</span>
			</div>
			<div className="mt-4">
				<p className="text-sm text-muted-foreground">{label}</p>
				<p className="mt-1 text-2xl font-bold">{value}</p>
			</div>
			<div className="mt-4 space-y-2">
				<Progress value={progressValue} className="h-1.5" />
				<p className="text-xs text-muted-foreground">{progressLabel}</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const metrics: CustomerMetricProps[] = [
		{
			icon: Users,
			label: 'Total Customers',
			value: '24,580',
			change: '+12.5% this month',
			changeType: 'positive',
			progressValue: 75,
			progressLabel: '75% toward 30K goal',
			iconBg: 'bg-primary/10',
			iconColor: 'text-primary',
		},
		{
			icon: UserPlus,
			label: 'New Customers',
			value: '1,842',
			change: '+8.3% vs last month',
			changeType: 'positive',
			progressValue: 92,
			progressLabel: '92% of monthly target',
			iconBg: 'bg-emerald-500/10',
			iconColor: 'text-emerald-500',
		},
		{
			icon: UserMinus,
			label: 'Churned',
			value: '245',
			change: '+15 this month',
			changeType: 'negative',
			progressValue: 12,
			progressLabel: '1.2% churn rate',
			iconBg: 'bg-rose-500/10',
			iconColor: 'text-rose-500',
		},
		{
			icon: RefreshCw,
			label: 'Repeat Customers',
			value: '8,420',
			change: '+5.8% improvement',
			changeType: 'positive',
			progressValue: 34,
			progressLabel: '34% of total customers',
			iconBg: 'bg-cyan-500/10',
			iconColor: 'text-cyan-500',
		},
		{
			icon: Heart,
			label: 'Loyalty Members',
			value: '5,280',
			change: '+420 new members',
			changeType: 'positive',
			progressValue: 22,
			progressLabel: '22% of customers enrolled',
			iconBg: 'bg-pink-500/10',
			iconColor: 'text-pink-500',
		},
		{
			icon: Award,
			label: 'VIP Customers',
			value: '892',
			change: '+45 this quarter',
			changeType: 'positive',
			progressValue: 4,
			progressLabel: 'Top 4% by spend',
			iconBg: 'bg-amber-500/10',
			iconColor: 'text-amber-500',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Customer KPI Report
						</CardTitle>
						<CardDescription>
							Comprehensive customer metrics and engagement indicators
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
							{metrics.map((metric, i) => (
								<CustomerMetric key={i} {...metric} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
