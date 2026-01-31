import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Star,
	ThumbsUp,
	ThumbsDown,
	Flag,
	MoreVertical,
	CheckCircle,
	type LucideIcon,
} from 'lucide-react';

interface Review {
	id: string;
	customer: {
		name: string;
		avatar?: string;
		initials: string;
		isVerified?: boolean;
	};
	rating: number;
	title: string;
	content: string;
	product: {
		name: string;
		sku: string;
	};
	timestamp: string;
	helpful: number;
	notHelpful: number;
	status: 'pending' | 'approved' | 'flagged';
}

interface ReviewFeedProps {
	title: string;
	subtitle?: string;
	reviews: Review[];
	averageRating: number;
	totalReviews: number;
}

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-0.5">
		{[1, 2, 3, 4, 5].map((star) => (
			<Star
				key={star}
				className={`size-4 ${
					star <= rating
						? 'fill-amber-400 text-amber-400'
						: 'fill-muted text-muted'
				}`}
			/>
		))}
	</div>
);

const StatusBadge = ({ status }: { status: Review['status'] }) => {
	const config = {
		pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		flagged: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
	};

	return (
		<Badge variant="outline" className={`text-xs ${config[status]}`}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</Badge>
	);
};

const ReviewCard = ({ review }: { review: Review }) => (
	<div className="group rounded-xl border border-border/50 bg-card/80 p-5 backdrop-blur-sm transition-all hover:border-primary/30">
		<div className="flex flex-col gap-4">
			<div className="flex items-start justify-between gap-3">
				<div className="flex items-center gap-3">
					<Avatar className="size-10">
						<AvatarImage src={review.customer.avatar} alt={review.customer.name} />
						<AvatarFallback className="bg-primary/20 text-primary">
							{review.customer.initials}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<div className="flex items-center gap-2">
							<span className="font-medium text-foreground">
								{review.customer.name}
							</span>
							{review.customer.isVerified && (
								<CheckCircle className="size-4 text-emerald-400" />
							)}
						</div>
						<span className="text-xs text-muted-foreground">
							{review.timestamp}
						</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<StatusBadge status={review.status} />
					<Button variant="ghost" size="icon-sm">
						<MoreVertical className="size-4" />
					</Button>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-3">
					<StarRating rating={review.rating} />
					<span className="text-sm font-medium text-foreground">
						{review.title}
					</span>
				</div>
				<p className="text-sm text-muted-foreground leading-relaxed">
					{review.content}
				</p>
			</div>

			<div className="flex items-center gap-2 text-xs">
				<span className="text-muted-foreground">Product:</span>
				<Badge variant="outline" className="font-mono">
					{review.product.sku}
				</Badge>
				<span className="text-foreground truncate">{review.product.name}</span>
			</div>

			<div className="flex items-center justify-between pt-3 border-t border-border/50">
				<div className="flex items-center gap-3">
					<button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
						<ThumbsUp className="size-4" />
						<span>{review.helpful}</span>
					</button>
					<button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-rose-400 transition-colors">
						<ThumbsDown className="size-4" />
						<span>{review.notHelpful}</span>
					</button>
				</div>
				<div className="flex items-center gap-2">
					{review.status === 'pending' && (
						<>
							<Button variant="outline" size="sm">
								Reject
							</Button>
							<Button size="sm">Approve</Button>
						</>
					)}
					{review.status === 'approved' && (
						<button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-rose-400 transition-colors">
							<Flag className="size-4" />
							<span>Flag</span>
						</button>
					)}
				</div>
			</div>
		</div>
	</div>
);

const RatingSummary = ({
	averageRating,
	totalReviews,
}: {
	averageRating: number;
	totalReviews: number;
}) => (
	<div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
		<div className="flex flex-col items-center gap-1 px-4 border-r border-border">
			<span className="text-3xl font-bold text-foreground">
				{averageRating.toFixed(1)}
			</span>
			<StarRating rating={Math.round(averageRating)} />
		</div>
		<div className="flex flex-col">
			<span className="text-lg font-semibold text-foreground">
				{totalReviews.toLocaleString()}
			</span>
			<span className="text-sm text-muted-foreground">Total Reviews</span>
		</div>
	</div>
);

const ReviewFeed = ({
	title,
	subtitle,
	reviews,
	averageRating,
	totalReviews,
}: ReviewFeedProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="border-b border-border/50">
			<div className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
				<div>
					<CardTitle className="text-lg font-semibold">{title}</CardTitle>
					{subtitle && (
						<p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
					)}
				</div>
				<RatingSummary
					averageRating={averageRating}
					totalReviews={totalReviews}
				/>
			</div>
		</CardHeader>
		<CardContent className="pt-6">
			<div className="space-y-4">
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
			customer: {
				name: 'Jennifer Adams',
				initials: 'JA',
				isVerified: true,
			},
			rating: 5,
			title: 'Exceeded all expectations!',
			content:
				'This is hands down the best purchase I\'ve made this year. The build quality is exceptional, and the features work exactly as advertised. Highly recommend to anyone considering it.',
			product: {
				name: 'Premium Wireless Headphones',
				sku: 'SKU-WH-2847',
			},
			timestamp: '2 hours ago',
			helpful: 24,
			notHelpful: 2,
			status: 'approved',
		},
		{
			id: '2',
			customer: {
				name: 'Robert Chen',
				initials: 'RC',
			},
			rating: 4,
			title: 'Great product, minor issues',
			content:
				'Overall very satisfied with the purchase. The only reason I\'m not giving 5 stars is the slightly longer shipping time than expected. Product itself is fantastic.',
			product: {
				name: 'Smart Watch Pro',
				sku: 'SKU-SW-1293',
			},
			timestamp: '5 hours ago',
			helpful: 12,
			notHelpful: 1,
			status: 'pending',
		},
		{
			id: '3',
			customer: {
				name: 'Maria Garcia',
				initials: 'MG',
				isVerified: true,
			},
			rating: 2,
			title: 'Not as described',
			content:
				'The product looks different from the photos. The color is off and the material feels cheaper than expected. Considering returning it.',
			product: {
				name: 'Bluetooth Speaker XL',
				sku: 'SKU-BS-4521',
			},
			timestamp: '1 day ago',
			helpful: 8,
			notHelpful: 15,
			status: 'flagged',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<ReviewFeed
					title="Recent Reviews"
					subtitle="Customer feedback requiring attention"
					reviews={reviews}
					averageRating={4.2}
					totalReviews={1847}
				/>
			</div>
		</section>
	);
}
