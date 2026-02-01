import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star } from 'lucide-react';

interface TestimonialProps {
	quote: string;
	author: string;
	role: string;
	avatar: string;
	rating: number;
}

interface StatItemProps {
	value: string;
	label: string;
}

const Testimonial = ({
	quote,
	author,
	role,
	avatar,
	rating,
}: TestimonialProps) => (
	<Card className="relative overflow-hidden p-6 @md:p-8">
		<Quote className="absolute -right-4 -top-4 size-24 text-primary/5" />
		<div className="relative space-y-4">
			<div className="flex gap-0.5">
				{Array.from({ length: rating }).map((_, i) => (
					<Star key={i} className="size-4 fill-primary text-primary" />
				))}
			</div>
			<p className="text-muted-foreground leading-relaxed">{quote}</p>
			<div className="flex items-center gap-3 pt-2">
				<Avatar>
					<AvatarImage src={avatar} alt={author} />
					<AvatarFallback>{author[0]}</AvatarFallback>
				</Avatar>
				<div>
					<p className="text-sm font-semibold">{author}</p>
					<p className="text-xs text-muted-foreground">{role}</p>
				</div>
			</div>
		</div>
	</Card>
);

const StatItem = ({ value, label }: StatItemProps) => (
	<div className="text-center">
		<p className="text-4xl font-bold tracking-tighter @sm:text-5xl">{value}</p>
		<p className="mt-2 text-sm text-muted-foreground">{label}</p>
	</div>
);

export default function Main() {
	const testimonial: TestimonialProps = {
		quote:
			"This platform transformed our business. We've seen a 300% increase in sales since switching, and the customer support has been exceptional.",
		author: 'Sarah Chen',
		role: 'CEO, TechStyle',
		avatar: '/placeholder.svg',
		rating: 5,
	};

	const stats: StatItemProps[] = [
		{ value: '50K+', label: 'Active Merchants' },
		{ value: '$2B+', label: 'GMV Processed' },
		{ value: '99.9%', label: 'Uptime' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid items-center gap-12 @lg:grid-cols-2 @lg:gap-16">
					<Testimonial {...testimonial} />
					<div className="grid gap-8 @sm:grid-cols-3">
						{stats.map((stat, i) => (
							<StatItem key={i} {...stat} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
