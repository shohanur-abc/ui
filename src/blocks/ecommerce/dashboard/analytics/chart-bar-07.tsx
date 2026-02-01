'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type WaterfallData = {
	label: string;
	value: number;
	type: 'positive' | 'negative' | 'total';
};

const WaterfallChart = ({ data }: { data: WaterfallData[] }) => {
	let runningTotal = 0;
	const processedData = data.map((d) => {
		const start = runningTotal;
		if (d.type !== 'total') {
			runningTotal += d.value;
		}
		return { ...d, start, end: d.type === 'total' ? d.value : runningTotal };
	});

	const max = Math.max(...processedData.map((d) => Math.max(d.start, d.end)));
	const min = Math.min(
		...processedData.map((d) => Math.min(d.start, d.end)),
		0,
	);
	const range = max - min;

	const getY = (value: number) => 100 - ((value - min) / range) * 80 - 10;

	return (
		<div className="relative h-64 w-full">
			<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				className="w-full h-full"
			>
				{processedData.map((d, i) => {
					const x = (i / processedData.length) * 100 + 2;
					const width = 100 / processedData.length - 4;
					const y1 = getY(d.start);
					const y2 = getY(d.end);
					const top = Math.min(y1, y2);
					const height = Math.abs(y2 - y1);
					const color =
						d.type === 'total'
							? '#3b82f6'
							: d.type === 'positive'
								? '#22c55e'
								: '#ef4444';
					return (
						<g key={i}>
							<rect
								x={x}
								y={top}
								width={width}
								height={height || 0.5}
								fill={color}
								rx="0.5"
							/>
							{i > 0 && d.type !== 'total' && (
								<line
									x1={x - 2}
									y1={getY(d.start)}
									x2={x}
									y2={getY(d.start)}
									stroke="hsl(var(--border))"
									strokeWidth="0.2"
									strokeDasharray="1,0.5"
								/>
							)}
						</g>
					);
				})}
				<line
					x1="0"
					y1={getY(0)}
					x2="100"
					y2={getY(0)}
					stroke="hsl(var(--border))"
					strokeWidth="0.2"
				/>
			</svg>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-2">
				{data.map((d, i) => (
					<span key={i} className="flex-1 text-center truncate text-[10px]">
						{d.label}
					</span>
				))}
			</div>
		</div>
	);
};

const revenueBreakdown: WaterfallData[] = [
	{ label: 'Start', value: 100000, type: 'total' },
	{ label: 'New Sales', value: 45000, type: 'positive' },
	{ label: 'Upsells', value: 15000, type: 'positive' },
	{ label: 'Refunds', value: -8000, type: 'negative' },
	{ label: 'Discounts', value: -12000, type: 'negative' },
	{ label: 'Fees', value: -5000, type: 'negative' },
	{ label: 'End', value: 135000, type: 'total' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Revenue Waterfall
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Breakdown of revenue changes
						</p>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-center gap-6 mb-4">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded bg-emerald-500" />
								<span className="text-xs text-muted-foreground">Increase</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded bg-rose-500" />
								<span className="text-xs text-muted-foreground">Decrease</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded bg-blue-500" />
								<span className="text-xs text-muted-foreground">Total</span>
							</div>
						</div>
						<WaterfallChart data={revenueBreakdown} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
