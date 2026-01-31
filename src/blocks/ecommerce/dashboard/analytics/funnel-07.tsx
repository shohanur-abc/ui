'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type FunnelStep = {
	label: string;
	mobile: number;
	desktop: number;
};

const steps: FunnelStep[] = [
	{ label: 'Sessions', mobile: 38000, desktop: 42000 },
	{ label: 'Product Views', mobile: 18500, desktop: 28000 },
	{ label: 'Add to Cart', mobile: 4200, desktop: 8500 },
	{ label: 'Checkout', mobile: 1850, desktop: 4200 },
	{ label: 'Purchase', mobile: 980, desktop: 2850 },
];

const mobileMax = steps[0].mobile;
const desktopMax = steps[0].desktop;

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-sm font-medium">Device Funnel Comparison</CardTitle>
								<p className="text-xs text-muted-foreground">Mobile vs Desktop conversion</p>
							</div>
							<div className="flex items-center gap-4 text-xs">
								<div className="flex items-center gap-2">
									<div className="size-3 rounded-sm bg-cyan-500" />
									<span>Desktop</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="size-3 rounded-sm bg-purple-500" />
									<span>Mobile</span>
								</div>
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="grid grid-cols-1 @lg:grid-cols-2 gap-8">
							{/* Desktop */}
							<div>
								<div className="flex items-center gap-2 mb-4">
									<span className="text-sm font-medium">Desktop</span>
									<Badge variant="outline" className="text-xs">
										Conv: {((steps[4].desktop / steps[0].desktop) * 100).toFixed(2)}%
									</Badge>
								</div>
								<div className="space-y-2">
									{steps.map((step, i) => {
										const width = (step.desktop / desktopMax) * 100;
										return (
											<div key={i} className="flex items-center gap-3">
												<span className="text-xs w-24 truncate">{step.label}</span>
												<div className="flex-1 h-6 bg-muted/30 rounded-sm overflow-hidden">
													<div
														className="h-full bg-cyan-500"
														style={{ width: `${width}%` }}
													/>
												</div>
												<span className="text-xs w-14 text-right">{step.desktop.toLocaleString()}</span>
											</div>
										);
									})}
								</div>
							</div>

							{/* Mobile */}
							<div>
								<div className="flex items-center gap-2 mb-4">
									<span className="text-sm font-medium">Mobile</span>
									<Badge variant="outline" className="text-xs">
										Conv: {((steps[4].mobile / steps[0].mobile) * 100).toFixed(2)}%
									</Badge>
								</div>
								<div className="space-y-2">
									{steps.map((step, i) => {
										const width = (step.mobile / mobileMax) * 100;
										return (
											<div key={i} className="flex items-center gap-3">
												<span className="text-xs w-24 truncate">{step.label}</span>
												<div className="flex-1 h-6 bg-muted/30 rounded-sm overflow-hidden">
													<div
														className="h-full bg-purple-500"
														style={{ width: `${width}%` }}
													/>
												</div>
												<span className="text-xs w-14 text-right">{step.mobile.toLocaleString()}</span>
											</div>
										);
									})}
								</div>
							</div>
						</div>

						<div className="mt-6 pt-4 border-t border-border/50">
							<div className="grid grid-cols-5 gap-2">
								{steps.map((step, i) => {
									const mobileRate = i > 0 ? ((step.mobile / steps[i - 1].mobile) * 100).toFixed(0) : '100';
									const desktopRate = i > 0 ? ((step.desktop / steps[i - 1].desktop) * 100).toFixed(0) : '100';
									const diff = parseFloat(desktopRate) - parseFloat(mobileRate);
									
									return (
										<div key={i} className="text-center">
											<p className="text-[10px] text-muted-foreground truncate">{step.label}</p>
											<p className={`text-xs font-medium ${diff > 0 ? 'text-cyan-500' : diff < 0 ? 'text-purple-500' : ''}`}>
												{diff > 0 ? '+' : ''}{diff.toFixed(0)}%
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
