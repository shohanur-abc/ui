'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	ChevronsUpDown,
	MessageSquare,
	Quote,
	Star,
	Plus,
	Minus,
} from 'lucide-react';
import { useState } from 'react';

interface TestimonialItem {
	question: string;
	answer: string;
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
}: {
	badge: string;
	title: string;
	highlight: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="secondary" className="mb-4 gap-2">
			<MessageSquare className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
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

const QACard = ({ item }: { item: TestimonialItem }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<CollapsibleTrigger className="w-full text-left">
					<CardContent className="p-5 @lg:p-6">
						<div className="flex items-start gap-4">
							<div
								className={`size-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
									isOpen
										? 'bg-primary text-primary-foreground'
										: 'bg-muted text-muted-foreground'
								}`}
							>
								{isOpen ? (
									<Minus className="size-4" />
								) : (
									<Plus className="size-4" />
								)}
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-foreground">
									{item.question}
								</h3>
							</div>
						</div>
					</CardContent>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<CardContent className="pt-0 pb-5 px-5 @lg:px-6">
						<div className="pl-12 space-y-4">
							<div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
								<Quote className="size-6 text-primary/30 mb-2" />
								<p className="text-foreground leading-relaxed mb-3">
									"{item.answer}"
								</p>
								<StarRating rating={item.rating} />
							</div>
							<div className="flex items-center gap-3">
								<Avatar className="size-9 ring-2 ring-primary/10">
									<AvatarImage src={item.avatar} alt={item.author} />
									<AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
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
						</div>
					</CardContent>
				</CollapsibleContent>
			</Collapsible>
		</Card>
	);
};

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			question: 'How was the onboarding experience?',
			answer:
				'The onboarding was incredibly smooth. The team provided personalized training sessions and documentation that made adoption seamless for our entire organization.',
			author: 'Uma Chen',
			role: 'IT Director',
			company: 'OnboardFirst',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'UC',
			rating: 5,
		},
		{
			question: 'What was the ROI timeline?',
			answer:
				'We saw measurable ROI within the first 30 days. By the end of Q1, our return had exceeded 200% of our initial investment.',
			author: 'Victor Lee',
			role: 'CFO',
			company: 'ROI Masters',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'VL',
			rating: 5,
		},
		{
			question: 'How is the customer support?',
			answer:
				'Customer support is outstanding. They respond within minutes, understand technical issues deeply, and always follow through until resolution.',
			author: 'Wendy Park',
			role: 'Operations',
			company: 'SupportFirst',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'WP',
			rating: 5,
		},
		{
			question: 'Does it scale for enterprise use?',
			answer:
				'Absolutely. We have scaled from 50 to 5000 users without any performance issues. The enterprise features are robust and well-designed.',
			author: 'Xavier Kim',
			role: 'CTO',
			company: 'ScaleUp',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'XK',
			rating: 5,
		},
		{
			question: 'How does it integrate with existing tools?',
			answer:
				'Integration was painless. The API is well-documented and we connected with our existing stack in under a week.',
			author: 'Yara Martinez',
			role: 'Tech Lead',
			company: 'IntegrateCo',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'YM',
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
					badge="Q&A Format"
					title="Common Questions"
					highlight="Answered"
				/>

				<div className="max-w-3xl mx-auto space-y-4">
					{testimonials.map((item, index) => (
						<QACard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
