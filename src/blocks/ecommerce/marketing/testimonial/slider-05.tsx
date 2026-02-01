import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MoveHorizontal, Quote, Star, Verified } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	verified: boolean;
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
			<MoveHorizontal className="size-3 text-primary" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-lg">{description}</p>
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

const VerifiedBadge = () => (
	<div className="inline-flex items-center gap-1 text-xs text-primary">
		<Verified className="size-4 fill-primary text-primary-foreground" />
		<span className="font-medium">Verified</span>
	</div>
);

const SlideCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="min-w-[280px] @md:min-w-[350px] shrink-0 border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 snap-center group">
		<CardContent className="p-6">
			<div className="flex items-center justify-between mb-4">
				<Quote className="size-8 text-primary/20" />
				{item.verified && <VerifiedBadge />}
			</div>
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed mt-3 mb-5 line-clamp-4">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-3 pt-4 border-t border-border/50">
				<Avatar className="size-10 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-sm text-foreground">{item.author}</p>
					<p className="text-xs text-muted-foreground">
						{item.role} · {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ScrollIndicator = () => (
	<div className="flex items-center justify-center gap-2 mt-8">
		<div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
			<div className="w-1/3 h-full bg-primary rounded-full" />
		</div>
		<span className="text-xs text-muted-foreground">Scroll to see more</span>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The onboarding experience was exceptional. We were fully operational within 24 hours.',
			author: 'Una Martinez',
			role: 'Ops Manager',
			company: 'QuickStart',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'UM',
			rating: 5,
			verified: true,
		},
		{
			quote:
				'Support is incredible. They helped us through a complex migration seamlessly.',
			author: 'Victor Lee',
			role: 'IT Director',
			company: 'MigratePro',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'VL',
			rating: 5,
			verified: true,
		},
		{
			quote:
				'The analytics dashboard has transformed how we make data-driven decisions.',
			author: 'Wendy Chen',
			role: 'Data Lead',
			company: 'InsightCorp',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'WC',
			rating: 5,
			verified: true,
		},
		{
			quote:
				'Security features exceeded our compliance requirements. Audit was a breeze.',
			author: 'Xavier Brown',
			role: 'Security Lead',
			company: 'SecureFirst',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'XB',
			rating: 5,
			verified: false,
		},
		{
			quote:
				'Scales effortlessly. We went from 50 to 5000 users without any performance issues.',
			author: 'Yolanda Kim',
			role: 'VP Engineering',
			company: 'ScaleUp',
			avatar:
				'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'YK',
			rating: 5,
			verified: true,
		},
		{
			quote:
				'Best ROI of any software we have purchased. Paid for itself in the first month.',
			author: 'Zack Davis',
			role: 'CFO',
			company: 'ROI Masters',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'ZD',
			rating: 5,
			verified: true,
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
						badge="Scroll Gallery"
						title="Trusted by Thousands"
						description="Explore what our customers have to say about their experience."
					/>
				</div>

				<div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-4 @sm:px-6 @2xl:px-8 scrollbar-hide">
					{testimonials.map((item, index) => (
						<SlideCard key={index} item={item} />
					))}
				</div>

				<ScrollIndicator />
			</div>
		</section>
	);
}
