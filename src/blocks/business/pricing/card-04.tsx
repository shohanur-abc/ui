import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Feature {
	text: string;
	included: boolean;
}

interface PricingPlan {
	name: string;
	description: string;
	price: string;
	originalPrice?: string;
	period: string;
	features: Feature[];
	cta: { label: string; href: string };
	highlighted?: boolean;
}

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="text-center mb-12 @lg:mb-16">
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{subtitle}
		</p>
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
	<Card
		className={`relative flex flex-col transition-all duration-500 ${
			plan.highlighted
				? 'border-primary shadow-2xl shadow-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5'
				: 'hover:border-primary/30 hover:shadow-lg'
		}`}
	>
		{plan.highlighted && (
			<div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
		)}
		<CardHeader className="text-center">
			{plan.highlighted && (
				<Badge className="self-center mb-4 animate-pulse">Best Value</Badge>
			)}
			<h3 className="text-2xl font-bold">{plan.name}</h3>
			<p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
			<div className="mt-6">
				{plan.originalPrice && (
					<span className="text-lg text-muted-foreground line-through mr-2">
						{plan.originalPrice}
					</span>
				)}
				<span className="text-5xl font-bold">{plan.price}</span>
				<span className="text-muted-foreground ml-1">{plan.period}</span>
			</div>
		</CardHeader>
		<CardContent className="flex-1 pt-6">
			<ul className="space-y-4">
				{plan.features.map((feature, i) => (
					<li key={i} className="flex items-center gap-3">
						{feature.included ? (
							<div className="size-5 rounded-full bg-primary/20 flex items-center justify-center">
								<Check className="size-3 text-primary" />
							</div>
						) : (
							<div className="size-5 rounded-full bg-muted flex items-center justify-center">
								<X className="size-3 text-muted-foreground" />
							</div>
						)}
						<span className={`text-sm ${!feature.included && 'text-muted-foreground'}`}>
							{feature.text}
						</span>
					</li>
				))}
			</ul>
		</CardContent>
		<CardFooter className="pt-6">
			<Button
				asChild
				className="w-full gap-2 group"
				variant={plan.highlighted ? 'default' : 'outline'}
				size="lg"
			>
				<Link href={plan.cta.href}>
					{plan.cta.label}
					<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
				</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const title = 'Choose Your Plan';
	const subtitle = 'All plans include a 30-day money-back guarantee';
	const plans: PricingPlan[] = [
		{
			name: 'Free',
			description: 'Get started at no cost',
			price: '$0',
			period: '/forever',
			features: [
				{ text: '1 project', included: true },
				{ text: '500MB storage', included: true },
				{ text: 'Basic templates', included: true },
				{ text: 'Community support', included: true },
				{ text: 'Advanced features', included: false },
				{ text: 'Priority support', included: false },
			],
			cta: { label: 'Get Started Free', href: '#free' },
		},
		{
			name: 'Pro',
			description: 'Perfect for professionals',
			price: '$25',
			originalPrice: '$35',
			period: '/month',
			features: [
				{ text: 'Unlimited projects', included: true },
				{ text: '50GB storage', included: true },
				{ text: 'All templates', included: true },
				{ text: 'Priority support', included: true },
				{ text: 'Advanced analytics', included: true },
				{ text: 'Custom domain', included: true },
			],
			cta: { label: 'Start 14-Day Trial', href: '#pro' },
			highlighted: true,
		},
		{
			name: 'Team',
			description: 'Collaborate with your team',
			price: '$59',
			period: '/month',
			features: [
				{ text: 'Everything in Pro', included: true },
				{ text: '200GB storage', included: true },
				{ text: 'Team collaboration', included: true },
				{ text: 'Admin controls', included: true },
				{ text: 'SSO integration', included: true },
				{ text: 'Audit logs', included: true },
			],
			cta: { label: 'Contact Sales', href: '#team' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header title={title} subtitle={subtitle} />
				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 @lg:gap-8 items-stretch">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
