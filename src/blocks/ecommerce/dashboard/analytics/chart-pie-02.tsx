'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DonutSlice = { label: string; value: number; color: string };

const DonutChart = ({
	data,
	centerLabel,
	centerValue,
}: {
	data: DonutSlice[];
	centerLabel: string;
	centerValue: string;
}) => {
	const total = data.reduce((a, b) => a + b.value, 0);
	let currentAngle = -90;

	const slices = data.map((slice) => {
		const angle = (slice.value / total) * 360;
		const startAngle = currentAngle;
		const endAngle = currentAngle + angle;
		currentAngle = endAngle;

		const startRad = (startAngle * Math.PI) / 180;
		const endRad = (endAngle * Math.PI) / 180;

		const outerR = 40;
		const innerR = 28;

		const x1Outer = 50 + outerR * Math.cos(startRad);
		const y1Outer = 50 + outerR * Math.sin(startRad);
		const x2Outer = 50 + outerR * Math.cos(endRad);
		const y2Outer = 50 + outerR * Math.sin(endRad);

		const x1Inner = 50 + innerR * Math.cos(startRad);
		const y1Inner = 50 + innerR * Math.sin(startRad);
		const x2Inner = 50 + innerR * Math.cos(endRad);
		const y2Inner = 50 + innerR * Math.sin(endRad);

		const largeArc = angle > 180 ? 1 : 0;

		const d = `M ${x1Outer} ${y1Outer} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x1Inner} ${y1Inner} Z`;

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
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-2xl font-bold">{centerValue}</span>
					<span className="text-xs text-muted-foreground">{centerLabel}</span>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				{slices.map((slice, i) => (
					<div key={i} className="flex items-center gap-3">
						<div
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: slice.color }}
						/>
						<span className="text-sm">{slice.label}</span>
						<span className="text-sm font-medium ml-auto">
							{slice.value.toLocaleString()}
						</span>
						<span className="text-xs text-muted-foreground w-12 text-right">
							{slice.percentage}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

const ordersByStatus: DonutSlice[] = [
	{ label: 'Delivered', value: 2450, color: '#22c55e' },
	{ label: 'Processing', value: 820, color: '#3b82f6' },
	{ label: 'Shipped', value: 540, color: '#f59e0b' },
	{ label: 'Pending', value: 180, color: '#a855f7' },
	{ label: 'Cancelled', value: 95, color: '#ef4444' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Orders by Status
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Current order pipeline distribution
						</p>
					</CardHeader>
					<CardContent>
						<DonutChart
							data={ordersByStatus}
							centerLabel="Total Orders"
							centerValue="4,085"
						/>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
