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
	<div className="flex gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const TestimonialRow = ({ item }: { item: TestimonialItem }) => (
	<div className="flex items-start gap-4 py-6 border-b border-border/50 last:border-0">
		<Avatar className="size-10 shrink-0 ring-2 ring-border">
			<AvatarImage src={item.avatar} alt={item.author} />
			<AvatarFallback className="bg-muted text-muted-foreground font-semibold text-sm">
				{item.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex items-center justify-between gap-2 mb-1">
				<p className="font-semibold text-sm text-foreground">{item.author}</p>
				<StarRating rating={item.rating} />
			</div>
			<p className="text-xs text-muted-foreground mb-2">{item.role}</p>
			<p className="text-foreground text-sm">{item.quote}</p>
		</div>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote: 'Streamlined our entire workflow. Incredibly intuitive.',
			author: 'Tina Chen',
			role: 'Operations Director',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'TC',
			rating: 5,
		},
		{
			quote: 'Support team responds within minutes. Impressive.',
			author: 'Uma Park',
			role: 'Customer Success',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'UP',
			rating: 5,
		},
		{
			quote: 'Best-in-class security features. Highly secure.',
			author: 'Victor Lee',
			role: 'Security Engineer',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'VL',
			rating: 5,
		},
		{
			quote: 'Integration was painless. Up and running in hours.',
			author: 'Wendy Kim',
			role: 'Tech Lead',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'WK',
			rating: 5,
		},
	];

	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<h2 className="text-2xl @md:text-3xl font-bold tracking-tight mb-8 text-center">
					Recent Reviews
				</h2>
				<div className="divide-y divide-border/50">
					{testimonials.map((item, index) => (
						<TestimonialRow key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
