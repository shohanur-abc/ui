'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	ChevronUp,
	ChevronDown,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface InfiniteCarouselProps {
	images: { src: string; alt: string }[];
	visibleCount: number;
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

interface VariantsProps {
	variants: { name: string; selected?: boolean }[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const InfiniteCarousel = ({ images, visibleCount }: InfiniteCarouselProps) => (
	<div className="relative">
		<Button
			variant="outline"
			size="icon"
			className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-background shadow-lg size-8"
		>
			<ChevronUp className="size-4" />
		</Button>
		<div className="overflow-hidden rounded-2xl">
			<div className="space-y-2">
				{images.slice(0, visibleCount).map((image, i) => (
					<div
						key={i}
						className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted"
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
		<Button
			variant="outline"
			size="icon"
			className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 bg-background shadow-lg size-8"
		>
			<ChevronDown className="size-4" />
		</Button>
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

const Variants = ({ variants }: VariantsProps) => (
	<div className="space-y-3">
		<p className="font-medium text-sm">Scent</p>
		<div className="flex flex-wrap gap-2">
			{variants.map((variant, i) => (
				<Button
					key={i}
					variant={variant.selected ? 'default' : 'outline'}
					size="sm"
				>
					{variant.name}
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
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12 items-center">
					{/* Infinite carousel */}
					<InfiniteCarousel
						images={[
							{
								src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800',
								alt: 'Candle front',
							},
							{
								src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800',
								alt: 'Candle lit',
							},
							{
								src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800',
								alt: 'Candle detail',
							},
						]}
						visibleCount={2}
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header
							brand="Diptyque"
							name="Baies Candle"
							tagline="A floral bouquet of roses and blackcurrant leaves"
						/>

						<Rating rating={5} reviews={3241} />

						<Price current="$76" original="$82" />

						<Separator />

						<Variants
							variants={[
								{ name: 'Baies', selected: true },
								{ name: 'Figuier' },
								{ name: 'Roses' },
								{ name: 'Feu de Bois' },
								{ name: 'Ambre' },
							]}
						/>

						<div className="flex flex-wrap gap-2">
							<Badge variant="outline">70g</Badge>
							<Badge variant="outline">190g</Badge>
							<Badge variant="outline">300g</Badge>
						</div>

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
