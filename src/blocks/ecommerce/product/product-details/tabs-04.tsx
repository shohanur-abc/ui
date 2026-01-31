'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Truck,
	RotateCcw,
	Shield,
	Award,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ImageGridProps {
	main: { src: string; alt: string };
	thumbnails: { src: string; alt: string }[];
}

interface HeaderProps {
	collection: string;
	name: string;
	sku: string;
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

interface MaterialTableProps {
	materials: { name: string; percentage: string; origin: string }[];
}

interface CareInstructionsProps {
	instructions: { icon: string; text: string }[];
}

interface SustainabilityProps {
	items: { title: string; description: string }[];
}

interface TrustBadgesProps {
	badges: { icon: LucideIcon; text: string }[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const ImageGrid = ({ main, thumbnails }: ImageGridProps) => (
	<div className="space-y-3">
		<div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
			<Image src={main.src} alt={main.alt} fill className="object-cover" />
		</div>
		<div className="grid grid-cols-4 gap-2">
			{thumbnails.map((thumb, i) => (
				<div
					key={i}
					className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer ring-2 ring-transparent hover:ring-primary transition-all"
				>
					<Image
						src={thumb.src}
						alt={thumb.alt}
						fill
						className="object-cover"
					/>
				</div>
			))}
		</div>
	</div>
);

const Header = ({ collection, name, sku }: HeaderProps) => (
	<div className="space-y-1">
		<div className="flex items-center gap-2">
			<Badge variant="outline">{collection}</Badge>
			<span className="text-xs text-muted-foreground">SKU: {sku}</span>
		</div>
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
		<span className="text-sm text-muted-foreground">({reviews} reviews)</span>
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

const MaterialTable = ({ materials }: MaterialTableProps) => (
	<div className="overflow-hidden rounded-lg border">
		<table className="w-full text-sm">
			<thead className="bg-muted/50">
				<tr>
					<th className="text-left p-3 font-medium">Material</th>
					<th className="text-left p-3 font-medium">Composition</th>
					<th className="text-left p-3 font-medium">Origin</th>
				</tr>
			</thead>
			<tbody>
				{materials.map((mat, i) => (
					<tr key={i} className="border-t">
						<td className="p-3">{mat.name}</td>
						<td className="p-3 text-muted-foreground">{mat.percentage}</td>
						<td className="p-3 text-muted-foreground">{mat.origin}</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

const CareInstructions = ({ instructions }: CareInstructionsProps) => (
	<div className="grid grid-cols-2 gap-3">
		{instructions.map((inst, i) => (
			<div
				key={i}
				className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
			>
				<span className="text-2xl">{inst.icon}</span>
				<span className="text-sm">{inst.text}</span>
			</div>
		))}
	</div>
);

const Sustainability = ({ items }: SustainabilityProps) => (
	<div className="space-y-4">
		{items.map((item, i) => (
			<Card
				key={i}
				className="bg-green-50/50 dark:bg-green-950/20 border-green-200/50 dark:border-green-800/30"
			>
				<CardContent className="p-4">
					<p className="font-medium text-sm text-green-700 dark:text-green-300">
						{item.title}
					</p>
					<p className="text-xs text-muted-foreground mt-1">
						{item.description}
					</p>
				</CardContent>
			</Card>
		))}
	</div>
);

const TrustBadges = ({ badges }: TrustBadgesProps) => (
	<div className="grid grid-cols-2 gap-2">
		{badges.map((badge, i) => (
			<div
				key={i}
				className="flex items-center gap-2 text-sm text-muted-foreground"
			>
				<badge.icon className="size-4 text-primary" />
				<span>{badge.text}</span>
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
					{/* Images */}
					<ImageGrid
						main={{
							src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
							alt: 'Jacket main view',
						}}
						thumbnails={[
							{
								src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200',
								alt: 'Front',
							},
							{
								src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200',
								alt: 'Back',
							},
							{
								src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200',
								alt: 'Detail',
							},
							{
								src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200',
								alt: 'Label',
							},
						]}
					/>

					{/* Content */}
					<div className="flex flex-col gap-5">
						<Header
							collection="Sustainable Line"
							name="Organic Cotton Field Jacket"
							sku="OC-FJ-2026-M"
						/>

						<Rating rating={5} reviews={892} />

						<Price current="$189" original="$249" discount="-24%" />

						<TrustBadges
							badges={[
								{ icon: Truck, text: 'Free shipping' },
								{ icon: RotateCcw, text: '30-day returns' },
								{ icon: Shield, text: '2-year warranty' },
								{ icon: Award, text: 'Certified organic' },
							]}
						/>

						<Separator />

						{/* Tabs */}
						<Tabs defaultValue="materials" className="w-full">
							<TabsList className="w-full grid grid-cols-3">
								<TabsTrigger value="materials">Materials</TabsTrigger>
								<TabsTrigger value="care">Care</TabsTrigger>
								<TabsTrigger value="sustainability">Sustainability</TabsTrigger>
							</TabsList>

							<TabsContent value="materials" className="mt-4">
								<MaterialTable
									materials={[
										{
											name: 'Organic Cotton',
											percentage: '80%',
											origin: 'Portugal',
										},
										{
											name: 'Recycled Polyester',
											percentage: '15%',
											origin: 'Italy',
										},
										{ name: 'Elastane', percentage: '5%', origin: 'Spain' },
									]}
								/>
							</TabsContent>

							<TabsContent value="care" className="mt-4">
								<CareInstructions
									instructions={[
										{ icon: '🧺', text: 'Machine wash cold' },
										{ icon: '🌡️', text: 'Do not bleach' },
										{ icon: '👔', text: 'Tumble dry low' },
										{ icon: '🔥', text: 'Iron on low heat' },
									]}
								/>
							</TabsContent>

							<TabsContent value="sustainability" className="mt-4">
								<Sustainability
									items={[
										{
											title: 'GOTS Certified Organic',
											description:
												'Our cotton is certified by the Global Organic Textile Standard.',
										},
										{
											title: 'Carbon Neutral',
											description:
												'We offset 100% of our carbon footprint through verified projects.',
										},
										{
											title: 'Fair Trade',
											description:
												'Produced in factories that meet fair labor standards.',
										},
									]}
								/>
							</TabsContent>
						</Tabs>

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
