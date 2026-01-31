import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, Sparkles } from 'lucide-react';

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
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Sparkles className="size-3 text-primary" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 justify-center mb-4">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const QuoteBlock = ({ item }: { item: TestimonialItem }) => (
	<div className="text-center max-w-4xl mx-auto">
		<div className="relative inline-block">
			<Quote className="absolute -top-4 -left-8 size-16 text-primary/10" />
			<Quote className="absolute -bottom-4 -right-8 size-16 text-primary/10 rotate-180" />
			<blockquote className="text-2xl @md:text-3xl @lg:text-4xl @xl:text-5xl font-bold text-foreground leading-tight py-8 px-12">
				{item.quote}
			</blockquote>
		</div>
		<StarRating rating={item.rating} />
		<div className="flex items-center justify-center gap-4 mt-6">
			<Avatar className="size-14 ring-4 ring-primary/10">
				<AvatarImage src={item.avatar} alt={item.author} />
				<AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
					{item.initials}
				</AvatarFallback>
			</Avatar>
			<div className="text-left">
				<p className="font-bold text-lg text-foreground">{item.author}</p>
				<p className="text-muted-foreground">
					{item.role}, {item.company}
				</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const testimonial: TestimonialItem = {
		quote: 'The future of work is here.',
		author: 'Clara Chen',
		role: 'Founder',
		company: 'FutureTech',
		avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
		initials: 'CC',
		rating: 5,
	};

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-20 @md:py-28 @xl:py-36 relative z-10">
				<SectionHeader badge="Bold Statement" title="One" highlight="Quote" />
				<QuoteBlock item={testimonial} />
			</div>
		</section>
	);
}
