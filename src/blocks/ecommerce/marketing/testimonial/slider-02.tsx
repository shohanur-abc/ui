import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	ChevronLeft,
	ChevronRight,
	GalleryHorizontal,
	Quote,
	Star,
} from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	image?: string;
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
	<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @lg:mb-16">
		<div>
			<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
				<GalleryHorizontal className="size-3 text-primary" />
				{badge}
			</Badge>
			<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
				{title} <span className="text-primary">{highlight}</span>
			</h2>
		</div>
		<div className="flex gap-2 shrink-0">
			<button
				className="size-12 rounded-full border border-border bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
				aria-label="Previous"
			>
				<ChevronLeft className="size-5" />
			</button>
			<button
				className="size-12 rounded-full border border-border bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
				aria-label="Next"
			>
				<ChevronRight className="size-5" />
			</button>
		</div>
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

const TestimonialSlide = ({ item }: { item: TestimonialItem }) => (
	<Card className="min-w-[320px] @md:min-w-[500px] @xl:min-w-[600px] shrink-0 border-border/50 bg-card hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 snap-center group overflow-hidden">
		{item.image && (
			<div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
				<Quote className="size-16 text-primary/30" />
			</div>
		)}
		<CardContent className="p-6 @md:p-8">
			{!item.image && <Quote className="size-10 text-primary/20 mb-4" />}
			<StarRating rating={item.rating} />
			<p className="text-foreground text-lg @md:text-xl leading-relaxed mt-4 mb-6 font-medium">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-4 pt-5 border-t border-border/50">
				<Avatar className="size-14 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary text-primary-foreground font-bold">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-bold text-lg text-foreground">{item.author}</p>
					<p className="text-muted-foreground">
						{item.role} · {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The product has completely transformed our approach to customer engagement. Results have been phenomenal.',
			author: 'Hannah Brooks',
			role: 'CMO',
			company: 'MarketLeaders',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'HB',
			rating: 5,
			image: 'featured',
		},
		{
			quote:
				'Implementation was seamless. We were up and running in less than a week with full functionality.',
			author: 'Ian Cooper',
			role: 'IT Director',
			company: 'FastDeploy',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'IC',
			rating: 5,
		},
		{
			quote:
				'The ROI was visible within the first month. Outstanding value for any growing business.',
			author: 'Jessica Yang',
			role: 'CFO',
			company: 'GrowthFirst',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'JY',
			rating: 5,
			image: 'featured',
		},
		{
			quote:
				'Support team is incredible. They helped us every step of the way during our migration.',
			author: 'Kevin Martinez',
			role: 'Tech Lead',
			company: 'MigratePro',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'KM',
			rating: 5,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8">
					<SectionHeader
						badge="Gallery View"
						title="Featured"
						highlight="Reviews"
					/>
				</div>

				<div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-4 @sm:px-6 @2xl:px-8 scrollbar-hide">
					{testimonials.map((item, index) => (
						<TestimonialSlide key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
