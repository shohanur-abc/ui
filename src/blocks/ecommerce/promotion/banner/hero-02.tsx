import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GlowDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
	</div>
);

const ProductImage = ({
	src,
	alt,
	badge,
}: {
	src: string;
	alt: string;
	badge: string;
}) => (
	<div className="relative aspect-square @lg:aspect-[4/5] rounded-3xl overflow-hidden bg-card">
		<Image src={src} alt={alt} fill className="object-cover" />
		<Badge className="absolute top-4 right-4 shadow-lg text-lg px-4 py-1">
			{badge}
		</Badge>
	</div>
);

const Rating = ({ value, count }: { value: string; count: string }) => (
	<div className="flex items-center gap-2">
		<div className="flex">
			{[...Array(5)].map((_, i) => (
				<Star key={i} className="size-4 fill-primary text-primary" />
			))}
		</div>
		<span className="text-sm">
			<span className="font-medium">{value}</span>
			<span className="text-muted-foreground"> ({count} reviews)</span>
		</span>
	</div>
);

const PriceBlock = ({
	original,
	sale,
	savings,
}: {
	original: string;
	sale: string;
	savings: string;
}) => (
	<div className="space-y-1">
		<div className="flex items-baseline gap-3">
			<span className="text-4xl @md:text-5xl font-black text-primary">
				{sale}
			</span>
			<span className="text-xl text-muted-foreground line-through">
				{original}
			</span>
		</div>
		<p className="text-sm text-green-500 font-medium">{savings}</p>
	</div>
);

const FeatureList = ({
	items,
}: {
	items: { icon: React.ElementType; text: string }[];
}) => (
	<div className="flex flex-wrap gap-4">
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

const ProductDetails = ({
	title,
	description,
	rating,
	price,
	features,
	cta,
}: {
	title: string;
	description: string;
	rating: { value: string; count: string };
	price: { original: string; sale: string; savings: string };
	features: { icon: React.ElementType; text: string }[];
	cta: { label: string; href: string }[];
}) => (
	<div className="space-y-6">
		<Rating value={rating.value} count={rating.count} />
		<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
			{title}
		</h1>
		<p className="text-muted-foreground text-base @md:text-lg">{description}</p>
		<PriceBlock
			original={price.original}
			sale={price.sale}
			savings={price.savings}
		/>
		<FeatureList items={features} />
		<div className="flex flex-wrap gap-3 pt-2">
			{cta.map(({ label, href }, i) => (
				<Button
					key={i}
					variant={i === 0 ? 'default' : 'outline'}
					size="lg"
					className="gap-2"
					asChild
				>
					<Link href={href}>
						{label}
						{i === 0 && <ArrowRight className="size-4" />}
					</Link>
				</Button>
			))}
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<GlowDecorative />
				<div className="relative max-w-7xl mx-auto">
					<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
						<ProductImage
							src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
							alt="Premium Headphones"
							badge="SAVE $150"
						/>
						<ProductDetails
							title="Pro Studio Headphones"
							description="Experience crystal-clear audio with our premium studio headphones. Featuring active noise cancellation, 40-hour battery life, and ultra-comfortable memory foam cushions."
							rating={{ value: '4.9', count: '2,847' }}
							price={{
								original: '$449',
								sale: '$299',
								savings: 'You save $150 (33% off)',
							}}
							features={[
								{ icon: Truck, text: 'Free Express Shipping' },
								{ icon: Shield, text: '2-Year Warranty' },
								{ icon: RotateCcw, text: '30-Day Returns' },
							]}
							cta={[
								{ label: 'Buy Now', href: '/product/headphones' },
								{ label: 'Learn More', href: '/product/headphones#details' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
