import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

interface FeaturedReviewProps {
	rating: number;
	quote: string;
	author: string;
	role: string;
	avatar: string;
}

interface StatItemProps {
	value: string;
	label: string;
}

const FeaturedReview = ({
	rating,
	quote,
	author,
	role,
	avatar,
}: FeaturedReviewProps) => (
	<Card className="relative overflow-hidden p-6 @md:p-8">
		<Quote className="absolute -right-4 -top-4 size-24 text-primary/5" />
		<div className="relative space-y-4">
			<div className="flex gap-0.5">
				{Array.from({ length: rating }).map((_, i) => (
					<Star key={i} className="size-4 fill-primary text-primary" />
				))}
			</div>
			<p className="text-lg leading-relaxed">{quote}</p>
			<div className="flex items-center gap-3">
				<Avatar>
					<AvatarImage src={avatar} alt={author} />
					<AvatarFallback>{author[0]}</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold">{author}</p>
					<p className="text-sm text-muted-foreground">{role}</p>
				</div>
			</div>
		</div>
	</Card>
);

const StatCard = ({ value, label }: StatItemProps) => (
	<div className="text-center">
		<p className="text-3xl font-bold tracking-tight @sm:text-4xl">{value}</p>
		<p className="mt-1 text-sm text-muted-foreground">{label}</p>
	</div>
);

export default function Main() {
	const review: FeaturedReviewProps = {
		rating: 5,
		quote:
			"The best e-commerce platform we've ever used. Sales increased by 300% in just 6 months.",
		author: 'Michael Torres',
		role: 'CEO, StyleHouse',
		avatar: '/placeholder.svg',
	};

	const stats: StatItemProps[] = [
		{ value: '4.9/5', label: 'Average Rating' },
		{ value: '50K+', label: 'Reviews' },
		{ value: '98%', label: 'Would Recommend' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-8 @lg:grid-cols-2 @lg:gap-12">
					<FeaturedReview {...review} />
					<Card className="flex items-center justify-center p-8">
						<div className="grid w-full gap-8 @sm:grid-cols-3">
							{stats.map((stat, i) => (
								<StatCard key={i} {...stat} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
