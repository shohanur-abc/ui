'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Boxes, Quote, Star } from 'lucide-react';
import { useState } from 'react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	size: 'small' | 'medium' | 'large';
}

const SectionHeader = ({
	badge,
	title,
	description,
}: {
	badge: string;
	title: string;
	description: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<Boxes className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
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
				className={`size-3 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const BubbleCard = ({
	item,
	onHover,
	isActive,
}: {
	item: TestimonialItem;
	onHover: () => void;
	isActive: boolean;
}) => {
	const sizeClasses = {
		small: 'col-span-1',
		medium: 'col-span-1 @lg:col-span-1',
		large: 'col-span-1 @lg:col-span-2',
	};

	return (
		<Card
			className={`border-border/50 bg-card cursor-pointer transition-all duration-500 ${
				isActive
					? 'shadow-xl shadow-primary/10 border-primary/30 scale-[1.02]'
					: 'hover:shadow-lg hover:shadow-primary/5'
			} ${sizeClasses[item.size]}`}
			onMouseEnter={onHover}
		>
			<CardContent className="p-5">
				<div className="flex items-center justify-between mb-2">
					<StarRating rating={item.rating} />
					<Quote className="size-5 text-primary/20" />
				</div>
				<p
					className={`text-foreground leading-relaxed mb-4 ${
						item.size === 'large' ? 'line-clamp-4' : 'line-clamp-3'
					} text-sm`}
				>
					"{item.quote}"
				</p>
				<div className="flex items-center gap-2">
					<Avatar className="size-8 ring-2 ring-primary/10">
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold text-xs text-foreground">{item.author}</p>
						<p className="text-[10px] text-muted-foreground">{item.company}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const [activeIndex, setActiveIndex] = useState(0);

	const testimonials: TestimonialItem[] = [
		{
			quote:
				'Absolutely game-changing for our business. The results speak for themselves and our team loves it.',
			author: 'Emma Chen',
			role: 'CEO',
			company: 'BubbleTech',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'EC',
			rating: 5,
			size: 'large',
		},
		{
			quote:
				'Outstanding support team. Always responsive.',
			author: 'Frank Park',
			role: 'COO',
			company: 'SupportCo',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'FP',
			rating: 5,
			size: 'small',
		},
		{
			quote:
				'Security is top-notch. Passed all our compliance audits.',
			author: 'Grace Lee',
			role: 'CISO',
			company: 'SecureBubble',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'GL',
			rating: 5,
			size: 'small',
		},
		{
			quote:
				'Integration was seamless. We were up and running quickly.',
			author: 'Henry Kim',
			role: 'CTO',
			company: 'IntegratePro',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'HK',
			rating: 5,
			size: 'medium',
		},
		{
			quote:
				'ROI was visible within 30 days. Best investment.',
			author: 'Iris Foster',
			role: 'CFO',
			company: 'ROIMasters',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'IF',
			rating: 5,
			size: 'small',
		},
		{
			quote:
				'Scales perfectly. We went from startup to enterprise.',
			author: 'Jack Davis',
			role: 'VP Engineering',
			company: 'ScaleUp',
			avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'JD',
			rating: 5,
			size: 'medium',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Interactive Bubbles"
					title="Hover to Highlight"
					description="Interactive testimonial cards that respond to your cursor."
				/>

				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					{testimonials.map((item, index) => (
						<BubbleCard
							key={index}
							item={item}
							onHover={() => setActiveIndex(index)}
							isActive={activeIndex === index}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
