import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating: number;
	date: string;
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Client Love" />
					<Title text="Heartfelt Appreciation" />
					<Description text="Words from clients who became partners and friends." />
				</div>

				<TestimonialCard
					quote="More than just a vendor, they became true partners in our success. Their dedication, creativity, and genuine care for our business made all the difference."
					author="Rachel Green"
					role="Co-Founder"
					company="BloomTech Ventures"
					avatar="https://i.pravatar.cc/100?img=25"
					rating={5}
					date="December 2025"
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="secondary" className="gap-1.5 text-primary">
			<Heart className="size-3 fill-primary" />
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
	<div className="flex gap-1">
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
	rating,
	date,
}: TestimonialItem) => (
	<Card className="max-w-3xl mx-auto bg-gradient-to-br from-primary/5 via-card to-card">
		<CardContent className="p-8 @md:p-12 text-center">
			<div className="relative mb-8">
				<Avatar className="size-24 @md:size-28 mx-auto ring-4 ring-primary/20 shadow-xl">
					<AvatarImage src={avatar} alt={author} />
					<AvatarFallback className="bg-primary text-primary-foreground text-2xl">
						{author
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<HeartDecorative />
			</div>
			<div className="flex justify-center mb-6">
				<StarRating rating={rating} />
			</div>
			<Quote className="size-8 text-primary/20 mx-auto mb-4" />
			<blockquote className="text-lg @md:text-xl @lg:text-2xl leading-relaxed mb-8 max-w-2xl mx-auto">
				&ldquo;{quote}&rdquo;
			</blockquote>
			<div className="mb-2">
				<div className="font-bold text-lg @md:text-xl">{author}</div>
				<div className="text-sm text-muted-foreground">
					{role} at {company}
				</div>
			</div>
			<div className="text-xs text-muted-foreground">{date}</div>
		</CardContent>
	</Card>
);

const HeartDecorative = () => (
	<div className="absolute -bottom-2 right-1/2 translate-x-8">
		<div className="bg-card rounded-full p-2 shadow-lg">
			<Heart className="size-5 fill-primary text-primary" />
		</div>
	</div>
);
