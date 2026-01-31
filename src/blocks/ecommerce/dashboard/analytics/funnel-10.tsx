'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FunnelStep = {
	label: string;
	value: number;
	target: number;
};

const steps: FunnelStep[] = [
	{ label: 'Impressions', value: 2500000, target: 2200000 },
	{ label: 'Clicks', value: 85000, target: 88000 },
	{ label: 'Signups', value: 12500, target: 15000 },
	{ label: 'Activations', value: 8200, target: 9500 },
	{ label: 'Subscriptions', value: 2850, target: 3000 },
];

const maxValue = Math.max(steps[0].value, steps[0].target);

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-sm font-medium">Target vs Actual Funnel</CardTitle>
								<p className="text-xs text-muted-foreground">Performance against goals</p>
							</div>
							<div className="flex items-center gap-4 text-xs">
								<div className="flex items-center gap-2">
									<div className="size-3 rounded-sm bg-cyan-500" />
									<span>Actual</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="size-3 rounded-sm border-2 border-dashed border-slate-400 bg-transparent" />
									<span>Target</span>
								</div>
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="space-y-4">
							{steps.map((step, i) => {
								const actualWidth = (step.value / maxValue) * 100;
								const targetWidth = (step.target / maxValue) * 100;
								const achieved = (step.value / step.target) * 100;
								const isAbove = step.value >= step.target;
								
								return (
									<div key={i}>
										<div className="flex items-center justify-between mb-1 text-sm">
											<span className="font-medium">{step.label}</span>
											<div className="flex items-center gap-3">
												<span className={`text-xs ${isAbove ? 'text-emerald-500' : 'text-rose-500'}`}>
													{achieved.toFixed(0)}% of target
												</span>
												<span className="text-muted-foreground">
													{step.value.toLocaleString()} / {step.target.toLocaleString()}
												</span>
											</div>
										</div>
										<div className="relative h-8">
											{/* Target indicator */}
											<div
												className="absolute top-0 h-full border-r-2 border-dashed border-slate-400 z-10"
												style={{ left: `${targetWidth}%` }}
											/>
											{/* Actual bar */}
											<div className="absolute top-0 left-0 h-full w-full bg-muted/30 rounded-sm overflow-hidden">
												<div
													className={`h-full ${isAbove ? 'bg-emerald-500' : 'bg-cyan-500'}`}
													style={{ width: `${actualWidth}%` }}
												/>
											</div>
										</div>
									</div>
								);
							})}
						</div>
						
						<div className="mt-6 pt-4 border-t border-border/50">
							<div className="grid grid-cols-2 @md:grid-cols-5 gap-4">
								{steps.map((step, i) => {
									const achieved = (step.value / step.target) * 100;
									const isAbove = achieved >= 100;
									
									return (
										<div key={i} className="text-center">
											<p className="text-xs text-muted-foreground truncate">{step.label}</p>
											<p className={`text-sm font-semibold ${isAbove ? 'text-emerald-500' : 'text-rose-500'}`}>
												{isAbove ? '+' : ''}{(achieved - 100).toFixed(1)}%
											</p>
										</div>
									);
								})}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
