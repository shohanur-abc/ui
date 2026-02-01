import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Users, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

interface PricingTier {
	name: string;
	price: string;
	period: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface PricingPlan {
	tier: PricingTier;
	description: string;
	features: string[];
	cta: { label: string; href: string };
	popular?: boolean;
}

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @lg:mb-16">
		<div className="max-w-2xl">
			<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
				{title}
			</h2>
			<p className="text-muted-foreground text-base @md:text-lg">
				{subtitle}
			</p>
		</div>
		<Badge variant="outline" className="self-start @lg:self-auto">
			30-day money back guarantee
		</Badge>
	</div>
);

const TierIcon = ({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) => (
	<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
		<Icon className="size-6 text-primary" />
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
	const Icon = plan.tier.icon;
	return (
		<Card className={`transition-all duration-300 hover:shadow-xl ${plan.popular ? 'border-primary ring-1 ring-primary/20' : ''}`}>
			{plan.popular && (
				<div className="px-6 pt-4">
					<Badge>Most Popular</Badge>
				</div>
			)}
			<CardHeader className="flex-row items-start gap-4 space-y-0">
				<TierIcon icon={Icon} />
				<div className="flex-1">
					<h3 className="text-xl font-bold">{plan.tier.name}</h3>
					<p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
				</div>
				<div className="text-right">
					<div className="text-3xl font-bold">{plan.tier.price}</div>
					<div className="text-sm text-muted-foreground">{plan.tier.period}</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col @md:flex-row @md:items-center gap-6">
					<ul className="flex-1 grid @sm:grid-cols-2 @lg:grid-cols-3 gap-3">
						{plan.features.map((feature, i) => (
							<li key={i} className="flex items-center gap-2">
								<Check className="size-4 text-primary shrink-0" />
								<span className="text-sm">{feature}</span>
							</li>
						))}
					</ul>
					<Button
						asChild
						className="shrink-0"
						variant={plan.popular ? 'default' : 'outline'}
						size="lg"
					>
						<Link href={plan.cta.href}>{plan.cta.label}</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const title = 'Simple, Predictable Pricing';
	const subtitle = 'Choose the plan that fits your workflow. Upgrade or downgrade anytime.';
	const plans: PricingPlan[] = [
		{
			tier: { name: 'Solo', price: '$12', period: '/month', icon: Zap },
			description: 'Perfect for individual creators and freelancers who need essential tools.',
			features: ['5 projects', '5GB storage', 'Basic integrations', 'Email support', 'Mobile access'],
			cta: { label: 'Start Free Trial', href: '#solo' },
		},
		{
			tier: { name: 'Team', price: '$39', period: '/month', icon: Users },
			description: 'Built for growing teams that need collaboration and advanced features.',
			features: ['Unlimited projects', '100GB storage', 'All integrations', 'Priority support', 'Team collaboration', 'Analytics dashboard'],
			cta: { label: 'Start Free Trial', href: '#team' },
			popular: true,
		},
		{
			tier: { name: 'Enterprise', price: 'Custom', period: '', icon: Shield },
			description: 'Tailored solutions for large organizations with specific requirements.',
			features: ['Unlimited everything', 'Custom storage', 'Custom integrations', '24/7 support', 'Dedicated CSM', 'SLA guarantee'],
			cta: { label: 'Contact Sales', href: '#enterprise' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header title={title} subtitle={subtitle} />
				<div className="flex flex-col gap-4">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
