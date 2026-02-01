'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type RadialData = { label: string; value: number; max: number; color: string };

const RadialProgress = ({ label, value, max, color }: RadialData) => {
	const percentage = (value / max) * 100;
	const strokeWidth = 8;
	const radius = 40;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<div className="flex flex-col items-center">
			<div className="relative w-24 h-24">
				<svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
					<circle
						cx="50"
						cy="50"
						r={radius}
						fill="none"
						stroke="hsl(var(--muted))"
						strokeWidth={strokeWidth}
					/>
					<circle
						cx="50"
						cy="50"
						r={radius}
						fill="none"
						stroke={color}
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						className="transition-all duration-700"
					/>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-lg font-bold">{percentage.toFixed(0)}%</span>
				</div>
			</div>
			<span className="text-sm font-medium mt-2">{label}</span>
			<span className="text-xs text-muted-foreground">
				{value.toLocaleString()} / {max.toLocaleString()}
			</span>
		</div>
	);
};

const goalProgress: RadialData[] = [
	{ label: 'Revenue', value: 284500, max: 300000, color: '#3b82f6' },
	{ label: 'Orders', value: 4580, max: 5000, color: '#22c55e' },
	{ label: 'Customers', value: 1250, max: 1500, color: '#a855f7' },
	{ label: 'Reviews', value: 420, max: 500, color: '#f59e0b' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
						<p className="text-xs text-muted-foreground">
							Monthly targets achievement
						</p>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 @md:grid-cols-4 gap-8">
							{goalProgress.map((goal, i) => (
								<RadialProgress key={i} {...goal} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
