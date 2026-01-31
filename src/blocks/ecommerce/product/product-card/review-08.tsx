import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Share2, Star, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

interface ProductReviewProps {
	product: {
		image: string;
		name: string;
		price: number;
	};
	review: {
		author: string;
		avatar: string;
		rating: number;
		date: string;
		text: string;
		helpful: number;
		verified: boolean;
	};
}

const ProductThumbnail = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ProductSummary = ({ name, price }: { name: string; price: number }) => (
	<div className="min-w-0 flex-1">
		<h4 className="truncate font-medium text-foreground">{name}</h4>
		<p className="text-sm text-muted-foreground">${price.toFixed(2)}</p>
	</div>
);

const ReviewerInfo = ({
	name,
	avatar,
	date,
	verified,
}: {
	name: string;
	avatar: string;
	date: string;
	verified: boolean;
}) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-10">
			<AvatarImage src={avatar} alt={name} />
			<AvatarFallback>{name.charAt(0)}</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium text-foreground">{name}</span>
				{verified && (
					<Badge variant="secondary" className="text-xs">
						Verified
					</Badge>
				)}
			</div>
			<p className="text-xs text-muted-foreground">{date}</p>
		</div>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
			/>
		))}
	</div>
);

const ReviewText = ({ text }: { text: string }) => (
	<p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
);

const ReviewActions = ({ helpful }: { helpful: number }) => (
	<div className="flex items-center gap-2">
		<Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
			<ThumbsUp className="size-4" />
			<span>{helpful}</span>
		</Button>
		<Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
			<MessageCircle className="size-4" />
			<span>Reply</span>
		</Button>
		<Button
			variant="ghost"
			size="icon-sm"
			className="ml-auto text-muted-foreground"
		>
			<Share2 className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const data: ProductReviewProps = {
		product: {
			image:
				'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=200&fit=crop',
			name: 'Premium Leather Wallet',
			price: 89.99,
		},
		review: {
			author: 'Alex Thompson',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			rating: 5,
			date: 'December 15, 2024',
			text: 'Absolutely love this wallet! The leather quality is exceptional and it has the perfect amount of card slots. Already bought another one as a gift.',
			helpful: 24,
			verified: true,
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-8">
				<Card className="space-y-4 p-5">
					<div className="flex items-center gap-3">
						<ProductThumbnail
							src={data.product.image}
							alt={data.product.name}
						/>
						<ProductSummary
							name={data.product.name}
							price={data.product.price}
						/>
					</div>
					<Separator />
					<div className="space-y-3">
						<ReviewerInfo
							name={data.review.author}
							avatar={data.review.avatar}
							date={data.review.date}
							verified={data.review.verified}
						/>
						<StarRating rating={data.review.rating} />
						<ReviewText text={data.review.text} />
					</div>
					<Separator />
					<ReviewActions helpful={data.review.helpful} />
				</Card>
			</div>
		</section>
	);
}
