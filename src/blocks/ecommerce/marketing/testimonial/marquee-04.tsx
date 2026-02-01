'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, Zap } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	highlight?: boolean;
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
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Zap className="size-3 text-primary" />
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

const TestimonialBubble = ({
	item,
	size = 'normal',
}: {
	item: TestimonialItem;
	size?: 'small' | 'normal' | 'large';
}) => {
	const sizeClasses = {
		small: 'w-[260px] p-4',
		normal: 'w-[300px] p-5',
		large: 'w-[350px] p-6',
	};

	return (
		<div
			className={`shrink-0 rounded-2xl bg-card border ${
				item.highlight
					? 'border-primary/30 shadow-lg shadow-primary/10'
					: 'border-border/50'
			} ${sizeClasses[size]} hover:scale-[1.02] transition-transform`}
		>
			<StarRating rating={item.rating} />
			<p
				className={`text-foreground leading-relaxed mt-2 mb-3 ${
					size === 'small' ? 'text-sm line-clamp-3' : 'line-clamp-4'
				}`}
			>
				"{item.quote}"
			</p>
			<div className="flex items-center gap-2">
				<Avatar
					className={`ring-2 ${
						item.highlight ? 'ring-primary/30' : 'ring-primary/10'
					} ${size === 'small' ? 'size-7' : 'size-9'}`}
				>
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p
						className={`font-semibold text-foreground ${
							size === 'small' ? 'text-xs' : 'text-sm'
						}`}
					>
						{item.author}
					</p>
					<p
						className={`text-muted-foreground ${size === 'small' ? 'text-[10px]' : 'text-xs'}`}
					>
						{item.company}
					</p>
				</div>
			</div>
		</div>
	);
};

const MarqueeRow = ({
	items,
	direction,
	speed,
	size,
}: {
	items: TestimonialItem[];
	direction: 'left' | 'right';
	speed: number;
	size?: 'small' | 'normal' | 'large';
}) => {
	const doubled = [...items, ...items];

	return (
		<div className="overflow-hidden">
			<div
				className={`flex gap-4 ${
					direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
				}`}
				style={{ animationDuration: `${speed}s` }}
			>
				{doubled.map((item, index) => (
					<TestimonialBubble key={index} item={item} size={size} />
				))}
			</div>
		</div>
	);
};

export default function Main() {
	const row1: TestimonialItem[] = [
		{
			quote:
				'Absolutely incredible. Our productivity has soared since we started using this.',
			author: 'Amy Chen',
			role: 'CEO',
			company: 'ProductiveCo',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'AC',
			rating: 5,
			highlight: true,
		},
		{
			quote: 'Best investment of the year. ROI was visible almost immediately.',
			author: 'Brian Park',
			role: 'CFO',
			company: 'InvestSmart',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'BP',
			rating: 5,
		},
		{
			quote: 'The support team is phenomenal. Always helpful and responsive.',
			author: 'Carla Lee',
			role: 'Operations',
			company: 'SupportFirst',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'CL',
			rating: 5,
		},
	];

	const row2: TestimonialItem[] = [
		{
			quote: 'Seamless experience from start to finish. Highly recommended!',
			author: 'David Kim',
			role: 'CTO',
			company: 'TechFlow',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'DK',
			rating: 5,
		},
		{
			quote: 'Enterprise-ready security that passed all our compliance audits.',
			author: 'Emma Foster',
			role: 'CISO',
			company: 'SecureCorp',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'EF',
			rating: 5,
			highlight: true,
		},
		{
			quote:
				'Scales beautifully. We went from 10 to 1000 users without issues.',
			author: 'Frank Davis',
			role: 'VP Engineering',
			company: 'ScaleUp',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'FD',
			rating: 5,
		},
	];

	const row3: TestimonialItem[] = [
		{
			quote: 'Game-changer for our workflow. Cannot imagine going back.',
			author: 'Grace Wilson',
			role: 'Director',
			company: 'WorkflowPro',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'GW',
			rating: 5,
		},
		{
			quote: 'The analytics features provide insights we never had before.',
			author: 'Henry Chen',
			role: 'Data Lead',
			company: 'AnalyticsCo',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'HC',
			rating: 5,
		},
		{
			quote:
				'Customer satisfaction has improved dramatically since implementation.',
			author: 'Iris Park',
			role: 'CX Director',
			company: 'HappyCustomers',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'IP',
			rating: 5,
			highlight: true,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<style jsx>{`
				@keyframes scroll-left {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}
				@keyframes scroll-right {
					0% {
						transform: translateX(-50%);
					}
					100% {
						transform: translateX(0);
					}
				}
				.animate-scroll-left {
					animation: scroll-left linear infinite;
				}
				.animate-scroll-right {
					animation: scroll-right linear infinite;
				}
			`}</style>

			<div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 mb-10">
					<SectionHeader
						badge="Multi-Row Flow"
						title="Triple Stream Reviews"
						description="Watch testimonials flow in different directions across three synchronized rows."
					/>
				</div>

				<div className="space-y-4">
					<MarqueeRow items={row1} direction="left" speed={35} size="normal" />
					<MarqueeRow items={row2} direction="right" speed={40} size="large" />
					<MarqueeRow items={row3} direction="left" speed={30} size="normal" />
				</div>
			</div>
		</section>
	);
}
