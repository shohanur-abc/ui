import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Star, ThumbsUp } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	avatar: string;
	initials: string;
	rating: number;
	helpful: number;
	featured?: boolean;
}

const SectionHeader = ({
	eyebrow,
	title,
	description,
}: {
	eyebrow: string;
	title: string;
	description: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="secondary" className="mb-4 gap-2">
			<MessageSquare className="size-3" />
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{description}
		</p>
	</div>
);

const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) => (
	<div className="flex gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`${size === 'md' ? 'size-5' : 'size-4'} ${
					i < rating ? 'fill-primary text-primary' : 'text-muted-foreground/20'
				}`}
			/>
		))}
	</div>
);

const HelpfulCount = ({ count }: { count: number }) => (
	<button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group">
		<ThumbsUp className="size-4 group-hover:fill-primary/20" />
		<span>{count} found helpful</span>
	</button>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card
		className={`break-inside-avoid mb-6 border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 ${
			item.featured ? 'ring-2 ring-primary/20 bg-primary/5' : 'bg-card'
		}`}
	>
		<CardContent className="p-5 @md:p-6">
			{item.featured && (
				<Badge className="mb-4 bg-primary text-primary-foreground">Featured Review</Badge>
			)}
			<StarRating rating={item.rating} size={item.featured ? 'md' : 'sm'} />
			<p
				className={`mt-4 leading-relaxed text-foreground ${
					item.featured ? 'text-lg' : 'text-base'
				}`}
			>
				"{item.quote}"
			</p>
			<div className="flex items-center justify-between mt-5 pt-5 border-t border-border/50">
				<div className="flex items-center gap-3">
					<Avatar className="size-10 ring-2 ring-background">
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold text-sm text-foreground">{item.author}</p>
						<p className="text-xs text-muted-foreground">{item.role}</p>
					</div>
				</div>
				<HelpfulCount count={item.helpful} />
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'Absolutely game-changing for our team. We saw immediate improvements in our workflow and communication.',
			author: 'Michael Torres',
			role: 'Engineering Lead',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'MT',
			rating: 5,
			helpful: 47,
			featured: true,
		},
		{
			quote: 'Simple, effective, and reliable. Exactly what we needed.',
			author: 'Lisa Park',
			role: 'Founder',
			avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
			initials: 'LP',
			rating: 5,
			helpful: 23,
		},
		{
			quote:
				'The customer support is phenomenal. They went above and beyond to help us with the integration.',
			author: 'David Kim',
			role: 'CTO',
			avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'DK',
			rating: 5,
			helpful: 31,
		},
		{
			quote: 'Best tool in its category. Period.',
			author: 'Rachel Green',
			role: 'Product Manager',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'RG',
			rating: 5,
			helpful: 18,
		},
		{
			quote:
				'We evaluated dozens of solutions before choosing this one. No regrets. The ROI has been incredible.',
			author: 'Chris Anderson',
			role: 'VP of Operations',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'CA',
			rating: 5,
			helpful: 52,
		},
		{
			quote: 'Intuitive interface, powerful features. What more could you ask for?',
			author: 'Sophia Martinez',
			role: 'Designer',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'SM',
			rating: 4,
			helpful: 15,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					eyebrow="Customer Reviews"
					title="Loved by Thousands"
					description="Join our community of satisfied customers who have transformed their businesses with our platform."
				/>

				<div className="columns-1 @md:columns-2 @xl:columns-3 gap-6">
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
