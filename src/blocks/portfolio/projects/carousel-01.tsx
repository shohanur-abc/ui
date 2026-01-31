import { Badge } from '@/components/ui/badge';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Eyebrow text="Recent Work" />
				<Title text="Project Highlights" />
				<Description text="Swipe through my latest projects." />

				<ProjectCarousel
					items={[
						{
							image: 'https://picsum.photos/seed/car1/1200/800',
							title: 'E-Commerce Platform',
							description:
								'A modern online store with seamless checkout experience and real-time inventory management.',
							tags: ['Next.js', 'Stripe', 'PostgreSQL'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/car2/1200/800',
							title: 'Analytics Dashboard',
							description:
								'Real-time data visualization platform with customizable widgets and automated reports.',
							tags: ['React', 'D3.js', 'Node.js'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/car3/1200/800',
							title: 'Mobile Banking App',
							description:
								'Secure, intuitive banking experience for iOS and Android with biometric authentication.',
							tags: ['React Native', 'TypeScript', 'Firebase'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/car4/1200/800',
							title: 'SaaS Marketing Site',
							description:
								'High-converting landing page with interactive demos and smooth animations.',
							tags: ['Next.js', 'Framer Motion', 'Tailwind'],
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
	<div className="flex justify-center mb-3 @md:mb-4 text-center max-w-3xl mx-auto">
		<Badge variant="outline">
			{Icon && <Icon className="size-4 mr-2" />}
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 text-center max-w-3xl mx-auto">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground  mb-12 @md:mb-16 text-center max-w-3xl mx-auto">
		{text}
	</p>
);

interface ProjectItem {
	image: string;
	title: string;
	description: string;
	tags: string[];
	href: string;
}

const ProjectCarousel = ({ items }: { items: ProjectItem[] }) => (
	<Carousel opts={{ align: 'start', loop: true }} className="w-full">
		<CarouselContent className="-ml-4 @md:-ml-6">
			{items.map(({ image, title, description, tags, href }, i) => (
				<CarouselItem
					key={i}
					className="pl-4 @md:pl-6 @md:basis-1/2 @xl:basis-2/5"
				>
					<div className="group">
						<Link href={href} className="block">
							<div className="relative aspect-3/2 rounded-xl @md:rounded-2xl overflow-hidden mb-4 @md:mb-5">
								<Image
									src={image}
									alt={title}
									fill
									className="object-cover transition-transform group-hover:scale-105"
								/>
							</div>
							<h3 className="text-lg @md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
								{title}
								<ArrowUpRight className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
							</h3>
						</Link>
						<p className="text-sm text-muted-foreground mb-3 leading-relaxed">
							{description}
						</p>
						<div className="flex flex-wrap gap-2">
							{tags.map((tag, j) => (
								<Badge key={j} variant="secondary" className="text-xs">
									{tag}
								</Badge>
							))}
						</div>
					</div>
				</CarouselItem>
			))}
		</CarouselContent>
		<div className="flex justify-center gap-2 mt-8 @md:mt-10">
			<CarouselPrevious className="static translate-y-0" />
			<CarouselNext className="static translate-y-0" />
		</div>
	</Carousel>
);
