import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star, PenTool } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	signature: string;
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
	<div className="mb-12 @lg:mb-16">
		<Badge className="mb-4 gap-2 bg-primary text-primary-foreground">
			<PenTool className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl">
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

const SignatureQuote = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-border/50 bg-card shadow-lg shadow-primary/5 overflow-hidden">
		<CardContent className="p-6 @lg:p-8">
			<div className="flex items-start justify-between mb-4">
				<Quote className="size-10 text-primary/20" />
				<StarRating rating={item.rating} />
			</div>
			<blockquote className="text-xl @lg:text-2xl font-medium text-foreground leading-relaxed mb-6">
				"{item.quote}"
			</blockquote>
			<div className="flex items-center justify-between pt-6 border-t border-border/50">
				<div className="flex items-center gap-3">
					<Avatar className="size-12 ring-2 ring-primary/10">
						<AvatarImage src={item.avatar} alt={item.author} />
						<AvatarFallback className="bg-primary/10 text-primary font-semibold">
							{item.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold text-foreground">{item.author}</p>
						<p className="text-sm text-muted-foreground">
							{item.role} · {item.company}
						</p>
					</div>
				</div>
				<p className="text-3xl font-script text-primary/40 italic">
					{item.signature}
				</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const testimonials: TestimonialItem[] = [
		{
			quote:
				'A transformative experience that redefined how we think about customer engagement.',
			author: 'Paul Wright',
			role: 'CMO',
			company: 'EngageCo',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'PW',
			rating: 5,
			signature: 'P. Wright',
		},
		{
			quote:
				'Enterprise-grade solution with startup-level agility. Exactly what we needed.',
			author: 'Quinn Chen',
			role: 'CTO',
			company: 'AgileEnterprise',
			avatar:
				'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'QC',
			rating: 5,
			signature: 'Q. Chen',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Signed"
					title="Authorized Quotes"
					description="Personally endorsed testimonials from industry leaders."
				/>

				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-8">
					{testimonials.map((item, index) => (
						<SignatureQuote key={index} item={item} />
					))}
				</div>
			</div>
		</section>
	);
}
