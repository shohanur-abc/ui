import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	description: string;
	price: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	popular?: boolean;
}

interface PricingProps {
	eyebrow: string;
	title: string;
	subtitle: string;
	plans: PricingPlan[];
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="secondary" className="mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
		{text}
	</p>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
	<Card
		className={`relative flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
			plan.popular
				? 'border-primary shadow-primary/20 shadow-lg ring-1 ring-primary/20'
				: 'hover:border-primary/50'
		}`}
	>
		{plan.popular && (
			<div className="absolute -top-3 left-1/2 -translate-x-1/2">
				<Badge className="shadow-lg">Most Popular</Badge>
			</div>
		)}
		<CardHeader className="text-center pb-2">
			<h3 className="text-xl font-semibold">{plan.name}</h3>
			<p className="text-sm text-muted-foreground">{plan.description}</p>
		</CardHeader>
		<CardContent className="flex-1 text-center">
			<div className="mb-6">
				<span className="text-4xl @md:text-5xl font-bold">{plan.price}</span>
				<span className="text-muted-foreground ml-2">{plan.period}</span>
			</div>
			<ul className="space-y-3 text-left">
				{plan.features.map((feature, i) => (
					<li key={i} className="flex items-start gap-3">
						<Check className="size-5 text-primary shrink-0 mt-0.5" />
						<span className="text-sm">{feature}</span>
					</li>
				))}
			</ul>
		</CardContent>
		<CardFooter>
			<Button
				asChild
				className="w-full"
				variant={plan.popular ? 'default' : 'outline'}
			>
				<Link href={plan.cta.href}>{plan.cta.label}</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const eyebrow = 'Pricing';
	const title = 'Simple, Transparent Pricing';
	const subtitle =
		'Choose the plan that fits your needs. No hidden fees, cancel anytime.';
	const plans: PricingPlan[] = [
		{
			name: 'Starter',
			description: 'Perfect for individuals',
			price: '$9',
			period: '/month',
			features: [
				'Up to 5 projects',
				'Basic analytics',
				'24/7 email support',
				'1GB storage',
			],
			cta: { label: 'Get Started', href: '#starter' },
		},
		{
			name: 'Professional',
			description: 'Best for growing teams',
			price: '$29',
			period: '/month',
			features: [
				'Unlimited projects',
				'Advanced analytics',
				'Priority support',
				'10GB storage',
				'Team collaboration',
				'Custom integrations',
			],
			cta: { label: 'Get Started', href: '#pro' },
			popular: true,
		},
		{
			name: 'Enterprise',
			description: 'For large organizations',
			price: '$99',
			period: '/month',
			features: [
				'Everything in Pro',
				'Unlimited storage',
				'Dedicated account manager',
				'Custom SLA',
				'Advanced security',
				'API access',
			],
			cta: { label: 'Contact Sales', href: '#enterprise' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-12 @lg:mb-16">
					<Eyebrow text={eyebrow} />
					<Title text={title} />
					<Subtitle text={subtitle} />
				</div>
				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 @lg:gap-8">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
