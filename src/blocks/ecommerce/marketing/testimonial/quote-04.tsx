import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star, Layers } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	position: 'left' | 'right';
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
	<div className="text-center mb-12 @lg:mb-16">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<Layers className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
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

const QuoteBubble = ({ item }: { item: TestimonialItem }) => (
	<div
		className={`flex flex-col @lg:flex-row gap-6 items-start ${
			item.position === 'right' ? '@lg:flex-row-reverse' : ''
		}`}
	>
		<Avatar className="size-16 ring-4 ring-primary/10 shrink-0">
			<AvatarImage src={item.avatar} alt={item.author} />
			<AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
				{item.initials}
			</AvatarFallback>
		</Avatar>
		<Card
			className={`border-border/50 bg-card flex-1 shadow-lg shadow-primary/5 ${
				item.position === 'right' ? '@lg:text-right' : ''
			}`}
		>
			<CardContent className="p-6">
				<div
					className={`flex items-center gap-3 mb-3 ${
						item.position === 'right' ? '@lg:flex-row-reverse' : ''
					}`}
				>
					<Quote className="size-6 text-primary/20" />
					<StarRating rating={item.rating} />
				</div>
				<blockquote className="text-lg @lg:text-xl font-medium text-foreground leading-relaxed mb-4">
					"{item.quote}"
				</blockquote>
				<div>
					<p className="font-bold text-foreground">{item.author}</p>
					<p className="text-sm text-muted-foreground">
						{item.role} · {item.company}
					</p>
				</div>
			</CardContent>
		</Card>
	</div>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'An absolute game-changer for our organization. The results speak for themselves.',
			author: 'David Park',
			role: 'CEO',
			company: 'ChangeFirst',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'DP',
			rating: 5,
			position: 'left',
		},
		{
			quote:
				'Incredible attention to detail. Every feature is thoughtfully designed.',
			author: 'Emma Lee',
			role: 'Design Director',
			company: 'DesignPro',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'EL',
			rating: 5,
			position: 'right',
		},
		{
			quote:
				'The support team goes above and beyond. Truly exceptional service.',
			author: 'Frank Kim',
			role: 'Operations',
			company: 'SupportMaster',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'FK',
			rating: 5,
			position: 'left',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Conversation Style"
					title="Customer Conversations"
					description="Real quotes from real conversations with our valued customers."
				/>

				<div className="space-y-8">
					{testimonials.map((item, index) => (
						<QuoteBubble key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
