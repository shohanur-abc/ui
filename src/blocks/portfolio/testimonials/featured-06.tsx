'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, Award } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating: number;
	award?: string;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Award Winners" />
					<Title text="Featured 6" />
					<Description text="Award-winning client success stories." />
				</div>

				<AwardFeatured
					item={{
						quote:
							"This project won the Webby Award for Best E-commerce Platform. The team's dedication to excellence made this possible. From initial strategy to final launch, every step was executed flawlessly.",
						author: 'Victoria Adams',
						role: 'CEO',
						company: 'AwardWinner Inc',
						avatar: 'https://i.pravatar.cc/100?img=16',
						rating: 5,
						award: 'Webby Award Winner 2024',
					}}
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

const AwardFeatured = ({ item }: { item: TestimonialItem }) => (
	<div className="max-w-4xl mx-auto">
		<div className="bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-orange-500/10 border-2 border-yellow-500/30 rounded-2xl p-8 @md:p-12 relative overflow-hidden">
			<div className="absolute top-4 right-4 @md:top-8 @md:right-8">
				<div className="flex items-center gap-2 bg-yellow-500 text-yellow-950 px-3 py-1.5 rounded-full text-sm font-medium">
					<Award className="size-4" />
					<span>{item.award}</span>
				</div>
			</div>

			<div className="flex gap-0.5 mb-6">
				{Array.from({ length: 5 }).map((_, j) => (
					<Star
						key={j}
						className={`size-6 ${j < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
					/>
				))}
			</div>

			<Quote className="size-12 text-yellow-500/30 mb-6" />

			<blockquote className="text-xl @md:text-2xl @lg:text-3xl font-medium leading-relaxed mb-8">
				&ldquo;{item.quote}&rdquo;
			</blockquote>

			<div className="flex items-center gap-4">
				<Avatar className="size-16 ring-4 ring-yellow-500/30">
					<AvatarImage src={item.avatar} />
					<AvatarFallback className="bg-yellow-500 text-yellow-950 text-xl">
						{item.author[0]}
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-bold text-xl">{item.author}</div>
					<div className="text-muted-foreground">
						{item.role}, {item.company}
					</div>
				</div>
			</div>
		</div>
	</div>
);
