import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Cloud, Quote, Star } from 'lucide-react';

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
	description,
}: {
	badge: string;
	title: string;
	highlight: string;
	description: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="secondary" className="mb-4 gap-2">
			<Cloud className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{description}
		</p>
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

const CloudCard = ({
	item,
	className,
}: {
	item: TestimonialItem;
	className?: string;
}) => (
	<Card
		className={`border-border/50 bg-card/95 backdrop-blur-sm shadow-2xl shadow-primary/10 hover:shadow-3xl hover:shadow-primary/15 hover:-translate-y-2 transition-all duration-500 ${className}`}
	>
		<CardContent className="p-5 @lg:p-6">
			<Quote className="size-8 text-primary/20 mb-3" />
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed my-4 line-clamp-4">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-3 pt-4 border-t border-border/50">
				<Avatar className="size-10 ring-2 ring-primary/10">
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

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'Cloud-native solution that transformed our entire infrastructure. The scalability is unmatched.',
			author: 'Kelly Chen',
			role: 'CTO',
			company: 'CloudFirst',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'KC',
			rating: 5,
		},
		{
			quote:
				'Migration was smooth and the performance improvements exceeded expectations.',
			author: 'Leo Park',
			role: 'VP Engineering',
			company: 'MigratePro',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'LP',
			rating: 5,
		},
		{
			quote:
				'Enterprise-grade reliability with startup-level agility. Perfect combination.',
			author: 'Maria Lee',
			role: 'CEO',
			company: 'AgileCorp',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'ML',
			rating: 5,
		},
		{
			quote:
				'Cost optimization features saved us over 40% on infrastructure.',
			author: 'Nathan Kim',
			role: 'CFO',
			company: 'SaveSmart',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'NK',
			rating: 5,
		},
		{
			quote:
				'Global edge network ensures our users have great experience everywhere.',
			author: 'Olivia Foster',
			role: 'COO',
			company: 'GlobalReach',
			avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
			initials: 'OF',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden min-h-[900px]" data-theme="testimonial">
			{/* Cloud background decoration */}
			<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-primary/5" />
			<div className="absolute top-20 left-1/4 w-64 h-32 bg-primary/5 rounded-full blur-3xl" />
			<div className="absolute top-40 right-1/4 w-80 h-40 bg-primary/5 rounded-full blur-3xl" />
			<div className="absolute bottom-40 left-1/3 w-72 h-36 bg-primary/5 rounded-full blur-3xl" />

			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 relative z-10">
				<SectionHeader
					badge="Cloud Layout"
					title="Floating in the"
					highlight="Cloud"
					description="Testimonials that drift like clouds across the digital sky."
				/>

				{/* Scattered cloud layout */}
				<div className="relative hidden @lg:block h-[600px]">
					<div className="absolute top-0 left-0 w-[320px]">
						<CloudCard item={testimonials[0]} />
					</div>
					<div className="absolute top-8 right-0 w-[350px]">
						<CloudCard item={testimonials[1]} />
					</div>
					<div className="absolute top-[220px] left-[30%] w-[380px]">
						<CloudCard item={testimonials[2]} />
					</div>
					<div className="absolute bottom-[80px] left-[5%] w-[340px]">
						<CloudCard item={testimonials[3]} />
					</div>
					<div className="absolute bottom-0 right-[10%] w-[360px]">
						<CloudCard item={testimonials[4]} />
					</div>
				</div>

				{/* Mobile fallback grid */}
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-6 @lg:hidden">
					{testimonials.map((item, index) => (
						<CloudCard key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
