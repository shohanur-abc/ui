'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type SemiCircleData = { label: string; value: number; color: string };

const SemiCircleChart = ({
	data,
	centerValue,
	centerLabel,
}: {
	data: SemiCircleData[];
	centerValue: string;
	centerLabel: string;
}) => {
	const total = data.reduce((a, b) => a + b.value, 0);
	let currentAngle = 180;

	const slices = data.map((slice) => {
		const angle = (slice.value / total) * 180;
		const startAngle = currentAngle;
		const endAngle = currentAngle - angle;
		currentAngle = endAngle;

		const startRad = (startAngle * Math.PI) / 180;
		const endRad = (endAngle * Math.PI) / 180;

		const outerR = 45;
		const innerR = 32;

		const x1Outer = 50 + outerR * Math.cos(startRad);
		const y1Outer = 50 - outerR * Math.sin(startRad);
		const x2Outer = 50 + outerR * Math.cos(endRad);
		const y2Outer = 50 - outerR * Math.sin(endRad);

		const x1Inner = 50 + innerR * Math.cos(startRad);
		const y1Inner = 50 - innerR * Math.sin(startRad);
		const x2Inner = 50 + innerR * Math.cos(endRad);
		const y2Inner = 50 - innerR * Math.sin(endRad);

		const largeArc = angle > 90 ? 1 : 0;

		const d = `M ${x1Outer} ${y1Outer} A ${outerR} ${outerR} 0 ${largeArc} 0 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${innerR} ${innerR} 0 ${largeArc} 1 ${x1Inner} ${y1Inner} Z`;

		return {
			...slice,
			d,
			percentage: ((slice.value / total) * 100).toFixed(1),
		};
	});

	return (
		<div className="flex flex-col items-center">
			<div className="relative w-64 h-36 overflow-hidden">
				<svg viewBox="0 0 100 55" className="w-full h-full">
					{slices.map((slice, i) => (
						<path
							key={i}
							d={slice.d}
							fill={slice.color}
							stroke="hsl(var(--background))"
							strokeWidth="0.3"
							className="transition-all duration-300 hover:opacity-80"
						/>
					))}
				</svg>
				<div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
					<p className="text-3xl font-bold">{centerValue}</p>
					<p className="text-xs text-muted-foreground">{centerLabel}</p>
				</div>
			</div>
			<div className="flex flex-wrap justify-center gap-4 mt-4">
				{slices.map((slice, i) => (
					<div key={i} className="flex items-center gap-2">
						<div
							className="w-2.5 h-2.5 rounded-full"
							style={{ backgroundColor: slice.color }}
						/>
						<span className="text-xs">{slice.label}</span>
						<span className="text-xs text-muted-foreground">
							{slice.percentage}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

const satisfactionData: SemiCircleData[] = [
	{ label: 'Excellent', value: 45, color: '#22c55e' },
	{ label: 'Good', value: 30, color: '#3b82f6' },
	{ label: 'Average', value: 15, color: '#f59e0b' },
	{ label: 'Poor', value: 10, color: '#ef4444' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Customer Satisfaction
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Survey response distribution
						</p>
					</CardHeader>
					<CardContent>
						<SemiCircleChart
							data={satisfactionData}
							centerValue="4.2"
							centerLabel="Avg. Rating"
						/>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
