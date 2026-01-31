import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroContent = ({
	badge,
	title,
	description,
	cta,
}: {
	badge: {
		icon: React.ElementType;
		text: string;
		variant?: 'default' | 'destructive';
	};
	title: { main: string; highlight: string };
	description: string;
	cta: {
		primary: { label: string; href: string };
		secondary: { label: string; href: string };
	};
}) => (
	<div className="space-y-6 @lg:space-y-8">
		<Badge variant={badge.variant} className="gap-2 px-4 py-1.5">
			<badge.icon className="size-4" />
			{badge.text}
		</Badge>
		<h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-bold tracking-tight leading-[1.1]">
			{title.main} <span className="text-primary">{title.highlight}</span>
		</h1>
		<p className="text-lg @lg:text-xl text-muted-foreground max-w-xl">
			{description}
		</p>
		<div className="flex flex-wrap gap-4">
			<Button size="lg" className="gap-2" asChild>
				<Link href={cta.primary.href}>
					<ShoppingBag className="size-5" />
					{cta.primary.label}
				</Link>
			</Button>
			<Button size="lg" variant="outline" className="gap-2" asChild>
				<Link href={cta.secondary.href}>
					{cta.secondary.label}
					<ArrowRight className="size-5" />
				</Link>
			</Button>
		</div>
	</div>
);

const ProductStack = ({
	images,
}: {
	images: { src: string; alt: string; badge?: string }[];
}) => (
	<div className="relative h-[400px] @lg:h-[500px] @xl:h-[600px]">
		{images.map(({ src, alt, badge }, i) => (
			<div
				key={i}
				className="absolute rounded-2xl overflow-hidden border-4 border-background shadow-2xl transition-transform hover:scale-105 hover:z-10"
				style={{
					width: i === 0 ? '70%' : '55%',
					height: i === 0 ? '80%' : '65%',
					top: i === 0 ? '0' : i === 1 ? '20%' : '35%',
					left: i === 0 ? '0' : i === 1 ? '30%' : '45%',
					zIndex: images.length - i,
				}}
			>
				{badge && <Badge className="absolute top-4 left-4 z-10">{badge}</Badge>}
				<Image src={src} alt={alt} fill className="object-cover" />
			</div>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-24 @xl:py-32">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<HeroContent
						badge={{
							icon: Zap,
							text: 'Limited Time Offer',
							variant: 'destructive',
						}}
						title={{ main: 'Upgrade Your', highlight: 'Style Game' }}
						description="Discover premium fashion pieces that make a statement. Quality craftsmanship meets contemporary design."
						cta={{
							primary: { label: 'Shop Collection', href: '/collection' },
							secondary: { label: 'View Lookbook', href: '/lookbook' },
						}}
					/>
					<ProductStack
						images={[
							{
								src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=700&fit=crop',
								alt: 'Featured jacket',
								badge: 'New',
							},
							{
								src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop',
								alt: 'Accessories',
							},
							{
								src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=350&h=400&fit=crop',
								alt: 'Sneakers',
								badge: '-40%',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
