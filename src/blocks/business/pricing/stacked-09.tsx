import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Timer } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	subtitle: string;
	price: string;
	originalPrice?: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	discount?: string;
	limited?: boolean;
}

const Header = ({ title, subtitle, urgency }: { title: string; subtitle: string; urgency: string }) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="destructive" className="mb-4 gap-1 animate-pulse">
			<Timer className="size-3" />
			{urgency}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{subtitle}
		</p>
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
	<Card className="p-6 @lg:p-8 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
		{plan.discount && (
			<div className="absolute top-4 right-4">
				<Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
					{plan.discount}
				</Badge>
			</div>
		)}
		{plan.limited && (
			<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />
		)}
		
		<div className="flex flex-col @lg:flex-row @lg:items-center gap-6 @lg:gap-12">
			<div className="@lg:w-72 shrink-0">
				<h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
				<p className="text-sm text-muted-foreground">{plan.subtitle}</p>
				<div className="mt-4 flex items-baseline gap-2">
					<span className="text-4xl @lg:text-5xl font-bold">{plan.price}</span>
					{plan.originalPrice && (
						<span className="text-lg text-muted-foreground line-through">
							{plan.originalPrice}
						</span>
					)}
					<span className="text-muted-foreground">{plan.period}</span>
				</div>
			</div>

			<div className="flex-1">
				<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-3">
					{plan.features.map((feature, i) => (
						<div key={i} className="flex items-center gap-2">
							<div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
								<Check className="size-3 text-primary" />
							</div>
							<span className="text-sm">{feature}</span>
						</div>
					))}
				</div>
			</div>

			<Button
				asChild
				className="shrink-0 @lg:w-auto w-full"
				variant={plan.limited ? 'default' : 'outline'}
				size="lg"
			>
				<Link href={plan.cta.href}>{plan.cta.label}</Link>
			</Button>
		</div>
	</Card>
);

export default function Main() {
	const title = 'Black Friday Sale';
	const subtitle = 'Get up to 50% off on all annual plans. Limited time offer.';
	const urgency = 'Ends in 2 days';
	const plans: PricingPlan[] = [
		{
			name: 'Starter',
			subtitle: 'For individuals getting started',
			price: '$6',
			originalPrice: '$12',
			period: '/month',
			discount: 'Save 50%',
			features: ['5 projects', '5GB storage', 'Email support', 'Basic analytics'],
			cta: { label: 'Claim Offer', href: '#starter' },
		},
		{
			name: 'Professional',
			subtitle: 'Most popular for professionals',
			price: '$20',
			originalPrice: '$40',
			period: '/month',
			discount: 'Save 50%',
			limited: true,
			features: ['Unlimited projects', '100GB storage', 'Priority support', 'Advanced analytics', 'API access', 'Custom domain'],
			cta: { label: 'Claim Offer', href: '#professional' },
		},
		{
			name: 'Enterprise',
			subtitle: 'For large organizations',
			price: '$75',
			originalPrice: '$150',
			period: '/month',
			discount: 'Save 50%',
			features: ['Everything in Pro', 'Unlimited storage', '24/7 support', 'Custom contracts', 'SSO', 'Dedicated CSM'],
			cta: { label: 'Claim Offer', href: '#enterprise' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header title={title} subtitle={subtitle} urgency={urgency} />
				<div className="flex flex-col gap-4">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
