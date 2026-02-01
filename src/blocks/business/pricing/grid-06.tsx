import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	description: string;
	price: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	accent: string;
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

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
	<Card className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${plan.popular ? 'border-2 border-primary' : ''}`}>
		<div className={`absolute inset-x-0 top-0 h-1.5 ${plan.accent}`} />
		{plan.popular && (
			<Badge className="absolute top-4 right-4 shadow-lg">Popular</Badge>
		)}
		<CardContent className="pt-8 pb-6">
			<div className="mb-6">
				<h3 className="text-xl font-bold mb-1">{plan.name}</h3>
				<p className="text-sm text-muted-foreground">{plan.description}</p>
			</div>
			<div className="mb-6">
				<span className="text-5xl font-bold">{plan.price}</span>
				<span className="text-muted-foreground ml-1">{plan.period}</span>
			</div>
			<ul className="space-y-3 mb-8">
				{plan.features.map((feature, i) => (
					<li key={i} className="flex items-center gap-3">
						<Check className="size-4 text-primary shrink-0" />
						<span className="text-sm">{feature}</span>
					</li>
				))}
			</ul>
			<Button
				asChild
				className="w-full gap-2 group/btn"
				variant={plan.popular ? 'default' : 'outline'}
				size="lg"
			>
				<Link href={plan.cta.href}>
					{plan.cta.label}
					<ChevronRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const title = 'Transparent Pricing';
	const subtitle = 'No hidden fees. Cancel anytime. All prices in USD.';
	const plans: PricingPlan[] = [
		{
			name: 'Basic',
			description: 'For individuals',
			price: '$9',
			period: '/month',
			features: ['5 projects', '5GB storage', 'Email support', 'Basic integrations'],
			cta: { label: 'Get Started', href: '#basic' },
			accent: 'bg-emerald-500',
		},
		{
			name: 'Plus',
			description: 'For professionals',
			price: '$25',
			period: '/month',
			features: ['20 projects', '50GB storage', 'Priority support', 'All integrations', 'Custom domains'],
			cta: { label: 'Start Trial', href: '#plus' },
			accent: 'bg-blue-500',
			popular: true,
		},
		{
			name: 'Pro',
			description: 'For growing teams',
			price: '$59',
			period: '/month',
			features: ['Unlimited projects', '200GB storage', 'Dedicated support', 'SSO', 'Advanced analytics', 'API access'],
			cta: { label: 'Start Trial', href: '#pro' },
			accent: 'bg-violet-500',
		},
		{
			name: 'Enterprise',
			description: 'For organizations',
			price: 'Custom',
			period: '',
			features: ['Unlimited everything', 'Custom storage', '24/7 support', 'Custom contracts', 'Dedicated CSM', 'SLA'],
			cta: { label: 'Contact Us', href: '#enterprise' },
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
