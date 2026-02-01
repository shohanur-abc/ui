import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Quote, Star, Verified, ArrowRight } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	date: string;
	verified: boolean;
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
	<div className="max-w-3xl mb-12 @lg:mb-16">
		<Badge
			variant="outline"
			className="mb-4 gap-2 border-primary/30 text-primary"
		>
			<Award className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title} <span className="text-primary">{highlight}</span>
		</h2>
		<p className="text-muted-foreground text-lg">{description}</p>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/40'}`}
			/>
		))}
	</div>
);

const VerifiedBadge = () => (
	<span className="inline-flex items-center gap-1 text-xs text-primary">
		<Verified className="size-3.5 fill-primary text-primary-foreground" />
		Verified Purchase
	</span>
);

const TestimonialCard = ({
	item,
	size = 'default',
}: {
	item: TestimonialItem;
	size?: 'default' | 'large';
}) => (
	<Card
		className={`break-inside-avoid mb-6 group border-border/50 bg-card hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500 ${
			size === 'large' ? 'bg-gradient-to-br from-primary/5 to-transparent' : ''
		}`}
	>
		<CardContent className={size === 'large' ? 'p-8' : 'p-6'}>
			<Quote
				className={`${size === 'large' ? 'size-10' : 'size-8'} text-primary/15 mb-4`}
			/>
			<p
				className={`text-foreground leading-relaxed ${
					size === 'large' ? 'text-xl @lg:text-2xl font-medium' : 'text-base'
				}`}
			>
				{item.quote}
			</p>
			<div className="flex items-center justify-between flex-wrap gap-4 mt-6 pt-6 border-t border-border/50">
				<div className="flex items-center gap-3">
					<Avatar
						className={`${
							size === 'large' ? 'size-14' : 'size-11'
						} ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all`}
					>
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary text-primary-foreground font-semibold">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold text-foreground">{item.author}</p>
						<p className="text-sm text-muted-foreground">
							{item.role}, {item.company}
						</p>
					</div>
				</div>
				<div className="flex flex-col items-end gap-1">
					<StarRating rating={item.rating} />
					{item.verified && <VerifiedBadge />}
				</div>
			</div>
		</CardContent>
	</Card>
);

const CTAButton = ({
	text,
	icon: Icon,
}: {
	text: string;
	icon: React.ElementType;
}) => (
	<div className="text-center mt-12">
		<Button size="lg" className="gap-2 group">
			{text}
			<Icon className="size-4 group-hover:translate-x-1 transition-transform" />
		</Button>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'The level of attention to detail is remarkable. Every feature feels thoughtfully designed and the performance is outstanding.',
			author: 'Jennifer Walsh',
			role: 'CEO',
			company: 'InnovateTech',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'JW',
			rating: 5,
			date: '2 weeks ago',
			verified: true,
		},
		{
			quote: 'Exceeded all expectations. A must-have for any serious business.',
			author: 'Robert Chen',
			role: 'Founder',
			company: 'TechStart',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'RC',
			rating: 5,
			date: '1 month ago',
			verified: true,
		},
		{
			quote:
				'We have been using this for 6 months now and the results speak for themselves. Revenue is up 35% and customer satisfaction has never been higher.',
			author: 'Amanda Foster',
			role: 'Marketing Director',
			company: 'GrowthCo',
			avatar:
				'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
			initials: 'AF',
			rating: 5,
			date: '3 weeks ago',
			verified: true,
		},
		{
			quote: 'Clean, fast, and reliable. The trifecta we were looking for.',
			author: 'Marcus Lee',
			role: 'Tech Lead',
			company: 'DevHub',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'ML',
			rating: 5,
			date: '2 months ago',
			verified: false,
		},
		{
			quote:
				'Outstanding product with even better support. They truly care about their customers.',
			author: 'Sarah Bennett',
			role: 'Operations Manager',
			company: 'ScaleUp',
			avatar:
				'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
			initials: 'SB',
			rating: 5,
			date: '1 week ago',
			verified: true,
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="5-Star Reviews"
					title="Real Stories from"
					highlight="Real Customers"
					description="See what businesses like yours are saying about their experience with our platform."
				/>

				<div className="columns-1 @md:columns-2 @xl:columns-3 gap-6">
					{testimonials.map((item, index) => (
						<TestimonialCard
							key={index}
							item={item}
							size={index === 0 ? 'large' : 'default'}
						/>
					))}
				</div>

				<CTAButton text="Read All Reviews" icon={ArrowRight} />
			</div>
		</section>
	);
}
