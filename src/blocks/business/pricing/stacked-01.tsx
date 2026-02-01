import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	description: string;
	price: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	popular?: boolean;
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

const PricingRow = ({ plan }: { plan: PricingPlan }) => (
	<Card className={`transition-all duration-300 hover:shadow-lg ${plan.popular ? 'border-primary ring-1 ring-primary/20' : ''}`}>
		<CardContent className="p-6 @lg:p-8">
			<div className="flex flex-col @lg:flex-row @lg:items-center gap-6 @lg:gap-8">
				<div className="flex-1 @lg:flex @lg:items-center @lg:gap-8">
					<div className="@lg:w-48 mb-4 @lg:mb-0">
						<div className="flex items-center gap-2">
							<h3 className="text-xl font-bold">{plan.name}</h3>
							{plan.popular && <Badge>Popular</Badge>}
						</div>
						<p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
					</div>
					<div className="@lg:w-40 mb-4 @lg:mb-0">
						<span className="text-3xl @lg:text-4xl font-bold">{plan.price}</span>
						<span className="text-muted-foreground">{plan.period}</span>
					</div>
					<ul className="flex-1 flex flex-wrap gap-x-6 gap-y-2">
						{plan.features.map((feature, i) => (
							<li key={i} className="flex items-center gap-2 text-sm">
								<Check className="size-4 text-primary shrink-0" />
								{feature}
							</li>
						))}
					</ul>
				</div>
				<Button
					asChild
					className="shrink-0 gap-2 group"
					variant={plan.popular ? 'default' : 'outline'}
				>
					<Link href={plan.cta.href}>
						{plan.cta.label}
						<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const title = 'Simple, Scalable Pricing';
	const subtitle = 'Choose the plan that works for you. All plans include a 14-day free trial.';
	const plans: PricingPlan[] = [
		{
			name: 'Starter',
			description: 'For individuals',
			price: '$9',
			period: '/mo',
			features: ['5 projects', '2GB storage', 'Email support'],
			cta: { label: 'Get Started', href: '#starter' },
		},
		{
			name: 'Pro',
			description: 'For professionals',
			price: '$29',
			period: '/mo',
			features: ['Unlimited projects', '50GB storage', 'Priority support', 'Analytics'],
			cta: { label: 'Start Trial', href: '#pro' },
			popular: true,
		},
		{
			name: 'Team',
			description: 'For teams',
			price: '$79',
			period: '/mo',
			features: ['Everything in Pro', '5 team members', 'Admin controls', 'SSO'],
			cta: { label: 'Start Trial', href: '#team' },
		},
		{
			name: 'Enterprise',
			description: 'For organizations',
			price: 'Custom',
			period: '',
			features: ['Unlimited seats', 'Dedicated support', 'Custom SLA', 'On-premise'],
			cta: { label: 'Contact Us', href: '#enterprise' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header title={title} subtitle={subtitle} />
				<div className="flex flex-col gap-4">
					{plans.map((plan, i) => (
						<PricingRow key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
