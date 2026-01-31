'use client';

import { Star, TrendingUp, TrendingDown, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type RatingData = {
	stars: number;
	count: number;
	percentage: number;
};

type ReviewMetricsCardProps = {
	title: string;
	averageRating: number;
	totalReviews: number;
	responseRate: number;
	change: number;
	ratings: RatingData[];
};

const ReviewMetricsCard = ({
	title,
	averageRating,
	totalReviews,
	responseRate,
	change,
	ratings,
}: ReviewMetricsCardProps) => {
	const isPositive = change >= 0;

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardHeader className="flex flex-row items-center gap-3 pb-4">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<Star className="size-4" />
				</div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
					<div className="space-y-4">
						<div className="text-center p-6 rounded-xl bg-muted/30">
							<div className="flex items-center justify-center gap-1 mb-2">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										key={i}
										className={`size-5 ${i < Math.floor(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
									/>
								))}
							</div>
							<p className="text-4xl font-bold mb-1">{averageRating}</p>
							<p className="text-sm text-muted-foreground">
								{totalReviews.toLocaleString()} reviews
							</p>
							<div
								className={`mt-3 inline-flex items-center gap-1 text-sm ${isPositive ? 'text-emerald-500' : 'text-destructive'}`}
							>
								{isPositive ? (
									<TrendingUp className="size-4" />
								) : (
									<TrendingDown className="size-4" />
								)}
								{Math.abs(change)}% vs last month
							</div>
						</div>
						<div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
							<MessageSquare className="size-5 text-primary" />
							<div className="flex-1">
								<p className="text-sm font-medium">Response Rate</p>
								<p className="text-xs text-muted-foreground">
									{responseRate}% of reviews answered
								</p>
							</div>
							<Progress value={responseRate} className="w-20 h-2" />
						</div>
					</div>
					<div className="space-y-3">
						{ratings.map((rating, idx) => (
							<div key={idx} className="flex items-center gap-3">
								<span className="text-sm font-medium w-6">{rating.stars}</span>
								<Star className="size-4 fill-amber-400 text-amber-400" />
								<div className="flex-1">
									<Progress value={rating.percentage} className="h-2" />
								</div>
								<span className="text-sm text-muted-foreground w-12 text-right">
									{rating.count}
								</span>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const ratings: RatingData[] = [
		{ stars: 5, count: 1847, percentage: 65 },
		{ stars: 4, count: 654, percentage: 23 },
		{ stars: 3, count: 198, percentage: 7 },
		{ stars: 2, count: 85, percentage: 3 },
		{ stars: 1, count: 56, percentage: 2 },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<ReviewMetricsCard
					title="Customer Reviews"
					averageRating={4.6}
					totalReviews={2840}
					responseRate={87}
					change={5.2}
					ratings={ratings}
				/>
			</div>
		</section>
	);
}
