import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight, Diamond } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	subtitle: string;
	price: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	tier: 'basic' | 'plus' | 'premium';
}

const tierStyles = {
	basic: {
		bg: 'bg-slate-100 dark:bg-slate-800/50',
		border: 'border-slate-200 dark:border-slate-700',
		icon: 'bg-slate-200 dark:bg-slate-700',
	},
	plus: {
		bg: 'bg-blue-50 dark:bg-blue-950/30',
		border: 'border-blue-200 dark:border-blue-800',
		icon: 'bg-blue-100 dark:bg-blue-900/50',
	},
	premium: {
		bg: 'bg-violet-50 dark:bg-violet-950/30',
		border: 'border-violet-200 dark:border-violet-800',
		icon: 'bg-violet-100 dark:bg-violet-900/50',
	},
};

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="text-center mb-12 @lg:mb-16">
		<div className="inline-flex items-center gap-2 text-sm text-primary mb-4">
			<Diamond className="size-4" />
			<span className="font-medium">Pricing</span>
		</div>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{subtitle}
		</p>
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
	const styles = tierStyles[plan.tier];
	return (
		<Card className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-2 ${styles.border}`}>
			<div className={`absolute inset-0 ${styles.bg} -z-10`} />
			<CardContent className="pt-8">
				<div className={`size-12 rounded-xl ${styles.icon} flex items-center justify-center mb-6`}>
					<Diamond className="size-6 text-primary" />
				</div>
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-xl font-bold">{plan.name}</h3>
					{plan.tier === 'premium' && <Badge>Popular</Badge>}
				</div>
				<p className="text-sm text-muted-foreground mb-6">{plan.subtitle}</p>
				
				<div className="mb-8">
					<span className="text-5xl font-bold">{plan.price}</span>
					<span className="text-muted-foreground ml-1">{plan.period}</span>
				</div>

				<ul className="space-y-4 mb-8">
					{plan.features.map((feature, i) => (
						<li key={i} className="flex items-center gap-3">
							<div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
								<Check className="size-3 text-primary" />
							</div>
							<span className="text-sm">{feature}</span>
						</li>
					))}
				</ul>

				<Button
					asChild
					className="w-full gap-2 group"
					variant={plan.tier === 'premium' ? 'default' : 'outline'}
					size="lg"
				>
					<Link href={plan.cta.href}>
						{plan.cta.label}
						<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const title = 'Pick Your Tier';
	const subtitle = 'All tiers include core features. Upgrade anytime.';
	const plans: PricingPlan[] = [
		{
			name: 'Basic',
			subtitle: 'For getting started',
			price: '$0',
			period: '/month',
			features: ['3 projects', '1GB storage', 'Community support', 'Basic features'],
			cta: { label: 'Get Started', href: '#basic' },
			tier: 'basic',
		},
		{
			name: 'Plus',
			subtitle: 'For professionals',
			price: '$19',
			period: '/month',
			features: ['Unlimited projects', '25GB storage', 'Email support', 'Advanced features', 'Analytics'],
			cta: { label: 'Upgrade to Plus', href: '#plus' },
			tier: 'plus',
		},
		{
			name: 'Premium',
			subtitle: 'For power users',
			price: '$49',
			period: '/month',
			features: ['Everything in Plus', '100GB storage', 'Priority support', 'Premium features', 'API access', 'Custom domain'],
			cta: { label: 'Go Premium', href: '#premium' },
			tier: 'premium',
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
