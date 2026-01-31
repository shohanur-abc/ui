'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart, Heart, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface VerticalCarouselProps {
	images: { src: string; alt: string }[];
	activeIndex: number;
}

interface MainDisplayProps {
	src: string;
	alt: string;
	badge?: string;
}

interface HeaderProps {
	brand: string;
	name: string;
}

interface RatingProps {
	rating: number;
	reviews: number;
}

interface PriceProps {
	current: string;
	original?: string;
}

interface DescriptionProps {
	text: string;
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const VerticalCarousel = ({ images, activeIndex }: VerticalCarouselProps) => (
	<div className="flex flex-col gap-2">
		{images.map((image, i) => (
			<div
				key={i}
				className={`relative aspect-square w-16 overflow-hidden rounded-lg cursor-pointer border-2 transition-colors ${i === activeIndex ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
			>
				<Image src={image.src} alt={image.alt} fill className="object-cover" />
			</div>
		))}
	</div>
);

const MainDisplay = ({ src, alt, badge }: MainDisplayProps) => (
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30">
		<Image src={src} alt={alt} fill className="object-cover" />
		{badge && (
			<Badge className="absolute top-4 right-4" variant="destructive">
				{badge}
			</Badge>
		)}
	</div>
);

const Header = ({ brand, name }: HeaderProps) => (
	<div className="space-y-1">
		<p className="text-sm text-primary font-medium uppercase tracking-wider">
			{brand}
		</p>
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight">{name}</h1>
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

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground leading-relaxed">{text}</p>
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
				<div className="grid @lg:grid-cols-[auto_1fr_1fr] gap-4 @xl:gap-8">
					{/* Vertical thumbnails */}
					<VerticalCarousel
						images={[
							{
								src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200',
								alt: 'Palette front',
							},
							{
								src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200',
								alt: 'Palette open',
							},
							{
								src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200',
								alt: 'Palette swatches',
							},
							{
								src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200',
								alt: 'Palette detail',
							},
						]}
						activeIndex={0}
					/>

					{/* Main image */}
					<MainDisplay
						src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800"
						alt="Eyeshadow palette"
						badge="NEW"
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header
							brand="Charlotte Tilbury"
							name="Pillow Talk Luxury Palette"
						/>

						<Rating rating={5} reviews={4521} />

						<Price current="$53" original="$65" />

						<Separator />

						<Description text="Discover the dreamy, creamy, cool-toned nude eyeshadow palette that takes you from day to dream with four eye-enhancing shades. These easy-to-blend powders are enriched with a blend of oils and waxes for a smooth, velvety finish." />

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
