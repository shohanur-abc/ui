'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

type Metric = {
	label: string;
	current: number;
	previous: number;
	target: number;
	unit: string;
};

const metrics: Metric[] = [
	{ label: 'Revenue', current: 84500, previous: 72000, target: 100000, unit: '$' },
	{ label: 'Conversion Rate', current: 3.8, previous: 3.2, target: 5.0, unit: '%' },
	{ label: 'Avg Order Value', current: 78, previous: 82, target: 85, unit: '$' },
	{ label: 'Customer Satisfaction', current: 4.5, previous: 4.3, target: 4.8, unit: '/5' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
					{metrics.map((metric, i) => {
						const percent = (metric.current / metric.target) * 100;
						const change = ((metric.current - metric.previous) / metric.previous) * 100;
						const isUp = change > 0;
						
						return (
							<Card key={i} className="border-border/50 bg-card/80 backdrop-blur-sm">
								<CardContent className="pt-6">
									<div className="flex items-start justify-between mb-4">
										<div>
											<p className="text-xs text-muted-foreground">{metric.label}</p>
											<p className="text-2xl font-bold">
												{metric.unit === '$' && metric.unit}
												{metric.current.toLocaleString()}
												{metric.unit !== '$' && metric.unit}
											</p>
										</div>
										<Badge
											variant="outline"
											className={isUp ? 'text-emerald-500 border-emerald-500/30' : 'text-rose-500 border-rose-500/30'}
										>
											{isUp ? <TrendingUp className="size-3 mr-1" /> : <TrendingDown className="size-3 mr-1" />}
											{isUp ? '+' : ''}{change.toFixed(1)}%
										</Badge>
									</div>
									
									<div className="space-y-2">
										<div className="flex items-center justify-between text-xs">
											<span className="text-muted-foreground">Progress to target</span>
											<span className="font-medium">{percent.toFixed(0)}%</span>
										</div>
										<div className="h-2 bg-muted/30 rounded-full overflow-hidden">
											<div
												className={`h-full rounded-full ${percent >= 100 ? 'bg-emerald-500' : percent >= 75 ? 'bg-cyan-500' : percent >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
												style={{ width: `${Math.min(percent, 100)}%` }}
											/>
										</div>
										<div className="flex items-center justify-between text-xs text-muted-foreground">
											<span>Previous: {metric.unit === '$' && metric.unit}{metric.previous.toLocaleString()}{metric.unit !== '$' && metric.unit}</span>
											<span>Target: {metric.unit === '$' && metric.unit}{metric.target.toLocaleString()}{metric.unit !== '$' && metric.unit}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
