import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Check, Minus, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Feature {
	text: string;
	included: boolean;
	highlight?: boolean;
}

interface PricingPlan {
	name: string;
	price: string;
	period: string;
	description: string;
	features: Feature[];
	cta: { label: string; href: string };
	highlighted?: boolean;
}

const Header = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
	<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @lg:mb-16">
		<div>
			<Badge variant="outline" className="mb-4 gap-1">
				<TrendingUp className="size-3" />
				{eyebrow}
			</Badge>
			<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
				{title}
			</h2>
			<p className="text-muted-foreground text-base @md:text-lg max-w-xl">
				{subtitle}
			</p>
		</div>
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
	<Card className={`flex flex-col transition-all duration-300 hover:shadow-lg ${plan.highlighted ? 'border-primary shadow-xl relative overflow-hidden' : ''}`}>
		{plan.highlighted && (
			<>
				<div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
				<Badge className="absolute top-4 right-4">Best Value</Badge>
			</>
		)}
		<CardHeader className="pt-8">
			<h3 className="text-xl font-bold">{plan.name}</h3>
			<p className="text-sm text-muted-foreground">{plan.description}</p>
			<div className="mt-4">
				<span className="text-4xl font-bold">{plan.price}</span>
				<span className="text-muted-foreground">{plan.period}</span>
			</div>
		</CardHeader>
		<CardContent className="flex-1">
			<ul className="space-y-3">
				{plan.features.map((feature, i) => (
					<li key={i} className="flex items-start gap-3">
						{feature.included ? (
							<Check className={`size-4 shrink-0 mt-0.5 ${feature.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
						) : (
							<Minus className="size-4 text-muted-foreground/50 shrink-0 mt-0.5" />
						)}
						<span className={`text-sm ${!feature.included && 'text-muted-foreground/50'} ${feature.highlight && 'font-medium'}`}>
							{feature.text}
						</span>
					</li>
				))}
			</ul>
		</CardContent>
		<CardFooter>
			<Button
				asChild
				className="w-full"
				variant={plan.highlighted ? 'default' : 'outline'}
				size="lg"
			>
				<Link href={plan.cta.href}>{plan.cta.label}</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const eyebrow = 'Pricing';
	const title = 'Start Growing Today';
	const subtitle = 'Pick a plan and start building. Upgrade or downgrade anytime.';
	const plans: PricingPlan[] = [
		{
			name: 'Free',
			price: '$0',
			period: '/forever',
			description: 'Try it out',
			features: [
				{ text: '2 projects', included: true },
				{ text: '500MB storage', included: true },
				{ text: 'Community support', included: true },
				{ text: 'Basic templates', included: true },
				{ text: 'Analytics', included: false },
				{ text: 'Custom domains', included: false },
				{ text: 'Team features', included: false },
			],
			cta: { label: 'Get Started Free', href: '#free' },
		},
		{
			name: 'Starter',
			price: '$15',
			period: '/month',
			description: 'For individuals',
			features: [
				{ text: '10 projects', included: true },
				{ text: '10GB storage', included: true },
				{ text: 'Email support', included: true },
				{ text: 'All templates', included: true },
				{ text: 'Basic analytics', included: true, highlight: true },
				{ text: 'Custom domains', included: false },
				{ text: 'Team features', included: false },
			],
			cta: { label: 'Start Trial', href: '#starter' },
		},
		{
			name: 'Growth',
			price: '$39',
			period: '/month',
			description: 'For professionals',
			features: [
				{ text: 'Unlimited projects', included: true, highlight: true },
				{ text: '100GB storage', included: true },
				{ text: 'Priority support', included: true },
				{ text: 'All templates', included: true },
				{ text: 'Advanced analytics', included: true, highlight: true },
				{ text: 'Custom domains', included: true, highlight: true },
				{ text: 'Team features', included: false },
			],
			cta: { label: 'Start Trial', href: '#growth' },
			highlighted: true,
		},
		{
			name: 'Scale',
			price: '$79',
			period: '/month',
			description: 'For teams',
			features: [
				{ text: 'Unlimited projects', included: true },
				{ text: 'Unlimited storage', included: true, highlight: true },
				{ text: 'Dedicated support', included: true },
				{ text: 'All templates', included: true },
				{ text: 'Custom analytics', included: true },
				{ text: 'Custom domains', included: true },
				{ text: 'Full team features', included: true, highlight: true },
			],
			cta: { label: 'Start Trial', href: '#scale' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header eyebrow={eyebrow} title={title} subtitle={subtitle} />
				<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
