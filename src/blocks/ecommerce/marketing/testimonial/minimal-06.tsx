import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestimonialItem {
	quote: string;
	author: string;
	avatar: string;
	initials: string;
}

const InlineTestimonial = ({ item }: { item: TestimonialItem }) => (
	<div className="flex items-center gap-4 py-4">
		<Avatar className="size-10 shrink-0">
			<AvatarImage src={item.avatar} alt={item.author} />
			<AvatarFallback className="bg-muted font-medium text-sm">
				{item.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<p className="text-sm text-foreground truncate">"{item.quote}"</p>
			<p className="text-xs text-muted-foreground">— {item.author}</p>
		</div>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote: 'Absolutely love it. Game changer.',
			author: 'Clara Chen',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'CC',
		},
		{
			quote: 'Best tool we have ever used.',
			author: 'David Park',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'DP',
		},
		{
			quote: 'Simple, fast, effective.',
			author: 'Emma Lee',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'EL',
		},
	];

	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16">
				<div className="flex flex-col @lg:flex-row items-center justify-between gap-8">
					<div className="flex-1">
						<div className="flex items-center gap-1 mb-2">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star key={i} className="size-5 fill-primary text-primary" />
							))}
							<span className="ml-2 text-sm font-medium text-foreground">4.9/5</span>
						</div>
						<p className="text-muted-foreground text-sm">Based on 2,000+ reviews</p>
					</div>

					<div className="flex-1 divide-y divide-border/50">
						{testimonials.map((item, index) => (
							<InlineTestimonial key={index} item={item} />
						))}
					</div>

					<div className="flex-shrink-0">
						<Button variant="outline" className="gap-2">
							View all reviews
							<ArrowRight className="size-4" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
