'use client';

import * as React from 'react';
import {
	Calendar,
	TrendingUp,
	TrendingDown,
	Package,
	DollarSign,
	ShoppingCart,
	BarChart3,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type TimePeriod = '7d' | '30d' | '90d' | '1y';

type ComparisonStat = {
	id: string;
	name: string;
	current: number;
	previous: number;
	change: number;
	unit: string;
	icon: React.ReactNode;
};

type ComparisonCardProps = {
	stat: ComparisonStat;
};

const ComparisonCard = ({ stat }: ComparisonCardProps) => {
	const isPositive = stat.change >= 0;

	const formatValue = (value: number, unit: string) => {
		if (unit === '$') return `$${value.toLocaleString()}`;
		if (unit === '%') return `${value}%`;
		if (unit === 'x') return `${value}x`;
		return value.toLocaleString();
	};

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
						{stat.icon}
					</div>
					<p className="font-medium">{stat.name}</p>
				</div>
				<div className="mt-4 grid grid-cols-2 gap-4">
					<div>
						<p className="text-xs text-muted-foreground">Current Period</p>
						<p className="text-xl font-bold">
							{formatValue(stat.current, stat.unit)}
						</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Previous Period</p>
						<p className="text-xl font-medium text-muted-foreground">
							{formatValue(stat.previous, stat.unit)}
						</p>
					</div>
				</div>
				<div className="mt-4 flex items-center justify-between rounded-lg bg-muted p-3">
					<span className="text-sm text-muted-foreground">Change</span>
					<div
						className={`flex items-center gap-1 font-semibold ${isPositive ? 'text-emerald-500' : 'text-destructive'}`}
					>
						{isPositive ? (
							<TrendingUp className="size-4" />
						) : (
							<TrendingDown className="size-4" />
						)}
						{isPositive ? '+' : ''}
						{stat.change}%
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

type PeriodSelectorProps = {
	value: TimePeriod;
	onChange: (value: TimePeriod) => void;
};

const PeriodSelector = ({ value, onChange }: PeriodSelectorProps) => (
	<Select value={value} onValueChange={(v) => onChange(v as TimePeriod)}>
		<SelectTrigger className="w-40">
			<Calendar className="mr-2 size-4" />
			<SelectValue />
		</SelectTrigger>
		<SelectContent>
			<SelectItem value="7d">Last 7 days</SelectItem>
			<SelectItem value="30d">Last 30 days</SelectItem>
			<SelectItem value="90d">Last 90 days</SelectItem>
			<SelectItem value="1y">Last year</SelectItem>
		</SelectContent>
	</Select>
);

export default function Main() {
	const [period, setPeriod] = React.useState<TimePeriod>('30d');

	const stats: ComparisonStat[] = [
		{
			id: '1',
			name: 'Inventory Value',
			current: 1284500,
			previous: 1156000,
			change: 11.1,
			unit: '$',
			icon: <DollarSign className="size-5 text-primary" />,
		},
		{
			id: '2',
			name: 'Units Sold',
			current: 15420,
			previous: 12890,
			change: 19.6,
			unit: '',
			icon: <ShoppingCart className="size-5 text-primary" />,
		},
		{
			id: '3',
			name: 'Turnover Rate',
			current: 4.2,
			previous: 3.8,
			change: 10.5,
			unit: 'x',
			icon: <BarChart3 className="size-5 text-primary" />,
		},
		{
			id: '4',
			name: 'Stock Accuracy',
			current: 94,
			previous: 91,
			change: 3.3,
			unit: '%',
			icon: <Package className="size-5 text-primary" />,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">
									Period Comparison
								</CardTitle>
								<CardDescription>
									Compare key metrics across time periods
								</CardDescription>
							</div>
							<PeriodSelector value={period} onChange={setPeriod} />
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{stats.map((stat) => (
								<ComparisonCard key={stat.id} stat={stat} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
