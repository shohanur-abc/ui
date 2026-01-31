import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Focus, Quote, Star, ArrowRight } from 'lucide-react';

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
	<div className="text-center mb-12 @lg:mb-16">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<Focus className="size-3" />
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
	<div className="flex justify-center gap-0.5 mb-6">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-6 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const FeaturedQuote = ({ item }: { item: TestimonialItem }) => (
	<Card className="max-w-3xl mx-auto text-center border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card shadow-xl shadow-primary/5 overflow-hidden group">
		<CardContent className="p-8 @md:p-10 @lg:p-12">
			<div className="flex justify-center mb-6">
				<Avatar className="size-20 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-bold text-2xl">
						{item.initials}
					</AvatarFallback>
				</Avatar>
			</div>
			<StarRating rating={item.rating} />
			<Quote className="size-10 text-primary/20 mx-auto mb-4" />
			<p className="text-foreground text-xl @md:text-2xl @lg:text-3xl leading-relaxed font-medium mb-8">
				"{item.quote}"
			</p>
			<div className="pt-6 border-t border-border/50">
				<p className="font-bold text-xl text-foreground mb-1">{item.author}</p>
				<p className="text-muted-foreground text-lg">
					{item.role} at {item.company}
				</p>
			</div>
		</CardContent>
	</Card>
);

const CTASection = ({
	text,
	buttonLabel,
}: {
	text: string;
	buttonLabel: string;
}) => (
	<div className="flex flex-col @sm:flex-row items-center justify-center gap-4 mt-12">
		<p className="text-muted-foreground">{text}</p>
		<Button className="gap-2">
			{buttonLabel}
			<ArrowRight className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const testimonial: TestimonialItem = {
		quote:
			'This platform has completely revolutionized how our team works together. The efficiency gains have been remarkable, and the support team is always there when we need them. I cannot recommend it enough.',
		author: 'Nathan Park',
		role: 'VP of Operations',
		company: 'Enterprise Solutions',
		avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
		initials: 'NP',
		rating: 5,
	};

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Featured Review"
					title="What Our Customers Say"
					description="Real feedback from real customers who have transformed their businesses."
				/>

				<FeaturedQuote item={testimonial} />

				<CTASection text="Ready to join them?" buttonLabel="Start Free Trial" />
			</div>
		</section>
	);
}
