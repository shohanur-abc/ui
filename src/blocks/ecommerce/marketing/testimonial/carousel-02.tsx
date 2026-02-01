import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Quote, Sparkles, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	verified: boolean;
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge variant="secondary" className="gap-2 px-4 py-2 mb-6">
		<Icon className="size-4 text-primary" />
		<span className="font-medium">{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight mb-6">
		{text}
	</h2>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted-foreground/20'}`}
			/>
		))}
	</div>
);

const VerifiedBadge = ({ text }: { text: string }) => (
	<Badge
		variant="outline"
		className="text-xs gap-1 text-primary border-primary/30 bg-primary/5"
	>
		<Sparkles className="size-3" />
		{text}
	</Badge>
);

const TestimonialSlide = ({ item }: { item: TestimonialItem }) => (
	<div className="relative">
		<div className="absolute -top-8 -left-4 @md:-top-12 @md:-left-8">
			<Quote className="size-16 @md:size-24 text-primary/10" />
		</div>
		<div className="relative z-10">
			<StarRating rating={item.rating} />
			<blockquote className="text-xl @sm:text-2xl @lg:text-3xl @xl:text-4xl font-medium leading-relaxed mt-6 mb-8 text-foreground">
				"{item.quote}"
			</blockquote>
			<div className="flex items-center gap-4 flex-wrap">
				<Avatar className="size-14 @md:size-16 ring-4 ring-background shadow-lg">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<div className="flex items-center gap-3 flex-wrap">
						<p className="font-bold text-lg text-foreground">{item.author}</p>
						{item.verified && <VerifiedBadge text="Verified" />}
					</div>
					<p className="text-muted-foreground">
						{item.role} · {item.company}
					</p>
				</div>
			</div>
		</div>
	</div>
);

const CarouselNavigation = ({
	current,
	total,
	prevLabel,
	nextLabel,
}: {
	current: number;
	total: number;
	prevLabel: string;
	nextLabel: string;
}) => (
	<div className="flex items-center justify-between mt-12 @lg:mt-16 pt-8 border-t border-border/50">
		<div className="flex items-center gap-2">
			{Array.from({ length: total }).map((_, i) => (
				<button
					key={i}
					className={`h-2 rounded-full transition-all duration-300 ${
						i === current
							? 'w-8 bg-primary'
							: 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
					}`}
					aria-label={`Go to slide ${i + 1}`}
				/>
			))}
		</div>
		<div className="flex items-center gap-3">
			<Button
				variant="outline"
				size="icon-lg"
				aria-label={prevLabel}
				className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary"
			>
				<ArrowLeft className="size-5" />
			</Button>
			<Button
				variant="outline"
				size="icon-lg"
				aria-label={nextLabel}
				className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary"
			>
				<ArrowRight className="size-5" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const testimonial: TestimonialItem = {
		quote:
			'This platform has revolutionized how we approach customer engagement. The insights we gained have directly contributed to a 60% increase in customer retention.',
		author: 'Alexandra Rivera',
		role: 'Chief Marketing Officer',
		company: 'Global Dynamics',
		avatar:
			'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
		initials: 'AR',
		rating: 5,
		verified: true,
	};

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-12 @lg:mb-16">
					<Eyebrow icon={Sparkles} text="Trusted by Industry Leaders" />
					<Title text="Hear From Our Happy Customers" />
				</div>

				<TestimonialSlide item={testimonial} />

				<CarouselNavigation
					current={0}
					total={4}
					prevLabel="Previous"
					nextLabel="Next"
				/>
			</div>
		</section>
	);
}
