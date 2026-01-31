'use client';

import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ComparisonCardProps = {
	icon: LucideIcon;
	title: string;
	currentValue: string;
	previousValue: string;
	percentChange: number;
	currentPeriod: string;
	previousPeriod: string;
};

const ComparisonCard = ({
	icon: Icon,
	title,
	currentValue,
	previousValue,
	percentChange,
	currentPeriod,
	previousPeriod,
}: ComparisonCardProps) => {
	const isPositive = percentChange >= 0;

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardContent className="pt-6">
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
						<Icon className="size-5" />
					</div>
					<span className="text-sm font-medium">{title}</span>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">{currentPeriod}</p>
						<p className="text-2xl font-bold">{currentValue}</p>
					</div>
					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">{previousPeriod}</p>
						<p className="text-2xl font-bold text-muted-foreground">
							{previousValue}
						</p>
					</div>
				</div>

				<div className="mt-4 pt-4 border-t border-border/50">
					<Badge
						variant={isPositive ? 'default' : 'destructive'}
						className="gap-1"
					>
						{isPositive ? (
							<ArrowUpRight className="size-3" />
						) : (
							<ArrowDownRight className="size-3" />
						)}
						{Math.abs(percentChange)}% vs previous
					</Badge>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const comparisons: ComparisonCardProps[] = [
		{
			icon: ArrowUpRight,
			title: 'Revenue',
			currentValue: '$52,430',
			previousValue: '$45,200',
			percentChange: 16,
			currentPeriod: 'This Week',
			previousPeriod: 'Last Week',
		},
		{
			icon: ArrowUpRight,
			title: 'Orders',
			currentValue: '1,285',
			previousValue: '1,180',
			percentChange: 8.9,
			currentPeriod: 'This Week',
			previousPeriod: 'Last Week',
		},
		{
			icon: ArrowDownRight,
			title: 'Returns',
			currentValue: '48',
			previousValue: '52',
			percentChange: -7.7,
			currentPeriod: 'This Week',
			previousPeriod: 'Last Week',
		},
		{
			icon: ArrowUpRight,
			title: 'Customers',
			currentValue: '892',
			previousValue: '756',
			percentChange: 18,
			currentPeriod: 'This Week',
			previousPeriod: 'Last Week',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
					{comparisons.map((comparison, idx) => (
						<ComparisonCard key={idx} {...comparison} />
					))}
				</div>
			</div>
		</section>
	);
}
