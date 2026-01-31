import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Hexagon, Grid2X2, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Hexagon} text="Hex Grid" />
					<Title text="Hexagonal Gallery" />
					<Description text="Projects displayed in a unique hexagonal grid pattern." />
				</div>

				<HexGrid
					items={[
						{
							image: 'https://picsum.photos/seed/hex1/400/400',
							title: 'Analytics Platform',
							category: 'SaaS',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/hex2/400/400',
							title: 'Mobile Banking',
							category: 'Fintech',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/hex3/400/400',
							title: 'E-Commerce',
							category: 'Web',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/hex4/400/400',
							title: 'Healthcare App',
							category: 'Health',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/hex5/400/400',
							title: 'Design System',
							category: 'UI/UX',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/hex6/400/400',
							title: 'AI Assistant',
							category: 'AI/ML',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/hex7/400/400',
							title: 'Social Platform',
							category: 'Mobile',
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

interface HexItem {
	image: string;
	title: string;
	category: string;
	href: string;
}

const HexGrid = ({ items }: { items: HexItem[] }) => (
	<div className="flex flex-wrap justify-center gap-4 @md:gap-6">
		{items.map(({ image, title, category, href }, i) => (
			<Link key={i} href={href} className="group">
				<div className="relative w-32 @sm:w-40 @md:w-48 @lg:w-56 aspect-[1/1.15]">
					{/* Hexagon shape using clip-path */}
					<div
						className="absolute inset-0 overflow-hidden transition-transform duration-300 group-hover:scale-105"
						style={{
							clipPath:
								'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
						}}
					>
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-110"
						/>

						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

						{/* Hover glow */}
						<div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />

						{/* Content */}
						<div className="absolute inset-x-0 bottom-0 p-4 text-center">
							<Badge className="mb-1 text-[10px] @md:text-xs">{category}</Badge>
							<h3 className="text-white text-xs @sm:text-sm @md:text-base font-semibold line-clamp-2">
								{title}
							</h3>
						</div>
					</div>

					{/* Border hexagon */}
					<div
						className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary transition-colors pointer-events-none"
						style={{
							clipPath:
								'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
						}}
					/>
				</div>
			</Link>
		))}
	</div>
);
