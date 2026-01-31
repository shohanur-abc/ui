'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type DonutData = { label: string; value: number; color: string };

type MiniDonutProps = {
	title: string;
	data: DonutData[];
	centerValue: string;
	change: string;
	trend: 'up' | 'down';
};

const MiniDonut = ({ title, data, centerValue, change, trend }: MiniDonutProps) => {
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
		const innerR = 30;

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

		return { ...slice, d };
	});

	return (
		<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
			<CardContent className="p-4">
				<div className="flex items-center justify-between mb-3">
					<span className="text-sm font-medium">{title}</span>
					<Badge
						variant="outline"
						className={`text-xs ${trend === 'up' ? 'text-emerald-500 border-emerald-500/30' : 'text-rose-500 border-rose-500/30'}`}
					>
						{change}
					</Badge>
				</div>
				<div className="flex items-center gap-4">
					<div className="relative w-20 h-20">
						<svg viewBox="0 0 100 100" className="w-full h-full">
							{slices.map((slice, i) => (
								<path key={i} d={slice.d} fill={slice.color} />
							))}
						</svg>
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-sm font-bold">{centerValue}</span>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						{data.map((item, i) => (
							<div key={i} className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
								<span className="text-xs text-muted-foreground">{item.label}</span>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const charts: MiniDonutProps[] = [
	{
		title: 'Device Usage',
		data: [
			{ label: 'Desktop', value: 55, color: '#3b82f6' },
			{ label: 'Mobile', value: 35, color: '#22c55e' },
			{ label: 'Tablet', value: 10, color: '#f59e0b' },
		],
		centerValue: '55%',
		change: '+3%',
		trend: 'up',
	},
	{
		title: 'Traffic Source',
		data: [
			{ label: 'Organic', value: 42, color: '#22c55e' },
			{ label: 'Paid', value: 28, color: '#3b82f6' },
			{ label: 'Direct', value: 30, color: '#a855f7' },
		],
		centerValue: '42%',
		change: '+5%',
		trend: 'up',
	},
	{
		title: 'User Type',
		data: [
			{ label: 'New', value: 35, color: '#3b82f6' },
			{ label: 'Returning', value: 65, color: '#22c55e' },
		],
		centerValue: '65%',
		change: '-2%',
		trend: 'down',
	},
	{
		title: 'Conversion',
		data: [
			{ label: 'Converted', value: 12, color: '#22c55e' },
			{ label: 'Bounced', value: 88, color: '#64748b' },
		],
		centerValue: '12%',
		change: '+1.5%',
		trend: 'up',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
					{charts.map((chart, i) => (
						<MiniDonut key={i} {...chart} />
					))}
				</div>
			</div>
		</section>
	);
}
