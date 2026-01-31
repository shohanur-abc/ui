import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Crown, Gem, Flame, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MasonryCard = ({
	children,
	className = '',
	href,
}: {
	children: React.ReactNode;
	className?: string;
	href?: string;
}) => {
	const content = (
		<div
			className={`group relative rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10 ${className}`}
		>
			{children}
		</div>
	);
	return href ? <Link href={href}>{content}</Link> : content;
};

const FeaturedCard = ({
	src,
	alt,
	badge,
	headline,
	price,
	href,
}: {
	src: string;
	alt: string;
	badge: { icon: React.ElementType; text: string };
	headline: string;
	price: string;
	href: string;
}) => (
	<MasonryCard className="@md:row-span-2 bg-card" href={href}>
		<div className="aspect-[3/4]">
			<Image
				src={src}
				alt={alt}
				fill
				className="object-cover transition-transform duration-500 group-hover:scale-105"
			/>
		</div>
		<div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
		<div className="absolute top-4 left-4">
			<Badge className="gap-1.5 shadow-lg">
				<badge.icon className="size-3" />
				{badge.text}
			</Badge>
		</div>
		<div className="absolute bottom-0 left-0 right-0 p-5">
			<h3 className="font-bold text-lg mb-1">{headline}</h3>
			<p className="text-primary font-semibold">{price}</p>
		</div>
	</MasonryCard>
);

const CompactCard = ({
	src,
	alt,
	title,
	href,
}: {
	src: string;
	alt: string;
	title: string;
	href: string;
}) => (
	<MasonryCard className="bg-card" href={href}>
		<div className="aspect-square">
			<Image
				src={src}
				alt={alt}
				fill
				className="object-cover transition-transform duration-300 group-hover:scale-110"
			/>
		</div>
		<div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
			<span className="font-medium flex items-center gap-2">
				{title}
				<ArrowRight className="size-4" />
			</span>
		</div>
	</MasonryCard>
);

const PromoCard = ({
	icon: Icon,
	headline,
	cta,
	href,
}: {
	icon: React.ElementType;
	headline: string;
	cta: string;
	href: string;
}) => (
	<MasonryCard className="bg-primary p-5" href={href}>
		<Icon className="size-8 text-primary-foreground/80 mb-3" />
		<h3 className="font-bold text-primary-foreground mb-2">{headline}</h3>
		<span className="text-sm text-primary-foreground/80 flex items-center gap-1 group-hover:gap-2 transition-all">
			{cta}
			<ArrowRight className="size-3.5" />
		</span>
	</MasonryCard>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-4 @md:gap-6 auto-rows-[200px]">
						<FeaturedCard
							src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600"
							alt="Premium Bag"
							badge={{ icon: Crown, text: 'Premium' }}
							headline="Leather Tote Bag"
							price="From $189"
							href="/product/leather-tote"
						/>
						<CompactCard
							src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
							alt="Watch"
							title="Watches"
							href="/category/watches"
						/>
						<PromoCard
							icon={Flame}
							headline="Hot Deals of the Week"
							cta="Shop Deals"
							href="/deals"
						/>
						<CompactCard
							src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
							alt="Sneakers"
							title="Sneakers"
							href="/category/sneakers"
						/>
						<CompactCard
							src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400"
							alt="Sunglasses"
							title="Eyewear"
							href="/category/eyewear"
						/>
						<PromoCard
							icon={Gem}
							headline="VIP Members Save 25%"
							cta="Join Now"
							href="/vip"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
