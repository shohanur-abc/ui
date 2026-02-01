'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useState } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Our Services" />
					<Title text="What We Offer" />
					<Description text="Explore our comprehensive suite of services designed to accelerate your business growth." />
				</div>

				<ServiceCarousel
					services={[
						{
							image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
							title: 'Web Development',
							description:
								'Custom web applications built with modern technologies. From simple websites to complex enterprise solutions.',
							features: ['React & Next.js', 'Node.js Backend', 'Cloud Deployment'],
							rating: 4.9,
							reviews: 128,
						},
						{
							image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
							title: 'Mobile Development',
							description:
								'Native and cross-platform mobile apps for iOS and Android. Beautiful interfaces with smooth performance.',
							features: ['React Native', 'iOS & Android', 'App Store Optimization'],
							rating: 4.8,
							reviews: 94,
						},
						{
							image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
							title: 'UI/UX Design',
							description:
								'User-centered design that drives engagement and conversions. Research-backed and pixel-perfect.',
							features: ['User Research', 'Prototyping', 'Design Systems'],
							rating: 4.9,
							reviews: 156,
						},
						{
							image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
							title: 'Cloud Solutions',
							description:
								'Scalable cloud infrastructure and DevOps automation. Optimize performance and reduce costs.',
							features: ['AWS & GCP', 'Kubernetes', 'CI/CD Pipelines'],
							rating: 4.7,
							reviews: 67,
						},
						{
							image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop',
							title: 'Cybersecurity',
							description:
								'Protect your digital assets with enterprise-grade security. Audits, compliance, and monitoring.',
							features: ['Security Audits', 'Penetration Testing', '24/7 Monitoring'],
							rating: 4.9,
							reviews: 45,
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

interface Service {
	image: string;
	title: string;
	description: string;
	features: string[];
	rating: number;
	reviews: number;
}

const ServiceCarousel = ({ services }: { services: Service[] }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const prev = () => {
		setCurrentIndex((i) => (i === 0 ? services.length - 1 : i - 1));
	};

	const next = () => {
		setCurrentIndex((i) => (i === services.length - 1 ? 0 : i + 1));
	};

	const current = services[currentIndex];

	return (
		<div className="relative">
			{/* Main card */}
			<Card className="py-0 overflow-hidden">
				<div className="grid @lg:grid-cols-2">
					{/* Image */}
					<div className="relative aspect-[4/3] @lg:aspect-auto">
						<Image
							src={current.image}
							alt={current.title}
							fill
							className="object-cover"
						/>
						{/* Pagination overlay */}
						<div className="absolute bottom-4 left-4 flex items-center gap-2">
							{services.map((_, i) => (
								<button
									key={i}
									onClick={() => setCurrentIndex(i)}
									className={`size-2 rounded-full transition-all ${
										i === currentIndex
											? 'bg-white w-6'
											: 'bg-white/50 hover:bg-white/75'
									}`}
								/>
							))}
						</div>
					</div>

					{/* Content */}
					<CardContent className="p-6 @md:p-8 flex flex-col">
						<div className="flex items-center gap-2 mb-4">
							<div className="flex items-center gap-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`size-4 ${
											i < Math.floor(current.rating)
												? 'fill-amber-400 text-amber-400'
												: 'text-muted'
										}`}
									/>
								))}
							</div>
							<span className="text-sm font-medium">{current.rating}</span>
							<span className="text-sm text-muted-foreground">
								({current.reviews} reviews)
							</span>
						</div>

						<h3 className="text-2xl font-bold mb-3">{current.title}</h3>
						<p className="text-muted-foreground mb-6">{current.description}</p>

						<div className="flex flex-wrap gap-2 mb-6">
							{current.features.map((feature, i) => (
								<Badge key={i} variant="secondary">
									{feature}
								</Badge>
							))}
						</div>

						<div className="mt-auto flex items-center justify-between">
							<Button variant="outline" asChild>
								<Link href={`/services/${current.title.toLowerCase().replace(/\s+/g, '-')}`}>
									Learn More
								</Link>
							</Button>
							<Button asChild>
								<Link href="/contact">
									Get Started
									<ArrowRight className="size-4" />
								</Link>
							</Button>
						</div>
					</CardContent>
				</div>
			</Card>

			{/* Navigation arrows */}
			<button
				onClick={prev}
				className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/80 backdrop-blur-sm border flex items-center justify-center hover:bg-background transition-colors"
			>
				<ChevronLeft className="size-5" />
			</button>
			<button
				onClick={next}
				className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/80 backdrop-blur-sm border flex items-center justify-center hover:bg-background transition-colors"
			>
				<ChevronRight className="size-5" />
			</button>

			{/* Thumbnail preview */}
			<div className="hidden @lg:flex items-center justify-center gap-4 mt-6">
				{services.map((service, i) => (
					<button
						key={i}
						onClick={() => setCurrentIndex(i)}
						className={`relative w-24 aspect-video rounded-lg overflow-hidden transition-all ${
							i === currentIndex
								? 'ring-2 ring-primary ring-offset-2'
								: 'opacity-60 hover:opacity-100'
						}`}
					>
						<Image
							src={service.image}
							alt={service.title}
							fill
							className="object-cover"
						/>
					</button>
				))}
			</div>
		</div>
	);
};
