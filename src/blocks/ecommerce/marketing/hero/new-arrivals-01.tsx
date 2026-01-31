import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Sparkles, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 border-0">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text}{' '}
		{highlight && (
			<span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
				{highlight}
			</span>
		)}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-xl">{text}</p>
);

const NewArrivalsInfo = ({ date, count }: { date: string; count: string }) => (
	<div className="flex items-center gap-6">
		<div className="flex items-center gap-2 text-sm">
			<Clock className="size-4 text-blue-500" />
			<span>Added {date}</span>
		</div>
		<div className="flex items-center gap-2 text-sm">
			<Sparkles className="size-4 text-blue-500" />
			<span>{count} new items</span>
		</div>
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
				className={`gap-2 ${variant === 'default' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600' : ''}`}
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

const NewProductsGrid = ({
	products,
}: {
	products: { image: string; name: string; price: string }[];
}) => (
	<div className="grid grid-cols-2 gap-4">
		{products.map((product, i) => (
			<div
				key={i}
				className={`group relative rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}
			>
				<Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-500 to-cyan-500">
					New In
				</Badge>
				<Image
					src={product.image}
					alt={product.name}
					fill
					className="object-cover group-hover:scale-105 transition-transform duration-500"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
				<div className="absolute bottom-4 inset-x-4 text-white">
					<p className="font-medium">{product.name}</p>
					<p className="text-cyan-300 font-bold">{product.price}</p>
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
						<Eyebrow icon={Sparkles} text="Just Dropped" />
						<Title text="Fresh Off" highlight="The Runway" />
						<Description text="Be the first to shop our latest arrivals. New styles added weekly, straight from the world's top designers to your wardrobe." />
						<NewArrivalsInfo date="Today" count="42" />
						<CTA
							items={[
								{ label: 'Shop New Arrivals', href: '/new', icon: Sparkles },
								{
									label: 'View All',
									href: '/shop',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<NewProductsGrid
						products={[
							{
								image:
									'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=400&fit=crop',
								name: 'Spring Collection',
								price: 'From $79',
							},
							{
								image:
									'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
								name: 'Limited Sneakers',
								price: '$189',
							},
							{
								image:
									'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
								name: 'Designer Bags',
								price: '$299',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
