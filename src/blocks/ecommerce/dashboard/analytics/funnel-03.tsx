'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type FunnelComparison = {
	label: string;
	current: number;
	previous: number;
};

const steps: FunnelComparison[] = [
	{ label: 'Sessions', current: 85000, previous: 72000 },
	{ label: 'Product Views', current: 48000, previous: 45000 },
	{ label: 'Add to Cart', current: 18500, previous: 15200 },
	{ label: 'Checkout Init', current: 9200, previous: 7800 },
	{ label: 'Completed', current: 4850, previous: 3900 },
];

const maxValue = Math.max(...steps.flatMap((s) => [s.current, s.previous]));

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-sm font-medium">
									Funnel Comparison
								</CardTitle>
								<p className="text-xs text-muted-foreground">
									Current vs Previous Period
								</p>
							</div>
							<div className="flex items-center gap-4 text-xs">
								<div className="flex items-center gap-2">
									<div className="size-3 rounded-sm bg-cyan-500" />
									<span>Current</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="size-3 rounded-sm bg-slate-500" />
									<span>Previous</span>
								</div>
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="flex flex-col gap-4">
							{steps.map((step, i) => {
								const currentWidth = (step.current / maxValue) * 100;
								const previousWidth = (step.previous / maxValue) * 100;
								const change = (
									((step.current - step.previous) / step.previous) *
									100
								).toFixed(1);
								const isPositive = step.current > step.previous;

								return (
									<div key={i}>
										<div className="flex items-center justify-between mb-1">
											<span className="text-sm font-medium">{step.label}</span>
											<Badge
												variant="outline"
												className={
													isPositive
														? 'text-emerald-500 border-emerald-500/30'
														: 'text-rose-500 border-rose-500/30'
												}
											>
												{isPositive ? '+' : ''}
												{change}%
											</Badge>
										</div>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<div className="h-5 bg-muted/30 rounded-sm overflow-hidden flex-1">
													<div
														className="h-full bg-cyan-500"
														style={{ width: `${currentWidth}%` }}
													/>
												</div>
												<span className="text-xs w-16 text-right">
													{step.current.toLocaleString()}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<div className="h-5 bg-muted/30 rounded-sm overflow-hidden flex-1">
													<div
														className="h-full bg-slate-500"
														style={{ width: `${previousWidth}%` }}
													/>
												</div>
												<span className="text-xs w-16 text-right text-muted-foreground">
													{step.previous.toLocaleString()}
												</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
