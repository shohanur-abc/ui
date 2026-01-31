import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Columns, Quote, Star, Play } from 'lucide-react';

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

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 mb-4">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const VideoSection = ({ item }: { item: TestimonialItem }) => (
	<div className="relative h-full min-h-[400px] @lg:min-h-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-2xl overflow-hidden group">
		<div className="absolute inset-0 flex items-center justify-center">
			<button className="size-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
				<Play className="size-8 fill-current ml-1" />
			</button>
		</div>
		<div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
			<div className="flex items-center gap-3">
				<Avatar className="size-12 ring-2 ring-background">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-bold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-bold text-foreground">{item.author}</p>
					<p className="text-sm text-muted-foreground">
						{item.role} · {item.company}
					</p>
				</div>
			</div>
		</div>
	</div>
);

const ContentSection = ({
	badge,
	title,
	highlight,
	testimonial,
	buttonLabel,
}: {
	badge: string;
	title: string;
	highlight: string;
	testimonial: TestimonialItem;
	buttonLabel: string;
}) => (
	<div className="flex flex-col justify-center h-full">
		<Badge variant="outline" className="mb-6 gap-2 border-primary/30 w-fit">
			<Columns className="size-3 text-primary" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight mb-8">
			{title} <span className="text-primary">{highlight}</span>
		</h2>

		<Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card shadow-lg mb-8">
			<CardContent className="p-6 @lg:p-8">
				<Quote className="size-10 text-primary/20 mb-4" />
				<StarRating rating={testimonial.rating} />
				<p className="text-foreground text-lg @lg:text-xl leading-relaxed font-medium">
					"{testimonial.quote}"
				</p>
			</CardContent>
		</Card>

		<Button className="gap-2 w-fit">
			{buttonLabel}
			<ArrowRight className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const videoTestimonial: TestimonialItem = {
		quote: 'Watch our story',
		author: 'Frank Martinez',
		role: 'CEO',
		company: 'GrowthFirst',
		avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
		initials: 'FM',
		rating: 5,
		hasVideo: true,
	};

	const mainTestimonial: TestimonialItem = {
		quote:
			'Switching to this platform was the best business decision we made this year. The results exceeded our expectations, and the team support has been exceptional throughout our journey.',
		author: 'Frank Martinez',
		role: 'CEO',
		company: 'GrowthFirst',
		avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
		initials: 'FM',
		rating: 5,
	};

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-8 @lg:gap-12 items-stretch min-h-[500px]">
					<VideoSection item={videoTestimonial} />
					<ContentSection
						badge="Video Testimonial"
						title="Hear It From"
						highlight="Our Customers"
						testimonial={mainTestimonial}
						buttonLabel="View All Videos"
					/>
				</div>
			</div>
		</section>
	);
}
