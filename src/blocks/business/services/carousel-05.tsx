'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Portfolio" />
					<Title text="Featured Projects" />
					<Description text="See how we've helped businesses across industries achieve their digital goals." />
				</div>

				<ProjectCarousel
					projects={[
						{
							image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
							title: 'E-commerce Platform Redesign',
							client: 'Fashion Brand',
							services: ['UI/UX Design', 'Web Development', 'Performance Optimization'],
							results: [
								{ metric: '150%', label: 'Conversion Increase' },
								{ metric: '40%', label: 'Bounce Rate Reduction' },
								{ metric: '2.5x', label: 'Mobile Sales' },
							],
						},
						{
							image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
							title: 'FinTech Dashboard',
							client: 'Investment Firm',
							services: ['Data Visualization', 'React Development', 'API Integration'],
							results: [
								{ metric: '60%', label: 'Faster Analysis' },
								{ metric: '100K+', label: 'Daily Users' },
								{ metric: '99.9%', label: 'Uptime' },
							],
						},
						{
							image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
							title: 'Healthcare Patient Portal',
							client: 'Medical Network',
							services: ['HIPAA Compliance', 'Mobile App', 'Telemedicine'],
							results: [
								{ metric: '80%', label: 'Patient Adoption' },
								{ metric: '50%', label: 'Admin Time Saved' },
								{ metric: '4.8★', label: 'App Rating' },
							],
						},
						{
							image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=800&fit=crop',
							title: 'Logistics Management System',
							client: 'Shipping Company',
							services: ['IoT Integration', 'Real-time Tracking', 'Analytics'],
							results: [
								{ metric: '35%', label: 'Cost Reduction' },
								{ metric: '25%', label: 'Faster Delivery' },
								{ metric: '1M+', label: 'Packages Tracked' },
							],
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

interface Project {
	image: string;
	title: string;
	client: string;
	services: string[];
	results: { metric: string; label: string }[];
}

const ProjectCarousel = ({ projects }: { projects: Project[] }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const prev = () => setCurrentIndex((i) => (i === 0 ? projects.length - 1 : i - 1));
	const next = () => setCurrentIndex((i) => (i === projects.length - 1 ? 0 : i + 1));

	const current = projects[currentIndex];

	return (
		<div className="space-y-6">
			{/* Main project view */}
			<div className="grid @xl:grid-cols-2 gap-6 @xl:gap-0 bg-card rounded-2xl overflow-hidden border">
				{/* Image */}
				<div className="relative aspect-[4/3] @xl:aspect-auto">
					<Image
						src={current.image}
						alt={current.title}
						fill
						className="object-cover"
					/>
				</div>

				{/* Content */}
				<div className="p-6 @md:p-8 flex flex-col">
					<Badge variant="secondary" className="w-fit mb-4">
						{current.client}
					</Badge>

					<h3 className="text-2xl @md:text-3xl font-bold mb-4">{current.title}</h3>

					<div className="flex flex-wrap gap-2 mb-6">
						{current.services.map((service, i) => (
							<Badge key={i} variant="outline">
								{service}
							</Badge>
						))}
					</div>

					<div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl mb-6">
						{current.results.map((result, i) => (
							<div key={i} className="text-center">
								<div className="text-xl @md:text-2xl font-bold text-primary">
									{result.metric}
								</div>
								<div className="text-xs text-muted-foreground">{result.label}</div>
							</div>
						))}
					</div>

					<div className="mt-auto flex items-center justify-between">
						<Button variant="outline" asChild>
							<Link href={`/case-studies/${current.title.toLowerCase().replace(/\s+/g, '-')}`}>
								Read Case Study
							</Link>
						</Button>
						<Button asChild>
							<Link href="/contact">
								Start Your Project
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>

			{/* Thumbnails and navigation */}
			<div className="flex items-center gap-4">
				<button
					onClick={prev}
					className="size-10 rounded-full border flex items-center justify-center hover:bg-muted transition-colors shrink-0"
				>
					<ChevronLeft className="size-5" />
				</button>

				<div className="flex-1 overflow-hidden">
					<div className="flex gap-4">
						{projects.map((project, i) => (
							<button
								key={i}
								onClick={() => setCurrentIndex(i)}
								className={`relative flex-shrink-0 w-[120px] @md:w-[160px] aspect-video rounded-lg overflow-hidden transition-all ${
									i === currentIndex
										? 'ring-2 ring-primary ring-offset-2'
										: 'opacity-60 hover:opacity-100'
								}`}
							>
								<Image
									src={project.image}
									alt={project.title}
									fill
									className="object-cover"
								/>
							</button>
						))}
					</div>
				</div>

				<button
					onClick={next}
					className="size-10 rounded-full border flex items-center justify-center hover:bg-muted transition-colors shrink-0"
				>
					<ChevronRight className="size-5" />
				</button>
			</div>
		</div>
	);
};
