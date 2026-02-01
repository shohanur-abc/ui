import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	description: string;
	price: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	highlighted?: boolean;
	icon: React.ComponentType<{ className?: string }>;
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
		<Icon className="size-4" />
		<span>{text}</span>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h2>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
		{text}
	</p>
);

const GlowDecorative = () => (
	<div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
		<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-24 bg-gradient-to-b from-primary/20 to-transparent blur-2xl" />
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
	const Icon = plan.icon;
	return (
		<Card
			className={`relative flex flex-col transition-all duration-300 hover:shadow-xl ${
				plan.highlighted
					? 'border-primary bg-gradient-to-b from-primary/5 to-transparent scale-[1.02] shadow-xl'
					: 'hover:border-primary/50 hover:-translate-y-1'
			}`}
		>
			{plan.highlighted && <GlowDecorative />}
			<CardHeader className="pb-4">
				<div className="flex items-center justify-between">
					<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
						<Icon className="size-5 text-primary" />
					</div>
					{plan.highlighted && (
						<Badge className="bg-primary/10 text-primary border-primary/20">
							Recommended
						</Badge>
					)}
				</div>
				<h3 className="text-xl font-semibold mt-4">{plan.name}</h3>
				<p className="text-sm text-muted-foreground">{plan.description}</p>
			</CardHeader>
			<CardContent className="flex-1">
				<div className="mb-6">
					<span className="text-4xl @md:text-5xl font-bold">{plan.price}</span>
					<span className="text-muted-foreground ml-2">{plan.period}</span>
				</div>
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
					variant={plan.highlighted ? 'default' : 'outline'}
					size="lg"
				>
					<Link href={plan.cta.href}>{plan.cta.label}</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default function Main() {
	const plans: PricingPlan[] = [
		{
			name: 'Basic',
			description: 'Essential features for starters',
			price: '$12',
			period: '/month',
			features: [
				'3 team members',
				'5GB cloud storage',
				'Basic integrations',
				'Email support',
			],
			cta: { label: 'Start Free Trial', href: '#basic' },
			icon: Sparkles,
		},
		{
			name: 'Growth',
			description: 'Everything you need to scale',
			price: '$39',
			period: '/month',
			features: [
				'Unlimited team members',
				'50GB cloud storage',
				'Advanced integrations',
				'Priority support',
				'Analytics dashboard',
				'Custom workflows',
			],
			cta: { label: 'Start Free Trial', href: '#growth' },
			highlighted: true,
			icon: Sparkles,
		},
		{
			name: 'Scale',
			description: 'For enterprise-grade needs',
			price: '$79',
			period: '/month',
			features: [
				'Everything in Growth',
				'Unlimited storage',
				'SSO authentication',
				'Dedicated support',
				'Custom contracts',
				'SLA guarantee',
			],
			cta: { label: 'Contact Us', href: '#scale' },
			icon: Sparkles,
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-12 @lg:mb-16">
					<Eyebrow icon={Sparkles} text="Flexible Plans" />
					<Title text="Find Your Perfect" highlight="Plan" />
					<Subtitle text="Start free, upgrade when ready. All plans include a 14-day trial." />
				</div>
				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 @lg:gap-8 items-start">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
