import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Star,
	ThumbsUp,
	ThumbsDown,
	MessageSquare,
	Flag,
	CheckCircle2,
	Filter,
	type LucideIcon,
} from 'lucide-react';

interface Review {
	id: string;
	product: {
		name: string;
		image?: string;
	};
	customer: {
		name: string;
		avatar?: string;
		initials: string;
		isVerified?: boolean;
	};
	rating: number;
	title: string;
	content: string;
	sentiment: 'positive' | 'neutral' | 'negative';
	helpful: number;
	replies: number;
	status: 'pending' | 'approved' | 'flagged';
	timestamp: string;
}

interface ReviewStreamProps {
	title: string;
	reviews: Review[];
	stats: {
		avgRating: number;
		totalReviews: number;
		pendingModeration: number;
	};
}

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${
					i < rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted'
				}`}
			/>
		))}
	</div>
);

const SentimentIcon = ({ sentiment }: { sentiment: Review['sentiment'] }) => {
	const config: Record<
		Review['sentiment'],
		{ icon: LucideIcon; className: string }
	> = {
		positive: { icon: ThumbsUp, className: 'text-emerald-400' },
		neutral: { icon: MessageSquare, className: 'text-muted-foreground' },
		negative: { icon: ThumbsDown, className: 'text-rose-400' },
	};

	const { icon: Icon, className } = config[sentiment];
	return <Icon className={`size-4 ${className}`} />;
};

const StatusBadge = ({ status }: { status: Review['status'] }) => {
	const config = {
		pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		flagged: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
	};

	const icons = {
		pending: null,
		approved: <CheckCircle2 className="size-3" />,
		flagged: <Flag className="size-3" />,
	};

	return (
		<Badge variant="outline" className={`gap-1 capitalize ${config[status]}`}>
			{icons[status]}
			{status}
		</Badge>
	);
};

const ReviewCard = ({ review }: { review: Review }) => (
	<div
		className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
			review.status === 'flagged'
				? 'border-rose-500/30 bg-rose-500/5'
				: review.status === 'pending'
					? 'border-amber-500/30 bg-amber-500/5'
					: 'border-border/50 bg-card/80 hover:border-primary/30'
		}`}
	>
		<div className="flex items-start gap-4 mb-3">
			<Avatar className="size-10">
				<AvatarImage src={review.customer.avatar} alt={review.customer.name} />
				<AvatarFallback className="bg-secondary text-sm">
					{review.customer.initials}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-2">
						<span className="font-medium text-foreground">
							{review.customer.name}
						</span>
						{review.customer.isVerified && (
							<Badge
								variant="outline"
								className="text-xs gap-1 bg-blue-500/10 text-blue-400 border-blue-500/30"
							>
								<CheckCircle2 className="size-3" />
								Verified
							</Badge>
						)}
					</div>
					<StatusBadge status={review.status} />
				</div>
				<div className="flex items-center gap-2 mt-1">
					<StarRating rating={review.rating} />
					<span className="text-xs text-muted-foreground">
						on {review.product.name}
					</span>
				</div>
			</div>
		</div>

		<div className="pl-14">
			<h4 className="font-medium text-foreground mb-1">{review.title}</h4>
			<p className="text-sm text-muted-foreground line-clamp-2 mb-3">
				{review.content}
			</p>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4 text-xs text-muted-foreground">
					<div className="flex items-center gap-1">
						<SentimentIcon sentiment={review.sentiment} />
						<span className="capitalize">{review.sentiment}</span>
					</div>
					<div className="flex items-center gap-1">
						<ThumbsUp className="size-3" />
						<span>{review.helpful} helpful</span>
					</div>
					<div className="flex items-center gap-1">
						<MessageSquare className="size-3" />
						<span>{review.replies} replies</span>
					</div>
				</div>
				<span className="text-xs text-muted-foreground">
					{review.timestamp}
				</span>
			</div>
		</div>
	</div>
);

