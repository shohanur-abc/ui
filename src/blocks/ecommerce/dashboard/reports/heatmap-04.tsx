'use client';

import {
	Users,
	UserCheck,
	Heart,
	ShoppingCart,
	TrendingUp,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type SegmentData = {
	segment: string;
	metrics: {
		name: string;
		value: number;
		max: number;
	}[];
};

type MetricCellProps = {
	value: number;
	max: number;
	label: string;
};

const getIntensity = (value: number, max: number) => {
	const ratio = value / max;
	if (ratio > 0.8) return 'bg-primary';
	if (ratio > 0.6) return 'bg-primary/80';
	if (ratio > 0.4) return 'bg-primary/60';
	if (ratio > 0.2) return 'bg-primary/40';
	return 'bg-primary/20';
};

const MetricCell = ({ value, max, label }: MetricCellProps) => (
	<div className="flex flex-col items-center gap-1">
		<div
			className={`flex size-12 items-center justify-center rounded-lg text-sm font-bold text-primary-foreground @sm:size-14 ${getIntensity(value, max)}`}
		>
			{value}%
		</div>
		<span className="text-xs text-muted-foreground">{label}</span>
	</div>
);

export default function Main() {
	const metricLabels = [
		'Purchase',
		'Retention',
		'Referral',
		'Upsell',
		'Loyalty',
	];

	const segments: SegmentData[] = [
		{
			segment: 'New Customers',
			metrics: [
				{ name: 'Purchase', value: 28, max: 100 },
				{ name: 'Retention', value: 42, max: 100 },
				{ name: 'Referral', value: 15, max: 100 },
				{ name: 'Upsell', value: 22, max: 100 },
				{ name: 'Loyalty', value: 18, max: 100 },
			],
		},
		{
			segment: 'Returning',
			metrics: [
				{ name: 'Purchase', value: 65, max: 100 },
				{ name: 'Retention', value: 78, max: 100 },
				{ name: 'Referral', value: 35, max: 100 },
				{ name: 'Upsell', value: 48, max: 100 },
				{ name: 'Loyalty', value: 55, max: 100 },
			],
		},
		{
			segment: 'VIP',
			metrics: [
				{ name: 'Purchase', value: 92, max: 100 },
				{ name: 'Retention', value: 95, max: 100 },
				{ name: 'Referral', value: 72, max: 100 },
				{ name: 'Upsell', value: 85, max: 100 },
				{ name: 'Loyalty', value: 88, max: 100 },
			],
		},
		{
			segment: 'At Risk',
			metrics: [
				{ name: 'Purchase', value: 12, max: 100 },
				{ name: 'Retention', value: 25, max: 100 },
				{ name: 'Referral', value: 8, max: 100 },
				{ name: 'Upsell', value: 15, max: 100 },
				{ name: 'Loyalty', value: 22, max: 100 },
			],
		},
		{
			segment: 'Churned',
			metrics: [
				{ name: 'Purchase', value: 5, max: 100 },
				{ name: 'Retention', value: 8, max: 100 },
				{ name: 'Referral', value: 2, max: 100 },
				{ name: 'Upsell', value: 4, max: 100 },
				{ name: 'Loyalty', value: 6, max: 100 },
			],
		},
	];

	const segmentStats = [
		{
			icon: Users,
			label: 'Total Customers',
			value: '42,850',
			subtext: '+18% MoM',
		},
		{
			icon: UserCheck,
			label: 'VIP Customers',
			value: '4,285',
			subtext: '10% of total',
		},
		{
			icon: Heart,
			label: 'Loyalty Rate',
			value: '52%',
			subtext: 'Avg across segments',
		},
		{
			icon: ShoppingCart,
			label: 'Repeat Purchase',
			value: '48%',
			subtext: '+5% vs last quarter',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Users className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Customer Segment Heatmap
								</CardTitle>
								<CardDescription>
									Behavior metrics across customer segments
								</CardDescription>
							</div>
						</div>
						<Badge className="bg-primary/20 text-primary">
							<TrendingUp className="mr-1 size-3" />
							Engagement Up
						</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{segmentStats.map((s, i) => (
								<Card key={i} className="border-border/30 bg-muted/20">
									<CardContent className="flex items-center gap-3 p-4">
										<div className="rounded-lg bg-primary/10 p-2">
											<s.icon className="size-5 text-primary" />
										</div>
										<div>
											<p className="text-sm text-muted-foreground">{s.label}</p>
											<p className="text-xl font-bold">{s.value}</p>
											<p className="text-xs text-muted-foreground">
												{s.subtext}
											</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
						<Card className="overflow-x-auto border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<div className="min-w-[600px]">
									<div className="mb-4 flex items-center gap-4 pl-28">
										{metricLabels.map((label) => (
											<div
												key={label}
												className="flex w-14 justify-center text-xs font-medium text-muted-foreground"
											>
												{label}
											</div>
										))}
									</div>
									<div className="space-y-3">
										{segments.map((seg, segIndex) => (
											<div key={segIndex} className="flex items-center gap-4">
												<div className="w-24 text-right text-sm font-medium">
													{seg.segment}
												</div>
												<div className="flex gap-4">
													{seg.metrics.map((m, mIndex) => (
														<MetricCell
															key={mIndex}
															value={m.value}
															max={m.max}
															label=""
														/>
													))}
												</div>
											</div>
										))}
									</div>
								</div>
								<div className="mt-6 flex items-center justify-center gap-2">
									<span className="text-xs text-muted-foreground">Low</span>
									<div className="flex gap-1">
										<div className="size-4 rounded bg-primary/20" />
										<div className="size-4 rounded bg-primary/40" />
										<div className="size-4 rounded bg-primary/60" />
										<div className="size-4 rounded bg-primary/80" />
										<div className="size-4 rounded bg-primary" />
									</div>
									<span className="text-xs text-muted-foreground">High</span>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
