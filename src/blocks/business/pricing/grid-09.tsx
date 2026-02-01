import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Check, Gift } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	description: string;
	monthlyPrice: string;
	yearlyPrice: string;
	features: string[];
	cta: { label: string; href: string };
	savings?: string;
	popular?: boolean;
}

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="secondary" className="mb-4 gap-1">
			<Gift className="size-3" />
			Save 20% with annual billing
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{subtitle}
		</p>
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
	<Card className={`relative flex flex-col transition-all duration-300 hover:shadow-lg ${plan.popular ? 'border-primary shadow-xl' : ''}`}>
		{plan.popular && (
			<Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
		)}
		{plan.savings && (
			<Badge variant="secondary" className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
				{plan.savings}
			</Badge>
		)}
		<CardHeader className="pt-8">
			<h3 className="text-xl font-bold">{plan.name}</h3>
			<p className="text-sm text-muted-foreground">{plan.description}</p>
		</CardHeader>
		<CardContent className="flex-1">
			<div className="mb-6 space-y-1">
				<div>
					<span className="text-4xl font-bold">{plan.yearlyPrice}</span>
					<span className="text-muted-foreground">/mo</span>
				</div>
				<div className="text-sm text-muted-foreground">
					<span className="line-through">{plan.monthlyPrice}/mo</span> billed annually
				</div>
			</div>
			<ul className="space-y-3">
				{plan.features.map((feature, i) => (
					<li key={i} className="flex items-start gap-3">
						<Check className="size-4 text-primary mt-0.5 shrink-0" />
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
	const title = 'Annual Pricing';
	const subtitle = 'Pay annually and save. All plans include a 30-day money-back guarantee.';
	const plans: PricingPlan[] = [
		{
			name: 'Basic',
			description: 'Essential features',
			monthlyPrice: '$12',
			yearlyPrice: '$9',
			savings: 'Save $36/yr',
			features: ['5 projects', '5GB storage', 'Email support', 'Basic analytics'],
			cta: { label: 'Start Free Trial', href: '#basic' },
		},
		{
			name: 'Professional',
			description: 'For professionals',
			monthlyPrice: '$35',
			yearlyPrice: '$28',
			savings: 'Save $84/yr',
			features: ['Unlimited projects', '100GB storage', 'Priority support', 'Advanced analytics', 'API access'],
			cta: { label: 'Start Free Trial', href: '#professional' },
			popular: true,
		},
		{
			name: 'Team',
			description: 'For collaboration',
			monthlyPrice: '$79',
			yearlyPrice: '$63',
			savings: 'Save $192/yr',
			features: ['Everything in Pro', '10 team members', 'Team workspace', 'Admin controls', 'SSO'],
			cta: { label: 'Start Free Trial', href: '#team' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header title={title} subtitle={subtitle} />
				<div className="grid @md:grid-cols-3 gap-8">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
