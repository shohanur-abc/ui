import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Palette, Sparkles, Eye } from 'lucide-react';
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

const ColorSwatches = ({
	colors,
}: {
	colors: { name: string; value: string; selected?: boolean }[];
}) => (
	<div className="space-y-3">
		<p className="font-medium text-sm">Select Color:</p>
		<div className="flex gap-2">
			{colors.map(({ name, value, selected }, i) => (
				<button
					key={i}
					className={`size-10 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all hover:scale-110 ${selected ? 'ring-primary' : 'ring-transparent'}`}
					style={{ backgroundColor: value }}
					title={name}
				/>
			))}
		</div>
	</div>
);

const ProductPreview = ({
	images,
	selectedColor,
}: {
	images: { color: string; image: string }[];
	selectedColor: string;
}) => (
	<div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-muted to-background">
		{images.map((img, i) => (
			<Image
				key={i}
				src={img.image}
				alt={img.color}
				fill
				className={`object-cover transition-opacity ${img.color === selectedColor ? 'opacity-100' : 'opacity-0'}`}
			/>
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

const ProductInfo = ({
	name,
	price,
	sku,
}: {
	name: string;
	price: string;
	sku: string;
}) => (
	<div className="space-y-2">
		<p className="text-3xl font-bold">{name}</p>
		<p className="text-2xl text-primary font-bold">{price}</p>
		<p className="text-sm text-muted-foreground">SKU: {sku}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<ProductPreview
						selectedColor="red"
						images={[
							{
								color: 'red',
								image:
									'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
							},
							{
								color: 'blue',
								image:
									'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop',
							},
							{
								color: 'black',
								image:
									'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop',
							},
						]}
					/>
					<div className="space-y-8">
						<Eyebrow icon={Palette} text="Color Options" />
						<Title text="Available in" highlight="Every Color" />
						<Description text="Choose from our wide range of colors. Click on a swatch to see the product in real-time. Find the perfect shade for your style." />
						<ProductInfo
							name="Urban Runner Pro"
							price="$189"
							sku="URB-PRO-2024"
						/>
						<ColorSwatches
							colors={[
								{ name: 'Red', value: '#ef4444', selected: true },
								{ name: 'Blue', value: '#3b82f6' },
								{ name: 'Black', value: '#171717' },
								{ name: 'White', value: '#ffffff' },
								{ name: 'Green', value: '#22c55e' },
								{ name: 'Orange', value: '#f97316' },
							]}
						/>
						<CTA
							items={[
								{ label: 'Add to Cart', href: '/cart', icon: ArrowRight },
								{
									label: 'View Details',
									href: '/product',
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
