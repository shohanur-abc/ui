'use client';

import {
	Clock,
	DollarSign,
	Package,
	Percent,
	RefreshCw,
	Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type QuarterlyData = {
	quarter: string;
	revenue: string;
	orders: number;
	customers: number;
	avgOrderValue: string;
	returnRate: string;
	processingTime: string;
};

type SummaryMetric = {
	label: string;
	value: string;
	icon: LucideIcon;
};

type MetricBadgeProps = SummaryMetric;

const MetricBadge = ({ label, value, icon: Icon }: MetricBadgeProps) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
		<div className="rounded-md bg-primary/10 p-2">
			<Icon className="size-4 text-primary" />
		</div>
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="font-semibold">{value}</p>
		</div>
	</div>
);

type QuarterRowProps = QuarterlyData & { isHighlighted?: boolean };

const QuarterRow = ({
	quarter,
	revenue,
	orders,
	customers,
	avgOrderValue,
	returnRate,
	processingTime,
	isHighlighted,
}: QuarterRowProps) => (
	<TableRow
		className={`transition-colors ${isHighlighted ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-muted/50'}`}
	>
		<TableCell className="font-semibold">{quarter}</TableCell>
		<TableCell className="text-right font-bold">{revenue}</TableCell>
		<TableCell className="text-right">{orders.toLocaleString()}</TableCell>
		<TableCell className="text-right">{customers.toLocaleString()}</TableCell>
		<TableCell className="text-right">{avgOrderValue}</TableCell>
		<TableCell className="text-right">{returnRate}</TableCell>
		<TableCell className="text-right text-muted-foreground">
			{processingTime}
		</TableCell>
	</TableRow>
);

type SummaryRowProps = {
	metrics: SummaryMetric[];
};

const SummaryRow = ({ metrics }: SummaryRowProps) => (
	<div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-6">
		{metrics.map((metric, i) => (
			<MetricBadge key={i} {...metric} />
		))}
	</div>
);

export default function Main() {
	const summaryMetrics: SummaryMetric[] = [
		{ label: 'Total Revenue', value: '$1.24M', icon: DollarSign },
		{ label: 'Total Orders', value: '28,450', icon: Package },
		{ label: 'Total Customers', value: '12,890', icon: Users },
		{ label: 'Avg Order Value', value: '$43.60', icon: DollarSign },
		{ label: 'Return Rate', value: '3.1%', icon: Percent },
		{ label: 'Avg Processing', value: '1.8 days', icon: Clock },
	];

	const quarterlyData: QuarterlyData[] = [
		{
			quarter: 'Q1 2025',
			revenue: '$245,800',
			orders: 5680,
			customers: 2845,
			avgOrderValue: '$43.28',
			returnRate: '3.4%',
			processingTime: '2.1 days',
		},
		{
			quarter: 'Q2 2025',
			revenue: '$298,500',
			orders: 6890,
			customers: 3120,
			avgOrderValue: '$43.32',
			returnRate: '3.2%',
			processingTime: '1.9 days',
		},
		{
			quarter: 'Q3 2025',
			revenue: '$312,400',
			orders: 7240,
			customers: 3280,
			avgOrderValue: '$43.15',
			returnRate: '2.9%',
			processingTime: '1.7 days',
		},
		{
			quarter: 'Q4 2025',
			revenue: '$385,600',
			orders: 8640,
			customers: 3645,
			avgOrderValue: '$44.63',
			returnRate: '2.8%',
			processingTime: '1.6 days',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Quarterly Performance Report
						</CardTitle>
						<CardDescription>
							Year-over-year comparison of key business metrics
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<SummaryRow metrics={summaryMetrics} />
						<div className="rounded-lg border border-border/50 overflow-hidden">
							<Table>
								<TableHeader>
									<TableRow className="border-border/50 bg-muted/30 hover:bg-muted/30">
										<TableHead>Quarter</TableHead>
										<TableHead className="text-right">Revenue</TableHead>
										<TableHead className="text-right">Orders</TableHead>
										<TableHead className="text-right">Customers</TableHead>
										<TableHead className="text-right">AOV</TableHead>
										<TableHead className="text-right">Returns</TableHead>
										<TableHead className="text-right">Processing</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{quarterlyData.map((data, i) => (
										<QuarterRow
											key={data.quarter}
											{...data}
											isHighlighted={i === quarterlyData.length - 1}
										/>
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
