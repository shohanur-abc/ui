'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Package,
	Truck,
	RotateCcw,
	Shield,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductDisplayProps {
	src: string;
	alt: string;
	badge?: string;
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

interface TrustBadgesProps {
	badges: { icon: LucideIcon; text: string }[];
}

interface ShippingAccordionProps {
	sections: {
		id: string;
		title: string;
		items: { label: string; value: string }[];
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

const ProductDisplay = ({ src, alt, badge }: ProductDisplayProps) => (
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
		{badge && (
			<Badge className="absolute top-4 left-4" variant="destructive">
				{badge}
			</Badge>
		)}
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

const TrustBadges = ({ badges }: TrustBadgesProps) => (
	<div className="grid grid-cols-2 gap-2">
		{badges.map((badge, i) => (
			<Card key={i} className="bg-muted/30 border-muted">
				<CardContent className="p-3 flex items-center gap-2">
					<badge.icon className="size-4 text-primary" />
					<span className="text-sm">{badge.text}</span>
				</CardContent>
			</Card>
		))}
	</div>
);

const ShippingAccordion = ({ sections }: ShippingAccordionProps) => (
	<Accordion type="multiple" defaultValue={['shipping']} className="w-full">
		{sections.map((section) => (
			<AccordionItem key={section.id} value={section.id}>
				<AccordionTrigger className="text-sm font-medium">
					{section.title}
				</AccordionTrigger>
				<AccordionContent>
					<div className="space-y-2">
						{section.items.map((item, i) => (
							<div
								key={i}
								className="flex justify-between py-1.5 border-b border-muted/50 last:border-0"
							>
								<span className="text-sm text-muted-foreground">
									{item.label}
								</span>
								<span className="text-sm font-medium">{item.value}</span>
							</div>
						))}
					</div>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
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
					{/* Image */}
					<ProductDisplay
						src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800"
						alt="Designer handbag"
						badge="-30% OFF"
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header brand="Coach" name="Tabby Shoulder Bag" />

						<Rating rating={5} reviews={4892} />

						<Price current="$346" original="$495" discount="Save $149" />

						<Separator />

						<TrustBadges
							badges={[
								{ icon: Truck, text: 'Free shipping' },
								{ icon: RotateCcw, text: '30-day returns' },
								{ icon: Shield, text: 'Authenticity guaranteed' },
								{ icon: Package, text: 'Gift wrapping' },
							]}
						/>

						<ShippingAccordion
							sections={[
								{
									id: 'shipping',
									title: 'Shipping Options',
									items: [
										{ label: 'Standard (5-7 days)', value: 'Free' },
										{ label: 'Express (2-3 days)', value: '$9.99' },
										{ label: 'Next Day', value: '$19.99' },
										{ label: 'International', value: 'From $24.99' },
									],
								},
								{
									id: 'returns',
									title: 'Returns & Exchanges',
									items: [
										{ label: 'Return window', value: '30 days' },
										{ label: 'Return shipping', value: 'Free' },
										{ label: 'Exchange', value: 'Free' },
										{ label: 'Refund method', value: 'Original payment' },
									],
								},
								{
									id: 'warranty',
									title: 'Warranty Information',
									items: [
										{ label: 'Manufacturer warranty', value: '1 year' },
										{ label: 'Extended warranty', value: 'Available' },
										{ label: 'Coverage', value: 'Defects & craftsmanship' },
										{ label: 'Registration', value: 'Not required' },
									],
								},
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
