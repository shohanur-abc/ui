import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Star } from 'lucide-react';

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
			<Quote className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-1 mb-4">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const QuoteCard = ({ item }: { item: TestimonialItem }) => (
	<div className="relative bg-card rounded-2xl border border-border/50 p-8 @lg:p-10 shadow-lg shadow-primary/5">
		<Quote className="absolute top-6 left-6 size-16 text-primary/10" />
		<div className="relative z-10">
			<StarRating rating={item.rating} />
			<blockquote className="text-xl @md:text-2xl @lg:text-3xl font-medium text-foreground leading-relaxed mb-8">
				"{item.quote}"
			</blockquote>
			<div className="flex items-center gap-4">
				<Avatar className="size-14 ring-4 ring-primary/10">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-bold text-lg text-foreground">{item.author}</p>
					<p className="text-muted-foreground">
						{item.role} · {item.company}
					</p>
				</div>
			</div>
		</div>
	</div>
);

export default function Main() {
	const testimonial: TestimonialItem = {
		quote:
			'This platform has completely transformed how we approach our business. The attention to detail, the powerful features, and the outstanding support have made it an indispensable part of our daily operations.',
		author: 'Wendy Chen',
		role: 'Chief Executive Officer',
		company: 'GlobalTech Solutions',
		avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
		initials: 'WC',
		rating: 5,
	};

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader badge="Featured Quote" title="Words That" highlight="Matter" />
				<QuoteCard item={testimonial} />
			</div>
		</section>
	);
}
