import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface AddOn {
	name: string;
	price: string;
	description: string;
}

interface PricingPlan {
	name: string;
	tagline: string;
	price: string;
	period: string;
	features: string[];
	addons?: AddOn[];
	cta: { label: string; href: string };
	popular?: boolean;
}

const Header = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-1">
			<Sparkles className="size-3" />
			{eyebrow}
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
	<Card className={`transition-all duration-300 hover:shadow-lg ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
		<CardContent className="p-6 @lg:p-8">
			<div className="flex flex-col @lg:flex-row gap-8">
				<div className="@lg:w-80 shrink-0">
					<div className="flex items-center gap-2 mb-2">
						<h3 className="text-2xl font-bold">{plan.name}</h3>
						{plan.popular && <Badge>Best Value</Badge>}
					</div>
					<p className="text-sm text-muted-foreground mb-6">{plan.tagline}</p>
					<div className="mb-6">
						<span className="text-5xl font-bold">{plan.price}</span>
						<span className="text-muted-foreground ml-1">{plan.period}</span>
					</div>
					<Button
						asChild
						className="w-full"
						variant={plan.popular ? 'default' : 'outline'}
						size="lg"
					>
						<Link href={plan.cta.href}>{plan.cta.label}</Link>
					</Button>
				</div>

				<div className="flex-1 grid @md:grid-cols-2 gap-8">
					<div>
						<h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
							Includes
						</h4>
						<ul className="space-y-3">
							{plan.features.map((feature, i) => (
								<li key={i} className="flex items-start gap-3">
									<Check className="size-4 text-primary mt-0.5 shrink-0" />
									<span className="text-sm">{feature}</span>
								</li>
							))}
						</ul>
					</div>

					{plan.addons && plan.addons.length > 0 && (
						<div>
							<h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
								Optional Add-ons
							</h4>
							<div className="space-y-3">
								{plan.addons.map((addon, i) => (
									<div key={i} className="p-3 rounded-lg bg-muted/50 border">
										<div className="flex items-center justify-between mb-1">
											<span className="text-sm font-medium">{addon.name}</span>
											<span className="text-sm font-bold">{addon.price}</span>
										</div>
										<p className="text-xs text-muted-foreground">{addon.description}</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const eyebrow = 'Pricing';
	const title = 'Flexible Pricing with Add-ons';
	const subtitle = 'Start with a base plan and customize with optional add-ons.';
	const plans: PricingPlan[] = [
		{
			name: 'Starter',
			tagline: 'Everything you need to get started',
			price: '$19',
			period: '/month',
			features: [
				'5 projects',
				'5GB storage',
				'Email support',
				'Basic analytics',
				'Mobile app',
			],
			addons: [
				{ name: 'Extra storage', price: '+$5/mo', description: '10GB additional' },
				{ name: 'Priority support', price: '+$10/mo', description: '4hr response' },
			],
			cta: { label: 'Get Started', href: '#starter' },
		},
		{
			name: 'Professional',
			tagline: 'Advanced features for growing teams',
			price: '$49',
			period: '/month',
			features: [
				'Unlimited projects',
				'50GB storage',
				'Priority support',
				'Advanced analytics',
				'Team collaboration',
				'API access',
			],
			addons: [
				{ name: 'Extra seats', price: '+$8/user', description: 'Per team member' },
				{ name: 'White-label', price: '+$25/mo', description: 'Custom branding' },
				{ name: 'SSO', price: '+$20/mo', description: 'Single sign-on' },
			],
			cta: { label: 'Start Free Trial', href: '#professional' },
			popular: true,
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header eyebrow={eyebrow} title={title} subtitle={subtitle} />
				<div className="flex flex-col gap-6">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
