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

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
	<div className="bg-muted/30 rounded-lg p-5 hover:bg-muted/50 transition-colors">
		<StarRating rating={item.rating} />
		<p className="text-foreground text-sm leading-relaxed my-3">
			"{item.quote}"
		</p>
		<div className="flex items-center gap-2">
			<Avatar className="size-8">
				<AvatarImage src={item.avatar} alt={item.author} />
				<AvatarFallback className="bg-muted-foreground/10 font-medium text-xs">
					{item.initials}
				</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-medium text-xs text-foreground">{item.author}</p>
				<p className="text-[10px] text-muted-foreground">{item.role}</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote: 'Incredibly intuitive. Our team adopted it immediately.',
			author: 'Frank Kim',
			role: 'Product Manager',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'FK',
			rating: 5,
		},
		{
			quote: 'Sleek design. Powerful features hidden under simplicity.',
			author: 'Grace Chen',
			role: 'UX Designer',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'GC',
			rating: 5,
		},
		{
			quote: 'Documentation is excellent. Easy to get started.',
			author: 'Henry Park',
			role: 'Developer',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'HP',
			rating: 5,
		},
		{
			quote: 'Customer support is responsive and helpful.',
			author: 'Iris Lee',
			role: 'Support Lead',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'IL',
			rating: 5,
		},
		{
			quote: 'Pricing is fair. Great value for what you get.',
			author: 'Jack Foster',
			role: 'Finance Director',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'JF',
			rating: 5,
		},
		{
			quote: 'Performance is outstanding. Fast load times.',
			author: 'Kelly Davis',
			role: 'Tech Lead',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'KD',
			rating: 5,
		},
	];

	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<h2 className="text-2xl @md:text-3xl font-bold tracking-tight mb-8 text-center">
					What People Say
				</h2>
				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-4">
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
