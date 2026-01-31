import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Zap, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CountdownTimer = ({
	items,
}: {
	items: { value: string; label: string }[];
}) => (
	<div className="flex gap-3 @md:gap-4">
		{items.map(({ value, label }, i) => (
			<div key={i} className="text-center">
				<div className="size-14 @md:size-20 rounded-xl bg-card border flex items-center justify-center mb-2">
					<span className="text-2xl @md:text-4xl font-bold text-primary tabular-nums">
						{value}
					</span>
				</div>
				<span className="text-xs @md:text-sm text-muted-foreground uppercase">
					{label}
				</span>
			</div>
		))}
	</div>
);

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge variant="destructive" className="gap-1.5 px-4 py-1.5 animate-pulse">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, discount }: { text: string; discount: string }) => (
	<div className="space-y-2">
		<h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-black tracking-tight uppercase">
			{text}
		</h1>
		<div className="text-5xl @sm:text-6xl @lg:text-7xl @xl:text-8xl font-black text-primary">
			{discount}
		</div>
	</div>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-md">{text}</p>
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
	images: { src: string; alt: string; discount: string }[];
}) => (
	<div className="grid grid-cols-2 gap-4">
		{images.map(({ src, alt, discount }, i) => (
			<div
				key={i}
				className="relative aspect-square rounded-2xl overflow-hidden group"
			>
				<Badge variant="destructive" className="absolute top-3 left-3 z-10">
					{discount}
				</Badge>
				<Image
					src={src}
					alt={alt}
					fill
					className="object-cover group-hover:scale-105 transition-transform duration-500"
				/>
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
						<Eyebrow icon={Zap} text="Flash Sale Live Now" />
						<Title text="Mega Sale" discount="UP TO 70% OFF" />
						<Description text="Our biggest sale of the year is here! Shop thousands of items at unbeatable prices. Limited time only." />
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Clock className="size-4" />
								<span>Sale ends in:</span>
							</div>
							<CountdownTimer
								items={[
									{ value: '02', label: 'Days' },
									{ value: '14', label: 'Hours' },
									{ value: '36', label: 'Mins' },
									{ value: '52', label: 'Secs' },
								]}
							/>
						</div>
						<CTA
							items={[
								{ label: 'Shop All Deals', href: '/sale', icon: ArrowRight },
								{
									label: 'View Categories',
									href: '/categories',
									variant: 'outline',
								},
							]}
						/>
					</div>
					<ProductPreview
						images={[
							{
								src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
								alt: 'Sneakers',
								discount: '-50%',
							},
							{
								src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
								alt: 'Watch',
								discount: '-40%',
							},
							{
								src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
								alt: 'Bag',
								discount: '-60%',
							},
							{
								src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop',
								alt: 'Accessories',
								discount: '-70%',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
