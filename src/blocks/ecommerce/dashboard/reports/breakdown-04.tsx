'use client';

import { Clock } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type TimeSlotProps = {
	time: string;
	orders: number;
	revenue: string;
	percentage: number;
	peak?: boolean;
};

const TimeSlot = ({
	time,
	orders,
	revenue,
	percentage,
	peak,
}: TimeSlotProps) => (
	<div
		className={`rounded-lg border p-3 ${peak ? 'border-primary bg-primary/5' : 'border-border/30 bg-muted/20'}`}
	>
		<div className="flex items-center justify-between">
			<span className="text-sm font-medium">{time}</span>
			{peak && (
				<Badge variant="default" className="text-[10px]">
					Peak
				</Badge>
			)}
		</div>
		<div className="mt-2">
			<Progress value={percentage} className="h-2" />
		</div>
		<div className="mt-2 flex justify-between text-xs">
			<span className="text-muted-foreground">{orders} orders</span>
			<span className="font-medium">{revenue}</span>
		</div>
	</div>
);

type DayBreakdownProps = {
	day: string;
	orders: string;
	revenue: string;
	percentage: number;
};

const DayBreakdown = ({
	day,
	orders,
	revenue,
	percentage,
}: DayBreakdownProps) => (
	<div className="flex items-center gap-4 border-b border-border/30 py-3 last:border-0">
		<div className="w-20 font-medium">{day}</div>
		<div className="flex-1">
			<Progress value={percentage} className="h-2" />
		</div>
		<div className="w-20 text-right text-sm text-muted-foreground">
			{orders}
		</div>
		<div className="w-24 text-right font-medium">{revenue}</div>
	</div>
);

export default function Main() {
	const timeSlots: TimeSlotProps[] = [
		{ time: '12am - 4am', orders: 245, revenue: '$18,500', percentage: 8 },
		{ time: '4am - 8am', orders: 380, revenue: '$32,400', percentage: 12 },
		{
			time: '8am - 12pm',
			orders: 1250,
			revenue: '$98,500',
			percentage: 42,
			peak: true,
		},
		{ time: '12pm - 4pm', orders: 980, revenue: '$85,200', percentage: 35 },
		{
			time: '4pm - 8pm',
			orders: 1180,
			revenue: '$92,800',
			percentage: 40,
			peak: true,
		},
		{ time: '8pm - 12am', orders: 720, revenue: '$58,600', percentage: 25 },
	];

	const days: DayBreakdownProps[] = [
		{ day: 'Monday', orders: '1,250', revenue: '$98,400', percentage: 68 },
		{ day: 'Tuesday', orders: '1,180', revenue: '$92,200', percentage: 64 },
		{ day: 'Wednesday', orders: '1,320', revenue: '$105,800', percentage: 73 },
		{ day: 'Thursday', orders: '1,280', revenue: '$102,400', percentage: 71 },
		{ day: 'Friday', orders: '1,580', revenue: '$128,500', percentage: 89 },
		{ day: 'Saturday', orders: '1,850', revenue: '$145,200', percentage: 100 },
		{ day: 'Sunday', orders: '1,420', revenue: '$112,500', percentage: 78 },
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
									Time-Based Sales Breakdown
								</CardTitle>
								<CardDescription>
									Order distribution by time of day and day of week
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div>
							<p className="mb-4 text-sm font-medium">By Time of Day</p>
							<div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-6">
								{timeSlots.map((slot, i) => (
									<TimeSlot key={i} {...slot} />
								))}
							</div>
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<p className="mb-4 text-sm font-medium">By Day of Week</p>
								<div className="overflow-x-auto">
									<div className="min-w-[400px]">
										<div className="mb-2 flex items-center gap-4 text-xs text-muted-foreground">
											<div className="w-20">Day</div>
											<div className="flex-1">Distribution</div>
											<div className="w-20 text-right">Orders</div>
											<div className="w-24 text-right">Revenue</div>
										</div>
										{days.map((day, i) => (
											<DayBreakdown key={i} {...day} />
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
