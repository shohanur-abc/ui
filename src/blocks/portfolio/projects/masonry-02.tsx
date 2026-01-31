import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl text-center  *:mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Eyebrow icon={ArrowUpRight} text="Portfolio" />
				<Title text="Work Showcase" />
				<Description text="Hover or click to explore my recent projects." />

				<BentoGrid
					items={[
						{
							image: 'https://picsum.photos/seed/bento1/800/800',
							title: 'Dashboard Design',
							category: 'Web App',
							size: 'large',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/bento2/600/400',
							title: 'E-Commerce',
							category: 'Website',
							size: 'normal',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/bento3/600/400',
							title: 'Mobile App',
							category: 'iOS/Android',
							size: 'normal',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/bento4/600/400',
							title: 'Brand Identity',
							category: 'Branding',
							size: 'normal',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/bento5/800/800',
							title: 'SaaS Platform',
							category: 'Full Stack',
							size: 'large',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/bento6/600/400',
							title: 'Marketing Site',
							category: 'Landing Page',
							size: 'normal',
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
	icon?: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mx-auto mb-3 @md:mb-4">
		{Icon && <Icon className="size-4" />}
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground mb-12 @md:mb-16">
		{text}
	</p>
);

interface BentoItem {
	image: string;
	title: string;
	category: string;
	size: 'normal' | 'large';
	href: string;
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
	<ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
		{items.map(({ image, title, category, size, href }, i) => (
			<li
				key={i}
				className={
					size === 'large' ? '@md:col-span-2 @xl:col-span-1 @xl:row-span-2' : ''
				}
			>
				<Link
					href={href}
					className="group block relative rounded-2xl overflow-hidden h-full"
				>
					<div
						className={`relative ${size === 'large' ? 'aspect-square' : 'aspect-4/3'}`}
					>
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-all duration-500 group-hover:scale-110"
						/>
						<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
						<div className="absolute inset-0 p-5 @md:p-6 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
							<Badge variant="secondary" className="w-fit mb-2">
								{category}
							</Badge>
							<h3 className="text-white text-lg @md:text-xl font-semibold flex items-center gap-2">
								{title}
								<ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
							</h3>
						</div>
					</div>
				</Link>
			</li>
		))}
	</ul>
);
