import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<CenteredPricing
					eyebrow="Pricing"
					title="Simple, Transparent Pricing"
					description="No hidden fees. No surprises. Choose the engagement model that works for you."
					plans={[
						{
							name: 'Project-Based',
							description: 'For well-defined projects with clear scope',
							price: 'From $15K',
							period: 'per project',
							features: [
								'Fixed timeline and budget',
								'Milestone-based delivery',
								'Dedicated project manager',
								'Source code ownership',
								'30-day warranty period',
							],
							cta: { label: 'Get a Quote', href: '/contact?type=project' },
						},
						{
							name: 'Dedicated Team',
							description: 'For ongoing development and scaling',
							price: 'From $12K',
							period: 'per month',
							features: [
								'Full-time dedicated developers',
								'Flexible team composition',
								'Weekly progress reports',
								'Direct communication',
								'No long-term commitment',
								'Scale up or down anytime',
							],
							cta: { label: 'Build Your Team', href: '/contact?type=team' },
							highlighted: true,
						},
						{
							name: 'Staff Augmentation',
							description: 'Extend your existing team with our experts',
							price: 'From $8K',
							period: 'per month',
							features: [
								'Vetted senior developers',
								'Seamless integration',
								'Your processes, our talent',
								'Flexible hours',
								'Quick onboarding',
							],
							cta: { label: 'Hire Talent', href: '/contact?type=staff' },
						},
					]}
				/>
			</div>
		</section>
	);
}

interface Plan {
	name: string;
	description: string;
	price: string;
	period: string;
	features: string[];
	cta: { label: string; href: string };
	highlighted?: boolean;
}

const CenteredPricing = ({
	eyebrow,
	title,
	description,
	plans,
}: {
	eyebrow: string;
	title: string;
	description: string;
	plans: Plan[];
}) => (
	<div className="text-center">
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
			{title}
		</h2>
		<p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 @md:mb-14">
			{description}
		</p>

		{/* Plans */}
		<div className="grid @md:grid-cols-3 gap-6 @xl:gap-8 max-w-5xl mx-auto">
			{plans.map((plan, i) => (
				<div
					key={i}
					className={`relative p-6 @xl:p-8 rounded-2xl border text-left ${
						plan.highlighted
							? 'border-primary bg-primary/5 shadow-lg ring-1 ring-primary'
							: 'bg-card'
					}`}
				>
					{plan.highlighted && (
						<Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
							<Sparkles className="size-3 mr-1" />
							Most Popular
						</Badge>
					)}

					<h3 className="text-xl font-bold mb-1">{plan.name}</h3>
					<p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

					<div className="mb-6">
						<span className="text-3xl @xl:text-4xl font-bold">{plan.price}</span>
						<span className="text-muted-foreground"> {plan.period}</span>
					</div>

					<ul className="space-y-3 mb-6">
						{plan.features.map((feature, j) => (
							<li key={j} className="flex items-start gap-2 text-sm">
								<Check className="size-4 text-primary shrink-0 mt-0.5" />
								{feature}
							</li>
						))}
					</ul>

					<Button
						className="w-full"
						variant={plan.highlighted ? 'default' : 'outline'}
						asChild
					>
						<Link href={plan.cta.href}>
							{plan.cta.label}
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
			))}
		</div>

		{/* Note */}
		<p className="text-sm text-muted-foreground mt-8 max-w-xl mx-auto">
			All prices are estimates. Final pricing depends on project complexity and requirements.
			Contact us for a detailed proposal.
		</p>
	</div>
);
