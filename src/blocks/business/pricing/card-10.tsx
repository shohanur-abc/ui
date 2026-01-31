import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	description: string;
	price: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	style: 'minimal' | 'gradient' | 'glass';
}

const Header = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
	<div className="text-center mb-12 @lg:mb-16">
		<div className="inline-flex items-center gap-2 text-sm text-primary mb-4">
			<Sparkles className="size-4" />
			<span className="font-medium">{eyebrow}</span>
		</div>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{subtitle}
		</p>
	</div>
);

const cardStyles = {
	minimal: 'bg-card border',
	gradient: 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 border',
	glass: 'bg-card/80 backdrop-blur-sm border border-primary shadow-xl',
};

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
	<Card className={`relative flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${cardStyles[plan.style]}`}>
		{plan.style === 'glass' && (
			<Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
				Popular Choice
			</Badge>
		)}
		<CardContent className="flex-1 flex flex-col pt-8">
			<div className="mb-6">
				<h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
				<p className="text-sm text-muted-foreground">{plan.description}</p>
			</div>
			<div className="mb-6">
				<div className="flex items-baseline gap-1">
					<span className="text-5xl font-bold">{plan.price}</span>
					<span className="text-muted-foreground">{plan.period}</span>
				</div>
			</div>
			<ul className="space-y-3 flex-1">
				{plan.features.map((feature, i) => (
					<li key={i} className="flex items-center gap-3">
						<Check className="size-4 text-primary shrink-0" />
						<span className="text-sm">{feature}</span>
					</li>
				))}
			</ul>
			<Button
				asChild
				className="w-full mt-8 gap-2 group"
				variant={plan.style === 'glass' ? 'default' : 'outline'}
				size="lg"
			>
				<Link href={plan.cta.href}>
					{plan.cta.label}
					<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const eyebrow = 'Pricing';
	const title = 'Pick Your Perfect Plan';
	const subtitle = 'Start free, then upgrade as you grow. No credit card required.';
	const plans: PricingPlan[] = [
		{
			name: 'Free Forever',
			description: 'Everything you need to get started',
			price: '$0',
			period: '/month',
			features: [
				'3 active projects',
				'1GB cloud storage',
				'Basic templates',
				'Community support',
				'Mobile app',
			],
			cta: { label: 'Get Started', href: '#free' },
			style: 'minimal',
		},
		{
			name: 'Pro',
			description: 'For professionals and freelancers',
			price: '$29',
			period: '/month',
			features: [
				'Unlimited projects',
				'50GB cloud storage',
				'Premium templates',
				'Priority support',
				'Advanced features',
				'Analytics dashboard',
			],
			cta: { label: 'Upgrade to Pro', href: '#pro' },
			style: 'glass',
		},
		{
			name: 'Team',
			description: 'Collaborate with your entire team',
			price: '$79',
			period: '/month',
			features: [
				'Everything in Pro',
				'Unlimited storage',
				'Team collaboration',
				'Admin controls',
				'Custom branding',
				'API access',
			],
			cta: { label: 'Start Team Trial', href: '#team' },
			style: 'gradient',
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header eyebrow={eyebrow} title={title} subtitle={subtitle} />
				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-8">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
