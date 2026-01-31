import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Blocks, Quote, Star, Video } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	hasVideo?: boolean;
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
	<div className="max-w-3xl mx-auto text-center mb-12 @lg:mb-16">
		<Badge variant="secondary" className="mb-4 gap-2">
			<Blocks className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg">{description}</p>
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

const VideoIndicator = () => (
	<div className="absolute top-4 right-4 size-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
		<Video className="size-4" />
	</div>
);

const VerticalCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="relative border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group overflow-hidden">
		{item.hasVideo && <VideoIndicator />}
		<CardContent className="p-6 flex flex-col">
			<Quote className="size-8 text-primary/20 mb-3" />
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed mt-3 mb-5 flex-1">"{item.quote}"</p>
			<div className="flex items-center gap-3 pt-4 border-t border-border/50">
				<Avatar className="size-10 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
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
		</CardContent>
	</Card>
);

const HorizontalCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="col-span-full @lg:col-span-2 border-primary/20 bg-gradient-to-r from-primary/10 via-card to-card shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group">
		<CardContent className="p-6 @md:p-8">
			<div className="flex flex-col @md:flex-row gap-6">
				<div className="flex items-center gap-4 @md:w-52 shrink-0">
					<Avatar className="size-16 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-bold text-lg text-foreground">{item.author}</p>
						<p className="text-muted-foreground">{item.role}</p>
						<p className="text-sm text-muted-foreground">{item.company}</p>
					</div>
				</div>
				<div className="flex-1">
					<Quote className="size-8 text-primary/30 mb-3" />
					<StarRating rating={item.rating} />
					<p className="text-foreground text-lg leading-relaxed mt-3">"{item.quote}"</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const featuredTestimonial: TestimonialItem = {
		quote:
			'We have been customers for over 3 years now. The platform has grown with us, and the team behind it truly cares about customer success.',
		author: 'Victor Chen',
		role: 'Founder & CEO',
		company: 'InnovateTech',
		avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
		initials: 'VC',
		rating: 5,
	};

	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The onboarding was seamless. We were productive within the first hour.',
			author: 'Wendy Parks',
			role: 'Operations Manager',
			company: 'QuickStart',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'WP',
			rating: 5,
			hasVideo: true,
		},
		{
			quote:
				'Integration with our existing stack was effortless.',
			author: 'Xavier Lopez',
			role: 'Dev Lead',
			company: 'IntegratePro',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'XL',
			rating: 5,
		},
		{
			quote:
				'Customer support is available 24/7 and incredibly knowledgeable.',
			author: 'Yvonne Kim',
			role: 'Support Lead',
			company: 'AlwaysOn',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'YK',
			rating: 5,
		},
		{
			quote:
				'The reporting features have transformed our decision-making process.',
			author: 'Zack Miller',
			role: 'Analytics Lead',
			company: 'DataDriven',
			avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'ZM',
			rating: 5,
			hasVideo: true,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Mixed Media"
					title="Stories That"
					highlight="Inspire"
					description="Watch and read testimonials from our community of satisfied customers."
				/>

				<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4 @lg:gap-6">
					<HorizontalCard item={featuredTestimonial} />
					{testimonials.map((item, index) => (
						<VerticalCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
