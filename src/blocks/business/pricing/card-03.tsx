import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Check, Zap, Building2, Rocket } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	tagline: string;
	price: string;
	period: string;
	features: string[];
	cta: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'secondary';
	};
	badge?: string;
	icon: React.ComponentType<{ className?: string }>;
	gradient: string;
}

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
		<Badge variant="outline" className="mb-4 border-primary/30 text-primary">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{subtitle}
		</p>
	</div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
	const Icon = plan.icon;
	return (
		<Card className="relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
			<div className={`absolute inset-x-0 top-0 h-1 ${plan.gradient}`} />
			<CardHeader className="pb-4">
				<div className="flex items-center justify-between mb-2">
					<div
						className={`size-12 rounded-xl ${plan.gradient} flex items-center justify-center shadow-lg`}
					>
						<Icon className="size-6 text-white" />
					</div>
					{plan.badge && (
						<Badge variant="secondary" className="text-xs">
							{plan.badge}
						</Badge>
					)}
				</div>
				<h3 className="text-2xl font-bold">{plan.name}</h3>
				<p className="text-sm text-muted-foreground">{plan.tagline}</p>
			</CardHeader>
			<CardContent className="flex-1">
				<div className="mb-8 pb-6 border-b border-border">
					<div className="flex items-baseline gap-1">
						<span className="text-5xl font-bold tracking-tight">
							{plan.price}
						</span>
						<span className="text-muted-foreground text-lg">{plan.period}</span>
					</div>
				</div>
				<ul className="space-y-4">
					{plan.features.map((feature, i) => (
						<li key={i} className="flex items-start gap-3 group/item">
							<div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary/20 transition-colors">
								<Check className="size-3 text-primary" />
							</div>
							<span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
								{feature}
							</span>
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className="pt-4">
				<Button
					asChild
					className="w-full transition-transform group-hover:scale-[1.02]"
					variant={plan.cta.variant || 'default'}
					size="lg"
				>
					<Link href={plan.cta.href}>{plan.cta.label}</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default function Main() {
	const eyebrow = '💰 Pricing Plans';
	const title = 'Invest in Your Success';
	const subtitle =
		'Flexible pricing that grows with your business. No contracts, no surprises.';
	const plans: PricingPlan[] = [
		{
			name: 'Starter',
			tagline: 'For individuals & small projects',
			price: '$19',
			period: '/mo',
			features: [
				'Up to 10 projects',
				'5GB secure storage',
				'Basic reporting',
				'Community support',
				'Mobile app access',
			],
			cta: { label: 'Get Started', href: '#starter', variant: 'outline' },
			icon: Zap,
			gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
		},
		{
			name: 'Business',
			tagline: 'For teams & growing companies',
			price: '$49',
			period: '/mo',
			features: [
				'Unlimited projects',
				'50GB secure storage',
				'Advanced analytics',
				'Priority email support',
				'Team collaboration',
				'API access',
			],
			cta: { label: 'Start Free Trial', href: '#business' },
			badge: 'Most Popular',
			icon: Rocket,
			gradient: 'bg-gradient-to-r from-violet-500 to-purple-500',
		},
		{
			name: 'Enterprise',
			tagline: 'For large-scale operations',
			price: '$149',
			period: '/mo',
			features: [
				'Everything in Business',
				'Unlimited storage',
				'Custom integrations',
				'24/7 phone support',
				'Dedicated CSM',
				'On-premise option',
			],
			cta: { label: 'Contact Sales', href: '#enterprise', variant: 'outline' },
			icon: Building2,
			gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header eyebrow={eyebrow} title={title} subtitle={subtitle} />
				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 @lg:gap-8">
					{plans.map((plan, i) => (
						<PricingCard key={i} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
