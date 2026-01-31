'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';

type FunnelStep = {
	label: string;
	value: number;
	icon: string;
};

const steps: FunnelStep[] = [
	{ label: 'Page Visit', value: 125000, icon: '👁️' },
	{ label: 'Sign Up', value: 42000, icon: '✍️' },
	{ label: 'Email Verified', value: 38500, icon: '✉️' },
	{ label: 'Profile Complete', value: 28000, icon: '👤' },
	{ label: 'First Purchase', value: 12500, icon: '🛒' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">User Onboarding Funnel</CardTitle>
						<p className="text-xs text-muted-foreground">New user activation journey</p>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="flex flex-col items-center">
							{steps.map((step, i) => {
								const widthPercent = 100 - (i * 15);
								const convRate = i > 0 ? ((step.value / steps[i - 1].value) * 100).toFixed(1) : '100';
								
								return (
									<div key={i} className="w-full flex flex-col items-center">
										<div
											className="relative py-4 flex items-center justify-between rounded-sm bg-gradient-to-r from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20"
											style={{ width: `${widthPercent}%` }}
										>
											<div className="flex items-center gap-3 pl-4">
												<span className="text-xl">{step.icon}</span>
												<span className="font-medium">{step.label}</span>
											</div>
											<div className="pr-4 text-right">
												<span className="font-semibold">{step.value.toLocaleString()}</span>
												<span className="text-xs text-muted-foreground ml-2">({convRate}%)</span>
											</div>
										</div>
										{i < steps.length - 1 && (
											<div className="py-2 flex items-center gap-2 text-muted-foreground">
												<ArrowDown className="size-4" />
												<span className="text-xs">
													{((steps[i + 1].value / step.value) * 100).toFixed(1)}% continue
												</span>
											</div>
										)}
									</div>
								);
							})}
						</div>
						<div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
							<div className="text-center">
								<p className="text-xs text-muted-foreground">Total Drop-off</p>
								<p className="text-lg font-semibold text-rose-500">
									{(((steps[0].value - steps[steps.length - 1].value) / steps[0].value) * 100).toFixed(1)}%
								</p>
							</div>
							<div className="text-center">
								<p className="text-xs text-muted-foreground">Avg Step Conv.</p>
								<p className="text-lg font-semibold text-amber-500">
									{(Math.pow(steps[steps.length - 1].value / steps[0].value, 1 / (steps.length - 1)) * 100).toFixed(1)}%
								</p>
							</div>
							<div className="text-center">
								<p className="text-xs text-muted-foreground">Overall Conv.</p>
								<p className="text-lg font-semibold text-emerald-500">
									{((steps[steps.length - 1].value / steps[0].value) * 100).toFixed(2)}%
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
