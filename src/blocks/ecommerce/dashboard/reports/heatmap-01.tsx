'use client';

import { Clock, TrendingUp } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type HeatmapCell = {
	hour: string;
	day: string;
	value: number;
};

type CellProps = {
	value: number;
	maxValue: number;
};

const getIntensity = (value: number, maxValue: number) => {
	const ratio = value / maxValue;
	if (ratio > 0.8) return 'bg-primary';
	if (ratio > 0.6) return 'bg-primary/80';
	if (ratio > 0.4) return 'bg-primary/60';
	if (ratio > 0.2) return 'bg-primary/40';
	return 'bg-primary/20';
};

const HeatCell = ({ value, maxValue }: CellProps) => (
	<div
		className={`flex size-8 items-center justify-center rounded text-xs font-medium text-primary-foreground @sm:size-10 ${getIntensity(value, maxValue)}`}
		title={`${value} orders`}
	>
		{value}
	</div>
);

export default function Main() {
	const hours = [
		'6am',
		'8am',
		'10am',
		'12pm',
		'2pm',
		'4pm',
		'6pm',
		'8pm',
		'10pm',
	];
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	const data: number[][] = [
		[12, 28, 45, 62, 48, 35, 52, 38, 18], // Mon
		[15, 32, 48, 58, 52, 42, 48, 35, 22], // Tue
		[18, 35, 52, 65, 55, 45, 55, 42, 25], // Wed
		[14, 30, 50, 68, 58, 48, 58, 45, 28], // Thu
		[22, 42, 58, 72, 65, 58, 68, 52, 32], // Fri
		[35, 55, 68, 85, 78, 72, 82, 65, 45], // Sat
		[28, 48, 62, 78, 72, 65, 75, 58, 38], // Sun
	];

	const maxValue = Math.max(...data.flat());

	const peakTimes = [
		{ label: 'Peak Day', value: 'Saturday', subtext: '585 orders' },
		{ label: 'Peak Hour', value: '12pm - 2pm', subtext: 'Avg 72 orders' },
		{ label: 'Lowest', value: 'Monday 6am', subtext: '12 orders' },
		{ label: 'Weekly Avg', value: '48', subtext: 'Orders/hour' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Clock className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Sales Activity Heatmap
								</CardTitle>
								<CardDescription>Order volume by day and time</CardDescription>
							</div>
						</div>
						<Badge className="bg-primary/20 text-primary">
							<TrendingUp className="mr-1 size-3" />
							+15% vs last week
						</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{peakTimes.map((p, i) => (
								<Card key={i} className="border-border/30 bg-muted/20">
									<CardContent className="p-4">
										<p className="text-sm text-muted-foreground">{p.label}</p>
										<p className="mt-1 text-xl font-bold">{p.value}</p>
										<p className="text-xs text-muted-foreground">{p.subtext}</p>
									</CardContent>
								</Card>
							))}
						</div>
						<Card className="overflow-x-auto border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<div className="inline-block min-w-full">
									<div className="mb-2 flex gap-1 pl-12">
										{hours.map((h) => (
											<div
												key={h}
												className="flex size-8 items-center justify-center text-xs text-muted-foreground @sm:size-10"
											>
												{h}
											</div>
										))}
									</div>
									{days.map((day, dayIndex) => (
										<div key={day} className="flex items-center gap-1">
											<div className="w-10 text-right text-sm text-muted-foreground">
												{day}
											</div>
											<div className="flex gap-1">
												{data[dayIndex].map((value, hourIndex) => (
													<HeatCell
														key={`${dayIndex}-${hourIndex}`}
														value={value}
														maxValue={maxValue}
													/>
												))}
											</div>
										</div>
									))}
								</div>
								<div className="mt-4 flex items-center justify-center gap-2">
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
