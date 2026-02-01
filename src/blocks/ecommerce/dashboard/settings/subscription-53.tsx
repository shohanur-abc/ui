import {
	AlertCircle,
	ArrowRight,
	Check,
	Clock,
	Crown,
	Gift,
	MoreVertical,
	Sparkles,
	Star,
	X,
	Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type SubscriptionPlan = {
	id: string;
	name: string;
	price: string;
	period: string;
	features: string[];
	isCurrentPlan: boolean;
	isPopular?: boolean;
};

type Benefit = {
	name: string;
	included: boolean;
};

const PlanCard = ({
	name,
	price,
	period,
	features,
	isCurrentPlan,
	isPopular,
}: SubscriptionPlan) => (
	<div
		className={`relative rounded-lg border p-5 transition-all ${
			isCurrentPlan
				? 'border-primary bg-primary/5 ring-2 ring-primary/20'
				: 'hover:border-primary/50'
		}`}
	>
		{isPopular && (
			<Badge className="absolute -top-3 right-4 bg-primary">
				<Sparkles className="mr-1 size-3" />
				Popular
			</Badge>
		)}
		<div className="flex items-start justify-between">
			<div>
				<h3 className="text-lg font-semibold">{name}</h3>
				<div className="flex items-baseline gap-1">
					<span className="text-3xl font-bold">{price}</span>
					<span className="text-muted-foreground">/{period}</span>
				</div>
			</div>
			{isCurrentPlan && (
				<Badge className="bg-emerald-500/10 text-emerald-500 border-0">
					<Check className="mr-1 size-3" />
					Current
				</Badge>
			)}
		</div>
		<ul className="mt-4 space-y-2">
			{features.map((feature) => (
				<li key={feature} className="flex items-center gap-2 text-sm">
					<Check className="size-4 text-primary" />
					{feature}
				</li>
			))}
		</ul>
		<Button
			className="mt-4 w-full"
			variant={isCurrentPlan ? 'outline' : 'default'}
			disabled={isCurrentPlan}
		>
			{isCurrentPlan ? 'Current Plan' : 'Upgrade'}
		</Button>
	</div>
);

const BenefitRow = ({ name, included }: Benefit) => (
	<div className="flex items-center justify-between py-2">
		<span className="text-sm">{name}</span>
		{included ? (
			<Check className="size-4 text-emerald-500" />
		) : (
			<X className="size-4 text-muted-foreground" />
		)}
	</div>
);

export default function Main() {
	const plans: SubscriptionPlan[] = [
		{
			id: 'free',
			name: 'Free',
			price: '$0',
			period: 'month',
			features: ['5 products', 'Basic analytics', 'Email support'],
			isCurrentPlan: false,
		},
		{
			id: 'pro',
			name: 'Pro',
			price: '$29',
			period: 'month',
			features: [
				'Unlimited products',
				'Advanced analytics',
				'Priority support',
				'Custom domain',
			],
			isCurrentPlan: true,
			isPopular: true,
		},
		{
			id: 'enterprise',
			name: 'Enterprise',
			price: '$99',
			period: 'month',
			features: [
				'Everything in Pro',
				'API access',
				'Dedicated manager',
				'SLA guarantee',
			],
			isCurrentPlan: false,
		},
	];

	const benefits: Benefit[] = [
		{ name: 'Unlimited products', included: true },
		{ name: 'Advanced analytics', included: true },
		{ name: 'Priority support', included: true },
		{ name: 'Custom domain', included: true },
		{ name: 'API access', included: false },
		{ name: 'White-label', included: false },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Crown className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Subscription Plan</CardTitle>
									<CardDescription>
										Manage your subscription and billing
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid gap-4 @md:grid-cols-3">
								{plans.map((plan) => (
									<PlanCard key={plan.id} {...plan} />
								))}
							</div>
						</CardContent>
					</Card>

					<div className="grid gap-6 @lg:grid-cols-3">
						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6">
								<div className="flex items-center gap-3 mb-4">
									<Crown className="size-6 text-primary" />
									<div>
										<h4 className="font-semibold">Pro Plan</h4>
										<p className="text-sm text-muted-foreground">
											Current plan
										</p>
									</div>
								</div>
								<div className="space-y-3">
									<div>
										<div className="flex justify-between text-sm mb-1">
											<span>Billing cycle</span>
											<span className="font-medium">Monthly</span>
										</div>
									</div>
									<div>
										<div className="flex justify-between text-sm mb-1">
											<span>Next billing</span>
											<span className="font-medium">Feb 1, 2026</span>
										</div>
									</div>
									<div>
										<div className="flex justify-between text-sm mb-1">
											<span>Amount</span>
											<span className="font-medium">$29.00</span>
										</div>
									</div>
								</div>
								<Separator className="my-4" />
								<div className="space-y-2">
									<div className="flex justify-between text-sm">
										<span>Products used</span>
										<span>247 / ∞</span>
									</div>
									<Progress value={25} className="h-2" />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Your Benefits</CardTitle>
							</CardHeader>
							<CardContent className="divide-y">
								{benefits.map((benefit) => (
									<BenefitRow key={benefit.name} {...benefit} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">
									Subscription Options
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex items-center justify-between">
									<div>
										<p className="font-medium">Auto-renew</p>
										<p className="text-xs text-muted-foreground">
											Automatically renew subscription
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<Button variant="outline" className="w-full">
									Change Billing Cycle
								</Button>
								<Button
									variant="outline"
									className="w-full text-destructive hover:text-destructive"
								>
									Cancel Subscription
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
