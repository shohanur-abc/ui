'use client';

import * as React from 'react';
import { Package, Calendar, TrendingUp } from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type HeatmapCell = {
	day: string;
	hour: number;
	value: number;
};

type HeatmapProps = {
	data: HeatmapCell[];
	maxValue: number;
};

const Heatmap = ({ data, maxValue }: HeatmapProps) => {
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const hours = Array.from({ length: 24 }, (_, i) => i);

	const getColor = (value: number) => {
		const intensity = value / maxValue;
		if (intensity === 0) return 'bg-muted';
		if (intensity < 0.25) return 'bg-primary/20';
		if (intensity < 0.5) return 'bg-primary/40';
		if (intensity < 0.75) return 'bg-primary/60';
		return 'bg-primary';
	};

	const getValue = (day: string, hour: number) => {
		return data.find((d) => d.day === day && d.hour === hour)?.value || 0;
	};

	return (
		<div className="overflow-x-auto">
			<div className="min-w-[600px]">
				<div className="flex gap-1">
					<div className="w-12" />
					{hours
						.filter((h) => h % 3 === 0)
						.map((hour) => (
							<div
								key={hour}
								className="flex-1 text-center text-xs text-muted-foreground"
							>
								{hour.toString().padStart(2, '0')}:00
							</div>
						))}
				</div>
				{days.map((day) => (
					<div key={day} className="flex gap-1 mt-1">
						<div className="w-12 text-xs font-medium flex items-center">
							{day}
						</div>
						{hours.map((hour) => {
							const value = getValue(day, hour);
							return (
								<div
									key={hour}
									className={`flex-1 h-6 rounded ${getColor(value)} transition-colors cursor-pointer hover:ring-1 hover:ring-primary`}
									title={`${day} ${hour}:00 - ${value} orders`}
								/>
							);
						})}
					</div>
				))}
			</div>
			<div className="mt-4 flex items-center justify-center gap-2">
				<span className="text-xs text-muted-foreground">Low</span>
				<div className="flex gap-1">
					<div className="size-4 rounded bg-muted" />
					<div className="size-4 rounded bg-primary/20" />
					<div className="size-4 rounded bg-primary/40" />
					<div className="size-4 rounded bg-primary/60" />
					<div className="size-4 rounded bg-primary" />
				</div>
				<span className="text-xs text-muted-foreground">High</span>
			</div>
		</div>
	);
};

type InsightProps = {
	peakDay: string;
	peakHour: string;
	totalOrders: number;
};

const Insights = ({ peakDay, peakHour, totalOrders }: InsightProps) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		<div className="rounded-lg border p-4">
			<div className="flex items-center gap-2">
				<Calendar className="size-5 text-primary" />
				<span className="text-sm text-muted-foreground">Peak Day</span>
			</div>
			<p className="mt-2 text-xl font-bold">{peakDay}</p>
		</div>
		<div className="rounded-lg border p-4">
			<div className="flex items-center gap-2">
				<TrendingUp className="size-5 text-primary" />
				<span className="text-sm text-muted-foreground">Peak Hour</span>
			</div>
			<p className="mt-2 text-xl font-bold">{peakHour}</p>
		</div>
		<div className="rounded-lg border p-4">
			<div className="flex items-center gap-2">
				<Package className="size-5 text-primary" />
				<span className="text-sm text-muted-foreground">Total Orders</span>
			</div>
			<p className="mt-2 text-xl font-bold">{totalOrders.toLocaleString()}</p>
		</div>
	</div>
);

export default function Main() {
	const [metric, setMetric] = React.useState('orders');

	// Generate sample heatmap data
	const generateData = (): HeatmapCell[] => {
		const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		const data: HeatmapCell[] = [];

		days.forEach((day) => {
			for (let hour = 0; hour < 24; hour++) {
				let value = 0;
				// Higher values during business hours
				if (hour >= 9 && hour <= 17) {
					value = Math.floor(Math.random() * 50) + 30;
				} else if (hour >= 18 && hour <= 21) {
					value = Math.floor(Math.random() * 40) + 20;
				} else {
					value = Math.floor(Math.random() * 10);
				}
				// Lower on weekends
				if (day === 'Sat' || day === 'Sun') {
					value = Math.floor(value * 0.5);
				}
				data.push({ day, hour, value });
			}
		});

		return data;
	};

	const data = React.useMemo(() => generateData(), []);
	const maxValue = Math.max(...data.map((d) => d.value));
	const totalOrders = data.reduce((sum, d) => sum + d.value, 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">
									Activity Heatmap
								</CardTitle>
								<CardDescription>Order volume by day and hour</CardDescription>
							</div>
							<Select value={metric} onValueChange={setMetric}>
								<SelectTrigger className="w-32">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="orders">Orders</SelectItem>
									<SelectItem value="picks">Picks</SelectItem>
									<SelectItem value="shipments">Shipments</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<Insights
							peakDay="Thursday"
							peakHour="14:00 - 15:00"
							totalOrders={totalOrders}
						/>
						<Heatmap data={data} maxValue={maxValue} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
