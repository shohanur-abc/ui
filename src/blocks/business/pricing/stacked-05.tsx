import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Rocket, Building, Users } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	description: string;
	price: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	icon: React.ComponentType<{ className?: string }>;
	gradient: string;
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
		<Card className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
			<CardContent className="p-0">
				<div className="grid @lg:grid-cols-[1fr_2fr]">
					<div className={`p-8 bg-gradient-to-br ${plan.gradient} text-white relative overflow-hidden`}>
						<div className="absolute inset-0 bg-black/10" />
						<div className="relative">
							<div className="size-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center mb-6">
								<Icon className="size-7" />
							</div>
							<div className="flex items-center gap-2 mb-2">
								<h3 className="text-2xl font-bold">{plan.name}</h3>
								{plan.popular && (
									<Badge className="bg-white/20 text-white border-0">Popular</Badge>
								)}
							</div>
							<p className="text-white/80 text-sm mb-8">{plan.description}</p>
							<div>
								<span className="text-5xl font-bold">{plan.price}</span>
								<span className="text-white/70 ml-2">{plan.period}</span>
							</div>
						</div>
					</div>
					<div className="p-8 flex flex-col">
						<ul className="grid @sm:grid-cols-2 gap-4 flex-1">
							{plan.features.map((feature, i) => (
								<li key={i} className="flex items-start gap-3">
									<div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
										<Check className="size-3 text-primary" />
									</div>
									<span className="text-sm">{feature}</span>
								</li>
							))}
						</ul>
						<Button
							asChild
							className="mt-8 w-full @sm:w-auto @sm:self-end"
							variant={plan.popular ? 'default' : 'outline'}
							size="lg"
						>
							<Link href={plan.cta.href}>{plan.cta.label}</Link>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const title = 'Plans for Every Journey';
	const subtitle = 'Whether you\'re just starting or scaling up, we have the right plan for you.';
	const plans: PricingPlan[] = [
		{
			name: 'Startup',
			description: 'Perfect for early-stage startups and small teams just getting started.',
			price: '$29',
			period: '/month',
			features: [
				'Up to 5 team members',
				'10GB cloud storage',
				'Basic integrations',
				'Email support',
				'Project templates',
				'Mobile app access',
			],
			cta: { label: 'Start Free Trial', href: '#startup' },
			icon: Rocket,
			gradient: 'from-blue-600 to-cyan-500',
		},
		{
			name: 'Business',
			description: 'Ideal for growing companies that need advanced features and support.',
			price: '$79',
			period: '/month',
			features: [
				'Up to 25 team members',
				'100GB cloud storage',
				'All integrations',
				'Priority support',
				'Advanced analytics',
				'Custom workflows',
				'Team collaboration',
				'API access',
			],
			cta: { label: 'Start Free Trial', href: '#business' },
			icon: Users,
			gradient: 'from-violet-600 to-purple-500',
			popular: true,
		},
		{
			name: 'Enterprise',
			description: 'For large organizations with custom requirements and compliance needs.',
			price: 'Custom',
			period: '',
			features: [
				'Unlimited team members',
				'Unlimited storage',
				'Custom integrations',
				'24/7 dedicated support',
				'Custom analytics',
				'Advanced security',
				'Dedicated account manager',
				'Custom contracts',
			],
			cta: { label: 'Contact Sales', href: '#enterprise' },
			icon: Building,
			gradient: 'from-amber-600 to-orange-500',
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header title={title} subtitle={subtitle} />
				<div className="flex flex-col gap-6">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
