import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Star,
	ThumbsUp,
	ThumbsDown,
	Flag,
	CheckCircle2,
	MessageSquare,
	Reply,
	MoreVertical,
} from 'lucide-react';

interface ReviewNotification {
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
	status: 'pending' | 'approved' | 'flagged';
	timestamp: string;
}

interface ReviewAlertsProps {
	title: string;
	reviews: ReviewNotification[];
	stats: {
		pendingReviews: number;
		avgRating: number;
		todayReviews: number;
	};
}

const StarDisplay = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-3.5 ${
					i < rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted'
				}`}
			/>
		))}
	</div>
);

const SentimentBadge = ({
	sentiment,
}: {
	sentiment: ReviewNotification['sentiment'];
}) => {
	const config = {
		positive: {
			icon: ThumbsUp,
			className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		},
		neutral: {
			icon: MessageSquare,
			className: 'bg-muted text-muted-foreground border-border',
		},
		negative: {
			icon: ThumbsDown,
			className: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		},
	};

	const { icon: Icon, className } = config[sentiment];

	return (
		<Badge
			variant="outline"
			className={`gap-1 text-xs capitalize ${className}`}
		>
			<Icon className="size-3" />
			{sentiment}
		</Badge>
	);
};

const StatusBadge = ({ status }: { status: ReviewNotification['status'] }) => {
	const config = {
		pending: {
			icon: null,
			className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
			label: 'Pending',
		},
		approved: {
			icon: CheckCircle2,
			className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
			label: 'Approved',
		},
		flagged: {
			icon: Flag,
			className: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
			label: 'Flagged',
		},
	};

	const { icon: Icon, className, label } = config[status];

	return (
		<Badge variant="outline" className={`gap-1 text-xs ${className}`}>
			{Icon && <Icon className="size-3" />}
			{label}
		</Badge>
	);
};

const ReviewCard = ({ review }: { review: ReviewNotification }) => (
	<div
		className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
			review.status === 'flagged'
				? 'border-rose-500/30 bg-rose-500/5'
				: review.status === 'pending'
					? 'border-amber-500/30 bg-amber-500/5'
					: 'border-border/50 bg-card/80'
		}`}
	>
		<div className="flex items-start gap-4">
			<Avatar className="size-10">
				<AvatarImage src={review.customer.avatar} alt={review.customer.name} />
				<AvatarFallback className="bg-secondary text-sm">
					{review.customer.initials}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div>
						<div className="flex items-center gap-2 mb-1">
							<span className="font-medium text-foreground">
								{review.customer.name}
							</span>
							{review.customer.isVerified && (
								<Badge
									variant="outline"
									className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30"
								>
									Verified
								</Badge>
							)}
						</div>
						<div className="flex items-center gap-2">
							<StarDisplay rating={review.rating} />
							<SentimentBadge sentiment={review.sentiment} />
						</div>
					</div>
					<div className="flex items-center gap-1">
						<StatusBadge status={review.status} />
						<Button variant="ghost" size="icon-sm" className="size-7">
							<MoreVertical className="size-4" />
						</Button>
					</div>
				</div>
				<h4 className="font-medium text-foreground text-sm mb-1">
					{review.title}
				</h4>
				<p className="text-sm text-muted-foreground line-clamp-2 mb-2">
					{review.content}
				</p>
				<div className="flex items-center justify-between">
					<div className="text-xs text-muted-foreground">
						<span>on </span>
						<span className="text-foreground">{review.product.name}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-xs text-muted-foreground">
							{review.timestamp}
						</span>
						{review.status === 'pending' && (
							<div className="flex gap-1">
								<Button
									size="sm"
									variant="outline"
									className="h-6 gap-1 text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
								>
									<CheckCircle2 className="size-3" />
									Approve
								</Button>
								<Button
									size="sm"
									variant="outline"
									className="h-6 gap-1 text-xs"
								>
									<Reply className="size-3" />
									Reply
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	</div>
);

const ReviewStats = ({ stats }: { stats: ReviewAlertsProps['stats'] }) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
			<Flag className="size-4 text-amber-400 mb-2" />
			<span className="text-2xl font-bold text-amber-400 block">
				{stats.pendingReviews}
			</span>
			<span className="text-xs text-muted-foreground">Pending</span>
		</div>
		<div className="p-4 rounded-lg bg-muted/30 border border-border/50">
			<Star className="size-4 text-amber-400 fill-amber-400 mb-2" />
			<span className="text-2xl font-bold text-foreground block">
				{stats.avgRating.toFixed(1)}
			</span>
			<span className="text-xs text-muted-foreground">Avg Rating</span>
		</div>
		<div className="p-4 rounded-lg bg-muted/30 border border-border/50">
			<MessageSquare className="size-4 text-primary mb-2" />
			<span className="text-2xl font-bold text-foreground block">
				{stats.todayReviews}
			</span>
			<span className="text-xs text-muted-foreground">Today</span>
		</div>
	</div>
);

