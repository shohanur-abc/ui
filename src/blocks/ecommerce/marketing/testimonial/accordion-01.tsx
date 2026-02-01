'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { ListCollapse, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	id: string;
	title: string;
	quote: string;
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
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<ListCollapse className="size-3" />
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
	<div className="flex gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const AuthorInfo = ({ item }: { item: TestimonialItem }) => (
	<div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
		<Avatar className="size-10 ring-2 ring-primary/10">
			<AvatarImage src={item.avatar} alt={item.author} />
			<AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
				{item.initials}
			</AvatarFallback>
		</Avatar>
		<div>
			<p className="font-semibold text-sm text-foreground">{item.author}</p>
			<p className="text-xs text-muted-foreground">
				{item.role} · {item.company}
			</p>
		</div>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			id: 'item-1',
			title: 'How did implementation go?',
			quote:
				'Implementation was smoother than expected. The team provided excellent documentation and hands-on support throughout the process. We were fully operational in under a week.',
			author: 'Kelly Chen',
			role: 'IT Director',
			company: 'ImplementFirst',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'KC',
			rating: 5,
		},
		{
			id: 'item-2',
			title: 'What about the learning curve?',
			quote:
				'The learning curve was minimal. The interface is intuitive and the training resources are comprehensive. Our team was productive from day one.',
			author: 'Leo Park',
			role: 'Training Manager',
			company: 'LearnQuick',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'LP',
			rating: 5,
		},
		{
			id: 'item-3',
			title: 'How is the customer support?',
			quote:
				'Customer support is exceptional. They respond quickly, understand our technical needs, and always follow through until issues are fully resolved.',
			author: 'Maria Foster',
			role: 'Operations Lead',
			company: 'SupportFirst',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'MF',
			rating: 5,
		},
		{
			id: 'item-4',
			title: 'What results have you seen?',
			quote:
				'Results exceeded our projections. We saw a 45% increase in productivity, 30% cost reduction, and significantly improved team satisfaction.',
			author: 'Nathan Lee',
			role: 'CEO',
			company: 'ResultsCorp',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'NL',
			rating: 5,
		},
		{
			id: 'item-5',
			title: 'Would you recommend this solution?',
			quote:
				'Absolutely. We have already recommended it to several partners and colleagues. It is rare to find a solution that delivers so consistently.',
			author: 'Olivia Kim',
			role: 'VP Operations',
			company: 'RecommendPro',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'OK',
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
					badge="FAQ Style"
					title="Questions"
					highlight="Answered"
					description="Real answers from real customers to the questions that matter most."
				/>

				<div className="max-w-3xl mx-auto">
					<Accordion type="single" collapsible className="space-y-4">
						{testimonials.map((item) => (
							<AccordionItem
								key={item.id}
								value={item.id}
								className="border border-border/50 rounded-lg px-5 data-[state=open]:bg-muted/30"
							>
								<AccordionTrigger className="hover:no-underline py-4">
									<span className="font-semibold text-left">{item.title}</span>
								</AccordionTrigger>
								<AccordionContent className="pb-5">
									<div className="flex items-center justify-between mb-3">
										<Quote className="size-6 text-primary/20" />
										<StarRating rating={item.rating} />
									</div>
									<p className="text-foreground leading-relaxed">
										"{item.quote}"
									</p>
									<AuthorInfo item={item} />
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
