'use client';

import { BarChart3, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type ComparisonData = {
	metric: string;
	current: number;
	previous: number;
	change: number;
	changeType: 'increase' | 'decrease' | 'neutral';
	format: 'currency' | 'number' | 'percentage';
	target: number;
	targetStatus: 'above' | 'below' | 'on-track';
};

type ComparisonTableCardProps = {
	title: string;
	description: string;
	periodLabel: string;
	comparisons: ComparisonData[];
};

const formatValue = (value: number, format: ComparisonData['format']) => {
	switch (format) {
		case 'currency':
			return `$${value.toLocaleString()}`;
		case 'percentage':
			return `${value}%`;
		default:
			return value.toLocaleString();
	}
};

const getChangeIcon = (type: ComparisonData['changeType']) => {
	switch (type) {
		case 'increase':
			return <ArrowUpRight className="size-4 text-primary" />;
		case 'decrease':
			return <ArrowDownRight className="size-4 text-destructive" />;
		default:
			return <Minus className="size-4 text-muted-foreground" />;
	}
};

const getTargetVariant = (status: ComparisonData['targetStatus']) => {
	switch (status) {
		case 'above':
			return 'default';
		case 'below':
			return 'destructive';
		default:
			return 'secondary';
	}
};

const ComparisonTableCard = ({
	title,
	description,
	periodLabel,
	comparisons,
}: ComparisonTableCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<BarChart3 className="size-4" />
				</div>
				<div>
					<CardTitle className="text-base font-semibold">{title}</CardTitle>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
			<Badge variant="outline">{periodLabel}</Badge>
		</CardHeader>
		<CardContent>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Metric</TableHead>
							<TableHead className="text-right">Current</TableHead>
							<TableHead className="text-right">Previous</TableHead>
							<TableHead className="text-right">Change</TableHead>
							<TableHead className="text-right">Target</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{comparisons.map((comp, idx) => (
							<TableRow
								key={idx}
								className="hover:bg-muted/50 transition-colors"
							>
								<TableCell className="font-medium">{comp.metric}</TableCell>
								<TableCell className="text-right font-semibold">
									{formatValue(comp.current, comp.format)}
								</TableCell>
								<TableCell className="text-right text-muted-foreground">
									{formatValue(comp.previous, comp.format)}
								</TableCell>
								<TableCell className="text-right">
									<div className="flex items-center justify-end gap-1">
										{getChangeIcon(comp.changeType)}
										<span
											className={
												comp.changeType === 'increase'
													? 'text-primary'
													: comp.changeType === 'decrease'
														? 'text-destructive'
														: 'text-muted-foreground'
											}
										>
											{comp.change > 0 ? '+' : ''}
											{comp.change}%
										</span>
									</div>
								</TableCell>
								<TableCell className="text-right text-muted-foreground">
									{formatValue(comp.target, comp.format)}
								</TableCell>
								<TableCell>
									<Badge variant={getTargetVariant(comp.targetStatus)}>
										{comp.targetStatus === 'above'
											? 'Above Target'
											: comp.targetStatus === 'below'
												? 'Below Target'
												: 'On Track'}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const comparisons: ComparisonData[] = [
		{
			metric: 'Total Revenue',
			current: 142500,
			previous: 125000,
			change: 14,
			changeType: 'increase',
			format: 'currency',
			target: 140000,
			targetStatus: 'above',
		},
		{
			metric: 'Orders',
			current: 1250,
			previous: 1180,
			change: 5.9,
			changeType: 'increase',
			format: 'number',
			target: 1300,
			targetStatus: 'on-track',
		},
		{
			metric: 'Conversion Rate',
			current: 3.8,
			previous: 4.2,
			change: -9.5,
			changeType: 'decrease',
			format: 'percentage',
			target: 4.0,
			targetStatus: 'below',
		},
		{
			metric: 'Avg Order Value',
			current: 114,
			previous: 106,
			change: 7.5,
			changeType: 'increase',
			format: 'currency',
			target: 110,
			targetStatus: 'above',
		},
		{
			metric: 'Customer Acquisition',
			current: 320,
			previous: 320,
			change: 0,
			changeType: 'neutral',
			format: 'number',
			target: 350,
			targetStatus: 'below',
		},
		{
			metric: 'Return Rate',
			current: 4.2,
			previous: 5.1,
			change: -17.6,
			changeType: 'increase',
			format: 'percentage',
			target: 5.0,
			targetStatus: 'above',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<ComparisonTableCard
					title="Period Comparison"
					description="This month vs last month performance"
					periodLabel="Jan vs Dec"
					comparisons={comparisons}
				/>
			</div>
		</section>
	);
}
