import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	price: string;
	period: string;
	description: string;
	features: string[];
	cta: { label: string; href: string };
	popular?: boolean;
}

const Header = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
	<div className="text-center mb-12 @lg:mb-16">
		<div className="inline-flex items-center gap-2 mb-4">
			<Zap className="size-5 text-primary" />
			<span className="text-sm font-medium text-primary">{eyebrow}</span>
		</div>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{subtitle}
		</p>
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
	<Card className={`relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
		{plan.popular && (
			<Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
		)}
		<CardHeader className="text-center pt-8">
			<h3 className="text-xl font-bold">{plan.name}</h3>
			<p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
			<div className="mt-4">
				<span className="text-5xl font-bold">{plan.price}</span>
				<span className="text-muted-foreground ml-1">{plan.period}</span>
			</div>
		</CardHeader>
		<CardContent className="pt-2">
			<ul className="space-y-3">
				{plan.features.map((feature, i) => (
					<li key={i} className="flex items-center gap-3">
						<Check className="size-4 text-primary shrink-0" />
						<span className="text-sm">{feature}</span>
					</li>
				))}
			</ul>
		</CardContent>
		<CardFooter>
			<Button
				asChild
				className="w-full"
				variant={plan.popular ? 'default' : 'outline'}
				size="lg"
			>
				<Link href={plan.cta.href}>{plan.cta.label}</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const eyebrow = 'Pricing';
	const title = 'Plans for Every Need';
	const subtitle = 'Simple and transparent pricing. No hidden fees.';
	const plans: PricingPlan[] = [
		{
			name: 'Free',
			price: '$0',
			period: '/month',
			description: 'For personal projects',
			features: ['1 project', '500MB storage', 'Community support', 'Basic features'],
			cta: { label: 'Get Started', href: '#free' },
		},
		{
			name: 'Starter',
			price: '$15',
			period: '/month',
			description: 'For small teams',
			features: ['10 projects', '10GB storage', 'Email support', 'All features', 'Analytics'],
			cta: { label: 'Start Trial', href: '#starter' },
		},
		{
			name: 'Pro',
			price: '$39',
			period: '/month',
			description: 'For growing businesses',
			features: ['Unlimited projects', '100GB storage', 'Priority support', 'All features', 'Advanced analytics', 'API access'],
			cta: { label: 'Start Trial', href: '#pro' },
			popular: true,
		},
		{
			name: 'Enterprise',
			price: '$99',
			period: '/month',
			description: 'For large organizations',
			features: ['Unlimited everything', 'Custom storage', 'Dedicated support', 'Custom integrations', 'SLA guarantee', 'SSO'],
			cta: { label: 'Contact Sales', href: '#enterprise' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header eyebrow={eyebrow} title={title} subtitle={subtitle} />
				<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
