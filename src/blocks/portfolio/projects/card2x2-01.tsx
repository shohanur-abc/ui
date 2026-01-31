import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, Eye, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={LayoutGrid} text="Projects" />
					<Title text="Grid Showcase" />
					<Description text="Clean 2x2 grid layout for featured work samples." />
				</div>

				<CardGrid2x2
					items={[
						{
							image: 'https://picsum.photos/seed/c2x2a/800/600',
							title: 'Enterprise CMS',
							description:
								'Content management system with workflow automation and multi-language support.',
							category: 'Web Platform',
							views: '2.4K',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/c2x2b/800/600',
							title: 'Telemedicine App',
							description:
								'Video consultation platform with prescription management and health records.',
							category: 'Healthcare',
							views: '1.8K',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/c2x2c/800/600',
							title: 'Inventory System',
							description:
								'Real-time stock management with barcode scanning and automated reordering.',
							category: 'Enterprise',
							views: '3.1K',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/c2x2d/800/600',
							title: 'Social Platform',
							description:
								'Community platform with content feeds, messaging, and event management.',
							category: 'Social',
							views: '5.2K',
							href: '#',
						},
					]}
				/>

				<div className="text-center mt-12">
					<Button variant="outline" size="lg" className="gap-2" asChild>
						<Link href="#more">
							Explore More <ArrowUpRight className="size-4" />
						</Link>
					</Button>
				</div>
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

interface CardItem {
	image: string;
	title: string;
	description: string;
	category: string;
	views: string;
	href: string;
}

const CardGrid2x2 = ({ items }: { items: CardItem[] }) => (
	<div className="grid @md:grid-cols-2 gap-6 @lg:gap-8">
		{items.map(({ image, title, description, category, views, href }, i) => (
			<Card
				key={i}
				className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 p-0"
			>
				<Link href={href} className="block">
					<div className="relative aspect-video overflow-hidden">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

						{/* Category badge */}
						<Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">
							{category}
						</Badge>

						{/* Views */}
						<div className="absolute top-4 right-4 flex items-center gap-1.5 text-white/80 text-sm bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
							<Eye className="size-3.5" />
							{views}
						</div>
					</div>

					<div className="p-5 @md:p-6">
						<h3 className="text-lg @md:text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
							{title}
							<ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
						</h3>
						<p className="text-muted-foreground text-sm line-clamp-2">
							{description}
						</p>
					</div>
				</Link>
			</Card>
		))}
	</div>
);
