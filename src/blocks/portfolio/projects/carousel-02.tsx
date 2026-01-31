'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="flex flex-col @md:flex-row @md:items-end @md:justify-between gap-6 mb-10 @md:mb-14">
					<div className="max-w-2xl">
						<Eyebrow icon={Briefcase} text="Portfolio" />
						<Title text="Selected Work" />
						<Description text="Swipe through featured projects showcasing design and development excellence." />
					</div>
				</div>

				<ProjectCarousel
					items={[
						{
							image: 'https://picsum.photos/seed/car2a/900/600',
							title: 'Crypto Exchange',
							description:
								'High-performance trading platform with real-time charts.',
							tags: ['React', 'WebSocket', 'Redis'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/car2b/900/600',
							title: 'Travel Booking App',
							description:
								'End-to-end travel planning with AI recommendations.',
							tags: ['Next.js', 'Maps API', 'Stripe'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/car2c/900/600',
							title: 'Food Delivery Platform',
							description: 'Multi-vendor marketplace with live order tracking.',
							tags: ['React Native', 'Node.js', 'MongoDB'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/car2d/900/600',
							title: 'HR Management System',
							description: 'Employee management with payroll and attendance.',
							tags: ['Vue.js', 'Laravel', 'MySQL'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/car2e/900/600',
							title: 'Video Streaming App',
							description: 'OTT platform with adaptive bitrate streaming.',
							tags: ['Next.js', 'HLS', 'CDN'],
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
	<div className="flex items-center gap-2 mb-3 text-primary">
		<Icon className="size-4" />
		<span className="text-sm font-medium uppercase tracking-wider">{text}</span>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-3">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface ProjectItem {
	image: string;
	title: string;
	description: string;
	tags: string[];
	href: string;
}

const ProjectCarousel = ({ items }: { items: ProjectItem[] }) => (
	<Carousel
		opts={{
			align: 'start',
			loop: true,
		}}
		className="w-full"
	>
		<CarouselContent className="-ml-4 @md:-ml-6">
			{items.map(({ image, title, description, tags, href }, i) => (
				<CarouselItem
					key={i}
					className="pl-4 @md:pl-6 @md:basis-1/2 @xl:basis-1/3"
				>
					<Card className="group h-full overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 p-0">
						<Link href={href} className="block">
							<div className="relative aspect-[3/2] overflow-hidden">
								<Image
									src={image}
									alt={title}
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
								<Button
									variant="secondary"
									size="icon-sm"
									className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0"
								>
									<ArrowUpRight className="size-4" />
								</Button>
							</div>
							<div className="p-5">
								<div className="flex flex-wrap gap-1.5 mb-3">
									{tags.map((tag, j) => (
										<Badge key={j} variant="outline" className="text-xs">
											{tag}
										</Badge>
									))}
								</div>
								<h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
									{title}
								</h3>
								<p className="text-sm text-muted-foreground line-clamp-2">
									{description}
								</p>
							</div>
						</Link>
					</Card>
				</CarouselItem>
			))}
		</CarouselContent>
		<div className="flex justify-center gap-2 mt-8">
			<CarouselPrevious className="static translate-y-0" />
			<CarouselNext className="static translate-y-0" />
		</div>
	</Carousel>
);
