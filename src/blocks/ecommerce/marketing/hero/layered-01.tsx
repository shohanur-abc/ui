import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Layers, Minus, Plus, Eye } from 'lucide-react';
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

const LayeredLook = ({
	layers,
}: {
	layers: { image: string; name: string; price: string }[];
}) => (
	<div className="relative">
		<div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
			<Image
				src={layers[0].image}
				alt={layers[0].name}
				fill
				className="object-cover"
			/>
		</div>
		<div className="absolute -right-4 top-1/2 -translate-y-1/2 space-y-2">
			{layers.map((layer, i) => (
				<div key={i} className="group flex items-center gap-3 cursor-pointer">
					<div className="size-3 rounded-full bg-primary ring-2 ring-background shadow-lg" />
					<div className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg border bg-card p-3 shadow-lg min-w-40">
						<p className="font-medium text-sm">{layer.name}</p>
						<p className="text-primary font-bold">{layer.price}</p>
					</div>
				</div>
			))}
		</div>
	</div>
);

const LayerSelector = ({
	items,
}: {
	items: { image: string; name: string; price: string; active?: boolean }[];
}) => (
	<div className="space-y-3">
		<h3 className="font-semibold">Shop Each Layer:</h3>
		{items.map((item, i) => (
			<div
				key={i}
				className={`flex items-center gap-4 p-3 rounded-xl border ${item.active ? 'border-primary bg-primary/5' : 'bg-card'}`}
			>
				<div className="relative size-16 rounded-lg overflow-hidden shrink-0">
					<Image
						src={item.image}
						alt={item.name}
						fill
						className="object-cover"
					/>
				</div>
				<div className="flex-1 min-w-0">
					<p className="font-medium truncate">{item.name}</p>
					<p className="text-primary font-bold">{item.price}</p>
				</div>
				<Button size="sm" variant={item.active ? 'default' : 'outline'}>
					{item.active ? 'Added' : 'Add'}
				</Button>
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

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<LayeredLook
						layers={[
							{
								image:
									'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop',
								name: 'Outer Layer',
								price: '$299',
							},
							{
								image:
									'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop',
								name: 'Mid Layer',
								price: '$149',
							},
							{
								image:
									'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=300&fit=crop',
								name: 'Base Layer',
								price: '$59',
							},
						]}
					/>
					<div className="space-y-8">
						<Eyebrow icon={Layers} text="Layered Look" />
						<Title text="Master the Art of" highlight="Layering" />
						<Description text="Explore complete layered outfits and shop each piece individually. Click on any layer to see the product details and add to cart." />
						<LayerSelector
							items={[
								{
									image:
										'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop',
									name: 'Wool Overcoat',
									price: '$299',
									active: true,
								},
								{
									image:
										'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&h=100&fit=crop',
									name: 'Knit Blazer',
									price: '$149',
								},
								{
									image:
										'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=100&h=100&fit=crop',
									name: 'Cotton T-Shirt',
									price: '$59',
								},
							]}
						/>
						<CTA
							items={[
								{ label: 'Add All to Cart', href: '/cart', icon: ArrowRight },
								{
									label: 'View Full Look',
									href: '/lookbook',
									variant: 'outline',
									icon: Eye,
								},
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
