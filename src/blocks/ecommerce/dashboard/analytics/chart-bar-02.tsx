'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type HorizontalBarData = { label: string; value: number; color: string };

const HorizontalBarChart = ({ data }: { data: HorizontalBarData[] }) => {
	const max = Math.max(...data.map((d) => d.value));

	return (
		<div className="flex flex-col gap-4">
			{data.map((item, i) => {
				const width = (item.value / max) * 100;
				return (
					<div key={i} className="flex items-center gap-4">
						<span className="w-24 text-sm text-muted-foreground truncate">{item.label}</span>
						<div className="flex-1 h-8 bg-muted/30 rounded-md overflow-hidden">
							<div
								className="h-full rounded-md transition-all duration-500"
								style={{ width: `${width}%`, backgroundColor: item.color }}
							/>
						</div>
						<span className="w-16 text-right text-sm font-medium">{item.value.toLocaleString()}</span>
					</div>
				);
			})}
		</div>
	);
};

const categoryData: HorizontalBarData[] = [
	{ label: 'Electronics', value: 12450, color: '#3b82f6' },
	{ label: 'Clothing', value: 9820, color: '#22c55e' },
	{ label: 'Home & Garden', value: 7340, color: '#f59e0b' },
	{ label: 'Sports', value: 5680, color: '#a855f7' },
	{ label: 'Books', value: 3420, color: '#ec4899' },
	{ label: 'Toys', value: 2180, color: '#06b6d4' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Sales by Category</CardTitle>
						<p className="text-xs text-muted-foreground">Revenue distribution across categories</p>
					</CardHeader>
					<CardContent>
						<HorizontalBarChart data={categoryData} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
