'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Check, Zap, Shield, Globe, BarChart3, Users, Code } from 'lucide-react';
import { ComponentType, useRef, useState } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-4 mb-8 @md:mb-10">
					<div>
						<Eyebrow text="Capabilities" />
						<Title text="Full-Service Solutions" />
					</div>
					<Button variant="outline" asChild>
						<Link href="/services">
							View All Services
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>

				<HorizontalCarousel
					services={[
						{
							icon: Code,
							title: 'Custom Development',
							description: 'Tailored software solutions built from the ground up to meet your unique business requirements.',
							highlights: ['Full-stack expertise', 'Agile methodology', 'Quality assurance'],
							color: 'bg-blue-500',
						},
						{
							icon: Globe,
							title: 'Digital Transformation',
							description: 'Modernize your business operations with cutting-edge digital strategies and technologies.',
							highlights: ['Process automation', 'Cloud migration', 'Legacy modernization'],
							color: 'bg-purple-500',
						},
						{
							icon: Shield,
							title: 'Security Services',
							description: 'Comprehensive cybersecurity solutions to protect your data and systems from threats.',
							highlights: ['Threat detection', 'Compliance', 'Security audits'],
							color: 'bg-red-500',
						},
						{
							icon: BarChart3,
							title: 'Data Analytics',
							description: 'Transform raw data into actionable insights with advanced analytics and visualization.',
							highlights: ['BI dashboards', 'Predictive analytics', 'Data pipelines'],
							color: 'bg-green-500',
						},
						{
							icon: Users,
							title: 'Team Augmentation',
							description: 'Scale your development capacity with skilled professionals who integrate seamlessly.',
							highlights: ['Vetted talent', 'Flexible engagement', 'Domain expertise'],
							color: 'bg-amber-500',
						},
						{
							icon: Zap,
							title: 'Performance Optimization',
							description: 'Maximize application speed and efficiency for better user experience and conversions.',
							highlights: ['Load time reduction', 'Scalability', 'Cost optimization'],
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
		{text}
	</h2>
);

interface Service {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	highlights: string[];
	color: string;
}

const HorizontalCarousel = ({ services }: { services: Service[] }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const checkScroll = () => {
		if (!containerRef.current) return;
		const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
		setCanScrollLeft(scrollLeft > 0);
		setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
	};

	const scroll = (direction: 'left' | 'right') => {
		if (!containerRef.current) return;
		const scrollAmount = containerRef.current.clientWidth * 0.8;
		containerRef.current.scrollBy({
			left: direction === 'left' ? -scrollAmount : scrollAmount,
			behavior: 'smooth',
		});
		setTimeout(checkScroll, 300);
	};

	return (
		<div className="relative">
			{/* Cards container */}
			<div
				ref={containerRef}
				onScroll={checkScroll}
				className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			>
				{services.map(({ icon: Icon, title, description, highlights, color }, i) => (
					<Card
						key={i}
						className="py-0 shrink-0 w-[300px] @md:w-[350px] snap-start group hover:shadow-lg transition-shadow"
					>
						<CardContent className="p-6">
							{/* Icon */}
							<div
								className={`size-12 rounded-xl ${color} text-white flex items-center justify-center mb-4`}
							>
								<Icon className="size-6" />
							</div>

							{/* Content */}
							<h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
								{title}
							</h3>
							<p className="text-sm text-muted-foreground mb-4">{description}</p>

							{/* Highlights */}
							<ul className="space-y-2 mb-4">
								{highlights.map((highlight, j) => (
									<li key={j} className="flex items-center gap-2 text-sm">
										<Check className="size-4 text-primary shrink-0" />
										{highlight}
									</li>
								))}
							</ul>

							{/* CTA */}
							<Button variant="ghost" className="w-full group-hover:bg-primary/5" asChild>
								<Link href={`/services/${title.toLowerCase().replace(/\s+/g, '-')}`}>
									Learn More
									<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Navigation */}
			<div className="flex items-center justify-center gap-3 mt-6">
				<button
					onClick={() => scroll('left')}
					disabled={!canScrollLeft}
					className={`size-10 rounded-full border flex items-center justify-center transition-colors ${
						canScrollLeft
							? 'hover:bg-muted'
							: 'opacity-50 cursor-not-allowed'
					}`}
				>
					<ChevronLeft className="size-5" />
				</button>
				<button
					onClick={() => scroll('right')}
					disabled={!canScrollRight}
					className={`size-10 rounded-full border flex items-center justify-center transition-colors ${
						canScrollRight
							? 'hover:bg-muted'
							: 'opacity-50 cursor-not-allowed'
					}`}
				>
					<ChevronRight className="size-5" />
				</button>
			</div>
		</div>
	);
};
