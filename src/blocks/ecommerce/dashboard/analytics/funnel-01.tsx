'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FunnelStep = {
	label: string;
	value: number;
	color: string;
};

const steps: FunnelStep[] = [
	{ label: 'Visitors', value: 45000, color: 'bg-cyan-500' },
	{ label: 'Product Views', value: 28000, color: 'bg-cyan-400' },
	{ label: 'Add to Cart', value: 12500, color: 'bg-cyan-300' },
	{ label: 'Checkout', value: 5800, color: 'bg-cyan-200' },
	{ label: 'Purchase', value: 2850, color: 'bg-emerald-500' },
];

const maxValue = Math.max(...steps.map((s) => s.value));

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Conversion Funnel
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Customer journey from visit to purchase
						</p>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="flex flex-col gap-3">
							{steps.map((step, i) => {
								const widthPercent = (step.value / maxValue) * 100;
								const dropOff =
									i > 0
										? (
												((steps[i - 1].value - step.value) /
													steps[i - 1].value) *
												100
											).toFixed(1)
										: null;

								return (
									<div key={i} className="relative">
										<div className="flex items-center justify-between mb-1">
											<span className="text-sm font-medium">{step.label}</span>
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium">
													{step.value.toLocaleString()}
												</span>
												{dropOff && (
													<span className="text-xs text-rose-500">
														-{dropOff}%
													</span>
												)}
											</div>
										</div>
										<div className="h-8 bg-muted/30 rounded-sm overflow-hidden">
											<div
												className={`h-full ${step.color} transition-all duration-500`}
												style={{ width: `${widthPercent}%` }}
											/>
										</div>
									</div>
								);
							})}
						</div>
						<div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-sm">
							<span className="text-muted-foreground">
								Overall Conversion Rate
							</span>
							<span className="text-lg font-semibold text-emerald-500">
								{(
									(steps[steps.length - 1].value / steps[0].value) *
									100
								).toFixed(2)}
								%
							</span>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
