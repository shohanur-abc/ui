import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Star, MessageCircle, ThumbsUp, Flag } from 'lucide-react';

interface OrderReview {
	orderId: string;
	customer: { name: string; avatar: string; initials: string };
	product: string;
	rating: number;
	review: string;
	helpfulCount: number;
	date: string;
	sentiment: 'positive' | 'neutral' | 'negative';
}

interface ReviewCardProps {
	review: OrderReview;
	labels: { helpful: string; report: string };
}

interface RatingStarsProps {
	rating: number;
}

const RatingStars = ({ rating }: RatingStarsProps) => (
	<div className="flex items-center gap-0.5">
		{Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
			/>
		))}
	</div>
);

const SentimentIndicator = ({ sentiment }: { sentiment: OrderReview['sentiment'] }) => {
	const config: Record<OrderReview['sentiment'], { label: string; className: string }> = {
		positive: { label: 'Positive', className: 'bg-accent/10 text-accent border-accent/30' },
		neutral: { label: 'Neutral', className: 'bg-muted text-muted-foreground' },
		negative: { label: 'Negative', className: 'bg-destructive/10 text-destructive border-destructive/30' },
	};
	return (
		<Badge variant="outline" className={config[sentiment].className}>
			{config[sentiment].label}
		</Badge>
	);
};

const ReviewCard = ({ review, labels }: ReviewCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm group hover:border-primary/30 transition-all">
		<CardContent className="p-5">
			<div className="flex items-start gap-4">
				<Avatar className="size-10">
					<AvatarImage src={review.customer.avatar} alt={review.customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary">{review.customer.initials}</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between mb-1">
						<span className="font-medium">{review.customer.name}</span>
						<span className="text-xs text-muted-foreground">{review.date}</span>
					</div>
					<div className="flex items-center gap-2 mb-2">
						<RatingStars rating={review.rating} />
						<SentimentIndicator sentiment={review.sentiment} />
					</div>
					<p className="text-sm text-muted-foreground mb-1">
						<span className="font-medium text-foreground">{review.product}</span>
						<span className="mx-1.5">•</span>
						<span className="font-mono text-xs">{review.orderId}</span>
					</p>
					<p className="text-sm leading-relaxed">{review.review}</p>
					<div className="flex items-center gap-3 mt-4">
						<Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
							<ThumbsUp className="size-4" />
							{labels.helpful} ({review.helpfulCount})
						</Button>
						<Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-destructive">
							<Flag className="size-4" />
							{labels.report}
						</Button>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const labels = { helpful: 'Helpful', report: 'Report' };

	const reviews: OrderReview[] = [
		{
			orderId: '#ORD-7891',
			customer: { name: 'Sarah Johnson', avatar: '', initials: 'SJ' },
			product: 'Wireless Headphones Pro',
			rating: 5,
			review: 'Absolutely amazing quality! The sound is crystal clear and the battery lasts forever. Best purchase I\'ve made this year.',
			helpfulCount: 24,
			date: 'Jan 28, 2026',
			sentiment: 'positive',
		},
		{
			orderId: '#ORD-7856',
			customer: { name: 'Mike Chen', avatar: '', initials: 'MC' },
			product: 'USB-C Hub',
			rating: 3,
			review: 'Works as expected but nothing special. The build quality could be better for the price.',
			helpfulCount: 8,
			date: 'Jan 27, 2026',
			sentiment: 'neutral',
		},
		{
			orderId: '#ORD-7812',
			customer: { name: 'Emily Davis', avatar: '', initials: 'ED' },
			product: 'Laptop Stand',
			rating: 2,
			review: 'Disappointed with this product. Started wobbling after just a week of use. Would not recommend.',
			helpfulCount: 15,
			date: 'Jan 26, 2026',
			sentiment: 'negative',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="space-y-4">
					{reviews.map((review) => (
						<ReviewCard key={review.orderId} review={review} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
