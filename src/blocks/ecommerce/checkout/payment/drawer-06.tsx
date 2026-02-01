'use client';

import {
	Calendar,
	Check,
	Clock,
	CreditCard,
	Lock,
	Package,
	RefreshCcw,
	Shield,
	Star,
	X,
	Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface SubscriptionPlan {
	id: string;
	name: string;
	price: string;
	interval: string;
	savings?: string;
	popular?: boolean;
}

const DrawerHeader = ({
	title,
	onClose,
}: {
	title: string;
	onClose: () => void;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2">
			<RefreshCcw className="size-5 text-primary" />
			<h2 className="text-lg font-semibold">{title}</h2>
		</div>
		<Button variant="ghost" size="icon" onClick={onClose}>
			<X className="size-4" />
		</Button>
	</div>
);

const SubscriptionPlanSelector = ({ plans }: { plans: SubscriptionPlan[] }) => (
	<RadioGroup
		defaultValue={plans.find((p) => p.popular)?.id || plans[0].id}
		className="space-y-3"
	>
		{plans.map((plan) => (
			<Label
				key={plan.id}
				htmlFor={plan.id}
				className={`relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5 ${
					plan.popular ? 'ring-2 ring-primary/20' : ''
				}`}
			>
				{plan.popular && (
					<Badge className="absolute -top-2.5 right-3 text-xs gap-0.5">
						<Star className="size-2.5" />
						Best Value
					</Badge>
				)}
				<RadioGroupItem value={plan.id} id={plan.id} />
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="font-medium">{plan.name}</span>
						{plan.savings && (
							<Badge variant="secondary" className="text-xs text-emerald-600">
								{plan.savings}
							</Badge>
						)}
					</div>
					<p className="text-xs text-muted-foreground">{plan.interval}</p>
				</div>
				<span className="text-lg font-bold">{plan.price}</span>
			</Label>
		))}
	</RadioGroup>
);

const BillingCycleInfo = ({
	startDate,
	nextBilling,
}: {
	startDate: string;
	nextBilling: string;
}) => (
	<div className="grid grid-cols-2 gap-3">
		<div className="p-3 rounded-lg bg-muted/30 text-center">
			<Calendar className="size-4 mx-auto mb-1 text-muted-foreground" />
			<span className="text-xs text-muted-foreground">Starts</span>
			<p className="text-sm font-medium">{startDate}</p>
		</div>
		<div className="p-3 rounded-lg bg-muted/30 text-center">
			<Clock className="size-4 mx-auto mb-1 text-muted-foreground" />
			<span className="text-xs text-muted-foreground">Next Billing</span>
			<p className="text-sm font-medium">{nextBilling}</p>
		</div>
	</div>
);

const CardForm = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label className="text-sm">Card Number</Label>
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="1234 5678 9012 3456" className="pl-10" />
			</div>
		</div>
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">Expiry</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">CVV</Label>
				<Input type="password" placeholder="•••" />
			</div>
		</div>
	</div>
);

const SubscriptionFeatures = ({ features }: { features: string[] }) => (
	<div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
		{features.map((feature, index) => (
			<div key={index} className="flex items-center gap-2">
				<Check className="size-4 text-primary shrink-0" />
				<span className="text-sm">{feature}</span>
			</div>
		))}
	</div>
);

const TermsCheckbox = () => (
	<div className="flex items-start gap-3">
		<Checkbox id="terms" className="mt-0.5" />
		<Label
			htmlFor="terms"
			className="text-xs cursor-pointer text-muted-foreground"
		>
			I agree to the{' '}
			<a href="#" className="text-primary underline">
				Subscription Terms
			</a>{' '}
			and authorize recurring charges
		</Label>
	</div>
);

const CancelPolicy = () => (
	<div className="text-center text-xs text-muted-foreground">
		<span>Cancel anytime. No long-term commitment.</span>
	</div>
);

export default function Main() {
	const plans: SubscriptionPlan[] = [
		{
			id: 'monthly',
			name: 'Monthly',
			price: '$19.99',
			interval: 'Billed monthly',
		},
		{
			id: 'annual',
			name: 'Annual',
			price: '$9.99',
			interval: 'Billed yearly at $119.88',
			savings: 'Save 50%',
			popular: true,
		},
	];

	const features = [
		'Unlimited access to all features',
		'Priority customer support',
		'Exclusive member discounts',
		'Early access to new products',
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm @sm:max-w-md mx-auto">
					<CardHeader>
						<DrawerHeader title="Subscribe" onClose={() => {}} />
					</CardHeader>
					<CardContent className="space-y-6">
						<SubscriptionPlanSelector plans={plans} />
						<SubscriptionFeatures features={features} />
						<Separator />
						<CardForm />
						<BillingCycleInfo startDate="Today" nextBilling="Jan 15, 2026" />
						<TermsCheckbox />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<Button className="w-full gap-2">
							<Zap className="size-4" />
							Start Subscription
						</Button>
						<CancelPolicy />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
