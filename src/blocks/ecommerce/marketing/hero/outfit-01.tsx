import Link from 'next/link';
import Image from 'next/image';
import {
	ArrowRight,
	Sparkles,
	Palette,
	Shirt,
	Glasses,
	Watch,
} from 'lucide-react';
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

const CategoryTabs = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; active?: boolean }[];
}) => (
	<div className="flex flex-wrap gap-2">
		{items.map(({ icon: Icon, label, active }, i) => (
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

const OutfitBuilder = ({
	items,
}: {
	items: { image: string; category: string; name: string; price: string }[];
}) => (
	<div className="relative">
		<div className="grid grid-cols-3 gap-4">
			{items.map((item, i) => (
				<div
					key={i}
					className="group rounded-2xl border bg-card overflow-hidden"
				>
					<div className="relative aspect-square overflow-hidden">
						<Image
							src={item.image}
							alt={item.name}
							fill
							className="object-cover group-hover:scale-105 transition-transform"
						/>
					</div>
					<div className="p-3">
						<Badge variant="outline" className="text-xs mb-2">
							{item.category}
						</Badge>
						<p className="font-medium text-sm truncate">{item.name}</p>
						<p className="text-primary font-bold">{item.price}</p>
					</div>
				</div>
			))}
		</div>
		<div className="mt-4 p-4 rounded-xl border bg-card flex items-center justify-between">
			<div>
				<p className="text-sm text-muted-foreground">Complete Outfit</p>
				<p className="text-2xl font-bold">$387</p>
			</div>
			<Button className="gap-2">
				Add All to Cart
				<ArrowRight className="size-4" />
			</Button>
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
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-5" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<Eyebrow icon={Sparkles} text="Style Builder" />
						<Title text="Build Your" highlight="Perfect Outfit" />
						<Description text="Mix and match pieces to create your signature look. Our outfit builder makes it easy to coordinate styles and shop complete looks." />
						<CategoryTabs
							items={[
								{ icon: Shirt, label: 'Tops', active: true },
								{ icon: Shirt, label: 'Bottoms' },
								{ icon: Glasses, label: 'Accessories' },
								{ icon: Watch, label: 'Watches' },
							]}
						/>
						<CTA
							items={[
								{
									label: 'Start Building',
									href: '/outfit-builder',
									icon: Palette,
								},
								{
									label: 'View Lookbook',
									href: '/lookbook',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<OutfitBuilder
						items={[
							{
								image:
									'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop',
								category: 'Top',
								name: 'Classic Blazer',
								price: '$189',
							},
							{
								image:
									'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop',
								category: 'Bottom',
								name: 'Tailored Pants',
								price: '$129',
							},
							{
								image:
									'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
								category: 'Shoes',
								name: 'Oxford Shoes',
								price: '$69',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
