'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type Review = {
	product: string;
	customer: string;
	rating: number;
	comment: string;
	date: string;
	helpful: number;
	status: 'published' | 'pending' | 'flagged';
};

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5">
		{[1, 2, 3, 4, 5].map((star) => (
			<svg
				key={star}
				className={`size-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted'}`}
				viewBox="0 0 20 20"
			>
				<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
			</svg>
		))}
	</div>
);

const ReviewRow = ({ review }: { review: Review }) => (
	<TableRow className="hover:bg-muted/30">
		<TableCell className="font-medium max-w-[150px] truncate">
			{review.product}
		</TableCell>
		<TableCell>{review.customer}</TableCell>
		<TableCell>
			<StarRating rating={review.rating} />
		</TableCell>
		<TableCell className="max-w-[250px]">
			<p className="truncate text-sm text-muted-foreground">{review.comment}</p>
		</TableCell>
		<TableCell className="text-muted-foreground text-sm">
			{review.date}
		</TableCell>
		<TableCell>{review.helpful}</TableCell>
		<TableCell>
			<Badge
				variant="outline"
				className={
					review.status === 'published'
						? 'text-emerald-500 border-emerald-500/30'
						: review.status === 'pending'
							? 'text-amber-500 border-amber-500/30'
							: 'text-rose-500 border-rose-500/30'
				}
			>
				{review.status.charAt(0).toUpperCase() + review.status.slice(1)}
			</Badge>
		</TableCell>
	</TableRow>
);

const reviews: Review[] = [
	{
		product: 'Wireless Headphones Pro',
		customer: 'Sarah J.',
		rating: 5,
		comment: 'Amazing sound quality and very comfortable for long use.',
		date: 'Jan 18',
		helpful: 24,
		status: 'published',
	},
	{
		product: 'Smart Watch Ultra',
		customer: 'Michael C.',
		rating: 4,
		comment: 'Great features but battery life could be better.',
		date: 'Jan 17',
		helpful: 12,
		status: 'published',
	},
	{
		product: 'Portable Speaker',
		customer: 'Emily D.',
		rating: 3,
		comment: 'Decent sound but build quality feels cheap.',
		date: 'Jan 17',
		helpful: 8,
		status: 'pending',
	},
	{
		product: 'Bluetooth Earbuds',
		customer: 'James W.',
		rating: 5,
		comment: 'Best earbuds I have ever owned! Highly recommend.',
		date: 'Jan 16',
		helpful: 45,
		status: 'published',
	},
	{
		product: 'Gaming Mouse RGB',
		customer: 'Lisa B.',
		rating: 1,
		comment: 'Stopped working after 2 weeks. Very disappointed.',
		date: 'Jan 15',
		helpful: 3,
		status: 'flagged',
	},
	{
		product: 'Mechanical Keyboard',
		customer: 'David L.',
		rating: 4,
		comment: 'Great typing experience, keys are a bit loud though.',
		date: 'Jan 15',
		helpful: 18,
		status: 'published',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Recent Reviews
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Customer feedback and ratings
						</p>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Product</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead>Rating</TableHead>
										<TableHead>Comment</TableHead>
										<TableHead>Date</TableHead>
										<TableHead>Helpful</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{reviews.map((review, i) => (
										<ReviewRow key={i} review={review} />
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
