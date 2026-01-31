import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	subtitle: string;
	price: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	accent: string;
	popular?: boolean;
}

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="max-w-3xl mb-12 @lg:mb-16">
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg">
			{subtitle}
		</p>
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
	<Card className="relative flex flex-col h-full transition-all duration-300 hover:shadow-lg group overflow-hidden">
		<div className={`absolute left-0 top-0 bottom-0 w-1 ${plan.accent}`} />
		{plan.popular && (
			<div className="absolute top-4 right-4">
				<Badge className="bg-primary text-primary-foreground">Popular</Badge>
			</div>
		)}
		<CardHeader className="pl-8">
			<div className="flex flex-col gap-1">
				<h3 className="text-xl font-bold">{plan.name}</h3>
				<p className="text-sm text-muted-foreground">{plan.subtitle}</p>
			</div>
			<div className="mt-6 flex items-baseline gap-1">
				<span className="text-4xl @lg:text-5xl font-bold">{plan.price}</span>
				<span className="text-muted-foreground">{plan.period}</span>
			</div>
		</CardHeader>
		<CardContent className="flex-1 pl-8 flex flex-col">
			<ul className="space-y-3 flex-1">
				{plan.features.map((feature, i) => (
					<li key={i} className="flex items-start gap-3">
						<Check className="size-4 text-primary mt-0.5 shrink-0" />
						<span className="text-sm text-muted-foreground">{feature}</span>
					</li>
				))}
			</ul>
			<Button
				asChild
				variant="ghost"
				className="self-start mt-6 gap-2 px-0 hover:bg-transparent hover:text-primary group/btn"
			>
				<Link href={plan.cta.href}>
					{plan.cta.label}
					<ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const title = 'Pricing That Scales With You';
	const subtitle = 'Whether you\'re just starting out or running a large enterprise, we have a plan that fits.';
	const plans: PricingPlan[] = [
		{
			name: 'Hobby',
			subtitle: 'For personal projects',
			price: '$0',
			period: '/month',
			features: [
				'Up to 3 projects',
				'1GB storage',
				'Community support',
				'Basic analytics',
			],
			cta: { label: 'Get started free', href: '#hobby' },
			accent: 'bg-emerald-500',
		},
		{
			name: 'Startup',
			subtitle: 'For growing businesses',
			price: '$29',
			period: '/month',
			features: [
				'Unlimited projects',
				'10GB storage',
				'Email support',
				'Advanced analytics',
				'Custom domains',
			],
			cta: { label: 'Start free trial', href: '#startup' },
			accent: 'bg-blue-500',
			popular: true,
		},
		{
			name: 'Business',
			subtitle: 'For scaling teams',
			price: '$79',
			period: '/month',
			features: [
				'Everything in Startup',
				'100GB storage',
				'Priority support',
				'Team features',
				'API access',
				'Audit logs',
			],
			cta: { label: 'Start free trial', href: '#business' },
			accent: 'bg-violet-500',
		},
		{
			name: 'Enterprise',
			subtitle: 'For large organizations',
			price: 'Custom',
			period: '',
			features: [
				'Everything in Business',
				'Unlimited storage',
				'24/7 support',
				'SSO & SAML',
				'Custom contracts',
				'Dedicated CSM',
			],
			cta: { label: 'Contact sales', href: '#enterprise' },
			accent: 'bg-amber-500',
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
