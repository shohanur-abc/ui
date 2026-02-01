import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { History, Quote, Star, ArrowDown } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	date: string;
	year: string;
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
	<div className="max-w-2xl mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<History className="size-3 text-primary" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg">{description}</p>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 mb-3">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const YearMarker = ({ year }: { year: string }) => (
	<div className="flex items-center gap-3 mb-6">
		<div className="size-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
			{year.slice(2)}
		</div>
		<span className="text-lg font-bold text-foreground">{year}</span>
		<div className="flex-1 h-px bg-border" />
	</div>
);

const TimelineEntry = ({
	item,
	isLast,
}: {
	item: TestimonialItem;
	isLast: boolean;
}) => (
	<div className="relative pl-8">
		<div className="absolute left-0 top-3 size-3 rounded-full bg-primary ring-4 ring-background" />
		{!isLast && (
			<div className="absolute left-[5px] top-6 bottom-0 w-0.5 bg-border" />
		)}
		<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group mb-6">
			<CardContent className="p-5">
				<div className="flex items-center justify-between mb-3">
					<span className="text-xs text-muted-foreground">{item.date}</span>
					<Quote className="size-5 text-primary/20" />
				</div>
				<StarRating rating={item.rating} />
				<p className="text-foreground leading-relaxed mb-4">"{item.quote}"</p>
				<div className="flex items-center gap-3 pt-3 border-t border-border/50">
					<Avatar className="size-9 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold text-sm text-foreground">
							{item.author}
						</p>
						<p className="text-xs text-muted-foreground">
							{item.role} · {item.company}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
);

const LoadMoreButton = () => (
	<div className="flex justify-center mt-8">
		<button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium">
			<ArrowDown className="size-4" />
			Load earlier reviews
		</button>
	</div>
);

export default function Main() {
	const testimonialsByYear: Record<string, TestimonialItem[]> = {
		'2024': [
			{
				quote:
					'Just completed our annual review. The platform continues to exceed expectations.',
				author: 'Peter Grant',
				role: 'Director',
				company: 'AnnualReview',
				avatar:
					'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
				initials: 'PG',
				rating: 5,
				date: 'March 15, 2024',
				year: '2024',
			},
			{
				quote:
					'Started using new analytics features. Game-changer for our data team.',
				author: 'Quinn Lee',
				role: 'Data Lead',
				company: 'DataFirst',
				avatar:
					'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
				initials: 'QL',
				rating: 5,
				date: 'February 8, 2024',
				year: '2024',
			},
		],
		'2023': [
			{
				quote:
					'Deployed across our entire organization. Adoption was seamless.',
				author: 'Rachel Kim',
				role: 'CTO',
				company: 'EnterpriseCo',
				avatar:
					'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
				initials: 'RK',
				rating: 5,
				date: 'October 22, 2023',
				year: '2023',
			},
			{
				quote:
					'Six months in and the ROI has been incredible. Best decision we made.',
				author: 'Samuel Wright',
				role: 'CFO',
				company: 'ROI Corp',
				avatar:
					'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
				initials: 'SW',
				rating: 5,
				date: 'June 5, 2023',
				year: '2023',
			},
		],
	};

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="History"
					title="Years of Success Stories"
					description="A timeline of customer achievements and milestones throughout our journey."
				/>

				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-8 @lg:gap-12">
					{Object.entries(testimonialsByYear).map(([year, items]) => (
						<div key={year}>
							<YearMarker year={year} />
							{items.map((item, index) => (
								<TimelineEntry
									key={index}
									item={item}
									isLast={index === items.length - 1}
								/>
							))}
						</div>
					))}
				</div>

				<LoadMoreButton />
			</div>
		</section>
	);
}
