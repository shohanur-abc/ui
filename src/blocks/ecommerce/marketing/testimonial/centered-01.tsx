import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlignCenter, Quote, Star } from 'lucide-react';

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
	description,
}: {
	badge: string;
	title: string;
	highlight: string;
	description: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<AlignCenter className="size-3 text-primary" />
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
	<div className="flex justify-center gap-0.5 mb-4">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const CenteredCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="text-center border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
		<CardContent className="p-6 @md:p-8">
			<div className="flex justify-center mb-4">
				<Avatar className="size-16 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
						{item.initials}
					</AvatarFallback>
				</Avatar>
			</div>
			<StarRating rating={item.rating} />
			<Quote className="size-8 text-primary/20 mx-auto mb-3" />
			<p className="text-foreground text-lg leading-relaxed mb-6">"{item.quote}"</p>
			<div className="pt-4 border-t border-border/50">
				<p className="font-bold text-foreground">{item.author}</p>
				<p className="text-muted-foreground text-sm">
					{item.role} · {item.company}
				</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The platform transformed our customer engagement. We saw results within the first week.',
			author: 'Karen White',
			role: 'Marketing Director',
			company: 'EngagePro',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'KW',
			rating: 5,
		},
		{
			quote:
				'Implementation was seamless. The team made everything so easy to understand.',
			author: 'Luke Brown',
			role: 'CTO',
			company: 'TechFlow',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'LB',
			rating: 5,
		},
		{
			quote:
				'Best investment we have made this year. ROI was immediate and substantial.',
			author: 'Mia Rodriguez',
			role: 'CFO',
			company: 'FinanceFirst',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'MR',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Centered"
					title="Customer"
					highlight="Highlights"
					description="See what our valued customers say about their experience with us."
				/>

				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					{testimonials.map((item, index) => (
						<CenteredCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