const ReviewAlerts = ({ title, reviews, stats }: ReviewAlertsProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Star className="size-5" />
				{title}
				{stats.pendingReviews > 0 && (
					<Badge className="bg-amber-500 text-white">
						{stats.pendingReviews}
					</Badge>
				)}
			</CardTitle>
			<Button variant="outline" size="sm">
				View All
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<ReviewStats stats={stats} />
			<ScrollArea className="h-[380px]">
				<div className="space-y-3 pr-4">
					{reviews.map((review) => (
						<ReviewCard key={review.id} review={review} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const reviews: ReviewNotification[] = [
		{
			id: '1',
			product: { name: 'Premium Wireless Headphones' },
			customer: { name: 'Sarah Chen', initials: 'SC', isVerified: true },
			rating: 5,
			title: 'Absolutely amazing sound quality!',
			content:
				'These headphones exceeded my expectations. The noise cancellation is perfect and the battery life is incredible.',
			sentiment: 'positive',
			status: 'pending',
			timestamp: '10 min ago',
		},
		{
			id: '2',
			product: { name: 'Smart Watch Pro' },
			customer: { name: 'Mike Johnson', initials: 'MJ' },
			rating: 1,
			title: 'Terrible product, do not buy!',
			content:
				'Screen stopped working after 2 days. Customer service was unhelpful. Complete waste of money.',
			sentiment: 'negative',
			status: 'flagged',
			timestamp: '30 min ago',
		},
		{
			id: '3',
			product: { name: 'Mechanical Keyboard' },
			customer: { name: 'Emily Davis', initials: 'ED', isVerified: true },
			rating: 4,
			title: 'Great keyboard with minor issues',
			content:
				'Love the typing feel and RGB lighting. Only complaint is the software could be more intuitive.',
			sentiment: 'positive',
			status: 'approved',
			timestamp: '2 hours ago',
		},
		{
			id: '4',
			product: { name: 'Wireless Mouse' },
			customer: { name: 'Alex Kim', initials: 'AK' },
			rating: 3,
			title: 'Decent but nothing special',
			content:
				'Works as expected. Nothing wrong with it, but nothing exceptional either. Average product.',
			sentiment: 'neutral',
			status: 'pending',
			timestamp: '4 hours ago',
		},
		{
			id: '5',
			product: { name: '4K Monitor' },
			customer: { name: 'Jordan Lee', initials: 'JL', isVerified: true },
			rating: 5,
			title: 'Best monitor I have ever owned',
			content:
				'The color accuracy is stunning and the 144Hz refresh rate makes everything so smooth.',
			sentiment: 'positive',
			status: 'approved',
			timestamp: '6 hours ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<ReviewAlerts
					title="Review Alerts"
					reviews={reviews}
					stats={{
						pendingReviews: 8,
						avgRating: 4.2,
						todayReviews: 23,
					}}
				/>
			</div>
		</section>
	);
}
