'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useState } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<TestimonialCarousel
					testimonials={[
						{
							quote:
								'Their web development team transformed our outdated platform into a modern, scalable solution. Traffic increased 300% in six months.',
							author: 'Sarah Chen',
							role: 'CTO',
							company: 'TechStart Inc.',
							avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
							service: 'Web Development',
							rating: 5,
						},
						{
							quote:
								'The mobile app they built for us is flawless. Our customers love it, and app store ratings speak for themselves.',
							author: 'Michael Rodriguez',
							role: 'Product Manager',
							company: 'RetailFlow',
							avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
							service: 'Mobile Development',
							rating: 5,
						},
						{
							quote:
								'Their security audit found vulnerabilities we didn\'t know existed. Now we have peace of mind and compliance.',
							author: 'Emily Watson',
							role: 'Security Director',
							company: 'FinanceHub',
							avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
							service: 'Cybersecurity',
							rating: 5,
						},
						{
							quote:
								'The data analytics dashboard they created gives us real-time insights we never had before. Game changer.',
							author: 'David Park',
							role: 'CEO',
							company: 'DataDriven Co.',
							avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
							service: 'Data Analytics',
							rating: 5,
						},
					]}
				/>
			</div>
		</section>
	);
}

interface Testimonial {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	service: string;
	rating: number;
}

const TestimonialCarousel = ({ testimonials }: { testimonials: Testimonial[] }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const prev = () => setCurrentIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
	const next = () => setCurrentIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

	const current = testimonials[currentIndex];

	return (
		<div className="grid @xl:grid-cols-5 gap-8 @xl:gap-12 items-center">
			{/* Sidebar navigation */}
			<div className="@xl:col-span-2 order-2 @xl:order-1">
				<Badge variant="outline" className="mb-4">
					Client Stories
				</Badge>
				<h2 className="text-2xl @md:text-3xl font-bold mb-6">
					What Our Clients Say About Our Services
				</h2>

				<div className="space-y-3">
					{testimonials.map((testimonial, i) => (
						<button
							key={i}
							onClick={() => setCurrentIndex(i)}
							className={`w-full text-left p-4 rounded-lg border transition-all ${
								i === currentIndex
									? 'border-primary bg-primary/5'
									: 'border-transparent hover:bg-muted/50'
							}`}
						>
							<div className="flex items-center gap-3">
								<div className="relative size-10 rounded-full overflow-hidden">
									<Image
										src={testimonial.avatar}
										alt={testimonial.author}
										fill
										className="object-cover"
									/>
								</div>
								<div className="flex-1 min-w-0">
									<p className="font-medium truncate">{testimonial.author}</p>
									<p className="text-sm text-muted-foreground truncate">
										{testimonial.service}
									</p>
								</div>
								{i === currentIndex && (
									<ArrowRight className="size-4 text-primary shrink-0" />
								)}
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Main testimonial */}
			<div className="@xl:col-span-3 order-1 @xl:order-2">
				<Card className="py-0 relative overflow-hidden">
					<div className="absolute top-6 right-6 text-primary/10">
						<Quote className="size-24" />
					</div>

					<CardContent className="p-6 @md:p-8">
						<Badge className="mb-4">{current.service}</Badge>

						<div className="flex items-center gap-1 mb-4">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`size-5 ${
										i < current.rating
											? 'fill-amber-400 text-amber-400'
											: 'text-muted'
									}`}
								/>
							))}
						</div>

						<blockquote className="text-lg @md:text-xl font-medium mb-6 relative z-10">
							"{current.quote}"
						</blockquote>

						<div className="flex items-center gap-4">
							<div className="relative size-14 rounded-full overflow-hidden">
								<Image
									src={current.avatar}
									alt={current.author}
									fill
									className="object-cover"
								/>
							</div>
							<div>
								<p className="font-bold">{current.author}</p>
								<p className="text-sm text-muted-foreground">
									{current.role} at {current.company}
								</p>
							</div>
						</div>

						{/* Navigation */}
						<div className="flex items-center gap-3 mt-6 pt-6 border-t">
							<button
								onClick={prev}
								className="size-10 rounded-full border flex items-center justify-center hover:bg-muted transition-colors"
							>
								<ChevronLeft className="size-5" />
							</button>
							<span className="text-sm text-muted-foreground">
								{currentIndex + 1} / {testimonials.length}
							</span>
							<button
								onClick={next}
								className="size-10 rounded-full border flex items-center justify-center hover:bg-muted transition-colors"
							>
								<ChevronRight className="size-5" />
							</button>

							<Button className="ml-auto" asChild>
								<Link href="/case-studies">
									View Case Study
									<ArrowRight className="size-4" />
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
