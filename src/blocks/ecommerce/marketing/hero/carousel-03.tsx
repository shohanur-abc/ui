import Link from 'next/link';
import Image from 'next/image';
import {
	ArrowRight,
	Heart,
	ShoppingBag,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SectionHeader = ({
	title,
	cta,
}: {
	title: string;
	cta: { label: string; href: string };
}) => (
	<div className="flex items-center justify-between mb-8">
		<h2 className="text-2xl @md:text-3xl font-bold">{title}</h2>
		<div className="flex items-center gap-4">
			<Button variant="ghost" className="gap-2 hidden @sm:flex" asChild>
				<Link href={cta.href}>
					{cta.label}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
			<div className="flex gap-2">
				<Button size="icon" variant="outline">
					<ChevronLeft className="size-5" />
				</Button>
				<Button size="icon" variant="outline">
					<ChevronRight className="size-5" />
				</Button>
			</div>
		</div>
	</div>
);

const ProductCard = ({
	image,
	badge,
	title,
	price,
	originalPrice,
}: {
	image: { src: string; alt: string };
	badge?: { text: string; variant?: 'default' | 'destructive' };
	title: string;
	price: string;
	originalPrice?: string;
}) => (
	<div className="group flex-shrink-0 w-[280px] @md:w-[320px]">
		<div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
			{badge && (
				<Badge variant={badge.variant} className="absolute top-4 left-4 z-10">
					{badge.text}
				</Badge>
			)}
			<Button
				size="icon"
				variant="secondary"
				className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<Heart className="size-4" />
			</Button>
			<Image
				src={image.src}
				alt={image.alt}
				fill
				className="object-cover group-hover:scale-105 transition-transform duration-500"
			/>
			<div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
				<Button className="w-full gap-2">
					<ShoppingBag className="size-4" />
					Quick Add
				</Button>
			</div>
		</div>
		<h3 className="font-medium mb-1">{title}</h3>
		<div className="flex items-center gap-2">
			<span className="font-bold text-primary">{price}</span>
			{originalPrice && (
				<span className="text-sm text-muted-foreground line-through">
					{originalPrice}
				</span>
			)}
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<SectionHeader
					title="Just Arrived"
					cta={{ label: 'View All New Arrivals', href: '/new' }}
				/>
				<div className="flex gap-4 @md:gap-6 overflow-x-auto pb-4 -mx-4 px-4 @sm:-mx-6 @sm:px-6 @2xl:-mx-8 @2xl:px-8 scrollbar-hide">
					<ProductCard
						image={{
							src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=533&fit=crop',
							alt: 'Fashion',
						}}
						badge={{ text: 'New' }}
						title="Silk Blend Blouse"
						price="$129"
					/>
					<ProductCard
						image={{
							src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=533&fit=crop',
							alt: 'Sneakers',
						}}
						badge={{ text: '-30%', variant: 'destructive' }}
						title="Urban Runner"
						price="$139"
						originalPrice="$199"
					/>
					<ProductCard
						image={{
							src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=533&fit=crop',
							alt: 'Bag',
						}}
						title="Leather Weekender"
						price="$349"
					/>
					<ProductCard
						image={{
							src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop',
							alt: 'Watch',
						}}
						badge={{ text: 'Limited' }}
						title="Classic Chronograph"
						price="$449"
					/>
					<ProductCard
						image={{
							src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=533&fit=crop',
							alt: 'Accessories',
						}}
						title="Accessory Set"
						price="$89"
					/>
				</div>
			</div>
		</section>
	);
}
