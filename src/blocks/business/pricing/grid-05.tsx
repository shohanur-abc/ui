import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	subtitle: string;
	price: string;
	period: string;
	billing: string;
	features: string[];
	cta: { label: string; href: string };
	highlighted?: boolean;
}

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="max-w-3xl mx-auto text-center mb-12 @lg:mb-16">
		<div className="inline-flex items-center gap-2 text-sm text-primary mb-4">
			<Sparkles className="size-4" />
			<span className="font-medium">Simple Pricing</span>
		</div>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg">
			{subtitle}
		</p>
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
	<Card
		className={`relative flex flex-col transition-all duration-300 ${
			plan.highlighted
				? 'border-primary shadow-xl bg-gradient-to-b from-primary/5 to-transparent'
				: 'hover:shadow-lg hover:-translate-y-1'
		}`}
	>
		{plan.highlighted && (
			<div className="absolute -top-3 left-1/2 -translate-x-1/2">
				<Badge className="shadow-lg">Most Popular</Badge>
			</div>
		)}
		<CardHeader className="text-center pt-8">
			<h3 className="text-lg font-semibold text-muted-foreground">{plan.name}</h3>
			<p className="text-sm text-muted-foreground">{plan.subtitle}</p>
			<div className="mt-4">
				<span className="text-5xl font-bold">{plan.price}</span>
				<span className="text-muted-foreground">{plan.period}</span>
			</div>
			<p className="text-xs text-muted-foreground mt-2">{plan.billing}</p>
		</CardHeader>
		<CardContent className="flex-1 pt-6">
			<ul className="space-y-4">
				{plan.features.map((feature, i) => (
					<li key={i} className="flex items-center gap-3">
						<div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
							<Check className="size-3 text-primary" />
						</div>
						<span className="text-sm">{feature}</span>
					</li>
				))}
			</ul>
		</CardContent>
		<CardFooter className="pt-6">
			<Button
				asChild
				className="w-full"
				variant={plan.highlighted ? 'default' : 'outline'}
				size="lg"
			>
				<Link href={plan.cta.href}>{plan.cta.label}</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const title = 'Pricing That Makes Sense';
	const subtitle = 'Choose the plan that fits your needs. All plans include core features.';
	const plans: PricingPlan[] = [
		{
			name: 'HOBBY',
			subtitle: 'For side projects',
			price: '$0',
			period: '/mo',
			billing: 'Free forever',
			features: ['3 projects', '1GB storage', 'Community support', 'Basic analytics'],
			cta: { label: 'Start Building', href: '#hobby' },
		},
		{
			name: 'PROFESSIONAL',
			subtitle: 'For serious builders',
			price: '$19',
			period: '/mo',
			billing: 'Billed monthly',
			features: ['Unlimited projects', '25GB storage', 'Email support', 'Advanced analytics', 'Custom domains', 'Webhooks'],
			cta: { label: 'Get Started', href: '#professional' },
			highlighted: true,
		},
		{
			name: 'BUSINESS',
			subtitle: 'For teams',
			price: '$49',
			period: '/mo',
			billing: 'Billed monthly',
			features: ['Everything in Pro', '100GB storage', 'Priority support', 'Team collaboration', 'RBAC', 'Audit logs'],
			cta: { label: 'Get Started', href: '#business' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header title={title} subtitle={subtitle} />
				<div className="grid @md:grid-cols-3 gap-8 items-start">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
