'use client';

import { Gauge, Zap, ShieldCheck, AlertTriangle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

type GaugeKPIProps = {
	icon: LucideIcon;
	title: string;
	value: number;
	max: number;
	unit: string;
	status: 'excellent' | 'good' | 'warning' | 'critical';
	description: string;
};

const GaugeKPI = ({ icon: Icon, title, value, max, unit, status, description }: GaugeKPIProps) => {
	const percentage = (value / max) * 100;
	const statusConfig = {
		excellent: { color: 'oklch(0.7 0.18 160)', bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
		good: { color: 'oklch(0.7 0.2 280)', bg: 'bg-primary/10', text: 'text-primary' },
		warning: { color: 'oklch(0.75 0.15 55)', bg: 'bg-amber-500/10', text: 'text-amber-500' },
		critical: { color: 'oklch(0.62 0.24 25)', bg: 'bg-rose-500/10', text: 'text-rose-500' },
	};

	const { color, bg, text } = statusConfig[status];

	// SVG arc calculation
	const radius = 45;
	const circumference = Math.PI * radius;
	const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

	return (
		<Card className="border-border/30 bg-card/60">
			<CardContent className="flex flex-col items-center p-5">
				<div className="relative size-32">
					<svg className="size-full -rotate-90" viewBox="0 0 100 100">
						<circle
							cx="50"
							cy="50"
							r={radius}
							fill="none"
							stroke="currentColor"
							strokeWidth="8"
							className="text-muted/30"
							strokeLinecap="round"
							strokeDasharray={`${circumference} ${circumference}`}
							transform="rotate(180 50 50)"
						/>
						<circle
							cx="50"
							cy="50"
							r={radius}
							fill="none"
							stroke={color}
							strokeWidth="8"
							strokeLinecap="round"
							strokeDasharray={strokeDasharray}
							transform="rotate(180 50 50)"
						/>
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<span className={`text-2xl font-bold ${text}`}>{value}</span>
						<span className="text-xs text-muted-foreground">{unit}</span>
					</div>
				</div>
				<div className={`mt-3 flex items-center gap-2 rounded-full px-3 py-1 ${bg}`}>
					<Icon className={`size-3.5 ${text}`} />
					<span className={`text-sm font-medium ${text}`}>{title}</span>
				</div>
				<p className="mt-2 text-center text-xs text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const gauges: GaugeKPIProps[] = [
		{
			icon: Gauge,
			title: 'Site Speed',
			value: 92,
			max: 100,
			unit: 'score',
			status: 'excellent',
			description: 'Core Web Vitals performance',
		},
		{
			icon: Zap,
			title: 'Uptime',
			value: 99.9,
			max: 100,
			unit: '%',
			status: 'excellent',
			description: '30-day availability',
		},
		{
			icon: ShieldCheck,
			title: 'Security',
			value: 85,
			max: 100,
			unit: 'score',
			status: 'good',
			description: 'Security audit score',
		},
		{
			icon: AlertTriangle,
			title: 'Error Rate',
			value: 2.4,
			max: 5,
			unit: '%',
			status: 'warning',
			description: 'API error percentage',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							System Health Report
						</CardTitle>
						<CardDescription>
							Technical performance and reliability metrics
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{gauges.map((gauge, i) => (
								<GaugeKPI key={i} {...gauge} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
