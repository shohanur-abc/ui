'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Leaf,
	Award,
	Globe,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductImageProps {
	src: string;
	alt: string;
	badges: { text: string; variant?: 'default' | 'secondary' | 'outline' }[];
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

interface SustainabilityAccordionProps {
	sections: {
		id: string;
		icon: LucideIcon;
		title: string;
		content: string;
		stats?: { label: string; value: string }[];
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

const ProductImage = ({ src, alt, badges }: ProductImageProps) => (
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute top-4 left-4 flex flex-wrap gap-2">
			{badges.map((badge, i) => (
				<Badge key={i} variant={badge.variant || 'default'}>
					{badge.text}
				</Badge>
			))}
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

const SustainabilityAccordion = ({
	sections,
}: SustainabilityAccordionProps) => (
	<Accordion
		type="multiple"
		defaultValue={['environmental']}
		className="w-full"
	>
		{sections.map((section) => (
			<AccordionItem key={section.id} value={section.id}>
				<AccordionTrigger className="hover:no-underline">
					<div className="flex items-center gap-3">
						<div className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/30">
							<section.icon className="size-4 text-green-600 dark:text-green-400" />
						</div>
						<span className="text-sm font-medium">{section.title}</span>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<div className="pl-10 space-y-3">
						<p className="text-sm text-muted-foreground leading-relaxed">
							{section.content}
						</p>
						{section.stats && (
							<div className="grid grid-cols-2 gap-2">
								{section.stats.map((stat, i) => (
									<div
										key={i}
										className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20"
									>
										<p className="text-xs text-muted-foreground">
											{stat.label}
										</p>
										<p className="text-sm font-medium text-green-700 dark:text-green-300">
											{stat.value}
										</p>
									</div>
								))}
							</div>
						)}
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
					<ProductImage
						src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800"
						alt="Sustainable jacket"
						badges={[
							{ text: 'Organic', variant: 'secondary' },
							{ text: 'Fair Trade' },
						]}
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header
							brand="Patagonia"
							name="Nano Puff Insulated Jacket"
							tagline="Warm, lightweight, and made responsibly"
						/>

						<Rating rating={5} reviews={6892} />

						<Price current="$199" original="$249" />

						<Separator />

						<SustainabilityAccordion
							sections={[
								{
									id: 'environmental',
									icon: Leaf,
									title: 'Environmental Impact',
									content:
										'This jacket is made with 100% recycled polyester ripstop shell and lining. The PrimaLoft Gold Insulation Eco is made with 55% post-consumer recycled content.',
									stats: [
										{ label: 'Recycled materials', value: '100% shell' },
										{ label: 'Water saved', value: '13 gallons' },
										{ label: 'CO2 reduced', value: '4.2 lbs' },
										{ label: 'Bottles recycled', value: '7 plastic bottles' },
									],
								},
								{
									id: 'certifications',
									icon: Award,
									title: 'Certifications',
									content:
										'bluesign® approved fabric means it was made using only safe chemicals and processes that ensure clean air, clean water, and worker safety throughout the supply chain.',
									stats: [
										{ label: 'bluesign®', value: 'Approved' },
										{ label: 'Fair Trade', value: 'Certified' },
									],
								},
								{
									id: 'supply-chain',
									icon: Globe,
									title: 'Supply Chain Transparency',
									content:
										'We track this jacket from raw materials to finished product. It was sewn in a Fair Trade Certified™ factory, which means the workers who made it earned a premium for their labor.',
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
