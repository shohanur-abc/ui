'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Check,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface OverlapGridProps {
	mainImage: { src: string; alt: string };
	overlayImages: { src: string; alt: string }[];
}

interface HeaderProps {
	category: string;
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

interface FeaturesProps {
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

const OverlapGrid = ({ mainImage, overlayImages }: OverlapGridProps) => (
	<div className="relative">
		<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
			<Image
				src={mainImage.src}
				alt={mainImage.alt}
				fill
				className="object-cover"
			/>
		</div>
		<div className="absolute -bottom-6 right-4 flex gap-2">
			{overlayImages.map((image, i) => (
				<div
					key={i}
					className="relative size-24 overflow-hidden rounded-xl bg-muted border-4 border-background shadow-lg"
				>
					<Image
						src={image.src}
						alt={image.alt}
						fill
						className="object-cover"
					/>
				</div>
			))}
		</div>
	</div>
);

const Header = ({ category, name, tagline }: HeaderProps) => (
	<div className="space-y-2">
		<Badge variant="secondary">{category}</Badge>
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

const Features = ({ features }: FeaturesProps) => (
	<div className="space-y-2">
		{features.map((feature, i) => (
			<div key={i} className="flex items-center gap-2 text-sm">
				<Check className="size-4 text-primary" />
				<span>{feature}</span>
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
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-16">
					{/* Overlap grid */}
					<div className="pb-8">
						<OverlapGrid
							mainImage={{
								src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800',
								alt: 'Earbuds case',
							}}
							overlayImages={[
								{
									src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300',
									alt: 'Earbuds left',
								},
								{
									src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300',
									alt: 'Earbuds right',
								},
							]}
						/>
					</div>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header
							category="Audio"
							name="Apple AirPods Pro 2"
							tagline="Active Noise Cancellation for immersive sound"
						/>

						<Rating rating={5} reviews={78432} />

						<Price current="$249" original="$279" discount="-11%" />

						<Separator />

						<Features
							features={[
								'Active Noise Cancellation',
								'Transparency mode',
								'Spatial Audio with dynamic head tracking',
								'Up to 6 hours of listening time',
								'MagSafe charging case',
								'IPX4 water resistance',
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
