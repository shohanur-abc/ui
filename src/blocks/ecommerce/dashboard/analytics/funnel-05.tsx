'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

type FunnelStep = {
	label: string;
	value: number;
	trend: number;
	avgTime: string;
};

const steps: FunnelStep[] = [
	{ label: 'Landing Page', value: 42000, trend: 12.5, avgTime: '0s' },
	{ label: 'Product Browse', value: 28500, trend: 8.2, avgTime: '45s' },
	{ label: 'Product Detail', value: 15800, trend: -2.4, avgTime: '2m 15s' },
	{ label: 'Cart', value: 6200, trend: 5.8, avgTime: '3m 42s' },
	{ label: 'Checkout', value: 3850, trend: -1.2, avgTime: '5m 18s' },
	{ label: 'Thank You', value: 2890, trend: 15.3, avgTime: '6m 45s' },
];

const maxValue = steps[0].value;

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Checkout Flow Analysis</CardTitle>
						<p className="text-xs text-muted-foreground">Step-by-step conversion with timing</p>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="space-y-3">
							{steps.map((step, i) => {
								const width = (step.value / maxValue) * 100;
								const dropOff = i > 0 ? 100 - ((step.value / steps[i - 1].value) * 100) : 0;
								
								return (
									<div key={i} className="relative">
										<div className="flex items-center justify-between mb-1 text-sm">
											<div className="flex items-center gap-2">
												<div className="size-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs font-medium text-cyan-500">
													{i + 1}
												</div>
												<span className="font-medium">{step.label}</span>
											</div>
											<div className="flex items-center gap-4">
												<span className="text-xs text-muted-foreground">{step.avgTime}</span>
												<div className={`flex items-center gap-1 text-xs ${step.trend >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
													{step.trend >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
													{Math.abs(step.trend)}%
												</div>
												<span className="font-medium w-16 text-right">{step.value.toLocaleString()}</span>
											</div>
										</div>
										<div className="h-6 bg-muted/30 rounded-sm overflow-hidden relative">
											<div
												className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
												style={{ width: `${width}%` }}
											/>
											{i > 0 && dropOff > 0 && (
												<div className="absolute right-2 top-1/2 -translate-y-1/2">
													<Badge variant="outline" className="text-[10px] text-rose-500 border-rose-500/30 py-0">
														-{dropOff.toFixed(1)}%
													</Badge>
												</div>
											)}
										</div>
									</div>
								);
							})}
						</div>
						<div className="mt-6 flex items-center justify-between pt-4 border-t border-border/50">
							<div className="text-sm">
								<span className="text-muted-foreground">Avg. Time to Purchase: </span>
								<span className="font-medium">6m 45s</span>
							</div>
							<div className="text-sm">
								<span className="text-muted-foreground">Checkout Conversion: </span>
								<span className="font-medium text-emerald-500">
									{((steps[steps.length - 1].value / steps[0].value) * 100).toFixed(2)}%
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
