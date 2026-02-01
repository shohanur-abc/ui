import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Circle, Quote, Star } from 'lucide-react';

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
	highlight,
}: {
	badge: string;
	title: string;
	highlight: string;
}) => (
	<div className="text-center mb-10 @lg:mb-14">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<Circle className="size-2 fill-current" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex justify-center gap-1 mb-6">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-6 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const SingleTestimonial = ({ item }: { item: TestimonialItem }) => (
	<Card className="max-w-4xl mx-auto text-center border-none bg-transparent shadow-none">
		<CardContent className="p-0">
			<div className="flex justify-center mb-8">
				<Avatar className="size-24 @md:size-28 ring-4 ring-primary/20 shadow-lg">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-bold text-3xl">
						{item.initials}
					</AvatarFallback>
				</Avatar>
			</div>
			<StarRating rating={item.rating} />
			<Quote className="size-12 text-primary/20 mx-auto mb-6" />
			<p className="text-foreground text-2xl @md:text-3xl @xl:text-4xl leading-relaxed font-medium mb-8 max-w-3xl mx-auto">
				"{item.quote}"
			</p>
			<div>
				<p className="font-bold text-xl text-foreground mb-1">{item.author}</p>
				<p className="text-muted-foreground text-lg">
					{item.role} at {item.company}
				</p>
			</div>
		</CardContent>
	</Card>
);

const NavigationControls = ({
	current,
	total,
}: {
	current: number;
	total: number;
}) => (
	<div className="flex items-center justify-center gap-6 mt-12">
		<Button
			variant="outline"
			size="icon"
			className="rounded-full"
			aria-label="Previous"
		>
			<ArrowLeft className="size-5" />
		</Button>
		<div className="flex gap-2">
			{Array.from({ length: total }).map((_, i) => (
				<button
					key={i}
					className={`size-3 rounded-full transition-all ${
						i === current
							? 'bg-primary scale-125'
							: 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
					}`}
					aria-label={`Go to testimonial ${i + 1}`}
				/>
			))}
		</div>
		<Button
			variant="outline"
			size="icon"
			className="rounded-full"
			aria-label="Next"
		>
			<ArrowRight className="size-5" />
		</Button>
	</div>
);

const AvatarGroup = ({ testimonials }: { testimonials: TestimonialItem[] }) => (
	<div className="flex justify-center mt-12">
		<div className="flex -space-x-3">
			{testimonials.map((item, index) => (
				<Avatar
					key={index}
					className={`size-10 ring-2 ring-background ${
						index === 0 ? 'ring-primary' : ''
					}`}
				>
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-muted text-muted-foreground text-xs">
						{item.initials}
					</AvatarFallback>
				</Avatar>
			))}
		</div>
	</div>
);

export default function Main() {
	const currentTestimonial: TestimonialItem = {
		quote:
			'Working with this team has been an absolute game-changer for our business. The results we have achieved in such a short time have exceeded all expectations.',
		author: 'Wendy Chang',
		role: 'CEO',
		company: 'GrowthFirst Industries',
		avatar:
			'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
		initials: 'WC',
		rating: 5,
	};

	const allTestimonials: TestimonialItem[] = [
		currentTestimonial,
		{
			quote: 'Amazing platform',
			author: 'Xavier Liu',
			role: 'CTO',
			company: 'TechPro',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'XL',
			rating: 5,
		},
		{
			quote: 'Incredible results',
			author: 'Yara Martinez',
			role: 'COO',
			company: 'ScaleUp',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'YM',
			rating: 5,
		},
		{
			quote: 'Best in class',
			author: 'Zane Foster',
			role: 'VP Sales',
			company: 'SalesPro',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'ZF',
			rating: 5,
		},
		{
			quote: 'Highly recommend',
			author: 'Alice Brown',
			role: 'Director',
			company: 'DirectCo',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'AB',
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
					badge="Featured"
					title="Client"
					highlight="Testimonial"
				/>

				<SingleTestimonial item={currentTestimonial} />

				<NavigationControls current={0} total={5} />

				<AvatarGroup testimonials={allTestimonials} />
			</div>
		</section>
	);
}
