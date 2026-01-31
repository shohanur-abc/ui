'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ProgressBarData = { label: string; value: number; target: number; color: string };

const ProgressBarChart = ({ data }: { data: ProgressBarData[] }) => {
	return (
		<div className="flex flex-col gap-6">
			{data.map((item, i) => {
				const progress = Math.min((item.value / item.target) * 100, 100);
				const achieved = item.value >= item.target;
				return (
					<div key={i} className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium">{item.label}</span>
							<div className="flex items-center gap-2">
								<span className="text-sm text-muted-foreground">
									{item.value.toLocaleString()} / {item.target.toLocaleString()}
								</span>
								{achieved && (
									<Badge variant="secondary" className="text-emerald-500 bg-emerald-500/10 text-xs">
										Achieved
									</Badge>
								)}
							</div>
						</div>
						<div className="relative h-3 bg-muted/30 rounded-full overflow-hidden">
							<div
								className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
								style={{ width: `${progress}%`, backgroundColor: item.color }}
							/>
							<div
								className="absolute inset-y-0 w-0.5 bg-foreground/50"
								style={{ left: '100%', transform: 'translateX(-100%)' }}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};

const goalData: ProgressBarData[] = [
	{ label: 'Revenue Target', value: 284500, target: 300000, color: '#3b82f6' },
	{ label: 'New Customers', value: 1250, target: 1000, color: '#22c55e' },
	{ label: 'Orders Processed', value: 4580, target: 5000, color: '#f59e0b' },
	{ label: 'Conversion Rate', value: 3.2, target: 4.0, color: '#a855f7' },
	{ label: 'Customer Satisfaction', value: 92, target: 95, color: '#ec4899' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
						<p className="text-xs text-muted-foreground">Monthly targets and achievements</p>
					</CardHeader>
					<CardContent>
						<ProgressBarChart data={goalData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
