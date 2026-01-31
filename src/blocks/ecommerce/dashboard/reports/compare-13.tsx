'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts';
import { Star, Users } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type CompetitorProps = {
	name: string;
	avatar: string;
	initials: string;
	marketShare: number;
	rating: number;
	priceIndex: number;
	sentiment: number;
};

const CompetitorCard = ({ name, avatar, initials, marketShare, rating, priceIndex, sentiment }: CompetitorProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-5">
			<div className="flex items-center gap-3">
				<Avatar className="size-10">
					<AvatarImage src={avatar} />
					<AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-bold">{name}</p>
					<div className="flex items-center gap-1">
						<Star className="size-3 fill-amber-500 text-amber-500" />
						<span className="text-xs text-muted-foreground">{rating}</span>
					</div>
				</div>
			</div>
			<div className="mt-4 space-y-3">
				<div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Market Share</span>
						<span className="font-medium">{marketShare}%</span>
					</div>
					<Progress value={marketShare} className="mt-1 h-1.5" />
				</div>
				<div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Price Index</span>
						<span className="font-medium">{priceIndex}</span>
					</div>
					<Progress value={priceIndex} className="mt-1 h-1.5" />
				</div>
				<div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Sentiment</span>
						<span className="font-medium">{sentiment}%</span>
					</div>
					<Progress value={sentiment} className="mt-1 h-1.5" />
				</div>
			</div>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	share: {
		label: 'Market Share',
		color: 'var(--chart-1)',
	},
};

export default function Main() {
	const competitors: CompetitorProps[] = [
		{ name: 'Your Store', avatar: '', initials: 'YS', marketShare: 28, rating: 4.7, priceIndex: 95, sentiment: 82 },
		{ name: 'Competitor A', avatar: '', initials: 'CA', marketShare: 32, rating: 4.5, priceIndex: 88, sentiment: 76 },
		{ name: 'Competitor B', avatar: '', initials: 'CB', marketShare: 22, rating: 4.3, priceIndex: 92, sentiment: 71 },
		{ name: 'Competitor C', avatar: '', initials: 'CC', marketShare: 18, rating: 4.1, priceIndex: 78, sentiment: 68 },
	];

	const chartData = competitors.map((c) => ({
		name: c.name,
		share: c.marketShare,
	}));

	const insights = [
		{ label: 'Market Position', value: '#2 in category' },
		{ label: 'Price Competitiveness', value: 'Above average' },
		{ label: 'Customer Sentiment', value: 'Best in class' },
		{ label: 'Growth Trend', value: '+4.2% this quarter' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Users className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Competitor Comparison Report
								</CardTitle>
								<CardDescription>
									Market positioning vs key competitors
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{competitors.map((c, i) => (
								<CompetitorCard key={i} {...c} />
							))}
						</div>
						<div className="grid gap-6 @lg:grid-cols-2">
							<Card className="border-border/30 bg-muted/10">
								<CardContent className="p-4">
									<p className="mb-4 text-sm font-medium">Market Share Distribution</p>
									<ChartContainer config={chartConfig} className="h-[200px] w-full">
										<BarChart data={chartData} layout="vertical" margin={{ left: 80 }}>
											<CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
											<XAxis type="number" tickLine={false} axisLine={false} />
											<YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={70} />
											<ChartTooltip content={<ChartTooltipContent />} />
											<Bar dataKey="share" fill="var(--chart-1)" radius={4}>
												{chartData.map((_, index) => (
													<Cell
														key={`cell-${index}`}
														fill={index === 0 ? 'var(--chart-1)' : 'var(--chart-2)'}
													/>
												))}
											</Bar>
										</BarChart>
									</ChartContainer>
								</CardContent>
							</Card>
							<Card className="border-border/30 bg-muted/10">
								<CardContent className="p-4">
									<p className="mb-4 text-sm font-medium">Competitive Insights</p>
									<div className="grid gap-3 @sm:grid-cols-2">
										{insights.map((ins, i) => (
											<div key={i} className="rounded-lg border border-border/30 bg-muted/20 p-3">
												<p className="text-xs text-muted-foreground">{ins.label}</p>
												<p className="mt-1 font-medium">{ins.value}</p>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
