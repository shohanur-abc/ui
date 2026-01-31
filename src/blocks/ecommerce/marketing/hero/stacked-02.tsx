import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SectionHeader = ({
	eyebrow,
	title,
	description,
}: {
	eyebrow: string;
	title: string;
	description: string;
}) => (
	<div className="text-center max-w-3xl mx-auto space-y-4">
		<Badge variant="outline" className="px-4">
			{eyebrow}
		</Badge>
		<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
			{title}
		</h1>
		<p className="text-lg text-muted-foreground">{description}</p>
	</div>
);

const ProductRow = ({
	products,
}: {
	products: {
		image: { src: string; alt: string };
		badge?: string;
		title: string;
		price: string;
		rating: number;
	}[];
}) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6">
		{products.map(({ image, badge, title, price, rating }, i) => (
			<div key={i} className="group rounded-2xl border bg-card overflow-hidden">
				<div className="relative aspect-square">
					{badge && (
						<Badge className="absolute top-3 left-3 z-10">{badge}</Badge>
					)}
					<Image
						src={image.src}
						alt={image.alt}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-500"
					/>
				</div>
				<div className="p-4 space-y-2">
					<div className="flex">
						{Array.from({ length: 5 }).map((_, j) => (
							<Star
								key={j}
								className={`size-3.5 ${j < rating ? 'fill-primary text-primary' : 'text-muted'}`}
							/>
						))}
					</div>
					<h3 className="font-medium">{title}</h3>
					<p className="font-bold text-primary">{price}</p>
				</div>
			</div>
		))}
	</div>
);

const Features = ({
	items,
}: {
	items: { icon: React.ElementType; title: string; description: string }[];
}) => (
	<div className="grid @sm:grid-cols-3 gap-6 @md:gap-8">
		{items.map(({ icon: Icon, title, description }, i) => (
			<div key={i} className="text-center space-y-3">
				<div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
					<Icon className="size-7 text-primary" />
				</div>
				<h3 className="font-semibold">{title}</h3>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		))}
	</div>
);

const CTA = ({ label, href }: { label: string; href: string }) => (
	<div className="text-center">
		<Button size="lg" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12 @md:space-y-16">
				<SectionHeader
					eyebrow="Featured Products"
					title="This Week's Best Sellers"
					description="Shop the most loved items by our customers. Limited stock available."
				/>
				<ProductRow
					products={[
						{
							image: {
								src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
								alt: 'Sneakers',
							},
							badge: 'Best Seller',
							title: 'Urban Runner',
							price: '$159',
							rating: 5,
						},
						{
							image: {
								src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
								alt: 'Watch',
							},
							title: 'Classic Watch',
							price: '$249',
							rating: 4,
						},
						{
							image: {
								src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
								alt: 'Bag',
							},
							badge: 'New',
							title: 'Leather Bag',
							price: '$189',
							rating: 5,
						},
						{
							image: {
								src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop',
								alt: 'Accessories',
							},
							title: 'Premium Set',
							price: '$99',
							rating: 4,
						},
					]}
				/>
				<Features
					items={[
						{
							icon: Truck,
							title: 'Free Shipping',
							description: 'On orders over $100',
						},
						{
							icon: Shield,
							title: 'Secure Payment',
							description: '100% secure checkout',
						},
						{
							icon: Clock,
							title: 'Fast Delivery',
							description: '2-3 business days',
						},
					]}
				/>
				<CTA label="View All Products" href="/products" />
			</div>
		</section>
	);
}
