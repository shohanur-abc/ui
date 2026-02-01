import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Minus } from 'lucide-react';
import Link from 'next/link';

interface Feature {
	name: string;
	starter: boolean | string;
	pro: boolean | string;
	enterprise: boolean | string;
}

interface PricingHeader {
	name: string;
	price: string;
	period: string;
	description: string;
	cta: { label: string; href: string };
	popular?: boolean;
}

const FeatureCell = ({ value }: { value: boolean | string }) => {
	if (typeof value === 'string') {
		return <span className="text-sm font-medium">{value}</span>;
	}
	return value ? (
		<Check className="size-5 text-primary mx-auto" />
	) : (
		<Minus className="size-5 text-muted-foreground mx-auto" />
	);
};

const PlanHeader = ({ plan }: { plan: PricingHeader }) => (
	<div className={`p-6 text-center ${plan.popular ? 'bg-primary/5 rounded-t-xl' : ''}`}>
		{plan.popular && <Badge className="mb-3">Most Popular</Badge>}
		<h3 className="text-xl font-bold mb-1">{plan.name}</h3>
		<p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
		<div className="mb-4">
			<span className="text-4xl font-bold">{plan.price}</span>
			<span className="text-muted-foreground">{plan.period}</span>
		</div>
		<Button
			asChild
			className="w-full"
			variant={plan.popular ? 'default' : 'outline'}
		>
			<Link href={plan.cta.href}>{plan.cta.label}</Link>
		</Button>
	</div>
);

export default function Main() {
	const title = 'Compare Plans';
	const subtitle = 'Find the perfect plan for your needs';
	const headers: PricingHeader[] = [
		{
			name: 'Starter',
			price: '$15',
			period: '/mo',
			description: 'For individuals',
			cta: { label: 'Get Started', href: '#starter' },
		},
		{
			name: 'Pro',
			price: '$45',
			period: '/mo',
			description: 'For teams',
			cta: { label: 'Start Trial', href: '#pro' },
			popular: true,
		},
		{
			name: 'Enterprise',
			price: '$99',
			period: '/mo',
			description: 'For organizations',
			cta: { label: 'Contact Sales', href: '#enterprise' },
		},
	];
	const features: Feature[] = [
		{ name: 'Projects', starter: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
		{ name: 'Storage', starter: '2GB', pro: '50GB', enterprise: 'Unlimited' },
		{ name: 'Team members', starter: '1', pro: '10', enterprise: 'Unlimited' },
		{ name: 'API access', starter: false, pro: true, enterprise: true },
		{ name: 'Priority support', starter: false, pro: true, enterprise: true },
		{ name: 'Custom integrations', starter: false, pro: false, enterprise: true },
		{ name: 'SSO', starter: false, pro: false, enterprise: true },
		{ name: 'Dedicated CSM', starter: false, pro: false, enterprise: true },
	];

	return (
		<section className="@container" data-theme="pricing">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-12 @lg:mb-16">
					<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
						{title}
					</h2>
					<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
						{subtitle}
					</p>
				</div>

				<div className="overflow-x-auto">
					<div className="min-w-[640px]">
						<div className="grid grid-cols-4 gap-4 border rounded-xl overflow-hidden bg-card">
							<div className="p-6 bg-muted/50 flex items-end">
								<span className="text-sm font-medium text-muted-foreground">Features</span>
							</div>
							{headers.map((plan, i) => (
								<PlanHeader key={i} plan={plan} />
							))}

							{features.map((feature, i) => (
								<>
									<div
										key={`name-${i}`}
										className={`p-4 flex items-center ${i % 2 === 0 ? 'bg-muted/30' : ''}`}
									>
										<span className="text-sm font-medium">{feature.name}</span>
									</div>
									<div
										key={`starter-${i}`}
										className={`p-4 flex items-center justify-center ${i % 2 === 0 ? 'bg-muted/30' : ''}`}
									>
										<FeatureCell value={feature.starter} />
									</div>
									<div
										key={`pro-${i}`}
										className={`p-4 flex items-center justify-center ${i % 2 === 0 ? 'bg-muted/30' : ''} ${headers[1].popular ? 'bg-primary/5' : ''}`}
									>
										<FeatureCell value={feature.pro} />
									</div>
									<div
										key={`enterprise-${i}`}
										className={`p-4 flex items-center justify-center ${i % 2 === 0 ? 'bg-muted/30' : ''}`}
									>
										<FeatureCell value={feature.enterprise} />
									</div>
								</>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
