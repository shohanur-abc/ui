'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Star, ShoppingCart, Heart, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductImageProps {
	src: string;
	alt: string;
	badge?: string;
}

interface RatingBreakdownSidebarProps {
	title: string;
	overall: number;
	total: number;
	breakdown: { stars: number; count: number; percentage: number }[];
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
	original?: string;
	discount?: string;
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

const ProductImage = ({ src, alt, badge }: ProductImageProps) => (
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
		{badge && <Badge className="absolute top-4 left-4">{badge}</Badge>}
	</div>
);

const RatingBreakdownSidebar = ({
	title,
	overall,
	total,
	breakdown,
}: RatingBreakdownSidebarProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardHeader className="pb-3">
			<CardTitle className="text-lg">{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="text-center pb-4 border-b border-border">
				<div className="text-4xl font-bold text-primary">{overall}</div>
				<div className="flex justify-center mt-1">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star
							key={i}
							className={`size-4 ${i < overall ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
						/>
					))}
				</div>
				<p className="text-sm text-muted-foreground mt-1">
					{total.toLocaleString()} reviews
				</p>
			</div>
			<div className="space-y-2">
				{breakdown.map((item, i) => (
					<div key={i} className="flex items-center gap-2">
						<span className="text-sm w-12">{item.stars} stars</span>
						<Progress value={item.percentage} className="flex-1 h-2" />
						<span className="text-xs text-muted-foreground w-10">
							{item.count}
						</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
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

const Price = ({ current, original, discount }: PriceProps) => (
	<div className="flex items-center gap-3">
		<span className="text-3xl font-bold text-primary">{current}</span>
		{original && (
			<span className="text-lg text-muted-foreground line-through">
				{original}
			</span>
		)}
		{discount && <Badge variant="destructive">{discount}</Badge>}
	</div>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground leading-relaxed">{text}</p>
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
				<div className="grid @lg:grid-cols-[1fr_300px] gap-8">
					{/* Main content */}
					<div className="grid @md:grid-cols-2 gap-8">
						<ProductImage
							src="https://images.unsplash.com/photo-1491553895911-0055uj93cf1e?w=800"
							alt="Electric kettle"
							badge="Editor's Choice"
						/>

						<div className="flex flex-col gap-5">
							<Header brand="Fellow" name="Stagg EKG Pro Electric Kettle" />

							<Rating rating={5} reviews={2341} />

							<Price current="$195" original="$225" discount="-13%" />

							<Separator />

							<Description text="Precision pour-over kettle with variable temperature control and built-in stopwatch. The iconic Stagg design combined with studio-grade technology for the perfect cup." />

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

					{/* Rating breakdown sidebar */}
					<aside>
						<RatingBreakdownSidebar
							title="Customer Reviews"
							overall={5}
							total={2341}
							breakdown={[
								{ stars: 5, count: 1892, percentage: 81 },
								{ stars: 4, count: 351, percentage: 15 },
								{ stars: 3, count: 70, percentage: 3 },
								{ stars: 2, count: 23, percentage: 1 },
								{ stars: 1, count: 5, percentage: 0 },
							]}
						/>
					</aside>
				</div>
			</div>
		</section>
	);
}
