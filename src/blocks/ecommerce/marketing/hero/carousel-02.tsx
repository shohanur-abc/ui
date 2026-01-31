import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProductSlide = ({
	image,
	badge,
	category,
	title,
	price,
	rating,
	cta,
}: {
	image: { src: string; alt: string };
	badge?: string;
	category: string;
	title: string;
	price: string;
	rating: number;
	cta: { label: string; href: string };
}) => (
	<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-16 items-center">
		<div className="relative aspect-square @lg:aspect-[4/5] rounded-3xl overflow-hidden">
			{badge && <Badge className="absolute top-6 left-6 z-10">{badge}</Badge>}
			<Image src={image.src} alt={image.alt} fill className="object-cover" />
		</div>
		<div className="space-y-6">
			<span className="text-sm text-primary font-medium uppercase tracking-wider">
				{category}
			</span>
			<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
				{title}
			</h2>
			<div className="flex items-center gap-3">
				<div className="flex">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star
							key={i}
							className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted'}`}
						/>
					))}
				</div>
				<span className="text-muted-foreground">({rating}.0)</span>
			</div>
			<p className="text-4xl font-bold text-primary">{price}</p>
			<Button size="lg" className="gap-2" asChild>
				<Link href={cta.href}>
					{cta.label}
					<ArrowRight className="size-5" />
				</Link>
			</Button>
		</div>
	</div>
);

const CarouselNav = ({
	current,
	total,
}: {
	current: number;
	total: number;
}) => (
	<div className="flex items-center justify-between mt-8">
		<div className="flex gap-2">
			{Array.from({ length: total }).map((_, i) => (
				<button
					key={i}
					className={`size-3 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/50'}`}
				/>
			))}
		</div>
		<div className="flex gap-2">
			<Button size="icon" variant="outline">
				<ChevronLeft className="size-5" />
			</Button>
			<Button size="icon" variant="outline">
				<ChevronRight className="size-5" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<ProductSlide
					image={{
						src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop',
						alt: 'Featured sneaker',
					}}
					badge="Featured"
					category="Footwear"
					title="Air Max Pro Runner"
					price="$199"
					rating={5}
					cta={{ label: 'Shop Now', href: '/product/air-max-pro' }}
				/>
				<CarouselNav current={0} total={5} />
			</div>
		</section>
	);
}
