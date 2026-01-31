'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Milestone = {
	label: string;
	value: number;
	achieved: boolean;
};

type Goal = {
	title: string;
	current: number;
	target: number;
	milestones: Milestone[];
};

const goals: Goal[] = [
	{
		title: 'Annual Revenue',
		current: 845000,
		target: 1000000,
		milestones: [
			{ label: '25%', value: 250000, achieved: true },
			{ label: '50%', value: 500000, achieved: true },
			{ label: '75%', value: 750000, achieved: true },
			{ label: '100%', value: 1000000, achieved: false },
		],
	},
	{
		title: 'Customer Acquisition',
		current: 3200,
		target: 5000,
		milestones: [
			{ label: '1K', value: 1000, achieved: true },
			{ label: '2K', value: 2000, achieved: true },
			{ label: '3K', value: 3000, achieved: true },
			{ label: '4K', value: 4000, achieved: false },
			{ label: '5K', value: 5000, achieved: false },
		],
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-6">
					{goals.map((goal, i) => {
						const percent = (goal.current / goal.target) * 100;
						
						return (
							<Card key={i} className="border-border/50 bg-card/80 backdrop-blur-sm">
								<CardHeader className="pb-2">
									<div className="flex items-center justify-between">
										<CardTitle className="text-sm font-medium">{goal.title}</CardTitle>
										<Badge variant="outline" className={percent >= 100 ? 'text-emerald-500 border-emerald-500/30' : ''}>
											{percent.toFixed(0)}%
										</Badge>
									</div>
								</CardHeader>
								<CardContent className="pt-4">
									<div className="relative">
										{/* Progress bar */}
										<div className="h-3 bg-muted/30 rounded-full overflow-hidden">
											<div
												className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
												style={{ width: `${Math.min(percent, 100)}%` }}
											/>
										</div>
										
										{/* Milestone markers */}
										<div className="relative mt-1">
											{goal.milestones.map((milestone, j) => {
												const position = (milestone.value / goal.target) * 100;
												return (
													<div
														key={j}
														className="absolute -top-4 transform -translate-x-1/2"
														style={{ left: `${position}%` }}
													>
														<div className={`size-3 rounded-full border-2 ${milestone.achieved ? 'bg-emerald-500 border-emerald-500' : 'bg-background border-muted-foreground'}`} />
														<span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap">
															{milestone.label}
														</span>
													</div>
												);
											})}
										</div>
									</div>
									
									<div className="mt-8 flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Current</span>
										<span className="font-semibold">${goal.current.toLocaleString()}</span>
									</div>
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Remaining</span>
										<span className="text-muted-foreground">${(goal.target - goal.current).toLocaleString()}</span>
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
