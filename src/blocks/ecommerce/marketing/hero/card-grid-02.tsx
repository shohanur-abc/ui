import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Tag, Crown, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CategoryCard = ({
	title,
	description,
	count,
	image,
	icon: Icon,
	href,
	featured = false,
}: {
	title: string;
	description: string;
	count: string;
	image: { src: string; alt: string };
	icon: React.ElementType;
	href: string;
	featured?: boolean;
}) => (
	<Link
		href={href}
		className={`group relative rounded-2xl border overflow-hidden ${featured ? 'row-span-2' : ''}`}
	>
		<div className="absolute inset-0">
			<Image
				src={image.src}
				alt={image.alt}
				fill
				className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
		</div>
		<div
			className={`relative h-full p-6 flex flex-col justify-end ${featured ? 'min-h-[400px]' : 'min-h-[200px]'}`}
		>
			<div className="size-10 rounded-xl bg-primary/20 backdrop-blur flex items-center justify-center mb-3">
				<Icon className="size-5 text-primary" />
			</div>
			<h3
				className={`font-bold mb-1 ${featured ? 'text-2xl @md:text-3xl' : 'text-xl'}`}
			>
				{title}
			</h3>
			<p className="text-sm text-muted-foreground mb-2">{description}</p>
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium text-primary">{count}</span>
				<ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
			</div>
		</div>
	</Link>
);

const PromoBanner = ({
	icon: Icon,
	text,
	cta,
}: {
	icon: React.ElementType;
	text: string;
	cta: { label: string; href: string };
}) => (
	<div className="rounded-2xl border bg-primary/10 p-6 flex items-center gap-4">
		<div className="size-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
			<Icon className="size-6 text-primary-foreground" />
		</div>
		<div className="flex-1">
			<p className="font-medium">{text}</p>
		</div>
		<Button size="sm" className="gap-1 shrink-0" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-3.5" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6 auto-rows-[200px]">
					<CategoryCard
						title="New Arrivals"
						description="Fresh styles just dropped"
						count="124 items"
						image={{
							src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop',
							alt: 'New arrivals',
						}}
						icon={Sparkles}
						href="/new"
						featured
					/>
					<CategoryCard
						title="Flash Sale"
						description="Up to 70% off"
						count="89 items"
						image={{
							src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=300&fit=crop',
							alt: 'Flash sale',
						}}
						icon={Flame}
						href="/sale"
					/>
					<CategoryCard
						title="Best Sellers"
						description="Customer favorites"
						count="56 items"
						image={{
							src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
							alt: 'Best sellers',
						}}
						icon={Crown}
						href="/bestsellers"
					/>
					<div className="@xl:col-span-2">
						<PromoBanner
							icon={Tag}
							text="Use code SAVE20 for 20% off your first order"
							cta={{ label: 'Shop Now', href: '/shop' }}
						/>
					</div>
					<CategoryCard
						title="Premium Collection"
						description="Luxury essentials"
						count="42 items"
						image={{
							src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop',
							alt: 'Premium collection',
						}}
						icon={Crown}
						href="/premium"
						featured
					/>
					<CategoryCard
						title="Accessories"
						description="Complete your look"
						count="178 items"
						image={{
							src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
							alt: 'Accessories',
						}}
						icon={Tag}
						href="/accessories"
					/>
				</div>
			</div>
		</section>
	);
}
