import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Users, Database, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	price: string;
	period: string;
	tagline: string;
	icon: React.ComponentType<{ className?: string }>;
	features: string[];
	metrics: { label: string; value: string }[];
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

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
	const Icon = plan.icon;
	return (
		<Card
			className={`relative flex flex-col transition-all duration-300 hover:shadow-lg ${plan.popular ? 'border-primary shadow-lg' : ''}`}
		>
			{plan.popular && (
				<Badge className="absolute -top-3 right-6">Recommended</Badge>
			)}
			<CardHeader>
				<div className="flex items-center gap-3 mb-4">
					<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
						<Icon className="size-5 text-primary" />
					</div>
					<div>
						<h3 className="font-bold text-lg">{plan.name}</h3>
						<p className="text-xs text-muted-foreground">{plan.tagline}</p>
					</div>
				</div>
				<div className="flex items-baseline gap-1">
					<span className="text-4xl font-bold">{plan.price}</span>
					<span className="text-muted-foreground">{plan.period}</span>
				</div>
			</CardHeader>
			<CardContent className="flex-1 flex flex-col">
				<div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b">
					{plan.metrics.map((metric, i) => (
						<div key={i} className="bg-muted/50 rounded-lg p-3">
							<div className="text-lg font-bold">{metric.value}</div>
							<div className="text-xs text-muted-foreground">
								{metric.label}
							</div>
						</div>
					))}
				</div>
				<ul className="space-y-3 flex-1">
					{plan.features.map((feature, i) => (
						<li key={i} className="flex items-start gap-2">
							<Check className="size-4 text-primary mt-0.5 shrink-0" />
							<span className="text-sm">{feature}</span>
						</li>
					))}
				</ul>
				<Button
					asChild
					className="w-full mt-6"
					variant={plan.popular ? 'default' : 'outline'}
					size="lg"
				>
					<Link href={plan.cta.href}>{plan.cta.label}</Link>
				</Button>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const title = 'Plans for Every Stage';
	const subtitle =
		'Scale seamlessly from startup to enterprise with our flexible pricing';
	const plans: PricingPlan[] = [
		{
			name: 'Starter',
			price: '$19',
			period: '/mo',
			tagline: 'Perfect for side projects',
			icon: Zap,
			metrics: [
				{ label: 'Team members', value: '3' },
				{ label: 'API calls', value: '10K' },
			],
			features: [
				'Core features included',
				'Basic integrations',
				'Email support',
				'Weekly backups',
			],
			cta: { label: 'Start Building', href: '#starter' },
		},
		{
			name: 'Team',
			price: '$49',
			period: '/mo',
			tagline: 'For collaborative teams',
			icon: Users,
			metrics: [
				{ label: 'Team members', value: '10' },
				{ label: 'API calls', value: '100K' },
			],
			features: [
				'All Starter features',
				'Advanced integrations',
				'Priority support',
				'Daily backups',
				'Team collaboration',
			],
			cta: { label: 'Start Free Trial', href: '#team' },
			popular: true,
		},
		{
			name: 'Business',
			price: '$99',
			period: '/mo',
			tagline: 'For growing businesses',
			icon: Database,
			metrics: [
				{ label: 'Team members', value: '50' },
				{ label: 'API calls', value: '1M' },
			],
			features: [
				'All Team features',
				'Custom integrations',
				'Dedicated support',
				'Real-time backups',
				'Advanced security',
				'Analytics suite',
			],
			cta: { label: 'Start Free Trial', href: '#business' },
		},
		{
			name: 'Enterprise',
			price: 'Custom',
			period: '',
			tagline: 'For large organizations',
			icon: Shield,
			metrics: [
				{ label: 'Team members', value: '∞' },
				{ label: 'API calls', value: '∞' },
			],
			features: [
				'All Business features',
				'Unlimited everything',
				'24/7 phone support',
				'Custom SLA',
				'On-premise option',
				'Dedicated CSM',
			],
			cta: { label: 'Contact Sales', href: '#enterprise' },
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
