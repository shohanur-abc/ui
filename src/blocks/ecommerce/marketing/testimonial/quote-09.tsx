import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, Tag } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	tag: string;
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
		<Badge variant="secondary" className="mb-4 gap-2">
			<Tag className="size-3" />
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

const TaggedQuote = ({ item }: { item: TestimonialItem }) => (
	<div className="relative group bg-card border border-border/50 rounded-2xl p-6 @lg:p-8 hover:shadow-lg hover:shadow-primary/5 transition-all">
		<Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">
			{item.tag}
		</Badge>
		<Quote className="size-8 text-primary/20 mb-4" />
		<StarRating rating={item.rating} />
		<blockquote className="text-lg font-medium text-foreground leading-relaxed my-4">
			"{item.quote}"
		</blockquote>
		<div className="flex items-center gap-3 pt-4 border-t border-border/50">
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
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			tag: 'Quality',
			quote:
				'The quality of the product exceeded all our expectations. Absolutely premium.',
			author: 'Rachel Park',
			role: 'Director',
			company: 'QualityFirst',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'RP',
			rating: 5,
		},
		{
			tag: 'Support',
			quote:
				'Support team is phenomenal. Response times are incredible, solutions are effective.',
			author: 'Steve Lee',
			role: 'Operations',
			company: 'SupportPlus',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'SL',
			rating: 5,
		},
		{
			tag: 'Value',
			quote:
				'Best value for money in the industry. ROI was visible within the first month.',
			author: 'Tina Chen',
			role: 'CFO',
			company: 'ValueMax',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'TC',
			rating: 5,
		},
		{
			tag: 'Innovation',
			quote:
				'Constantly innovating and improving. Always stay ahead of our needs.',
			author: 'Umar Khan',
			role: 'CTO',
			company: 'InnovateNow',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'UK',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Tagged"
					title="Categorized"
					highlight="Praise"
					description="Testimonials organized by what customers value most."
				/>

				<div className="grid grid-cols-1 @md:grid-cols-2 gap-8">
					{testimonials.map((item, index) => (
						<TaggedQuote key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
