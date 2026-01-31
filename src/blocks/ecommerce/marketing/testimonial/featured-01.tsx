import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star, Crown, ArrowRight, Play } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	companyLogo: string;
	avatar: string;
	initials: string;
	rating: number;
	stats: { label: string; value: string }[];
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
	<div className="mb-12 @lg:mb-16">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<Crown className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight mb-4">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
		<p className="text-muted-foreground text-lg @md:text-xl max-w-2xl">
			{description}
		</p>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-1">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const HeroTestimonial = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5 shadow-2xl shadow-primary/10">
		<CardContent className="p-8 @lg:p-12">
			<div className="flex flex-col @xl:flex-row gap-8 @xl:gap-12">
				<div className="@xl:w-1/3 flex flex-col gap-6">
					<div className="relative">
						<Avatar className="size-24 ring-4 ring-primary/20">
							<AvatarImage src={item.avatar} alt={item.author} />
							<AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
								{item.initials}
							</AvatarFallback>
						</Avatar>
						<div className="absolute -bottom-2 -right-2 size-8 bg-primary rounded-full flex items-center justify-center">
							<Crown className="size-4 text-primary-foreground" />
						</div>
					</div>
					<div>
						<p className="text-xl font-bold text-foreground">{item.author}</p>
						<p className="text-muted-foreground">{item.role}</p>
						<p className="text-sm text-primary font-medium">{item.company}</p>
					</div>
					<img
						src={item.companyLogo}
						alt={item.company}
						className="h-8 w-auto opacity-50 grayscale"
					/>
				</div>
				<div className="@xl:w-2/3">
					<Quote className="size-12 text-primary/30 mb-4" />
					<StarRating rating={item.rating} />
					<blockquote className="text-xl @lg:text-2xl @xl:text-3xl font-medium text-foreground leading-relaxed my-6">
						"{item.quote}"
					</blockquote>
					<div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
						{item.stats.map((stat, i) => (
							<div key={i} className="text-center">
								<p className="text-2xl @lg:text-3xl font-bold text-primary">{stat.value}</p>
								<p className="text-sm text-muted-foreground">{stat.label}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ActionButtons = ({ primaryText, secondaryText }: { primaryText: string; secondaryText: string }) => (
	<div className="flex flex-col @sm:flex-row gap-4 mt-10">
		<Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
			{primaryText}
			<ArrowRight className="size-4" />
		</Button>
		<Button size="lg" variant="outline" className="gap-2">
			<Play className="size-4" />
			{secondaryText}
		</Button>
	</div>
);

export default function Main() {
	const testimonial: TestimonialItem = {
		quote:
			'This platform has been instrumental in our digital transformation journey. We have seen unprecedented growth in customer engagement, operational efficiency, and team productivity.',
		author: 'Alexandra Chen',
		role: 'Chief Executive Officer',
		company: 'TechVision Global',
		companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=50&fit=crop',
		avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
		initials: 'AC',
		rating: 5,
		stats: [
			{ label: 'Revenue Increase', value: '340%' },
			{ label: 'Time Saved', value: '120h/mo' },
			{ label: 'Team Growth', value: '5x' },
		],
	};

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 relative z-10">
				<SectionHeader
					badge="Featured Story"
					title="Meet Our"
					highlight="Champion"
					description="Discover how industry leaders achieve extraordinary results with our platform."
				/>

				<HeroTestimonial item={testimonial} />

				<ActionButtons primaryText="Start Your Journey" secondaryText="Watch Full Story" />
			</div>
		</section>
	);
}
