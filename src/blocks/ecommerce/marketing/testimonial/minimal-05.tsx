import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	avatar: string;
	initials: string;
	rating: number;
}

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-1 mb-4">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-6 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

export default function Main() {
	const testimonial: TestimonialItem = {
		quote:
			'Exceptional product. Exceeded all expectations.',
		author: 'Brian Foster',
		role: 'Founder, StartupXYZ',
		avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
		initials: 'BF',
		rating: 5,
	};

	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-24">
				<div className="flex flex-col @lg:flex-row items-center gap-8 @lg:gap-12">
					<Avatar className="size-24 @lg:size-32 ring-4 ring-border shrink-0">
						<AvatarImage src={testimonial.avatar} alt={testimonial.author} />
						<AvatarFallback className="bg-muted text-muted-foreground font-bold text-2xl">
							{testimonial.initials}
						</AvatarFallback>
					</Avatar>
					<div className="text-center @lg:text-left">
						<StarRating rating={testimonial.rating} />
						<p className="text-xl @md:text-2xl font-medium text-foreground mb-4">
							"{testimonial.quote}"
						</p>
						<p className="text-muted-foreground">
							<span className="font-semibold text-foreground">{testimonial.author}</span>
							{' · '}
							{testimonial.role}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
