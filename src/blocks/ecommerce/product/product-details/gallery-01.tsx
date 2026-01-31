'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	ChevronLeft,
	ChevronRight,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface GalleryProps {
	main: { src: string; alt: string };
	thumbnails: { src: string; alt: string }[];
}

interface ProductHeaderProps {
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

interface DescriptionProps {
	text: string;
}

interface FeatureListProps {
	features: string[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const Gallery = ({ main, thumbnails }: GalleryProps) => (
	<div className="space-y-4">
		<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted group">
			<Image src={main.src} alt={main.alt} fill className="object-cover" />
			<button className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
				<ChevronLeft className="size-5" />
			</button>
			<button className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
				<ChevronRight className="size-5" />
			</button>
		</div>
		<div className="grid grid-cols-5 gap-2">
			{thumbnails.map((thumb, i) => (
				<div
					key={i}
					className={`relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer ring-2 transition-all ${i === 0 ? 'ring-primary' : 'ring-transparent hover:ring-primary/50'}`}
				>
					<Image
						src={thumb.src}
						alt={thumb.alt}
						fill
						className="object-cover"
					/>
				</div>
			))}
		</div>
	</div>
);

const ProductHeader = ({ brand, name, tagline }: ProductHeaderProps) => (
	<div className="space-y-2">
		<Badge variant="secondary">{brand}</Badge>
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

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground leading-relaxed">{text}</p>
);

const FeatureList = ({ features }: FeatureListProps) => (
	<ul className="grid grid-cols-2 gap-2">
		{features.map((feature, i) => (
			<li key={i} className="flex items-center gap-2 text-sm">
				<span className="size-1.5 rounded-full bg-primary" />
				{feature}
			</li>
		))}
	</ul>
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
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12">
					{/* Gallery */}
					<Gallery
						main={{
							src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
							alt: 'Headphones main',
						}}
						thumbnails={[
							{
								src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
								alt: 'View 1',
							},
							{
								src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
								alt: 'View 2',
							},
							{
								src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
								alt: 'View 3',
							},
							{
								src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
								alt: 'View 4',
							},
							{
								src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
								alt: 'View 5',
							},
						]}
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<ProductHeader
							brand="AudioMax"
							name="Studio Pro Wireless Headphones"
							tagline="Immersive audio experience with active noise cancellation"
						/>

						<Rating rating={5} reviews={4892} />

						<Price current="$349" original="$449" />

						<Separator />

						<Description text="Experience crystal-clear sound with our flagship Studio Pro headphones. Featuring custom 40mm drivers, adaptive noise cancellation, and up to 30 hours of battery life." />

						<FeatureList
							features={[
								'40mm custom drivers',
								'Active noise cancellation',
								'30-hour battery life',
								'Hi-Res Audio certified',
								'Bluetooth 5.3',
								'Multipoint connection',
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
