import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Minus, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
}

const SectionHeader = ({
	badge,
	title,
}: {
	badge: string;
	title: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Minus className="size-3 text-primary" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title}
		</h2>
	</div>
);

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
	<div className="group">
		<StarRating rating={item.rating} />
		<p className="text-foreground leading-relaxed mt-3 mb-4 text-base @lg:text-lg">
			"{item.quote}"
		</p>
		<div className="flex items-center gap-3">
			<Avatar className="size-10 ring-2 ring-border group-hover:ring-primary/30 transition-all">
				<AvatarImage src={item.avatar} alt={item.author} />
				<AvatarFallback className="bg-muted text-muted-foreground font-semibold text-sm">
					{item.initials}
				</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-semibold text-sm text-foreground">{item.author}</p>
				<p className="text-xs text-muted-foreground">
					{item.role}, {item.company}
				</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote: 'Simple, effective, and reliable. Exactly what we needed.',
			author: 'Paula Chen',
			role: 'CEO',
			company: 'SimpleCo',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'PC',
			rating: 5,
		},
		{
			quote: 'Clean design that our team actually enjoys using.',
			author: 'Quinn Park',
			role: 'Design Lead',
			company: 'CleanUI',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'QP',
			rating: 5,
		},
		{
			quote: 'No unnecessary complexity. Just works brilliantly.',
			author: 'Rachel Lee',
			role: 'CTO',
			company: 'JustWorks',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'RL',
			rating: 5,
		},
	];

	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader badge="Minimal" title="Less is More" />

				<div className="grid grid-cols-1 @lg:grid-cols-3 gap-8 @lg:gap-12">
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
