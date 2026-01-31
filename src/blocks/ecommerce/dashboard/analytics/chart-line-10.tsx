'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DualAxisData = { label: string; revenue: number; orders: number };

const DualAxisLineChart = ({ data }: { data: DualAxisData[] }) => {
	const revenueMax = Math.max(...data.map((d) => d.revenue));
	const revenueMin = Math.min(...data.map((d) => d.revenue));
	const revenueRange = revenueMax - revenueMin || 1;

	const ordersMax = Math.max(...data.map((d) => d.orders));
	const ordersMin = Math.min(...data.map((d) => d.orders));
	const ordersRange = ordersMax - ordersMin || 1;

	const revenuePoints = data.map((d, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - ((d.revenue - revenueMin) / revenueRange) * 80 - 10,
	}));

	const ordersPoints = data.map((d, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: 100 - ((d.orders - ordersMin) / ordersRange) * 80 - 10,
	}));

	const createPath = (points: { x: number; y: number }[]) =>
		points.reduce((acc, p, i) => {
			if (i === 0) return `M ${p.x} ${p.y}`;
			const prev = points[i - 1];
			const cp1x = prev.x + (p.x - prev.x) / 3;
			const cp2x = p.x - (p.x - prev.x) / 3;
			return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${p.y}, ${p.x} ${p.y}`;
		}, '');

	const revenuePath = createPath(revenuePoints);
	const ordersPath = createPath(ordersPoints);

	return (
		<div className="relative h-64 w-full">
			<div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-blue-500">
				<span>${(revenueMax / 1000).toFixed(0)}K</span>
				<span>${((revenueMax + revenueMin) / 2000).toFixed(0)}K</span>
				<span>${(revenueMin / 1000).toFixed(0)}K</span>
			</div>
			<div className="absolute right-0 top-0 bottom-8 flex flex-col justify-between text-xs text-emerald-500 text-right">
				<span>{ordersMax}</span>
				<span>{Math.floor((ordersMax + ordersMin) / 2)}</span>
				<span>{ordersMin}</span>
			</div>
			<div className="mx-10">
				<svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-56">
					<defs>
						<linearGradient id="revenueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
							<stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
						</linearGradient>
					</defs>
					<path d={`${revenuePath} L 100 100 L 0 100 Z`} fill="url(#revenueGrad)" />
					<path d={revenuePath} fill="none" stroke="#3b82f6" strokeWidth="0.5" />
					<path d={ordersPath} fill="none" stroke="#22c55e" strokeWidth="0.5" strokeDasharray="1,0.5" />
					{revenuePoints.map((p, i) => (
						<circle key={`r-${i}`} cx={p.x} cy={p.y} r="0.6" fill="#3b82f6" />
					))}
					{ordersPoints.map((p, i) => (
						<circle key={`o-${i}`} cx={p.x} cy={p.y} r="0.6" fill="#22c55e" />
					))}
				</svg>
			</div>
			<div className="absolute bottom-0 left-10 right-10 flex justify-between text-xs text-muted-foreground">
				{data.filter((_, i) => i % 2 === 0).map((d, i) => (
					<span key={i}>{d.label}</span>
				))}
			</div>
		</div>
	);
};

const correlationData: DualAxisData[] = [
	{ label: 'Jan', revenue: 42000, orders: 420 },
	{ label: 'Feb', revenue: 48000, orders: 465 },
	{ label: 'Mar', revenue: 45000, orders: 440 },
	{ label: 'Apr', revenue: 52000, orders: 510 },
	{ label: 'May', revenue: 58000, orders: 545 },
	{ label: 'Jun', revenue: 55000, orders: 530 },
	{ label: 'Jul', revenue: 62000, orders: 580 },
	{ label: 'Aug', revenue: 68000, orders: 620 },
	{ label: 'Sep', revenue: 65000, orders: 600 },
	{ label: 'Oct', revenue: 72000, orders: 660 },
	{ label: 'Nov', revenue: 78000, orders: 720 },
	{ label: 'Dec', revenue: 85000, orders: 780 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-start justify-between pb-2">
						<div>
							<CardTitle className="text-sm font-medium">Revenue vs Orders Correlation</CardTitle>
							<p className="text-xs text-muted-foreground">Dual axis comparison over time</p>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<div className="w-4 h-0.5 bg-blue-500" />
								<span className="text-xs text-blue-500">Revenue</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-0.5 bg-emerald-500" />
								<span className="text-xs text-emerald-500">Orders</span>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<DualAxisLineChart data={correlationData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
