import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Check, CircleDot } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	description: string;
	monthlyPrice: string;
	yearlyPrice: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	featured?: boolean;
	savings?: string;
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

const PriceDisplay = ({ monthly, yearly, savings }: { monthly: string; yearly: string; savings?: string }) => (
	<div className="space-y-2">
		<div className="flex items-center gap-3">
			<span className="text-4xl @lg:text-5xl font-bold">{yearly}</span>
			<span className="text-muted-foreground line-through text-lg">{monthly}</span>
		</div>
		{savings && (
			<Badge variant="secondary" className="text-xs">
				Save {savings}
			</Badge>
		)}
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
	<Card
		className={`relative flex flex-col transition-all duration-300 hover:-translate-y-1 ${
			plan.featured
				? 'border-2 border-primary shadow-xl shadow-primary/10'
				: 'hover:shadow-lg hover:border-primary/50'
		}`}
	>
		{plan.featured && (
			<div className="absolute -top-4 left-0 right-0 flex justify-center">
				<Badge className="shadow-lg">Best Value</Badge>
			</div>
		)}
		<CardHeader className="pt-8">
			<div className="flex items-center gap-2 mb-2">
				<CircleDot className="size-4 text-primary" />
				<h3 className="text-xl font-bold">{plan.name}</h3>
			</div>
			<p className="text-sm text-muted-foreground">{plan.description}</p>
		</CardHeader>
		<CardContent className="flex-1">
			<PriceDisplay
				monthly={plan.monthlyPrice}
				yearly={plan.yearlyPrice}
				savings={plan.savings}
			/>
			<p className="text-sm text-muted-foreground mt-1">per user {plan.period}</p>
			<div className="h-px bg-border my-6" />
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
				variant={plan.featured ? 'default' : 'outline'}
				size="lg"
			>
				<Link href={plan.cta.href}>{plan.cta.label}</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const title = 'Annual Pricing';
	const subtitle = 'Save up to 25% with annual billing. All plans include a 14-day free trial.';
	const plans: PricingPlan[] = [
		{
			name: 'Essential',
			description: 'Core features for small teams',
			monthlyPrice: '$12',
			yearlyPrice: '$9',
			period: '/month, billed yearly',
			savings: '25%',
			features: [
				'Up to 10 team members',
				'5GB per user',
				'Core integrations',
				'Email support',
				'Basic analytics',
			],
			cta: { label: 'Start Free Trial', href: '#essential' },
		},
		{
			name: 'Professional',
			description: 'Advanced tools for growing teams',
			monthlyPrice: '$29',
			yearlyPrice: '$22',
			period: '/month, billed yearly',
			savings: '24%',
			features: [
				'Up to 50 team members',
				'25GB per user',
				'All integrations',
				'Priority support',
				'Advanced analytics',
				'Custom workflows',
			],
			cta: { label: 'Start Free Trial', href: '#professional' },
			featured: true,
		},
		{
			name: 'Enterprise',
			description: 'Complete solution for enterprises',
			monthlyPrice: '$59',
			yearlyPrice: '$49',
			period: '/month, billed yearly',
			savings: '17%',
			features: [
				'Unlimited team members',
				'Unlimited storage',
				'Custom integrations',
				'24/7 phone support',
				'Custom analytics',
				'Dedicated account manager',
			],
			cta: { label: 'Contact Sales', href: '#enterprise' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header title={title} subtitle={subtitle} />
				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-8 items-start">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
