'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from '@/components/ui/carousel';
import {
	Star,
	ChevronLeft,
	ChevronRight,
	PlayCircle,
	PauseCircle,
} from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	avatar?: string;
	rating: number;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Reviews" />
					<Title text="Client Feedback" />
					<Description text="Auto-playing testimonials with playback controls." />
				</div>

				<TestimonialAutoplayCarousel
					items={[
						{
							quote:
								'A game-changer for our business. The new website has driven unprecedented growth.',
							author: 'Robert Taylor',
							role: 'CEO, GrowthEngine',
							avatar: 'https://i.pravatar.cc/100?img=15',
							rating: 5,
						},
						{
							quote:
								'Technical excellence and creative innovation combined perfectly.',
							author: 'Linda Martinez',
							role: 'CTO, InnovateLab',
							avatar: 'https://i.pravatar.cc/100?img=16',
							rating: 5,
						},
						{
							quote:
								"The most professional team we've ever worked with. Highly recommended.",
							author: 'Steven Park',
							role: 'Founder, StartupHub',
							avatar: 'https://i.pravatar.cc/100?img=17',
							rating: 5,
						},
						{
							quote:
								'Our digital transformation was seamless thanks to their expertise.',
							author: 'Michelle Wong',
							role: 'VP Digital, EnterpriseCo',
							avatar: 'https://i.pravatar.cc/100?img=18',
							rating: 5,
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge>{text}</Badge>
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

const TestimonialAutoplayCarousel = ({
	items,
}: {
	items: TestimonialItem[];
}) => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const autoplayRef = useRef(
		Autoplay({ delay: 4000, stopOnInteraction: false }),
	);

	useEffect(() => {
		if (!api) return;
		setCurrent(api.selectedScrollSnap());
		api.on('select', () => setCurrent(api.selectedScrollSnap()));
	}, [api]);

	const toggleAutoplay = useCallback(() => {
		const autoplay = autoplayRef.current;
		if (isPlaying) {
			autoplay.stop();
		} else {
			autoplay.play();
		}
		setIsPlaying(!isPlaying);
	}, [isPlaying]);

	return (
		<div className="max-w-4xl mx-auto">
			<Carousel
				setApi={setApi}
				opts={{ loop: true }}
				plugins={[autoplayRef.current]}
				className="w-full"
			>
				<CarouselContent>
					{items.map(({ quote, author, role, avatar, rating }, i) => (
						<CarouselItem key={i}>
							<Card>
								<CardContent className="p-8 @md:p-10 text-center">
									<div className="flex justify-center gap-1 mb-6">
										{Array.from({ length: 5 }).map((_, j) => (
											<Star
												key={j}
												className={`size-5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
											/>
										))}
									</div>
									<blockquote className="text-xl @md:text-2xl leading-relaxed mb-8">
										&ldquo;{quote}&rdquo;
									</blockquote>
									<Avatar className="size-16 mx-auto mb-4">
										<AvatarImage src={avatar} />
										<AvatarFallback className="bg-primary text-primary-foreground text-lg">
											{author[0]}
										</AvatarFallback>
									</Avatar>
									<div className="font-semibold text-lg">{author}</div>
									<div className="text-muted-foreground">{role}</div>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			<div className="flex items-center justify-center gap-6 mt-6">
				<Button variant="ghost" size="icon" onClick={() => api?.scrollPrev()}>
					<ChevronLeft className="size-5" />
				</Button>

				<div className="flex items-center gap-3">
					{items.map((_, i) => (
						<button
							key={i}
							onClick={() => api?.scrollTo(i)}
							className={`size-2 rounded-full transition-all ${
								i === current
									? 'bg-primary scale-125'
									: 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
							}`}
						/>
					))}
				</div>

				<Button variant="ghost" size="icon" onClick={() => api?.scrollNext()}>
					<ChevronRight className="size-5" />
				</Button>

				<Button variant="ghost" size="icon" onClick={toggleAutoplay}>
					{isPlaying ? (
						<PauseCircle className="size-5" />
					) : (
						<PlayCircle className="size-5" />
					)}
				</Button>
			</div>
		</div>
	);
};
