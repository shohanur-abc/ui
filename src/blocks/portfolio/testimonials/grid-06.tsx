'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Star } from 'lucide-react';

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
					<Title text="Grid Layout 6" />
					<Description text="A clean 2x3 grid testimonial layout." />
				</div>

				<TestimonialGrid
					items={[
						{
							quote: 'Exceeded expectations in every way possible.',
							author: 'Alex Turner',
							role: 'CEO',
							company: 'TechStart',
							avatar: 'https://i.pravatar.cc/100?img=14',
							rating: 5,
						},
						{
							quote: 'Professional and reliable team to work with.',
							author: 'Maria Santos',
							role: 'CTO',
							company: 'CloudFirst',
							avatar: 'https://i.pravatar.cc/100?img=15',
							rating: 5,
						},
						{
							quote: 'Outstanding results and great communication.',
							author: 'David Chen',
							role: 'VP Product',
							company: 'ProductCo',
							avatar: 'https://i.pravatar.cc/100?img=16',
							rating: 5,
						},
						{
							quote: 'Best investment we made this quarter.',
							author: 'Sarah Kim',
							role: 'CMO',
							company: 'GrowthLab',
							avatar: 'https://i.pravatar.cc/100?img=17',
							rating: 5,
						},
						{
							quote: 'Creative solutions that actually work.',
							author: 'James Wilson',
							role: 'Director',
							company: 'DesignHub',
							avatar: 'https://i.pravatar.cc/100?img=18',
							rating: 5,
						},
						{
							quote: 'A true partner in our digital journey.',
							author: 'Emily Foster',
							role: 'Founder',
							company: 'StartupCo',
							avatar: 'https://i.pravatar.cc/100?img=19',
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

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
	<ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
		{items.map(({ quote, author, role, company, avatar, rating }, i) => (
			<li
				key={i}
				className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
			>
				<div className="flex gap-0.5 mb-4">
					{Array.from({ length: 5 }).map((_, j) => (
						<Star
							key={j}
							className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
						/>
					))}
				</div>
				<Quote className="size-6 text-primary/20 mb-3" />
				<blockquote className="text-sm @md:text-base leading-relaxed mb-5">
					&ldquo;{quote}&rdquo;
				</blockquote>
				<div className="flex items-center gap-3">
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
			</li>
		))}
	</ul>
);
