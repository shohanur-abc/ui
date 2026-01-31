import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star, Hash } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	number: string;
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
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<Hash className="size-3" />
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

const NumberedQuote = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all group">
		<CardContent className="p-6 flex gap-6">
			<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
				<span className="font-bold text-lg text-primary group-hover:text-primary-foreground">
					{item.number}
				</span>
			</div>
			<div className="flex-1">
				<div className="flex items-center justify-between mb-2">
					<Quote className="size-5 text-primary/20" />
					<StarRating rating={item.rating} />
				</div>
				<blockquote className="text-foreground leading-relaxed mb-4">
					"{item.quote}"
				</blockquote>
				<div className="flex items-center gap-3">
					<Avatar className="size-9 ring-2 ring-primary/10">
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
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			number: '01',
			quote:
				'First impressions matter. This platform made an incredible one on our entire leadership team.',
			author: 'Jack Foster',
			role: 'CEO',
			company: 'FirstImpressions',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'JF',
			rating: 5,
		},
		{
			number: '02',
			quote:
				'Second to none in terms of features and reliability. Our go-to solution for everything.',
			author: 'Kelly Chen',
			role: 'CTO',
			company: 'TechSecond',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'KC',
			rating: 5,
		},
		{
			number: '03',
			quote:
				'Third-party integrations are seamless. Connected our entire tech stack in days.',
			author: 'Leo Park',
			role: 'VP Engineering',
			company: 'IntegratePro',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'LP',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Numbered"
					title="Quote by Quote"
					description="Step through testimonials from customers who have experienced our impact."
				/>

				<div className="space-y-6">
					{testimonials.map((item, index) => (
						<NumberedQuote key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
