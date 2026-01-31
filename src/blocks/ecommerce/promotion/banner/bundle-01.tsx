import Link from 'next/link';
import Image from 'next/image';
import {
	ArrowRight,
	Package,
	Sparkles,
	Clock,
	ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const BundleItem = ({
	image,
	title,
	originalPrice,
	bundlePrice,
}: {
	image: string;
	title: string;
	originalPrice: string;
	bundlePrice: string;
}) => (
	<div className="bg-card rounded-xl p-4 border border-border/50">
		<div className="aspect-square relative rounded-lg overflow-hidden mb-3">
			<Image src={image} alt={title} fill className="object-cover" />
		</div>
		<h3 className="font-semibold text-sm mb-1 line-clamp-1">{title}</h3>
		<div className="flex items-center gap-2">
			<span className="text-muted-foreground text-sm line-through">
				{originalPrice}
			</span>
			<span className="text-primary font-bold">{bundlePrice}</span>
		</div>
	</div>
);

const BundleTotal = ({
	totalValue,
	bundlePrice,
	savings,
}: {
	totalValue: string;
	bundlePrice: string;
	savings: string;
}) => (
	<div className="bg-primary/10 rounded-2xl p-6 text-center">
		<p className="text-sm text-muted-foreground mb-1">
			Total Value: <span className="line-through">{totalValue}</span>
		</p>
		<p className="text-4xl @md:text-5xl font-black text-primary mb-1">
			{bundlePrice}
		</p>
		<Badge className="bg-green-500/10 text-green-500 border-green-500/30">
			Save {savings}
		</Badge>
	</div>
);

const BundleContent = ({
	badge,
	headline,
	items,
	total,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	items: {
		image: string;
		title: string;
		originalPrice: string;
		bundlePrice: string;
	}[];
	total: { totalValue: string; bundlePrice: string; savings: string };
	cta: { label: string; href: string };
}) => (
	<div className="space-y-6">
		<div className="text-center">
			<Badge
				variant="outline"
				className="border-primary/50 text-primary gap-1.5 mb-4"
			>
				<badge.icon className="size-3" />
				{badge.text}
			</Badge>
			<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">
				{headline.text}
				<span className="text-primary"> {headline.highlight}</span>
			</h2>
		</div>
		<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
			{items.map((item, i) => (
				<BundleItem key={i} {...item} />
			))}
		</div>
		<BundleTotal {...total} />
		<div className="flex justify-center">
			<Button size="lg" className="gap-2" asChild>
				<Link href={cta.href}>
					<ShoppingBag className="size-4" />
					{cta.label}
				</Link>
			</Button>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-5xl mx-auto">
					<BundleContent
						badge={{ icon: Package, text: 'Bundle & Save' }}
						headline={{ text: 'Complete', highlight: 'Starter Kit' }}
						items={[
							{
								image:
									'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
								title: 'Smart Watch Pro',
								originalPrice: '$299',
								bundlePrice: '$249',
							},
							{
								image:
									'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400',
								title: 'Wireless Earbuds',
								originalPrice: '$149',
								bundlePrice: '$99',
							},
							{
								image:
									'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
								title: 'Charging Dock',
								originalPrice: '$79',
								bundlePrice: '$49',
							},
							{
								image:
									'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400',
								title: 'Premium Case',
								originalPrice: '$49',
								bundlePrice: '$29',
							},
						]}
						total={{ totalValue: '$576', bundlePrice: '$426', savings: '$150' }}
						cta={{ label: 'Get the Bundle', href: '/bundle/starter-kit' }}
					/>
				</div>
			</div>
		</section>
	);
}
