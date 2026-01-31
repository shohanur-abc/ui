'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

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
					<Eyebrow text="Client Stories" />
					<Title text="Tabbed Showcase" />
					<Description text="Navigate through testimonials with arrow controls." />
				</div>

				<PaginatedTabs
					items={[
						{
							quote:
								'The team delivered a world-class product. Our users love the new interface.',
							author: 'Christopher Lee',
							role: 'Product Manager',
							company: 'ProductCo',
							avatar: 'https://i.pravatar.cc/100?img=37',
							rating: 5,
						},
						{
							quote:
								'Incredible attention to detail and commitment to quality. Highly recommend.',
							author: 'Amanda Wright',
							role: 'Design Director',
							company: 'DesignStudio',
							avatar: 'https://i.pravatar.cc/100?img=38',
							rating: 5,
						},
						{
							quote:
								"Best development partner we've ever worked with. On time and on budget.",
							author: 'Jonathan Price',
							role: 'CTO',
							company: 'TechCorp',
							avatar: 'https://i.pravatar.cc/100?img=39',
							rating: 5,
						},
						{
							quote:
								'Our conversion rate increased by 150% after the redesign. Amazing work!',
							author: 'Nicole Brown',
							role: 'CMO',
							company: 'GrowthLab',
							avatar: 'https://i.pravatar.cc/100?img=40',
							rating: 5,
						},
						{
							quote:
								'Professional, creative, and incredibly talented team. A true pleasure.',
							author: 'Daniel Kim',
							role: 'CEO',
							company: 'InnovateTech',
							avatar: 'https://i.pravatar.cc/100?img=41',
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

const PaginatedTabs = ({ items }: { items: TestimonialItem[] }) => {
	const [active, setActive] = useState(0);
	const current = items[active];

	const prev = () => setActive((i) => (i === 0 ? items.length - 1 : i - 1));
	const next = () => setActive((i) => (i === items.length - 1 ? 0 : i + 1));

	if (!current) return null;

	return (
		<div className="max-w-4xl mx-auto">
			<div className="bg-muted/50 rounded-2xl p-8 @md:p-12 text-center relative">
				<Quote className="size-12 text-primary/20 mx-auto mb-6" />

				<div className="flex justify-center gap-1 mb-6">
					{Array.from({ length: 5 }).map((_, j) => (
						<Star
							key={j}
							className={`size-5 ${j < current.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
						/>
					))}
				</div>

				<blockquote className="text-xl @md:text-2xl @lg:text-3xl font-medium leading-relaxed mb-8">
					&ldquo;{current.quote}&rdquo;
				</blockquote>

				<div className="flex items-center justify-center gap-4 mb-8">
					<Avatar className="size-14 ring-2 ring-primary/20">
						<AvatarImage src={current.avatar} />
						<AvatarFallback className="bg-primary text-primary-foreground">
							{current.author[0]}
						</AvatarFallback>
					</Avatar>
					<div className="text-left">
						<div className="font-semibold text-lg">{current.author}</div>
						<div className="text-muted-foreground">
							{current.role}, {current.company}
						</div>
					</div>
				</div>

				<div className="flex items-center justify-center gap-4">
					<Button variant="outline" size="icon" onClick={prev}>
						<ChevronLeft className="size-4" />
					</Button>
					<div className="flex gap-1.5">
						{items.map((_, i) => (
							<button
								key={i}
								onClick={() => setActive(i)}
								className={`size-2 rounded-full transition-colors ${i === active ? 'bg-primary' : 'bg-muted-foreground/30'}`}
							/>
						))}
					</div>
					<Button variant="outline" size="icon" onClick={next}>
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};
