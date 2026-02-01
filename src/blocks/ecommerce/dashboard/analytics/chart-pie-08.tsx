'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ComparisonData = {
	label: string;
	current: { value: number; color: string };
	previous: { value: number; color: string };
};

const ComparisonDonut = ({ data }: { data: ComparisonData }) => {
	const createDonut = (
		value: number,
		total: number,
		color: string,
		innerR: number,
		outerR: number,
	) => {
		const percentage = (value / total) * 100;
		const angle = (percentage / 100) * 360;
		const startAngle = -90;
		const endAngle = startAngle + angle;

		const startRad = (startAngle * Math.PI) / 180;
		const endRad = (endAngle * Math.PI) / 180;

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

		return { d, percentage };
	};

	const currentDonut = createDonut(
		data.current.value,
		100,
		data.current.color,
		32,
		42,
	);
	const previousDonut = createDonut(
		data.previous.value,
		100,
		data.previous.color,
		20,
		28,
	);

	return (
		<div className="flex flex-col items-center">
			<div className="relative w-32 h-32">
				<svg viewBox="0 0 100 100" className="w-full h-full">
					<circle
						cx="50"
						cy="50"
						r="37"
						fill="none"
						stroke="hsl(var(--muted))"
						strokeWidth="10"
					/>
					<circle
						cx="50"
						cy="50"
						r="24"
						fill="none"
						stroke="hsl(var(--muted))"
						strokeWidth="8"
						strokeOpacity="0.5"
					/>
					<path d={currentDonut.d} fill={data.current.color} />
					<path d={previousDonut.d} fill={data.previous.color} />
				</svg>
			</div>
			<p className="text-sm font-medium mt-3">{data.label}</p>
			<div className="flex items-center gap-4 mt-2">
				<div className="flex items-center gap-1.5">
					<div
						className="w-2 h-2 rounded-full"
						style={{ backgroundColor: data.current.color }}
					/>
					<span className="text-xs">Current: {data.current.value}%</span>
				</div>
				<div className="flex items-center gap-1.5">
					<div
						className="w-2 h-2 rounded-full"
						style={{ backgroundColor: data.previous.color }}
					/>
					<span className="text-xs">Previous: {data.previous.value}%</span>
				</div>
			</div>
		</div>
	);
};

const comparisonData: ComparisonData[] = [
	{
		label: 'Conversion Rate',
		current: { value: 68, color: '#3b82f6' },
		previous: { value: 52, color: '#64748b' },
	},
	{
		label: 'Retention Rate',
		current: { value: 75, color: '#22c55e' },
		previous: { value: 70, color: '#64748b' },
	},
	{
		label: 'Satisfaction',
		current: { value: 88, color: '#a855f7' },
		previous: { value: 82, color: '#64748b' },
	},
	{
		label: 'NPS Score',
		current: { value: 72, color: '#f59e0b' },
		previous: { value: 65, color: '#64748b' },
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Period Comparison
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Current vs Previous period performance
						</p>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 @lg:grid-cols-4 gap-6">
							{comparisonData.map((data, i) => (
								<ComparisonDonut key={i} data={data} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
