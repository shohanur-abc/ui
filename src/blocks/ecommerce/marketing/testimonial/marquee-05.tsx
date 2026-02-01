'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Layers2, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	companyLogo: string;
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
			<Layers2 className="size-3" />
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

const LogoCard = ({ item }: { item: TestimonialItem }) => (
	<div className="shrink-0 w-[140px] h-[80px] rounded-lg bg-card border border-border/50 flex items-center justify-center hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all">
		<span className="text-2xl font-bold text-muted-foreground">
			{item.companyLogo}
		</span>
	</div>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="shrink-0 w-[320px] @md:w-[380px] border-border/50 bg-card hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all">
		<CardContent className="p-6">
			<div className="flex items-center justify-between mb-4">
				<div className="size-12 rounded-lg bg-muted flex items-center justify-center font-bold text-lg text-muted-foreground">
					{item.companyLogo}
				</div>
				<StarRating rating={item.rating} />
			</div>
			<Quote className="size-6 text-primary/20 mb-2" />
			<p className="text-foreground leading-relaxed mb-4 line-clamp-3">
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
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'Outstanding platform that revolutionized our entire operation. Highly recommended for any business.',
			author: 'Jack Chen',
			role: 'CEO',
			company: 'TechFirst',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'JC',
			rating: 5,
			companyLogo: 'TF',
		},
		{
			quote:
				'The best investment we made this quarter. ROI exceeded all our expectations by a huge margin.',
			author: 'Karen Park',
			role: 'CFO',
			company: 'InvestCo',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'KP',
			rating: 5,
			companyLogo: 'IC',
		},
		{
			quote:
				'Security features are enterprise-grade. We passed all compliance audits easily.',
			author: 'Leo Kim',
			role: 'CISO',
			company: 'SecureNet',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'LK',
			rating: 5,
			companyLogo: 'SN',
		},
		{
			quote:
				'Seamless integration with our existing tools. The API documentation is excellent.',
			author: 'Maya Lee',
			role: 'CTO',
			company: 'IntegratePro',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'ML',
			rating: 5,
			companyLogo: 'IP',
		},
		{
			quote:
				'Customer support is world-class. They are always responsive and helpful.',
			author: 'Nathan Foster',
			role: 'Operations',
			company: 'SupportFirst',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'NF',
			rating: 5,
			companyLogo: 'SF',
		},
		{
			quote:
				'Scales beautifully as our company grows. Performance has been consistently excellent.',
			author: 'Olivia Davis',
			role: 'VP Engineering',
			company: 'ScaleUp',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'OD',
			rating: 5,
			companyLogo: 'SU',
		},
	];

	const doubledLogos = [...testimonials, ...testimonials];
	const doubledCards = [...testimonials, ...testimonials];

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
				.scroll-left {
					animation: scroll-left 30s linear infinite;
				}
				.scroll-right {
					animation: scroll-right 45s linear infinite;
				}
			`}</style>

			<div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8">
					<SectionHeader
						badge="Logo + Cards"
						title="Trusted By"
						highlight="Leaders"
					/>
				</div>

				{/* Logo marquee */}
				<div className="overflow-hidden mb-10">
					<div className="flex gap-6 scroll-left">
						{doubledLogos.map((item, index) => (
							<LogoCard key={index} item={item} />
						))}
					</div>
				</div>

				{/* Testimonial cards marquee */}
				<div className="overflow-hidden">
					<div className="flex gap-6 scroll-right">
						{doubledCards.map((item, index) => (
							<TestimonialCard key={index} item={item} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
