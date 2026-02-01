'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PolarData = { label: string; value: number; color: string };

const PolarAreaChart = ({ data }: { data: PolarData[] }) => {
	const maxValue = Math.max(...data.map((d) => d.value));
	const angleStep = 360 / data.length;

	const slices = data.map((item, i) => {
		const startAngle = i * angleStep - 90;
		const endAngle = (i + 1) * angleStep - 90;
		const radius = (item.value / maxValue) * 40 + 5;

		const startRad = (startAngle * Math.PI) / 180;
		const endRad = (endAngle * Math.PI) / 180;

		const x1 = 50 + radius * Math.cos(startRad);
		const y1 = 50 + radius * Math.sin(startRad);
		const x2 = 50 + radius * Math.cos(endRad);
		const y2 = 50 + radius * Math.sin(endRad);

		const largeArc = angleStep > 180 ? 1 : 0;

		const d = `M 50 50 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

		return { ...item, d };
	});

	return (
		<div className="flex flex-col @md:flex-row items-center gap-8">
			<div className="relative w-56 h-56">
				<svg viewBox="0 0 100 100" className="w-full h-full">
					{[10, 20, 30, 40].map((r) => (
						<circle
							key={r}
							cx="50"
							cy="50"
							r={r}
							fill="none"
							stroke="hsl(var(--border))"
							strokeWidth="0.2"
						/>
					))}
					{slices.map((slice, i) => (
						<path
							key={i}
							d={slice.d}
							fill={slice.color}
							fillOpacity="0.7"
							stroke={slice.color}
							strokeWidth="0.5"
							className="transition-all duration-300 hover:fill-opacity-100"
						/>
					))}
				</svg>
			</div>
			<div className="grid grid-cols-2 gap-x-6 gap-y-2">
				{data.map((item, i) => (
					<div key={i} className="flex items-center gap-2">
						<div
							className="w-3 h-3 rounded"
							style={{ backgroundColor: item.color }}
						/>
						<span className="text-sm">{item.label}</span>
						<span className="text-sm font-medium ml-auto">{item.value}</span>
					</div>
				))}
			</div>
		</div>
	);
};

const skillData: PolarData[] = [
	{ label: 'SEO', value: 85, color: '#3b82f6' },
	{ label: 'SEM', value: 70, color: '#22c55e' },
	{ label: 'Social', value: 90, color: '#a855f7' },
	{ label: 'Email', value: 65, color: '#f59e0b' },
	{ label: 'Content', value: 80, color: '#ec4899' },
	{ label: 'Affiliate', value: 55, color: '#06b6d4' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Marketing Channel Performance
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Effectiveness score by channel
						</p>
					</CardHeader>
					<CardContent>
						<PolarAreaChart data={skillData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
