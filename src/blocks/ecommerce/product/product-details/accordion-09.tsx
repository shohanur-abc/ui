'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart, Heart, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductImageProps {
	src: string;
	alt: string;
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

interface VariantPriceProps {
	basePrice: string;
	variants: { id: string; name: string; priceAdd: string }[];
}

interface VariantAccordionProps {
	sections: {
		id: string;
		title: string;
		options: {
			id: string;
			name: string;
			price?: string;
			description?: string;
		}[];
		defaultValue: string;
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

const ProductImage = ({ src, alt }: ProductImageProps) => (
	<div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const Header = ({ brand, name, tagline }: HeaderProps) => (
	<div className="space-y-2">
		<Badge variant="secondary">{brand}</Badge>
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

const VariantPrice = ({ basePrice, variants }: VariantPriceProps) => (
	<div className="space-y-2">
		<div className="flex items-baseline gap-2">
			<span className="text-sm text-muted-foreground">Starting at</span>
			<span className="text-3xl font-bold text-primary">{basePrice}</span>
		</div>
		<div className="flex flex-wrap gap-2">
			{variants.map((v, i) => (
				<Badge key={i} variant="outline" className="text-xs">
					{v.name} {v.priceAdd}
				</Badge>
			))}
		</div>
	</div>
);

const VariantAccordion = ({ sections }: VariantAccordionProps) => (
	<Accordion
		type="multiple"
		defaultValue={sections.map((s) => s.id)}
		className="w-full"
	>
		{sections.map((section) => (
			<AccordionItem key={section.id} value={section.id}>
				<AccordionTrigger className="text-sm font-medium">
					{section.title}
				</AccordionTrigger>
				<AccordionContent>
					<RadioGroup defaultValue={section.defaultValue} className="space-y-2">
						{section.options.map((option) => (
							<div key={option.id} className="flex items-start gap-3">
								<RadioGroupItem
									value={option.id}
									id={option.id}
									className="mt-1"
								/>
								<Label htmlFor={option.id} className="flex-1 cursor-pointer">
									<div className="flex items-center justify-between">
										<span className="font-medium text-sm">{option.name}</span>
										{option.price && (
											<span className="text-sm text-primary">
												{option.price}
											</span>
										)}
									</div>
									{option.description && (
										<p className="text-xs text-muted-foreground mt-0.5">
											{option.description}
										</p>
									)}
								</Label>
							</div>
						))}
					</RadioGroup>
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
						src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"
						alt="Custom laptop"
					/>

					{/* Details */}
					<div className="flex flex-col gap-5">
						<Header
							brand="TechCustom"
							name="Build Your Dream Workstation"
							tagline="Configure your perfect machine"
						/>

						<Rating rating={5} reviews={2341} />

						<VariantPrice
							basePrice="$1,499"
							variants={[
								{ id: 'cpu', name: 'i9', priceAdd: '+$300' },
								{ id: 'ram', name: '64GB', priceAdd: '+$400' },
								{ id: 'storage', name: '2TB SSD', priceAdd: '+$200' },
							]}
						/>

						<Separator />

						<VariantAccordion
							sections={[
								{
									id: 'processor',
									title: 'Processor',
									defaultValue: 'i7',
									options: [
										{
											id: 'i5',
											name: 'Intel Core i5-14600K',
											price: 'Included',
											description: '6P + 8E cores, 24 threads, up to 5.3GHz',
										},
										{
											id: 'i7',
											name: 'Intel Core i7-14700K',
											price: '+$150',
											description: '8P + 12E cores, 28 threads, up to 5.6GHz',
										},
										{
											id: 'i9',
											name: 'Intel Core i9-14900K',
											price: '+$300',
											description: '8P + 16E cores, 32 threads, up to 6.0GHz',
										},
									],
								},
								{
									id: 'memory',
									title: 'Memory (RAM)',
									defaultValue: '32gb',
									options: [
										{ id: '16gb', name: '16GB DDR5-5600', price: 'Included' },
										{ id: '32gb', name: '32GB DDR5-5600', price: '+$100' },
										{ id: '64gb', name: '64GB DDR5-5600', price: '+$400' },
										{ id: '128gb', name: '128GB DDR5-5600', price: '+$900' },
									],
								},
								{
									id: 'storage',
									title: 'Storage',
									defaultValue: '1tb',
									options: [
										{ id: '512gb', name: '512GB NVMe SSD', price: 'Included' },
										{ id: '1tb', name: '1TB NVMe SSD', price: '+$50' },
										{ id: '2tb', name: '2TB NVMe SSD', price: '+$200' },
										{ id: '4tb', name: '4TB NVMe SSD', price: '+$500' },
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
