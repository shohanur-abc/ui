import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
}

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
	<div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 @md:mb-6">
		<Icon className="size-4 text-primary" />
		<span className="uppercase tracking-wider font-medium">{text}</span>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 @md:mb-12">
		{text}
	</p>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-1">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`}
			/>
		))}
	</div>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
		<CardContent className="p-6 @md:p-8">
			<Quote className="size-8 @md:size-10 text-primary/20 mb-4" />
			<p className="text-foreground text-base @md:text-lg leading-relaxed mb-6">
				{item.quote}
			</p>
			<StarRating rating={item.rating} />
			<div className="flex items-center gap-4 mt-6 pt-6 border-t border-border/50">
				<Avatar className="size-12 ring-2 ring-primary/10">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary font-semibold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-foreground">{item.author}</p>
					<p className="text-sm text-muted-foreground">
						{item.role} at {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const NavigationControls = ({
	onPrev,
	onNext,
	prevLabel,
	nextLabel,
}: {
	onPrev?: () => void;
	onNext?: () => void;
	prevLabel: string;
	nextLabel: string;
}) => (
	<div className="flex items-center gap-3 mt-8 @md:mt-12 justify-center">
		<Button
			variant="outline"
			size="icon"
			onClick={onPrev}
			aria-label={prevLabel}
			className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
		>
			<ChevronLeft className="size-5" />
		</Button>
		<Button
			variant="outline"
			size="icon"
			onClick={onNext}
			aria-label={nextLabel}
			className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
		>
			<ChevronRight className="size-5" />
		</Button>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'This product completely transformed our workflow. The team productivity increased by 40% within the first month.',
			author: 'Sarah Mitchell',
			role: 'Product Manager',
			company: 'TechFlow Inc',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'SM',
			rating: 5,
		},
		{
			quote:
				'Exceptional quality and outstanding customer support. I highly recommend this to any business looking to scale.',
			author: 'James Rodriguez',
			role: 'CEO',
			company: 'StartupHub',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'JR',
			rating: 5,
		},
		{
			quote:
				'The best investment we made this year. Clean design, intuitive interface, and powerful features.',
			author: 'Emily Chen',
			role: 'Design Lead',
			company: 'Creative Studio',
			avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
			initials: 'EC',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-12 @lg:mb-16">
					<Eyebrow icon={Star} text="Customer Stories" />
					<Title text="What Our Customers" highlight="Say" />
					<Description text="Discover why thousands of businesses trust us to deliver exceptional results. Real stories from real customers." />
				</div>

				<div className="grid grid-cols-1 @lg:grid-cols-3 gap-6 @xl:gap-8">
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>

				<NavigationControls
					prevLabel="Previous testimonial"
					nextLabel="Next testimonial"
				/>
			</div>
		</section>
	);
}
