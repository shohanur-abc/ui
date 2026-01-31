'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Star, ShoppingCart, Heart, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductImageProps {
	src: string;
	alt: string;
}

interface FaqSidebarProps {
	title: string;
	faqs: { question: string; answer: string }[];
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
	perUnit?: string;
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

const FaqSidebar = ({ title, faqs }: FaqSidebarProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardContent className="p-5">
			<h3 className="font-semibold mb-4">{title}</h3>
			<Accordion type="single" collapsible className="space-y-2">
				{faqs.map((faq, i) => (
					<AccordionItem key={i} value={`faq-${i}`} className="border-muted">
						<AccordionTrigger className="text-sm text-left py-2 hover:no-underline">
							{faq.question}
						</AccordionTrigger>
						<AccordionContent className="text-sm text-muted-foreground">
							{faq.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</CardContent>
	</Card>
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

const Price = ({ current, perUnit }: PriceProps) => (
	<div className="flex items-baseline gap-2">
		<span className="text-3xl font-bold text-primary">{current}</span>
		{perUnit && <span className="text-muted-foreground">({perUnit})</span>}
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
				<div className="grid @lg:grid-cols-[1fr_320px] gap-8">
					{/* Main content */}
					<div className="grid @md:grid-cols-2 gap-8">
						<ProductImage
							src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800"
							alt="Vitamin supplements"
						/>

						<div className="flex flex-col gap-5">
							<Header
								brand="Ritual"
								name="Essential for Women 18+"
								tagline="Daily multivitamin with 9 essential nutrients"
							/>

							<Rating rating={5} reviews={18234} />

							<Price current="$33/month" perUnit="Subscribe & Save" />

							<Separator />

							<Description text="A daily multivitamin made traceable. 9 nutrients, no BS. Vegan-Certified, Non-GMO, and free of major allergens. Made with high-quality forms your body can actually use." />

							<Actions
								buttons={[
									{
										label: 'Subscribe',
										href: '#subscribe',
										icon: ShoppingCart,
									},
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

					{/* FAQ sidebar */}
					<aside>
						<FaqSidebar
							title="Common Questions"
							faqs={[
								{
									question: 'When should I take my vitamins?',
									answer:
										'Take 2 capsules daily, ideally with food. Many find it helpful to take them with breakfast or dinner.',
								},
								{
									question: 'Can I take these while pregnant?',
									answer:
										'Essential for Women 18+ is not designed for pregnancy. We recommend Essential Prenatal for those trying to conceive or pregnant.',
								},
								{
									question: 'Why delayed-release capsules?',
									answer:
										'Our delayed-release capsule is designed to dissolve later in the small intestine, reducing the nausea some people experience.',
								},
								{
									question: 'How do subscriptions work?',
									answer:
										'Subscriptions ship monthly and can be paused, skipped, or canceled anytime from your account.',
								},
							]}
						/>
					</aside>
				</div>
			</div>
		</section>
	);
}
