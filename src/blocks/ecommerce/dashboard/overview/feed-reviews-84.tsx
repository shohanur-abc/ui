import {
	ArrowUpRight,
	MoreHorizontal,
	Star,
	ThumbsDown,
	ThumbsUp,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type ReviewItem = {
	id: string;
	product: string;
	productId: string;
	customer: { name: string; initials: string };
	rating: number;
	title: string;
	comment: string;
	date: string;
	helpful: number;
	verified: boolean;
};

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-0.5">
		{[1, 2, 3, 4, 5].map((star) => (
			<Star
				key={star}
				className={`size-4 ${star <= rating ? 'fill-amber-500 text-amber-500' : 'text-muted'}`}
			/>
		))}
	</div>
);

const ReviewCard = ({ product, customer, rating, title, comment, date, helpful, verified }: ReviewItem) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="flex items-start justify-between gap-4">
			<div className="flex items-center gap-3">
				<Avatar className="size-10">
					<AvatarFallback className="text-sm">{customer.initials}</AvatarFallback>
				</Avatar>
				<div>
					<div className="flex items-center gap-2">
						<p className="font-medium">{customer.name}</p>
						{verified && (
							<Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 text-xs">
								Verified
							</Badge>
						)}
					</div>
					<StarRating rating={rating} />
				</div>
			</div>
			<span className="text-xs text-muted-foreground">{date}</span>
		</div>
		<div className="mt-3">
			<p className="font-medium">{title}</p>
			<p className="mt-1 text-sm text-muted-foreground line-clamp-2">{comment}</p>
		</div>
		<div className="mt-3 flex items-center justify-between">
			<Badge variant="outline" className="text-xs">
				{product}
			</Badge>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
					<ThumbsUp className="size-3" />
					{helpful}
				</Button>
				<Button variant="ghost" size="icon" className="size-7">
					<MoreHorizontal className="size-4" />
				</Button>
			</div>
		</div>
	</div>
);

export default function Main() {
	const reviews: ReviewItem[] = [
		{ id: '1', product: 'Wireless Headphones Pro', productId: 'PRD-001', customer: { name: 'Jane Smith', initials: 'JS' }, rating: 5, title: 'Amazing sound quality!', comment: 'These headphones exceeded my expectations. The noise cancellation is incredible and the battery life is outstanding.', date: 'Dec 12, 2024', helpful: 24, verified: true },
		{ id: '2', product: 'Smart Watch Ultra', productId: 'PRD-002', customer: { name: 'Michael Chen', initials: 'MC' }, rating: 4, title: 'Great features, minor issues', comment: 'Love the features and design. The only downside is the screen could be brighter outdoors.', date: 'Dec 11, 2024', helpful: 18, verified: true },
		{ id: '3', product: 'Ergonomic Laptop Stand', productId: 'PRD-003', customer: { name: 'Sarah Wilson', initials: 'SW' }, rating: 5, title: 'Perfect for my setup', comment: 'Exactly what I needed for my home office. Sturdy, adjustable, and looks great.', date: 'Dec 11, 2024', helpful: 15, verified: true },
		{ id: '4', product: 'Mechanical Keyboard', productId: 'PRD-004', customer: { name: 'Bob Wilson', initials: 'BW' }, rating: 3, title: 'Good but noisy', comment: 'The keyboard feels great to type on but it is quite loud. Not ideal for office use.', date: 'Dec 10, 2024', helpful: 8, verified: false },
		{ id: '5', product: 'USB-C Hub 7-in-1', productId: 'PRD-005', customer: { name: 'Lisa Davis', initials: 'LD' }, rating: 5, title: 'Essential accessory', comment: 'Works flawlessly with my MacBook. All ports work as expected and the build quality is excellent.', date: 'Dec 10, 2024', helpful: 21, verified: true },
	];

	const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader className="flex-row items-center justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								<Star className="size-5 fill-amber-500 text-amber-500" />
								Recent Reviews
							</CardTitle>
							<CardDescription>Average rating: {avgRating} stars</CardDescription>
						</div>
						<Button variant="outline" size="sm" className="gap-1">
							View All
							<ArrowUpRight className="size-3" />
						</Button>
					</CardHeader>
					<CardContent className="space-y-3">
						{reviews.map((review) => (
							<ReviewCard key={review.id} {...review} />
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
