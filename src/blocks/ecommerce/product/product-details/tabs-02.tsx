'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
	Star,
	ShoppingCart,
	Heart,
	ThumbsUp,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface GalleryProps {
	images: { src: string; alt: string }[];
}

interface ProductInfoProps {
	category: string;
	name: string;
	tagline: string;
}

interface RatingProps {
	stars: number;
	count: number;
}

interface PriceProps {
	price: string;
	compareAt?: string;
}

interface ReviewCardProps {
	author: { name: string; avatar: string; initials: string };
	rating: number;
	date: string;
	title: string;
	content: string;
	helpful: number;
}

interface DescriptionProps {
	text: string;
}

interface ShippingInfoProps {
	items: { label: string; value: string }[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const Gallery = ({ images }: GalleryProps) => (
	<div className="grid grid-cols-4 gap-2">
		<div className="col-span-4 relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
			<Image
				src={images[0].src}
				alt={images[0].alt}
				fill
				className="object-cover"
			/>
		</div>
		{images.slice(1, 5).map((img, i) => (
			<div
				key={i}
				className="relative aspect-square overflow-hidden rounded-lg bg-muted"
			>
				<Image src={img.src} alt={img.alt} fill className="object-cover" />
			</div>
		))}
	</div>
);

const ProductInfo = ({ category, name, tagline }: ProductInfoProps) => (
	<div className="space-y-1">
		<Badge variant="secondary">{category}</Badge>
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight">{name}</h1>
		<p className="text-muted-foreground">{tagline}</p>
	</div>
);

const Rating = ({ stars, count }: RatingProps) => (
	<div className="flex items-center gap-2">
		<div className="flex">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-4 ${i < stars ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
				/>
			))}
		</div>
		<span className="font-medium">{stars}</span>
		<span className="text-sm text-muted-foreground">({count} reviews)</span>
	</div>
);

const Price = ({ price, compareAt }: PriceProps) => (
	<div className="flex items-baseline gap-3">
		<span className="text-3xl font-bold text-primary">{price}</span>
		{compareAt && (
			<span className="text-lg text-muted-foreground line-through">
				{compareAt}
			</span>
		)}
	</div>
);

const ReviewCard = ({
	author,
	rating,
	date,
	title,
	content,
	helpful,
}: ReviewCardProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardContent className="p-4 space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Avatar className="size-10">
						<AvatarImage src={author.avatar} alt={author.name} />
						<AvatarFallback>{author.initials}</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium text-sm">{author.name}</p>
						<div className="flex items-center gap-2">
							<div className="flex">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										key={i}
										className={`size-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
									/>
								))}
							</div>
							<span className="text-xs text-muted-foreground">{date}</span>
						</div>
					</div>
				</div>
			</div>
			<div>
				<p className="font-medium">{title}</p>
				<p className="text-sm text-muted-foreground mt-1">{content}</p>
			</div>
			<div className="flex items-center gap-1 text-xs text-muted-foreground">
				<ThumbsUp className="size-3" />
				<span>{helpful} found helpful</span>
			</div>
		</CardContent>
	</Card>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground leading-relaxed whitespace-pre-line">
		{text}
	</p>
);

const ShippingInfo = ({ items }: ShippingInfoProps) => (
	<div className="space-y-3">
		{items.map((item, i) => (
			<div
				key={i}
				className="flex justify-between py-2 border-b border-muted last:border-0"
			>
				<span className="text-sm text-muted-foreground">{item.label}</span>
				<span className="text-sm font-medium">{item.value}</span>
			</div>
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
					{/* Gallery */}
					<Gallery
						images={[
							{
								src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
								alt: 'Sneakers main',
							},
							{
								src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
								alt: 'Sneakers side',
							},
							{
								src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
								alt: 'Sneakers top',
							},
							{
								src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
								alt: 'Sneakers back',
							},
							{
								src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
								alt: 'Sneakers detail',
							},
						]}
					/>

					{/* Product Info with Tabs */}
					<div className="flex flex-col gap-5">
						<ProductInfo
							category="Running Shoes"
							name="CloudRunner Elite Pro"
							tagline="Ultra-lightweight performance running shoes"
						/>

						<Rating stars={5} count={3892} />

						<Price price="$179" compareAt="$229" />

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

						{/* Tabs below actions */}
						<Tabs defaultValue="reviews" className="w-full mt-4">
							<TabsList className="w-full grid grid-cols-3">
								<TabsTrigger value="reviews">Reviews</TabsTrigger>
								<TabsTrigger value="details">Details</TabsTrigger>
								<TabsTrigger value="shipping">Shipping</TabsTrigger>
							</TabsList>

							<TabsContent value="reviews" className="mt-4 space-y-4">
								<ReviewCard
									author={{
										name: 'Sarah J.',
										avatar:
											'https://avatars.githubusercontent.com/u/252440198?v=4',
										initials: 'SJ',
									}}
									rating={5}
									date="Jan 28, 2026"
									title="Best running shoes I've owned!"
									content="These shoes are incredibly comfortable and lightweight. Perfect for long-distance running."
									helpful={47}
								/>
								<ReviewCard
									author={{
										name: 'Mike T.',
										avatar:
											'https://avatars.githubusercontent.com/u/252440198?v=4',
										initials: 'MT',
									}}
									rating={5}
									date="Jan 25, 2026"
									title="Excellent cushioning"
									content="The cushioning is amazing. My feet don't hurt anymore after 10K runs."
									helpful={32}
								/>
							</TabsContent>

							<TabsContent value="details" className="mt-4">
								<Description
									text="Engineered for peak performance, the CloudRunner Elite Pro features our revolutionary CloudFoam technology for unmatched comfort and responsiveness.

• Breathable mesh upper for maximum ventilation
• CloudFoam midsole for responsive cushioning
• Durable rubber outsole with enhanced grip
• Reflective details for low-light visibility
• Eco-friendly materials used throughout"
								/>
							</TabsContent>

							<TabsContent value="shipping" className="mt-4">
								<ShippingInfo
									items={[
										{
											label: 'Standard Shipping',
											value: '5-7 business days • Free',
										},
										{
											label: 'Express Shipping',
											value: '2-3 business days • $9.99',
										},
										{ label: 'Next Day', value: 'Order by 2pm • $19.99' },
										{ label: 'Returns', value: 'Free within 30 days' },
									]}
								/>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		</section>
	);
}
