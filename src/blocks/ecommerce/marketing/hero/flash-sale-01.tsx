import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Percent, Timer, Zap, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text} {highlight && <span className="text-destructive">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-md">{text}</p>
);

const Countdown = ({
	items,
}: {
	items: { value: string; label: string }[];
}) => (
	<div className="flex gap-3">
		{items.map(({ value, label }, i) => (
			<div key={i} className="text-center">
				<div className="size-14 rounded-xl bg-destructive text-destructive-foreground flex items-center justify-center font-bold text-2xl">
					{value}
				</div>
				<p className="text-xs text-muted-foreground mt-1">{label}</p>
			</div>
		))}
	</div>
);

const DiscountBadge = ({ discount }: { discount: string }) => (
	<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive text-destructive-foreground font-bold text-lg animate-pulse">
		<Zap className="size-5" />
		{discount}
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
	<div className="flex flex-wrap gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant}
				className={`gap-2 ${variant === 'default' ? 'bg-destructive hover:bg-destructive/90' : ''}`}
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-5" />}
				</Link>
			</Button>
		))}
	</div>
);

const FlashProducts = ({
	products,
}: {
	products: {
		image: string;
		name: string;
		originalPrice: string;
		salePrice: string;
		discount: string;
	}[];
}) => (
	<div className="grid grid-cols-2 gap-4">
		{products.map((product, i) => (
			<div key={i} className="group rounded-2xl border bg-card overflow-hidden">
				<div className="relative aspect-square overflow-hidden">
					<Badge className="absolute top-3 left-3 z-10 bg-destructive">
						{product.discount}
					</Badge>
					<Image
						src={product.image}
						alt={product.name}
						fill
						className="object-cover group-hover:scale-105 transition-transform"
					/>
				</div>
				<div className="p-3 space-y-1">
					<p className="font-medium text-sm truncate">{product.name}</p>
					<div className="flex items-center gap-2">
						<span className="text-destructive font-bold">
							{product.salePrice}
						</span>
						<span className="text-xs text-muted-foreground line-through">
							{product.originalPrice}
						</span>
					</div>
				</div>
			</div>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<DiscountBadge discount="UP TO 80% OFF" />
						<Title text="Flash Sale" highlight="Ends Tonight!" />
						<Description text="Don't miss our biggest flash sale of the season. Limited quantities available at unbeatable prices." />
						<Countdown
							items={[
								{ value: '02', label: 'Hours' },
								{ value: '45', label: 'Mins' },
								{ value: '30', label: 'Secs' },
							]}
						/>
						<CTA
							items={[
								{ label: 'Shop Flash Sale', href: '/flash-sale', icon: Zap },
								{
									label: 'View All Deals',
									href: '/deals',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<FlashProducts
						products={[
							{
								image:
									'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
								name: 'Sport Sneakers',
								originalPrice: '$199',
								salePrice: '$59',
								discount: '70% OFF',
							},
							{
								image:
									'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
								name: 'Leather Bag',
								originalPrice: '$350',
								salePrice: '$99',
								discount: '72% OFF',
							},
							{
								image:
									'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
								name: 'Smart Watch',
								originalPrice: '$499',
								salePrice: '$149',
								discount: '70% OFF',
							},
							{
								image:
									'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop',
								name: 'Summer Dress',
								originalPrice: '$180',
								salePrice: '$45',
								discount: '75% OFF',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
