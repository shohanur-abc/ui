import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Grid2X2, LayoutDashboard, Grip } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={LayoutDashboard} text="Matrix" />
					<Title text="Grid Matrix" />
					<Description text="Uniform grid with consistent sizing and spacing." />
				</div>

				<MatrixGrid
					items={[
						{
							image: 'https://picsum.photos/seed/mat1/400/400',
							title: 'Banking',
							category: 'Fintech',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mat2/400/400',
							title: 'E-Commerce',
							category: 'Retail',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mat3/400/400',
							title: 'Healthcare',
							category: 'Health',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mat4/400/400',
							title: 'AI Platform',
							category: 'AI/ML',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mat5/400/400',
							title: 'Mobile App',
							category: 'iOS',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mat6/400/400',
							title: 'Dashboard',
							category: 'SaaS',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mat7/400/400',
							title: 'Social App',
							category: 'Social',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mat8/400/400',
							title: 'EdTech',
							category: 'Education',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mat9/400/400',
							title: 'Design',
							category: 'UI/UX',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mat10/400/400',
							title: 'Analytics',
							category: 'Data',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mat11/400/400',
							title: 'Web3',
							category: 'Crypto',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mat12/400/400',
							title: 'Gaming',
							category: 'Game',
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

interface MatrixItem {
	image: string;
	title: string;
	category: string;
	href: string;
}

const MatrixGrid = ({ items }: { items: MatrixItem[] }) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-6 gap-3 @md:gap-4">
		{items.map(({ image, title, category, href }, i) => (
			<Link key={i} href={href} className="group block">
				<Card className="overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 hover:z-10 hover:scale-105 p-0">
					<div className="relative aspect-square overflow-hidden">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
						/>

						{/* Hover overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

						{/* Content on hover */}
						<div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 opacity-0 group-hover:opacity-100 transition-opacity">
							<Badge className="mb-2 scale-90">{category}</Badge>
							<h3 className="text-white font-bold text-sm">{title}</h3>
							<ArrowUpRight className="size-5 text-white mt-2" />
						</div>
					</div>
				</Card>
			</Link>
		))}
	</div>
);
