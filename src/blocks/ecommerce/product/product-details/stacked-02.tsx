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

interface ProductImageProps {
	src: string;
	alt: string;
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
}

interface HighlightsProps {
	items: string[];
}

interface ColorOptionsProps {
	colors: { name: string; hex: string; selected?: boolean }[];
}

interface SizeOptionsProps {
	sizes: { label: string; available: boolean; selected?: boolean }[];
}

interface TrustBadgesProps {
	badges: string[];
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
	<div className="relative aspect-video @lg:aspect-[16/7] overflow-hidden rounded-2xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const Header = ({ category, name, tagline }: HeaderProps) => (
	<div className="space-y-2">
		<Badge variant="secondary">{category}</Badge>
		<h1 className="text-3xl @sm:text-4xl font-bold tracking-tight">{name}</h1>
		<p className="text-muted-foreground text-lg">{tagline}</p>
	</div>
);

const Rating = ({ rating, reviews }: RatingProps) => (
	<div className="flex items-center gap-2">
		<div className="flex">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
				/>
			))}
		</div>
		<span className="font-medium text-lg">{rating}</span>
		<span className="text-muted-foreground">
			({reviews.toLocaleString()} reviews)
		</span>
	</div>
);

const Price = ({ current, original }: PriceProps) => (
	<div className="flex items-baseline gap-3">
		<span className="text-4xl font-bold text-primary">{current}</span>
		{original && (
			<span className="text-xl text-muted-foreground line-through">
				{original}
			</span>
		)}
	</div>
);

const Highlights = ({ items }: HighlightsProps) => (
	<div className="space-y-2">
		<p className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
			Highlights
		</p>
		<ul className="grid @sm:grid-cols-2 gap-2">
			{items.map((item, i) => (
				<li key={i} className="flex items-center gap-2 text-sm">
					<Check className="size-4 text-primary" />
					<span>{item}</span>
				</li>
			))}
		</ul>
	</div>
);

const ColorOptions = ({ colors }: ColorOptionsProps) => (
	<div className="space-y-3">
		<p className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
			Color
		</p>
		<div className="flex gap-3">
			{colors.map((color, i) => (
				<button
					key={i}
					className={`size-10 rounded-full border-2 transition-all ${color.selected ? 'border-primary ring-2 ring-primary/20' : 'border-muted hover:border-primary/50'}`}
					style={{ backgroundColor: color.hex }}
					title={color.name}
				/>
			))}
		</div>
	</div>
);

const SizeOptions = ({ sizes }: SizeOptionsProps) => (
	<div className="space-y-3">
		<p className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
			Size
		</p>
		<div className="flex gap-2 flex-wrap">
			{sizes.map((size, i) => (
				<Button
					key={i}
					variant={size.selected ? 'default' : 'outline'}
					size="sm"
					disabled={!size.available}
					className="min-w-[3rem]"
				>
					{size.label}
				</Button>
			))}
		</div>
	</div>
);

const TrustBadges = ({ badges }: TrustBadgesProps) => (
	<div className="flex flex-wrap gap-2">
		{badges.map((badge, i) => (
			<Badge key={i} variant="outline" className="text-xs px-3 py-1">
				{badge}
			</Badge>
		))}
	</div>
);

const Actions = ({ buttons }: ActionsProps) => (
	<div className="flex gap-4">
		{buttons.map((btn, i) => (
			<Button
				key={i}
				variant={btn.variant || 'default'}
				size="lg"
				className={`gap-2 ${i === 0 ? 'flex-1' : ''}`}
				asChild
			>
				<Link href={btn.href}>
					{btn.icon && <btn.icon className="size-5" />}
					{btn.label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-5xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex flex-col gap-8">
					{/* Image */}
					<ProductImage
						src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200"
						alt="Running shoe"
					/>

					{/* Header */}
					<Header
						category="Running"
						name="Nike Air Zoom Pegasus 40"
						tagline="Experience responsive cushioning that's perfect for everyday runs"
					/>

					{/* Rating */}
					<Rating rating={5} reviews={8234} />

					<Separator />

					{/* Price */}
					<Price current="$130" original="$160" />

					{/* Highlights */}
					<Highlights
						items={[
							'React foam midsole',
							'Zoom Air unit in forefoot',
							'Breathable mesh upper',
							'Lightweight design',
							'Enhanced traction outsole',
							'True-to-size fit',
						]}
					/>

					{/* Color options */}
					<ColorOptions
						colors={[
							{ name: 'Black', hex: '#000000', selected: true },
							{ name: 'White', hex: '#ffffff' },
							{ name: 'Red', hex: '#ef4444' },
							{ name: 'Blue', hex: '#3b82f6' },
						]}
					/>

					{/* Size options */}
					<SizeOptions
						sizes={[
							{ label: '7', available: true },
							{ label: '7.5', available: true },
							{ label: '8', available: true, selected: true },
							{ label: '8.5', available: true },
							{ label: '9', available: false },
							{ label: '9.5', available: true },
							{ label: '10', available: true },
							{ label: '10.5', available: true },
							{ label: '11', available: false },
						]}
					/>

					<Separator />

					{/* Trust badges */}
					<TrustBadges
						badges={[
							'Free Shipping',
							'60-Day Returns',
							'Authentic Product',
							'Size Exchange',
						]}
					/>

					{/* Actions */}
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
		</section>
	);
}
