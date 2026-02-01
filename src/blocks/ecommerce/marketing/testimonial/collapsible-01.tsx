'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, Layers, Quote, Star } from 'lucide-react';
import { useState } from 'react';

interface TestimonialItem {
	quote: string;
	fullQuote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
}

const SectionHeader = ({
	badge,
	title,
	highlight,
	description,
}: {
	badge: string;
	title: string;
	highlight: string;
	description: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Layers className="size-3 text-primary" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{description}
		</p>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 mb-3">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const CollapsibleCard = ({ item }: { item: TestimonialItem }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
			<CardContent className="p-5 @lg:p-6">
				<div className="flex items-center justify-between mb-3">
					<Quote className="size-7 text-primary/20" />
					<StarRating rating={item.rating} />
				</div>

				<Collapsible open={isOpen} onOpenChange={setIsOpen}>
					<p className="text-foreground leading-relaxed mb-3">
						"{isOpen ? item.fullQuote : item.quote}"
					</p>
					<CollapsibleContent>
						<div className="pt-3 border-t border-border/30 mb-3">
							<p className="text-muted-foreground text-sm italic">
								Read the full testimonial above
							</p>
						</div>
					</CollapsibleContent>
					<CollapsibleTrigger className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
						{isOpen ? 'Show less' : 'Read more'}
						<ChevronDown
							className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
						/>
					</CollapsibleTrigger>
				</Collapsible>

				<div className="flex items-center gap-3 pt-4 mt-4 border-t border-border/50">
					<Avatar className="size-10 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold text-sm text-foreground">
							{item.author}
						</p>
						<p className="text-xs text-muted-foreground">
							{item.role} · {item.company}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote: 'This platform has completely revolutionized how we approach...',
			fullQuote:
				'This platform has completely revolutionized how we approach customer engagement. The tools are intuitive, the support is exceptional, and the results speak for themselves. Our team productivity has increased by 45% since implementation.',
			author: 'Grace Wilson',
			role: 'Marketing Director',
			company: 'MarketFirst',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'GW',
			rating: 5,
		},
		{
			quote: 'We evaluated over a dozen solutions before choosing this one...',
			fullQuote:
				'We evaluated over a dozen solutions before choosing this one, and it was clearly the right decision. The implementation was smooth, the learning curve minimal, and the value delivered has far exceeded our initial projections.',
			author: 'Henry Park',
			role: 'CTO',
			company: 'TechEval',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'HP',
			rating: 5,
		},
		{
			quote: 'The customer support team deserves special recognition...',
			fullQuote:
				'The customer support team deserves special recognition. They have been responsive, knowledgeable, and genuinely invested in our success. Every question is answered promptly and every issue resolved quickly.',
			author: 'Irene Chen',
			role: 'Operations Lead',
			company: 'SupportFirst',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'IC',
			rating: 5,
		},
		{
			quote: 'Our ROI has been exceptional. Within the first quarter...',
			fullQuote:
				'Our ROI has been exceptional. Within the first quarter, we saw a 200% return on our investment. The platform has become central to our operations and continues to deliver value month after month.',
			author: 'Jack Martinez',
			role: 'CFO',
			company: 'ROI Masters',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'JM',
			rating: 5,
		},
		{
			quote: 'Scalability was our primary concern, and this platform...',
			fullQuote:
				'Scalability was our primary concern, and this platform has handled our growth flawlessly. We have gone from 100 to 10,000 users without any performance degradation. Truly enterprise-grade.',
			author: 'Karen Lee',
			role: 'VP Engineering',
			company: 'ScaleUp',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'KL',
			rating: 5,
		},
		{
			quote: 'The integration capabilities are outstanding. We connected...',
			fullQuote:
				'The integration capabilities are outstanding. We connected with our existing tools in days, not weeks. The API documentation is excellent and the technical team was always available to help.',
			author: 'Leo Brown',
			role: 'Integration Lead',
			company: 'ConnectPro',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'LB',
			rating: 5,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Expandable"
					title="In-Depth"
					highlight="Reviews"
					description="Click to expand and read the full testimonial from each customer."
				/>

				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					{testimonials.map((item, index) => (
						<CollapsibleCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
