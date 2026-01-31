import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Box, Eye, RotateCcw } from 'lucide-react';
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

const Controls = ({
	items,
}: {
	items: { icon: React.ElementType; label: string }[];
}) => (
	<div className="flex flex-wrap gap-3">
		{items.map(({ icon: Icon, label }, i) => (
			<Button key={i} variant="outline" className="gap-2">
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

const ProductViewer = ({ image, alt }: { image: string; alt: string }) => (
	<div className="relative">
		<div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-foreground/10 bg-gradient-to-br from-muted to-background">
			<Image src={image} alt={alt} fill className="object-contain p-8" />
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div
					className="size-full border-2 border-dashed border-primary/20 rounded-full animate-spin-slow opacity-30"
					style={{ animation: 'spin 20s linear infinite' }}
				/>
			</div>
		</div>
		<div className="absolute bottom-4 inset-x-4 flex justify-center">
			<div className="inline-flex gap-2 rounded-full border bg-card/80 backdrop-blur p-2">
				<Button size="icon-sm" variant="ghost" className="rounded-full">
					<RotateCcw className="size-4" />
				</Button>
				<Button size="icon-sm" variant="ghost" className="rounded-full">
					<Eye className="size-4" />
				</Button>
				<Button size="icon-sm" variant="ghost" className="rounded-full">
					<Box className="size-4" />
				</Button>
			</div>
		</div>
	</div>
);

const ColorOptions = ({ colors }: { colors: string[] }) => (
	<div className="flex gap-2">
		{colors.map((color, i) => (
			<button
				key={i}
				className={`size-8 rounded-full border-2 ${i === 0 ? 'border-primary' : 'border-transparent'} hover:border-primary transition-colors`}
				style={{ backgroundColor: color }}
			/>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<ProductViewer
						image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop"
						alt="3D product view"
					/>
					<div className="space-y-6 @md:space-y-8">
						<Eyebrow icon={Box} text="360° View" />
						<Title text="Experience Every" highlight="Detail" />
						<Description text="Explore our products from every angle. Our interactive 3D viewer lets you examine the craftsmanship and quality before you buy." />
						<Controls
							items={[
								{ icon: RotateCcw, label: 'Rotate' },
								{ icon: Eye, label: 'Zoom' },
								{ icon: Box, label: '3D View' },
							]}
						/>
						<div className="space-y-3">
							<p className="text-sm font-medium">Available Colors</p>
							<ColorOptions
								colors={[
									'#ef4444',
									'#3b82f6',
									'#22c55e',
									'#f59e0b',
									'#000000',
									'#ffffff',
								]}
							/>
						</div>
						<CTA
							items={[
								{ label: 'Add to Cart', href: '/cart', icon: ArrowRight },
								{ label: 'View Details', href: '/product', variant: 'outline' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
