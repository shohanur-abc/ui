import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FloatingImageDecorative = ({
	src,
	alt,
	className,
}: {
	src: string;
	alt: string;
	className: string;
}) => (
	<div
		className={`absolute rounded-xl overflow-hidden shadow-2xl ${className}`}
	>
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const StatsGrid = ({
	items,
}: {
	items: { value: string; label: string }[];
}) => (
	<div className="grid grid-cols-3 gap-4 @md:gap-6 mt-6 @md:mt-8">
		{items.map(({ value, label }, i) => (
			<div key={i} className="text-center">
				<div className="text-2xl @md:text-3xl font-bold text-primary">
					{value}
				</div>
				<div className="text-xs @md:text-sm text-muted-foreground">{label}</div>
			</div>
		))}
	</div>
);

const PromoContent = ({
	badge,
	headline,
	description,
	stats,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	description: string;
	stats: { value: string; label: string }[];
	cta: { label: string; href: string };
}) => (
	<div className="space-y-4">
		<Badge variant="outline" className="border-primary/50 text-primary gap-1.5">
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
			{headline.text}
			<span className="text-primary"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-md">
			{description}
		</p>
		<StatsGrid items={stats} />
		<Button size="lg" className="gap-2 mt-4" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

const ImageCollage = () => (
	<div className="relative h-[400px] @lg:h-[500px]">
		<FloatingImageDecorative
			src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
			alt="Product 1"
			className="w-40 @md:w-52 h-52 @md:h-64 top-0 right-0 @lg:right-12 z-20 hover:scale-105 transition-transform"
		/>
		<FloatingImageDecorative
			src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
			alt="Product 2"
			className="w-36 @md:w-44 h-44 @md:h-56 top-1/4 left-0 @lg:left-8 z-10"
		/>
		<FloatingImageDecorative
			src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400"
			alt="Product 3"
			className="w-44 @md:w-56 h-56 @md:h-72 bottom-0 right-1/4 z-30 hover:scale-105 transition-transform"
		/>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
						<PromoContent
							badge={{ icon: Sparkles, text: 'Trending Now' }}
							headline={{ text: "Shop What's", highlight: 'Hot' }}
							description="Join thousands of happy customers who've discovered their new favorites. Our most-loved products, curated just for you."
							stats={[
								{ value: '50K+', label: 'Happy Customers' },
								{ value: '4.9', label: 'Avg Rating' },
								{ value: '500+', label: 'Products' },
							]}
							cta={{ label: 'Shop Trending', href: '/trending' }}
						/>
						<ImageCollage />
					</div>
				</div>
			</div>
		</section>
	);
}
