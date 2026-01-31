import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowUpRight,
	Grid2X2,
	LayoutPanelLeft,
	LayoutPanelTop,
	LayoutTemplate,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={LayoutTemplate} text="Dynamic" />
					<Title text="Asymmetric Layout" />
					<Description text="Balanced asymmetric grid creating visual interest." />
				</div>

				<AsymmetricGrid
					items={[
						{
							image: 'https://picsum.photos/seed/asym1/800/600',
							title: 'Enterprise Dashboard',
							category: 'SaaS',
							size: 'large',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/asym2/400/400',
							title: 'Mobile Banking',
							category: 'Fintech',
							size: 'small',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/asym3/400/400',
							title: 'Healthcare App',
							category: 'Health',
							size: 'small',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/asym4/400/600',
							title: 'E-Commerce',
							category: 'Web',
							size: 'medium',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/asym5/600/400',
							title: 'Design System',
							category: 'UI/UX',
							size: 'medium',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/asym6/800/600',
							title: 'AI Content Platform',
							category: 'AI/ML',
							size: 'large',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/asym7/400/400',
							title: 'Portfolio Site',
							category: 'Web',
							size: 'small',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/asym8/400/400',
							title: 'Social App',
							category: 'Mobile',
							size: 'small',
							href: '#',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex justify-center mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface AsymmetricItem {
	image: string;
	title: string;
	category: string;
	size: 'small' | 'medium' | 'large';
	href: string;
}

const sizeClasses = {
	small: '@lg:col-span-1 @lg:row-span-1',
	medium: '@lg:col-span-1 @lg:row-span-2',
	large: '@lg:col-span-2 @lg:row-span-2',
};

const AsymmetricGrid = ({ items }: { items: AsymmetricItem[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-5 auto-rows-[minmax(150px,auto)] @lg:auto-rows-[180px]">
		{items.map(({ image, title, category, size, href }, i) => (
			<Link key={i} href={href} className={`group block ${sizeClasses[size]}`}>
				<Card className="h-full overflow-hidden border transition-all hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 p-0">
					<div className="relative h-full overflow-hidden">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-700 group-hover:scale-105"
						/>

						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

						{/* Size indicator */}
						<div className="absolute top-3 right-3">
							<Badge
								variant="outline"
								className="bg-white/10 text-white border-white/30 backdrop-blur-sm text-xs"
							>
								{size === 'large' && <LayoutPanelTop className="size-3 mr-1" />}
								{size === 'medium' && (
									<LayoutPanelLeft className="size-3 mr-1" />
								)}
								{size === 'small' && <Grid2X2 className="size-3 mr-1" />}
								{size}
							</Badge>
						</div>

						{/* Content */}
						<div className="absolute inset-x-0 bottom-0 p-4 @lg:p-5">
							<Badge className="mb-2">{category}</Badge>
							<div className="flex items-end justify-between gap-2">
								<h3
									className={`text-white font-bold group-hover:text-primary transition-colors ${size === 'large' ? 'text-xl @lg:text-2xl' : 'text-base @lg:text-lg'}`}
								>
									{title}
								</h3>
								<ArrowUpRight
									className={`text-white opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ${size === 'large' ? 'size-6' : 'size-5'}`}
								/>
							</div>
						</div>
					</div>
				</Card>
			</Link>
		))}
	</div>
);
