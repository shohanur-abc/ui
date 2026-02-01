'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type RankedBarData = {
	rank: number;
	label: string;
	value: number;
	change: number;
};

const RankedBarChart = ({ data }: { data: RankedBarData[] }) => {
	const max = Math.max(...data.map((d) => d.value));

	return (
		<div className="flex flex-col gap-3">
			{data.map((item, i) => {
				const width = (item.value / max) * 100;
				return (
					<div key={i} className="flex items-center gap-3">
						<span className="w-6 text-sm font-bold text-muted-foreground">
							#{item.rank}
						</span>
						<div className="flex-1 flex flex-col gap-1">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium truncate">
									{item.label}
								</span>
								<div className="flex items-center gap-2">
									<span className="text-sm font-bold">
										${item.value.toLocaleString()}
									</span>
									<Badge
										variant="outline"
										className={`text-xs ${item.change >= 0 ? 'text-emerald-500 border-emerald-500/30' : 'text-rose-500 border-rose-500/30'}`}
									>
										{item.change >= 0 ? '+' : ''}
										{item.change}%
									</Badge>
								</div>
							</div>
							<div className="h-2 bg-muted/30 rounded-full overflow-hidden">
								<div
									className="h-full rounded-full bg-gradient-to-r from-primary/50 to-primary transition-all duration-700"
									style={{ width: `${width}%` }}
								/>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

const topProducts: RankedBarData[] = [
	{ rank: 1, label: 'Wireless Headphones Pro', value: 45800, change: 12 },
	{ rank: 2, label: 'Smart Watch Ultra', value: 38400, change: -5 },
	{ rank: 3, label: 'Portable Speaker', value: 32100, change: 8 },
	{ rank: 4, label: 'Bluetooth Earbuds', value: 28500, change: 22 },
	{ rank: 5, label: 'Gaming Mouse RGB', value: 21200, change: -3 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Top Products by Revenue
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Best performing products this month
						</p>
					</CardHeader>
					<CardContent>
						<RankedBarChart data={topProducts} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
