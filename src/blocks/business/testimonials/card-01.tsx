import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating?: number;
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Client Success Stories" />
					<Title text="What Our Clients Say" />
					<Description text="Discover how we've helped businesses transform their operations and achieve remarkable results." />
				</div>

				<TestimonialCard
					quote="Working with this team has been transformative for our business. They delivered a solution that exceeded all expectations and helped us scale our operations by 300%."
					author="Victoria Chen"
					role="Chief Technology Officer"
					company="TechForward Inc."
					avatar="https://i.pravatar.cc/100?img=1"
					rating={5}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="secondary" className="gap-1.5">
			<Star className="size-3 fill-primary text-primary" />
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

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-1 mb-6">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted'}`}
			/>
		))}
	</div>
);

const TestimonialCard = ({
	quote,
	author,
	role,
	company,
	avatar,
	rating = 5,
}: TestimonialItem) => (
	<Card className="max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
		<CardContent className="p-8 @md:p-12">
			<Quote className="size-12 @md:size-14 text-primary/20 mb-6" />
			<StarRating rating={rating} />
			<blockquote className="text-xl @md:text-2xl @lg:text-3xl leading-relaxed mb-8 font-medium">
				&ldquo;{quote}&rdquo;
			</blockquote>
			<div className="flex items-center gap-4 pt-6 border-t border-border">
				<Avatar className="size-14 @md:size-16 ring-2 ring-primary/20">
					<AvatarImage src={avatar} alt={author} />
					<AvatarFallback className="bg-primary text-primary-foreground text-lg">
						{author
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-semibold text-lg @md:text-xl">{author}</div>
					<div className="text-sm @md:text-base text-muted-foreground">
						{role}
					</div>
					<div className="text-sm text-primary font-medium">{company}</div>
				</div>
			</div>
		</CardContent>
	</Card>
);
