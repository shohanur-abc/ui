'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Sparkles,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BeforeAfterGalleryProps {
	before: { src: string; label: string };
	after: { src: string; label: string };
	product: { src: string; alt: string };
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

interface BenefitsListProps {
	benefits: { icon: LucideIcon; text: string }[];
}

interface IngredientHighlightsProps {
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

const BeforeAfterGallery = ({
	before,
	after,
	product,
}: BeforeAfterGalleryProps) => (
	<div className="space-y-4">
		<div className="grid grid-cols-2 gap-2">
			<div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
				<Image src={before.src} alt="Before" fill className="object-cover" />
				<Badge className="absolute bottom-3 left-3" variant="secondary">
					{before.label}
				</Badge>
			</div>
			<div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
				<Image src={after.src} alt="After" fill className="object-cover" />
				<Badge className="absolute bottom-3 left-3">{after.label}</Badge>
			</div>
		</div>
		<div className="relative aspect-[2/1] overflow-hidden rounded-xl bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-950/30 dark:to-pink-950/30">
			<Image
				src={product.src}
				alt={product.alt}
				fill
				className="object-contain p-4"
			/>
		</div>
	</div>
);

const Header = ({ category, name, tagline }: HeaderProps) => (
	<div className="space-y-2">
		<Badge variant="outline">{category}</Badge>
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

const BenefitsList = ({ benefits }: BenefitsListProps) => (
	<div className="space-y-2">
		{benefits.map((benefit, i) => (
			<div
				key={i}
				className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
			>
				<benefit.icon className="size-5 text-primary" />
				<span className="text-sm">{benefit.text}</span>
			</div>
		))}
	</div>
);

const IngredientHighlights = ({ ingredients }: IngredientHighlightsProps) => (
	<div className="space-y-2">
		<p className="text-sm font-medium">Key Ingredients</p>
		<div className="flex flex-wrap gap-2">
			{ingredients.map((ing, i) => (
				<Badge key={i} variant="secondary">
					{ing}
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
					{/* Gallery */}
					<BeforeAfterGallery
						before={{
							src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
							label: 'Before',
						}}
						after={{
							src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
							label: 'After 4 weeks',
						}}
						product={{
							src: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600',
							alt: 'Serum bottle',
						}}
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header
							category="Anti-Aging"
							name="Advanced Retinol Night Serum"
							tagline="Visibly reduce fine lines and wrinkles in 4 weeks"
						/>

						<Rating rating={5} reviews={4567} />

						<Price current="$79" original="$99" />

						<Separator />

						<BenefitsList
							benefits={[
								{ icon: Sparkles, text: 'Reduces fine lines by up to 45%' },
								{ icon: Sparkles, text: 'Improves skin texture and tone' },
								{ icon: Sparkles, text: 'Boosts collagen production' },
								{ icon: Sparkles, text: 'Dermatologist recommended' },
							]}
						/>

						<IngredientHighlights
							ingredients={[
								'0.5% Retinol',
								'Hyaluronic Acid',
								'Vitamin E',
								'Niacinamide',
								'Peptides',
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
