'use client';

import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type PeriodKPIProps = {
	metric: string;
	daily: { value: string; change: number };
	weekly: { value: string; change: number };
	monthly: { value: string; change: number };
};

type KPIValueProps = {
	value: string;
	change: number;
};

const KPIValue = ({ value, change }: KPIValueProps) => (
	<div className="flex items-center justify-between">
		<span className="text-lg font-bold">{value}</span>
		<Badge
			variant="outline"
			className={
				change >= 0
					? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
					: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
			}
		>
			{change >= 0 ? (
				<TrendingUp className="mr-1 size-3" />
			) : (
				<TrendingDown className="mr-1 size-3" />
			)}
			{change >= 0 ? '+' : ''}
			{change}%
		</Badge>
	</div>
);

export default function Main() {
	const kpis: PeriodKPIProps[] = [
		{
			metric: 'Revenue',
			daily: { value: '$42.5K', change: 8.2 },
			weekly: { value: '$285K', change: 12.5 },
			monthly: { value: '$1.24M', change: 18.5 },
		},
		{
			metric: 'Orders',
			daily: { value: '284', change: 5.8 },
			weekly: { value: '1,892', change: 10.2 },
			monthly: { value: '8,450', change: 15.3 },
		},
		{
			metric: 'Customers',
			daily: { value: '156', change: -2.4 },
			weekly: { value: '1,045', change: 4.8 },
			monthly: { value: '4,280', change: 8.7 },
		},
		{
			metric: 'Avg Order',
			daily: { value: '$149.50', change: 2.4 },
			weekly: { value: '$150.80', change: 2.1 },
			monthly: { value: '$146.70', change: 1.8 },
		},
		{
			metric: 'Conversion',
			daily: { value: '4.2%', change: 0.3 },
			weekly: { value: '4.1%', change: 0.5 },
			monthly: { value: '3.9%', change: 0.8 },
		},
		{
			metric: 'Sessions',
			daily: { value: '12.4K', change: 15.2 },
			weekly: { value: '78.5K', change: 12.8 },
			monthly: { value: '324K', change: 22.1 },
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Period Comparison Report
							</CardTitle>
							<CardDescription>
								Key metrics across different time periods
							</CardDescription>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Calendar className="size-4" />
							Last updated: Today
						</div>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="daily" className="space-y-4">
							<TabsList>
								<TabsTrigger value="daily">Daily</TabsTrigger>
								<TabsTrigger value="weekly">Weekly</TabsTrigger>
								<TabsTrigger value="monthly">Monthly</TabsTrigger>
							</TabsList>
							<TabsContent value="daily">
								<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
									{kpis.map((kpi, i) => (
										<Card key={i} className="border-border/30 bg-muted/20">
											<CardContent className="p-4">
												<p className="mb-2 text-sm text-muted-foreground">
													{kpi.metric}
												</p>
												<KPIValue
													value={kpi.daily.value}
													change={kpi.daily.change}
												/>
											</CardContent>
										</Card>
									))}
								</div>
							</TabsContent>
							<TabsContent value="weekly">
								<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
									{kpis.map((kpi, i) => (
										<Card key={i} className="border-border/30 bg-muted/20">
											<CardContent className="p-4">
												<p className="mb-2 text-sm text-muted-foreground">
													{kpi.metric}
												</p>
												<KPIValue
													value={kpi.weekly.value}
													change={kpi.weekly.change}
												/>
											</CardContent>
										</Card>
									))}
								</div>
							</TabsContent>
							<TabsContent value="monthly">
								<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
									{kpis.map((kpi, i) => (
										<Card key={i} className="border-border/30 bg-muted/20">
											<CardContent className="p-4">
												<p className="mb-2 text-sm text-muted-foreground">
													{kpi.metric}
												</p>
												<KPIValue
													value={kpi.monthly.value}
													change={kpi.monthly.change}
												/>
											</CardContent>
										</Card>
									))}
								</div>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
