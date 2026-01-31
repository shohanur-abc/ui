'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Check,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductImageProps {
	src: string;
	alt: string;
}

interface HeaderCardProps {
	brand: string;
	name: string;
	tagline: string;
}

interface PriceCardProps {
	current: string;
	original?: string;
	discount?: string;
	rating: number;
	reviews: number;
}

interface FeaturesCardProps {
	title: string;
	features: string[];
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

const HeaderCard = ({ brand, name, tagline }: HeaderCardProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardHeader>
			<CardDescription className="text-primary uppercase tracking-wider">
				{brand}
			</CardDescription>
			<CardTitle className="text-2xl">{name}</CardTitle>
			<CardDescription>{tagline}</CardDescription>
		</CardHeader>
	</Card>
);

const PriceCard = ({
	current,
	original,
	discount,
	rating,
	reviews,
}: PriceCardProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardContent className="p-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<span className="text-3xl font-bold text-primary">{current}</span>
					{original && (
						<span className="text-lg text-muted-foreground line-through">
							{original}
						</span>
					)}
					{discount && <Badge variant="destructive">{discount}</Badge>}
				</div>
				<div className="flex items-center gap-1">
					<Star className="size-4 fill-yellow-400 text-yellow-400" />
					<span className="font-medium">{rating}</span>
					<span className="text-sm text-muted-foreground">
						({reviews.toLocaleString()})
					</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const FeaturesCard = ({ title, features }: FeaturesCardProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardHeader className="pb-2">
			<CardTitle className="text-lg">{title}</CardTitle>
		</CardHeader>
		<CardContent className="pt-0">
			<ul className="space-y-2">
				{features.map((feature, i) => (
					<li key={i} className="flex items-center gap-2 text-sm">
						<Check className="size-4 text-primary flex-shrink-0" />
						<span>{feature}</span>
					</li>
				))}
			</ul>
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
				<div className="grid @lg:grid-cols-2 gap-6">
					{/* Product image */}
					<ProductImage
						src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
						alt="Headphones"
					/>

					{/* Stacked cards */}
					<div className="flex flex-col gap-4">
						<HeaderCard
							brand="Sony"
							name="WH-1000XM5"
							tagline="Industry-leading noise canceling with premium sound"
						/>

						<PriceCard
							current="$349"
							original="$399"
							discount="-13%"
							rating={4.8}
							reviews={15234}
						/>

						<FeaturesCard
							title="Key Features"
							features={[
								'Industry-leading noise cancellation',
								'30-hour battery life',
								'Multi-device connection',
								'Speak-to-Chat technology',
								'Premium leather ear cushions',
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
