import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, BookOpen } from 'lucide-react';

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
		<Badge variant="secondary" className="mb-4 gap-2">
			<BookOpen className="size-3" />
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

const BookmarkQuote = ({ item }: { item: TestimonialItem }) => (
	<div className="relative group">
		<div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors rounded-full" />
		<div className="pl-8">
			<Quote className="size-8 text-primary/20 mb-3" />
			<StarRating rating={item.rating} />
			<blockquote className="text-lg @lg:text-xl text-foreground leading-relaxed my-4">
				"{item.quote}"
			</blockquote>
			<div className="flex items-center gap-3">
				<Avatar className="size-10 ring-2 ring-primary/10">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
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
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'This is the tool we have been waiting for. It has fundamentally changed how we operate as a team.',
			author: 'Grace Chen',
			role: 'VP Product',
			company: 'ProductFirst',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'GC',
			rating: 5,
		},
		{
			quote:
				'Security, scalability, and simplicity - they have nailed all three. Rare to find this combination.',
			author: 'Henry Park',
			role: 'CTO',
			company: 'SecureScale',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'HP',
			rating: 5,
		},
		{
			quote:
				'Customer-centric approach that actually delivers. Our satisfaction scores have never been higher.',
			author: 'Iris Lee',
			role: 'Customer Success',
			company: 'HappyClients',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'IL',
			rating: 5,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader badge="Bookmarked" title="Saved" highlight="Favorites" />

				<div className="space-y-12">
					{testimonials.map((item, index) => (
						<BookmarkQuote key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
