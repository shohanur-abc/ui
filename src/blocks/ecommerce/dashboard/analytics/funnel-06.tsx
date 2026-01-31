'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FunnelChannel = {
	channel: string;
	steps: { label: string; value: number }[];
};

const channels: FunnelChannel[] = [
	{
		channel: 'Organic',
		steps: [
			{ label: 'Visit', value: 25000 },
			{ label: 'View', value: 12000 },
			{ label: 'Cart', value: 3200 },
			{ label: 'Buy', value: 1450 },
		],
	},
	{
		channel: 'Paid',
		steps: [
			{ label: 'Visit', value: 18000 },
			{ label: 'View', value: 9500 },
			{ label: 'Cart', value: 2800 },
			{ label: 'Buy', value: 980 },
		],
	},
	{
		channel: 'Social',
		steps: [
			{ label: 'Visit', value: 12000 },
			{ label: 'View', value: 4500 },
			{ label: 'Cart', value: 850 },
			{ label: 'Buy', value: 280 },
		],
	},
];

const maxValue = Math.max(...channels.flatMap((c) => c.steps.map((s) => s.value)));
const colors = ['bg-cyan-500', 'bg-purple-500', 'bg-amber-500'];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-sm font-medium">Channel Funnels</CardTitle>
								<p className="text-xs text-muted-foreground">Conversion by traffic source</p>
							</div>
							<div className="flex items-center gap-4 text-xs">
								{channels.map((c, i) => (
									<div key={i} className="flex items-center gap-2">
										<div className={`size-3 rounded-sm ${colors[i]}`} />
										<span>{c.channel}</span>
									</div>
								))}
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="space-y-6">
							{channels[0].steps.map((_, stepIndex) => (
								<div key={stepIndex}>
									<p className="text-xs text-muted-foreground mb-2">{channels[0].steps[stepIndex].label}</p>
									<div className="space-y-2">
										{channels.map((channel, channelIndex) => {
											const step = channel.steps[stepIndex];
											const width = (step.value / maxValue) * 100;
											const convRate = stepIndex > 0
												? ((step.value / channel.steps[stepIndex - 1].value) * 100).toFixed(1)
												: '100';
											
											return (
												<div key={channelIndex} className="flex items-center gap-3">
													<span className="text-xs w-14">{channel.channel}</span>
													<div className="flex-1 h-5 bg-muted/30 rounded-sm overflow-hidden">
														<div
															className={`h-full ${colors[channelIndex]}`}
															style={{ width: `${width}%` }}
														/>
													</div>
													<span className="text-xs w-16 text-right">{step.value.toLocaleString()}</span>
													<span className="text-xs w-12 text-right text-muted-foreground">
														{convRate}%
													</span>
												</div>
											);
										})}
									</div>
								</div>
							))}
						</div>
						<div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
							{channels.map((channel, i) => {
								const overallConv = ((channel.steps[3].value / channel.steps[0].value) * 100).toFixed(2);
								return (
									<div key={i} className="text-center">
										<p className="text-xs text-muted-foreground">{channel.channel} Conv.</p>
										<p className={`text-lg font-semibold ${i === 0 ? 'text-cyan-500' : i === 1 ? 'text-purple-500' : 'text-amber-500'}`}>
											{overallConv}%
										</p>
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
