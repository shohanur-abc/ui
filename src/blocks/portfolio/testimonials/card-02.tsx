import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

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
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Testimonials" />
					<Title text="Loved by Clients" />
					<Description text="See what our satisfied clients have to say about working together." />
				</div>

				<TestimonialGrid
					items={[
						{
							quote:
								'Delivered exceptional results that exceeded all our expectations. The project was completed on time with meticulous attention to every detail.',
							author: 'James Wilson',
							role: 'Founder',
							company: 'TechStart Inc',
							avatar: 'https://i.pravatar.cc/100?img=11',
							rating: 5,
						},
						{
							quote:
								"A true professional who understands both design and development. Our collaboration resulted in a product we're incredibly proud of.",
							author: 'Maria Garcia',
							role: 'Creative Director',
							company: 'Studio Arc',
							avatar: 'https://i.pravatar.cc/100?img=12',
							rating: 5,
						},
						{
							quote:
								'Outstanding communication and technical skills. They took our complex requirements and delivered an elegant, user-friendly solution.',
							author: 'Robert Chen',
							role: 'CEO',
							company: 'DataFlow',
							avatar: 'https://i.pravatar.cc/100?img=13',
							rating: 5,
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="secondary">{text}</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-1">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
			/>
		))}
	</div>
);

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
	<ul className="grid @lg:grid-cols-3 gap-6 @md:gap-8">
		{items.map(({ quote, author, role, company, avatar, rating }, i) => (
			<li key={i}>
				<Card className="h-full hover:shadow-lg transition-shadow duration-300">
					<CardContent className="p-6 @md:p-8 flex flex-col h-full">
						<StarRating rating={rating} />
						<blockquote className="text-base @md:text-lg leading-relaxed my-6 flex-1">
							&ldquo;{quote}&rdquo;
						</blockquote>
						<div className="flex items-center gap-3 pt-4 border-t">
							<Avatar className="size-11 @md:size-12">
								<AvatarImage src={avatar} />
								<AvatarFallback className="bg-primary text-primary-foreground text-sm">
									{author[0]}
								</AvatarFallback>
							</Avatar>
							<div>
								<div className="font-semibold">{author}</div>
								<div className="text-sm text-muted-foreground">
									{role}, {company}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</li>
		))}
	</ul>
);
