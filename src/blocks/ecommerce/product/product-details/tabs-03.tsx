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
	Package,
	Clock,
	Shield,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroImageProps {
	src: string;
	alt: string;
	tag?: string;
}

interface TitleProps {
	brand: string;
	name: string;
}

interface RatingBreakdownProps {
	average: number;
	total: number;
	breakdown: { stars: number; count: number; percentage: number }[];
}

interface PriceProps {
	price: string;
	original?: string;
}

interface IngredientListProps {
	ingredients: { name: string; percentage: number; description: string }[];
}

interface UsageInstructionsProps {
	steps: string[];
}

interface GuaranteeCardProps {
	items: { icon: LucideIcon; title: string; description: string }[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const HeroImage = ({ src, alt, tag }: HeroImageProps) => (
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-950/30 dark:to-pink-950/30">
		<Image src={src} alt={alt} fill className="object-cover" />
		{tag && <Badge className="absolute top-4 left-4">{tag}</Badge>}
	</div>
);

const Title = ({ brand, name }: TitleProps) => (
	<div className="space-y-1">
		<p className="text-sm text-primary font-medium uppercase tracking-wider">
			{brand}
		</p>
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight">{name}</h1>
	</div>
);

const RatingBreakdown = ({
	average,
	total,
	breakdown,
}: RatingBreakdownProps) => (
	<div className="grid @sm:grid-cols-[auto_1fr] gap-4">
		<div className="text-center @sm:text-left">
			<div className="text-4xl font-bold">{average}</div>
			<div className="flex items-center justify-center @sm:justify-start gap-0.5 my-1">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						className={`size-4 ${i < Math.floor(average) ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
					/>
				))}
			</div>
			<p className="text-sm text-muted-foreground">
				{total.toLocaleString()} reviews
			</p>
		</div>
		<div className="space-y-1">
			{breakdown.map((item, i) => (
				<div key={i} className="flex items-center gap-2 text-sm">
					<span className="w-4">{item.stars}</span>
					<Star className="size-3 fill-yellow-400 text-yellow-400" />
					<Progress value={item.percentage} className="flex-1 h-2" />
					<span className="w-10 text-muted-foreground text-right">
						{item.count}
					</span>
				</div>
			))}
		</div>
	</div>
);

const Price = ({ price, original }: PriceProps) => (
	<div className="flex items-baseline gap-3">
		<span className="text-3xl font-bold text-primary">{price}</span>
		{original && (
			<span className="text-lg text-muted-foreground line-through">
				{original}
			</span>
		)}
	</div>
);

const IngredientList = ({ ingredients }: IngredientListProps) => (
	<div className="space-y-4">
		{ingredients.map((ing, i) => (
			<div key={i} className="space-y-2">
				<div className="flex items-center justify-between">
					<span className="font-medium text-sm">{ing.name}</span>
					<span className="text-sm text-primary">{ing.percentage}%</span>
				</div>
				<Progress value={ing.percentage} className="h-2" />
				<p className="text-xs text-muted-foreground">{ing.description}</p>
			</div>
		))}
	</div>
);

const UsageInstructions = ({ steps }: UsageInstructionsProps) => (
	<ol className="space-y-3">
		{steps.map((step, i) => (
			<li key={i} className="flex gap-3">
				<span className="flex-shrink-0 size-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
					{i + 1}
				</span>
				<span className="text-sm text-muted-foreground">{step}</span>
			</li>
		))}
	</ol>
);

const GuaranteeCards = ({ items }: GuaranteeCardProps) => (
	<div className="grid gap-3">
		{items.map((item, i) => (
			<Card key={i} className="bg-muted/30 border-muted">
				<CardContent className="p-4 flex items-start gap-3">
					<div className="p-2 rounded-lg bg-primary/10">
						<item.icon className="size-5 text-primary" />
					</div>
					<div>
						<p className="font-medium text-sm">{item.title}</p>
						<p className="text-xs text-muted-foreground">{item.description}</p>
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
					<HeroImage
						src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800"
						alt="Skincare serum"
						tag="Award Winner"
					/>

					{/* Content */}
					<div className="flex flex-col gap-5">
						<Title
							brand="Lumière Beauty"
							name="Radiance Boosting Vitamin C Serum"
						/>

						<Price price="$89" original="$110" />

						<Separator />

						{/* Vertical Tabs */}
						<Tabs defaultValue="ingredients" className="w-full">
							<TabsList className="w-full grid grid-cols-4">
								<TabsTrigger value="ingredients">Ingredients</TabsTrigger>
								<TabsTrigger value="reviews">Reviews</TabsTrigger>
								<TabsTrigger value="how-to">How to Use</TabsTrigger>
								<TabsTrigger value="guarantee">Guarantee</TabsTrigger>
							</TabsList>

							<TabsContent value="ingredients" className="mt-4">
								<IngredientList
									ingredients={[
										{
											name: 'Vitamin C (L-Ascorbic Acid)',
											percentage: 15,
											description: 'Brightens skin and reduces dark spots',
										},
										{
											name: 'Hyaluronic Acid',
											percentage: 2,
											description: 'Intense hydration and plumping effect',
										},
										{
											name: 'Vitamin E',
											percentage: 1,
											description: 'Antioxidant protection and skin repair',
										},
										{
											name: 'Ferulic Acid',
											percentage: 0.5,
											description: 'Enhances vitamin C stability and efficacy',
										},
									]}
								/>
							</TabsContent>

							<TabsContent value="reviews" className="mt-4">
								<RatingBreakdown
									average={4.9}
									total={2847}
									breakdown={[
										{ stars: 5, count: 2345, percentage: 82 },
										{ stars: 4, count: 389, percentage: 14 },
										{ stars: 3, count: 85, percentage: 3 },
										{ stars: 2, count: 20, percentage: 1 },
										{ stars: 1, count: 8, percentage: 0 },
									]}
								/>
							</TabsContent>

							<TabsContent value="how-to" className="mt-4">
								<UsageInstructions
									steps={[
										'Cleanse face thoroughly and pat dry',
										'Apply 4-5 drops to palm of hand',
										'Gently press serum onto face and neck',
										'Allow to absorb for 1-2 minutes',
										'Follow with moisturizer and SPF (morning use)',
									]}
								/>
							</TabsContent>

							<TabsContent value="guarantee" className="mt-4">
								<GuaranteeCards
									items={[
										{
											icon: Package,
											title: 'Free Shipping',
											description: 'On all orders over $50',
										},
										{
											icon: Clock,
											title: '60-Day Returns',
											description: 'Hassle-free money back guarantee',
										},
										{
											icon: Shield,
											title: 'Dermatologist Tested',
											description: 'Safe for all skin types',
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
