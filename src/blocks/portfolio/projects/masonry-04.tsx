import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Grid3x3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
					<div>
						<Eyebrow icon={Grid3x3} text="Visual Work" />
						<Title text="Creative Gallery" />
					</div>
					<FilterButtons
						items={['All', 'UI/UX', 'Branding', 'Development']}
						activeIndex={0}
					/>
				</div>

				<MasonryFluid
					items={[
						{
							image: 'https://picsum.photos/seed/mf1/500/700',
							title: 'App Interface',
							tags: ['UI/UX', 'Mobile'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mf2/500/400',
							title: 'Web Dashboard',
							tags: ['UI/UX', 'Web'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mf3/500/500',
							title: 'Logo Design',
							tags: ['Branding'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mf4/500/600',
							title: 'Marketing Site',
							tags: ['Development', 'Web'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mf5/500/400',
							title: 'Social Graphics',
							tags: ['Branding'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mf6/500/750',
							title: 'E-Commerce App',
							tags: ['UI/UX', 'Development'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mf7/500/450',
							title: 'SaaS Platform',
							tags: ['Development'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mf8/500/500',
							title: 'Brand Guidelines',
							tags: ['Branding'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mf9/500/650',
							title: 'Fitness Tracker',
							tags: ['UI/UX', 'Mobile'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mf10/500/400',
							title: 'Portfolio Site',
							tags: ['Development'],
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
	<div className="flex items-center gap-2 mb-2 text-primary">
		<Icon className="size-4" />
		<span className="text-sm font-medium uppercase tracking-wider">{text}</span>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
		{text}
	</h2>
);

const FilterButtons = ({
	items,
	activeIndex,
}: {
	items: string[];
	activeIndex: number;
}) => (
	<div className="flex flex-wrap gap-2">
		{items.map((item, i) => (
			<Button
				key={i}
				variant={i === activeIndex ? 'default' : 'outline'}
				size="sm"
			>
				{item}
			</Button>
		))}
	</div>
);

interface MasonryItem {
	image: string;
	title: string;
	tags: string[];
	href: string;
}

const MasonryFluid = ({ items }: { items: MasonryItem[] }) => (
	<div className="columns-2 @lg:columns-3 @xl:columns-4 gap-3 @md:gap-4 space-y-3 @md:space-y-4">
		{items.map(({ image, title, tags, href }, i) => (
			<Link
				key={i}
				href={href}
				className="group block break-inside-avoid relative rounded-lg @md:rounded-xl overflow-hidden"
			>
				<div className="relative">
					<Image
						src={image}
						alt={title}
						width={500}
						height={600}
						className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
					/>

					{/* Overlay */}
					<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
						<h3 className="text-white font-semibold mb-2">{title}</h3>
						<div className="flex flex-wrap justify-center gap-1">
							{tags.map((tag, j) => (
								<Badge
									key={j}
									variant="outline"
									className="text-xs bg-white/10 text-white border-white/30"
								>
									{tag}
								</Badge>
							))}
						</div>
						<Button variant="secondary" size="sm" className="mt-3 gap-1">
							View <ArrowUpRight className="size-3" />
						</Button>
					</div>
				</div>
			</Link>
		))}
	</div>
);
