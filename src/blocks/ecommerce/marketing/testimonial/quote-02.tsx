import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star, MessageSquareQuote } from 'lucide-react';

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
		<Badge variant="secondary" className="mb-4 gap-2">
			<MessageSquareQuote className="size-3" />
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

const LargeQuoteCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-border/50 bg-card col-span-2 row-span-2 shadow-lg shadow-primary/5">
		<CardContent className="p-6 @lg:p-8 h-full flex flex-col">
			<Quote className="size-12 text-primary/20 mb-4" />
			<StarRating rating={item.rating} />
			<blockquote className="text-xl @lg:text-2xl font-medium text-foreground leading-relaxed my-6 flex-1">
				"{item.quote}"
			</blockquote>
			<div className="flex items-center gap-4 pt-6 border-t border-border/50">
				<Avatar className="size-12 ring-4 ring-primary/10">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary font-bold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-bold text-foreground">{item.author}</p>
					<p className="text-sm text-muted-foreground">
						{item.role} · {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const SmallQuoteCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all">
		<CardContent className="p-5">
			<Quote className="size-6 text-primary/20 mb-2" />
			<StarRating rating={item.rating} />
			<p className="text-foreground text-sm leading-relaxed my-3 line-clamp-3">
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

export default function Main() {
	const featured: TestimonialItem = {
		quote:
			'Working with this team has been an absolute pleasure. Their dedication to quality and customer success is unmatched. We have seen remarkable improvements across all our key metrics.',
		author: 'Xavier Park',
		role: 'CEO',
		company: 'InnovateCorp',
		avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
		initials: 'XP',
		rating: 5,
	};

	const others: TestimonialItem[] = [
		{
			quote: 'Outstanding results from day one. Highly recommend.',
			author: 'Yara Chen',
			role: 'COO',
			company: 'ResultsCo',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'YC',
			rating: 5,
		},
		{
			quote: 'Seamless integration. Our team loves it.',
			author: 'Zach Lee',
			role: 'CTO',
			company: 'TechFlow',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'ZL',
			rating: 5,
		},
		{
			quote: 'Best support experience I have ever had.',
			author: 'Amy Kim',
			role: 'Operations',
			company: 'SupportFirst',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'AK',
			rating: 5,
		},
		{
			quote: 'Enterprise-ready security that works.',
			author: 'Brian Foster',
			role: 'CISO',
			company: 'SecureCorp',
			avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'BF',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Quote Gallery"
					title="Voices of Success"
					description="Real testimonials from customers who have experienced our impact."
				/>

				<div className="grid grid-cols-1 @lg:grid-cols-4 gap-6">
					<div className="@lg:col-span-2 @lg:row-span-2">
						<LargeQuoteCard item={featured} />
					</div>
					{others.map((item, index) => (
						<SmallQuoteCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
