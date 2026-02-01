import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating: number;
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Customer Reviews" />
					<Title text="Voices of Satisfaction" />
					<Description text="Our clients share their experiences working with our dedicated team." />
				</div>

				<TestimonialCard
					quote="Exceptional service from start to finish. The team went above and beyond to ensure our project was delivered on time and within budget. Highly recommended!"
					author="Jennifer Park"
					role="Director of Operations"
					company="InnovateTech"
					avatar="https://i.pravatar.cc/100?img=9"
					rating={5}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="secondary" className="gap-1.5">
			<MessageSquare className="size-3" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground max-w-2xl mx-auto">
		{text}
	</p>
);

const StarRating = ({
	rating,
	size = 'default',
}: {
	rating: number;
	size?: 'sm' | 'default' | 'lg';
}) => {
	const sizeClasses = {
		sm: 'size-4',
		default: 'size-5',
		lg: 'size-6',
	};
	return (
		<div className="flex gap-0.5">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`${sizeClasses[size]} ${i < rating ? 'fill-primary text-primary' : 'text-muted'}`}
				/>
			))}
		</div>
	);
};

const TestimonialCard = ({
	quote,
	author,
	role,
	company,
	avatar,
	rating,
}: TestimonialItem) => (
	<Card className="max-w-3xl mx-auto bg-gradient-to-br from-card to-primary/5 border-primary/20 hover:border-primary/40 transition-colors duration-300">
		<CardContent className="p-8 @md:p-10 text-center">
			<div className="flex justify-center mb-6">
				<Avatar className="size-20 @md:size-24 ring-4 ring-primary/20 shadow-lg">
					<AvatarImage src={avatar} alt={author} />
					<AvatarFallback className="bg-primary text-primary-foreground text-xl @md:text-2xl">
						{author
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
			</div>
			<div className="flex justify-center mb-6">
				<StarRating rating={rating} size="lg" />
			</div>
			<blockquote className="text-lg @md:text-xl @lg:text-2xl leading-relaxed mb-8 italic">
				&ldquo;{quote}&rdquo;
			</blockquote>
			<div>
				<div className="font-bold text-lg @md:text-xl mb-1">{author}</div>
				<div className="text-sm @md:text-base text-muted-foreground">
					{role}
				</div>
				<div className="text-sm text-primary font-medium mt-1">{company}</div>
			</div>
		</CardContent>
	</Card>
);
