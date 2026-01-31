'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Clock,
	Flame,
	Leaf,
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
	unit: string;
}

interface NutritionFactsProps {
	facts: { label: string; value: string; unit: string; icon?: LucideIcon }[];
}

interface IngredientsProps {
	ingredients: string[];
}

interface DietaryBadgesProps {
	badges: { text: string; icon?: LucideIcon }[];
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
	<div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/30">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const Header = ({ category, name, tagline }: HeaderProps) => (
	<div className="text-center space-y-2">
		<Badge variant="secondary">{category}</Badge>
		<h1 className="text-3xl @sm:text-4xl font-bold tracking-tight">{name}</h1>
		<p className="text-muted-foreground text-lg max-w-2xl mx-auto">{tagline}</p>
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

const Price = ({ current, unit }: PriceProps) => (
	<div className="text-center">
		<span className="text-4xl font-bold text-primary">{current}</span>
		<span className="text-muted-foreground ml-2">{unit}</span>
	</div>
);

const NutritionFacts = ({ facts }: NutritionFactsProps) => (
	<div className="space-y-3">
		<p className="font-medium text-center text-sm uppercase tracking-wide text-muted-foreground">
			Nutrition per serving
		</p>
		<div className="grid grid-cols-2 @sm:grid-cols-4 gap-3">
			{facts.map((fact, i) => (
				<Card key={i} className="bg-muted/30 border-muted text-center">
					<CardContent className="p-4">
						{fact.icon && (
							<fact.icon className="size-5 mx-auto mb-2 text-primary" />
						)}
						<p className="text-2xl font-bold">
							{fact.value}
							<span className="text-sm font-normal text-muted-foreground ml-1">
								{fact.unit}
							</span>
						</p>
						<p className="text-sm text-muted-foreground">{fact.label}</p>
					</CardContent>
				</Card>
			))}
		</div>
	</div>
);

const Ingredients = ({ ingredients }: IngredientsProps) => (
	<div className="space-y-3">
		<p className="font-medium text-center text-sm uppercase tracking-wide text-muted-foreground">
			Ingredients
		</p>
		<div className="flex flex-wrap justify-center gap-2">
			{ingredients.map((ingredient, i) => (
				<Badge key={i} variant="outline" className="text-sm">
					{ingredient}
				</Badge>
			))}
		</div>
	</div>
);

const DietaryBadges = ({ badges }: DietaryBadgesProps) => (
	<div className="flex flex-wrap justify-center gap-3">
		{badges.map((badge, i) => (
			<div
				key={i}
				className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30"
			>
				{badge.icon && (
					<badge.icon className="size-4 text-green-600 dark:text-green-400" />
				)}
				<span className="text-sm font-medium text-green-700 dark:text-green-300">
					{badge.text}
				</span>
			</div>
		))}
	</div>
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
					{/* Image */}
					<ProductImage
						src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200"
						alt="Healthy meal prep"
					/>

					{/* Header */}
					<Header
						category="Meal Prep"
						name="Mediterranean Power Bowl"
						tagline="Fresh, nutritious, and ready in minutes. Packed with protein and fiber."
					/>

					{/* Rating */}
					<Rating rating={5} reviews={3421} />

					<Separator />

					{/* Price */}
					<Price current="$12.99" unit="per serving" />

					{/* Nutrition facts */}
					<NutritionFacts
						facts={[
							{ label: 'Calories', value: '450', unit: 'kcal', icon: Flame },
							{ label: 'Protein', value: '32', unit: 'g' },
							{ label: 'Carbs', value: '45', unit: 'g' },
							{ label: 'Prep Time', value: '15', unit: 'min', icon: Clock },
						]}
					/>

					{/* Ingredients */}
					<Ingredients
						ingredients={[
							'Quinoa',
							'Grilled Chicken',
							'Chickpeas',
							'Cherry Tomatoes',
							'Cucumber',
							'Feta Cheese',
							'Kalamata Olives',
							'Red Onion',
							'Lemon Tahini Dressing',
						]}
					/>

					{/* Dietary badges */}
					<DietaryBadges
						badges={[
							{ text: 'High Protein', icon: Leaf },
							{ text: 'Gluten-Free', icon: Leaf },
							{ text: 'Keto-Friendly', icon: Leaf },
						]}
					/>

					<Separator />

					{/* Actions */}
					<Actions
						buttons={[
							{ label: 'Add to Cart', href: '#cart', icon: ShoppingCart },
							{
								label: 'Save Recipe',
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
