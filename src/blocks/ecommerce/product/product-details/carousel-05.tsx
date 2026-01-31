'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	ChevronLeft,
	ChevronRight,
	Check,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface FullWidthCarouselProps {
	images: { src: string; alt: string; caption?: string }[];
	currentIndex: number;
}

interface HeaderProps {
	category: string;
	name: string;
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

interface HighlightsProps {
	items: string[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const FullWidthCarousel = ({
	images,
	currentIndex,
}: FullWidthCarouselProps) => (
	<div className="relative">
		<div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-muted">
			<Image
				src={images[currentIndex].src}
				alt={images[currentIndex].alt}
				fill
				className="object-cover"
			/>
			{images[currentIndex].caption && (
				<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
					<p className="text-white text-sm">{images[currentIndex].caption}</p>
				</div>
			)}
		</div>
		<Button
			variant="outline"
			size="icon"
			className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
		>
			<ChevronLeft className="size-5" />
		</Button>
		<Button
			variant="outline"
			size="icon"
			className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
		>
			<ChevronRight className="size-5" />
		</Button>
		<div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm">
			<span className="text-sm font-medium">
				{currentIndex + 1} / {images.length}
			</span>
		</div>
	</div>
);

const Header = ({ category, name }: HeaderProps) => (
	<div className="space-y-2">
		<Badge variant="secondary">{category}</Badge>
		<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">
			{name}
		</h1>
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

const Price = ({ current, original, discount }: PriceProps) => (
	<div className="flex items-center gap-4">
		<span className="text-4xl font-bold text-primary">{current}</span>
		{original && (
			<span className="text-xl text-muted-foreground line-through">
				{original}
			</span>
		)}
		{discount && (
			<Badge variant="destructive" className="text-sm">
				{discount}
			</Badge>
		)}
	</div>
);

const Highlights = ({ items }: HighlightsProps) => (
	<div className="grid @sm:grid-cols-2 gap-2">
		{items.map((item, i) => (
			<div key={i} className="flex items-center gap-2 text-sm">
				<Check className="size-4 text-primary shrink-0" />
				<span>{item}</span>
			</div>
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
				className={`gap-2 ${i === 0 ? 'flex-1 @lg:flex-none @lg:px-12' : ''}`}
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
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex flex-col gap-8">
					{/* Full width carousel */}
					<FullWidthCarousel
						images={[
							{
								src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200',
								alt: 'Living room setup',
								caption: 'Modern living room with our signature sofa',
							},
							{
								src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200',
								alt: 'Detail view',
								caption: 'Premium Italian leather upholstery',
							},
							{
								src: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200',
								alt: 'Side view',
								caption: 'Clean lines and timeless design',
							},
						]}
						currentIndex={0}
					/>

					{/* Details row */}
					<div className="grid @lg:grid-cols-[1fr_auto] gap-6 items-start">
						<div className="space-y-4">
							<Header
								category="Living Room"
								name="Oslo 3-Seater Modular Sofa"
							/>
							<Rating rating={5} reviews={2341} />
							<Highlights
								items={[
									'Italian top-grain leather',
									'Solid oak wood frame',
									'High-density foam cushions',
									'Modular design',
									'10-year warranty',
									'Free white glove delivery',
								]}
							/>
						</div>

						<div className="@lg:text-right space-y-4">
							<Price current="$3,299" original="$4,199" discount="21% OFF" />
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
