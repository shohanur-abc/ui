'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type Goal = {
	label: string;
	current: number;
	target: number;
	unit: string;
};

const goals: Goal[] = [
	{ label: 'Monthly Revenue', current: 84500, target: 100000, unit: '$' },
	{ label: 'New Customers', current: 342, target: 500, unit: '' },
	{ label: 'Orders Completed', current: 1850, target: 2000, unit: '' },
	{ label: 'Avg Order Value', current: 78, target: 85, unit: '$' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Monthly Goals</CardTitle>
						<p className="text-xs text-muted-foreground">Track progress towards targets</p>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
							{goals.map((goal, i) => {
								const percent = Math.min((goal.current / goal.target) * 100, 100);
								const isComplete = percent >= 100;
								
								return (
									<div key={i} className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium">{goal.label}</span>
											<span className={`text-sm font-semibold ${isComplete ? 'text-emerald-500' : ''}`}>
												{percent.toFixed(0)}%
											</span>
										</div>
										<Progress value={percent} className="h-2" />
										<div className="flex items-center justify-between text-xs text-muted-foreground">
											<span>
												{goal.unit}{goal.current.toLocaleString()}
											</span>
											<span>
												Target: {goal.unit}{goal.target.toLocaleString()}
											</span>
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
