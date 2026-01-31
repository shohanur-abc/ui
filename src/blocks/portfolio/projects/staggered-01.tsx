import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Layers, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Layers} text="Stagger" />
					<Title text="Staggered Grid" />
					<Description text="Offset grid layout with alternating row positions." />
				</div>

				<StaggeredGrid
					items={[
						{
							image: 'https://picsum.photos/seed/stag1/600/800',
							title: 'Mobile Banking',
							category: 'Fintech',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/stag2/600/800',
							title: 'E-Commerce App',
							category: 'Retail',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/stag3/600/800',
							title: 'Healthcare Portal',
							category: 'Health',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/stag4/600/800',
							title: 'AI Dashboard',
							category: 'AI/ML',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/stag5/600/800',
							title: 'Social Platform',
							category: 'Social',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/stag6/600/800',
							title: 'Learning App',
							category: 'EdTech',
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

interface StaggeredItem {
	image: string;
	title: string;
	category: string;
	href: string;
}

const StaggeredGrid = ({ items }: { items: StaggeredItem[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
		{items.map(({ image, title, category, href }, i) => (
			<Link
				key={i}
				href={href}
				className="group block"
				style={{
					marginTop: i % 2 === 1 ? '48px' : '0',
				}}
			>
				<Card className="overflow-hidden border transition-all hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 p-0">
					<div className="relative aspect-[3/4] overflow-hidden">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

						{/* Category */}
						<Badge className="absolute top-4 left-4">{category}</Badge>

						{/* Title */}
						<div className="absolute inset-x-0 bottom-0 p-5">
							<h3 className="text-white font-bold text-xl group-hover:text-primary transition-colors">
								{title}
							</h3>
						</div>

						{/* Hover arrow */}
						<div className="absolute top-4 right-4 size-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
							<ArrowUpRight className="size-5 text-white" />
						</div>
					</div>
				</Card>
			</Link>
		))}
	</div>
);
