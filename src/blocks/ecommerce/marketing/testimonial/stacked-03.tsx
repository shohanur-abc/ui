import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Boxes, Quote, Star } from 'lucide-react';

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
	<div className="max-w-2xl mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Boxes className="size-3 text-primary" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-lg">{description}</p>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 mb-4">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const LargeTestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="h-full border-border/50 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500 group">
		<CardContent className="p-8 flex flex-col h-full">
			<Quote className="size-12 text-primary/20 mb-4" />
			<StarRating rating={item.rating} />
			<p className="text-foreground text-xl @lg:text-2xl leading-relaxed flex-1 mb-6 font-medium">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-4 pt-6 border-t border-border/50">
				<Avatar className="size-14 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-bold text-lg text-foreground">{item.author}</p>
					<p className="text-muted-foreground">
						{item.role} at {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const SmallTestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
		<CardContent className="p-5">
			<Quote className="size-6 text-primary/20 mb-3" />
			<StarRating rating={item.rating} />
			<p className="text-foreground text-sm leading-relaxed mb-4">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-2.5">
				<Avatar className="size-9 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-sm text-foreground">{item.author}</p>
					<p className="text-xs text-muted-foreground">{item.role}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const featuredTestimonial: TestimonialItem = {
		quote:
			'This platform has fundamentally changed how we operate. The ROI was immediate and the team adoption was seamless. I cannot imagine going back to our old workflow.',
		author: 'Tara Johnson',
		role: 'Chief Operating Officer',
		company: 'FutureCorp',
		avatar:
			'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
		initials: 'TJ',
		rating: 5,
	};

	const testimonials: TestimonialItem[] = [
		{
			quote: 'Fast, reliable, and incredibly intuitive.',
			author: 'Uma Singh',
			role: 'Developer',
			company: 'CodeCraft',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'US',
			rating: 5,
		},
		{
			quote: 'Support team is world-class. Always helpful.',
			author: 'Victor Brown',
			role: 'IT Manager',
			company: 'TechSupport',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'VB',
			rating: 5,
		},
		{
			quote: 'Exactly what our team needed. Perfect fit.',
			author: 'Wendy Park',
			role: 'Team Lead',
			company: 'CollabHub',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'WP',
			rating: 5,
		},
		{
			quote: 'Incredible value for the price. Highly recommend.',
			author: 'Xavier Chen',
			role: 'Founder',
			company: 'StartupX',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'XC',
			rating: 5,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Mixed Layout"
					title="Featured & Supporting Reviews"
					description="Hear from our most passionate customers about their experience."
				/>

				<div className="grid grid-cols-1 @xl:grid-cols-2 gap-6">
					<LargeTestimonialCard item={featuredTestimonial} />
					<div className="grid grid-cols-1 @sm:grid-cols-2 gap-4">
						{testimonials.map((item, index) => (
							<SmallTestimonialCard key={index} item={item} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
