'use client';

import { RefreshCcw, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type RefundData = {
	reason: string;
	count: number;
	amount: string;
	percentage: number;
	trend: number;
};

type RefundAnalysisCardProps = {
	title: string;
	totalRefunds: string;
	refundRate: number;
	refunds: RefundData[];
};

const RefundAnalysisCard = ({
	title,
	totalRefunds,
	refundRate,
	refunds,
}: RefundAnalysisCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center justify-between pb-4">
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg bg-destructive/10 text-destructive">
					<RefreshCcw className="size-4" />
				</div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
			</div>
			<div className="text-right">
				<p className="text-lg font-bold">{totalRefunds}</p>
				<Badge variant="destructive" className="text-xs">
					{refundRate}% refund rate
				</Badge>
			</div>
		</CardHeader>
		<CardContent>
			<div className="space-y-3">
				{refunds.map((refund, idx) => {
					const isPositive = refund.trend <= 0;
					return (
						<div
							key={idx}
							className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
						>
							<div className="flex-1">
								<p className="font-medium">{refund.reason}</p>
								<p className="text-xs text-muted-foreground">
									{refund.count} refunds ({refund.percentage}%)
								</p>
							</div>
							<div className="text-right">
								<p className="font-semibold">{refund.amount}</p>
								<div
									className={`flex items-center justify-end gap-1 text-xs ${isPositive ? 'text-emerald-500' : 'text-destructive'}`}
								>
									{isPositive ? (
										<TrendingDown className="size-3" />
									) : (
										<TrendingUp className="size-3" />
									)}
									{Math.abs(refund.trend)}%
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const refunds: RefundData[] = [
		{
			reason: 'Product not as described',
			count: 45,
			amount: '$4,520',
			percentage: 32,
			trend: -8.5,
		},
		{
			reason: 'Defective product',
			count: 38,
			amount: '$3,800',
			percentage: 27,
			trend: 5.2,
		},
		{
			reason: 'Wrong item shipped',
			count: 28,
			amount: '$2,240',
			percentage: 20,
			trend: -12.3,
		},
		{
			reason: 'Changed mind',
			count: 18,
			amount: '$1,440',
			percentage: 13,
			trend: 2.1,
		},
		{
			reason: 'Arrived too late',
			count: 11,
			amount: '$880',
			percentage: 8,
			trend: -15.0,
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="max-w-2xl mx-auto">
					<RefundAnalysisCard
						title="Refund Analysis"
						totalRefunds="$12,880"
						refundRate={2.3}
						refunds={refunds}
					/>
				</div>
			</div>
		</section>
	);
}
