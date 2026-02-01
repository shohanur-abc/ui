import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	description: string;
	price: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	highlight?: boolean;
	badge?: string;
}

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between gap-6 mb-12 @lg:mb-16">
		<div>
			<div className="inline-flex items-center gap-2 text-sm text-primary mb-3">
				<CreditCard className="size-4" />
				<span className="font-medium">Pricing</span>
			</div>
			<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-3">
				{title}
			</h2>
			<p className="text-muted-foreground text-base @md:text-lg max-w-xl">
				{subtitle}
			</p>
		</div>
		<div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border self-start">
			<Check className="size-4 text-primary" />
			<span className="text-sm">All plans include 14-day free trial</span>
		</div>
	</div>
);

const PricingRow = ({ plan, index }: { plan: PricingPlan; index: number }) => (
	<div
		className={`relative flex flex-col @lg:flex-row @lg:items-center gap-6 p-6 @lg:p-8 rounded-xl transition-all duration-300 group ${
			plan.highlight
				? 'bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-2 border-primary shadow-lg'
				: 'bg-card border hover:border-primary/50 hover:shadow-md'
		}`}
	>
		<div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-r bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
		
		<div className="flex items-center gap-4 @lg:w-16 shrink-0">
			<span className="text-3xl font-bold text-muted-foreground/30">
				{String(index + 1).padStart(2, '0')}
			</span>
		</div>

		<div className="flex-1 @lg:flex @lg:items-center @lg:gap-8">
			<div className="@lg:w-56 shrink-0 mb-4 @lg:mb-0">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-xl font-bold">{plan.name}</h3>
					{plan.badge && (
						<Badge variant={plan.highlight ? 'default' : 'secondary'}>
							{plan.badge}
						</Badge>
					)}
				</div>
				<p className="text-sm text-muted-foreground">{plan.description}</p>
			</div>

			<div className="@lg:w-36 shrink-0 mb-4 @lg:mb-0">
				<span className="text-3xl font-bold">{plan.price}</span>
				<span className="text-muted-foreground ml-1">{plan.period}</span>
			</div>

			<ul className="flex-1 flex flex-wrap gap-x-4 gap-y-2">
				{plan.features.map((feature, i) => (
					<li key={i} className="flex items-center gap-2 text-sm">
						<Check className="size-3.5 text-primary shrink-0" />
						{feature}
					</li>
				))}
			</ul>
		</div>

		<Button
			asChild
			className="shrink-0 gap-2 group/btn"
			variant={plan.highlight ? 'default' : 'outline'}
		>
			<Link href={plan.cta.href}>
				{plan.cta.label}
				<ChevronRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	const title = 'Fair, Simple Pricing';
	const subtitle = 'No surprises, no hidden fees. Pick a plan and start building today.';
	const plans: PricingPlan[] = [
		{
			name: 'Hobby',
			description: 'For side projects',
			price: '$0',
			period: '/forever',
			features: ['2 projects', '1GB storage', 'Community forum'],
			cta: { label: 'Start Free', href: '#hobby' },
		},
		{
			name: 'Pro',
			description: 'For professionals',
			price: '$24',
			period: '/mo',
			features: ['Unlimited projects', '50GB storage', 'Priority support', 'Analytics'],
			cta: { label: 'Go Pro', href: '#pro' },
			highlight: true,
			badge: 'Popular',
		},
		{
			name: 'Team',
			description: 'For small teams',
			price: '$59',
			period: '/mo',
			features: ['Everything in Pro', '10 members', 'Team features', 'Admin panel'],
			cta: { label: 'Start Trial', href: '#team' },
		},
		{
			name: 'Enterprise',
			description: 'For organizations',
			price: 'Custom',
			period: '',
			features: ['Unlimited seats', 'Custom SLA', 'Dedicated support', 'On-premise'],
			cta: { label: 'Contact Us', href: '#enterprise' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header title={title} subtitle={subtitle} />
				<div className="flex flex-col gap-4">
					{plans.map((plan, i) => (
						<PricingRow key={i} plan={plan} index={i} />
					))}
				</div>
			</div>
		</section>
	);
}
