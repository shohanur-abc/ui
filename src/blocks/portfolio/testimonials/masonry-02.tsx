import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

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
					<Title text="Client Reviews" />
					<Description text="Dynamic masonry layout showcasing diverse testimonials." />
				</div>

				<MasonryGrid
					items={[
						{
							quote: 'Outstanding work! Delivered ahead of schedule.',
							author: 'Alex Turner',
							role: 'CTO, FastTrack',
							avatar: 'https://i.pravatar.cc/100?img=27',
							rating: 5,
						},
						{
							quote:
								'The attention to detail was remarkable. Every pixel was crafted with purpose and the final result exceeded all expectations.',
							author: 'Sarah Martinez',
							role: 'Design Director, CreativeHub',
							avatar: 'https://i.pravatar.cc/100?img=28',
							rating: 5,
						},
						{
							quote:
								'Professional and reliable. Would definitely work together again on future projects.',
							author: 'James Chen',
							role: 'Product Manager, TechStart',
							avatar: 'https://i.pravatar.cc/100?img=29',
							rating: 5,
						},
						{
							quote: 'Exceptional!',
							author: 'Emily Brown',
							role: 'CEO, StartupX',
							avatar: 'https://i.pravatar.cc/100?img=30',
							rating: 5,
						},
						{
							quote:
								'The project was a complete success. Our conversion rates doubled and user engagement is at an all-time high.',
							author: 'Michael Foster',
							role: 'Marketing VP, GrowthCo',
							avatar: 'https://i.pravatar.cc/100?img=31',
							rating: 5,
						},
						{
							quote: 'Best decision we made!',
							author: 'Lisa Kim',
							role: 'Founder, AppFlow',
							avatar: 'https://i.pravatar.cc/100?img=32',
							rating: 5,
						},
						{
							quote:
								'A true partner in every sense. They understood our vision and brought it to life with expertise and creativity that transformed our business.',
							author: 'Robert Wilson',
							role: 'CEO, InnovateCorp',
							avatar: 'https://i.pravatar.cc/100?img=33',
							rating: 5,
						},
						{
							quote:
								'Technical excellence combined with creative problem-solving.',
							author: 'Jennifer Lee',
							role: 'VP Engineering, DataFlow',
							avatar: 'https://i.pravatar.cc/100?img=34',
							rating: 5,
						},
						{
							quote: 'Incredible results!',
							author: 'David Park',
							role: 'COO, ScaleUp',
							avatar: 'https://i.pravatar.cc/100?img=35',
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

const MasonryGrid = ({ items }: { items: TestimonialItem[] }) => (
	<div className="columns-1 @sm:columns-2 @lg:columns-3 @xl:columns-4 gap-4 space-y-4">
		{items.map(({ quote, author, role, avatar, rating }, i) => (
			<Card
				key={i}
				className="break-inside-avoid hover:shadow-lg transition-shadow duration-300"
			>
				<CardContent className="p-5">
					<div className="flex gap-0.5 mb-3">
						{Array.from({ length: 5 }).map((_, j) => (
							<Star
								key={j}
								className={`size-3.5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
							/>
						))}
					</div>
					<blockquote className="text-sm leading-relaxed mb-4">
						&ldquo;{quote}&rdquo;
					</blockquote>
					<div className="flex items-center gap-2.5">
						<Avatar className="size-8">
							<AvatarImage src={avatar} />
							<AvatarFallback className="text-xs">{author[0]}</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-medium text-sm">{author}</div>
							<div className="text-xs text-muted-foreground">{role}</div>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
