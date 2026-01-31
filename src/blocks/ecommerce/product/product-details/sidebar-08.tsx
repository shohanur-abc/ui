'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	MapPin,
	Store,
	Truck,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductImageProps {
	src: string;
	alt: string;
}

interface StoreSidebarProps {
	stores: {
		name: string;
		address: string;
		distance: string;
		inStock: boolean;
	}[];
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

interface DeliveryOptionsProps {
	options: { icon: LucideIcon; label: string; info: string }[];
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

const StoreSidebar = ({ stores }: StoreSidebarProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardHeader className="pb-3">
			<CardTitle className="text-lg flex items-center gap-2">
				<MapPin className="size-5 text-primary" />
				Store Availability
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{stores.map((store, i) => (
				<div
					key={i}
					className="flex items-start justify-between p-3 rounded-lg bg-muted/50"
				>
					<div className="space-y-1">
						<p className="font-medium text-sm">{store.name}</p>
						<p className="text-xs text-muted-foreground">{store.address}</p>
						<p className="text-xs text-muted-foreground">{store.distance}</p>
					</div>
					<Badge variant={store.inStock ? 'default' : 'secondary'}>
						{store.inStock ? 'In Stock' : 'Out of Stock'}
					</Badge>
				</div>
			))}
			<Button variant="outline" className="w-full gap-2" size="sm">
				<Store className="size-4" />
				Find More Stores
			</Button>
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

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground leading-relaxed">{text}</p>
);

const DeliveryOptions = ({ options }: DeliveryOptionsProps) => (
	<div className="space-y-2">
		{options.map((option, i) => (
			<div
				key={i}
				className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
			>
				<option.icon className="size-4 text-primary" />
				<div>
					<p className="text-sm font-medium">{option.label}</p>
					<p className="text-xs text-muted-foreground">{option.info}</p>
				</div>
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
				<div className="grid @lg:grid-cols-[1fr_300px] gap-8">
					{/* Main content */}
					<div className="grid @md:grid-cols-2 gap-8">
						<ProductImage
							src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
							alt="Yoga mat"
						/>

						<div className="flex flex-col gap-5">
							<Header brand="Lululemon" name="The Reversible Mat 5mm" />

							<Rating rating={5} reviews={4567} />

							<Price current="$88" />

							<Separator />

							<Description text="Our signature yoga mat in a versatile, reversible design. Natural rubber base provides cushion and grip, with a polyurethane top layer that absorbs moisture." />

							<DeliveryOptions
								options={[
									{
										icon: Truck,
										label: 'Free Shipping',
										info: 'Arrives in 3-5 business days',
									},
									{
										icon: Store,
										label: 'Store Pickup',
										info: 'Check availability at stores nearby',
									},
								]}
							/>

							<Actions
								buttons={[
									{ label: 'Add to Bag', href: '#cart', icon: ShoppingCart },
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

					{/* Store availability sidebar */}
					<aside>
						<StoreSidebar
							stores={[
								{
									name: 'Downtown LA',
									address: '333 S Hope St',
									distance: '0.8 mi',
									inStock: true,
								},
								{
									name: 'Santa Monica',
									address: '1454 Third St',
									distance: '3.2 mi',
									inStock: true,
								},
								{
									name: 'Beverly Hills',
									address: '9534 Wilshire Blvd',
									distance: '5.1 mi',
									inStock: false,
								},
							]}
						/>
					</aside>
				</div>
			</div>
		</section>
	);
}
