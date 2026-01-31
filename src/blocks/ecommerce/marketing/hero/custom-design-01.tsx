import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Paintbrush, Shirt, Palette, Sparkles } from 'lucide-react';
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

const DesignSteps = ({
	steps,
}: {
	steps: { icon: React.ElementType; title: string; description: string }[];
}) => (
	<div className="space-y-4">
		{steps.map(({ icon: Icon, title, description }, i) => (
			<div key={i} className="flex gap-4">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
					<Icon className="size-5 text-primary" />
				</div>
				<div>
					<h3 className="font-semibold">{title}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
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
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-5" />}
				</Link>
			</Button>
		))}
	</div>
);

const DesignPreview = ({
	images,
}: {
	images: { src: string; design: string }[];
}) => (
	<div className="relative">
		<div className="grid grid-cols-2 gap-4">
			{images.map((img, i) => (
				<div
					key={i}
					className="relative aspect-square rounded-2xl overflow-hidden border bg-card"
				>
					<Image src={img.src} alt={img.design} fill className="object-cover" />
					<Badge className="absolute bottom-3 left-3" variant="secondary">
						{img.design}
					</Badge>
				</div>
			))}
		</div>
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
			<Paintbrush className="size-7 text-primary-foreground" />
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<Eyebrow icon={Paintbrush} text="Design Your Own" />
						<Title text="Create Custom" highlight="T-Shirts" />
						<Description text="Unleash your creativity with our custom design tool. Upload your artwork, add text, and create one-of-a-kind pieces that express who you are." />
						<DesignSteps
							steps={[
								{
									icon: Shirt,
									title: 'Choose Your Base',
									description: 'Select from various styles and colors',
								},
								{
									icon: Palette,
									title: 'Add Your Design',
									description: 'Upload artwork or use our templates',
								},
								{
									icon: Sparkles,
									title: 'Make It Yours',
									description: 'Customize placement, size, and effects',
								},
							]}
						/>
						<CTA
							items={[
								{ label: 'Start Designing', href: '/design', icon: Paintbrush },
								{
									label: 'View Gallery',
									href: '/designs',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<DesignPreview
						images={[
							{
								src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
								design: 'Minimalist',
							},
							{
								src: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
								design: 'Graphic',
							},
							{
								src: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
								design: 'Typography',
							},
							{
								src: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
								design: 'Artistic',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
