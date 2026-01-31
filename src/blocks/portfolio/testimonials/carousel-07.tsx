'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Quote } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	avatar?: string;
}

export default function Main() {
	return (
		<section className="@container bg-primary text-primary-foreground">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="What They Say" />
					<Title text="Client Testimonials" />
				</div>

				<TestimonialCarousel
					items={[
						{
							quote:
								'An incredible team that delivered results beyond our expectations. The collaboration was seamless and the outcome exceptional.',
							author: 'Alexandra Reynolds',
							role: 'CEO, InnovateCorp',
							avatar: 'https://i.pravatar.cc/100?img=4',
						},
						{
							quote:
								'Technical excellence combined with creative vision. They truly understood our needs and delivered a perfect solution.',
							author: 'Marcus Chen',
							role: 'CTO, TechForward',
							avatar: 'https://i.pravatar.cc/100?img=5',
						},
						{
							quote:
								'The attention to detail and commitment to quality was outstanding. Our platform has never performed better.',
							author: 'Sarah Williams',
							role: 'VP Product, CloudScale',
							avatar: 'https://i.pravatar.cc/100?img=6',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="secondary">{text}</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
		{text}
	</h2>
);

const TestimonialCarousel = ({ items }: { items: TestimonialItem[] }) => (
	<Carousel
		opts={{ loop: true }}
		plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
		className="w-full max-w-4xl mx-auto"
	>
		<CarouselContent>
			{items.map(({ quote, author, role, avatar }, i) => (
				<CarouselItem key={i}>
					<div className="text-center px-4 @md:px-12">
						<Quote className="size-12 @md:size-16 opacity-30 mx-auto mb-8" />
						<blockquote className="text-xl @md:text-2xl @lg:text-3xl leading-relaxed mb-10 opacity-95">
							&ldquo;{quote}&rdquo;
						</blockquote>
						<div className="flex flex-col items-center">
							<Avatar className="size-16 @md:size-20 ring-4 ring-primary-foreground/20 mb-4">
								<AvatarImage src={avatar} />
								<AvatarFallback className="text-xl bg-primary-foreground text-primary">
									{author[0]}
								</AvatarFallback>
							</Avatar>
							<div className="font-semibold text-lg @md:text-xl">{author}</div>
							<div className="opacity-80">{role}</div>
						</div>
					</div>
				</CarouselItem>
			))}
		</CarouselContent>
	</Carousel>
);
