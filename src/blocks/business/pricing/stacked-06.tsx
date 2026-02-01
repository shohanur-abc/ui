import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	description: string;
	price: string;
	period: string;
	yearlyPrice?: string;
	features: string[];
	cta: { label: string; href: string };
	highlighted?: boolean;
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

const PricingRow = ({ plan }: { plan: PricingPlan }) => (
	<div
		className={`group relative p-6 @lg:p-8 rounded-2xl transition-all duration-300 ${
			plan.highlighted
				? 'bg-primary text-primary-foreground shadow-xl'
				: 'bg-card border hover:border-primary/50 hover:shadow-lg'
		}`}
	>
		<div className="absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-gradient-to-b from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
		
		<div className="flex flex-col @xl:flex-row @xl:items-center gap-6">
			<div className="@xl:w-64 shrink-0">
				<div className="flex items-center gap-3 mb-2">
					<h3 className="text-xl font-bold">{plan.name}</h3>
					{plan.highlighted && (
						<Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0">
							Recommended
						</Badge>
					)}
				</div>
				<p className={`text-sm ${plan.highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
					{plan.description}
				</p>
			</div>

			<div className="@xl:w-48 shrink-0">
				<div className="flex flex-col">
					<div className="flex items-baseline gap-1">
						<span className="text-4xl font-bold">{plan.price}</span>
						<span className={plan.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'}>
							{plan.period}
						</span>
					</div>
					{plan.yearlyPrice && (
						<span className={`text-sm mt-1 ${plan.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
							or {plan.yearlyPrice}/year
						</span>
					)}
				</div>
			</div>

			<div className="flex-1">
				<div className="flex flex-wrap gap-x-6 gap-y-2">
					{plan.features.map((feature, i) => (
						<div key={i} className="flex items-center gap-2">
							<Check
								className={`size-4 shrink-0 ${
									plan.highlighted ? 'text-primary-foreground' : 'text-primary'
								}`}
							/>
							<span className="text-sm">{feature}</span>
						</div>
					))}
				</div>
			</div>

			<Button
				asChild
				className="shrink-0 gap-2 group/btn @xl:w-auto w-full"
				variant={plan.highlighted ? 'secondary' : 'default'}
				size="lg"
			>
				<Link href={plan.cta.href}>
					{plan.cta.label}
					<ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
				</Link>
			</Button>
		</div>
	</div>
);

export default function Main() {
	const title = 'Transparent Pricing';
	const subtitle = 'No hidden fees, no surprises. Pick the plan that works for you.';
	const plans: PricingPlan[] = [
		{
			name: 'Personal',
			description: 'For individuals and freelancers',
			price: '$0',
			period: '/mo',
			features: ['3 projects', '1GB storage', 'Community support'],
			cta: { label: 'Get Started', href: '#personal' },
		},
		{
			name: 'Pro',
			description: 'For professional creators',
			price: '$19',
			period: '/mo',
			yearlyPrice: '$190',
			features: ['Unlimited projects', '50GB storage', 'Priority support', 'Analytics'],
			cta: { label: 'Start Trial', href: '#pro' },
			highlighted: true,
		},
		{
			name: 'Team',
			description: 'For collaborative teams',
			price: '$49',
			period: '/mo',
			yearlyPrice: '$490',
			features: ['Everything in Pro', 'Team features', 'Admin controls', 'SSO'],
			cta: { label: 'Start Trial', href: '#team' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header title={title} subtitle={subtitle} />
				<div className="flex flex-col gap-4">
					{plans.map((plan, i) => (
						<PricingRow key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
