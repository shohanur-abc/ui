import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
}

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 mb-3">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const CompactCard = ({ item }: { item: TestimonialItem }) => (
	<div className="p-5 rounded-lg border border-border/50 hover:border-primary/20 transition-colors">
		<StarRating rating={item.rating} />
		<p className="text-foreground text-sm leading-relaxed mb-4">
			"{item.quote}"
		</p>
		<div className="flex items-center gap-2">
			<Avatar className="size-7">
				<AvatarImage src={item.avatar} alt={item.author} />
				<AvatarFallback className="bg-muted text-muted-foreground font-medium text-xs">
					{item.initials}
				</AvatarFallback>
			</Avatar>
			<span className="text-xs text-muted-foreground">
				{item.author}, {item.company}
			</span>
		</div>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote: 'Perfect for our needs. Simple and effective.',
			author: 'Xavier Chen',
			company: 'SimpleTech',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'XC',
			rating: 5,
		},
		{
			quote: 'Clean interface. Team loves it.',
			author: 'Yara Park',
			company: 'CleanDesign',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'YP',
			rating: 5,
		},
		{
			quote: 'Fast and reliable. No complaints.',
			author: 'Zach Lee',
			company: 'FastTrack',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'ZL',
			rating: 5,
		},
		{
			quote: 'Great value for money. Recommended.',
			author: 'Amy Kim',
			company: 'ValueFirst',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'AK',
			rating: 5,
		},
	];

	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
					{testimonials.map((item, index) => (
						<CompactCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
