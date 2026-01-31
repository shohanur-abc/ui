'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	RotateCw,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface View360Props {
	images: string[];
	currentFrame: number;
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

interface ColorsProps {
	colors: { name: string; hex: string; selected?: boolean }[];
}

interface SizesProps {
	sizes: { label: string; available: boolean; selected?: boolean }[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const View360 = ({ images, currentFrame }: View360Props) => (
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 cursor-grab active:cursor-grabbing">
		<Image
			src={images[currentFrame]}
			alt="360 view"
			fill
			className="object-cover"
		/>
		<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm">
			<RotateCw
				className="size-4 text-primary animate-spin"
				style={{ animationDuration: '3s' }}
			/>
			<span className="text-sm font-medium">Drag to rotate</span>
		</div>
		<div className="absolute top-4 right-4">
			<Badge variant="secondary">360°</Badge>
		</div>
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

const Colors = ({ colors }: ColorsProps) => (
	<div className="space-y-3">
		<p className="font-medium text-sm">Color</p>
		<div className="flex gap-3">
			{colors.map((color, i) => (
				<button
					key={i}
					className={`size-10 rounded-full border-2 transition-all ${color.selected ? 'border-primary ring-2 ring-primary/20' : 'border-muted hover:border-primary/50'}`}
					style={{ backgroundColor: color.hex }}
					title={color.name}
				/>
			))}
		</div>
	</div>
);

const Sizes = ({ sizes }: SizesProps) => (
	<div className="space-y-3">
		<p className="font-medium text-sm">Size</p>
		<div className="flex flex-wrap gap-2">
			{sizes.map((size, i) => (
				<Button
					key={i}
					variant={size.selected ? 'default' : 'outline'}
					size="sm"
					disabled={!size.available}
					className="min-w-[3rem]"
				>
					{size.label}
				</Button>
			))}
		</div>
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
					{/* 360 View */}
					<View360
						images={[
							'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
						]}
						currentFrame={0}
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header
							brand="New Balance"
							name="550 White/Green"
							tagline="Iconic basketball heritage meets streetwear style"
						/>

						<Rating rating={5} reviews={6789} />

						<Price current="$130" original="$150" />

						<Separator />

						<Colors
							colors={[
								{ name: 'White/Green', hex: '#f5f5f5', selected: true },
								{ name: 'White/Navy', hex: '#1e3a5f' },
								{ name: 'White/Burgundy', hex: '#722f37' },
								{ name: 'White/Grey', hex: '#9ca3af' },
							]}
						/>

						<Sizes
							sizes={[
								{ label: '7', available: true },
								{ label: '7.5', available: true },
								{ label: '8', available: true, selected: true },
								{ label: '8.5', available: false },
								{ label: '9', available: true },
								{ label: '9.5', available: true },
								{ label: '10', available: true },
								{ label: '10.5', available: false },
								{ label: '11', available: true },
								{ label: '12', available: true },
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
