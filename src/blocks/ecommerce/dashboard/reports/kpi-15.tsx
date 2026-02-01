'use client';

import {
	Wallet,
	ArrowUpRight,
	ArrowDownRight,
	PiggyBank,
	CreditCard,
	Receipt,
	Banknote,
	Calculator,
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

type FinancialKPIProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: number;
	period: string;
	color: string;
};

const FinancialKPI = ({
	icon: Icon,
	label,
	value,
	change,
	period,
	color,
}: FinancialKPIProps) => (
	<div className="flex items-start gap-4 rounded-xl border border-border/30 bg-gradient-to-br from-muted/30 to-transparent p-4">
		<div className={`rounded-lg p-2.5 ${color}`}>
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="mt-1 text-2xl font-bold">{value}</p>
			<div className="mt-2 flex items-center gap-2">
				{change >= 0 ? (
					<ArrowUpRight className="size-3.5 text-emerald-500" />
				) : (
					<ArrowDownRight className="size-3.5 text-rose-500" />
				)}
				<span
					className={`text-xs ${change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}
				>
					{change >= 0 ? '+' : ''}
					{change}%
				</span>
				<span className="text-xs text-muted-foreground">{period}</span>
			</div>
		</div>
	</div>
);

type RatioProps = {
	label: string;
	value: number;
	target: number;
	unit: string;
};

const RatioCard = ({ label, value, target, unit }: RatioProps) => {
	const percentage = (value / target) * 100;
	const isGood = value >= target;

	return (
		<div className="rounded-lg border border-border/30 bg-muted/20 p-4">
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium">{label}</p>
				<span
					className={`text-lg font-bold ${isGood ? 'text-emerald-500' : 'text-amber-500'}`}
				>
					{value}
					{unit}
				</span>
			</div>
			<Progress value={Math.min(percentage, 100)} className="mt-3 h-1.5" />
			<p className="mt-2 text-xs text-muted-foreground">
				Target: {target}
				{unit}
			</p>
		</div>
	);
};

export default function Main() {
	const kpis: FinancialKPIProps[] = [
		{
			icon: Wallet,
			label: 'Gross Revenue',
			value: '$1.24M',
			change: 18.5,
			period: 'vs last month',
			color: 'bg-primary/10 text-primary',
		},
		{
			icon: PiggyBank,
			label: 'Net Profit',
			value: '$248K',
			change: 12.3,
			period: 'vs last month',
			color: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			icon: CreditCard,
			label: 'Operating Expenses',
			value: '$425K',
			change: 8.2,
			period: 'vs last month',
			color: 'bg-amber-500/10 text-amber-500',
		},
		{
			icon: Receipt,
			label: 'Tax Obligations',
			value: '$62K',
			change: 15.4,
			period: 'vs last month',
			color: 'bg-rose-500/10 text-rose-500',
		},
		{
			icon: Banknote,
			label: 'Cash on Hand',
			value: '$892K',
			change: -2.1,
			period: 'vs last week',
			color: 'bg-cyan-500/10 text-cyan-500',
		},
		{
			icon: Calculator,
			label: 'Accounts Receivable',
			value: '$156K',
			change: -12.5,
			period: 'vs last month',
			color: 'bg-violet-500/10 text-violet-500',
		},
	];

	const ratios: RatioProps[] = [
		{ label: 'Profit Margin', value: 20.0, target: 18.0, unit: '%' },
		{ label: 'Operating Margin', value: 15.5, target: 15.0, unit: '%' },
		{ label: 'Current Ratio', value: 2.4, target: 2.0, unit: 'x' },
		{ label: 'Debt to Equity', value: 0.8, target: 1.0, unit: 'x' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Financial Summary Report
						</CardTitle>
						<CardDescription>
							Key financial metrics and health ratios
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
							{kpis.map((kpi, i) => (
								<FinancialKPI key={i} {...kpi} />
							))}
						</div>
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{ratios.map((ratio, i) => (
								<RatioCard key={i} {...ratio} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
