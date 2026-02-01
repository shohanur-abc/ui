'use client';

import { Pie, PieChart, Cell } from 'recharts';
import { Star, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';

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
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type RatingProps = {
	stars: number;
	count: string;
	percentage: number;
};

const RatingBar = ({ stars, count, percentage }: RatingProps) => (
	<div className="flex items-center gap-3">
		<div className="flex w-16 items-center gap-1">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-3 ${i < stars ? 'fill-amber-500 text-amber-500' : 'text-muted'}`}
				/>
			))}
		</div>
		<div className="flex-1">
			<Progress value={percentage} className="h-2" />
		</div>
		<span className="w-14 text-right text-sm text-muted-foreground">
			{count}
		</span>
		<span className="w-10 text-right text-sm font-medium">{percentage}%</span>
	</div>
);

type SentimentProps = {
	label: string;
	count: string;
	percentage: number;
	icon: React.ElementType;
	color: string;
};

const SentimentCard = ({
	label,
	count,
	percentage,
	icon: Icon,
	color,
}: SentimentProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<div
					className="rounded-lg p-2"
					style={{ backgroundColor: `${color}20` }}
				>
					<Icon className="size-5" style={{ color }} />
				</div>
				<div>
					<p className="font-medium">{label}</p>
					<p className="text-xs text-muted-foreground">{count} reviews</p>
				</div>
			</div>
			<Progress value={percentage} className="mt-3 h-1.5" />
			<p className="mt-1 text-xs text-muted-foreground">
				{percentage}% of reviews
			</p>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	reviews: {
		label: 'Reviews',
	},
};

export default function Main() {
	const ratings: RatingProps[] = [
		{ stars: 5, count: '4,250', percentage: 52 },
		{ stars: 4, count: '2,180', percentage: 27 },
		{ stars: 3, count: '980', percentage: 12 },
		{ stars: 2, count: '420', percentage: 5 },
		{ stars: 1, count: '320', percentage: 4 },
	];

	const sentiments: SentimentProps[] = [
		{
			label: 'Positive',
			count: '6,430',
			percentage: 79,
			icon: ThumbsUp,
			color: 'oklch(0.7 0.15 145)',
		},
		{
			label: 'Neutral',
			count: '980',
			percentage: 12,
			icon: Meh,
			color: 'oklch(0.7 0.15 85)',
		},
		{
			label: 'Negative',
			count: '740',
			percentage: 9,
			icon: ThumbsDown,
			color: 'oklch(0.65 0.2 25)',
		},
	];

	const chartData = [
		{ name: 'Positive', value: 79, fill: 'var(--chart-1)' },
		{ name: 'Neutral', value: 12, fill: 'var(--chart-2)' },
		{ name: 'Negative', value: 9, fill: 'var(--chart-5)' },
	];

	const topics = [
		{ topic: 'Product Quality', mentions: 2450, sentiment: 'positive' },
		{ topic: 'Shipping Speed', mentions: 1850, sentiment: 'positive' },
		{ topic: 'Customer Service', mentions: 1280, sentiment: 'positive' },
		{ topic: 'Packaging', mentions: 920, sentiment: 'neutral' },
		{ topic: 'Price', mentions: 680, sentiment: 'negative' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Star className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Review & Rating Breakdown
								</CardTitle>
								<CardDescription>Customer feedback analysis</CardDescription>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<div className="flex items-center gap-1">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										key={i}
										className="size-4 fill-amber-500 text-amber-500"
									/>
								))}
							</div>
							<span className="font-bold">4.3</span>
							<span className="text-sm text-muted-foreground">
								(8,150 reviews)
							</span>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-6 @lg:grid-cols-2">
							<Card className="border-border/30 bg-muted/10">
								<CardContent className="p-4">
									<p className="mb-4 text-sm font-medium">
										Rating Distribution
									</p>
									<div className="space-y-3">
										{ratings.map((r, i) => (
											<RatingBar key={i} {...r} />
										))}
									</div>
								</CardContent>
							</Card>
							<div className="grid gap-4 @sm:grid-cols-3">
								{sentiments.map((s, i) => (
									<SentimentCard key={i} {...s} />
								))}
							</div>
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<p className="mb-4 text-sm font-medium">Top Mentioned Topics</p>
								<div className="flex flex-wrap gap-2">
									{topics.map((t, i) => (
										<Badge
											key={i}
											variant="outline"
											className={
												t.sentiment === 'positive'
													? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
													: t.sentiment === 'negative'
														? 'border-rose-500/20 bg-rose-500/10 text-rose-500'
														: 'border-amber-500/20 bg-amber-500/10 text-amber-500'
											}
										>
											{t.topic} ({t.mentions})
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
