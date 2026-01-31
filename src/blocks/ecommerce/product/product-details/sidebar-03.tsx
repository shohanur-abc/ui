'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ShoppingCart, Heart, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductImageProps {
	src: string;
	alt: string;
}

interface ThumbnailSidebarProps {
	images: { src: string; alt: string; active?: boolean }[];
}

interface HeaderProps {
	brand: string;
	name: string;
	tagline: string;
}

interface RatingProps {
	rating: number;
	reviews: number;
}

interface PriceProps {
	current: string;
	original?: string;
}

interface ReviewPreviewProps {
	reviews: { avatar: string; name: string; rating: number; text: string }[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const ProductImage = ({ src, alt }: ProductImageProps) => (
	<div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ThumbnailSidebar = ({ images }: ThumbnailSidebarProps) => (
	<div className="flex flex-col gap-2">
		{images.map((image, i) => (
			<div
				key={i}
				className={`relative size-16 overflow-hidden rounded-lg bg-muted cursor-pointer ring-2 transition-all ${
					image.active
						? 'ring-primary'
						: 'ring-transparent hover:ring-muted-foreground'
				}`}
			>
				<Image src={image.src} alt={image.alt} fill className="object-cover" />
			</div>
		))}
	</div>
);

const Header = ({ brand, name, tagline }: HeaderProps) => (
	<div className="space-y-2">
		<p className="text-sm text-primary font-medium uppercase tracking-wider">
			{brand}
		</p>
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight">{name}</h1>
		<p className="text-muted-foreground">{tagline}</p>
	</div>
);

const Rating = ({ rating, reviews }: RatingProps) => (
	<div className="flex items-center gap-2">
		<div className="flex">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
				/>
			))}
		</div>
		<span className="font-medium">{rating}</span>
		<span className="text-sm text-muted-foreground">
			({reviews.toLocaleString()} reviews)
		</span>
	</div>
);

const Price = ({ current, original }: PriceProps) => (
	<div className="flex items-baseline gap-3">
		<span className="text-3xl font-bold text-primary">{current}</span>
		{original && (
			<span className="text-lg text-muted-foreground line-through">
				{original}
			</span>
		)}
	</div>
);

const ReviewPreview = ({ reviews }: ReviewPreviewProps) => (
	<div className="space-y-3">
		{reviews.map((review, i) => (
			<Card key={i} className="bg-muted/30 border-muted">
				<CardContent className="p-3">
					<div className="flex items-start gap-3">
						<Avatar className="size-8">
							<AvatarImage src={review.avatar} alt={review.name} />
							<AvatarFallback>{review.name[0]}</AvatarFallback>
						</Avatar>
						<div className="flex-1 space-y-1">
							<div className="flex items-center justify-between">
								<p className="font-medium text-sm">{review.name}</p>
								<div className="flex">
									{Array.from({ length: 5 }).map((_, j) => (
										<Star
											key={j}
											className={`size-3 ${j < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
										/>
									))}
								</div>
							</div>
							<p className="text-xs text-muted-foreground line-clamp-2">
								{review.text}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const Actions = ({ buttons }: ActionsProps) => (
	<div className="flex gap-3">
		{buttons.map((btn, i) => (
			<Button
				key={i}
				variant={btn.variant || 'default'}
				size="lg"
				className={`gap-2 ${i === 0 ? 'flex-1' : ''}`}
				asChild
			>
				<Link href={btn.href}>
					{btn.icon && <btn.icon className="size-4" />}
					{btn.label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-[80px_1fr_1fr] gap-6">
					{/* Thumbnail sidebar */}
					<ThumbnailSidebar
						images={[
							{
								src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200',
								alt: 'Shoe 1',
								active: true,
							},
							{
								src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200',
								alt: 'Shoe 2',
							},
							{
								src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200',
								alt: 'Shoe 3',
							},
							{
								src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200',
								alt: 'Shoe 4',
							},
							{
								src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200',
								alt: 'Shoe 5',
							},
						]}
					/>

					{/* Main image */}
					<ProductImage
						src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"
						alt="Air Jordan sneakers"
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header
							brand="Jordan"
							name="Air Jordan 1 Retro High OG"
							tagline="The original that started it all"
						/>

						<Rating rating={5} reviews={12543} />

						<Price current="$180" />

						<Separator />

						<ReviewPreview
							reviews={[
								{
									avatar: '',
									name: 'Alex M.',
									rating: 5,
									text: 'Incredible quality and iconic style. A must-have for any sneaker collection.',
								},
								{
									avatar: '',
									name: 'Jordan K.',
									rating: 5,
									text: 'Perfect fit and the leather quality is amazing. Worth every penny.',
								},
							]}
						/>

						<Actions
							buttons={[
								{ label: 'Add to Cart', href: '#cart', icon: ShoppingCart },
								{
									label: 'Save',
									href: '#wishlist',
									icon: Heart,
									variant: 'outline',
								},
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
