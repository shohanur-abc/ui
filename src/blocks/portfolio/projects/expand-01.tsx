'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType, useState } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 mb-10 @md:mb-14">
					<div className="text-center max-w-3xl mx-auto">
						<Eyebrow icon={Maximize2} text="Expand" />
						<Title text="Expandable Gallery" />
						<Description text="Click to expand projects for a closer look." />
					</div>
				</div>

				<ExpandableGallery
					items={[
						{
							image: 'https://picsum.photos/seed/exp1/1200/800',
							title: 'AI Analytics Platform',
							category: 'AI/ML',
							description: 'Intelligent data analysis with machine learning.',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/exp2/1200/800',
							title: 'Banking Dashboard',
							category: 'Fintech',
							description: 'Real-time financial tracking.',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/exp3/1200/800',
							title: 'E-Commerce Store',
							category: 'Retail',
							description: 'Complete shopping experience.',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/exp4/1200/800',
							title: 'Healthcare Portal',
							category: 'Health',
							description: 'Patient management system.',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/exp5/1200/800',
							title: 'Social Network',
							category: 'Social',
							description: 'Community platform.',
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

interface ExpandableItem {
	image: string;
	title: string;
	category: string;
	description: string;
	href: string;
}

const ExpandableGallery = ({ items }: { items: ExpandableItem[] }) => {
	const [expandedIndex, setExpandedIndex] = useState(0);

	return (
		<div className="relative">
			{/* Main expanded view */}
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 mb-6">
				<div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted shadow-2xl">
					<Image
						src={items[expandedIndex].image}
						alt={items[expandedIndex].title}
						fill
						className="object-cover transition-opacity duration-500"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

					{/* Content overlay */}
					<div className="absolute inset-x-0 bottom-0 p-6 @md:p-8">
						<Badge className="mb-3">{items[expandedIndex].category}</Badge>
						<h3 className="text-white font-bold text-2xl @md:text-3xl mb-2">
							{items[expandedIndex].title}
						</h3>
						<p className="text-white/80 mb-4 max-w-lg">
							{items[expandedIndex].description}
						</p>
						<Button className="gap-2" asChild>
							<Link href={items[expandedIndex].href}>
								View Project <ArrowUpRight className="size-4" />
							</Link>
						</Button>
					</div>

					{/* Navigation arrows */}
					<Button
						variant="secondary"
						size="icon"
						className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 backdrop-blur-sm"
						onClick={() =>
							setExpandedIndex(
								(prev) => (prev - 1 + items.length) % items.length,
							)
						}
					>
						<ArrowLeft className="size-5" />
					</Button>
					<Button
						variant="secondary"
						size="icon"
						className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 backdrop-blur-sm"
						onClick={() =>
							setExpandedIndex((prev) => (prev + 1) % items.length)
						}
					>
						<ArrowRight className="size-5" />
					</Button>
				</div>
			</div>

			{/* Thumbnail strip */}
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8">
				<div className="flex gap-3 justify-center">
					{items.map(({ image, title }, i) => (
						<button
							key={i}
							onClick={() => setExpandedIndex(i)}
							className={`relative w-20 @md:w-28 aspect-video rounded-lg overflow-hidden transition-all duration-300 ${
								expandedIndex === i
									? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105'
									: 'opacity-60 hover:opacity-100'
							}`}
						>
							<Image src={image} alt={title} fill className="object-cover" />
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
