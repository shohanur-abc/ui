'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type FunnelData = {
	period: string;
	steps: { label: string; value: number }[];
};

const funnelData: FunnelData[] = [
	{
		period: 'week',
		steps: [
			{ label: 'Visitors', value: 12500 },
			{ label: 'Engaged', value: 7800 },
			{ label: 'Cart', value: 2100 },
			{ label: 'Purchased', value: 850 },
		],
	},
	{
		period: 'month',
		steps: [
			{ label: 'Visitors', value: 48000 },
			{ label: 'Engaged', value: 28500 },
			{ label: 'Cart', value: 8200 },
			{ label: 'Purchased', value: 3150 },
		],
	},
	{
		period: 'quarter',
		steps: [
			{ label: 'Visitors', value: 145000 },
			{ label: 'Engaged', value: 82000 },
			{ label: 'Cart', value: 24500 },
			{ label: 'Purchased', value: 9800 },
		],
	},
];

const FunnelChart = ({ data }: { data: FunnelData }) => {
	const maxValue = data.steps[0].value;
	
	return (
		<div className="space-y-3">
			{data.steps.map((step, i) => {
				const width = (step.value / maxValue) * 100;
				const convRate = i > 0 ? ((step.value / data.steps[i - 1].value) * 100).toFixed(1) : null;
				
				return (
					<div key={i}>
						<div className="flex items-center justify-between mb-1 text-sm">
							<span className="font-medium">{step.label}</span>
							<div className="flex items-center gap-3">
								{convRate && (
									<span className="text-xs text-muted-foreground">{convRate}% from prev</span>
								)}
								<span className="font-medium">{step.value.toLocaleString()}</span>
							</div>
						</div>
						<div className="h-8 bg-muted/30 rounded-sm overflow-hidden">
							<div
								className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
								style={{ width: `${width}%` }}
							/>
						</div>
					</div>
				);
			})}
			
			<div className="pt-4 border-t border-border/50 grid grid-cols-3 gap-4 text-center">
				<div>
					<p className="text-xs text-muted-foreground">Engagement Rate</p>
					<p className="text-lg font-semibold">
						{((data.steps[1].value / data.steps[0].value) * 100).toFixed(1)}%
					</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Cart Rate</p>
					<p className="text-lg font-semibold">
						{((data.steps[2].value / data.steps[0].value) * 100).toFixed(1)}%
					</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Conversion</p>
					<p className="text-lg font-semibold text-emerald-500">
						{((data.steps[3].value / data.steps[0].value) * 100).toFixed(2)}%
					</p>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Funnel by Period</CardTitle>
						<p className="text-xs text-muted-foreground">Conversion trends over time</p>
					</CardHeader>
					<CardContent className="pt-4">
						<Tabs defaultValue="month" className="w-full">
							<TabsList className="grid w-full grid-cols-3 mb-4">
								<TabsTrigger value="week">This Week</TabsTrigger>
								<TabsTrigger value="month">This Month</TabsTrigger>
								<TabsTrigger value="quarter">This Quarter</TabsTrigger>
							</TabsList>
							{funnelData.map((data) => (
								<TabsContent key={data.period} value={data.period}>
									<FunnelChart data={data} />
								</TabsContent>
							))}
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
