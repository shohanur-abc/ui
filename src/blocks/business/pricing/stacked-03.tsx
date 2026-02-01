import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ChevronRight, Layers } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	description: string;
	price: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	color: string;
	popular?: boolean;
}

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="max-w-3xl mb-12 @lg:mb-16">
		<div className="inline-flex items-center gap-2 text-sm text-primary mb-4">
			<Layers className="size-4" />
			<span className="font-medium">Pricing Plans</span>
		</div>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg">
			{subtitle}
		</p>
	</div>
);

const PricingCard = ({ plan, index }: { plan: PricingPlan; index: number }) => (
	<Card
		className={`transition-all duration-300 hover:shadow-lg overflow-hidden ${
			plan.popular ? 'ring-2 ring-primary' : ''
		}`}
		style={{ '--plan-color': plan.color } as React.CSSProperties}
	>
		<CardContent className="p-0">
			<div className="flex flex-col @lg:flex-row">
				<div
					className="p-6 @lg:p-8 @lg:w-72 shrink-0 flex flex-col justify-between"
					style={{ backgroundColor: `color-mix(in oklch, ${plan.color} 10%, transparent)` }}
				>
					<div>
						<div className="flex items-center gap-2 mb-2">
							<span
								className="text-xs font-bold px-2 py-0.5 rounded"
								style={{
									backgroundColor: plan.color,
									color: 'white',
								}}
							>
								{String(index + 1).padStart(2, '0')}
							</span>
							{plan.popular && <Badge variant="secondary">Popular</Badge>}
						</div>
						<h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
						<p className="text-sm text-muted-foreground">{plan.description}</p>
					</div>
					<div className="mt-6">
						<span className="text-4xl font-bold">{plan.price}</span>
						<span className="text-muted-foreground">{plan.period}</span>
					</div>
				</div>
				<div className="p-6 @lg:p-8 flex-1 flex flex-col @lg:flex-row gap-6 @lg:items-center">
					<div className="flex-1 grid @sm:grid-cols-2 gap-3">
						{plan.features.map((feature, i) => (
							<div key={i} className="flex items-center gap-2">
								<Check
									className="size-4 shrink-0"
									style={{ color: plan.color }}
								/>
								<span className="text-sm">{feature}</span>
							</div>
						))}
					</div>
					<Button
						asChild
						className="shrink-0 gap-2 group"
						style={
							plan.popular
								? { backgroundColor: plan.color, color: 'white' }
								: undefined
						}
						variant={plan.popular ? 'default' : 'outline'}
					>
						<Link href={plan.cta.href}>
							{plan.cta.label}
							<ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const title = 'Choose Your Perfect Plan';
	const subtitle = 'From startups to enterprises, we have a plan that scales with your needs.';
	const plans: PricingPlan[] = [
		{
			name: 'Starter',
			description: 'Perfect for individuals',
			price: '$19',
			period: '/month',
			features: ['5 projects', '2GB storage', 'Email support', 'Basic analytics'],
			cta: { label: 'Get Started', href: '#starter' },
			color: '#10b981',
		},
		{
			name: 'Professional',
			description: 'For growing businesses',
			price: '$49',
			period: '/month',
			features: ['Unlimited projects', '50GB storage', 'Priority support', 'Advanced analytics', 'Team collaboration', 'API access'],
			cta: { label: 'Start Free Trial', href: '#professional' },
			color: '#8b5cf6',
			popular: true,
		},
		{
			name: 'Enterprise',
			description: 'For large organizations',
			price: '$149',
			period: '/month',
			features: ['Everything in Pro', 'Unlimited storage', '24/7 support', 'Custom integrations', 'Dedicated CSM', 'SLA guarantee'],
			cta: { label: 'Contact Sales', href: '#enterprise' },
			color: '#f59e0b',
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header title={title} subtitle={subtitle} />
				<div className="flex flex-col gap-4">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} index={i} />
					))}
				</div>
			</div>
		</section>
	);
}
