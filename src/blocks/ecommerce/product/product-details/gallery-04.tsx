'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Expand,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface FullscreenGalleryProps {
	main: { src: string; alt: string };
	grid: { src: string; alt: string }[];
}

interface TitleProps {
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

interface ColorOptionsProps {
	colors: { name: string; hex: string; image: string }[];
}

interface DescriptionProps {
	text: string;
}

interface QuickSpecsProps {
	specs: { label: string; value: string }[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const FullscreenGallery = ({ main, grid }: FullscreenGalleryProps) => (
	<div className="space-y-3">
		<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted group">
			<Image src={main.src} alt={main.alt} fill className="object-cover" />
			<button className="absolute top-4 right-4 size-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
				<Expand className="size-5" />
			</button>
		</div>
		<div className="grid grid-cols-3 gap-2">
			{grid.map((img, i) => (
				<div
					key={i}
					className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer group"
				>
					<Image
						src={img.src}
						alt={img.alt}
						fill
						className="object-cover transition-transform group-hover:scale-105"
					/>
				</div>
			))}
		</div>
	</div>
);

const Title = ({ brand, name }: TitleProps) => (
	<div className="space-y-1">
		<p className="text-sm text-primary font-medium">{brand}</p>
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

const ColorOptions = ({ colors }: ColorOptionsProps) => (
	<div className="space-y-3">
		<p className="text-sm font-medium">Color Options</p>
		<div className="flex gap-3">
			{colors.map((color, i) => (
				<div key={i} className="relative group cursor-pointer">
					<div
						className={`size-12 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all ${i === 0 ? 'ring-primary' : 'ring-transparent hover:ring-primary/50'}`}
						style={{ backgroundColor: color.hex }}
					/>
					<span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
						{color.name}
					</span>
				</div>
			))}
		</div>
	</div>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground leading-relaxed">{text}</p>
);

const QuickSpecs = ({ specs }: QuickSpecsProps) => (
	<div className="grid grid-cols-2 gap-2">
		{specs.map((spec, i) => (
			<Card key={i} className="bg-muted/30 border-muted">
				<CardContent className="p-3">
					<p className="text-xs text-muted-foreground">{spec.label}</p>
					<p className="font-medium text-sm">{spec.value}</p>
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
					{/* Gallery */}
					<FullscreenGallery
						main={{
							src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
							alt: 'Sneakers main',
						}}
						grid={[
							{
								src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
								alt: 'Detail 1',
							},
							{
								src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
								alt: 'Detail 2',
							},
							{
								src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
								alt: 'Detail 3',
							},
						]}
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Badge className="w-fit">New Arrival</Badge>

						<Title brand="Nike" name="Air Jordan 1 Retro High OG" />

						<Rating rating={5} reviews={8934} />

						<Price current="$180" />

						<ColorOptions
							colors={[
								{ name: 'Chicago', hex: '#C41E3A', image: '' },
								{ name: 'Shadow', hex: '#555555', image: '' },
								{ name: 'Royal', hex: '#0066CC', image: '' },
								{ name: 'Bred', hex: '#1a1a1a', image: '' },
							]}
						/>

						<Separator className="my-2" />

						<Description text="The Air Jordan 1 Retro High OG features premium leather construction, Nike Air cushioning, and the iconic Wings logo. A timeless silhouette that transcends basketball." />

						<QuickSpecs
							specs={[
								{ label: 'Style', value: 'High Top' },
								{ label: 'Material', value: 'Premium Leather' },
								{ label: 'Closure', value: 'Lace-up' },
								{ label: 'Sole', value: 'Rubber' },
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
