'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Dumbbell,
	Timer,
	Flame,
	Trophy,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductImageProps {
	src: string;
	alt: string;
	badge?: string;
}

interface TitleProps {
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
	servings: number;
}

interface NutritionFactsProps {
	facts: { label: string; value: string; daily?: string }[];
}

interface IngredientBreakdownProps {
	ingredients: { name: string; amount: string; benefit: string }[];
}

interface UsageGuideProps {
	timing: { icon: LucideIcon; time: string; instruction: string }[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const ProductImage = ({ src, alt, badge }: ProductImageProps) => (
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30">
		<Image src={src} alt={alt} fill className="object-cover" />
		{badge && <Badge className="absolute top-4 left-4">{badge}</Badge>}
	</div>
);

const Title = ({ brand, name, tagline }: TitleProps) => (
	<div className="space-y-1">
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

const Price = ({ current, original, servings }: PriceProps) => (
	<div className="space-y-1">
		<div className="flex items-baseline gap-3">
			<span className="text-3xl font-bold text-primary">{current}</span>
			{original && (
				<span className="text-lg text-muted-foreground line-through">
					{original}
				</span>
			)}
		</div>
		<p className="text-sm text-muted-foreground">
			{servings} servings • $
			{(parseFloat(current.replace('$', '')) / servings).toFixed(2)}/serving
		</p>
	</div>
);

const NutritionFacts = ({ facts }: NutritionFactsProps) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between text-sm font-medium border-b-2 border-foreground pb-2">
			<span>Nutrition Facts</span>
			<span>Per Serving</span>
		</div>
		{facts.map((fact, i) => (
			<div
				key={i}
				className="flex items-center justify-between py-1 border-b border-muted"
			>
				<span className="text-sm">{fact.label}</span>
				<div className="flex items-center gap-2">
					<span className="font-medium text-sm">{fact.value}</span>
					{fact.daily && (
						<span className="text-xs text-muted-foreground">{fact.daily}</span>
					)}
				</div>
			</div>
		))}
	</div>
);

const IngredientBreakdown = ({ ingredients }: IngredientBreakdownProps) => (
	<div className="space-y-4">
		{ingredients.map((ing, i) => (
			<div key={i} className="space-y-2">
				<div className="flex items-center justify-between">
					<span className="font-medium text-sm">{ing.name}</span>
					<Badge variant="secondary">{ing.amount}</Badge>
				</div>
				<Progress value={Math.random() * 40 + 60} className="h-2" />
				<p className="text-xs text-muted-foreground">{ing.benefit}</p>
			</div>
		))}
	</div>
);

const UsageGuide = ({ timing }: UsageGuideProps) => (
	<div className="space-y-3">
		{timing.map((item, i) => (
			<Card key={i} className="bg-muted/30 border-muted">
				<CardContent className="p-4 flex items-start gap-3">
					<div className="p-2 rounded-lg bg-primary/10">
						<item.icon className="size-5 text-primary" />
					</div>
					<div>
						<p className="font-medium text-sm">{item.time}</p>
						<p className="text-xs text-muted-foreground mt-1">
							{item.instruction}
						</p>
					</div>
				</CardContent>
			</Card>
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
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12">
					{/* Image */}
					<ProductImage
						src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800"
						alt="Protein powder"
						badge="Best Seller"
					/>

					{/* Content */}
					<div className="flex flex-col gap-5">
						<Title
							brand="Muscle Fuel"
							name="Premium Whey Isolate Protein"
							tagline="27g protein per scoop • Rapid absorption formula"
						/>

						<Rating rating={5} reviews={12847} />

						<Price current="$54" original="$69" servings={30} />

						<Separator />

						{/* Tabs */}
						<Tabs defaultValue="nutrition" className="w-full">
							<TabsList className="w-full grid grid-cols-3">
								<TabsTrigger value="nutrition">Nutrition</TabsTrigger>
								<TabsTrigger value="ingredients">Ingredients</TabsTrigger>
								<TabsTrigger value="usage">How to Use</TabsTrigger>
							</TabsList>

							<TabsContent value="nutrition" className="mt-4">
								<NutritionFacts
									facts={[
										{ label: 'Calories', value: '120', daily: '' },
										{ label: 'Total Fat', value: '1g', daily: '1%' },
										{ label: 'Cholesterol', value: '30mg', daily: '10%' },
										{ label: 'Sodium', value: '50mg', daily: '2%' },
										{ label: 'Total Carbs', value: '2g', daily: '1%' },
										{ label: 'Protein', value: '27g', daily: '54%' },
									]}
								/>
							</TabsContent>

							<TabsContent value="ingredients" className="mt-4">
								<IngredientBreakdown
									ingredients={[
										{
											name: 'Whey Protein Isolate',
											amount: '25g',
											benefit:
												'Fast-absorbing complete protein with all essential amino acids.',
										},
										{
											name: 'BCAAs (Leucine, Isoleucine, Valine)',
											amount: '5.5g',
											benefit:
												'Supports muscle recovery and reduces post-workout soreness.',
										},
										{
											name: 'L-Glutamine',
											amount: '4g',
											benefit:
												'Aids immune function and gut health during intense training.',
										},
									]}
								/>
							</TabsContent>

							<TabsContent value="usage" className="mt-4">
								<UsageGuide
									timing={[
										{
											icon: Timer,
											time: 'Pre-Workout (30 min before)',
											instruction:
												'Mix 1 scoop with 8oz water. Provides sustained energy for your workout.',
										},
										{
											icon: Dumbbell,
											time: 'Post-Workout (within 30 min)',
											instruction:
												'Mix 1-2 scoops with water or milk for optimal muscle recovery.',
										},
										{
											icon: Flame,
											time: 'Morning Shake',
											instruction:
												'Blend with fruits and oats for a high-protein breakfast.',
										},
										{
											icon: Trophy,
											time: 'Competition Prep',
											instruction:
												'Increase to 2 scoops during cutting phases to preserve lean mass.',
										},
									]}
								/>
							</TabsContent>
						</Tabs>

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
