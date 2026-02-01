'use client';

import * as React from 'react';
import {
	Package,
	Star,
	MessageSquare,
	ThumbsUp,
	ThumbsDown,
	Flag,
	MoreHorizontal,
	CheckCircle2,
	XCircle,
	User,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface Review {
	id: string;
	rating: number;
	title: string;
	content: string;
	author: { name: string; avatar: string; verified: boolean };
	date: string;
	helpful: number;
	notHelpful: number;
	status: 'published' | 'pending' | 'flagged';
}

interface ProductWithReviews {
	id: string;
	name: string;
	sku: string;
	image: string;
	averageRating: number;
	totalReviews: number;
	ratingBreakdown: { stars: number; count: number }[];
	recentReviews: Review[];
}

interface RatingStarsProps {
	rating: number;
	size?: 'sm' | 'md';
}

const RatingStars = ({ rating, size = 'md' }: RatingStarsProps) => {
	const sizeClass = size === 'sm' ? 'size-3' : 'size-4';
	return (
		<div className="flex items-center gap-0.5">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`${sizeClass} ${
						i < Math.floor(rating)
							? 'fill-amber-400 text-amber-400'
							: i < rating
								? 'fill-amber-400/50 text-amber-400'
								: 'text-muted-foreground/30'
					}`}
				/>
			))}
		</div>
	);
};

interface RatingBreakdownProps {
	breakdown: { stars: number; count: number }[];
	total: number;
}

const RatingBreakdown = ({ breakdown, total }: RatingBreakdownProps) => (
	<div className="space-y-1">
		{breakdown.map(({ stars, count }) => {
			const percentage = total > 0 ? (count / total) * 100 : 0;
			return (
				<div key={stars} className="flex items-center gap-2 text-xs">
					<span className="w-8 text-muted-foreground">{stars} ★</span>
					<Progress value={percentage} className="h-1.5 flex-1" />
					<span className="w-8 text-right text-muted-foreground">{count}</span>
				</div>
			);
		})}
	</div>
);

interface ReviewStatusBadgeProps {
	status: 'published' | 'pending' | 'flagged';
	labels: Record<'published' | 'pending' | 'flagged', string>;
}

const ReviewStatusBadge = ({ status, labels }: ReviewStatusBadgeProps) => {
	const config = {
		published: { variant: 'default' as const, icon: CheckCircle2 },
		pending: { variant: 'secondary' as const, icon: MessageSquare },
		flagged: { variant: 'destructive' as const, icon: Flag },
	};

	const { variant, icon: Icon } = config[status];

	return (
		<Badge variant={variant} className="gap-1 text-xs">
			<Icon className="size-3" />
			{labels[status]}
		</Badge>
	);
};

interface ReviewCardProps {
	review: Review;
	actions: {
		label: string;
		icon: React.ElementType;
		onClick: (id: string) => void;
		variant?: 'destructive';
	}[];
	labels: {
		status: Record<'published' | 'pending' | 'flagged', string>;
		verified: string;
	};
}

