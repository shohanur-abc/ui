'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
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

interface ProgressCarouselProps {
	images: { src: string; alt: string }[];
	currentIndex: number;
	total: number;
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
	perUnit?: string;
}

interface SubscriptionProps {
	options: { label: string; discount: string; selected?: boolean }[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const ProgressCarousel = ({
	images,
	currentIndex,
	total,
}: ProgressCarouselProps) => (
	<div className="space-y-4">
		<div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30">
			<Image
				src={images[currentIndex].src}
				alt={images[currentIndex].alt}
				fill
				className="object-cover"
			/>
			<div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
				<Button
					variant="outline"
					size="icon"
					className="bg-background/80 backdrop-blur-sm shrink-0"
				>
					<ChevronLeft className="size-4" />
				</Button>
				<Progress
					value={((currentIndex + 1) / total) * 100}
					className="flex-1 h-1"
				/>
				<Button
					variant="outline"
					size="icon"
					className="bg-background/80 backdrop-blur-sm shrink-0"
				>
					<ChevronRight className="size-4" />
				</Button>
			</div>
		</div>
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

const Price = ({ current, perUnit }: PriceProps) => (
	<div className="flex items-baseline gap-2">
		<span className="text-3xl font-bold text-primary">{current}</span>
		{perUnit && <span className="text-muted-foreground">({perUnit})</span>}
	</div>
);

const Subscription = ({ options }: SubscriptionProps) => (
	<div className="space-y-3">
		<p className="font-medium text-sm">Purchase Options</p>
		<div className="space-y-2">
			{options.map((option, i) => (
				<Card
					key={i}
					className={`cursor-pointer transition-colors ${option.selected ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
				>
					<CardContent className="p-3 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div
								className={`size-4 rounded-full border-2 ${option.selected ? 'border-primary bg-primary' : 'border-muted'}`}
							>
								{option.selected && (
									<div className="size-2 m-0.5 rounded-full bg-primary-foreground" />
								)}
							</div>
							<span className="font-medium text-sm">{option.label}</span>
						</div>
						<Badge variant="secondary" className="text-xs">
							{option.discount}
						</Badge>
					</CardContent>
				</Card>
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
					{/* Progress carousel */}
					<ProgressCarousel
						images={[
							{
								src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
								alt: 'Vitamin bottle front',
							},
							{
								src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
								alt: 'Vitamin bottle back',
							},
							{
								src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
								alt: 'Vitamin capsules',
							},
						]}
						currentIndex={0}
						total={3}
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header brand="Ritual" name="Essential for Women 18+" />

						<Rating rating={5} reviews={12456} />

						<Price current="$35" perUnit="$1.17/day" />

						<Separator />

						<Subscription
							options={[
								{
									label: 'Subscribe & Save',
									discount: 'Save 20%',
									selected: true,
								},
								{ label: 'One-time Purchase', discount: 'Full Price' },
							]}
						/>

						<div className="flex flex-wrap gap-2">
							<Badge variant="outline">Vegan</Badge>
							<Badge variant="outline">Non-GMO</Badge>
							<Badge variant="outline">No Synthetic Fillers</Badge>
							<Badge variant="outline">Traceable</Badge>
						</div>

						<Actions
							buttons={[
								{
									label: 'Start Subscription',
									href: '#cart',
									icon: ShoppingCart,
								},
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
