'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from '@/components/ui/carousel';
import { useState, useEffect } from 'react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	image?: string;
}

export default function Main() {
	return (
		<section className="@container bg-gradient-to-b from-muted/50 to-background">
			<div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16 px-4 @sm:px-6 @2xl:px-8">
					<Eyebrow text="Client Stories" />
					<Title text="Full Width Carousel" />
					<Description text="Immersive full-width testimonial experience." />
				</div>

				<FullWidthCarousel
					items={[
						{
							quote:
								"Working with this team was a transformative experience for our entire organization. They didn't just deliver a product – they delivered a vision that exceeded all expectations.",
							author: 'Victoria Adams',
							role: 'CEO',
							company: 'TransformOrg',
							avatar: 'https://i.pravatar.cc/100?img=62',
						},
						{
							quote:
								'The level of craftsmanship and attention to detail is unparalleled. Every pixel, every interaction was carefully considered and perfectly executed.',
							author: 'Marcus Johnson',
							role: 'Design Director',
							company: 'CraftPerfect',
							avatar: 'https://i.pravatar.cc/100?img=63',
						},
						{
							quote:
								'From initial concept to final launch, the communication was exceptional. We always knew exactly where we stood and what was coming next.',
							author: 'Rachel Green',
							role: 'Product Owner',
							company: 'ClearComms',
							avatar: 'https://i.pravatar.cc/100?img=64',
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

const FullWidthCarousel = ({ items }: { items: TestimonialItem[] }) => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!api) return;
		const onSelect = () => setCurrent(api.selectedScrollSnap());
		api.on('select', onSelect);
		return () => {
			api.off('select', onSelect);
		};
	}, [api]);

	return (
		<div className="relative">
			<Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
				<CarouselContent>
					{items.map(({ quote, author, role, company, avatar }, i) => (
						<CarouselItem key={i}>
							<div className="max-w-4xl mx-auto text-center px-4 @sm:px-6 @2xl:px-8">
								<Quote className="size-12 @md:size-16 text-primary/20 mx-auto mb-6 @md:mb-8" />
								<blockquote className="text-xl @md:text-2xl @lg:text-3xl @xl:text-4xl font-medium leading-relaxed mb-8 @md:mb-10">
									&ldquo;{quote}&rdquo;
								</blockquote>
								<div className="flex flex-col items-center">
									<Avatar className="size-16 @md:size-20 ring-4 ring-primary/20 mb-4">
										<AvatarImage src={avatar} />
										<AvatarFallback className="bg-primary text-primary-foreground text-xl">
											{author[0]}
										</AvatarFallback>
									</Avatar>
									<div className="font-bold text-lg @md:text-xl">{author}</div>
									<div className="text-muted-foreground">
										{role}, {company}
									</div>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			<div className="flex justify-center gap-4 mt-8">
				<Button variant="outline" size="icon" onClick={() => api?.scrollPrev()}>
					<ArrowLeft className="size-4" />
				</Button>
				<div className="flex items-center gap-2">
					{items.map((_, i) => (
						<button
							key={i}
							onClick={() => api?.scrollTo(i)}
							className={`size-2.5 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-muted-foreground/30'}`}
						/>
					))}
				</div>
				<Button variant="outline" size="icon" onClick={() => api?.scrollNext()}>
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</div>
	);
};
