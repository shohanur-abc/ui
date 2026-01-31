'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Star } from 'lucide-react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating: number;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Testimonials" />
					<Title text="Auto-Scroll Carousel" />
					<Description text="Continuously scrolling client testimonials." />
				</div>

				<AutoScrollCarousel
					items={[
						{
							quote: 'Phenomenal results in record time.',
							author: 'Michael Torres',
							role: 'CEO',
							company: 'RecordTime',
							avatar: 'https://i.pravatar.cc/100?img=56',
							rating: 5,
						},
						{
							quote: 'The best decision we made this year.',
							author: 'Sarah Williams',
							role: 'COO',
							company: 'BestChoice',
							avatar: 'https://i.pravatar.cc/100?img=57',
							rating: 5,
						},
						{
							quote: 'Professional, creative, reliable.',
							author: 'Robert Chen',
							role: 'Founder',
							company: 'ReliableCo',
							avatar: 'https://i.pravatar.cc/100?img=58',
							rating: 5,
						},
						{
							quote: 'Exceeded every expectation we had.',
							author: 'Jennifer Lee',
							role: 'VP Marketing',
							company: 'ExpectMax',
							avatar: 'https://i.pravatar.cc/100?img=59',
							rating: 5,
						},
						{
							quote: 'A true partner in our success.',
							author: 'David Kim',
							role: 'CTO',
							company: 'SuccessPro',
							avatar: 'https://i.pravatar.cc/100?img=60',
							rating: 5,
						},
						{
							quote: 'Outstanding attention to detail.',
							author: 'Amanda Wright',
							role: 'Design Director',
							company: 'DetailPro',
							avatar: 'https://i.pravatar.cc/100?img=61',
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

const AutoScrollCarousel = ({ items }: { items: TestimonialItem[] }) => {
	const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

	return (
		<Carousel
			plugins={[plugin.current]}
			opts={{
				align: 'start',
				loop: true,
			}}
			className="w-full max-w-6xl mx-auto"
		>
			<CarouselContent className="-ml-4">
				{items.map(({ quote, author, role, company, avatar, rating }, i) => (
					<CarouselItem
						key={i}
						className="pl-4 basis-full @sm:basis-1/2 @lg:basis-1/3"
					>
						<div className="bg-card border rounded-xl p-5 shadow-sm h-full">
							<div className="flex gap-0.5 mb-3">
								{Array.from({ length: 5 }).map((_, j) => (
									<Star
										key={j}
										className={`size-3.5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
									/>
								))}
							</div>
							<Quote className="size-5 text-primary/20 mb-2" />
							<blockquote className="text-sm leading-relaxed mb-4">
								&ldquo;{quote}&rdquo;
							</blockquote>
							<div className="flex items-center gap-2.5">
								<Avatar className="size-9">
									<AvatarImage src={avatar} />
									<AvatarFallback className="bg-primary text-primary-foreground">
										{author[0]}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium text-sm">{author}</div>
									<div className="text-xs text-muted-foreground">
										{role}, {company}
									</div>
								</div>
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};
