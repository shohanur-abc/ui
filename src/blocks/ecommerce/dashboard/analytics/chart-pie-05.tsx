'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type NestedDonutData = {
	inner: { label: string; value: number; color: string }[];
	outer: { label: string; value: number; color: string }[];
};

const NestedDonutChart = ({ data }: { data: NestedDonutData }) => {
	const createRing = (items: { value: number; color: string }[], innerRadius: number, outerRadius: number) => {
		const total = items.reduce((a, b) => a + b.value, 0);
		let currentAngle = -90;

		return items.map((item) => {
			const angle = (item.value / total) * 360;
			const startAngle = currentAngle;
			const endAngle = currentAngle + angle;
			currentAngle = endAngle;

			const startRad = (startAngle * Math.PI) / 180;
			const endRad = (endAngle * Math.PI) / 180;

			const x1Outer = 50 + outerRadius * Math.cos(startRad);
			const y1Outer = 50 + outerRadius * Math.sin(startRad);
			const x2Outer = 50 + outerRadius * Math.cos(endRad);
			const y2Outer = 50 + outerRadius * Math.sin(endRad);

			const x1Inner = 50 + innerRadius * Math.cos(startRad);
			const y1Inner = 50 + innerRadius * Math.sin(startRad);
			const x2Inner = 50 + innerRadius * Math.cos(endRad);
			const y2Inner = 50 + innerRadius * Math.sin(endRad);

			const largeArc = angle > 180 ? 1 : 0;

			const d = `M ${x1Outer} ${y1Outer} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1Inner} ${y1Inner} Z`;

			return { ...item, d };
		});
	};

	const innerSlices = createRing(data.inner, 20, 30);
	const outerSlices = createRing(data.outer, 32, 45);

	return (
		<div className="flex flex-col @md:flex-row items-center gap-8">
			<div className="relative w-56 h-56">
				<svg viewBox="0 0 100 100" className="w-full h-full">
					{innerSlices.map((slice, i) => (
						<path key={`i-${i}`} d={slice.d} fill={slice.color} stroke="hsl(var(--background))" strokeWidth="0.3" />
					))}
					{outerSlices.map((slice, i) => (
						<path key={`o-${i}`} d={slice.d} fill={slice.color} stroke="hsl(var(--background))" strokeWidth="0.3" />
					))}
				</svg>
			</div>
			<div className="grid grid-cols-2 gap-x-8 gap-y-2">
				<div>
					<p className="text-xs text-muted-foreground mb-2 font-medium">Inner: Category</p>
					{data.inner.map((item, i) => (
						<div key={i} className="flex items-center gap-2 mb-1">
							<div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
							<span className="text-xs">{item.label}</span>
						</div>
					))}
				</div>
				<div>
					<p className="text-xs text-muted-foreground mb-2 font-medium">Outer: Subcategory</p>
					{data.outer.map((item, i) => (
						<div key={i} className="flex items-center gap-2 mb-1">
							<div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
							<span className="text-xs">{item.label}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const categoryData: NestedDonutData = {
	inner: [
		{ label: 'Electronics', value: 45, color: '#3b82f6' },
		{ label: 'Clothing', value: 35, color: '#22c55e' },
		{ label: 'Home', value: 20, color: '#f59e0b' },
	],
	outer: [
		{ label: 'Phones', value: 25, color: '#60a5fa' },
		{ label: 'Laptops', value: 20, color: '#93c5fd' },
		{ label: 'Mens', value: 20, color: '#4ade80' },
		{ label: 'Womens', value: 15, color: '#86efac' },
		{ label: 'Furniture', value: 12, color: '#fbbf24' },
		{ label: 'Decor', value: 8, color: '#fcd34d' },
	],
};

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Sales by Category</CardTitle>
						<p className="text-xs text-muted-foreground">Nested breakdown of categories and subcategories</p>
					</CardHeader>
					<CardContent>
						<NestedDonutChart data={categoryData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
