import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sun, Umbrella, Snowflake, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge className="gap-2 bg-gradient-to-r from-orange-500 to-amber-500 border-0">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text}{' '}
		{highlight && (
			<span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
				{highlight}
			</span>
		)}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-xl">{text}</p>
);

const SeasonalTabs = ({
	seasons,
}: {
	seasons: { icon: React.ElementType; label: string; active?: boolean }[];
}) => (
	<div className="flex gap-2">
		{seasons.map(({ icon: Icon, label, active }, i) => (
			<Button
				key={i}
				variant={active ? 'default' : 'outline'}
				size="sm"
				className="gap-2"
			>
				<Icon className="size-4" />
				{label}
			</Button>
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
				className={`gap-2 ${variant === 'default' ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600' : ''}`}
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

const SeasonalProducts = ({
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
				<Image
					src={product.image}
					alt={product.name}
					fill
					className="object-cover group-hover:scale-105 transition-transform"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
				<div className="absolute bottom-4 inset-x-4">
					<p className="text-white font-medium">{product.name}</p>
					<p className="text-amber-400 font-bold">{product.price}</p>
				</div>
			</div>
		))}
	</div>
);

const CollectionCards = ({
	items,
}: {
	items: { title: string; count: string }[];
}) => (
	<div className="flex gap-4">
		{items.map(({ title, count }, i) => (
			<div key={i} className="flex-1 p-4 rounded-xl border bg-card text-center">
				<p className="font-medium">{title}</p>
				<p className="text-sm text-muted-foreground">{count}</p>
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
						<Eyebrow icon={Leaf} text="Fall Collection" />
						<Title text="Embrace the" highlight="Season's Best" />
						<Description text="Discover our curated fall collection featuring cozy layers, rich colors, and transitional pieces perfect for the changing weather." />
						<SeasonalTabs
							seasons={[
								{ icon: Snowflake, label: 'Winter' },
								{ icon: Sun, label: 'Spring' },
								{ icon: Umbrella, label: 'Summer' },
								{ icon: Leaf, label: 'Fall', active: true },
							]}
						/>
						<CollectionCards
							items={[
								{ title: 'Outerwear', count: '45 items' },
								{ title: 'Knitwear', count: '32 items' },
								{ title: 'Boots', count: '28 items' },
							]}
						/>
						<CTA
							items={[
								{ label: 'Shop Fall', href: '/fall', icon: Leaf },
								{
									label: 'View Lookbook',
									href: '/lookbook/fall',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<SeasonalProducts
						products={[
							{
								image:
									'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=400&fit=crop',
								name: 'Wool Blend Coat',
								price: '$289',
							},
							{
								image:
									'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
								name: 'Leather Boots',
								price: '$179',
							},
							{
								image:
									'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop',
								name: 'Cashmere Sweater',
								price: '$199',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
