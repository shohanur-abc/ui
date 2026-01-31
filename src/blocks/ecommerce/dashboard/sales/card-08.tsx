'use client';

import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type PeriodData = {
	label: string;
	value: string;
	change: number;
};

type PeriodComparisonCardProps = {
	title: string;
	periods: PeriodData[];
};

const PeriodComparisonCard = ({ title, periods }: PeriodComparisonCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-4">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Calendar className="size-4" />
			</div>
			<CardTitle className="text-base font-semibold">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
				{periods.map((period, idx) => {
					const isPositive = period.change >= 0;
					return (
						<div key={idx} className="text-center p-4 rounded-lg bg-muted/30">
							<p className="text-xs text-muted-foreground mb-2">
								{period.label}
							</p>
							<p className="text-2xl font-bold mb-2">{period.value}</p>
							<div
								className={`inline-flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-emerald-500' : 'text-destructive'}`}
							>
								{isPositive ? (
									<TrendingUp className="size-3" />
								) : (
									<TrendingDown className="size-3" />
								)}
								{Math.abs(period.change)}%
							</div>
						</div>
					);
				})}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const cards: PeriodComparisonCardProps[] = [
		{
			title: 'Revenue by Period',
			periods: [
				{ label: 'Today', value: '$4,250', change: 12.5 },
				{ label: 'This Week', value: '$28,400', change: 8.2 },
				{ label: 'This Month', value: '$124,500', change: 15.3 },
				{ label: 'This Year', value: '$1.2M', change: 22.1 },
			],
		},
		{
			title: 'Orders by Period',
			periods: [
				{ label: 'Today', value: '89', change: 5.2 },
				{ label: 'This Week', value: '542', change: -2.8 },
				{ label: 'This Month', value: '2,350', change: 11.4 },
				{ label: 'This Year', value: '28.5K', change: 18.7 },
			],
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-6">
					{cards.map((card, idx) => (
						<PeriodComparisonCard key={idx} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
