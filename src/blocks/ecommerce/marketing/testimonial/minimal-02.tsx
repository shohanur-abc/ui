import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
}

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-1 justify-center">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const TestimonialBlock = ({ item }: { item: TestimonialItem }) => (
	<div className="text-center max-w-3xl mx-auto">
		<Quote className="size-12 text-primary/10 mx-auto mb-6" />
		<p className="text-xl @md:text-2xl @lg:text-3xl font-medium text-foreground leading-relaxed mb-8">
			"{item.quote}"
		</p>
		<StarRating rating={item.rating} />
		<div className="flex items-center justify-center gap-3 mt-6">
			<Avatar className="size-12 ring-2 ring-border">
				<AvatarImage src={item.avatar} alt={item.author} />
				<AvatarFallback className="bg-muted text-muted-foreground font-semibold">
					{item.initials}
				</AvatarFallback>
			</Avatar>
			<div className="text-left">
				<p className="font-semibold text-foreground">{item.author}</p>
				<p className="text-sm text-muted-foreground">
					{item.role}, {item.company}
				</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const testimonial: TestimonialItem = {
		quote:
			'This platform has fundamentally changed how our organization operates. The simplicity of design paired with powerful features makes it an absolute joy to use every day.',
		author: 'Sam Foster',
		role: 'CEO',
		company: 'ElegantCorp',
		avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
		initials: 'SF',
		rating: 5,
	};

	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-20 @md:py-28 @xl:py-36">
				<TestimonialBlock item={testimonial} />
			</div>
		</section>
	);
}
