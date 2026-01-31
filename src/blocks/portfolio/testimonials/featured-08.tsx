'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Quote,
	Star,
	TrendingUp,
	Users,
	DollarSign,
	Clock,
} from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating: number;
	metrics: {
		icon: React.ComponentType<{ className?: string }>;
		value: string;
		label: string;
	}[];
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Results" />
					<Title text="Featured 8" />
					<Description text="Featured testimonial with key metrics." />
				</div>

				<MetricsFeatured
					item={{
						quote:
							'The platform they built completely transformed our operations. We saw immediate improvements across all key metrics, and the ROI has been exceptional.',
						author: 'Rachel Green',
						role: 'CEO',
						company: 'MetricsMaster Inc',
						avatar: 'https://i.pravatar.cc/100?img=18',
						rating: 5,
						metrics: [
							{ icon: TrendingUp, value: '+285%', label: 'Revenue Growth' },
							{ icon: Users, value: '50K+', label: 'New Users' },
							{ icon: DollarSign, value: '$2.4M', label: 'Cost Savings' },
							{ icon: Clock, value: '60%', label: 'Time Saved' },
						],
					}}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="outline">{text}</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const MetricsFeatured = ({ item }: { item: TestimonialItem }) => (
	<div className="max-w-5xl mx-auto">
		<div className="bg-card border rounded-2xl overflow-hidden shadow-lg">
			<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 border-b">
				{item.metrics.map(({ icon: Icon, value, label }, i) => (
					<div
						key={i}
						className="p-6 text-center border-b @sm:border-b-0 @sm:border-r last:border-r-0"
					>
						<Icon className="size-6 text-primary mx-auto mb-2" />
						<div className="text-2xl @md:text-3xl font-bold text-primary">
							{value}
						</div>
						<div className="text-sm text-muted-foreground">{label}</div>
					</div>
				))}
			</div>

			<div className="p-8 @md:p-12">
				<div className="flex gap-0.5 mb-6">
					{Array.from({ length: 5 }).map((_, j) => (
						<Star
							key={j}
							className={`size-5 ${j < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
						/>
					))}
				</div>

				<Quote className="size-10 text-primary/20 mb-4" />

				<blockquote className="text-xl @md:text-2xl leading-relaxed mb-8">
					&ldquo;{item.quote}&rdquo;
				</blockquote>

				<div className="flex items-center gap-4">
					<Avatar className="size-14 ring-2 ring-primary/20">
						<AvatarImage src={item.avatar} />
						<AvatarFallback className="bg-primary text-primary-foreground text-lg">
							{item.author[0]}
						</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-bold text-lg">{item.author}</div>
						<div className="text-muted-foreground">
							{item.role}, {item.company}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);
