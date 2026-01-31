import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import { ArrowRight, Check, Sparkles, Building2, Rocket } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-screen" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-10 @md:mb-14">
					<Eyebrow icon={Sparkles} text="Pricing" />
					<Title text="Simple, Transparent Pricing" />
					<Description text="No hidden fees, no surprises. Choose the plan that fits your business. All plans include a 14-day free trial." />
				</div>
				<PricingGrid
					items={[
						{
							name: 'Starter',
							icon: Rocket,
							price: '$29',
							period: '/month',
							description: 'Perfect for small teams getting started',
							features: [
								'Up to 5 users',
								'10GB storage',
								'Basic analytics',
								'Email support',
								'API access',
							],
							cta: 'Start Free Trial',
							popular: false,
						},
						{
							name: 'Professional',
							icon: Sparkles,
							price: '$99',
							period: '/month',
							description: 'For growing teams that need more power',
							features: [
								'Up to 25 users',
								'100GB storage',
								'Advanced analytics',
								'Priority support',
								'Custom integrations',
								'SSO authentication',
							],
							cta: 'Start Free Trial',
							popular: true,
						},
						{
							name: 'Enterprise',
							icon: Building2,
							price: 'Custom',
							period: '',
							description: 'For large organizations with specific needs',
							features: [
								'Unlimited users',
								'Unlimited storage',
								'White-label option',
								'Dedicated support',
								'Custom development',
								'SLA guarantee',
							],
							cta: 'Contact Sales',
							popular: false,
						},
					]}
				/>
				<TrustBar text="Trusted by 10,000+ businesses worldwide. 30-day money-back guarantee." />
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge className="mb-4 @md:mb-6 gap-2 mx-auto">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
		{text}
	</p>
);

const PricingGrid = ({
	items,
}: {
	items: {
		name: string;
		icon: ComponentType<{ className?: string }>;
		price: string;
		period: string;
		description: string;
		features: string[];
		cta: string;
		popular: boolean;
	}[];
}) => (
	<div className="grid @md:grid-cols-3 gap-6 @xl:gap-8">
		{items.map(
			(
				{
					name,
					icon: Icon,
					price,
					period,
					description,
					features,
					cta,
					popular,
				},
				i,
			) => (
				<Card
					key={i}
					className={`relative ${popular ? 'border-primary shadow-lg shadow-primary/10' : ''}`}
				>
					{popular && (
						<div className="absolute -top-3 left-1/2 -translate-x-1/2">
							<Badge className="shadow-lg">Most Popular</Badge>
						</div>
					)}
					<CardHeader>
						<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
							<Icon className="size-5 text-primary" />
						</div>
						<CardTitle className="text-xl">{name}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="mb-6">
							<span className="text-4xl font-bold">{price}</span>
							<span className="text-muted-foreground">{period}</span>
						</div>
						<ul className="space-y-3">
							{features.map((feature, j) => (
								<li key={j} className="flex items-center gap-2 text-sm">
									<Check className="size-4 text-primary shrink-0" />
									{feature}
								</li>
							))}
						</ul>
					</CardContent>
					<CardFooter>
						<Button
							className="w-full gap-2"
							variant={popular ? 'default' : 'outline'}
							asChild
						>
							<Link href="#start">
								{cta}
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</CardFooter>
				</Card>
			),
		)}
	</div>
);

const TrustBar = ({ text }: { text: string }) => (
	<p className="text-center text-sm text-muted-foreground mt-10">{text}</p>
);
