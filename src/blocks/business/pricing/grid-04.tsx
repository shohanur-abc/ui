import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Rocket, Shield, Users, Crown } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	description: string;
	price: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	icon: React.ComponentType<{ className?: string }>;
	color: string;
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
		<Card className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${plan.featured ? 'border-primary shadow-lg ring-1 ring-primary' : ''}`}>
			<div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10" style={{ backgroundColor: plan.color }} />
			{plan.featured && (
				<Badge className="absolute top-4 right-4">Best Value</Badge>
			)}
			<CardHeader>
				<div className="size-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${plan.color}20` }}>
					<Icon className="size-6" style={{ color: plan.color }} />
				</div>
				<h3 className="text-xl font-bold">{plan.name}</h3>
				<p className="text-sm text-muted-foreground">{plan.description}</p>
			</CardHeader>
			<CardContent>
				<div className="mb-6">
					<span className="text-4xl font-bold">{plan.price}</span>
					<span className="text-muted-foreground ml-1">{plan.period}</span>
				</div>
				<ul className="space-y-3 mb-8">
					{plan.features.map((feature, i) => (
						<li key={i} className="flex items-start gap-2">
							<Check className="size-4 mt-0.5 shrink-0" style={{ color: plan.color }} />
							<span className="text-sm">{feature}</span>
						</li>
					))}
				</ul>
				<Button
					asChild
					className="w-full"
					style={plan.featured ? { backgroundColor: plan.color } : undefined}
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
	const title = 'Flexible Plans for Everyone';
	const subtitle = 'Start with what you need, scale as you grow';
	const plans: PricingPlan[] = [
		{
			name: 'Starter',
			description: 'Launch your first project',
			price: '$0',
			period: '/forever',
			features: ['1 project', '1GB storage', 'Community forum', 'Basic templates'],
			cta: { label: 'Start Free', href: '#starter' },
			icon: Rocket,
			color: '#10b981',
		},
		{
			name: 'Pro',
			description: 'For professionals',
			price: '$29',
			period: '/month',
			features: ['Unlimited projects', '50GB storage', 'Priority support', 'All templates', 'Analytics', 'Custom domain'],
			cta: { label: 'Get Pro', href: '#pro' },
			icon: Crown,
			color: '#8b5cf6',
			featured: true,
		},
		{
			name: 'Team',
			description: 'Collaborate together',
			price: '$79',
			period: '/month',
			features: ['Everything in Pro', '5 team members', 'Shared workspaces', 'Team analytics', 'Admin controls'],
			cta: { label: 'Get Team', href: '#team' },
			icon: Users,
			color: '#3b82f6',
		},
		{
			name: 'Enterprise',
			description: 'For large organizations',
			price: 'Custom',
			period: '',
			features: ['Unlimited seats', 'Custom storage', 'Dedicated support', 'SSO & SCIM', 'Custom contracts'],
			cta: { label: 'Contact Sales', href: '#enterprise' },
			icon: Shield,
			color: '#f59e0b',
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
