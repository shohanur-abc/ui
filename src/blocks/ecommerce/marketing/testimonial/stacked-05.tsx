import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Grid3X3, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	size: 'sm' | 'md' | 'lg';
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
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Grid3X3 className="size-3 text-primary" />
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

const StarRating = ({
	rating,
	size = 'sm',
}: {
	rating: number;
	size?: 'sm' | 'md';
}) => (
	<div className="flex gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`${size === 'md' ? 'size-5' : 'size-4'} ${
					i < rating ? 'fill-primary text-primary' : 'text-muted/30'
				}`}
			/>
		))}
	</div>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => {
	const sizeClasses = {
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8',
	};

	const quoteSize = {
		sm: 'size-6',
		md: 'size-8',
		lg: 'size-10',
	};

	const textSize = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg @lg:text-xl font-medium',
	};

	const avatarSize = {
		sm: 'size-9',
		md: 'size-11',
		lg: 'size-14',
	};

	return (
		<Card
			className={`h-full border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group ${
				item.size === 'lg'
					? 'bg-gradient-to-br from-primary/5 to-transparent'
					: ''
			}`}
		>
			<CardContent className={`${sizeClasses[item.size]} flex flex-col h-full`}>
				<Quote className={`${quoteSize[item.size]} text-primary/20 mb-3`} />
				<StarRating
					rating={item.rating}
					size={item.size === 'lg' ? 'md' : 'sm'}
				/>
				<p
					className={`text-foreground leading-relaxed flex-1 mt-3 mb-5 ${textSize[item.size]}`}
				>
					"{item.quote}"
				</p>
				<div className="flex items-center gap-3 pt-4 border-t border-border/50">
					<Avatar
						className={`${avatarSize[item.size]} ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all`}
					>
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary/10 text-primary font-semibold">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p
							className={`font-semibold text-foreground ${item.size === 'lg' ? 'text-base' : 'text-sm'}`}
						>
							{item.author}
						</p>
						<p
							className={`text-muted-foreground ${item.size === 'lg' ? 'text-sm' : 'text-xs'}`}
						>
							{item.role} · {item.company}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'This solution has become the backbone of our operations. We rely on it daily for everything from project management to customer communications.',
			author: 'Catherine Bell',
			role: 'COO',
			company: 'Enterprise Inc',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'CB',
			rating: 5,
			size: 'lg',
		},
		{
			quote: 'Fast, reliable, and the team loves it.',
			author: 'David Lee',
			role: 'Tech Lead',
			company: 'DevCo',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'DL',
			rating: 5,
			size: 'sm',
		},
		{
			quote:
				'Outstanding customer support. They resolved our issue in minutes.',
			author: 'Emma Wilson',
			role: 'IT Manager',
			company: 'SupportFirst',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'EW',
			rating: 5,
			size: 'md',
		},
		{
			quote: 'Best investment we made this quarter.',
			author: 'Frank Chen',
			role: 'CFO',
			company: 'FinanceHub',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'FC',
			rating: 5,
			size: 'sm',
		},
		{
			quote:
				'The platform scales effortlessly. We went from 10 to 1000 users without any hiccups.',
			author: 'Grace Park',
			role: 'VP Engineering',
			company: 'ScaleUp',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'GP',
			rating: 5,
			size: 'md',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Varied Layout"
					title="Praise in All"
					highlight="Sizes"
					description="From quick endorsements to detailed testimonials, our customers speak highly of us."
				/>

				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-4 @lg:gap-6">
					<div className="@xl:row-span-2">
						<TestimonialCard item={testimonials[0]} />
					</div>
					<TestimonialCard item={testimonials[1]} />
					<TestimonialCard item={testimonials[2]} />
					<TestimonialCard item={testimonials[3]} />
					<TestimonialCard item={testimonials[4]} />
				</div>
			</div>
		</section>
	);
}
