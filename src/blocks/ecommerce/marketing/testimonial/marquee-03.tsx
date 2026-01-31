'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, Pause, Play } from 'lucide-react';
import { useState } from 'react';

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
	description,
	isPaused,
	onToggle,
}: {
	badge: string;
	title: string;
	highlight: string;
	description: string;
	isPaused: boolean;
	onToggle: () => void;
}) => (
	<div className="flex flex-col @lg:flex-row @lg:items-end justify-between gap-6 mb-10">
		<div>
			<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
				{badge}
			</Badge>
			<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
				{title} <span className="text-primary">{highlight}</span>
			</h2>
			<p className="text-muted-foreground text-base @md:text-lg max-w-xl">
				{description}
			</p>
		</div>
		<button
			onClick={onToggle}
			className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors text-sm font-medium shrink-0"
		>
			{isPaused ? (
				<>
					<Play className="size-4" /> Play
				</>
			) : (
				<>
					<Pause className="size-4" /> Pause
				</>
			)}
		</button>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 mb-2">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<div className="shrink-0 w-[350px] @md:w-[400px] p-6 rounded-xl bg-card border border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all">
		<Quote className="size-8 text-primary/20 mb-3" />
		<StarRating rating={item.rating} />
		<p className="text-foreground leading-relaxed mb-4 line-clamp-4">
			"{item.quote}"
		</p>
		<div className="flex items-center gap-3 pt-4 border-t border-border/50">
			<Avatar className="size-11 ring-2 ring-primary/10">
				<AvatarImage src={item.avatar} alt={item.author} />
				<AvatarFallback className="bg-primary/10 text-primary font-semibold">
					{item.initials}
				</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-semibold text-foreground">{item.author}</p>
				<p className="text-sm text-muted-foreground">
					{item.role} · {item.company}
				</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const [isPaused, setIsPaused] = useState(false);

	const testimonials: TestimonialItem[] = [
		{
			quote:
				'This platform has completely transformed how we manage our business operations. The efficiency gains have been remarkable.',
			author: 'Victor Chen',
			role: 'CEO',
			company: 'TransformCo',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'VC',
			rating: 5,
		},
		{
			quote:
				'Outstanding customer service and a product that delivers exactly what it promises. We could not be happier.',
			author: 'Wendy Park',
			role: 'COO',
			company: 'ServiceFirst',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'WP',
			rating: 5,
		},
		{
			quote:
				'The ROI has been incredible. We saw measurable results within the first 30 days of implementation.',
			author: 'Xavier Lee',
			role: 'CFO',
			company: 'ROIMasters',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'XL',
			rating: 5,
		},
		{
			quote:
				'Integration was seamless. Our team was up and running in no time with minimal disruption.',
			author: 'Yara Kim',
			role: 'CTO',
			company: 'IntegratePro',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'YK',
			rating: 5,
		},
		{
			quote:
				'Security features are enterprise-grade. We passed all compliance audits with flying colors.',
			author: 'Zach Foster',
			role: 'CISO',
			company: 'SecureCorp',
			avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'ZF',
			rating: 5,
		},
	];

	const doubledItems = [...testimonials, ...testimonials];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<style jsx>{`
				@keyframes marquee {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}
				.marquee-track {
					animation: marquee 40s linear infinite;
				}
				.marquee-paused {
					animation-play-state: paused;
				}
			`}</style>

			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Interactive Marquee"
					title="Smooth"
					highlight="Scrolling"
					description="Hover over any card or use the controls to pause the animation."
					isPaused={isPaused}
					onToggle={() => setIsPaused(!isPaused)}
				/>
			</div>

			<div
				className="overflow-hidden pb-16"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
			>
				<div className={`flex gap-6 marquee-track ${isPaused ? 'marquee-paused' : ''}`}>
					{doubledItems.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
