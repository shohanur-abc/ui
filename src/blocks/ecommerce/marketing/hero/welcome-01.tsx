import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-bold tracking-tight text-center">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-muted-foreground text-center max-w-3xl mx-auto">
		{text}
	</p>
);

const TrustIndicators = ({
	items,
}: {
	items: { icon: React.ElementType; text: string }[];
}) => (
	<div className="flex flex-wrap justify-center gap-6">
		{items.map(({ icon: Icon, text }, i) => (
			<div key={i} className="flex items-center gap-2">
				<Icon className="size-5 text-primary" />
				<span className="text-sm">{text}</span>
			</div>
		))}
	</div>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: React.ElementType;
		variant?: 'default' | 'outline';
	}[];
}) => (
	<div className="flex flex-wrap justify-center gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-5" />}
				</Link>
			</Button>
		))}
	</div>
);

const FeaturedImages = ({
	images,
}: {
	images: { src: string; alt: string }[];
}) => (
	<div className="flex justify-center items-center gap-4 @md:gap-6">
		{images.map((img, i) => (
			<div
				key={i}
				className={`relative rounded-2xl overflow-hidden shadow-2xl ${
					i === 1
						? 'size-48 @md:size-64 z-10'
						: 'size-32 @md:size-48 opacity-80'
				}`}
			>
				<Image src={img.src} alt={img.alt} fill className="object-cover" />
			</div>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-32 space-y-12">
				<div className="text-center space-y-6">
					<Badge variant="secondary" className="gap-2">
						<Sparkles className="size-4" />
						Welcome to StyleHub
					</Badge>
					<Title text="Discover Your" highlight="Signature Style" />
					<Description text="Premium fashion for the modern individual. Explore our curated collections featuring the latest trends and timeless classics, all designed to help you express your unique personality." />
				</div>
				<FeaturedImages
					images={[
						{
							src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
							alt: 'Featured 1',
						},
						{
							src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&h=500&fit=crop',
							alt: 'Featured 2',
						},
						{
							src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
							alt: 'Featured 3',
						},
					]}
				/>
				<CTA
					items={[
						{ label: 'Shop Now', href: '/shop', icon: ArrowRight },
						{
							label: 'Explore Collections',
							href: '/collections',
							variant: 'outline',
						},
					]}
				/>
				<TrustIndicators
					items={[
						{ icon: CheckCircle2, text: 'Free Shipping on $50+' },
						{ icon: Star, text: '50K+ 5-Star Reviews' },
						{ icon: CheckCircle2, text: '30-Day Easy Returns' },
					]}
				/>
			</div>
		</section>
	);
}
