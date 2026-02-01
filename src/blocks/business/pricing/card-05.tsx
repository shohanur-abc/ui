import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Check, Crown, Star, Gem } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	price: string;
	period: string;
	description: string;
	features: string[];
	cta: { label: string; href: string };
	tier: 'silver' | 'gold' | 'platinum';
}

const tierConfig = {
	silver: {
		icon: Star,
		gradient: 'from-slate-400 to-slate-600',
		glow: 'shadow-slate-500/20',
		border: 'border-slate-400/30',
	},
	gold: {
		icon: Crown,
		gradient: 'from-amber-400 to-amber-600',
		glow: 'shadow-amber-500/30',
		border: 'border-amber-400/50',
	},
	platinum: {
		icon: Gem,
		gradient: 'from-violet-400 to-violet-600',
		glow: 'shadow-violet-500/30',
		border: 'border-violet-400/50',
	},
};

const Header = ({
	eyebrow,
	title,
	subtitle,
}: {
	eyebrow: string;
	title: string;
	subtitle: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4">
			<Gem className="size-4" />
			{eyebrow}
		</div>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{subtitle}
		</p>
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
	const config = tierConfig[plan.tier];
	const Icon = config.icon;

	return (
		<Card
			className={`relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 ${config.border} ${config.glow} shadow-xl`}
		>
			<div
				className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${config.gradient} opacity-10`}
			/>
			<CardHeader className="relative text-center pt-8">
				<div
					className={`mx-auto size-16 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-4 shadow-lg`}
				>
					<Icon className="size-8 text-white" />
				</div>
				<Badge variant="outline" className={config.border}>
					{plan.name}
				</Badge>
				<div className="mt-6">
					<span className="text-5xl @lg:text-6xl font-bold">{plan.price}</span>
					<span className="text-muted-foreground">{plan.period}</span>
				</div>
				<p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
			</CardHeader>
			<CardContent className="flex-1 relative">
				<ul className="space-y-4">
					{plan.features.map((feature, i) => (
						<li key={i} className="flex items-start gap-3">
							<div
								className={`size-5 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center shrink-0 mt-0.5`}
							>
								<Check className="size-3 text-white" />
							</div>
							<span className="text-sm">{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className="relative">
				<Button
					asChild
					className={`w-full bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white border-0`}
					size="lg"
				>
					<Link href={plan.cta.href}>{plan.cta.label}</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default function Main() {
	const eyebrow = 'Premium Tiers';
	const title = 'Unlock Premium Features';
	const subtitle = 'Choose your membership tier and unlock exclusive benefits';
	const plans: PricingPlan[] = [
		{
			name: 'Silver',
			price: '$29',
			period: '/month',
			description: 'Essential tools for getting started',
			features: [
				'Access to all basic features',
				'5 project workspaces',
				'Standard support',
				'1GB file storage',
				'Community access',
			],
			cta: { label: 'Choose Silver', href: '#silver' },
			tier: 'silver',
		},
		{
			name: 'Gold',
			price: '$59',
			period: '/month',
			description: 'Advanced features for professionals',
			features: [
				'Everything in Silver',
				'Unlimited workspaces',
				'Priority support',
				'25GB file storage',
				'Advanced analytics',
				'Custom branding',
			],
			cta: { label: 'Choose Gold', href: '#gold' },
			tier: 'gold',
		},
		{
			name: 'Platinum',
			price: '$99',
			period: '/month',
			description: 'Complete solution for enterprises',
			features: [
				'Everything in Gold',
				'Unlimited storage',
				'24/7 dedicated support',
				'Custom integrations',
				'White-label solution',
				'SLA guarantee',
			],
			cta: { label: 'Choose Platinum', href: '#platinum' },
			tier: 'platinum',
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header eyebrow={eyebrow} title={title} subtitle={subtitle} />
				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-8">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
