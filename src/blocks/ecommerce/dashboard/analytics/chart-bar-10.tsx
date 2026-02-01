'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type HeatmapCell = { row: string; col: string; value: number };

const HeatmapChart = ({
	data,
	rows,
	cols,
}: {
	data: HeatmapCell[];
	rows: string[];
	cols: string[];
}) => {
	const values = data.map((d) => d.value);
	const max = Math.max(...values);
	const min = Math.min(...values);
	const range = max - min || 1;

	const getIntensity = (value: number) => (value - min) / range;
	const getColor = (value: number) => {
		const intensity = getIntensity(value);
		return `rgba(59, 130, 246, ${0.1 + intensity * 0.8})`;
	};

	const getValue = (row: string, col: string) => {
		const cell = data.find((d) => d.row === row && d.col === col);
		return cell ? cell.value : 0;
	};

	return (
		<div className="overflow-x-auto">
			<table className="w-full border-separate border-spacing-1">
				<thead>
					<tr>
						<th className="text-xs text-muted-foreground font-normal p-2" />
						{cols.map((col, i) => (
							<th
								key={i}
								className="text-xs text-muted-foreground font-normal p-2 text-center min-w-[40px]"
							>
								{col}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => (
						<tr key={i}>
							<td className="text-xs text-muted-foreground font-normal p-2 text-right whitespace-nowrap">
								{row}
							</td>
							{cols.map((col, j) => {
								const value = getValue(row, col);
								return (
									<td
										key={j}
										className="p-2 text-center rounded transition-all duration-300 hover:ring-2 hover:ring-primary/50"
										style={{ backgroundColor: getColor(value) }}
									>
										<span className="text-xs font-medium">{value}</span>
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

const hours = ['6am', '9am', '12pm', '3pm', '6pm', '9pm'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const heatmapData: HeatmapCell[] = days.flatMap((day) =>
	hours.map((hour) => ({
		row: day,
		col: hour,
		value: Math.floor(
			Math.random() * 100 +
				(day === 'Sat' || day === 'Sun' ? 20 : 0) +
				(hour === '12pm' || hour === '3pm' ? 30 : 0),
		),
	})),
);

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Activity Heatmap
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							User activity by day and time
						</p>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-end gap-2 mb-4">
							<span className="text-xs text-muted-foreground">Less</span>
							<div className="flex gap-1">
								{[0.1, 0.3, 0.5, 0.7, 0.9].map((opacity, i) => (
									<div
										key={i}
										className="w-4 h-4 rounded"
										style={{
											backgroundColor: `rgba(59, 130, 246, ${opacity})`,
										}}
									/>
								))}
							</div>
							<span className="text-xs text-muted-foreground">More</span>
						</div>
						<HeatmapChart data={heatmapData} rows={days} cols={hours} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
