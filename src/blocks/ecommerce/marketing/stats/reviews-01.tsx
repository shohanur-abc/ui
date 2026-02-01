import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

interface ReviewStatProps {
	rating: number;
	totalReviews: string;
	breakdown: { stars: number; count: number; percentage: number }[];
}

interface SentimentStatProps {
	positive: number;
	neutral: number;
	negative: number;
}

const ReviewBreakdown = ({
	rating,
	totalReviews,
	breakdown,
}: ReviewStatProps) => (
	<Card className="p-6 @md:p-8">
		<div className="flex items-start gap-6">
			<div className="text-center">
				<p className="text-5xl font-bold tracking-tight">{rating}</p>
				<div className="mt-2 flex justify-center gap-0.5">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star
							key={i}
							className={`size-4 ${i < Math.floor(rating) ? 'fill-primary text-primary' : 'fill-secondary text-secondary'}`}
						/>
					))}
				</div>
				<p className="mt-2 text-sm text-muted-foreground">
					{totalReviews} reviews
				</p>
			</div>
			<div className="flex-1 space-y-2">
				{breakdown.map((item) => (
					<div key={item.stars} className="flex items-center gap-2">
						<span className="w-3 text-xs text-muted-foreground">
							{item.stars}
						</span>
						<Star className="size-3 text-primary" />
						<div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
							<div
								className="h-full rounded-full bg-primary transition-all duration-500"
								style={{ width: `${item.percentage}%` }}
							/>
						</div>
						<span className="w-12 text-right text-xs text-muted-foreground">
							{item.count}
						</span>
					</div>
				))}
			</div>
		</div>
	</Card>
);

const SentimentCard = ({ positive, neutral, negative }: SentimentStatProps) => (
	<Card className="p-6">
		<div className="mb-4 flex items-center gap-2">
			<MessageSquare className="size-4 text-primary" />
			<h3 className="font-semibold">Sentiment Analysis</h3>
		</div>
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<ThumbsUp className="size-4 text-accent" />
					<span className="text-sm">Positive</span>
				</div>
				<span className="font-semibold">{positive}%</span>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="size-4 rounded-full bg-secondary" />
					<span className="text-sm">Neutral</span>
				</div>
				<span className="font-semibold">{neutral}%</span>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<ThumbsDown className="size-4 text-destructive" />
					<span className="text-sm">Negative</span>
				</div>
				<span className="font-semibold">{negative}%</span>
			</div>
		</div>
	</Card>
);

export default function Main() {
	const review: ReviewStatProps = {
		rating: 4.8,
		totalReviews: '12,847',
		breakdown: [
			{ stars: 5, count: 8294, percentage: 64 },
			{ stars: 4, count: 3184, percentage: 25 },
			{ stars: 3, count: 847, percentage: 7 },
			{ stars: 2, count: 284, percentage: 2 },
			{ stars: 1, count: 238, percentage: 2 },
		],
	};

	const sentiment: SentimentStatProps = {
		positive: 78,
		neutral: 14,
		negative: 8,
	};

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<ReviewBreakdown {...review} />
					</div>
					<SentimentCard {...sentiment} />
				</div>
			</div>
		</section>
	);
}
