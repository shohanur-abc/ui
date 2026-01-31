import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Sparkles, Flame, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge className="gap-2 bg-gradient-to-r from-pink-500 to-red-500 border-0">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text}{' '}
		{highlight && (
			<span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
				{highlight}
			</span>
		)}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-xl">{text}</p>
);

const Stats = ({
	items,
}: {
	items: { icon: React.ElementType; value: string; label: string }[];
}) => (
	<div className="flex flex-wrap gap-6">
		{items.map(({ icon: Icon, value, label }, i) => (
			<div key={i} className="flex items-center gap-3">
				<div className="size-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
					<Icon className="size-5 text-pink-500" />
				</div>
				<div>
					<p className="font-bold">{value}</p>
					<p className="text-xs text-muted-foreground">{label}</p>
				</div>
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
	<div className="flex flex-wrap gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant}
				className={`gap-2 ${variant === 'default' ? 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600' : ''}`}
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

const TrendingProducts = ({
	products,
}: {
	products: { image: string; name: string; likes: string }[];
}) => (
	<div className="grid grid-cols-3 gap-3">
		{products.map((product, i) => (
			<div
				key={i}
				className={`relative rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-[4/5]'}`}
			>
				<Image
					src={product.image}
					alt={product.name}
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
				<div className="absolute bottom-3 inset-x-3 text-white">
					<p
						className={`font-medium ${i === 0 ? 'text-lg' : 'text-xs'} truncate`}
					>
						{product.name}
					</p>
					<div className="flex items-center gap-1 text-pink-400">
						<Heart
							className={`${i === 0 ? 'size-4' : 'size-3'} fill-current`}
						/>
						<span className={i === 0 ? 'text-sm' : 'text-xs'}>
							{product.likes}
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
						<Eyebrow icon={Flame} text="Trending Now" />
						<Title text="Most Loved" highlight="This Week" />
						<Description text="Discover what everyone's loving right now. Shop our trending products picked by thousands of customers just like you." />
						<Stats
							items={[
								{ icon: Heart, value: '50K+', label: 'Favorites' },
								{ icon: TrendingUp, value: '#1', label: 'Trending' },
								{ icon: Sparkles, value: '4.9★', label: 'Rating' },
							]}
						/>
						<CTA
							items={[
								{ label: 'Shop Trending', href: '/trending', icon: ArrowRight },
								{ label: 'See All', href: '/shop', variant: 'outline' },
							]}
						/>
					</div>
					<TrendingProducts
						products={[
							{
								image:
									'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=600&fit=crop',
								name: 'Summer Collection Dress',
								likes: '12.5K',
							},
							{
								image:
									'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=375&fit=crop',
								name: 'Urban Sneakers',
								likes: '8.2K',
							},
							{
								image:
									'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=375&fit=crop',
								name: 'Designer Bag',
								likes: '6.7K',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
