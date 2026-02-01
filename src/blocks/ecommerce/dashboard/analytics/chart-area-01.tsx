'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type DataPoint = {
	label: string;
	value: number;
};

type AreaChartProps = {
	title: string;
	subtitle: string;
	total: string;
	change: string;
	data: DataPoint[];
};

const AreaChartVisual = ({ data }: { data: DataPoint[] }) => {
	const max = Math.max(...data.map((d) => d.value));
	const points = data.map((d, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - (d.value / max) * 100,
	}));

	const pathD = points.reduce((acc, p, i) => {
		if (i === 0) return `M ${p.x} ${p.y}`;
		const prev = points[i - 1];
		const cp1x = prev.x + (p.x - prev.x) / 3;
		const cp2x = p.x - (p.x - prev.x) / 3;
		return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${p.y}, ${p.x} ${p.y}`;
	}, '');

	const areaD = `${pathD} L 100 100 L 0 100 Z`;

	return (
		<div className="relative h-48 w-full">
			<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				className="w-full h-full"
			>
				<defs>
					<linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop
							offset="0%"
							stopColor="hsl(var(--primary))"
							stopOpacity="0.4"
						/>
						<stop
							offset="100%"
							stopColor="hsl(var(--primary))"
							stopOpacity="0.05"
						/>
					</linearGradient>
				</defs>
				<path d={areaD} fill="url(#areaGradient)" />
				<path
					d={pathD}
					fill="none"
					stroke="hsl(var(--primary))"
					strokeWidth="0.5"
				/>
			</svg>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
				{data
					.filter((_, i) => i % Math.ceil(data.length / 6) === 0)
					.map((d, i) => (
						<span key={i}>{d.label}</span>
					))}
			</div>
		</div>
	);
};

const AreaChart = ({
	title,
	subtitle,
	total,
	change,
	data,
}: AreaChartProps) => (
	<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
		<CardHeader className="flex flex-row items-start justify-between pb-2">
			<div>
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<p className="text-xs text-muted-foreground">{subtitle}</p>
			</div>
			<Badge variant="secondary">{change}</Badge>
		</CardHeader>
		<CardContent>
			<p className="text-3xl font-bold mb-4">{total}</p>
			<AreaChartVisual data={data} />
		</CardContent>
	</Card>
);

const revenueData: DataPoint[] = [
	{ label: 'Jan', value: 4500 },
	{ label: 'Feb', value: 5200 },
	{ label: 'Mar', value: 4800 },
	{ label: 'Apr', value: 6100 },
	{ label: 'May', value: 5800 },
	{ label: 'Jun', value: 7200 },
	{ label: 'Jul', value: 6800 },
	{ label: 'Aug', value: 8100 },
	{ label: 'Sep', value: 7500 },
	{ label: 'Oct', value: 8900 },
	{ label: 'Nov', value: 8200 },
	{ label: 'Dec', value: 9500 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="max-w-3xl mx-auto">
					<AreaChart
						title="Revenue Overview"
						subtitle="Monthly revenue for 2024"
						total="$82,450"
						change="+12.5%"
						data={revenueData}
					/>
				</div>
			</div>
		</section>
	);
}
