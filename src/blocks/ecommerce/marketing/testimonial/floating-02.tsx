'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Quote, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TestimonialItem {
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
	description,
}: {
	badge: string;
	title: string;
	description: string;
}) => (
	<div className="mb-12 @lg:mb-16">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<Sparkles className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl">
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

const AnimatedCard = ({
	item,
	delay,
	isVisible,
}: {
	item: TestimonialItem;
	delay: number;
	isVisible: boolean;
}) => (
	<Card
		className={`border-border/50 bg-card/95 backdrop-blur-sm shadow-xl shadow-primary/5 transition-all duration-700 ${
			isVisible
				? 'opacity-100 translate-y-0 scale-100'
				: 'opacity-0 translate-y-8 scale-95'
		}`}
		style={{ transitionDelay: `${delay}ms` }}
	>
		<CardContent className="p-5 @lg:p-6">
			<div className="flex items-center justify-between mb-3">
				<Quote className="size-7 text-primary/20" />
				<StarRating rating={item.rating} />
			</div>
			<p className="text-foreground leading-relaxed mb-4 line-clamp-4">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-3 pt-4 border-t border-border/50">
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
		</CardContent>
	</Card>
);

export default function Main() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	const testimonials: TestimonialItem[] = [
		{
			quote:
				'Revolutionary platform that changed how we work. The impact has been immediate and lasting.',
			author: 'Tina Chen',
			role: 'CEO',
			company: 'RevolutionCo',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'TC',
			rating: 5,
		},
		{
			quote:
				'Exceeded all expectations. Our productivity increased by 50% within the first month.',
			author: 'Uma Park',
			role: 'CFO',
			company: 'GrowthFirst',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'UP',
			rating: 5,
		},
		{
			quote:
				'The best customer support I have ever experienced. They truly care about success.',
			author: 'Victor Lee',
			role: 'Operations',
			company: 'SupportPro',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'VL',
			rating: 5,
		},
		{
			quote:
				'Seamless experience from onboarding to daily use. Highly recommend to everyone.',
			author: 'Wendy Kim',
			role: 'CTO',
			company: 'SeamlessTech',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'WK',
			rating: 5,
		},
		{
			quote:
				'Enterprise-grade security that our compliance team loves. Peace of mind guaranteed.',
			author: 'Xavier Foster',
			role: 'CISO',
			company: 'SecureFirst',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'XF',
			rating: 5,
		},
		{
			quote:
				'Scales effortlessly with our growth. From startup to enterprise without issues.',
			author: 'Yara Davis',
			role: 'VP Engineering',
			company: 'ScaleCorp',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'YD',
			rating: 5,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />

			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 relative z-10">
				<SectionHeader
					badge="Animated Entry"
					title="Watch Them Appear"
					description="Testimonials that gracefully float into view as you scroll."
				/>

				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					{testimonials.map((item, index) => (
						<AnimatedCard
							key={index}
							item={item}
							delay={index * 150}
							isVisible={isVisible}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
