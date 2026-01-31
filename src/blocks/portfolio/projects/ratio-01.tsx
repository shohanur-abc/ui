import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Frame, Ratio, RectangleHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Frame} text="Ratio" />
					<Title text="Mixed Aspect Ratios" />
					<Description text="Dynamic grid with varying image proportions." />
				</div>

				<RatioGrid
					items={[
						{
							image: 'https://picsum.photos/seed/ratio1/800/450',
							title: 'Dashboard Analytics',
							category: 'SaaS',
							ratio: 'wide',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/ratio2/600/800',
							title: 'Mobile App',
							category: 'iOS',
							ratio: 'tall',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/ratio3/600/600',
							title: 'Brand Identity',
							category: 'Design',
							ratio: 'square',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/ratio4/800/450',
							title: 'E-Commerce Platform',
							category: 'Web',
							ratio: 'wide',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/ratio5/600/600',
							title: 'Icon System',
							category: 'UI',
							ratio: 'square',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/ratio6/600/800',
							title: 'Android App',
							category: 'Mobile',
							ratio: 'tall',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/ratio7/600/600',
							title: 'Logo Design',
							category: 'Branding',
							ratio: 'square',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/ratio8/800/450',
							title: 'Marketing Site',
							category: 'Web',
							ratio: 'wide',
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

interface RatioItem {
	image: string;
	title: string;
	category: string;
	ratio: 'wide' | 'tall' | 'square';
	href: string;
}

const ratioClasses = {
	wide: 'aspect-video @md:col-span-2',
	tall: 'aspect-[3/4] @md:row-span-2',
	square: 'aspect-square',
};

const RatioGrid = ({ items }: { items: RatioItem[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6 auto-rows-min">
		{items.map(({ image, title, category, ratio, href }, i) => (
			<Link
				key={i}
				href={href}
				className={`group block ${ratioClasses[ratio]}`}
			>
				<Card className="h-full overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
					<div className="relative h-full overflow-hidden">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-700 group-hover:scale-105"
						/>

						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

						{/* Content */}
						<div className="absolute inset-0 flex flex-col justify-between p-4">
							<div className="flex items-start justify-between">
								<Badge>{category}</Badge>
								<Badge
									variant="outline"
									className="bg-white/10 text-white border-white/30 backdrop-blur-sm text-xs"
								>
									{ratio === 'wide' && (
										<RectangleHorizontal className="size-3 mr-1" />
									)}
									{ratio === 'tall' && (
										<Ratio className="size-3 mr-1 rotate-90" />
									)}
									{ratio === 'square' && <Frame className="size-3 mr-1" />}
									{ratio}
								</Badge>
							</div>

							<div className="flex items-end justify-between">
								<h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors">
									{title}
								</h3>
								<ArrowUpRight className="size-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
						</div>
					</div>
				</Card>
			</Link>
		))}
	</div>
);
