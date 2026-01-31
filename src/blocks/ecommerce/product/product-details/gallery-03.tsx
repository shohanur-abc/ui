'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart, Heart, Play, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface VideoGalleryProps {
	video: { thumbnail: string; duration: string };
	images: { src: string; alt: string }[];
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
	discount?: string;
}

interface SpecListProps {
	specs: { label: string; value: string }[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const VideoGallery = ({ video, images }: VideoGalleryProps) => (
	<div className="space-y-3">
		{/* Video thumbnail */}
		<div className="relative aspect-video overflow-hidden rounded-2xl bg-muted group cursor-pointer">
			<Image
				src={video.thumbnail}
				alt="Product video"
				fill
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
				<div className="size-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
					<Play className="size-8 text-white fill-white ml-1" />
				</div>
			</div>
			<Badge className="absolute bottom-4 right-4">{video.duration}</Badge>
		</div>
		{/* Image strip */}
		<div className="grid grid-cols-4 gap-2">
			{images.map((img, i) => (
				<div
					key={i}
					className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer ring-2 ring-transparent hover:ring-primary transition-all"
				>
					<Image src={img.src} alt={img.alt} fill className="object-cover" />
				</div>
			))}
		</div>
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

const Price = ({ current, original, discount }: PriceProps) => (
	<div className="flex items-center gap-3">
		<span className="text-3xl font-bold text-primary">{current}</span>
		{original && (
			<span className="text-lg text-muted-foreground line-through">
				{original}
			</span>
		)}
		{discount && <Badge variant="destructive">{discount}</Badge>}
	</div>
);

const SpecList = ({ specs }: SpecListProps) => (
	<div className="grid grid-cols-2 gap-x-8 gap-y-3">
		{specs.map((spec, i) => (
			<div key={i} className="flex justify-between py-2 border-b border-muted">
				<span className="text-sm text-muted-foreground">{spec.label}</span>
				<span className="text-sm font-medium">{spec.value}</span>
			</div>
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
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12">
					{/* Video Gallery */}
					<VideoGallery
						video={{
							thumbnail:
								'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
							duration: '1:45',
						}}
						images={[
							{
								src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
								alt: 'Watch front',
							},
							{
								src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
								alt: 'Watch side',
							},
							{
								src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
								alt: 'Watch band',
							},
							{
								src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
								alt: 'Watch back',
							},
						]}
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header
							brand="ChronoLux"
							name="Signature Series Automatic"
							tagline="Swiss-made mechanical timepiece with exhibition caseback"
						/>

						<Rating rating={5} reviews={1892} />

						<Price current="$2,499" original="$2,999" discount="-17%" />

						<Separator />

						<SpecList
							specs={[
								{ label: 'Movement', value: 'Swiss Automatic' },
								{ label: 'Case Size', value: '41mm' },
								{ label: 'Case Material', value: 'Stainless Steel' },
								{ label: 'Crystal', value: 'Sapphire' },
								{ label: 'Water Resistance', value: '100m' },
								{ label: 'Power Reserve', value: '72 hours' },
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
