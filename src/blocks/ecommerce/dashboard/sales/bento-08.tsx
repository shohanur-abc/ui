'use client';

import {
	Users,
	Star,
	MessageSquare,
	ThumbsUp,
	ThumbsDown,
	TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type CustomerSegment = {
	name: string;
	count: number;
	revenue: number;
	percentage: number;
	color: string;
};

type ReviewSummary = {
	rating: number;
	count: number;
	percentage: number;
};

type RecentReview = {
	customer: string;
	avatar: string;
	rating: number;
	comment: string;
	date: string;
};

type BentoLayout8Props = {
	segments: CustomerSegment[];
	reviews: ReviewSummary[];
	recentReviews: RecentReview[];
	satisfactionScore: number;
};

const SegmentCard = ({ segments }: { segments: CustomerSegment[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Users className="size-4 text-muted-foreground" />
				<CardTitle className="text-sm font-medium">Customer Segments</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{segments.map((segment, idx) => (
				<div key={idx} className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="font-medium">{segment.name}</span>
						<span className="text-muted-foreground">
							{segment.count.toLocaleString()}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Progress value={segment.percentage} className="h-2 flex-1" />
						<span className="text-xs font-medium w-10">
							{segment.percentage}%
						</span>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const ReviewsCard = ({
	reviews,
	satisfactionScore,
}: {
	reviews: ReviewSummary[];
	satisfactionScore: number;
}) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Star className="size-4 text-amber-500" />
					<CardTitle className="text-sm font-medium">Review Summary</CardTitle>
				</div>
				<Badge variant="outline" className="gap-1">
					<Star className="size-3 fill-amber-500 text-amber-500" />
					{satisfactionScore.toFixed(1)}
				</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{reviews.map((review, idx) => (
				<div key={idx} className="flex items-center gap-2">
					<div className="flex items-center gap-0.5 w-16">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className={`size-3 ${
									i < review.rating
										? 'fill-amber-500 text-amber-500'
										: 'text-muted'
								}`}
							/>
						))}
					</div>
					<Progress value={review.percentage} className="h-2 flex-1" />
					<span className="text-xs text-muted-foreground w-8">
						{review.count}
					</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const RecentReviewsCard = ({ reviews }: { reviews: RecentReview[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @xl:col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<MessageSquare className="size-4 text-muted-foreground" />
				<CardTitle className="text-sm font-medium">Recent Reviews</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{reviews.map((review, idx) => (
				<div key={idx} className="flex gap-3 p-3 rounded-lg bg-muted/30">
					<Avatar className="size-10">
						<AvatarImage src={review.avatar} alt={review.customer} />
						<AvatarFallback>
							{review.customer
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<div className="flex items-center justify-between mb-1">
							<span className="font-medium text-sm">{review.customer}</span>
							<div className="flex items-center gap-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`size-3 ${
											i < review.rating
												? 'fill-amber-500 text-amber-500'
												: 'text-muted'
										}`}
									/>
								))}
							</div>
						</div>
						<p className="text-sm text-muted-foreground line-clamp-2">
							{review.comment}
						</p>
						<span className="text-xs text-muted-foreground">{review.date}</span>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const BentoLayout8 = ({
	segments,
	reviews,
	recentReviews,
	satisfactionScore,
}: BentoLayout8Props) => (
	<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-4">
		<SegmentCard segments={segments} />
		<ReviewsCard reviews={reviews} satisfactionScore={satisfactionScore} />
		<RecentReviewsCard reviews={recentReviews} />
	</div>
);

export default function Main() {
	const segments: CustomerSegment[] = [
		{
			name: 'Platinum',
			count: 1250,
			revenue: 425000,
			percentage: 42,
			color: 'oklch(0.70 0.18 155)',
		},
		{
			name: 'Gold',
			count: 3420,
			revenue: 285000,
			percentage: 28,
			color: 'oklch(0.75 0.16 85)',
		},
		{
			name: 'Silver',
			count: 5680,
			revenue: 168000,
			percentage: 18,
			color: 'oklch(0.65 0.02 250)',
		},
		{
			name: 'Bronze',
			count: 8920,
			revenue: 92000,
			percentage: 12,
			color: 'oklch(0.60 0.14 45)',
		},
	];

	const reviews: ReviewSummary[] = [
		{ rating: 5, count: 1842, percentage: 68 },
		{ rating: 4, count: 542, percentage: 20 },
		{ rating: 3, count: 189, percentage: 7 },
		{ rating: 2, count: 82, percentage: 3 },
		{ rating: 1, count: 54, percentage: 2 },
	];

	const recentReviews: RecentReview[] = [
		{
			customer: 'Alice Johnson',
			avatar: '/placeholder.svg',
			rating: 5,
			comment:
				'Excellent product quality and fast shipping. Will definitely order again!',
			date: '2 hours ago',
		},
		{
			customer: 'Bob Smith',
			avatar: '/placeholder.svg',
			rating: 4,
			comment:
				'Great product, packaging could be better but overall satisfied.',
			date: '5 hours ago',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoLayout8
					segments={segments}
					reviews={reviews}
					recentReviews={recentReviews}
					satisfactionScore={4.5}
				/>
			</div>
		</section>
	);
}
