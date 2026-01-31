import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Layers, ShoppingBag, CheckCircle2 } from 'lucide-react';
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
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-xl">{text}</p>
);

const CollectionItems = ({
	items,
}: {
	items: { image: string; count: string }[];
}) => (
	<div className="flex -space-x-4">
		{items.map((item, i) => (
			<div
				key={i}
				className="relative size-16 rounded-full overflow-hidden border-4 border-background"
			>
				<Image src={item.image} alt="" fill className="object-cover" />
			</div>
		))}
		<div className="size-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold border-4 border-background">
			+{items.length}
		</div>
	</div>
);

const Stats = ({ items }: { items: { value: string; label: string }[] }) => (
	<div className="flex gap-8">
		{items.map(({ value, label }, i) => (
			<div key={i}>
				<p className="text-2xl font-bold">{value}</p>
				<p className="text-sm text-muted-foreground">{label}</p>
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
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-5" />}
				</Link>
			</Button>
		))}
	</div>
);

const CollectionGrid = ({
	collections,
}: {
	collections: { image: string; name: string; items: string }[];
}) => (
	<div className="grid grid-cols-2 gap-4">
		{collections.map((c, i) => (
			<Link
				key={i}
				href={`/collection/${c.name.toLowerCase().replace(' ', '-')}`}
				className={`group relative rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}
			>
				<Image
					src={c.image}
					alt={c.name}
					fill
					className="object-cover group-hover:scale-105 transition-transform duration-500"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
				<div className="absolute bottom-4 inset-x-4">
					<h3 className="text-lg text-white font-bold">{c.name}</h3>
					<p className="text-sm text-white/70">{c.items}</p>
				</div>
			</Link>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<Eyebrow icon={Layers} text="Collections" />
						<Title text="Curated" highlight="Collections" />
						<Description text="Explore our thoughtfully curated collections. Each one tells a story and brings together pieces that complement each other perfectly." />
						<Stats
							items={[
								{ value: '12', label: 'Collections' },
								{ value: '500+', label: 'Products' },
								{ value: 'New', label: 'Weekly Drops' },
							]}
						/>
						<CTA
							items={[
								{
									label: 'Browse Collections',
									href: '/collections',
									icon: Layers,
								},
								{
									label: 'Shop All',
									href: '/shop',
									variant: 'outline',
									icon: ShoppingBag,
								},
							]}
						/>
					</div>
					<CollectionGrid
						collections={[
							{
								image:
									'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
								name: 'Summer Essentials',
								items: '42 items',
							},
							{
								image:
									'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop',
								name: 'Office Wear',
								items: '38 items',
							},
							{
								image:
									'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
								name: 'Weekend Casual',
								items: '56 items',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
