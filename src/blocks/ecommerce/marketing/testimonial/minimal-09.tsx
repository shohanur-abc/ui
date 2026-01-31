import { Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	rating: number;
}

const StatsBanner = ({
	rating,
	reviews,
}: {
	rating: string;
	reviews: string;
}) => (
	<div className="flex items-center justify-center gap-8 mb-12">
		<div className="text-center">
			<div className="flex items-center gap-1 justify-center">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star key={i} className="size-5 fill-primary text-primary" />
				))}
			</div>
			<p className="text-2xl font-bold text-foreground mt-1">{rating}</p>
			<p className="text-sm text-muted-foreground">Average rating</p>
		</div>
		<div className="h-12 w-px bg-border" />
		<div className="text-center">
			<p className="text-2xl font-bold text-foreground">{reviews}</p>
			<p className="text-sm text-muted-foreground">Total reviews</p>
		</div>
	</div>
);

const QuoteBlock = ({ item }: { item: TestimonialItem }) => (
	<div className="text-center py-4">
		<p className="text-foreground italic">"{item.quote}"</p>
		<p className="text-sm text-muted-foreground mt-2">— {item.author}</p>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote: 'Brilliant simplicity.',
			author: 'Olivia Chen',
			rating: 5,
		},
		{
			quote: 'Works perfectly.',
			author: 'Peter Park',
			rating: 5,
		},
		{
			quote: 'Highly recommended.',
			author: 'Quinn Lee',
			rating: 5,
		},
	];

	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<StatsBanner rating="4.9" reviews="5,000+" />
				<div className="divide-y divide-border/50">
					{testimonials.map((item, index) => (
						<QuoteBlock key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
