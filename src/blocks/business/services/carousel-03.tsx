'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<AutoplayCarousel
					slides={[
						{
							image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop',
							badge: 'Enterprise Solutions',
							title: 'Transform Your Business',
							subtitle: 'End-to-end digital solutions that drive growth and efficiency',
							cta: { label: 'Explore Solutions', href: '/solutions' },
						},
						{
							image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&h=900&fit=crop',
							badge: 'Product Development',
							title: 'From Idea to Launch',
							subtitle: 'We build products that users love and businesses rely on',
							cta: { label: 'See Our Work', href: '/portfolio' },
						},
						{
							image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1600&h=900&fit=crop',
							badge: 'Consulting Services',
							title: 'Expert Guidance',
							subtitle: 'Strategic technology consulting to navigate complex challenges',
							cta: { label: 'Book Consultation', href: '/contact' },
						},
						{
							image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&h=900&fit=crop',
							badge: 'Innovation Labs',
							title: 'Future-Ready Tech',
							subtitle: 'Exploring AI, blockchain, and emerging technologies',
							cta: { label: 'Learn More', href: '/innovation' },
						},
					]}
				/>
			</div>
		</section>
	);
}

interface Slide {
	image: string;
	badge: string;
	title: string;
	subtitle: string;
	cta: { label: string; href: string };
}

const AutoplayCarousel = ({ slides }: { slides: Slide[] }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		if (isPaused) return;
		const interval = setInterval(() => {
			setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
		}, 5000);
		return () => clearInterval(interval);
	}, [isPaused, slides.length]);

	const prev = () => setCurrentIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
	const next = () => setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

	return (
		<div
			className="relative h-[500px] @md:h-[600px] @xl:h-[700px]"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			{/* Slides */}
			{slides.map((slide, i) => (
				<div
					key={i}
					className={`absolute inset-0 transition-opacity duration-700 ${
						i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
					}`}
				>
					{/* Background image */}
					<Image
						src={slide.image}
						alt={slide.title}
						fill
						className="object-cover"
						priority={i === 0}
					/>
					{/* Overlay */}
					<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

					{/* Content */}
					<div className="absolute inset-0 flex items-center">
						<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 w-full">
							<div className="max-w-xl">
								<Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
									{slide.badge}
								</Badge>
								<h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold text-white mb-4">
									{slide.title}
								</h2>
								<p className="text-lg @md:text-xl text-white/80 mb-8">
									{slide.subtitle}
								</p>
								<div className="flex flex-wrap gap-4">
									<Button size="lg" asChild>
										<Link href={slide.cta.href}>
											{slide.cta.label}
											<ArrowRight className="size-4" />
										</Link>
									</Button>
									<Button
										size="lg"
										variant="outline"
										className="bg-transparent text-white border-white/30 hover:bg-white/10"
									>
										<Play className="size-4" />
										Watch Video
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}

			{/* Navigation arrows */}
			<button
				onClick={prev}
				className="absolute left-4 @md:left-8 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
			>
				<ChevronLeft className="size-6" />
			</button>
			<button
				onClick={next}
				className="absolute right-4 @md:right-8 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
			>
				<ChevronRight className="size-6" />
			</button>

			{/* Indicators */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => setCurrentIndex(i)}
						className="group relative"
					>
						<div
							className={`h-1 rounded-full transition-all ${
								i === currentIndex ? 'w-12 bg-white' : 'w-6 bg-white/40 group-hover:bg-white/60'
							}`}
						/>
						{/* Progress indicator for current slide */}
						{i === currentIndex && !isPaused && (
							<div className="absolute inset-0 h-1 rounded-full bg-primary animate-[progress_5s_linear]" />
						)}
					</button>
				))}
			</div>

			<style>{`
				@keyframes progress {
					from { width: 0; }
					to { width: 100%; }
				}
			`}</style>
		</div>
	);
};
