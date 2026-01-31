import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sun, Moon, Sparkles, Eye } from 'lucide-react';
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
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-lg">{text}</p>
);

const OccasionTabs = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; active?: boolean }[];
}) => (
	<div className="flex gap-2">
		{items.map(({ icon: Icon, label, active }, i) => (
			<Button
				key={i}
				variant={active ? 'default' : 'outline'}
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
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-5" />}
				</Link>
			</Button>
		))}
	</div>
);

const OccasionProducts = ({
	products,
}: {
	products: { image: string; name: string; occasion: string }[];
}) => (
	<div className="grid grid-cols-2 gap-4">
		{products.map((product, i) => (
			<div
				key={i}
				className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
			>
				<Image
					src={product.image}
					alt={product.name}
					fill
					className="object-cover group-hover:scale-105 transition-transform"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
				<div className="absolute top-4 left-4">
					<Badge variant="secondary">{product.occasion}</Badge>
				</div>
				<div className="absolute bottom-4 inset-x-4 text-white">
					<p className="font-medium">{product.name}</p>
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
						<Eyebrow icon={Sparkles} text="Shop by Occasion" />
						<Title text="Perfect Outfits for" highlight="Every Moment" />
						<Description text="From morning meetings to evening galas, find curated looks for every occasion. Let us help you dress for success." />
						<OccasionTabs
							items={[
								{ icon: Sun, label: 'Day', active: true },
								{ icon: Moon, label: 'Night' },
								{ icon: Sparkles, label: 'Special' },
							]}
						/>
						<CTA
							items={[
								{ label: 'Shop Daywear', href: '/occasion/day', icon: Sun },
								{
									label: 'View All',
									href: '/occasions',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<OccasionProducts
						products={[
							{
								image:
									'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=533&fit=crop',
								name: 'Office Elegance',
								occasion: 'Work',
							},
							{
								image:
									'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=533&fit=crop',
								name: 'Cocktail Ready',
								occasion: 'Evening',
							},
							{
								image:
									'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=533&fit=crop',
								name: 'Weekend Casual',
								occasion: 'Casual',
							},
							{
								image:
									'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=533&fit=crop',
								name: 'Red Carpet',
								occasion: 'Formal',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
