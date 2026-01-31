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
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
}

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Testimonials" />
					<Title text="Client Experiences" />
					<Description text="Navigate through stories from our valued partners." />
				</div>

				<TestimonialCarouselWithDots
					items={[
						{
							quote:
								"A transformative experience. The team's expertise in both design and development resulted in a product that has become central to our operations.",
							author: 'Christopher Lee',
							role: 'CEO',
							company: 'Enterprise Solutions',
							avatar: 'https://i.pravatar.cc/100?img=95',
						},
						{
							quote:
								'Exceptional attention to detail and a deep understanding of user experience. Our customers have never been more satisfied with our digital platform.',
							author: 'Amanda Foster',
							role: 'Chief Product Officer',
							company: 'UserFirst Inc',
							avatar: 'https://i.pravatar.cc/100?img=96',
						},
						{
							quote:
								'The partnership has been invaluable. They brought technical excellence and creative thinking that elevated our project beyond what we imagined.',
							author: 'Ryan Mitchell',
							role: 'VP Engineering',
							company: 'TechInnovate',
							avatar: 'https://i.pravatar.cc/100?img=97',
						},
						{
							quote:
								'From strategy to execution, every aspect was handled with professionalism. The results speak for themselves in our improved metrics.',
							author: 'Jessica Martinez',
							role: 'Marketing Director',
							company: 'GrowthLab',
							avatar: 'https://i.pravatar.cc/100?img=98',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="outline">{text}</Badge>
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

const TestimonialCarouselWithDots = ({
	items,
}: {
	items: TestimonialItem[];
}) => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const count = items.length;

	useEffect(() => {
		if (!api) return;
		const onSelect = () => setCurrent(api.selectedScrollSnap());
		api.on('select', onSelect);
		return () => {
			api.off('select', onSelect);
		};
	}, [api]);

	const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

	return (
		<div className="max-w-4xl mx-auto">
			<Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
				<CarouselContent>
					{items.map(({ quote, author, role, company, avatar }, i) => (
						<CarouselItem key={i}>
							<Card className="border-0 shadow-none bg-transparent">
								<CardContent className="p-0 text-center">
									<Quote className="size-12 text-primary/30 mx-auto mb-6" />
									<blockquote className="text-xl @md:text-2xl leading-relaxed mb-8 px-4 @md:px-12">
										&ldquo;{quote}&rdquo;
									</blockquote>
									<Avatar className="size-16 mx-auto mb-4 ring-4 ring-primary/20">
										<AvatarImage src={avatar} />
										<AvatarFallback className="bg-primary text-primary-foreground text-lg">
											{author[0]}
										</AvatarFallback>
									</Avatar>
									<div className="font-semibold text-lg">{author}</div>
									<div className="text-muted-foreground">
										{role}, {company}
									</div>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			<div className="flex items-center justify-center gap-4 mt-8">
				<Button variant="outline" size="icon" onClick={() => api?.scrollPrev()}>
					<ChevronLeft className="size-4" />
				</Button>
				<div className="flex gap-2">
					{Array.from({ length: count }).map((_, i) => (
						<button
							key={i}
							onClick={() => scrollTo(i)}
							className={`size-2.5 rounded-full transition-all ${
								i === current
									? 'bg-primary w-6'
									: 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
							}`}
						/>
					))}
				</div>
				<Button variant="outline" size="icon" onClick={() => api?.scrollNext()}>
					<ChevronRight className="size-4" />
				</Button>
			</div>
		</div>
	);
};
