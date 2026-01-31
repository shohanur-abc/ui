'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart, Heart, Info, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductImageProps {
	src: string;
	alt: string;
}

interface HeaderProps {
	brand: string;
	name: string;
}

interface RatingProps {
	rating: number;
	reviews: number;
}

interface PricingCardProps {
	options: {
		name: string;
		price: string;
		description: string;
		popular?: boolean;
	}[];
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
	<div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
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

const PricingCard = ({ options }: PricingCardProps) => (
	<div className="grid gap-3">
		{options.map((option, i) => (
			<Card
				key={i}
				className={`bg-muted/30 border-muted ${option.popular ? 'ring-2 ring-primary' : ''}`}
			>
				<CardContent className="p-4">
					<div className="flex items-start justify-between">
						<div>
							<div className="flex items-center gap-2">
								<p className="font-semibold">{option.name}</p>
								{option.popular && <Badge>Most Popular</Badge>}
							</div>
							<p className="text-sm text-muted-foreground">
								{option.description}
							</p>
						</div>
						<p className="text-xl font-bold text-primary">{option.price}</p>
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
				<div className="grid @lg:grid-cols-2 gap-8">
					{/* Product image */}
					<ProductImage
						src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200"
						alt="Coffee subscription"
					/>

					{/* Details with pricing cards */}
					<div className="flex flex-col gap-5">
						<Header brand="Blue Bottle" name="Coffee Subscription" />

						<Rating rating={5} reviews={12456} />

						<p className="text-muted-foreground leading-relaxed">
							Discover exceptional coffees from around the world, freshly
							roasted and delivered to your door. Choose your frequency and
							quantity for the perfect coffee experience.
						</p>

						<Separator />

						<PricingCard
							options={[
								{
									name: 'Weekly',
									price: '$16/wk',
									description: '12 oz bag every week',
								},
								{
									name: 'Bi-Weekly',
									price: '$16/2wk',
									description: '12 oz bag every 2 weeks',
									popular: true,
								},
								{
									name: 'Monthly',
									price: '$32/mo',
									description: 'Two 12 oz bags monthly',
								},
							]}
						/>

						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Info className="size-4" />
							<span>Free shipping on all subscriptions. Cancel anytime.</span>
						</div>

						<Actions
							buttons={[
								{
									label: 'Start Subscription',
									href: '#subscribe',
									icon: ShoppingCart,
								},
								{
									label: 'Gift',
									href: '#gift',
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
