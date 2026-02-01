import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, Columns } from 'lucide-react';

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
	description,
}: {
	badge: string;
	title: string;
	description: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Columns className="size-3 text-primary" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{description}
		</p>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 justify-center">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const ColumnQuote = ({ item }: { item: TestimonialItem }) => (
	<div className="text-center p-6 @lg:p-8 border-r border-border/50 last:border-r-0">
		<Quote className="size-8 text-primary/20 mx-auto mb-4" />
		<blockquote className="text-lg font-medium text-foreground leading-relaxed mb-4 italic">
			"{item.quote}"
		</blockquote>
		<StarRating rating={item.rating} />
		<div className="flex flex-col items-center gap-2 mt-4">
			<Avatar className="size-12 ring-2 ring-primary/10">
				<AvatarImage src={item.avatar} alt={item.author} />
				<AvatarFallback className="bg-primary/10 text-primary font-semibold">
					{item.initials}
				</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-semibold text-foreground">{item.author}</p>
				<p className="text-sm text-muted-foreground">
					{item.role} · {item.company}
				</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote: 'Simple, powerful, and effective. Everything we needed.',
			author: 'Maya Chen',
			role: 'Director',
			company: 'SimpleWorks',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'MC',
			rating: 5,
		},
		{
			quote: 'Transformed our workflow in ways we never imagined.',
			author: 'Nathan Lee',
			role: 'Manager',
			company: 'WorkflowPro',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'NL',
			rating: 5,
		},
		{
			quote: 'Best decision we made this year. Results came fast.',
			author: 'Olivia Park',
			role: 'CEO',
			company: 'FastResults',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'OP',
			rating: 5,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Side by Side"
					title="Parallel Praise"
					description="See how different customers experience the same excellence."
				/>

				<div className="grid grid-cols-1 @lg:grid-cols-3 divide-y @lg:divide-y-0 divide-border/50 border border-border/50 rounded-2xl bg-card">
					{testimonials.map((item, index) => (
						<ColumnQuote key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
