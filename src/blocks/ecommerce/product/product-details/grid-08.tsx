'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Sparkles,
	Droplet,
	Sun,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface DiagonalGridProps {
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
	size: string;
}

interface BenefitsProps {
	benefits: { icon: LucideIcon; text: string }[];
}

interface IngredientsPreviewProps {
	ingredients: string[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const DiagonalGrid = ({ images }: DiagonalGridProps) => (
	<div className="grid grid-cols-2 gap-2">
		<div className="space-y-2">
			{images.slice(0, 2).map((image, i) => (
				<div
					key={i}
					className={`relative overflow-hidden rounded-xl bg-muted ${i === 0 ? 'aspect-square' : 'aspect-[4/3]'}`}
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
		<div className="space-y-2 pt-12">
			{images.slice(2, 4).map((image, i) => (
				<div
					key={i}
					className={`relative overflow-hidden rounded-xl bg-muted ${i === 0 ? 'aspect-[4/3]' : 'aspect-square'}`}
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

const Price = ({ current, size }: PriceProps) => (
	<div className="flex items-baseline gap-2">
		<span className="text-3xl font-bold text-primary">{current}</span>
		<span className="text-muted-foreground">({size})</span>
	</div>
);

const Benefits = ({ benefits }: BenefitsProps) => (
	<div className="flex flex-wrap gap-3">
		{benefits.map((benefit, i) => (
			<div
				key={i}
				className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50"
			>
				<benefit.icon className="size-4 text-primary" />
				<span className="text-sm">{benefit.text}</span>
			</div>
		))}
	</div>
);

const IngredientsPreview = ({ ingredients }: IngredientsPreviewProps) => (
	<div className="space-y-2">
		<p className="font-medium text-sm">Key Ingredients</p>
		<div className="flex flex-wrap gap-2">
			{ingredients.map((ingredient, i) => (
				<Badge key={i} variant="outline">
					{ingredient}
				</Badge>
			))}
		</div>
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
					{/* Diagonal grid */}
					<DiagonalGrid
						images={[
							{
								src: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600',
								alt: 'Serum bottle',
							},
							{
								src: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600',
								alt: 'Serum texture',
							},
							{
								src: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600',
								alt: 'Serum dropper',
							},
							{
								src: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600',
								alt: 'Serum on skin',
							},
						]}
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header
							brand="Drunk Elephant"
							name="C-Firma Fresh Day Serum"
							tagline="Potent vitamin C serum for brighter, firmer skin"
						/>

						<Rating rating={5} reviews={6234} />

						<Price current="$78" size="30ml" />

						<Separator />

						<Benefits
							benefits={[
								{ icon: Sparkles, text: 'Brightening' },
								{ icon: Droplet, text: 'Hydrating' },
								{ icon: Sun, text: 'Antioxidant' },
							]}
						/>

						<IngredientsPreview
							ingredients={[
								'15% L-Ascorbic Acid',
								'Ferulic Acid',
								'Vitamin E',
								'Pumpkin Ferment',
								'Sodium Hyaluronate',
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
