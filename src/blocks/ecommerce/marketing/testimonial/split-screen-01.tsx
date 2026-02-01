import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Quote, SplitSquareHorizontal, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
}

const SectionBadge = ({
	icon: Icon,
	label,
}: {
	icon: React.ElementType;
	label: string;
}) => (
	<Badge variant="outline" className="mb-6 gap-2 border-primary/30">
		<Icon className="size-3 text-primary" />
		{label}
	</Badge>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 mb-6">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const ContentSide = ({
	title,
	highlight,
	description,
	buttonLabel,
}: {
	title: string;
	highlight: string;
	description: string;
	buttonLabel: string;
}) => (
	<div className="flex flex-col justify-center">
		<SectionBadge icon={SplitSquareHorizontal} label="Customer Stories" />
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-6">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
		<p className="text-muted-foreground text-lg mb-8 max-w-lg">{description}</p>
		<div>
			<Button className="gap-2">
				{buttonLabel}
				<ArrowRight className="size-4" />
			</Button>
		</div>
	</div>
);

const TestimonialSide = ({ item }: { item: TestimonialItem }) => (
	<div className="relative bg-gradient-to-br from-primary/10 via-card to-card rounded-2xl p-8 @lg:p-10 border border-primary/10 shadow-xl shadow-primary/5">
		<Quote className="size-12 text-primary/20 mb-4" />
		<StarRating rating={item.rating} />
		<p className="text-foreground text-xl @lg:text-2xl leading-relaxed font-medium mb-8">
			"{item.quote}"
		</p>
		<div className="flex items-center gap-4">
			<Avatar className="size-14 ring-4 ring-primary/20">
				<AvatarImage src={item.avatar} alt={item.author} />
				<AvatarFallback className="bg-primary text-primary-foreground font-bold">
					{item.initials}
				</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-bold text-lg text-foreground">{item.author}</p>
				<p className="text-muted-foreground">
					{item.role} at {item.company}
				</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const testimonial: TestimonialItem = {
		quote:
			'This platform completely transformed our workflow. The efficiency gains were immediate and the ROI has been exceptional. I recommend it to everyone.',
		author: 'Benjamin Chen',
		role: 'VP of Operations',
		company: 'TechScale Inc',
		avatar:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
		initials: 'BC',
		rating: 5,
	};

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-10 @lg:gap-16 items-center">
					<ContentSide
						title="What Our Customers"
						highlight="Are Saying"
						description="Join thousands of satisfied customers who have transformed their businesses with our platform."
						buttonLabel="Read More Stories"
					/>
					<TestimonialSide item={testimonial} />
				</div>
			</div>
		</section>
	);
}
