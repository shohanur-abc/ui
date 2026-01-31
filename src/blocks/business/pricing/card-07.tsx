import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Minus } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	price: string;
	period: string;
	description: string;
	features: { text: string; included: boolean }[];
	cta: { label: string; href: string };
	highlighted?: boolean;
}

const Header = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="secondary" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title}
		</h2>
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
	<div
		className={`relative p-6 @lg:p-8 rounded-2xl transition-all duration-300 ${
			plan.highlighted
				? 'bg-primary text-primary-foreground ring-2 ring-primary shadow-xl shadow-primary/25'
				: 'bg-card border hover:border-primary/50 hover:shadow-lg'
		}`}
	>
		{plan.highlighted && (
			<div className="absolute -top-3 left-1/2 -translate-x-1/2">
				<span className="bg-background text-foreground text-xs font-medium px-3 py-1 rounded-full">
					Most Popular
				</span>
			</div>
		)}
		<div className="mb-6">
			<h3 className="text-xl font-bold mb-1">{plan.name}</h3>
			<p className={`text-sm ${plan.highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
				{plan.description}
			</p>
		</div>
		<div className="mb-8">
			<span className="text-4xl @lg:text-5xl font-bold">{plan.price}</span>
			<span className={plan.highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground'}>
				{plan.period}
			</span>
		</div>
		<Button
			asChild
			className="w-full mb-8"
			variant={plan.highlighted ? 'secondary' : 'default'}
			size="lg"
		>
			<Link href={plan.cta.href}>{plan.cta.label}</Link>
		</Button>
		<ul className="space-y-3">
			{plan.features.map((feature, i) => (
				<li key={i} className="flex items-center gap-3">
					{feature.included ? (
						<Check className={`size-4 shrink-0 ${plan.highlighted ? 'text-primary-foreground' : 'text-primary'}`} />
					) : (
						<Minus className={`size-4 shrink-0 ${plan.highlighted ? 'text-primary-foreground/50' : 'text-muted-foreground'}`} />
					)}
					<span
						className={`text-sm ${
							!feature.included && (plan.highlighted ? 'text-primary-foreground/50' : 'text-muted-foreground')
						}`}
					>
						{feature.text}
					</span>
				</li>
			))}
		</ul>
	</div>
);

export default function Main() {
	const eyebrow = 'Simple Pricing';
	const title = 'One Price, All Features';
	const plans: PricingPlan[] = [
		{
			name: 'Basic',
			price: '$15',
			period: '/month',
			description: 'For individuals getting started',
			features: [
				{ text: '5 projects', included: true },
				{ text: '2GB storage', included: true },
				{ text: 'Email support', included: true },
				{ text: 'Analytics', included: false },
				{ text: 'Custom domain', included: false },
				{ text: 'Team access', included: false },
			],
			cta: { label: 'Get Started', href: '#basic' },
		},
		{
			name: 'Professional',
			price: '$45',
			period: '/month',
			description: 'Perfect for growing teams',
			features: [
				{ text: 'Unlimited projects', included: true },
				{ text: '50GB storage', included: true },
				{ text: 'Priority support', included: true },
				{ text: 'Advanced analytics', included: true },
				{ text: 'Custom domain', included: true },
				{ text: 'Team access (5 seats)', included: true },
			],
			cta: { label: 'Start Free Trial', href: '#professional' },
			highlighted: true,
		},
		{
			name: 'Enterprise',
			price: '$99',
			period: '/month',
			description: 'For large organizations',
			features: [
				{ text: 'Everything in Pro', included: true },
				{ text: 'Unlimited storage', included: true },
				{ text: '24/7 phone support', included: true },
				{ text: 'Custom analytics', included: true },
				{ text: 'White-label solution', included: true },
				{ text: 'Unlimited team seats', included: true },
			],
			cta: { label: 'Contact Sales', href: '#enterprise' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header eyebrow={eyebrow} title={title} />
				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 @lg:gap-8 items-start">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