const ReviewCard = ({ review, actions, labels }: ReviewCardProps) => (
	<div className="rounded-lg border bg-muted/30 p-3">
		<div className="mb-2 flex items-start justify-between">
			<div className="flex items-center gap-2">
				<Avatar className="size-8">
					<AvatarImage src={review.author.avatar} alt={review.author.name} />
					<AvatarFallback>
						<User className="size-4" />
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="flex items-center gap-2">
						<span className="text-sm font-medium">{review.author.name}</span>
						{review.author.verified && (
							<Badge
								variant="outline"
								className="gap-1 text-xs text-emerald-500"
							>
								<CheckCircle2 className="size-3" />
								{labels.verified}
							</Badge>
						)}
					</div>
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<RatingStars rating={review.rating} size="sm" />
						<span>•</span>
						<span>{review.date}</span>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<ReviewStatusBadge status={review.status} labels={labels.status} />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{actions.map((action) => (
							<React.Fragment key={action.label}>
								{action.variant === 'destructive' && <DropdownMenuSeparator />}
								<DropdownMenuItem
									onClick={() => action.onClick(review.id)}
									className={
										action.variant === 'destructive' ? 'text-destructive' : ''
									}
								>
									<action.icon className="mr-2 size-4" />
									{action.label}
								</DropdownMenuItem>
							</React.Fragment>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
		{review.title && <h4 className="mb-1 font-medium">{review.title}</h4>}
		<p className="mb-2 text-sm text-muted-foreground line-clamp-2">
			{review.content}
		</p>
		<div className="flex items-center gap-3 text-xs text-muted-foreground">
			<span className="flex items-center gap-1">
				<ThumbsUp className="size-3" />
				{review.helpful}
			</span>
			<span className="flex items-center gap-1">
				<ThumbsDown className="size-3" />
				{review.notHelpful}
			</span>
		</div>
	</div>
);

interface ProductRowProps {
	product: ProductWithReviews;
	reviewActions: {
		label: string;
		icon: React.ElementType;
		onClick: (id: string) => void;
		variant?: 'destructive';
	}[];
	labels: {
		reviews: string;
		status: Record<'published' | 'pending' | 'flagged', string>;
		verified: string;
	};
}

const ProductRow = ({ product, reviewActions, labels }: ProductRowProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-4 flex gap-4">
			<div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
				{product.image ? (
					<img
						src={product.image}
						alt={product.name}
						className="size-full object-cover"
					/>
				) : (
					<div className="flex size-full items-center justify-center">
						<Package className="size-10 text-muted-foreground" />
					</div>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<h3 className="font-semibold">{product.name}</h3>
				<p className="text-sm text-muted-foreground">{product.sku}</p>
				<div className="mt-2 flex items-center gap-4">
					<div className="flex items-center gap-2">
						<RatingStars rating={product.averageRating} />
						<span className="text-lg font-bold">
							{product.averageRating.toFixed(1)}
						</span>
					</div>
					<span className="text-sm text-muted-foreground">
						{product.totalReviews} {labels.reviews}
					</span>
				</div>
			</div>
			<div className="hidden w-40 @lg:block">
				<RatingBreakdown
					breakdown={product.ratingBreakdown}
					total={product.totalReviews}
				/>
			</div>
		</div>
		<div className="space-y-2">
			{product.recentReviews.map((review) => (
				<ReviewCard
					key={review.id}
					review={review}
					actions={reviewActions}
					labels={{ status: labels.status, verified: labels.verified }}
				/>
			))}
		</div>
	</div>
);

export default function Main() {
	const products: ProductWithReviews[] = [
		{
			id: '1',
			name: 'Professional Chef Knife Set',
			sku: 'KNF-PRO-001',
			image:
				'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=100&h=100&fit=crop',
			averageRating: 4.7,
			totalReviews: 234,
			ratingBreakdown: [
				{ stars: 5, count: 156 },
				{ stars: 4, count: 52 },
				{ stars: 3, count: 18 },
				{ stars: 2, count: 5 },
				{ stars: 1, count: 3 },
			],
			recentReviews: [
				{
					id: 'r1',
					rating: 5,
					title: "Best knives I've ever owned!",
					content:
						'These knives are incredibly sharp and well-balanced. The ergonomic handles make them comfortable to use for extended periods.',
					author: { name: 'Chef Mike', avatar: '', verified: true },
					date: '2 days ago',
					helpful: 24,
					notHelpful: 1,
					status: 'published',
				},
				{
					id: 'r2',
					rating: 4,
					title: 'Great quality, minor issue',
					content:
						"Overall excellent set. The paring knife could be slightly sharper out of the box, but that's a minor complaint.",
					author: { name: 'Home Cook', avatar: '', verified: false },
					date: '5 days ago',
					helpful: 12,
					notHelpful: 3,
					status: 'pending',
				},
			],
		},
		{
			id: '2',
			name: 'Cast Iron Dutch Oven',
			sku: 'POT-CIO-002',
			image:
				'https://images.unsplash.com/photo-1585442245067-bf2a97e8ea13?w=100&h=100&fit=crop',
			averageRating: 4.9,
			totalReviews: 567,
			ratingBreakdown: [
				{ stars: 5, count: 498 },
				{ stars: 4, count: 45 },
				{ stars: 3, count: 15 },
				{ stars: 2, count: 6 },
				{ stars: 1, count: 3 },
			],
			recentReviews: [
				{
					id: 'r3',
					rating: 5,
					title: 'Perfect for slow cooking',
					content:
						'This Dutch oven has become my go-to for soups, stews, and bread baking. The heat distribution is phenomenal.',
					author: { name: 'Baker Jane', avatar: '', verified: true },
					date: '1 day ago',
					helpful: 45,
					notHelpful: 0,
					status: 'published',
				},
				{
					id: 'r4',
					rating: 1,
					title: 'Arrived damaged',
					content:
						'The enamel was chipped when it arrived. Very disappointed with the packaging.',
					author: { name: 'Angry Customer', avatar: '', verified: false },
					date: '3 days ago',
					helpful: 2,
					notHelpful: 8,
					status: 'flagged',
				},
			],
		},
	];

	const reviewActions = [
		{
			label: 'Approve',
			icon: CheckCircle2,
			onClick: (id: string) => console.log('Approve', id),
		},
		{
			label: 'Flag',
			icon: Flag,
			onClick: (id: string) => console.log('Flag', id),
		},
		{
			label: 'Delete',
			icon: XCircle,
			onClick: (id: string) => console.log('Delete', id),
			variant: 'destructive' as const,
		},
	];

	const labels = {
		reviews: 'reviews',
		status: { published: 'Published', pending: 'Pending', flagged: 'Flagged' },
		verified: 'Verified',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-4 px-4 py-8 @sm:px-6 @2xl:px-8">
				{products.map((product) => (
					<ProductRow
						key={product.id}
						product={product}
						reviewActions={reviewActions}
						labels={labels}
					/>
				))}
			</div>
		</section>
	);
}
