'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FunnelStep = {
	label: string;
	value: number;
};

const steps: FunnelStep[] = [
	{ label: 'Visitors', value: 52000 },
	{ label: 'Leads', value: 8500 },
	{ label: 'Qualified', value: 3200 },
	{ label: 'Proposals', value: 1450 },
	{ label: 'Closed Won', value: 580 },
];

const maxValue = steps[0].value;

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Sales Funnel</CardTitle>
						<p className="text-xs text-muted-foreground">B2B sales pipeline visualization</p>
					</CardHeader>
					<CardContent className="pt-6">
						<div className="relative flex flex-col items-center">
							<svg viewBox="0 0 400 300" className="w-full max-w-md">
								{steps.map((step, i) => {
									const topWidth = (steps[i].value / maxValue) * 380;
									const bottomWidth = i < steps.length - 1 ? (steps[i + 1].value / maxValue) * 380 : topWidth * 0.8;
									const y = i * 55 + 10;
									const topX = (400 - topWidth) / 2;
									const bottomX = (400 - bottomWidth) / 2;
									const convRate = i < steps.length - 1 ? ((steps[i + 1].value / step.value) * 100).toFixed(0) : null;
									
									const colors = ['#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc', '#10b981'];
									
									return (
										<g key={i}>
											<path
												d={`M ${topX} ${y} L ${topX + topWidth} ${y} L ${bottomX + bottomWidth} ${y + 45} L ${bottomX} ${y + 45} Z`}
												fill={colors[i]}
												opacity={0.9}
											/>
											<text
												x={200}
												y={y + 20}
												textAnchor="middle"
												className="fill-slate-900 text-xs font-medium"
											>
												{step.label}
											</text>
											<text
												x={200}
												y={y + 36}
												textAnchor="middle"
												className="fill-slate-900 text-xs"
											>
												{step.value.toLocaleString()}
											</text>
											{convRate && (
												<text
													x={380}
													y={y + 45}
													textAnchor="end"
													className="fill-current text-[10px] text-muted-foreground"
												>
													{convRate}% →
												</text>
											)}
										</g>
									);
								})}
							</svg>
						</div>
						<div className="mt-4 grid grid-cols-2 gap-4 @md:grid-cols-4 pt-4 border-t border-border/50">
							<div className="text-center">
								<p className="text-xs text-muted-foreground">Lead Rate</p>
								<p className="text-lg font-semibold">
									{((steps[1].value / steps[0].value) * 100).toFixed(1)}%
								</p>
							</div>
							<div className="text-center">
								<p className="text-xs text-muted-foreground">Qual. Rate</p>
								<p className="text-lg font-semibold">
									{((steps[2].value / steps[1].value) * 100).toFixed(1)}%
								</p>
							</div>
							<div className="text-center">
								<p className="text-xs text-muted-foreground">Win Rate</p>
								<p className="text-lg font-semibold">
									{((steps[4].value / steps[3].value) * 100).toFixed(1)}%
								</p>
							</div>
							<div className="text-center">
								<p className="text-xs text-muted-foreground">Overall</p>
								<p className="text-lg font-semibold text-emerald-500">
									{((steps[4].value / steps[0].value) * 100).toFixed(2)}%
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
