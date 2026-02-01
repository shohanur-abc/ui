'use client';

import {
	ArrowUpRight,
	DollarSign,
	type LucideIcon,
	ShoppingCart,
	Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type SparkAreaProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	data: number[];
	color: string;
};

const SparkAreaChart = ({ data, color }: { data: number[]; color: string }) => {
	const max = Math.max(...data);
	const min = Math.min(...data);
	const range = max - min || 1;

	const points = data.map((v, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - ((v - min) / range) * 100,
	}));

	const pathD = points.reduce((acc, p, i) => {
		if (i === 0) return `M ${p.x} ${p.y}`;
		return `${acc} L ${p.x} ${p.y}`;
	}, '');

	const areaD = `${pathD} L 100 100 L 0 100 Z`;

	return (
		<svg
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
			className="w-full h-16"
		>
			<defs>
				<linearGradient id={`spark-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor={color} stopOpacity="0.3" />
					<stop offset="100%" stopColor={color} stopOpacity="0" />
				</linearGradient>
			</defs>
			<path d={areaD} fill={`url(#spark-${color})`} />
			<path d={pathD} fill="none" stroke={color} strokeWidth="1" />
		</svg>
	);
};

const SparkCard = ({
	icon: Icon,
	label,
	value,
	change,
	trend,
	data,
	color,
}: SparkAreaProps) => (
	<Card className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
		<CardContent className="p-4 @sm:p-5">
			<div className="flex items-start justify-between mb-3">
				<div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-colors">
					<Icon className="size-4 text-primary" />
				</div>
				<span
					className={`flex items-center gap-0.5 text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}
				>
					<ArrowUpRight
						className={`size-3 ${trend === 'down' ? 'rotate-90' : ''}`}
					/>
					{change}
				</span>
			</div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-2xl font-bold mt-1 mb-3">{value}</p>
			<SparkAreaChart data={data} color={color} />
		</CardContent>
	</Card>
);

const sparkCards: SparkAreaProps[] = [
	{
		icon: DollarSign,
		label: 'Revenue',
		value: '$45,231',
		change: '+12.5%',
		trend: 'up',
		data: [30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 90],
		color: '#22c55e',
	},
	{
		icon: ShoppingCart,
		label: 'Orders',
		value: '2,345',
		change: '+8.2%',
		trend: 'up',
		data: [20, 25, 22, 28, 32, 28, 35, 40, 38, 45, 50, 55],
		color: '#3b82f6',
	},
	{
		icon: Users,
		label: 'Visitors',
		value: '24,532',
		change: '+15.3%',
		trend: 'up',
		data: [40, 52, 48, 65, 58, 72, 68, 85, 78, 92, 88, 95],
		color: '#a855f7',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @md:grid-cols-3 gap-4 @lg:gap-6">
					{sparkCards.map((card, i) => (
						<SparkCard key={i} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
