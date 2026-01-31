import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Check, Crown, Sparkles, Star, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="slate">
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @xl:grid-cols-12 gap-6 @xl:gap-10 items-center">
					<ContentBlock
						title="Unlock Premium Content"
						description="Get unlimited access to exclusive articles, courses, and resources."
						testimonial={{
							quote: 'Best investment for my career!',
							author: 'Sarah K.',
							rating: 5,
						}}
						className="@xl:col-span-5"
					/>
					<PricingCards
						plans={[
							{
								name: 'Monthly',
								price: '$12',
								period: 'month',
								features: [
									'Unlimited access',
									'Ad-free reading',
									'Early access',
								],
								popular: false,
							},
							{
								name: 'Annual',
								price: '$99',
								period: 'year',
								features: [
									'Everything in Monthly',
									'Save 30%',
									'Priority support',
									'Exclusive events',
								],
								popular: true,
							},
						]}
						className="@xl:col-span-7"
					/>
				</div>
			</div>
		</section>
	);
}

interface Testimonial {
	quote: string;
	author: string;
	rating: number;
}

interface ContentBlockProps {
	title: string;
	description: string;
	testimonial: Testimonial;
	className?: string;
}

const ContentBlock = ({
	title,
	description,
	testimonial,
	className,
}: ContentBlockProps) => (
	<div className={`flex flex-col justify-center ${className}`}>
		<Badge className="w-fit mb-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
			<Crown className="size-3.5 mr-1.5" />
			Premium
		</Badge>
		<h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h1>
		<p className="text-lg text-muted-foreground mb-8">{description}</p>
		<Card className="bg-muted/50 border-0">
			<CardContent className="p-5">
				<div className="flex gap-0.5 mb-3">
					{Array.from({ length: testimonial.rating }).map((_, i) => (
						<Star key={i} className="size-4 fill-amber-500 text-amber-500" />
					))}
				</div>
				<p className="italic mb-2">&ldquo;{testimonial.quote}&rdquo;</p>
				<p className="text-sm text-muted-foreground">— {testimonial.author}</p>
			</CardContent>
		</Card>
	</div>
);

interface Plan {
	name: string;
	price: string;
	period: string;
	features: string[];
	popular: boolean;
}

interface PricingCardsProps {
	plans: Plan[];
	className?: string;
}

const PricingCards = ({ plans, className }: PricingCardsProps) => (
	<div className={`grid grid-cols-1 @md:grid-cols-2 gap-4 ${className}`}>
		{plans.map((plan) => (
			<Card
				key={plan.name}
				className={`relative ${plan.popular ? 'border-primary shadow-lg shadow-primary/10' : ''}`}
			>
				{plan.popular && (
					<Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
						<Zap className="size-3 mr-1" />
						Best Value
					</Badge>
				)}
				<CardContent className="p-6">
					<p className="text-sm font-medium text-muted-foreground mb-2">
						{plan.name}
					</p>
					<div className="flex items-baseline gap-1 mb-4">
						<span className="text-4xl font-bold">{plan.price}</span>
						<span className="text-muted-foreground">/{plan.period}</span>
					</div>
					<ul className="space-y-3 mb-6">
						{plan.features.map((feature) => (
							<li key={feature} className="flex items-center gap-2 text-sm">
								<Check className="size-4 text-primary shrink-0" />
								{feature}
							</li>
						))}
					</ul>
					<Button
						className={`w-full gap-2 ${plan.popular ? '' : 'bg-muted text-foreground hover:bg-muted/80'}`}
						variant={plan.popular ? 'default' : 'secondary'}
						asChild
					>
						<Link href="/subscribe">
							Get Started
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</CardContent>
			</Card>
		))}
	</div>
);
