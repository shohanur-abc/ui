'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart, Heart, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface FullWidthGridProps {
	mainImage: { src: string; alt: string };
	sideImages: { src: string; alt: string }[];
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

interface ColorsProps {
	colors: { name: string; hex: string; selected?: boolean }[];
}

interface SizesProps {
	sizes: { label: string; available: boolean; selected?: boolean }[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const FullWidthGrid = ({ mainImage, sideImages }: FullWidthGridProps) => (
	<div className="grid @lg:grid-cols-[2fr_1fr] gap-2">
		<div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
			<Image
				src={mainImage.src}
				alt={mainImage.alt}
				fill
				className="object-cover"
			/>
		</div>
		<div className="grid grid-cols-2 @lg:grid-cols-1 gap-2">
			{sideImages.map((image, i) => (
				<div
					key={i}
					className="relative aspect-square overflow-hidden rounded-xl bg-muted"
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

const Colors = ({ colors }: ColorsProps) => (
	<div className="space-y-3">
		<p className="font-medium text-sm">Color</p>
		<div className="flex gap-2">
			{colors.map((color, i) => (
				<button
					key={i}
					className={`size-8 rounded-full border-2 transition-all ${color.selected ? 'border-primary ring-2 ring-primary/20' : 'border-muted hover:border-primary/50'}`}
					style={{ backgroundColor: color.hex }}
					title={color.name}
				/>
			))}
		</div>
	</div>
);

const Sizes = ({ sizes }: SizesProps) => (
	<div className="space-y-3">
		<p className="font-medium text-sm">Size</p>
		<div className="flex flex-wrap gap-2">
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
				<div className="space-y-8">
					{/* Full width grid */}
					<FullWidthGrid
						mainImage={{
							src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000',
							alt: 'Dress main',
						}}
						sideImages={[
							{
								src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500',
								alt: 'Dress detail',
							},
							{
								src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500',
								alt: 'Dress back',
							},
						]}
					/>

					{/* Details row */}
					<div className="grid @lg:grid-cols-[1fr_auto] gap-6 items-start">
						<div className="space-y-4">
							<Header
								category="Dresses"
								name="Silk Midi Wrap Dress"
								tagline="Elegant draping for every occasion"
							/>
							<Rating rating={5} reviews={1892} />
							<div className="flex flex-wrap gap-6">
								<Colors
									colors={[
										{ name: 'Black', hex: '#000000', selected: true },
										{ name: 'Ivory', hex: '#FFFFF0' },
										{ name: 'Burgundy', hex: '#722f37' },
										{ name: 'Navy', hex: '#1e3a5f' },
									]}
								/>
								<Sizes
									sizes={[
										{ label: 'XS', available: true },
										{ label: 'S', available: true },
										{ label: 'M', available: true, selected: true },
										{ label: 'L', available: true },
										{ label: 'XL', available: false },
									]}
								/>
							</div>
						</div>

						<div className="space-y-4 @lg:text-right">
							<Price current="$298" original="$398" />
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
			</div>
		</section>
	);
}
