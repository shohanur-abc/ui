'use client';

import { Grid3x3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type HeatmapData = {
	hour: string;
	data: { day: string; value: number }[];
};

type HeatmapChartCardProps = {
	title: string;
	description: string;
	heatmapData: HeatmapData[];
	days: string[];
};

const HeatmapChartCard = ({
	title,
	description,
	heatmapData,
	days,
}: HeatmapChartCardProps) => {
	const maxValue = Math.max(
		...heatmapData.flatMap((h) => h.data.map((d) => d.value)),
	);

	const getColor = (value: number) => {
		const intensity = value / maxValue;
		if (intensity < 0.2) return 'bg-primary/10';
		if (intensity < 0.4) return 'bg-primary/25';
		if (intensity < 0.6) return 'bg-primary/45';
		if (intensity < 0.8) return 'bg-primary/65';
		return 'bg-primary/90';
	};

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardHeader className="flex flex-row items-center gap-3 pb-2">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<Grid3x3 className="size-4" />
				</div>
				<div>
					<CardTitle className="text-base font-semibold">{title}</CardTitle>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto">
					<div className="min-w-[500px]">
						<div className="grid grid-cols-[auto_repeat(7,1fr)] gap-1">
							<div />
							{days.map((day) => (
								<div
									key={day}
									className="text-center text-xs text-muted-foreground py-2"
								>
									{day}
								</div>
							))}
							{heatmapData.map((row) => (
								<>
									<div
										key={`hour-${row.hour}`}
										className="text-xs text-muted-foreground pr-3 py-2 text-right"
									>
										{row.hour}
									</div>
									{row.data.map((cell, idx) => (
										<div
											key={`${row.hour}-${cell.day}`}
											className={`h-8 rounded-sm ${getColor(cell.value)} transition-all hover:ring-2 hover:ring-primary cursor-pointer flex items-center justify-center`}
											title={`${cell.day} ${row.hour}: ${cell.value} orders`}
										>
											<span className="text-xs font-medium opacity-80">
												{cell.value}
											</span>
										</div>
									))}
								</>
							))}
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center gap-2 mt-4">
					<span className="text-xs text-muted-foreground">Low</span>
					<div className="flex gap-1">
						{['bg-primary/10', 'bg-primary/25', 'bg-primary/45', 'bg-primary/65', 'bg-primary/90'].map(
							(color, idx) => (
								<div
									key={idx}
									className={`size-4 rounded-sm ${color}`}
								/>
							),
						)}
					</div>
					<span className="text-xs text-muted-foreground">High</span>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

	const heatmapData: HeatmapData[] = hours.map((hour) => ({
		hour,
		data: days.map((day) => ({
			day,
			value: Math.floor(Math.random() * 50) + 10,
		})),
	}));

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<HeatmapChartCard
					title="Order Heatmap"
					description="Orders by day and hour"
					heatmapData={heatmapData}
					days={days}
				/>
			</div>
		</section>
	);
}
