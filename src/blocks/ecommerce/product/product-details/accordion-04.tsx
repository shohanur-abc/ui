'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	ThumbsUp,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductImageProps {
	src: string;
	alt: string;
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
	unit: string;
}

interface ReviewAccordionProps {
	reviews: {
		id: string;
		author: { name: string; avatar: string; initials: string };
		rating: number;
		date: string;
		title: string;
		content: string;
		helpful: number;
	}[];
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

const ProductImage = ({ src, alt }: ProductImageProps) => (
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const Header = ({ brand, name, tagline }: HeaderProps) => (
	<div className="space-y-2">
		<Badge variant="outline">{brand}</Badge>
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

const Price = ({ current, unit }: PriceProps) => (
	<div className="flex items-baseline gap-1">
		<span className="text-3xl font-bold text-primary">{current}</span>
		<span className="text-muted-foreground">/ {unit}</span>
	</div>
);

const ReviewAccordion = ({ reviews }: ReviewAccordionProps) => (
	<Accordion type="single" collapsible className="w-full">
		{reviews.map((review) => (
			<AccordionItem key={review.id} value={review.id}>
				<AccordionTrigger className="hover:no-underline">
					<div className="flex items-center gap-3 text-left">
						<Avatar className="size-8">
							<AvatarImage
								src={review.author.avatar}
								alt={review.author.name}
							/>
							<AvatarFallback>{review.author.initials}</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<p className="text-sm font-medium">{review.title}</p>
							<div className="flex items-center gap-2">
								<div className="flex">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={i}
											className={`size-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
										/>
									))}
								</div>
								<span className="text-xs text-muted-foreground">
									{review.author.name}
								</span>
							</div>
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<div className="pl-11 space-y-3">
						<p className="text-sm text-muted-foreground">{review.content}</p>
						<div className="flex items-center justify-between">
							<span className="text-xs text-muted-foreground">
								{review.date}
							</span>
							<div className="flex items-center gap-1 text-xs text-muted-foreground">
								<ThumbsUp className="size-3" />
								{review.helpful} found helpful
							</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);

const Description = ({ text }: DescriptionProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardContent className="p-4">
			<p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
		</CardContent>
	</Card>
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
						src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800"
						alt="Coffee beans"
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header
							brand="Artisan Roasters"
							name="Ethiopian Yirgacheffe Single Origin"
							tagline="Light roast with floral and citrus notes"
						/>

						<Rating rating={5} reviews={3892} />

						<Price current="$24" unit="12oz bag" />

						<Separator />

						<Description text="Hand-selected beans from the birthplace of coffee. This Ethiopian Yirgacheffe offers a complex flavor profile with bright acidity, jasmine aromatics, and hints of bergamot and lemon. Perfect for pour-over and filter brewing." />

						<ReviewAccordion
							reviews={[
								{
									id: 'review-1',
									author: {
										name: 'Coffee Lover',
										avatar:
											'https://avatars.githubusercontent.com/u/252440198?v=4',
										initials: 'CL',
									},
									rating: 5,
									date: 'Jan 28, 2026',
									title: "Best coffee I've ever had!",
									content:
										"The floral notes are incredible. I've tried many single origins but this Yirgacheffe stands out. The roast level is perfect - just light enough to preserve the delicate flavors.",
									helpful: 47,
								},
								{
									id: 'review-2',
									author: {
										name: 'Barista Mike',
										avatar:
											'https://avatars.githubusercontent.com/u/252440198?v=4',
										initials: 'BM',
									},
									rating: 5,
									date: 'Jan 25, 2026',
									title: 'Professional quality beans',
									content:
										"As a professional barista, I'm very picky about my beans. These are roasted to perfection. Great for espresso-based drinks and pour-over alike.",
									helpful: 32,
								},
								{
									id: 'review-3',
									author: {
										name: 'Morning Person',
										avatar:
											'https://avatars.githubusercontent.com/u/252440198?v=4',
										initials: 'MP',
									},
									rating: 4,
									date: 'Jan 22, 2026',
									title: 'Delicious but pricey',
									content:
										"Really love the taste and aroma. It's become my go-to morning coffee. Only giving 4 stars because of the price, but you get what you pay for.",
									helpful: 18,
								},
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
