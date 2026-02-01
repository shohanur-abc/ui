'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type FunnelStep = {
	label: string;
	entered: number;
	exited: number;
	exitReasons: { reason: string; count: number }[];
};

const steps: FunnelStep[] = [
	{
		label: 'Homepage',
		entered: 50000,
		exited: 18000,
		exitReasons: [
			{ reason: 'Bounced', count: 12500 },
			{ reason: 'No interest', count: 5500 },
		],
	},
	{
		label: 'Category Page',
		entered: 32000,
		exited: 14000,
		exitReasons: [
			{ reason: "Can't find product", count: 8000 },
			{ reason: 'Price comparison', count: 6000 },
		],
	},
	{
		label: 'Product Page',
		entered: 18000,
		exited: 9500,
		exitReasons: [
			{ reason: 'Out of stock', count: 3200 },
			{ reason: 'High price', count: 4000 },
			{ reason: 'Bad reviews', count: 2300 },
		],
	},
	{
		label: 'Cart',
		entered: 8500,
		exited: 4200,
		exitReasons: [
			{ reason: 'Shipping cost', count: 2500 },
			{ reason: 'Saved for later', count: 1700 },
		],
	},
	{
		label: 'Checkout',
		entered: 4300,
		exited: 1200,
		exitReasons: [
			{ reason: 'Payment issues', count: 600 },
			{ reason: 'Form friction', count: 400 },
			{ reason: 'Account required', count: 200 },
		],
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Drop-off Analysis
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Why users leave at each step
						</p>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="space-y-4">
							{steps.map((step, i) => {
								const exitRate = ((step.exited / step.entered) * 100).toFixed(
									1,
								);
								const continued = step.entered - step.exited;

								return (
									<div
										key={i}
										className="border border-border/50 rounded-lg p-4"
									>
										<div className="flex items-center justify-between mb-3">
											<div className="flex items-center gap-3">
												<div className="size-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-sm font-medium text-cyan-500">
													{i + 1}
												</div>
												<div>
													<p className="font-medium">{step.label}</p>
													<p className="text-xs text-muted-foreground">
														{step.entered.toLocaleString()} entered
													</p>
												</div>
											</div>
											<div className="text-right">
												<Badge
													variant="outline"
													className="text-rose-500 border-rose-500/30"
												>
													{exitRate}% exit
												</Badge>
											</div>
										</div>

										<div className="flex gap-2 mb-2">
											<div
												className="h-2 bg-emerald-500 rounded-sm"
												style={{
													width: `${(continued / step.entered) * 100}%`,
												}}
											/>
											<div
												className="h-2 bg-rose-500/50 rounded-sm"
												style={{
													width: `${(step.exited / step.entered) * 100}%`,
												}}
											/>
										</div>

										<div className="flex items-center justify-between text-xs">
											<span className="text-emerald-500">
												{continued.toLocaleString()} continued
											</span>
											<div className="flex flex-wrap gap-2 justify-end">
												{step.exitReasons.map((reason, j) => (
													<span key={j} className="text-muted-foreground">
														{reason.reason}: {reason.count.toLocaleString()}
													</span>
												))}
											</div>
										</div>
									</div>
								);
							})}
						</div>

						<div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-sm">
							<span className="text-muted-foreground">Final Conversion</span>
							<span className="text-lg font-semibold text-emerald-500">
								{(
									((steps[4].entered - steps[4].exited) / steps[0].entered) *
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
