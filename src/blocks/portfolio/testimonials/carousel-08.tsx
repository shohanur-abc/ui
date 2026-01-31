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
import { Star, Quote } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	avatar?: string;
	rating: number;
	category: string;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Reviews" />
					<Title text="Project Reviews" />
					<Description text="Feedback organized by project type." />
				</div>

				<TestimonialCarousel
					items={[
						{
							quote:
								'The website redesign increased our conversion rate by 200%. Absolutely worth every penny.',
							author: 'David Kim',
							role: 'Marketing VP, ConvertPro',
							avatar: 'https://i.pravatar.cc/100?img=7',
							rating: 5,
							category: 'Web Design',
						},
						{
							quote:
								'Our mobile app became the most downloaded in its category within the first month.',
							author: 'Jennifer Liu',
							role: 'Product Lead, AppMaster',
							avatar: 'https://i.pravatar.cc/100?img=8',
							rating: 5,
							category: 'Mobile App',
						},
						{
							quote:
								'The e-commerce platform handles 100k orders daily without any issues. Rock solid.',
							author: 'Michael Foster',
							role: 'CTO, ShopScale',
							avatar: 'https://i.pravatar.cc/100?img=9',
							rating: 5,
							category: 'E-commerce',
						},
						{
							quote:
								'Our brand refresh resulted in 40% better recognition scores. Exceptional creative work.',
							author: 'Emily Chen',
							role: 'Brand Director, IdentityFirst',
							avatar: 'https://i.pravatar.cc/100?img=10',
							rating: 5,
							category: 'Branding',
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
		className="w-full max-w-6xl mx-auto"
	>
		<CarouselContent className="-ml-4">
			{items.map(({ quote, author, role, avatar, rating, category }, i) => (
				<CarouselItem key={i} className="pl-4 @md:basis-1/2">
					<Card className="h-full">
						<CardContent className="p-6 flex flex-col h-full">
							<div className="flex items-center justify-between mb-4">
								<Badge variant="secondary">{category}</Badge>
								<div className="flex gap-0.5">
									{Array.from({ length: 5 }).map((_, j) => (
										<Star
											key={j}
											className={`size-3.5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
										/>
									))}
								</div>
							</div>
							<Quote className="size-8 text-primary/20 mb-3" />
							<blockquote className="text-base @md:text-lg leading-relaxed mb-6 flex-1">
								&ldquo;{quote}&rdquo;
							</blockquote>
							<div className="flex items-center gap-3 pt-4 border-t">
								<Avatar className="size-11">
									<AvatarImage src={avatar} />
									<AvatarFallback className="bg-primary text-primary-foreground">
										{author[0]}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-semibold">{author}</div>
									<div className="text-sm text-muted-foreground">{role}</div>
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
