import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
	name: string;
	tagline: string;
	price: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	featured?: boolean;
}

const Header = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4">
			<Star className="size-3 mr-1" />
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title}
		</h2>
	</div>
);

const PricingRow = ({ plan, isLast }: { plan: PricingPlan; isLast: boolean }) => (
	<>
		<div
			className={`py-8 @lg:py-10 ${
				plan.featured ? 'bg-primary/5 -mx-4 @sm:-mx-6 @2xl:-mx-8 px-4 @sm:px-6 @2xl:px-8 rounded-xl' : ''
			}`}
		>
			<div className="grid @lg:grid-cols-12 gap-6 @lg:gap-8 items-center">
				<div className="@lg:col-span-3">
					<div className="flex items-center gap-3">
						<h3 className="text-2xl font-bold">{plan.name}</h3>
						{plan.featured && <Badge>Best Value</Badge>}
					</div>
					<p className="text-sm text-muted-foreground mt-1">{plan.tagline}</p>
				</div>
				<div className="@lg:col-span-2">
					<div className="flex items-baseline">
						<span className="text-4xl font-bold">{plan.price}</span>
						<span className="text-muted-foreground ml-1">{plan.period}</span>
					</div>
				</div>
				<div className="@lg:col-span-5">
					<div className="flex flex-wrap gap-4">
						{plan.features.map((feature, i) => (
							<div key={i} className="flex items-center gap-2">
								<div className="size-5 rounded-full bg-primary/10 flex items-center justify-center">
									<Check className="size-3 text-primary" />
								</div>
								<span className="text-sm">{feature}</span>
							</div>
						))}
					</div>
				</div>
				<div className="@lg:col-span-2 @lg:text-right">
					<Button
						asChild
						variant={plan.featured ? 'default' : 'outline'}
						className="w-full @lg:w-auto"
					>
						<Link href={plan.cta.href}>{plan.cta.label}</Link>
					</Button>
				</div>
			</div>
		</div>
		{!isLast && <Separator />}
	</>
);

export default function Main() {
	const eyebrow = 'Flexible Plans';
	const title = 'Pricing That Grows With You';
	const plans: PricingPlan[] = [
		{
			name: 'Basic',
			tagline: 'For getting started',
			price: '$12',
			period: '/mo',
			features: ['3 projects', '1GB storage', 'Basic support'],
			cta: { label: 'Start Free', href: '#basic' },
		},
		{
			name: 'Growth',
			tagline: 'For scaling up',
			price: '$39',
			period: '/mo',
			features: ['Unlimited projects', '25GB storage', 'Priority support', 'Analytics'],
			cta: { label: 'Get Started', href: '#growth' },
			featured: true,
		},
		{
			name: 'Scale',
			tagline: 'For large teams',
			price: '$99',
			period: '/mo',
			features: ['Everything in Growth', 'Team features', 'Advanced security', 'API access'],
			cta: { label: 'Get Started', href: '#scale' },
		},
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header eyebrow={eyebrow} title={title} />
				<div className="divide-y divide-border">
					{plans.map((plan, i) => (
						<PricingRow key={i} plan={plan} isLast={i === plans.length - 1} />
					))}
				</div>
			</div>
		</section>
	);
}
