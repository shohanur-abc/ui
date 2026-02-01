'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type RoseData = { label: string; value: number; color: string };

const RoseChart = ({ data }: { data: RoseData[] }) => {
	const maxValue = Math.max(...data.map((d) => d.value));
	const angleStep = 360 / data.length;

	const petals = data.map((item, i) => {
		const centerAngle = i * angleStep - 90 + angleStep / 2;
		const halfAngle = angleStep / 2 - 2;
		const radius = (item.value / maxValue) * 38 + 8;

		const startAngle = centerAngle - halfAngle;
		const endAngle = centerAngle + halfAngle;

		const startRad = (startAngle * Math.PI) / 180;
		const endRad = (endAngle * Math.PI) / 180;
		const centerRad = (centerAngle * Math.PI) / 180;

		const x1 = 50 + 5 * Math.cos(startRad);
		const y1 = 50 + 5 * Math.sin(startRad);
		const x2 = 50 + radius * Math.cos(centerRad);
		const y2 = 50 + radius * Math.sin(centerRad);
		const x3 = 50 + 5 * Math.cos(endRad);
		const y3 = 50 + 5 * Math.sin(endRad);

		const d = `M ${x1} ${y1} Q ${50 + radius * 0.6 * Math.cos(startRad)} ${50 + radius * 0.6 * Math.sin(startRad)}, ${x2} ${y2} Q ${50 + radius * 0.6 * Math.cos(endRad)} ${50 + radius * 0.6 * Math.sin(endRad)}, ${x3} ${y3} Z`;

		return { ...item, d };
	});

	return (
		<div className="flex flex-col @md:flex-row items-center gap-8">
			<div className="relative w-56 h-56">
				<svg viewBox="0 0 100 100" className="w-full h-full">
					{petals.map((petal, i) => (
						<path
							key={i}
							d={petal.d}
							fill={petal.color}
							fillOpacity="0.7"
							stroke={petal.color}
							strokeWidth="0.3"
							className="transition-all duration-300 hover:fill-opacity-100"
						/>
					))}
					<circle
						cx="50"
						cy="50"
						r="5"
						fill="hsl(var(--background))"
						stroke="hsl(var(--border))"
						strokeWidth="0.5"
					/>
				</svg>
			</div>
			<div className="flex flex-col gap-2">
				{data.map((item, i) => (
					<div key={i} className="flex items-center gap-3">
						<div
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: item.color }}
						/>
						<span className="text-sm w-20">{item.label}</span>
						<div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
							<div
								className="h-full rounded-full transition-all duration-500"
								style={{
									width: `${(item.value / maxValue) * 100}%`,
									backgroundColor: item.color,
								}}
							/>
						</div>
						<span className="text-sm font-medium w-12 text-right">
							{item.value}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

const seasonalData: RoseData[] = [
	{ label: 'Q1', value: 42000, color: '#3b82f6' },
	{ label: 'Q2', value: 58000, color: '#22c55e' },
	{ label: 'Q3', value: 48000, color: '#f59e0b' },
	{ label: 'Q4', value: 72000, color: '#a855f7' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Quarterly Revenue
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Rose chart showing seasonal patterns
						</p>
					</CardHeader>
					<CardContent>
						<RoseChart data={seasonalData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
