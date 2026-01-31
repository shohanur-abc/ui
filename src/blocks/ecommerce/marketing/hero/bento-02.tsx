import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Tag, Truck, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MainCard = ({
	eyebrow,
	title,
	description,
	cta,
	image,
}: {
	eyebrow: { icon: React.ElementType; text: string };
	title: string;
	description: string;
	cta: { label: string; href: string };
	image: { src: string; alt: string };
}) => (
	<div className="relative rounded-3xl border bg-card overflow-hidden group min-h-[400px] @lg:min-h-[500px]">
		<div className="absolute inset-0">
			<Image
				src={image.src}
				alt={image.alt}
				fill
				className="object-cover group-hover:scale-105 transition-transform duration-700"
			/>
			<div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
		</div>
		<div className="relative p-8 @lg:p-12 h-full flex flex-col justify-center max-w-md">
			<Badge variant="secondary" className="w-fit gap-2 mb-4">
				<eyebrow.icon className="size-4" />
				{eyebrow.text}
			</Badge>
			<h1 className="text-3xl @lg:text-4xl @xl:text-5xl font-bold tracking-tight mb-4">
				{title}
			</h1>
			<p className="text-muted-foreground mb-6">{description}</p>
			<Button size="lg" className="w-fit gap-2" asChild>
				<Link href={cta.href}>
					{cta.label}
					<ArrowUpRight className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);

const CategoryCard = ({
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
		className="group relative rounded-2xl border bg-card overflow-hidden block"
	>
		<div className="absolute inset-0">
			<Image
				src={image.src}
				alt={image.alt}
				fill
				className="object-cover opacity-70 group-hover:scale-110 transition-transform duration-500"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
		</div>
		<div className="relative p-6 pt-24 @md:pt-32">
			<h3 className="font-semibold text-lg">{title}</h3>
			<p className="text-sm text-muted-foreground">{count}</p>
		</div>
	</Link>
);

const FeatureCard = ({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ElementType;
	title: string;
	description: string;
}) => (
	<div className="rounded-2xl border bg-card p-6 space-y-3">
		<div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
			<Icon className="size-5 text-primary" />
		</div>
		<h3 className="font-semibold">{title}</h3>
		<p className="text-sm text-muted-foreground">{description}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid gap-4 @md:gap-6">
					<MainCard
						eyebrow={{ icon: Tag, text: 'Season Sale' }}
						title="Spring Collection Is Here"
						description="Refresh your wardrobe with our latest arrivals. Exclusive styles designed for the new season."
						cta={{ label: 'Shop Spring', href: '/spring' }}
						image={{
							src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=600&fit=crop',
							alt: 'Spring collection',
						}}
					/>

					<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6">
						<CategoryCard
							title="Women"
							count="240+ items"
							href="/women"
							image={{
								src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop',
								alt: "Women's fashion",
							}}
						/>
						<CategoryCard
							title="Men"
							count="180+ items"
							href="/men"
							image={{
								src: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=300&fit=crop',
								alt: "Men's fashion",
							}}
						/>
						<CategoryCard
							title="Accessories"
							count="95+ items"
							href="/accessories"
							image={{
								src: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=400&h=300&fit=crop',
								alt: 'Accessories',
							}}
						/>
						<CategoryCard
							title="Shoes"
							count="120+ items"
							href="/shoes"
							image={{
								src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
								alt: 'Shoes',
							}}
						/>
					</div>

					<div className="grid @sm:grid-cols-3 gap-4 @md:gap-6">
						<FeatureCard
							icon={Truck}
							title="Free Shipping"
							description="On orders over $50"
						/>
						<FeatureCard
							icon={ShieldCheck}
							title="Secure Payment"
							description="100% protected checkout"
						/>
						<FeatureCard
							icon={Clock}
							title="Easy Returns"
							description="30-day return policy"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
