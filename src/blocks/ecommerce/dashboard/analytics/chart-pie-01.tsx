'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PieSlice = { label: string; value: number; color: string };

const PieChart = ({ data }: { data: PieSlice[] }) => {
	const total = data.reduce((a, b) => a + b.value, 0);
	let currentAngle = -90;

	const slices = data.map((slice) => {
		const angle = (slice.value / total) * 360;
		const startAngle = currentAngle;
		const endAngle = currentAngle + angle;
		currentAngle = endAngle;

		const startRad = (startAngle * Math.PI) / 180;
		const endRad = (endAngle * Math.PI) / 180;

		const x1 = 50 + 40 * Math.cos(startRad);
		const y1 = 50 + 40 * Math.sin(startRad);
		const x2 = 50 + 40 * Math.cos(endRad);
		const y2 = 50 + 40 * Math.sin(endRad);

		const largeArc = angle > 180 ? 1 : 0;

		const d = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;

		return {
			...slice,
			d,
			percentage: ((slice.value / total) * 100).toFixed(1),
		};
	});

	return (
		<div className="flex flex-col @md:flex-row items-center gap-8">
			<div className="relative w-48 h-48">
				<svg viewBox="0 0 100 100" className="w-full h-full">
					{slices.map((slice, i) => (
						<path
							key={i}
							d={slice.d}
							fill={slice.color}
							stroke="hsl(var(--background))"
							strokeWidth="0.5"
							className="transition-all duration-300 hover:opacity-80"
						/>
					))}
				</svg>
			</div>
			<div className="flex flex-col gap-3">
				{slices.map((slice, i) => (
					<div key={i} className="flex items-center gap-3">
						<div
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: slice.color }}
						/>
						<span className="text-sm">{slice.label}</span>
						<span className="text-sm text-muted-foreground ml-auto">
							{slice.percentage}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

const revenueBySource: PieSlice[] = [
	{ label: 'Direct Sales', value: 42000, color: '#3b82f6' },
	{ label: 'Marketplace', value: 28000, color: '#22c55e' },
	{ label: 'Affiliates', value: 18000, color: '#f59e0b' },
	{ label: 'Wholesale', value: 12000, color: '#a855f7' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Revenue by Source
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Distribution across sales channels
						</p>
					</CardHeader>
					<CardContent>
						<PieChart data={revenueBySource} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
