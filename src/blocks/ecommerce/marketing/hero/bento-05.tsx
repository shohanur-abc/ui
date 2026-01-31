import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Crown, Star, Award, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LuxuryCard = ({
	badge,
	title,
	subtitle,
	image,
	cta,
	className = '',
}: {
	badge?: { icon: React.ElementType; text: string };
	title: string;
	subtitle?: string;
	image: { src: string; alt: string };
	cta?: { label: string; href: string };
	className?: string;
}) => (
	<div
		className={`relative rounded-2xl border border-primary/20 bg-card overflow-hidden group ${className}`}
	>
		<div className="absolute inset-0">
			<Image
				src={image.src}
				alt={image.alt}
				fill
				className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-card/20" />
		</div>
		<div className="relative h-full p-6 @md:p-8 flex flex-col justify-end">
			{badge && (
				<Badge
					variant="outline"
					className="w-fit gap-1.5 mb-3 border-primary/50 text-primary"
				>
					<badge.icon className="size-3" />
					{badge.text}
				</Badge>
			)}
			<h3 className="text-xl @md:text-2xl font-bold mb-1">{title}</h3>
			{subtitle && (
				<p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
			)}
			{cta && (
				<Button
					variant="outline"
					size="sm"
					className="w-fit gap-2 border-primary/50 hover:bg-primary hover:text-primary-foreground"
					asChild
				>
					<Link href={cta.href}>
						{cta.label}
						<ArrowRight className="size-3.5" />
					</Link>
				</Button>
			)}
		</div>
	</div>
);

const StatsCard = ({
	items,
}: {
	items: { value: string; label: string }[];
}) => (
	<div className="rounded-2xl border bg-card p-6 @md:p-8 grid grid-cols-2 gap-6">
		{items.map(({ value, label }, i) => (
			<div key={i} className="text-center">
				<div className="text-2xl @md:text-3xl font-bold text-primary mb-1">
					{value}
				</div>
				<div className="text-xs @md:text-sm text-muted-foreground uppercase tracking-wide">
					{label}
				</div>
			</div>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6 auto-rows-[200px]">
					<LuxuryCard
						badge={{ icon: Crown, text: 'Exclusive' }}
						title="Luxury Watches"
						subtitle="Timeless elegance"
						image={{
							src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
							alt: 'Luxury watches',
						}}
						cta={{ label: 'Explore', href: '/watches' }}
						className="@md:col-span-2 @md:row-span-2"
					/>
					<LuxuryCard
						badge={{ icon: Diamond, text: 'Premium' }}
						title="Fine Jewelry"
						image={{
							src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
							alt: 'Jewelry',
						}}
						cta={{ label: 'Shop', href: '/jewelry' }}
						className="@xl:col-span-2"
					/>
					<LuxuryCard
						title="Designer Bags"
						image={{
							src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
							alt: 'Designer bags',
						}}
						cta={{ label: 'View', href: '/bags' }}
					/>
					<LuxuryCard
						badge={{ icon: Star, text: 'Bestseller' }}
						title="Fragrances"
						image={{
							src: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop',
							alt: 'Fragrances',
						}}
						cta={{ label: 'Shop', href: '/fragrances' }}
					/>
					<StatsCard
						items={[
							{ value: '50K+', label: 'Customers' },
							{ value: '99%', label: 'Satisfaction' },
							{ value: '24/7', label: 'Support' },
							{ value: '100+', label: 'Brands' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}
