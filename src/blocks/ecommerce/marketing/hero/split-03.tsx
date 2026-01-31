import Link from 'next/link';
import Image from 'next/image';
import { Play, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProductBadge = ({
	text,
	variant,
}: {
	text: string;
	variant?: 'default' | 'secondary' | 'destructive';
}) => (
	<Badge variant={variant} className="absolute top-4 left-4 z-10">
		{text}
	</Badge>
);

const ProductImage = ({
	src,
	alt,
	badge,
}: {
	src: string;
	alt: string;
	badge?: { text: string; variant?: 'default' | 'secondary' | 'destructive' };
}) => (
	<div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
		{badge && <ProductBadge text={badge.text} variant={badge.variant} />}
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover group-hover:scale-105 transition-transform duration-700"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
	</div>
);

const Category = ({ text }: { text: string }) => (
	<span className="text-sm text-primary font-medium uppercase tracking-wider">
		{text}
	</span>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
		{text}
	</h1>
);

const Price = ({
	current,
	original,
}: {
	current: string;
	original?: string;
}) => (
	<div className="flex items-baseline gap-3">
		<span className="text-3xl @md:text-4xl font-bold text-primary">
			{current}
		</span>
		{original && (
			<span className="text-xl text-muted-foreground line-through">
				{original}
			</span>
		)}
	</div>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-muted-foreground leading-relaxed">{text}</p>
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
			<Button
				key={i}
				size="lg"
				variant={variant}
				className="gap-2 flex-1 @sm:flex-none"
				asChild
			>
				<Link href={href}>
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			</Button>
		))}
	</div>
);

const WishlistButton = ({ label }: { label: string }) => (
	<Button variant="ghost" size="lg" className="gap-2">
		<Heart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<ProductImage
						src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop"
						alt="Premium sneakers"
						badge={{ text: 'Best Seller', variant: 'default' }}
					/>
					<div className="space-y-6">
						<Category text="Footwear" />
						<Title text="Ultra Comfort Pro Runner" />
						<Price current="$189" original="$249" />
						<Description text="Experience the next generation of comfort technology. Engineered mesh upper with responsive cushioning delivers all-day support for any activity." />
						<CTA
							items={[
								{ label: 'Add to Cart', href: '/cart', icon: ShoppingCart },
								{
									label: 'Watch Review',
									href: '#video',
									variant: 'outline',
									icon: Play,
								},
							]}
						/>
						<WishlistButton label="Add to Wishlist" />
					</div>
				</div>
			</div>
		</section>
	);
}
