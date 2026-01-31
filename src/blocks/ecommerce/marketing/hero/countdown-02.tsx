import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, ShoppingBag, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Timer = ({ endTime }: { endTime: string }) => (
	<div className="flex items-center gap-2 text-sm">
		<Clock className="size-4 text-destructive" />
		<span className="text-destructive font-medium">Ends {endTime}</span>
	</div>
);

const HeroBanner = ({
	badge,
	title,
	subtitle,
	discount,
	image,
	cta,
	endTime,
}: {
	badge: { icon: React.ElementType; text: string };
	title: string;
	subtitle: string;
	discount: string;
	image: { src: string; alt: string };
	cta: { label: string; href: string };
	endTime: string;
}) => (
	<div className="relative rounded-3xl overflow-hidden min-h-[450px] @lg:min-h-[550px]">
		<Image src={image.src} alt={image.alt} fill className="object-cover" />
		<div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
		<div className="relative h-full p-8 @lg:p-12 @xl:p-16 flex flex-col justify-center max-w-xl">
			<Badge variant="destructive" className="w-fit gap-2 mb-4 animate-pulse">
				<badge.icon className="size-4" />
				{badge.text}
			</Badge>
			<div className="text-6xl @md:text-7xl @lg:text-8xl font-black text-primary mb-2">
				{discount}
			</div>
			<h1 className="text-3xl @md:text-4xl @lg:text-5xl font-bold mb-2">
				{title}
			</h1>
			<p className="text-lg text-muted-foreground mb-6">{subtitle}</p>
			<Timer endTime={endTime} />
			<Button size="lg" className="w-fit gap-2 mt-6" asChild>
				<Link href={cta.href}>
					<ShoppingBag className="size-5" />
					{cta.label}
				</Link>
			</Button>
		</div>
	</div>
);

const DealCard = ({
	image,
	title,
	originalPrice,
	salePrice,
	discount,
	href,
}: {
	image: { src: string; alt: string };
	title: string;
	originalPrice: string;
	salePrice: string;
	discount: string;
	href: string;
}) => (
	<Link
		href={href}
		className="group rounded-2xl border bg-card overflow-hidden"
	>
		<div className="relative aspect-square">
			<Badge variant="destructive" className="absolute top-3 left-3 z-10">
				{discount}
			</Badge>
			<Image
				src={image.src}
				alt={image.alt}
				fill
				className="object-cover group-hover:scale-105 transition-transform duration-500"
			/>
		</div>
		<div className="p-4">
			<h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
				{title}
			</h3>
			<div className="flex items-center gap-2">
				<span className="text-lg font-bold text-primary">{salePrice}</span>
				<span className="text-sm text-muted-foreground line-through">
					{originalPrice}
				</span>
			</div>
		</div>
	</Link>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-8">
				<HeroBanner
					badge={{ icon: Flame, text: 'Limited Time' }}
					title="Black Friday"
					subtitle="Biggest savings of the year on all categories"
					discount="70% OFF"
					image={{
						src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
						alt: 'Black Friday sale',
					}}
					cta={{ label: 'Shop All Deals', href: '/sale' }}
					endTime="in 23:45:12"
				/>
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					<DealCard
						image={{
							src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
							alt: 'Sneakers',
						}}
						title="Pro Runner Max"
						originalPrice="$199"
						salePrice="$99"
						discount="-50%"
						href="/product/pro-runner"
					/>
					<DealCard
						image={{
							src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
							alt: 'Watch',
						}}
						title="Smart Watch Pro"
						originalPrice="$399"
						salePrice="$199"
						discount="-50%"
						href="/product/smart-watch"
					/>
					<DealCard
						image={{
							src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
							alt: 'Bag',
						}}
						title="Leather Tote"
						originalPrice="$289"
						salePrice="$145"
						discount="-50%"
						href="/product/leather-tote"
					/>
					<DealCard
						image={{
							src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop',
							alt: 'Accessories',
						}}
						title="Premium Set"
						originalPrice="$149"
						salePrice="$75"
						discount="-50%"
						href="/product/premium-set"
					/>
				</div>
			</div>
		</section>
	);
}
