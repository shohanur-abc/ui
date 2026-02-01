'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MoveRight, Quote, Star } from 'lucide-react';
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
	highlight,
}: {
	badge: string;
	title: string;
	highlight: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<MoveRight className="size-3" />
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

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-border/50 bg-card shrink-0 w-[320px] @md:w-[380px] hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
		<CardContent className="p-5 @lg:p-6">
			<Quote className="size-8 text-primary/20 mb-3" />
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed mt-3 mb-4 line-clamp-4">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-3 pt-3 border-t border-border/50">
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

const MarqueeRow = ({
	items,
	direction,
	duration,
}: {
	items: TestimonialItem[];
	direction: 'left' | 'right';
	duration: number;
}) => {
	const doubledItems = [...items, ...items];

	return (
		<div className="overflow-hidden relative">
			<div
				className={`flex gap-6 ${
					direction === 'left'
						? 'animate-marquee-left'
						: 'animate-marquee-right'
				}`}
				style={{
					animationDuration: `${duration}s`,
				}}
			>
				{doubledItems.map((item, index) => (
					<TestimonialCard key={index} item={item} />
				))}
			</div>
		</div>
	);
};

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'Absolutely transformative for our business. We saw immediate improvements in efficiency and team morale.',
			author: 'George Chen',
			role: 'CEO',
			company: 'TransformCo',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'GC',
			rating: 5,
		},
		{
			quote:
				'The best investment we have made this year. ROI was visible within the first month.',
			author: 'Hannah Park',
			role: 'CFO',
			company: 'InvestSmart',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'HP',
			rating: 5,
		},
		{
			quote:
				'Customer support is exceptional. They respond quickly and solve issues effectively.',
			author: 'Ivan Foster',
			role: 'Operations',
			company: 'SupportFirst',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'IF',
			rating: 5,
		},
		{
			quote:
				'Seamless integration with our existing tools. The API documentation is excellent.',
			author: 'Julia Lee',
			role: 'CTO',
			company: 'IntegratePro',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'JL',
			rating: 5,
		},
		{
			quote:
				'Security features are top-notch. We passed all compliance audits with flying colors.',
			author: 'Kevin Kim',
			role: 'CISO',
			company: 'SecureCorp',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'KK',
			rating: 5,
		},
		{
			quote:
				'Scales beautifully as our company grows. Performance has been consistently excellent.',
			author: 'Laura Davis',
			role: 'VP Engineering',
			company: 'ScaleUp',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'LD',
			rating: 5,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<style jsx>{`
				@keyframes marquee-left {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}
				@keyframes marquee-right {
					0% {
						transform: translateX(-50%);
					}
					100% {
						transform: translateX(0);
					}
				}
				.animate-marquee-left {
					animation: marquee-left linear infinite;
				}
				.animate-marquee-right {
					animation: marquee-right linear infinite;
				}
			`}</style>

			<div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 mb-10">
					<SectionHeader
						badge="Infinite Scroll"
						title="Endless"
						highlight="Testimonials"
					/>
				</div>

				<div className="space-y-6">
					<MarqueeRow
						items={testimonials.slice(0, 3)}
						direction="left"
						duration={30}
					/>
					<MarqueeRow
						items={testimonials.slice(3, 6)}
						direction="right"
						duration={35}
					/>
				</div>
			</div>
		</section>
	);
}
