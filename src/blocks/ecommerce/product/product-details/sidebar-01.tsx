'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Star,
	ShoppingCart,
	Heart,
	ChevronRight,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductImageProps {
	src: string;
	alt: string;
}

interface SidebarNavProps {
	items: { label: string; href: string; active?: boolean }[];
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
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const SidebarNav = ({ items }: SidebarNavProps) => (
	<nav className="space-y-1">
		{items.map((item, i) => (
			<Link
				key={i}
				href={item.href}
				className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
					item.active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
				}`}
			>
				<span>{item.label}</span>
				<ChevronRight className="size-4" />
			</Link>
		))}
	</nav>
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
				<div className="grid @lg:grid-cols-[240px_1fr] gap-8">
					{/* Left sidebar */}
					<aside className="space-y-6">
						<SidebarNav
							items={[
								{ label: 'Overview', href: '#overview', active: true },
								{ label: 'Specifications', href: '#specs' },
								{ label: 'Reviews', href: '#reviews' },
								{ label: 'Q&A', href: '#qa' },
								{ label: 'Warranty', href: '#warranty' },
							]}
						/>
					</aside>

					{/* Main content */}
					<div className="grid @md:grid-cols-2 gap-8">
						<ProductImage
							src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
							alt="Smart watch"
						/>

						<div className="flex flex-col gap-5">
							<Header brand="Samsung" name="Galaxy Watch 6 Classic" />

							<Rating rating={5} reviews={3421} />

							<Price current="$399" original="$449" />

							<Separator />

							<Description text="Experience the classic rotating bezel with a premium stainless steel design. Track your health with advanced sensors and stay connected with seamless smartphone integration." />

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
			</div>
		</section>
	);
}
