import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	avatar: string;
	initials: string;
	rating: number;
}

const TestimonialStrip = ({ item }: { item: TestimonialItem }) => (
	<div className="flex items-center gap-4 p-4 border-l-2 border-primary/20 hover:border-primary transition-colors">
		<Avatar className="size-12 shrink-0">
			<AvatarImage src={item.avatar} alt={item.author} />
			<AvatarFallback className="bg-muted font-semibold">
				{item.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<div className="flex gap-0.5 mb-1">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						className={`size-3 ${i < item.rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
					/>
				))}
			</div>
			<p className="text-sm text-foreground">"{item.quote}"</p>
			<p className="text-xs text-muted-foreground mt-1">— {item.author}</p>
		</div>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote: 'Simple and elegant. Love the attention to detail.',
			author: 'Leo Chen',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'LC',
			rating: 5,
		},
		{
			quote: 'Exactly what we needed. No bloat, just functionality.',
			author: 'Maria Park',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'MP',
			rating: 5,
		},
		{
			quote: 'Clean code, clean design, clean experience.',
			author: 'Nathan Lee',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'NL',
			rating: 5,
		},
	];

	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20">
				<div className="space-y-4">
					{testimonials.map((item, index) => (
						<TestimonialStrip key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
