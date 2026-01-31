'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Palette,
	Ruler,
	Package,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ImageCardProps {
	src: string;
	alt: string;
	badge?: string;
}

interface DetailCardProps {
	icon: LucideIcon;
	label: string;
	value: string;
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
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const ImageCard = ({ src, alt, badge }: ImageCardProps) => (
	<Card className="overflow-hidden bg-muted/30 border-muted col-span-2 row-span-2">
		<div className="relative aspect-square">
			<Image src={src} alt={alt} fill className="object-cover" />
			{badge && <Badge className="absolute top-4 left-4">{badge}</Badge>}
		</div>
	</Card>
);

const DetailCard = ({ icon: Icon, label, value }: DetailCardProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardContent className="p-4 text-center">
			<Icon className="size-5 mx-auto mb-2 text-primary" />
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="font-medium text-sm">{value}</p>
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
					{/* Card grid */}
					<div className="grid grid-cols-3 gap-3">
						<ImageCard
							src="https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800"
							alt="Backpack"
							badge="Best Seller"
						/>
						<DetailCard icon={Palette} label="Colors" value="6 options" />
						<DetailCard icon={Ruler} label="Capacity" value="26L" />
						<DetailCard icon={Package} label="Weight" value="850g" />
					</div>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header brand="Fjällräven" name="Kånken Classic" />

						<Rating rating={5} reviews={24567} />

						<Price current="$80" original="$95" />

						<Separator />

						<p className="text-muted-foreground leading-relaxed">
							A timeless icon since 1978. The Kånken was designed for
							schoolchildren with back problems, and it soon became a cult
							classic. Made from durable Vinylon F with reinforced bottom and
							shoulder straps.
						</p>

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
