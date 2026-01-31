'use client';

import * as React from 'react';
import {
	DollarSign,
	Percent,
	TrendingUp,
	TrendingDown,
	AlertTriangle,
	Target,
	PieChart,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PricingTier {
	name: string;
	count: number;
	revenue: number;
	avgMargin: number;
}

interface MarginStats {
	overallMargin: number;
	marginTrend: number;
	totalRevenue: number;
	totalCost: number;
	totalProfit: number;
	marginByCategory: { name: string; margin: number; revenue: number }[];
	pricingTiers: PricingTier[];
	belowTargetCount: number;
	targetMargin: number;
}

interface MarginGaugeProps {
	margin: number;
	target: number;
	label: string;
}

const MarginGauge = ({ margin, target, label }: MarginGaugeProps) => {
	const isOnTarget = margin >= target;
	const percentage = Math.min((margin / 100) * 100, 100);
	const circumference = 2 * Math.PI * 45;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<Card>
			<CardContent className="flex flex-col items-center p-6">
				<div className="relative">
					<svg className="size-32 -rotate-90">
						<circle
							cx="64"
							cy="64"
							r="45"
							stroke="currentColor"
							strokeWidth="10"
							fill="none"
							className="text-muted"
						/>
						<circle
							cx="64"
							cy="64"
							r="45"
							stroke="currentColor"
							strokeWidth="10"
							fill="none"
							strokeLinecap="round"
							strokeDasharray={circumference}
							strokeDashoffset={strokeDashoffset}
							className={isOnTarget ? 'text-emerald-500' : 'text-amber-500'}
						/>
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<span className="text-3xl font-bold">{margin.toFixed(1)}%</span>
					</div>
				</div>
				<p className="mt-2 text-sm text-muted-foreground">{label}</p>
				<div className="mt-2 flex items-center gap-2 text-xs">
					<Target className="size-3" />
					<span className={isOnTarget ? 'text-emerald-500' : 'text-amber-500'}>
						Target: {target}%
					</span>
				</div>
			</CardContent>
		</Card>
	);
};

interface ProfitBreakdownProps {
	title: string;
	revenue: number;
	cost: number;
	profit: number;
	labels: { revenue: string; cost: string; profit: string };
}