const ReviewStats = ({ stats }: { stats: ReviewStreamProps['stats'] }) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
			<Star className="size-5 fill-amber-400 text-amber-400" />
			<div>
				<span className="text-xl font-bold text-amber-400">
					{stats.avgRating.toFixed(1)}
				</span>
				<span className="text-xs text-muted-foreground block">Avg Rating</span>
			</div>
		</div>
		<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
			<MessageSquare className="size-5 text-primary" />
			<div>
				<span className="text-xl font-bold text-foreground">
					{stats.totalReviews}
				</span>
				<span className="text-xs text-muted-foreground block">Total</span>
			</div>
		</div>
		<div className="flex items-center gap-3 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
			<Flag className="size-5 text-rose-400" />
			<div>
				<span className="text-xl font-bold text-rose-400">
					{stats.pendingModeration}
				</span>
				<span className="text-xs text-muted-foreground block">Pending</span>
			</div>
		</div>
	</div>
);

const ReviewStream = ({ title, reviews, stats }: ReviewStreamProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Star className="size-5" />
				{title}
			</CardTitle>
			<Button variant="ghost" size="sm" className="gap-1">
				<Filter className="size-4" />
				Filter
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<ReviewStats stats={stats} />
			<div className="space-y-3 max-h-[400px] overflow-y-auto">
				{reviews.map((review) => (
					<ReviewCard key={review.id} review={review} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const reviews: Review[] = [
		{
			id: '1',
			product: { name: 'Premium Headphones' },
			customer: { name: 'Sarah Chen', initials: 'SC', isVerified: true },
			rating: 5,
			title: "Best headphones I've ever owned!",
			content:
				'The sound quality is incredible, and the noise cancellation is perfect for working from home. Battery life exceeds expectations.',
			sentiment: 'positive',
			helpful: 42,
			replies: 3,
			status: 'approved',
			timestamp: '2 min ago',
		},
		{
			id: '2',
			product: { name: 'Smart Watch Pro' },
			customer: { name: 'Mike Johnson', initials: 'MJ', isVerified: true },
			rating: 4,
			title: 'Great features, minor issues',
			content:
				'Love the fitness tracking and notifications. The only downside is the screen could be a bit brighter in direct sunlight.',
			sentiment: 'positive',
			helpful: 18,
			replies: 1,
			status: 'approved',
			timestamp: '15 min ago',
		},
		{
			id: '3',
			product: { name: 'Mechanical Keyboard' },
			customer: { name: 'Alex Kim', initials: 'AK' },
			rating: 2,
			title: 'Keys stopped working after a week',
			content:
				'Some keys started double-clicking after just one week of use. Very disappointed with the quality.',
			sentiment: 'negative',
			helpful: 5,
			replies: 0,
			status: 'pending',
			timestamp: '30 min ago',
		},
		{
			id: '4',
			product: { name: 'Wireless Mouse' },
			customer: { name: 'Emily Davis', initials: 'ED' },
			rating: 1,
			title: 'THIS IS A SCAM!!!',
			content: 'NEVER RECEIVED MY ORDER THEY ARE THIEVES STAY AWAY!!!',
			sentiment: 'negative',
			helpful: 0,
			replies: 1,
			status: 'flagged',
			timestamp: '1 hour ago',
		},
		{
			id: '5',
			product: { name: '4K Monitor' },
			customer: { name: 'Jordan Lee', initials: 'JL', isVerified: true },
			rating: 3,
			title: 'Good monitor, nothing special',
			content:
				'It works as expected. Image quality is decent but not outstanding for the price point.',
			sentiment: 'neutral',
			helpful: 12,
			replies: 0,
			status: 'approved',
			timestamp: '2 hours ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<ReviewStream
					title="Review Stream"
					reviews={reviews}
					stats={{
						avgRating: 4.2,
						totalReviews: 1847,
						pendingModeration: 12,
					}}
				/>
			</div>
		</section>
	);
}
