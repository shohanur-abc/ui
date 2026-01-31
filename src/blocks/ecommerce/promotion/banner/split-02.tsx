import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AccentLineDecorative = () => (
	<div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary" />
);

const ProductShowcase = ({
	src,
	alt,
	badge,
}: {
	src: string;
	alt: string;
	badge: string;
}) => (
	<div className="relative aspect-[3/4] @lg:aspect-square rounded-2xl overflow-hidden bg-card">
		<Image src={src} alt={alt} fill className="object-cover" />
		<Badge className="absolute top-4 left-4 shadow-lg">{badge}</Badge>
	</div>
);

const FeatureList = ({
	items,
}: {
	items: { icon: React.ElementType; text: string }[];
}) => (
	<div className="flex flex-wrap gap-4 @md:gap-6">
		{items.map(({ icon: Icon, text }, i) => (
			<div
				key={i}
				className="flex items-center gap-2 text-sm text-muted-foreground"
			>
				<Icon className="size-4 text-primary" />
				<span>{text}</span>
			</div>
		))}
	</div>
);

const PriceDisplay = ({
	original,
	sale,
}: {
	original: string;
	sale: string;
}) => (
	<div className="flex items-baseline gap-3">
		<span className="text-3xl @md:text-4xl font-bold text-primary">{sale}</span>
		<span className="text-lg text-muted-foreground line-through">
			{original}
		</span>
	</div>
);

const ProductInfo = ({
	title,
	subtitle,
	price,
	features,
	cta,
}: {
	title: string;
	subtitle: string;
	price: { original: string; sale: string };
	features: { icon: React.ElementType; text: string }[];
	cta: { label: string; href: string };
}) => (
	<div className="relative space-y-4 @md:space-y-6 pl-6">
		<AccentLineDecorative />
		<p className="text-sm text-muted-foreground uppercase tracking-wider">
			{subtitle}
		</p>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight">
			{title}
		</h2>
		<PriceDisplay original={price.original} sale={price.sale} />
		<FeatureList items={features} />
		<Button size="lg" className="gap-2 mt-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
						<ProductShowcase
							src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
							alt="Premium Watch"
							badge="50% OFF"
						/>
						<ProductInfo
							title="Chronograph Elite"
							subtitle="Limited Edition"
							price={{ original: '$599', sale: '$299' }}
							features={[
								{ icon: Star, text: '4.9 (2.5k reviews)' },
								{ icon: Truck, text: 'Free Express Shipping' },
							]}
							cta={{ label: 'Add to Cart', href: '/product/watch' }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
