import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricStatProps {
	label: string;
	value: string;
	metric: string;
	change: number;
	sparkline: number[];
}

const Sparkline = ({ data }: { data: number[] }) => {
	const max = Math.max(...data);
	const min = Math.min(...data);
	const range = max - min || 1;
	const height = 32;
	const width = 80;

	const points = data.map((value, i) => {
		const x = (i / (data.length - 1)) * width;
		const y = height - ((value - min) / range) * height;
		return `${x},${y}`;
	}).join(' ');

	return (
		<svg width={width} height={height} className="text-primary">
			<polyline
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				points={points}
			/>
		</svg>
	);
};

const MetricStat = ({ label, value, metric, change, sparkline }: MetricStatProps) => {
	const isPositive = change >= 0;

	return (
		<Card className="group p-6 transition-all duration-300 hover:shadow-md">
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<p className="text-sm text-muted-foreground">{label}</p>
					<div className="flex items-baseline gap-1">
						<span className="text-3xl font-bold tracking-tight">{value}</span>
						<span className="text-sm text-muted-foreground">{metric}</span>
					</div>
				</div>
				<Sparkline data={sparkline} />
			</div>
			<div className="mt-4 flex items-center gap-1">
				{isPositive ? (
					<TrendingUp className="size-4 text-accent" />
				) : (
					<TrendingDown className="size-4 text-destructive" />
				)}
				<span className={isPositive ? 'text-sm font-medium text-accent' : 'text-sm font-medium text-destructive'}>
					{isPositive ? '+' : ''}{change}%
				</span>
				<span className="text-sm text-muted-foreground">vs last week</span>
			</div>
		</Card>
	);
};

export default function Main() {
	const stats: MetricStatProps[] = [
		{ label: 'Avg. Order Value', value: '$142', metric: 'AOV', change: 12.4, sparkline: [80, 95, 88, 102, 98, 115, 142] },
		{ label: 'Customer Lifetime', value: '$847', metric: 'CLV', change: 8.2, sparkline: [700, 720, 780, 790, 810, 830, 847] },
		{ label: 'Acquisition Cost', value: '$24', metric: 'CAC', change: -15.3, sparkline: [42, 38, 35, 32, 28, 26, 24] },
		{ label: 'Revenue/User', value: '$18.4', metric: 'ARPU', change: 6.7, sparkline: [14, 15, 16, 17, 17.5, 18, 18.4] },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{stats.map((stat, i) => (
						<MetricStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
