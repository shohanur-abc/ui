import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight, Layers } from 'lucide-react';
import Link from 'next/link';

interface Feature {
	name: string;
	included: boolean;
}

interface PricingPlan {
	name: string;
	price: string;
	period: string;
	description: string;
	features: Feature[];
	cta: { label: string; href: string };
	featured?: boolean;
	gradient: string;
}

const Header = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-1">
			<Layers className="size-3" />
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title}
		</h2>
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
	<div className={`relative p-6 @lg:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${plan.featured ? 'shadow-2xl' : 'bg-card border hover:shadow-lg'}`}>
		{plan.featured && (
			<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${plan.gradient} opacity-10`} />
		)}
		<div className="relative">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-xl font-bold">{plan.name}</h3>
				{plan.featured && <Badge>Popular</Badge>}
			</div>
			<p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
			
			<div className="mb-8">
				<span className="text-5xl font-bold">{plan.price}</span>
				<span className="text-muted-foreground ml-1">{plan.period}</span>
			</div>

			<Button
				asChild
				className="w-full gap-2 group mb-8"
				variant={plan.featured ? 'default' : 'outline'}
				size="lg"
			>
				<Link href={plan.cta.href}>
					{plan.cta.label}
					<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
				</Link>
			</Button>

			<ul className="space-y-4">
				{plan.features.map((feature, i) => (
					<li key={i} className="flex items-center gap-3">
						{feature.included ? (
							<div className="size-5 rounded-full bg-primary/10 flex items-center justify-center">
								<Check className="size-3 text-primary" />
							</div>
						) : (
							<div className="size-5 rounded-full bg-muted flex items-center justify-center">
								<X className="size-3 text-muted-foreground" />
							</div>
						)}
						<span className={`text-sm ${!feature.included && 'text-muted-foreground'}`}>
							{feature.name}
						</span>
					</li>
				))}
			</ul>
		</div>
	</div>
);

export default function Main() {
	const eyebrow = 'Pricing Options';
	const title = 'Pick What Works for You';
	const plans: PricingPlan[] = [
		{
			name: 'Starter',
			price: '$12',
			period: '/mo',
			description: 'Great for getting started',
			features: [
				{ name: '5 projects', included: true },
				{ name: '5GB storage', included: true },
				{ name: 'Email support', included: true },
				{ name: 'Analytics', included: false },
				{ name: 'Custom domain', included: false },
				{ name: 'API access', included: false },
			],
			cta: { label: 'Get Started', href: '#starter' },
			gradient: 'from-blue-500 to-cyan-500',
		},
		{
			name: 'Growth',
			price: '$29',
			period: '/mo',
			description: 'Perfect for scaling',
			features: [
				{ name: 'Unlimited projects', included: true },
				{ name: '50GB storage', included: true },
				{ name: 'Priority support', included: true },
				{ name: 'Advanced analytics', included: true },
				{ name: 'Custom domain', included: true },
				{ name: 'API access', included: false },
			],
			cta: { label: 'Start Trial', href: '#growth' },
			featured: true,
			gradient: 'from-violet-500 to-purple-500',
		},
		{
			name: 'Scale',
			price: '$59',
			period: '/mo',
			description: 'For ambitious teams',
			features: [
				{ name: 'Unlimited projects', included: true },
				{ name: 'Unlimited storage', included: true },
				{ name: '24/7 support', included: true },
				{ name: 'Custom analytics', included: true },
				{ name: 'Custom domain', included: true },
				{ name: 'Full API access', included: true },
			],
			cta: { label: 'Start Trial', href: '#scale' },
			gradient: 'from-amber-500 to-orange-500',
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header eyebrow={eyebrow} title={title} />
				<div className="grid @md:grid-cols-3 gap-8">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
