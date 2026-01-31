import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Percent, Tag, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge variant="secondary" className="gap-2">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
		{text}
	</p>
);

const CategoryFilters = ({ categories }: { categories: string[] }) => (
	<div className="flex flex-wrap justify-center gap-2">
		{categories.map((cat, i) => (
			<Button
				key={i}
				variant={i === 0 ? 'default' : 'outline'}
				size="sm"
				className="rounded-full"
			>
				{cat}
			</Button>
		))}
	</div>
);

const ClearanceItems = ({
	items,
}: {
	items: {
		image: string;
		name: string;
		originalPrice: string;
		salePrice: string;
		discount: string;
	}[];
}) => (
	<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 @md:gap-6">
		{items.map((item, i) => (
			<div key={i} className="group rounded-2xl border bg-card overflow-hidden">
				<div className="relative aspect-square overflow-hidden">
					<Badge className="absolute top-3 left-3 z-10 bg-red-500">
						{item.discount}
					</Badge>
					<Image
						src={item.image}
						alt={item.name}
						fill
						className="object-cover group-hover:scale-105 transition-transform"
					/>
				</div>
				<div className="p-4 space-y-2">
					<p className="font-medium truncate">{item.name}</p>
					<div className="flex items-center gap-2">
						<span className="text-red-500 font-bold">{item.salePrice}</span>
						<span className="text-sm text-muted-foreground line-through">
							{item.originalPrice}
						</span>
					</div>
				</div>
			</div>
		))}
	</div>
);

const CTA = ({ label, href }: { label: string; href: string }) => (
	<div className="text-center">
		<Button size="lg" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-5" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
				<div className="text-center space-y-6">
					<Eyebrow icon={Tag} text="Clearance Event" />
					<Title text="Up to 70%" highlight="Off Everything" />
					<Description text="Our biggest clearance event of the year! Shop incredible deals on thousands of items. Limited stock available." />
				</div>
				<CategoryFilters
					categories={['All Items', 'Clothing', 'Shoes', 'Accessories', 'Home']}
				/>
				<ClearanceItems
					items={[
						{
							image:
								'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
							name: 'Running Shoes',
							originalPrice: '$180',
							salePrice: '$54',
							discount: '70% OFF',
						},
						{
							image:
								'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop',
							name: 'Summer Dress',
							originalPrice: '$120',
							salePrice: '$48',
							discount: '60% OFF',
						},
						{
							image:
								'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
							name: 'Leather Bag',
							originalPrice: '$250',
							salePrice: '$100',
							discount: '60% OFF',
						},
						{
							image:
								'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
							name: 'Smart Watch',
							originalPrice: '$400',
							salePrice: '$160',
							discount: '60% OFF',
						},
					]}
				/>
				<CTA label="Shop All Clearance" href="/clearance" />
			</div>
		</section>
	);
}
