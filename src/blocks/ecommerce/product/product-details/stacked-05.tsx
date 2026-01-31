'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	MapPin,
	Calendar,
	Users,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroImageProps {
	src: string;
	alt: string;
	badges: string[];
}

interface HeaderProps {
	category: string;
	name: string;
	location: string;
}

interface RatingProps {
	rating: number;
	reviews: number;
}

interface PriceProps {
	current: string;
	original?: string;
	unit: string;
}

interface DetailsGridProps {
	details: { icon: LucideIcon; label: string; value: string }[];
}

interface IncludedItemsProps {
	items: string[];
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

const HeroImage = ({ src, alt, badges }: HeroImageProps) => (
	<div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute top-4 left-4 flex gap-2">
			{badges.map((badge, i) => (
				<Badge key={i} variant={i === 0 ? 'destructive' : 'default'}>
					{badge}
				</Badge>
			))}
		</div>
	</div>
);

const Header = ({ category, name, location }: HeaderProps) => (
	<div className="text-center space-y-3">
		<Badge variant="secondary" className="text-sm">
			{category}
		</Badge>
		<h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{name}
		</h1>
		<div className="flex items-center justify-center gap-2 text-muted-foreground">
			<MapPin className="size-4" />
			<span>{location}</span>
		</div>
	</div>
);

const Rating = ({ rating, reviews }: RatingProps) => (
	<div className="flex items-center justify-center gap-2">
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

const Price = ({ current, original, unit }: PriceProps) => (
	<div className="text-center">
		<div className="flex items-baseline justify-center gap-3">
			<span className="text-4xl font-bold text-primary">{current}</span>
			{original && (
				<span className="text-xl text-muted-foreground line-through">
					{original}
				</span>
			)}
		</div>
		<p className="text-muted-foreground">{unit}</p>
	</div>
);

const DetailsGrid = ({ details }: DetailsGridProps) => (
	<div className="grid @sm:grid-cols-3 gap-4">
		{details.map((detail, i) => (
			<Card key={i} className="bg-muted/30 border-muted text-center">
				<CardContent className="p-4">
					<detail.icon className="size-6 mx-auto mb-2 text-primary" />
					<p className="text-sm text-muted-foreground">{detail.label}</p>
					<p className="font-bold text-lg">{detail.value}</p>
				</CardContent>
			</Card>
		))}
	</div>
);

const IncludedItems = ({ items }: IncludedItemsProps) => (
	<div className="space-y-3">
		<p className="font-medium text-center text-sm uppercase tracking-wide text-muted-foreground">
			What&apos;s Included
		</p>
		<div className="flex flex-wrap justify-center gap-2">
			{items.map((item, i) => (
				<Badge key={i} variant="outline" className="text-sm px-4 py-2">
					{item}
				</Badge>
			))}
		</div>
	</div>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto text-lg">
		{text}
	</p>
);

const Actions = ({ buttons }: ActionsProps) => (
	<div className="flex justify-center gap-4">
		{buttons.map((btn, i) => (
			<Button
				key={i}
				variant={btn.variant || 'default'}
				size="lg"
				className="gap-2 px-8"
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
				<div className="flex flex-col gap-10">
					{/* Hero */}
					<HeroImage
						src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200"
						alt="Bali vacation"
						badges={['20% OFF', 'Top Rated']}
					/>

					{/* Header */}
					<Header
						category="Adventure Tour"
						name="7-Day Bali Paradise Escape"
						location="Bali, Indonesia"
					/>

					{/* Rating */}
					<Rating rating={5} reviews={2456} />

					<Separator />

					{/* Price */}
					<Price current="$1,499" original="$1,875" unit="per person" />

					{/* Details */}
					<DetailsGrid
						details={[
							{ icon: Calendar, label: 'Duration', value: '7 Days' },
							{ icon: Users, label: 'Group Size', value: '2-12 People' },
							{ icon: MapPin, label: 'Destinations', value: '5 Locations' },
						]}
					/>

					{/* Description */}
					<Description text="Discover the magic of Bali on this unforgettable 7-day adventure. From ancient temples to pristine beaches, lush rice terraces to vibrant nightlife, experience the best of this tropical paradise. Our expert local guides will take you off the beaten path to hidden gems most tourists never see." />

					{/* Included items */}
					<IncludedItems
						items={[
							'Luxury Accommodation',
							'Daily Breakfast',
							'Airport Transfers',
							'Private Guide',
							'Temple Tours',
							'Beach Excursions',
							'Rice Terrace Trekking',
							'Cooking Class',
							'Spa Treatment',
							'Travel Insurance',
						]}
					/>

					<Separator />

					{/* Actions */}
					<Actions
						buttons={[
							{ label: 'Book Now', href: '#cart', icon: ShoppingCart },
							{
								label: 'Save Trip',
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
