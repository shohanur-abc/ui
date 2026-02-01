import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	price: string;
	period: string;
	tagline: string;
	features: string[];
	cta: { label: string; href: string };
	recommended?: boolean;
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
	<Card className={`flex flex-col transition-all duration-300 hover:shadow-lg ${plan.recommended ? 'border-primary bg-primary/5 shadow-xl scale-[1.02]' : ''}`}>
		<CardHeader>
			<div className="flex items-center justify-between">
				<h3 className="text-xl font-bold">{plan.name}</h3>
				{plan.recommended && (
					<Badge className="gap-1">
						<Star className="size-3" />
						Recommended
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{plan.tagline}</p>
		</CardHeader>
		<CardContent className="flex-1">
			<div className="mb-6 pb-6 border-b">
				<span className="text-4xl font-bold">{plan.price}</span>
				<span className="text-muted-foreground ml-1">{plan.period}</span>
			</div>
			<ul className="space-y-3">
				{plan.features.map((feature, i) => (
					<li key={i} className="flex items-start gap-3">
						<div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
							<Check className="size-3 text-primary" />
						</div>
						<span className="text-sm">{feature}</span>
					</li>
				))}
			</ul>
		</CardContent>
		<CardFooter>
			<Button
				asChild
				className="w-full"
				variant={plan.recommended ? 'default' : 'outline'}
				size="lg"
			>
				<Link href={plan.cta.href}>{plan.cta.label}</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const title = 'Choose Your Plan';
	const subtitle = '14-day free trial on all plans. No credit card required.';
	const plans: PricingPlan[] = [
		{
			name: 'Basic',
			price: '$9',
			period: '/month',
			tagline: 'Essential tools to get started',
			features: ['5 projects', '5GB storage', 'Basic support', 'Core features'],
			cta: { label: 'Start Free Trial', href: '#basic' },
		},
		{
			name: 'Professional',
			price: '$29',
			period: '/month',
			tagline: 'Everything you need to grow',
			features: ['Unlimited projects', '50GB storage', 'Priority support', 'Advanced features', 'Analytics', 'API access'],
			cta: { label: 'Start Free Trial', href: '#professional' },
			recommended: true,
		},
		{
			name: 'Team',
			price: '$79',
			period: '/month',
			tagline: 'Perfect for teams and collaboration',
			features: ['Everything in Pro', 'Team management', 'Shared workspaces', 'Admin controls', 'Audit logs'],
			cta: { label: 'Start Free Trial', href: '#team' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header title={title} subtitle={subtitle} />
				<div className="grid @md:grid-cols-3 gap-8 items-stretch">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
