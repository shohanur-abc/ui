'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DivergingBarData = { label: string; positive: number; negative: number };

const DivergingBarChart = ({ data }: { data: DivergingBarData[] }) => {
	const maxValue = Math.max(...data.flatMap((d) => [d.positive, d.negative]));

	return (
		<div className="flex flex-col gap-3">
			{data.map((item, i) => {
				const positiveWidth = (item.positive / maxValue) * 45;
				const negativeWidth = (item.negative / maxValue) * 45;
				return (
					<div key={i} className="flex items-center gap-2">
						<span className="w-20 text-xs text-muted-foreground text-right truncate">{item.label}</span>
						<div className="flex-1 flex items-center">
							<div className="flex-1 flex justify-end">
								<div
									className="h-6 rounded-l-md bg-rose-500/70 transition-all duration-500"
									style={{ width: `${negativeWidth}%` }}
								/>
							</div>
							<div className="w-px h-8 bg-border" />
							<div className="flex-1">
								<div
									className="h-6 rounded-r-md bg-emerald-500/70 transition-all duration-500"
									style={{ width: `${positiveWidth}%` }}
								/>
							</div>
						</div>
						<div className="w-24 flex justify-between text-xs">
							<span className="text-rose-500">-{item.negative}%</span>
							<span className="text-emerald-500">+{item.positive}%</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

const sentimentData: DivergingBarData[] = [
	{ label: 'Product A', positive: 72, negative: 28 },
	{ label: 'Product B', positive: 85, negative: 15 },
	{ label: 'Product C', positive: 45, negative: 55 },
	{ label: 'Product D', positive: 62, negative: 38 },
	{ label: 'Product E', positive: 91, negative: 9 },
	{ label: 'Product F', positive: 58, negative: 42 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Product Sentiment Analysis</CardTitle>
						<p className="text-xs text-muted-foreground">Positive vs negative feedback distribution</p>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-center gap-6 mb-4">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded bg-rose-500/70" />
								<span className="text-xs text-muted-foreground">Negative</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded bg-emerald-500/70" />
								<span className="text-xs text-muted-foreground">Positive</span>
							</div>
						</div>
						<DivergingBarChart data={sentimentData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