const ProfitBreakdown = ({ title, revenue, cost, profit, labels }: ProfitBreakdownProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="size-3 rounded-full bg-blue-500" />
						<span className="text-sm">{labels.revenue}</span>
					</div>
					<span className="font-bold">${revenue.toLocaleString()}</span>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="size-3 rounded-full bg-red-500" />
						<span className="text-sm">{labels.cost}</span>
					</div>
					<span className="font-bold text-red-500">-${cost.toLocaleString()}</span>
				</div>
				<div className="border-t pt-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="size-3 rounded-full bg-emerald-500" />
							<span className="font-medium">{labels.profit}</span>
						</div>
						<span className="text-xl font-bold text-emerald-500">${profit.toLocaleString()}</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

interface MarginByCategoryProps {
	title: string;
	categories: { name: string; margin: number; revenue: number }[];
}

const MarginByCategory = ({ title, categories }: MarginByCategoryProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-4">
				{categories.map((cat) => {
					const getMarginColor = () => {
						if (cat.margin >= 40) return 'text-emerald-500';
						if (cat.margin >= 25) return 'text-blue-500';
						if (cat.margin >= 15) return 'text-amber-500';
						return 'text-red-500';
					};

					return (
						<div key={cat.name} className="space-y-2">
							<div className="flex items-center justify-between">
								<span className="font-medium">{cat.name}</span>
								<div className="flex items-center gap-2">
									<span className="text-sm text-muted-foreground">
										${cat.revenue.toLocaleString()}
									</span>
									<Badge className={`${getMarginColor()} bg-current/10`}>
										{cat.margin.toFixed(1)}%
									</Badge>
								</div>
							</div>
							<Progress value={cat.margin} className="h-2" />
						</div>
					);
				})}
			</div>
		</CardContent>
	</Card>
);

interface PricingTiersCardProps {
	title: string;
	tiers: PricingTier[];
}

const PricingTiersCard = ({ title, tiers }: PricingTiersCardProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
				{tiers.map((tier) => (
					<div key={tier.name} className="rounded-lg border bg-muted/30 p-4 text-center">
						<p className="font-medium">{tier.name}</p>
						<p className="mt-1 text-2xl font-bold">{tier.count}</p>
						<p className="text-xs text-muted-foreground">products</p>
						<div className="mt-2 border-t pt-2">
							<p className="text-sm font-medium text-primary">{tier.avgMargin.toFixed(1)}% margin</p>
							<p className="text-xs text-muted-foreground">${tier.revenue.toLocaleString()} revenue</p>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

interface MarginAlertCardProps {
	title: string;
	count: number;
	target: number;
	labels: { description: string };
}

const MarginAlertCard = ({ title, count, target, labels }: MarginAlertCardProps) => (
	<Card className="border-amber-500/20 bg-amber-500/5">
		<CardContent className="flex items-center gap-4 p-4">
			<div className="flex size-12 items-center justify-center rounded-full bg-amber-500/10">
				<AlertTriangle className="size-6 text-amber-500" />
			</div>
			<div className="flex-1">
				<p className="font-medium">{title}</p>
				<p className="text-sm text-muted-foreground">
					{labels.description.replace('{count}', count.toString()).replace('{target}', target.toString())}
				</p>
			</div>
			<div className="text-right">
				<p className="text-3xl font-bold text-amber-500">{count}</p>
				<p className="text-xs text-muted-foreground">products</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const stats: MarginStats = {
		overallMargin: 34.5,
		marginTrend: 2.3,
		totalRevenue: 284930,
		totalCost: 186628,
		totalProfit: 98302,
		marginByCategory: [
			{ name: 'Electronics', margin: 28.5, revenue: 125600 },
			{ name: 'Accessories', margin: 45.2, revenue: 45300 },
			{ name: 'Audio', margin: 35.8, revenue: 78900 },
			{ name: 'Wearables', margin: 42.1, revenue: 29800 },
			{ name: 'Home', margin: 18.3, revenue: 17200 },
		],
		pricingTiers: [
			{ name: 'Budget', count: 234, revenue: 45600, avgMargin: 15.2 },
			{ name: 'Mid-range', count: 456, revenue: 89400, avgMargin: 32.5 },
			{ name: 'Premium', count: 189, revenue: 112500, avgMargin: 45.8 },
			{ name: 'Luxury', count: 45, revenue: 37430, avgMargin: 52.3 },
		],
		belowTargetCount: 67,
		targetMargin: 25,
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<MarginGauge
						margin={stats.overallMargin}
						target={stats.targetMargin}
						label="Overall Margin"
					/>
					<ProfitBreakdown
						title="Profit Breakdown"
						revenue={stats.totalRevenue}
						cost={stats.totalCost}
						profit={stats.totalProfit}
						labels={{ revenue: 'Total Revenue', cost: 'Total Cost', profit: 'Net Profit' }}
					/>
					<Card>
						<CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
							<div className={`flex items-center gap-2 ${stats.marginTrend >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
								{stats.marginTrend >= 0 ? <TrendingUp className="size-8" /> : <TrendingDown className="size-8" />}
								<span className="text-4xl font-bold">
									{stats.marginTrend >= 0 ? '+' : ''}{stats.marginTrend}%
								</span>
							</div>
							<p className="mt-2 text-muted-foreground">Margin Trend</p>
							<p className="text-sm text-muted-foreground">vs. last period</p>
						</CardContent>
					</Card>
				</div>

				<MarginAlertCard
					title="Products Below Target Margin"
					count={stats.belowTargetCount}
					target={stats.targetMargin}
					labels={{ description: '{count} products are below the {target}% target margin' }}
				/>

				<div className="grid gap-6 @lg:grid-cols-2">
					<MarginByCategory
						title="Margin by Category"
						categories={stats.marginByCategory}
					/>
					<PricingTiersCard
						title="Pricing Tier Performance"
						tiers={stats.pricingTiers}
					/>
				</div>
			</div>
		</section>
	);
}
