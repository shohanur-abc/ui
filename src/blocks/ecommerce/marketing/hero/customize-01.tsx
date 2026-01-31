import Link from 'next/link';
import Image from 'next/image';
import {
	ArrowRight,
	ShoppingBag,
	Sparkles,
	Palette,
	Scissors,
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
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-xl">{text}</p>
);

const CustomizationOptions = ({
	items,
}: {
	items: { icon: React.ElementType; title: string; description: string }[];
}) => (
	<div className="grid @sm:grid-cols-3 gap-4">
		{items.map(({ icon: Icon, title, description }, i) => (
			<div key={i} className="rounded-xl border bg-card p-4 text-center">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
					<Icon className="size-5 text-primary" />
				</div>
				<h3 className="font-medium mb-1">{title}</h3>
				<p className="text-xs text-muted-foreground">{description}</p>
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

const ProductPreview = ({
	images,
}: {
	images: { src: string; label: string }[];
}) => (
	<div className="relative">
		<div className="grid grid-cols-2 gap-4">
			{images.map((image, i) => (
				<div
					key={i}
					className="relative aspect-square rounded-2xl overflow-hidden group"
				>
					<Image
						src={image.src}
						alt={image.label}
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
					<span className="absolute bottom-3 left-3 text-sm text-white font-medium">
						{image.label}
					</span>
				</div>
			))}
		</div>
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full bg-primary flex items-center justify-center shadow-xl z-10">
			<Sparkles className="size-8 text-primary-foreground" />
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<Eyebrow icon={Scissors} text="Made to Order" />
						<Title text="Design Your Own" highlight="Masterpiece" />
						<Description text="Express your unique style with our customization studio. Choose colors, materials, and details to create something truly yours." />
						<CustomizationOptions
							items={[
								{
									icon: Palette,
									title: 'Colors',
									description: '50+ color options',
								},
								{
									icon: Sparkles,
									title: 'Materials',
									description: 'Premium fabrics',
								},
								{
									icon: Scissors,
									title: 'Sizing',
									description: 'Made to fit you',
								},
							]}
						/>
						<CTA
							items={[
								{
									label: 'Start Customizing',
									href: '/customize',
									icon: Sparkles,
								},
								{
									label: 'View Examples',
									href: '/gallery',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<ProductPreview
						images={[
							{
								src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
								label: 'Original',
							},
							{
								src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
								label: 'Custom Blue',
							},
							{
								src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
								label: 'Custom Black',
							},
							{
								src: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&h=400&fit=crop',
								label: 'Custom Red',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
