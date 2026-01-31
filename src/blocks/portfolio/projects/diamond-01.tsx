import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Diamond, Square, Pentagon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Diamond} text="Shapes" />
					<Title text="Diamond Grid" />
					<Description text="45-degree rotated diamond-shaped project cards." />
				</div>

				<DiamondGrid
					items={[
						{
							image: 'https://picsum.photos/seed/diam1/600/600',
							title: 'AI Platform',
							category: 'AI/ML',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/diam2/600/600',
							title: 'Banking App',
							category: 'Fintech',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/diam3/600/600',
							title: 'E-Commerce',
							category: 'Retail',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/diam4/600/600',
							title: 'Healthcare',
							category: 'Health',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/diam5/600/600',
							title: 'Dashboard',
							category: 'SaaS',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/diam6/600/600',
							title: 'Mobile App',
							category: 'iOS',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/diam7/600/600',
							title: 'Design System',
							category: 'UI/UX',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/diam8/600/600',
							title: 'Social App',
							category: 'Social',
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

interface DiamondItem {
	image: string;
	title: string;
	category: string;
	href: string;
}

const DiamondGrid = ({ items }: { items: DiamondItem[] }) => (
	<div className="flex flex-wrap justify-center gap-2 @md:gap-4 py-16">
		{items.map(({ image, title, category, href }, i) => (
			<Link
				key={i}
				href={href}
				className="group"
				style={{
					marginTop: i % 2 === 1 ? '80px' : '0',
				}}
			>
				<div className="relative size-32 @sm:size-40 @md:size-48 rotate-45 overflow-hidden rounded-2xl border border-border shadow-lg transition-all duration-500 group-hover:border-primary group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:scale-105">
					{/* Image container - counter-rotate to keep image upright */}
					<div className="absolute inset-[-50%] w-[200%] h-[200%] -rotate-45">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-700 group-hover:scale-110"
						/>
					</div>

					{/* Gradient overlay */}
					<div className="absolute inset-0 -rotate-45 scale-[1.42] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

					{/* Content - counter-rotate */}
					<div className="absolute inset-0 -rotate-45 flex flex-col items-center justify-center text-center p-4">
						<Badge className="mb-2 scale-75 @md:scale-100">{category}</Badge>
						<h3 className="text-white font-bold text-xs @sm:text-sm @md:text-base group-hover:text-primary transition-colors leading-tight">
							{title}
						</h3>
						<ArrowUpRight className="size-4 text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
					</div>
				</div>
			</Link>
		))}
	</div>
);
