'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type BudgetData = {
	label: string;
	allocated: number;
	spent: number;
	color: string;
};

const BudgetDonut = ({ data }: { data: BudgetData }) => {
	const percentage = (data.spent / data.allocated) * 100;
	const strokeWidth = 6;
	const radius = 35;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	const isOverBudget = percentage > 100;
	const displayPercentage = Math.min(percentage, 100);

	return (
		<div className="flex items-center gap-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
			<div className="relative w-16 h-16 flex-shrink-0">
				<svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
					<circle
						cx="50"
						cy="50"
						r={radius}
						fill="none"
						stroke="hsl(var(--muted))"
						strokeWidth={strokeWidth}
					/>
					<circle
						cx="50"
						cy="50"
						r={radius}
						fill="none"
						stroke={isOverBudget ? '#ef4444' : data.color}
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={
							circumference - (displayPercentage / 100) * circumference
						}
					/>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<span
						className={`text-xs font-bold ${isOverBudget ? 'text-rose-500' : ''}`}
					>
						{percentage.toFixed(0)}%
					</span>
				</div>
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium truncate">{data.label}</span>
					{isOverBudget && (
						<Badge variant="destructive" className="text-xs ml-2">
							Over
						</Badge>
					)}
				</div>
				<div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
					<span>Spent: ${data.spent.toLocaleString()}</span>
					<span>Budget: ${data.allocated.toLocaleString()}</span>
				</div>
			</div>
		</div>
	);
};

const budgetData: BudgetData[] = [
	{ label: 'Marketing', allocated: 50000, spent: 42000, color: '#3b82f6' },
	{ label: 'Development', allocated: 80000, spent: 75000, color: '#22c55e' },
	{ label: 'Operations', allocated: 30000, spent: 35000, color: '#ef4444' },
	{ label: 'Sales', allocated: 40000, spent: 28000, color: '#a855f7' },
	{ label: 'Support', allocated: 25000, spent: 22000, color: '#f59e0b' },
	{ label: 'HR', allocated: 20000, spent: 18500, color: '#ec4899' },
];

const totalAllocated = budgetData.reduce((a, b) => a + b.allocated, 0);
const totalSpent = budgetData.reduce((a, b) => a + b.spent, 0);

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<div className="flex items-start justify-between">
							<div>
								<CardTitle className="text-sm font-medium">
									Budget Utilization
								</CardTitle>
								<p className="text-xs text-muted-foreground">
									Department spending vs allocation
								</p>
							</div>
							<div className="text-right">
								<p className="text-lg font-bold">
									${totalSpent.toLocaleString()}
								</p>
								<p className="text-xs text-muted-foreground">
									of ${totalAllocated.toLocaleString()} (
									{((totalSpent / totalAllocated) * 100).toFixed(1)}%)
								</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-3">
							{budgetData.map((data, i) => (
								<BudgetDonut key={i} data={data} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
