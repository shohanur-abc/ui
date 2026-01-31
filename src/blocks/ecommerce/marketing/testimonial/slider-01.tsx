import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Disc, Quote, Star } from 'lucide-react';

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
		<Badge variant="secondary" className="mb-4 gap-2">
			<Disc className="size-3" />
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
	<div className="flex gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const SliderCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="min-w-[300px] @md:min-w-[400px] @lg:min-w-[450px] shrink-0 border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 snap-center group">
		<CardContent className="p-6 @md:p-8">
			<Quote className="size-10 text-primary/20 mb-4" />
			<StarRating rating={item.rating} />
			<p className="text-foreground text-lg leading-relaxed mt-4 mb-6">"{item.quote}"</p>
			<div className="flex items-center gap-4 pt-5 border-t border-border/50">
				<Avatar className="size-12 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-semibold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-bold text-foreground">{item.author}</p>
					<p className="text-sm text-muted-foreground">
						{item.role} at {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const SliderControls = ({
	prevLabel,
	nextLabel,
}: {
	prevLabel: string;
	nextLabel: string;
}) => (
	<div className="flex items-center justify-center gap-3 mt-8 @md:mt-12">
		<Button
			variant="outline"
			size="icon-lg"
			aria-label={prevLabel}
			className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
		>
			<ArrowLeft className="size-5" />
		</Button>
		<div className="flex gap-2">
			{[0, 1, 2, 3].map((i) => (
				<button
					key={i}
					className={`h-2 rounded-full transition-all ${
						i === 0 ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
					}`}
					aria-label={`Slide ${i + 1}`}
				/>
			))}
		</div>
		<Button
			variant="outline"
			size="icon-lg"
			aria-label={nextLabel}
			className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
		>
			<ArrowRight className="size-5" />
		</Button>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The platform exceeded all our expectations. Implementation was smooth and the results were immediate.',
			author: 'Daniel Foster',
			role: 'CTO',
			company: 'TechForward',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'DF',
			rating: 5,
		},
		{
			quote:
				'Customer support is world-class. They responded within minutes and resolved our issue on the first call.',
			author: 'Emily Chen',
			role: 'Support Manager',
			company: 'HelpDesk Pro',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'EC',
			rating: 5,
		},
		{
			quote:
				'We switched from a competitor and the difference is night and day. Much better value.',
			author: 'Frank Williams',
			role: 'Operations Lead',
			company: 'Streamline Co',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'FW',
			rating: 5,
		},
		{
			quote:
				'The analytics dashboard gives us visibility we never had before. Game-changing for our business.',
			author: 'Grace Lee',
			role: 'Data Analyst',
			company: 'InsightCorp',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'GL',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8">
					<SectionHeader
						badge="Testimonials"
						title="See What Others Are Saying"
						description="Swipe through reviews from our satisfied customers around the globe."
					/>
				</div>

				<div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-4 @sm:px-6 @2xl:px-8 scrollbar-hide">
					{testimonials.map((item, index) => (
						<SliderCard key={index} item={item} />
					))}
				</div>

				<SliderControls prevLabel="Previous" nextLabel="Next" />
			</div>
		</section>
	);
}
