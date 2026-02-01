import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Star } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<StackedTestimonials
					eyebrow="Success Stories"
					title="Trusted by Industry Leaders"
					testimonials={[
						{
							quote:
								'Working with this team was transformative for our business. They didn\'t just build a product—they became true partners in our success.',
							author: 'Sarah Chen',
							role: 'CEO, TechStart Inc.',
							company: 'TechStart',
							avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
							logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop',
							rating: 5,
							results: ['300% revenue increase', '50% faster time to market', '4.9 app store rating'],
						},
						{
							quote:
								'The quality of their work exceeded our expectations. They delivered a complex enterprise system on time and under budget.',
							author: 'Michael Rodriguez',
							role: 'CTO, Enterprise Solutions',
							company: 'EntSol',
							avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
							logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop',
							rating: 5,
							results: ['60% cost reduction', '99.99% uptime', '200+ daily active users'],
						},
						{
							quote:
								'Their team integrated seamlessly with ours. The collaboration was so smooth it felt like having an in-house team.',
							author: 'Emily Watson',
							role: 'VP Engineering, FinanceHub',
							company: 'FinanceHub',
							avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
							logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop',
							rating: 5,
							results: ['10x faster development', 'Zero security incidents', 'Full compliance achieved'],
						},
					]}
				/>
			</div>
		</section>
	);
}

interface Testimonial {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	logo: string;
	rating: number;
	results: string[];
}

const StackedTestimonials = ({
	eyebrow,
	title,
	testimonials,
}: {
	eyebrow: string;
	title: string;
	testimonials: Testimonial[];
}) => (
	<div>
		<div className="text-center mb-10 @md:mb-14">
			<Badge variant="outline" className="mb-4">
				{eyebrow}
			</Badge>
			<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
				{title}
			</h2>
		</div>

		<div className="space-y-6 @md:space-y-8">
			{testimonials.map((testimonial, i) => (
				<div
					key={i}
					className="p-6 @md:p-8 bg-card border rounded-2xl grid @lg:grid-cols-3 gap-6 @lg:gap-8 items-center"
				>
					{/* Author info */}
					<div className="flex items-center gap-4">
						<div className="relative size-16 @md:size-20 rounded-full overflow-hidden shrink-0">
							<Image
								src={testimonial.avatar}
								alt={testimonial.author}
								fill
								className="object-cover"
							/>
						</div>
						<div>
							<div className="flex items-center gap-1 mb-1">
								{[...Array(testimonial.rating)].map((_, j) => (
									<Star
										key={j}
										className="size-4 fill-amber-400 text-amber-400"
									/>
								))}
							</div>
							<p className="font-bold">{testimonial.author}</p>
							<p className="text-sm text-muted-foreground">{testimonial.role}</p>
						</div>
					</div>

					{/* Quote */}
					<div className="@lg:col-span-1">
						<blockquote className="text-lg italic text-muted-foreground">
							"{testimonial.quote}"
						</blockquote>
					</div>

					{/* Results */}
					<div className="p-4 bg-muted/50 rounded-xl">
						<p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">
							Key Results
						</p>
						<ul className="space-y-2">
							{testimonial.results.map((result, j) => (
								<li key={j} className="flex items-center gap-2 text-sm">
									<Check className="size-4 text-primary shrink-0" />
									{result}
								</li>
							))}
						</ul>
					</div>
				</div>
			))}
		</div>

		<div className="text-center mt-10 @md:mt-14">
			<Button size="lg" asChild>
				<Link href="/case-studies">
					Read More Success Stories
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);
