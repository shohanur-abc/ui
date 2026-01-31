'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Star } from 'lucide-react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

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
					<Eyebrow text="Reviews" />
					<Title text="Multi-Item Carousel" />
					<Description text="Browse through multiple testimonials at once." />
				</div>

				<TestimonialCarousel
					items={[
						{
							quote: 'Exceptional work quality from start to finish.',
							author: 'Alex Turner',
							role: 'CEO',
							company: 'QualityFirst',
							avatar: 'https://i.pravatar.cc/100?img=45',
							rating: 5,
						},
						{
							quote: "Best agency partnership we've had.",
							author: 'Maria Santos',
							role: 'CTO',
							company: 'PartnerPro',
							avatar: 'https://i.pravatar.cc/100?img=46',
							rating: 5,
						},
						{
							quote: 'Delivered exactly what we needed.',
							author: 'David Chen',
							role: 'VP Product',
							company: 'NeedMet',
							avatar: 'https://i.pravatar.cc/100?img=47',
							rating: 5,
						},
						{
							quote: 'Professional and highly skilled team.',
							author: 'Sarah Kim',
							role: 'CMO',
							company: 'SkillCo',
							avatar: 'https://i.pravatar.cc/100?img=48',
							rating: 5,
						},
						{
							quote: 'Outstanding communication throughout.',
							author: 'James Wilson',
							role: 'PM',
							company: 'CommsPro',
							avatar: 'https://i.pravatar.cc/100?img=49',
							rating: 5,
						},
						{
							quote: 'Creative solutions that work.',
							author: 'Emily Foster',
							role: 'Design Lead',
							company: 'SolutionLab',
							avatar: 'https://i.pravatar.cc/100?img=50',
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

const TestimonialCarousel = ({ items }: { items: TestimonialItem[] }) => (
	<Carousel
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
					className="pl-4 basis-full @md:basis-1/2 @lg:basis-1/3"
				>
					<div className="bg-card border rounded-xl p-6 shadow-sm h-full">
						<div className="flex gap-0.5 mb-4">
							{Array.from({ length: 5 }).map((_, j) => (
								<Star
									key={j}
									className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
								/>
							))}
						</div>
						<Quote className="size-6 text-primary/20 mb-3" />
						<blockquote className="text-sm leading-relaxed mb-5">
							&ldquo;{quote}&rdquo;
						</blockquote>
						<div className="flex items-center gap-3 mt-auto">
							<Avatar className="size-10">
								<AvatarImage src={avatar} />
								<AvatarFallback className="bg-primary text-primary-foreground">
									{author[0]}
								</AvatarFallback>
							</Avatar>
							<div>
								<div className="font-semibold text-sm">{author}</div>
								<div className="text-xs text-muted-foreground">
									{role}, {company}
								</div>
							</div>
						</div>
					</div>
				</CarouselItem>
			))}
		</CarouselContent>
		<div className="flex justify-center gap-2 mt-8">
			<CarouselPrevious className="static translate-y-0" />
			<CarouselNext className="static translate-y-0" />
		</div>
	</Carousel>
);
