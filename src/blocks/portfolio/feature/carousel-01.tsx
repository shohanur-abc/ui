'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { Code2, Globe, Palette, Server, Smartphone, Zap } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Expertise" />
					<Title text="Core Competencies" />
					<Description text="Swipe through my areas of specialization." />
				</div>

				<ServiceCarousel
					items={[
						{
							icon: Globe,
							title: 'Web Development',
							description:
								'Building fast, responsive, and accessible web applications.',
							color: 'bg-blue-500',
						},
						{
							icon: Smartphone,
							title: 'Mobile Apps',
							description:
								'Cross-platform mobile development for iOS and Android.',
							color: 'bg-purple-500',
						},
						{
							icon: Palette,
							title: 'UI/UX Design',
							description: 'User-centered design that converts and delights.',
							color: 'bg-pink-500',
						},
						{
							icon: Server,
							title: 'Backend',
							description: 'Scalable APIs and microservices architecture.',
							color: 'bg-orange-500',
						},
						{
							icon: Code2,
							title: 'DevOps',
							description: 'CI/CD pipelines and cloud infrastructure.',
							color: 'bg-green-500',
						},
						{
							icon: Zap,
							title: 'Performance',
							description: 'Optimization for speed and efficiency.',
							color: 'bg-cyan-500',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface CarouselItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	color: string;
}

const ServiceCarousel = ({ items }: { items: CarouselItem[] }) => (
	<Carousel
		opts={{
			align: 'start',
			loop: true,
		}}
		className="w-full max-w-5xl mx-auto"
	>
		<CarouselContent className="-ml-4">
			{items.map(({ icon: Icon, title, description, color }, i) => (
				<CarouselItem key={i} className="pl-4 @sm:basis-1/2 @lg:basis-1/3">
					<Card className="py-0 h-full group hover:shadow-lg transition-all">
						<CardContent className="p-6 @md:p-8 text-center">
							<div
								className={`size-14 @md:size-16 rounded-2xl ${color} flex items-center justify-center mx-auto mb-5 text-white shadow-lg group-hover:scale-110 transition-transform`}
							>
								<Icon className="size-7 @md:size-8" />
							</div>
							<h3 className="font-bold text-lg @md:text-xl mb-2">{title}</h3>
							<p className="text-sm @md:text-base text-muted-foreground">
								{description}
							</p>
						</CardContent>
					</Card>
				</CarouselItem>
			))}
		</CarouselContent>
		<CarouselPrevious className="hidden @md:flex -left-12" />
		<CarouselNext className="hidden @md:flex -right-12" />
	</Carousel>
);
