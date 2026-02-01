'use client';

import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type ComparisonRowProps = {
	metric: string;
	current: string;
	previous: string;
	change: number;
	unit: string;
};

const ComparisonRow = ({
	metric,
	current,
	previous,
	change,
	unit,
}: ComparisonRowProps) => {
	const isPositive = change > 0;
	const isNeutral = change === 0;

	return (
		<TableRow>
			<TableCell className="font-medium">{metric}</TableCell>
			<TableCell className="text-right">
				<span className="text-lg font-bold">{current}</span>
				<span className="ml-1 text-xs text-muted-foreground">{unit}</span>
			</TableCell>
			<TableCell className="text-right text-muted-foreground">
				{previous} {unit}
			</TableCell>
			<TableCell className="text-right">
				<Badge
					variant="outline"
					className={
						isNeutral
							? 'border-border bg-muted'
							: isPositive
								? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
								: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
					}
				>
					{isNeutral ? (
						<Minus className="mr-1 size-3" />
					) : isPositive ? (
						<ArrowUpRight className="mr-1 size-3" />
					) : (
						<ArrowDownRight className="mr-1 size-3" />
					)}
					{isPositive ? '+' : ''}
					{change}%
				</Badge>
			</TableCell>
		</TableRow>
	);
};

export default function Main() {
	const comparisons: ComparisonRowProps[] = [
		{
			metric: 'Total Revenue',
			current: '$1.24M',
			previous: '$1.05M',
			change: 18.1,
			unit: '',
		},
		{
			metric: 'Total Orders',
			current: '12,458',
			previous: '10,892',
			change: 14.4,
			unit: '',
		},
		{
			metric: 'Average Order Value',
			current: '$149.50',
			previous: '$145.20',
			change: 3.0,
			unit: '',
		},
		{
			metric: 'New Customers',
			current: '2,845',
			previous: '2,580',
			change: 10.3,
			unit: '',
		},
		{
			metric: 'Repeat Customers',
			current: '4,280',
			previous: '4,120',
			change: 3.9,
			unit: '',
		},
		{
			metric: 'Conversion Rate',
			current: '4.2',
			previous: '3.8',
			change: 10.5,
			unit: '%',
		},
		{
			metric: 'Cart Abandonment',
			current: '24.5',
			previous: '28.2',
			change: -13.1,
			unit: '%',
		},
		{
			metric: 'Return Rate',
			current: '5.2',
			previous: '4.8',
			change: 8.3,
			unit: '%',
		},
		{
			metric: 'Customer Satisfaction',
			current: '4.7',
			previous: '4.5',
			change: 4.4,
			unit: '/5',
		},
		{
			metric: 'Net Promoter Score',
			current: '62',
			previous: '58',
			change: 6.9,
			unit: '',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Month-over-Month Comparison
						</CardTitle>
						<CardDescription>
							Current month vs previous month performance
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Metric</TableHead>
										<TableHead className="text-right">This Month</TableHead>
										<TableHead className="text-right">Last Month</TableHead>
										<TableHead className="text-right">Change</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{comparisons.map((comp, i) => (
										<ComparisonRow key={i} {...comp} />
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
