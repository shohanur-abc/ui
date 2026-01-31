import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Component, Quote, Sparkles, Star, TrendingUp } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	metric?: { value: string; label: string };
}

interface StatItem {
	value: string;
	label: string;
	icon: React.ElementType;
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
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Component className="size-3 text-primary" />
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
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const StatCard = ({ item }: { item: StatItem }) => (
	<Card className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
		<CardContent className="p-6 text-center">
			<item.icon className="size-8 text-primary mx-auto mb-3" />
			<p className="text-3xl @md:text-4xl font-bold text-primary">{item.value}</p>
			<p className="text-sm text-muted-foreground mt-1">{item.label}</p>
		</CardContent>
	</Card>
);

const TestimonialCard = ({
	item,
	featured = false,
}: {
	item: TestimonialItem;
	featured?: boolean;
}) => (
	<Card
		className={`h-full ${
			featured
				? 'border-primary/30 bg-gradient-to-br from-primary/10 to-card shadow-lg shadow-primary/5'
				: 'border-border/50 bg-card'
		} hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group`}
	>
		<CardContent className={`${featured ? 'p-8' : 'p-6'} flex flex-col h-full`}>
			{item.metric && (
				<div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-semibold w-fit mb-4">
					<TrendingUp className="size-3.5" />
					{item.metric.value} {item.metric.label}
				</div>
			)}
			<Quote
				className={`${featured ? 'size-10' : 'size-8'} text-primary/20 mb-3`}
			/>
			<StarRating rating={item.rating} />
			<p
				className={`text-foreground leading-relaxed flex-1 mt-3 mb-5 ${
					featured ? 'text-lg @lg:text-xl font-medium' : ''
				}`}
			>
				"{item.quote}"
			</p>
			<div className="flex items-center gap-3 pt-4 border-t border-border/50">
				<Avatar
					className={`${
						featured ? 'size-12' : 'size-10'
					} ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all`}
				>
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
		</CardContent>
	</Card>
);

export default function Main() {
	const stats: StatItem[] = [
		{ value: '99%', label: 'Customer Satisfaction', icon: Star },
		{ value: '4.9', label: 'Average Rating', icon: Sparkles },
		{ value: '+150%', label: 'Average ROI', icon: TrendingUp },
	];

	const featuredTestimonial: TestimonialItem = {
		quote:
			'This platform has become essential to our operations. The ROI was visible within the first month, and our team cannot imagine working without it now.',
		author: 'Amelia Watson',
		role: 'VP of Operations',
		company: 'Global Enterprises',
		avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
		initials: 'AW',
		rating: 5,
		metric: { value: '+200%', label: 'efficiency' },
	};

	const testimonials: TestimonialItem[] = [
		{
			quote: 'Seamless onboarding, powerful features, great support.',
			author: 'Ben Crawford',
			role: 'IT Manager',
			company: 'TechFirst',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'BC',
			rating: 5,
		},
		{
			quote: 'The analytics alone are worth 10x the investment.',
			author: 'Clara Davis',
			role: 'Data Lead',
			company: 'InsightPro',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'CD',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Stats & Stories"
					title="Numbers Don't Lie"
					description="See the real impact we have on businesses around the world."
				/>

				<div className="grid grid-cols-1 @sm:grid-cols-3 gap-4 mb-8">
					{stats.map((item, index) => (
						<StatCard key={index} item={item} />
					))}
				</div>

				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-6">
					<TestimonialCard item={featuredTestimonial} featured />
					<div className="grid grid-cols-1 gap-6">
						{testimonials.map((item, index) => (
							<TestimonialCard key={index} item={item} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
