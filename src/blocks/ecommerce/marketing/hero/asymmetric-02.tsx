import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FeaturedHero = ({
	badge,
	title,
	description,
	image,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	title: string;
	description: string;
	image: { src: string; alt: string };
	cta: { label: string; href: string };
}) => (
	<div className="relative rounded-3xl overflow-hidden min-h-[500px] @xl:min-h-[600px] group">
		<Image
			src={image.src}
			alt={image.alt}
			fill
			className="object-cover group-hover:scale-105 transition-transform duration-700"
		/>
		<div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
		<div className="relative h-full p-8 @lg:p-12 @xl:p-16 flex flex-col justify-center max-w-xl">
			<Badge variant="secondary" className="w-fit gap-2 mb-6">
				<badge.icon className="size-4" />
				{badge.text}
			</Badge>
			<h1 className="text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight mb-4">
				{title}
			</h1>
			<p className="text-lg text-muted-foreground mb-8">{description}</p>
			<Button size="lg" className="w-fit gap-2" asChild>
				<Link href={cta.href}>
					{cta.label}
					<ArrowUpRight className="size-5" />
				</Link>
			</Button>
		</div>
	</div>
);

const CategoryLink = ({
	title,
	count,
	href,
	image,
}: {
	title: string;
	count: string;
	href: string;
	image: { src: string; alt: string };
}) => (
	<Link
		href={href}
		className="group flex items-center gap-4 p-4 rounded-xl border bg-card hover:border-primary/50 transition-colors"
	>
		<div className="relative size-16 rounded-lg overflow-hidden shrink-0">
			<Image src={image.src} alt={image.alt} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<h3 className="font-semibold group-hover:text-primary transition-colors">
				{title}
			</h3>
			<p className="text-sm text-muted-foreground">{count}</p>
		</div>
		<ChevronRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
	</Link>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @xl:grid-cols-3 gap-6 @xl:gap-8">
					<div className="@xl:col-span-2">
						<FeaturedHero
							badge={{ icon: Sparkles, text: 'New Collection' }}
							title="Autumn Essentials"
							description="Embrace the season with our carefully curated collection of warm layers and timeless pieces."
							image={{
								src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop',
								alt: 'Autumn collection',
							}}
							cta={{ label: 'Discover Now', href: '/autumn' }}
						/>
					</div>
					<div className="space-y-4">
						<CategoryLink
							title="Outerwear"
							count="48 products"
							href="/outerwear"
							image={{
								src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&fit=crop',
								alt: 'Outerwear',
							}}
						/>
						<CategoryLink
							title="Knitwear"
							count="36 products"
							href="/knitwear"
							image={{
								src: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop',
								alt: 'Knitwear',
							}}
						/>
						<CategoryLink
							title="Accessories"
							count="72 products"
							href="/accessories"
							image={{
								src: 'https://images.unsplash.com/photo-1509941943102-10c232fb7904?w=200&h=200&fit=crop',
								alt: 'Accessories',
							}}
						/>
						<CategoryLink
							title="Footwear"
							count="54 products"
							href="/footwear"
							image={{
								src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
								alt: 'Footwear',
							}}
						/>
						<CategoryLink
							title="Bags"
							count="29 products"
							href="/bags"
							image={{
								src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop',
								alt: 'Bags',
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
