import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Quote, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	rating: number;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Quote} text="Customer Stories" />
					<Title text="Loved by Teams" highlight="Worldwide" />
					<Description text="See what our customers have to say about transforming their workflows with our platform." />
				</div>

				<TestimonialGrid
					items={[
						{
							quote:
								"This platform has completely transformed how our team collaborates. We've reduced meeting time by 50% while actually getting more done.",
							author: 'Sarah Chen',
							role: 'VP of Engineering',
							company: 'TechCorp',
							avatar: 'https://i.pravatar.cc/100?img=1',
							rating: 5,
						},
						{
							quote:
								"The automation features alone have saved us 20+ hours per week. It's like having an extra team member.",
							author: 'Marcus Williams',
							role: 'Operations Manager',
							company: 'ScaleUp Inc',
							avatar: 'https://i.pravatar.cc/100?img=2',
							rating: 5,
						},
						{
							quote:
								"Best investment we've made this year. The ROI was visible within the first month.",
							author: 'Emily Rodriguez',
							role: 'CEO',
							company: 'GrowthLab',
							avatar: 'https://i.pravatar.cc/100?img=3',
							rating: 5,
						},
					]}
				/>

				<CTASection label="Read More Stories" href="/customers" />
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4">
		<Badge variant="secondary" className="gap-2 px-3 py-1">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
	<div className="grid gap-6 @lg:grid-cols-3">
		{items.map((testimonial) => (
			<Card
				key={testimonial.author}
				className="border-border/50 bg-card/50 backdrop-blur-sm"
			>
				<CardContent className="p-6">
					<div className="flex gap-1 mb-4">
						{Array.from({ length: testimonial.rating }).map((_, i) => (
							<Star key={i} className="size-4 fill-primary text-primary" />
						))}
					</div>
					<p className="mb-6 text-sm leading-relaxed">"{testimonial.quote}"</p>
					<div className="flex items-center gap-3">
						<Avatar>
							<AvatarImage src={testimonial.avatar} alt={testimonial.author} />
							<AvatarFallback>
								{testimonial.author
									.split(' ')
									.map((n) => n[0])
									.join('')}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-semibold text-sm">{testimonial.author}</p>
							<p className="text-xs text-muted-foreground">
								{testimonial.role}, {testimonial.company}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const CTASection = ({ label, href }: { label: string; href: string }) => (
	<div className="mt-10 @md:mt-12 text-center">
		<Button size="lg" variant="outline" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);
