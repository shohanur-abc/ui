'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Quote, Star, ArrowRight } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating: number;
	projectImage?: string;
	projectName: string;
}

export default function Main() {
	return (
		<section className="@container bg-gradient-to-b from-muted/30 to-background">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Case Study" />
					<Title text="Featured 9" />
					<Description text="Featured project with client testimonial." />
				</div>

				<ProjectFeatured
					item={{
						quote:
							'The redesigned platform has become central to our operations. User adoption exceeded our projections.',
						author: 'Daniel Kim',
						role: 'Chief Product Officer',
						company: 'ProductFirst',
						avatar: 'https://i.pravatar.cc/100?img=19',
						rating: 5,
						projectImage:
							'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
						projectName: 'Enterprise SaaS Platform',
					}}
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

const ProjectFeatured = ({ item }: { item: TestimonialItem }) => (
	<div className="max-w-6xl mx-auto">
		<div className="grid @lg:grid-cols-5 gap-8 items-center">
			<div className="@lg:col-span-3 relative">
				<div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
					<img
						src={item.projectImage}
						alt={item.projectName}
						className="w-full h-full object-cover"
					/>
				</div>
				<Badge className="absolute bottom-4 left-4 bg-background/90 text-foreground border">
					{item.projectName}
				</Badge>
			</div>

			<div className="@lg:col-span-2">
				<div className="flex gap-0.5 mb-4">
					{Array.from({ length: 5 }).map((_, j) => (
						<Star
							key={j}
							className={`size-5 ${j < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
						/>
					))}
				</div>

				<Quote className="size-8 text-primary/20 mb-4" />

				<blockquote className="text-lg @md:text-xl leading-relaxed mb-6">
					&ldquo;{item.quote}&rdquo;
				</blockquote>

				<div className="flex items-center gap-4 mb-6">
					<Avatar className="size-12 ring-2 ring-primary/20">
						<AvatarImage src={item.avatar} />
						<AvatarFallback className="bg-primary text-primary-foreground">
							{item.author[0]}
						</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-bold">{item.author}</div>
						<div className="text-sm text-muted-foreground">
							{item.role}, {item.company}
						</div>
					</div>
				</div>

				<Button variant="outline">
					View Case Study <ArrowRight className="ml-2 size-4" />
				</Button>
			</div>
		</div>
	</div>
);
