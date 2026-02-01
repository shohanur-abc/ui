import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Users, Zap, Crown, Building2 } from 'lucide-react';
import Link from 'next/link';

interface Metric {
	label: string;
	value: string;
}

interface PricingPlan {
	name: string;
	tagline: string;
	price: string;
	period: string;
	metrics: Metric[];
	features: string[];
	cta: { label: string; href: string };
	icon: React.ComponentType<{ className?: string }>;
	featured?: boolean;
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

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
	const Icon = plan.icon;
	return (
		<Card className={`relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${plan.featured ? 'border-primary shadow-lg' : ''}`}>
			{plan.featured && (
				<Badge className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-lg">Recommended</Badge>
			)}
			<CardContent className="pt-8">
				<div className="flex items-start justify-between mb-6">
					<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
						<Icon className="size-6 text-primary" />
					</div>
					<div className="text-right">
						<span className="text-3xl font-bold">{plan.price}</span>
						<span className="text-muted-foreground text-sm">{plan.period}</span>
					</div>
				</div>
				<h3 className="text-xl font-bold mb-1">{plan.name}</h3>
				<p className="text-sm text-muted-foreground mb-6">{plan.tagline}</p>
				
				<div className="grid grid-cols-2 gap-3 mb-6">
					{plan.metrics.map((metric, i) => (
						<div key={i} className="p-3 rounded-lg bg-muted/50">
							<div className="text-lg font-bold">{metric.value}</div>
							<div className="text-xs text-muted-foreground">{metric.label}</div>
						</div>
					))}
				</div>

				<ul className="space-y-2 mb-6">
					{plan.features.map((feature, i) => (
						<li key={i} className="flex items-center gap-2 text-sm">
							<Check className="size-4 text-primary shrink-0" />
							{feature}
						</li>
					))}
				</ul>

				<Button
					asChild
					className="w-full"
					variant={plan.featured ? 'default' : 'outline'}
					size="lg"
				>
					<Link href={plan.cta.href}>{plan.cta.label}</Link>
				</Button>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const title = 'Plans With Metrics';
	const subtitle = 'Understand exactly what you get with each plan';
	const plans: PricingPlan[] = [
		{
			name: 'Starter',
			tagline: 'Perfect for individuals',
			price: '$12',
			period: '/mo',
			metrics: [
				{ label: 'Projects', value: '5' },
				{ label: 'Storage', value: '5GB' },
			],
			features: ['Email support', 'Core features', 'Mobile app'],
			cta: { label: 'Get Started', href: '#starter' },
			icon: Zap,
		},
		{
			name: 'Professional',
			tagline: 'For growing creators',
			price: '$29',
			period: '/mo',
			metrics: [
				{ label: 'Projects', value: '∞' },
				{ label: 'Storage', value: '100GB' },
			],
			features: ['Priority support', 'Advanced features', 'API access', 'Analytics'],
			cta: { label: 'Start Trial', href: '#professional' },
			icon: Crown,
			featured: true,
		},
		{
			name: 'Team',
			tagline: 'Collaborate with your team',
			price: '$59',
			period: '/mo',
			metrics: [
				{ label: 'Members', value: '10' },
				{ label: 'Storage', value: '500GB' },
			],
			features: ['Everything in Pro', 'Team features', 'Admin controls', 'SSO'],
			cta: { label: 'Start Trial', href: '#team' },
			icon: Users,
		},
		{
			name: 'Enterprise',
			tagline: 'For large organizations',
			price: 'Custom',
			period: '',
			metrics: [
				{ label: 'Members', value: '∞' },
				{ label: 'Storage', value: '∞' },
			],
			features: ['Everything in Team', 'Dedicated support', 'Custom contracts', 'SLA'],
			cta: { label: 'Contact Sales', href: '#enterprise' },
			icon: Building2,
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header title={title} subtitle={subtitle} />
				<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
