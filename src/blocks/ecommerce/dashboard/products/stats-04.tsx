'use client';

import * as React from 'react';
import {
	Star,
	TrendingUp,
	TrendingDown,
	ThumbsUp,
	ThumbsDown,
	MessageSquare,
	Camera,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface RatingDistribution {
	5: number;
	4: number;
	3: number;
	2: number;
	1: number;
}

interface ReviewStats {
	averageRating: number;
	totalReviews: number;
	ratingTrend: number;
	distribution: RatingDistribution;
	withPhotos: number;
	verified: number;
	responseRate: number;
	avgResponseTime: number;
	sentimentPositive: number;
	sentimentNegative: number;
	sentimentNeutral: number;
}

interface OverallRatingProps {
	rating: number;
	total: number;
	trend: number;
}

const OverallRating = ({ rating, total, trend }: OverallRatingProps) => {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.5;
	const isPositive = trend >= 0;

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-center gap-6">
					<div className="text-center">
						<div className="text-5xl font-bold">{rating.toFixed(1)}</div>
						<div className="mt-2 flex justify-center gap-0.5">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									className={`size-5 ${i < fullStars || (hasHalfStar && i === fullStars) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
								/>
							))}
						</div>
						<p className="mt-1 text-sm text-muted-foreground">
							{total.toLocaleString()} reviews
						</p>
					</div>
					<div className="h-16 w-px bg-border" />
					<div className={`flex items-center gap-2 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
						{isPositive ? <TrendingUp className="size-5" /> : <TrendingDown className="size-5" />}
						<div>
							<p className="text-lg font-bold">{isPositive ? '+' : ''}{trend}%</p>
							<p className="text-xs text-muted-foreground">vs last period</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

interface RatingDistributionChartProps {
	title: string;
	distribution: RatingDistribution;
	total: number;
}

const RatingDistributionChart = ({ title, distribution, total }: RatingDistributionChartProps) => {
	const ratings = [5, 4, 3, 2, 1] as const;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{ratings.map((rating) => {
						const count = distribution[rating];
						const percent = total > 0 ? (count / total) * 100 : 0;

						return (
							<div key={rating} className="flex items-center gap-3">
								<div className="flex w-12 items-center gap-1">
									<span className="font-medium">{rating}</span>
									<Star className="size-4 fill-amber-400 text-amber-400" />
								</div>
								<Progress value={percent} className="flex-1" />
								<span className="w-16 text-right text-sm text-muted-foreground">
									{count.toLocaleString()} ({percent.toFixed(0)}%)
								</span>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
};

interface ReviewQualityCardProps {
	title: string;
	withPhotos: number;
	verified: number;
	total: number;
	labels: { photos: string; verified: string };
}

const ReviewQualityCard = ({ title, withPhotos, verified, total, labels }: ReviewQualityCardProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid gap-4 @sm:grid-cols-2">
				<div className="rounded-lg border bg-muted/30 p-4 text-center">
					<Camera className="mx-auto mb-2 size-6 text-muted-foreground" />
					<div className="text-2xl font-bold">{((withPhotos / total) * 100).toFixed(0)}%</div>
					<p className="text-sm text-muted-foreground">{labels.photos}</p>
					<p className="text-xs text-muted-foreground">({withPhotos.toLocaleString()} reviews)</p>
				</div>
				<div className="rounded-lg border bg-muted/30 p-4 text-center">
					<MessageSquare className="mx-auto mb-2 size-6 text-muted-foreground" />
					<div className="text-2xl font-bold">{((verified / total) * 100).toFixed(0)}%</div>
					<p className="text-sm text-muted-foreground">{labels.verified}</p>
					<p className="text-xs text-muted-foreground">({verified.toLocaleString()} reviews)</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

interface SentimentCardProps {
	title: string;
	positive: number;
	negative: number;
	neutral: number;
	labels: { positive: string; negative: string; neutral: string };
}

const SentimentCard = ({ title, positive, negative, neutral, labels }: SentimentCardProps) => {
	const total = positive + negative + neutral;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-4 flex h-6 overflow-hidden rounded-full">
					<div
						className="bg-emerald-500 transition-all"
						style={{ width: `${(positive / total) * 100}%` }}
					/>
					<div
						className="bg-gray-400 transition-all"
						style={{ width: `${(neutral / total) * 100}%` }}
					/>
					<div
						className="bg-red-500 transition-all"
						style={{ width: `${(negative / total) * 100}%` }}
					/>
				</div>
				<div className="grid grid-cols-3 gap-4 text-center">
					<div>
						<div className="flex items-center justify-center gap-1 text-emerald-500">
							<ThumbsUp className="size-4" />
							<span className="text-xl font-bold">{((positive / total) * 100).toFixed(0)}%</span>
						</div>
						<p className="text-xs text-muted-foreground">{labels.positive}</p>
					</div>
					<div>
						<div className="flex items-center justify-center gap-1 text-gray-400">
							<span className="text-xl font-bold">{((neutral / total) * 100).toFixed(0)}%</span>
						</div>
						<p className="text-xs text-muted-foreground">{labels.neutral}</p>
					</div>
					<div>
						<div className="flex items-center justify-center gap-1 text-red-500">
							<ThumbsDown className="size-4" />
							<span className="text-xl font-bold">{((negative / total) * 100).toFixed(0)}%</span>
						</div>
						<p className="text-xs text-muted-foreground">{labels.negative}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

interface ResponseMetricsCardProps {
	title: string;
	responseRate: number;
	avgTime: number;
	labels: { rate: string; time: string; hours: string };
}

const ResponseMetricsCard = ({ title, responseRate, avgTime, labels }: ResponseMetricsCardProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid gap-4 @sm:grid-cols-2">
				<div className="text-center">
					<div className="text-3xl font-bold text-primary">{responseRate}%</div>
					<p className="text-sm text-muted-foreground">{labels.rate}</p>
					<Progress value={responseRate} className="mt-2" />
				</div>
				<div className="text-center">
					<div className="text-3xl font-bold">{avgTime}</div>
					<p className="text-sm text-muted-foreground">{labels.time}</p>
					<p className="mt-2 text-xs text-muted-foreground">{labels.hours}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const stats: ReviewStats = {
		averageRating: 4.3,
		totalReviews: 12456,
		ratingTrend: 8,
		distribution: { 5: 6234, 4: 3456, 3: 1567, 2: 789, 1: 410 },
		withPhotos: 4567,
		verified: 9876,
		responseRate: 87,
		avgResponseTime: 4.2,
		sentimentPositive: 8234,
		sentimentNegative: 1234,
		sentimentNeutral: 2988,
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-2">
					<OverallRating
						rating={stats.averageRating}
						total={stats.totalReviews}
						trend={stats.ratingTrend}
					/>
					<SentimentCard
						title="Sentiment Analysis"
						positive={stats.sentimentPositive}
						negative={stats.sentimentNegative}
						neutral={stats.sentimentNeutral}
						labels={{ positive: 'Positive', negative: 'Negative', neutral: 'Neutral' }}
					/>
				</div>

				<RatingDistributionChart
					title="Rating Distribution"
					distribution={stats.distribution}
					total={stats.totalReviews}
				/>

				<div className="grid gap-6 @lg:grid-cols-2">
					<ReviewQualityCard
						title="Review Quality"
						withPhotos={stats.withPhotos}
						verified={stats.verified}
						total={stats.totalReviews}
						labels={{ photos: 'With Photos', verified: 'Verified Purchase' }}
					/>
					<ResponseMetricsCard
						title="Response Metrics"
						responseRate={stats.responseRate}
						avgTime={stats.avgResponseTime}
						labels={{ rate: 'Response Rate', time: 'Avg Response Time', hours: 'hours' }}
					/>
				</div>
			</div>
		</section>
	);
}
