'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { Quote } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	avatar?: string;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Testimonials" />
					<Title text="What Clients Say" />
					<Description text="Slide through stories from our satisfied clients." />
				</div>

				<TestimonialCarousel
					items={[
						{
							quote:
								'The best investment we made this year. Our new website has completely transformed how customers perceive our brand.',
							author: 'Michelle Thompson',
							role: 'Marketing Director, BrandCo',
							avatar: 'https://i.pravatar.cc/100?img=77',
						},
						{
							quote:
								'Incredible attention to detail and unwavering commitment to quality. They delivered exactly what we needed.',
							author: 'James Rodriguez',
							role: 'Founder, TechStart',
							avatar: 'https://i.pravatar.cc/100?img=78',
						},
						{
							quote:
								'Professional, creative, and technically excellent. A partner we can rely on for all our digital needs.',
							author: 'Sarah Kim',
							role: 'CEO, DesignHub',
							avatar: 'https://i.pravatar.cc/100?img=79',
						},
						{
							quote:
								'The project exceeded every expectation. Our conversion rates have doubled since the launch.',
							author: 'David Chen',
							role: 'VP Product, GrowthLabs',
							avatar: 'https://i.pravatar.cc/100?img=80',
						},
						{
							quote:
								'A seamless experience from start to finish. Communication was excellent throughout the project.',
							author: 'Emily Foster',
							role: 'Operations Lead, ScaleUp',
							avatar: 'https://i.pravatar.cc/100?img=81',
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

const TestimonialCarousel = ({ items }: { items: TestimonialItem[] }) => (
	<Carousel
		opts={{ align: 'start', loop: true }}
		className="w-full max-w-5xl mx-auto"
	>
		<CarouselContent className="-ml-4">
			{items.map(({ quote, author, role, avatar }, i) => (
				<CarouselItem key={i} className="pl-4 @md:basis-1/2 @lg:basis-1/3">
					<Card className="h-full">
						<CardContent className="p-6 flex flex-col h-full min-h-[280px]">
							<Quote className="size-8 text-primary/30 mb-4" />
							<blockquote className="text-base leading-relaxed mb-6 flex-1">
								&ldquo;{quote}&rdquo;
							</blockquote>
							<div className="flex items-center gap-3 pt-4 border-t">
								<Avatar className="size-10">
									<AvatarImage src={avatar} />
									<AvatarFallback className="bg-primary text-primary-foreground text-sm">
										{author[0]}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-semibold text-sm">{author}</div>
									<div className="text-xs text-muted-foreground">{role}</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</CarouselItem>
			))}
		</CarouselContent>
		<CarouselPrevious className="-left-12 hidden @lg:flex" />
		<CarouselNext className="-right-12 hidden @lg:flex" />
	</Carousel>
);
