'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

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
					<Title text="Compact Cards" />
					<Description text="Space-efficient testimonial cards." />
				</div>

				<CompactCards
					items={[
						{
							quote: 'Exceptional quality.',
							author: 'Alex T.',
							role: 'CEO',
							company: 'Tech',
							avatar: 'https://i.pravatar.cc/100?img=70',
							rating: 5,
						},
						{
							quote: 'Highly recommend!',
							author: 'Maria S.',
							role: 'CTO',
							company: 'Cloud',
							avatar: 'https://i.pravatar.cc/100?img=71',
							rating: 5,
						},
						{
							quote: 'Best agency ever.',
							author: 'David C.',
							role: 'VP',
							company: 'Scale',
							avatar: 'https://i.pravatar.cc/100?img=72',
							rating: 5,
						},
						{
							quote: 'Great experience.',
							author: 'Sarah K.',
							role: 'PM',
							company: 'Growth',
							avatar: 'https://i.pravatar.cc/100?img=73',
							rating: 5,
						},
						{
							quote: 'Outstanding work!',
							author: 'James W.',
							role: 'Lead',
							company: 'Design',
							avatar: 'https://i.pravatar.cc/100?img=74',
							rating: 5,
						},
						{
							quote: 'A+ partnership.',
							author: 'Emily F.',
							role: 'Dir',
							company: 'Brand',
							avatar: 'https://i.pravatar.cc/100?img=75',
							rating: 5,
						},
						{
							quote: '10/10 recommend.',
							author: 'Mike P.',
							role: 'CEO',
							company: 'Start',
							avatar: 'https://i.pravatar.cc/100?img=76',
							rating: 5,
						},
						{
							quote: 'Pure excellence.',
							author: 'Lisa W.',
							role: 'CTO',
							company: 'Data',
							avatar: 'https://i.pravatar.cc/100?img=77',
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

const CompactCards = ({ items }: { items: TestimonialItem[] }) => (
	<ul className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
		{items.map(({ quote, author, role, company, avatar, rating }, i) => (
			<li
				key={i}
				className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
			>
				<div className="flex gap-0.5 mb-2">
					{Array.from({ length: 5 }).map((_, j) => (
						<Star
							key={j}
							className={`size-2.5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
						/>
					))}
				</div>
				<blockquote className="text-xs font-medium mb-3">
					&ldquo;{quote}&rdquo;
				</blockquote>
				<div className="flex items-center gap-2">
					<Avatar className="size-6">
						<AvatarImage src={avatar} />
						<AvatarFallback className="bg-muted text-[10px]">
							{author[0]}
						</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-medium text-xs">{author}</div>
						<div className="text-[10px] text-muted-foreground">
							{role}, {company}
						</div>
					</div>
				</div>
			</li>
		))}
	</ul>
);
