'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ShoppingCart, Heart, type LucideIcon } from 'lucide-react';
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
	original?: string;
}

interface TestimonialCardProps {
	avatar: string;
	name: string;
	rating: number;
	text: string;
	date: string;
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
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
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

const TestimonialCard = ({
	avatar,
	name,
	rating,
	text,
	date,
}: TestimonialCardProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardContent className="p-4">
			<div className="flex items-start gap-3">
				<Avatar className="size-10">
					<AvatarImage src={avatar} alt={name} />
					<AvatarFallback>{name[0]}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<div className="flex items-center justify-between mb-1">
						<p className="font-medium">{name}</p>
						<div className="flex">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									className={`size-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
								/>
							))}
						</div>
					</div>
					<p className="text-sm text-muted-foreground mb-2">{text}</p>
					<p className="text-xs text-muted-foreground">{date}</p>
				</div>
			</div>
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
				<div className="grid @lg:grid-cols-2 gap-8">
					{/* Product image */}
					<ProductImage
						src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800"
						alt="Skincare serum"
					/>

					{/* Details with testimonial cards */}
					<div className="flex flex-col gap-5">
						<Header
							brand="The Ordinary"
							name="Niacinamide 10% + Zinc 1%"
							tagline="High-strength vitamin and mineral blemish formula"
						/>

						<Rating rating={5} reviews={89234} />

						<Price current="$6.50" />

						<Separator />

						<div className="space-y-3">
							<p className="font-medium text-sm">What customers say</p>
							<TestimonialCard
								avatar=""
								name="Sarah K."
								rating={5}
								text="This serum has completely transformed my skin! Visible results within 2 weeks."
								date="2 weeks ago"
							/>
							<TestimonialCard
								avatar=""
								name="Michael T."
								rating={5}
								text="Best value for money. My pores look so much smaller now."
								date="1 month ago"
							/>
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
