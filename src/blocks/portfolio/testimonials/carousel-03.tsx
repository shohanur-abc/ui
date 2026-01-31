'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
					<Title text="Voices of Success" />
				</div>

				<SingleTestimonialCarousel
					items={[
						{
							quote:
								'Working with this team was an absolute pleasure. They took our complex requirements and delivered an elegant solution that exceeded every expectation. The attention to detail and commitment to excellence was evident in every interaction.',
							author: 'Jennifer Morrison',
							role: 'Chief Product Officer, InnovateTech',
							avatar: 'https://i.pravatar.cc/100?img=86',
						},
						{
							quote:
								"The transformation of our digital presence has been remarkable. Our customers love the new experience, and the business results speak for themselves. Couldn't be happier with the partnership.",
							author: 'Andrew Chen',
							role: 'CEO, DigitalFirst',
							avatar: 'https://i.pravatar.cc/100?img=87',
						},
						{
							quote:
								'From the initial consultation to the final delivery, every step was handled with professionalism and expertise. They truly understand what it takes to build great digital products.',
							author: 'Rachel Kim',
							role: 'VP Engineering, CloudScale',
							avatar: 'https://i.pravatar.cc/100?img=88',
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
		{text}
	</h2>
);

const SingleTestimonialCarousel = ({ items }: { items: TestimonialItem[] }) => (
	<Carousel opts={{ loop: true }} className="w-full max-w-4xl mx-auto">
		<CarouselContent>
			{items.map(({ quote, author, role, avatar }, i) => (
				<CarouselItem key={i}>
					<div className="text-center px-4 @md:px-12">
						<Quote className="size-12 @md:size-16 text-primary/20 mx-auto mb-8" />
						<blockquote className="text-xl @md:text-2xl @lg:text-3xl leading-relaxed mb-10">
							&ldquo;{quote}&rdquo;
						</blockquote>
						<div className="flex flex-col items-center">
							<Avatar className="size-16 @md:size-20 ring-4 ring-muted mb-4">
								<AvatarImage src={avatar} />
								<AvatarFallback className="text-xl bg-primary text-primary-foreground">
									{author[0]}
								</AvatarFallback>
							</Avatar>
							<div className="font-semibold text-lg @md:text-xl">{author}</div>
							<div className="text-muted-foreground">{role}</div>
						</div>
					</div>
				</CarouselItem>
			))}
		</CarouselContent>
		<CarouselPrevious className="-left-4 @md:-left-12" />
		<CarouselNext className="-right-4 @md:-right-12" />
	</Carousel>
);
