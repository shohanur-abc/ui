'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Quote, Star, TrendingUp } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	metric: string;
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
	<div className="text-center mb-6">
		<Badge variant="secondary" className="mb-4 gap-2">
			<Sparkles className="size-3" />
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

const MetricBadge = ({ metric }: { metric: string }) => (
	<Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary text-xs">
		<TrendingUp className="size-3 mr-1" />
		{metric}
	</Badge>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-border/50 bg-card shrink-0 w-[280px] hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-2">
				<StarRating rating={item.rating} />
				<MetricBadge metric={item.metric} />
			</div>
			<p className="text-foreground text-sm leading-relaxed mb-3 line-clamp-3">
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

const MarqueeTrack = ({
	items,
	direction,
	speed,
}: {
	items: TestimonialItem[];
	direction: 'up' | 'down';
	speed: number;
}) => {
	const doubledItems = [...items, ...items, ...items];

	return (
		<div className="h-[500px] overflow-hidden relative">
			<div
				className={`flex flex-col gap-4 ${
					direction === 'up' ? 'animate-marquee-up' : 'animate-marquee-down'
				}`}
				style={{ animationDuration: `${speed}s` }}
			>
				{doubledItems.map((item, index) => (
					<TestimonialCard key={index} item={item} />
				))}
			</div>
		</div>
	);
};

export default function Main() {
	const column1: TestimonialItem[] = [
		{
			quote: 'Incredible platform that transformed our operations completely.',
			author: 'Martin Chen',
			role: 'CEO',
			company: 'TechFirst',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'MC',
			rating: 5,
			metric: '+45% ROI',
		},
		{
			quote: 'Best investment we made this quarter. Highly recommended.',
			author: 'Nina Park',
			role: 'CFO',
			company: 'InvestCo',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'NP',
			rating: 5,
			metric: '+60% efficiency',
		},
		{
			quote: 'Customer support is world-class. Always there when needed.',
			author: 'Oscar Lee',
			role: 'Operations',
			company: 'SupportPro',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'OL',
			rating: 5,
			metric: '24/7 support',
		},
	];

	const column2: TestimonialItem[] = [
		{
			quote: 'Security features exceeded all our compliance requirements.',
			author: 'Paula Kim',
			role: 'CISO',
			company: 'SecureNet',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'PK',
			rating: 5,
			metric: 'SOC 2 ready',
		},
		{
			quote: 'Seamless integration with all our existing tools.',
			author: 'Quinn Foster',
			role: 'CTO',
			company: 'IntegrateCorp',
			avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'QF',
			rating: 5,
			metric: '50+ integrations',
		},
		{
			quote: 'Scales perfectly as our team grows. No issues at all.',
			author: 'Rachel Davis',
			role: 'VP Engineering',
			company: 'ScaleUp',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'RD',
			rating: 5,
			metric: '10x scale',
		},
	];

	const column3: TestimonialItem[] = [
		{
			quote: 'Onboarding was quick and the team was incredibly helpful.',
			author: 'Sam Wilson',
			role: 'IT Director',
			company: 'OnboardPro',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'SW',
			rating: 5,
			metric: '< 1 week setup',
		},
		{
			quote: 'The analytics dashboard is incredibly insightful.',
			author: 'Tina Chen',
			role: 'Data Lead',
			company: 'AnalyticsCo',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'TC',
			rating: 5,
			metric: 'Real-time data',
		},
		{
			quote: 'Productivity increased across all departments.',
			author: 'Uma Park',
			role: 'COO',
			company: 'ProductiveCo',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'UP',
			rating: 5,
			metric: '+35% output',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<style jsx>{`
				@keyframes marquee-up {
					0% {
						transform: translateY(0);
					}
					100% {
						transform: translateY(-33.33%);
					}
				}
				@keyframes marquee-down {
					0% {
						transform: translateY(-33.33%);
					}
					100% {
						transform: translateY(0);
					}
				}
				.animate-marquee-up {
					animation: marquee-up linear infinite;
				}
				.animate-marquee-down {
					animation: marquee-down linear infinite;
				}
			`}</style>

			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Vertical Scroll"
					title="Testimonial Columns"
					description="Watch customer feedback scroll continuously in multiple columns."
				/>

				<div className="flex justify-center gap-6 mt-10">
					<div className="hidden @lg:block">
						<MarqueeTrack items={column1} direction="up" speed={25} />
					</div>
					<MarqueeTrack items={column2} direction="down" speed={30} />
					<div className="hidden @md:block">
						<MarqueeTrack items={column3} direction="up" speed={28} />
					</div>
				</div>
			</div>
		</section>
	);
}
