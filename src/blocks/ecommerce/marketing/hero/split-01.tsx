import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="px-3 py-1">
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-4xl @sm:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground leading-relaxed">{text}</p>
);

const Rating = ({ value, count }: { value: number; count: string }) => (
	<div className="flex items-center gap-2">
		<div className="flex">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-4 ${i < value ? 'fill-primary text-primary' : 'text-muted'}`}
				/>
			))}
		</div>
		<span className="text-sm text-muted-foreground">{count} reviews</span>
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
	<div className="flex flex-wrap gap-3">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square @lg:aspect-[4/5] rounded-2xl overflow-hidden">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 @xl:gap-16 items-center">
					<div className="space-y-6 @md:space-y-8">
						<Eyebrow text="New Arrival" />
						<Title text="Premium Leather" highlight="Collection" />
						<Description text="Handcrafted with genuine Italian leather. Each piece tells a story of timeless elegance and uncompromising quality." />
						<Rating value={5} count="2,847" />
						<CTA
							items={[
								{ label: 'Shop Now', href: '/shop', icon: ShoppingBag },
								{
									label: 'Learn More',
									href: '/about',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<ProductImage
						src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop"
						alt="Premium leather bag"
					/>
				</div>
			</div>
		</section>
	);
}
